const choreTableBody = document.getElementById('choreTableBody');
const totalEarnings = document.getElementById('totalEarnings');
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

function createChoreRow(day, date, index) {
    const row = `
        <tr>
            <td>${day}</td>
            <td>${date}</td>
            <td><input type="checkbox" class="walkDogs" data-earning="5" id="walkDogs-${index}" onchange="updateEarnings()"></td>
            <td><input type="checkbox" class="feedDogs" data-earning="1.50" id="feedDogs-${index}" onchange="updateEarnings()"></td>
        </tr>
    `;
    return row;
}

function fillChoreTable() {
    let tableContent = '';
    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(currentYear, currentMonth, i);
        const day = date.toLocaleString('en-us', { weekday: 'long' });
        tableContent += createChoreRow(day, date.toLocaleDateString(), i);
    }
    choreTableBody.innerHTML = tableContent;
}

function saveCheckboxState(checkbox) {
    const checkboxState = JSON.parse(localStorage.getItem('checkboxState')) || {};
    checkboxState[checkbox.id] = checkbox.checked;
    localStorage.setItem('checkboxState', JSON.stringify(checkboxState));
}

function updateEarnings() {
    const walkDogsCheckboxes = document.getElementsByClassName('walkDogs');
    const feedDogsCheckboxes = document.getElementsByClassName('feedDogs');
    let earnings = 0;

    for (const checkbox of walkDogsCheckboxes) {
        if (checkbox.checked) {
            earnings += parseFloat(checkbox.dataset.earning);
        }
        saveCheckboxState(checkbox);
    }

    for (const checkbox of feedDogsCheckboxes) {
        if (checkbox.checked) {
            earnings += parseFloat(checkbox.dataset.earning);
        }
        saveCheckboxState(checkbox);
    }

    totalEarnings.textContent = earnings.toFixed(2);
    localStorage.setItem('choreChartEarnings', earnings.toFixed(2));
}

function loadCheckboxState() {
    const checkboxState = JSON.parse(localStorage.getItem('checkboxState')) || {};
    for (const checkboxId in checkboxState) {
        const checkbox = document.getElementById(checkboxId);
        if (checkbox) {
            checkbox.checked = checkboxState[checkboxId];
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fillChoreTable();
    const storedEarnings = localStorage.getItem('choreChartEarnings');
    if (storedEarnings) {
        totalEarnings.textContent = storedEarnings;
    }
    loadCheckboxState();
    updateEarnings();
});

