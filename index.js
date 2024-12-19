document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.querySelector('.itemInput');
    const submitButton = document.querySelector('#submitName');
    const searchWordElement = document.querySelector('.search-word');
    const descriptionElement = document.querySelector('.description');

    // Event listener for the search button
    submitButton.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent form submission

        const word = inputField.value.trim();
        if (!word) {
            searchWordElement.textContent = "Please enter a word.";
            descriptionElement.textContent = "";
            return;
        }

        // Fetching data from the dictionary API
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
            .then(response => {
                if (!response.ok) {
                    return Promise.reject("Word not found.");
                }
                return response.json();
            })
            .then(data => {
                // Update DOM with word information
                updateWordDetails(word, data);
            })
            .catch(error => {
                searchWordElement.textContent = "Error!";
                descriptionElement.textContent = error;
            });
    });

    // Function to update the DOM with fetched data
    function updateWordDetails(word, data) {
        searchWordElement.textContent = `Word: ${word}`;
        descriptionElement.innerHTML = ''; // Clear previous results

        data.forEach(entry => {
            entry.meanings.forEach(meaning => {
                const partOfSpeech = document.createElement('h3');
                partOfSpeech.textContent = `Part of Speech: ${meaning.partOfSpeech}`;

                const definitionsList = document.createElement('ul');
                meaning.definitions.forEach(def => {
                    const listItem = document.createElement('li');
                    listItem.textContent = def.definition;

                    if (def.example) {
                        const exampleText = document.createElement('p');
                        exampleText.textContent = `Example: ${def.example}`;
                        listItem.appendChild(exampleText);
                    }
                    definitionsList.appendChild(listItem);
                });

                descriptionElement.appendChild(partOfSpeech);
                descriptionElement.appendChild(definitionsList);
            });
        });
    }
});