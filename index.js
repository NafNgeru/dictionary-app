document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.querySelector('.itemInput');
    const submitButton = document.querySelector('#submitName'); 
    const searchWordElement = document.querySelector('.search-word');
    const descriptionElement = document.querySelector('.description');

// Create an event listener for the search button
submitButton.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form submission

// Create a validator for the user's input
const word = inputField.value.trim();
        if (!word) { searchWordElement.textContent = "Please enter a word.";
            descriptionElement.textContent = "";
            return;
        }

// Fetching data from the dictionary API
fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
.then(response => {
    if (!response.ok) {
        return Promise.reject("Word not found.");// Ensure the word is in the dictionary API
        }
        return response.json();
        })
        .then(data => {updateWordDetails(word, data);}) // Update DOM with word information user has inputted
            .catch(error => {
                searchWordElement.textContent = "Error!";
                descriptionElement.textContent = error;
            });//Catch is used for determining errors
    });

// Function to update the DOM with fetched data
function updateWordDetails(word, data) {
    searchWordElement.textContent = `Word: ${word}`;
    descriptionElement.innerHTML = ''; // Clear previous results

    data.forEach(entry => {
        entry.meanings.forEach(meaning => {
        const partOfSpeech = document.createElement('h3');//Create part of speech from recieved JSON data in the h3 data
        partOfSpeech.textContent = `Part of Speech: ${meaning.partOfSpeech}`;a//Return string to be portrayed for each part of speech data
            
        const definitionsList = document.createElement('ul'); //Create definitions list variable for the JSON data
    
        meaning.definitions.forEach(def => {
        const listItem = document.createElement('li'); //Create definitions item on the list variable for the JSON data
        listItem.textContent = def.definition;

        if (def.example) {
        const exampleText = document.createElement('p'); //Create example of how the word searched is used in paragraph <p>
        exampleText.textContent = `Example: ${def.example}`; 
        listItem.appendChild(exampleText);
    }
       definitionsList.appendChild(listItem); //append the list items on the definitions list variable
           });
     descriptionElement.appendChild(partOfSpeech);
     descriptionElement.appendChild(definitionsList);
});
});
}
});