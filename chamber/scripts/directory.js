const url = 'data/members.json';
const container = document.querySelector('#directory');

async function getMembers() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.companies);
  } catch (error) {
    console.error('Failed to load member data:', error);
  }
}

function displayMembers(companies) {
  container.innerHTML = '';
  companies.forEach((member) => {
    const card = document.createElement('div');
    card.classList.add('member-card');

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener">${member.website}</a>
    `;

    container.appendChild(card);
  });
}

getMembers();