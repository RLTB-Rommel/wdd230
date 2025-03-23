const visitCountElement = document.getElementById('visitCount');
let visits = Number(localStorage.getItem('visitCount')) || 0;
visits++;
localStorage.setItem('visitCount', visits);
visitCountElement.textContent = visits;