const choreTableBody = document.getElementById('choreTableBody');
const totalEarnings = document.getElementById('totalEarnings');
const currentMonth = new Date().getMonth();
const currentYear = new Date().getFullYear();
const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

const firebaseConfig = {
    apiKey: "AIzaSyDSFoeEaMtWY5gxto43zycEqdV5z7LzfTw",
    authDomain: "coralie-6eca5.firebaseapp.com",
    projectId: "coralie-6eca5",
    storageBucket: "coralie-6eca5.appspot.com",
    messagingSenderId: "951783746067",
    appId: "1:951783746067:web:3451fc0039c8376cedede6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firebase Firestore
const firestore = firebase.firestore();

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
  firestore.collection('checkboxState').doc(checkbox.id).set({ checked: checkbox.checked });
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
}

function loadCheckboxState() {
  firestore.collection('checkboxState').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const checkbox = document.getElementById(doc.id);
      if (checkbox) {
        checkbox.checked = doc.data().checked;
      }
    });
    updateEarnings();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  fillChoreTable();
  loadCheckboxState();
});

