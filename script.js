const main = document.getElementById('main');
const addUserButton = document.getElementById('add-user');
const doubleMoneyButton = document.getElementById('double');
const showMillionairesButton = document.getElementById('show-millionaires');
const sortButton = document.getElementById('sort');
const totalButton = document.getElementById('calculate-total');
let data = [];

async function generateUser() {
    const res = await fetch('https://randomuser.me/api');
    const { results } = await res.json();
    const { name: { first, last } } = results[0];
    const newUser = { name: `${first} ${last}`, worth: Math.round(Math.random() * 1000000) };
    addData(newUser);
}

function doubleUserWorth() {
    data = data.map(item => ({ ...item, worth: item.worth * 2 }));
    updateDOM();
}

function sortRichest() {
    data.sort((a, b) => b.worth - a.worth);
    updateDOM();
}

function showMillionaires() {
    data = data.filter(item => item.worth > 1000000);
    updateDOM();
}

function calculateTotalNetWorth() {
    const totalWorth = data.reduce((acc, item) => acc + item.worth, 0);
    const totalNetWorthElement = document.createElement('div');
    totalNetWorthElement.innerHTML = `<h3>Total Net Worth: <strong>${formatCurrency(totalWorth)}</strong></h3>`;
    main.appendChild(totalNetWorthElement);
}

function addData(newUser) {
    data.push(newUser);
    updateDOM();
}

function updateDOM(inputData = data) {
    main.innerHTML = '<h2><strong><span class="username">Name</span></strong><span class="net-worth">Net Worth</span></h2>';
    inputData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<span class="name"><strong>${item.name}</strong></span> <span class="net-worth">${formatCurrency(item.worth)}</span>`;
        main.appendChild(element);
    });
}

function formatCurrency(num) {
    return 'PKR ' + num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Add three users automatically
(async function addInitialUsers() {
    for (let i = 0; i < 3; i++) {
        await generateUser();
    }
})();

addUserButton.addEventListener('click', generateUser);
doubleMoneyButton.addEventListener('click', doubleUserWorth);
sortButton.addEventListener('click', sortRichest);
showMillionairesButton.addEventListener('click', showMillionaires);
totalButton.addEventListener('click', calculateTotalNetWorth);
