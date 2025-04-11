const committeeForm = document.getElementById('committee-form');
const nameInput = document.getElementById('committee-name');
const isCoalitionCheckbox = document.getElementById('is-coalition');
const votesInput = document.getElementById('committee-votes');
const calculateResultsBtn = document.getElementById('calculate-results-btn');
const registeredListContainer = document.getElementById('registered-committees-list');
const resultsContainer = document.getElementById('election-results');
const chart = document.getElementById('Chart');

let committees = [];

function showCommittees() {
    let html = '';
    let i;
    let committee;
    let coalitionInfo;

    if (committees.length === 0) {
        html = '<p>Brak zarejestrowanych komitetów.</p>';
    } else {
        for (i = 0; i < committees.length; i++) {
            committee = committees[i];

            if (committee.isCoalition) {
                coalitionInfo = 'jest koalicją';
            } else {
                coalitionInfo = 'nie jest koalicją';
            }

            html += '<div>' + (i + 1) + '. ' + committee.name + ' (' + coalitionInfo + '), ilość głosów: ' + committee.votes + '</div>';
        }
    }
    registeredListContainer.innerHTML = html;
}

function addCommittee(event) {
    event.preventDefault();
    const name = nameInput.value.trim();
    const isCoalition = isCoalitionCheckbox.checked;
    const votes = parseInt(votesInput.value, 10);

    if (name === '') {
        alert('Podaj nazwę komitetu!');
        return;
    }

    if (isNaN(votes) || votes < 0) {
        alert('Podaj poprawną, nieujemną liczbę głosów!');
        return;
    }

    const newCommittee = {
        name: name,
        votes: votes,
        isCoalition: isCoalition
    };
    committees.push(newCommittee);

    showCommittees();

    committeeForm.reset();
}

committeeForm.onsubmit = addCommittee;

showCommittees();

new Chart(chart, {
    type: 'doughnut',
    data: {
      labels: ['PiS', 'PO', 'PSL', 'Konfederacja', 'Polska2050', 'Lewica'],
      datasets: [{
        label: 'Ilość głosów',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
    }
  });
