const form = document.getElementById('form');
form.addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = {};

    const movieSelect = document.getElementById('movie');
    formData[movieSelect.name] = movieSelect.value;

    const formElements = form.elements;

    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];

        if (element.name && element.value) {
            formData[element.name] = element.value;
        }
    }

    const selectedLanguage = document.querySelector('input[name="language"]:checked').value;
    formData['language'] = selectedLanguage;
    const submissionId = Math.random().toString(36).substring(2, 15);

    localStorage.setItem(submissionId, JSON.stringify(formData));

    alert('Form data saved to localStorage with ID: ' + submissionId);
});

const actionFilterButton = document.getElementById('actionFilterButton');
actionFilterButton.addEventListener('click', function () {
    filterByGenre('Action');
});

const averageScoreFilterButton = document.getElementById('averageScoreFilterButton');
averageScoreFilterButton.addEventListener('click', function () {
    filterByAverageScore(5);
});

const phoneNumberFilterButton = document.getElementById('phoneNumberFilterButton');
phoneNumberFilterButton.addEventListener('click', function () {
    filterByPhoneNumber('099');
});

function filterByGenre(genre) {
    const formDataKeys = Object.keys(localStorage);
    for (let i = 0; i < formDataKeys.length; i++) {
        const submissionId = formDataKeys[i];
        const formData = localStorage.getItem(submissionId);
        if (formData) {
            const parsedData = JSON.parse(formData);
            if (parsedData['movieGenre'] === genre) {
                displayData(parsedData);
            }
        }
    }
}

function filterByAverageScore(score) {
    const formDataKeys = Object.keys(localStorage);
    for (let i = 0; i < formDataKeys.length; i++) {
        const submissionId = formDataKeys[i];
        const formData = localStorage.getItem(submissionId);
        if (formData) {
            const parsedData = JSON.parse(formData);
            if (parseInt(parsedData['averageScore']) < score) {
                displayData(parsedData);
            }
        }
    }
}

function filterByPhoneNumber(prefix) {
    const formDataKeys = Object.keys(localStorage);
    for (let i = 0; i < formDataKeys.length; i++) {
        const submissionId = formDataKeys[i];
        const formData = localStorage.getItem(submissionId);
        if (formData) {
            const parsedData = JSON.parse(formData);
            const phoneNumber = parsedData['phone'];
            if (phoneNumber && phoneNumber.startsWith(prefix)) {
                displayData(parsedData);
            }
        }
    }
}

function displayData(data) {
    const displayArea = document.getElementById('displayArea');
    const dataDiv = document.createElement('div');
    dataDiv.innerHTML = `
<p>Movie Genre: ${data['movieGenre']}</p>
<p>Language: ${data['language']}</p>
<p>Average Score: ${data['averageScore']}</p>
<!-- Додайте інші поля, які ви хочете відобразити -->
`;
    displayArea.appendChild(dataDiv);
}