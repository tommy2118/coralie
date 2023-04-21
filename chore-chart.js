const choreTableBody = document.getElementById('choreTableBody');
const totalEarnings = document.getElementById('totalEarnings');
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

function createChoreRow(day, date) {
    const row = `
        <tr>
            <td>${day}</td>
            <td>${date}</td>
            <td><input type="checkbox" class="walkDogs" data-earning="5" onchange="updateEarnings()"></td>
            <td><input type="checkbox" class="feedDogs" data-earning="1.50" onchange="updateEarnings()"></td>
        </tr>
    `;
    return row;
}

function fillChoreTable() {
    let tableContent = '';
    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(currentYear, currentMonth, i);
        const day = date.toLocaleString('en-us', { weekday: 'long' });
        tableContent += createChoreRow(day, date.toLocaleDateString());
    }
    choreTableBody.innerHTML = tableContent;
}

function updateEarnings() {
    const walkDogsCheckboxes = document.getElementsByClassName('walkDogs');
    const feedDogsCheckboxes = document.getElementsByClassName('feedDogs');
    let earnings = 0;

    for (const checkbox of walkDogsCheckboxes) {
        if (checkbox.checked) {
            earnings += parseFloat(checkbox.dataset.earning);
        }
    }

    for (const checkbox of feedDogsCheckboxes) {
        if (checkbox.checked) {
            earnings += parseFloat(checkbox.dataset.earning);
        }
    }

    totalEarnings.textContent = earnings.toFixed(2);
    localStorage.setItem('choreChartEarnings', earnings.toFixed(2));
}

document.addEventListener('DOMContentLoaded', () => {
    fillChoreTable();
    const storedEarnings = localStorage.getItem('choreChartEarnings');
    if (storedEarnings) {
        totalEarnings.textContent = storedEarnings;
    }
});

