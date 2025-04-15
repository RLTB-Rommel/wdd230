const spotlightContainer = document.getElementById('spotlight-container');

fetch('data/members.json') // Make sure the path matches where your file is saved
  .then(response => response.json())
  .then(data => {
    const companies = data.companies;

    // Filter only gold or silver members
    const qualified = companies.filter(company =>
      company.membership === 'gold' || company.membership === 'silver'
    );

    // Shuffle and select 2–3 random
    const shuffled = qualified.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    // Display them
    selected.forEach(company => {
      const card = document.createElement('div');
      card.classList.add('spotlight-item');
      card.innerHTML = `
        <img src="images/${company.image}" alt="${company.name}" loading="lazy">
        <h3>${company.name}</h3>
        <p><strong>${company.membership.toUpperCase()}</strong> Member</p>
        <p>${company.address}</p>
        <p><a href="${company.website}" target="_blank">Visit Website</a></p>
      `;
      spotlightContainer.appendChild(card);
    });
  })
  .catch(err => {
    console.error("Spotlight load failed:", err);
    spotlightContainer.innerHTML = "<p>Unable to load spotlight members.</p>";
  });