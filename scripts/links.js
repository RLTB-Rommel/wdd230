const baseURL = "https://rltb-rommel.github.io/wdd230/";
const linksURL = `${baseURL}data/links.json`;

async function getLinks() {
  const response = await fetch(linksURL);
  const data = await response.json();
  displayLinks(data.weeks); // pass the weeks array
}

function displayLinks(weeks) {
  const ul = document.querySelector(".week-links");
  ul.innerHTML = ""; // Clear old content

  weeks.forEach(week => {
    const li = document.createElement("li");
    const label = document.createElement("strong");
    label.textContent = `${week.week}: `;
    li.appendChild(label);

    week.links.forEach((link, index) => {
      const a = document.createElement("a");
      a.href = link.url;
      a.textContent = link.title;
      a.target = "_blank";

      li.appendChild(a);

      if (index < week.links.length - 1) {
        li.append(" | ");
      }
    });

    ul.appendChild(li);
  });
}

getLinks();