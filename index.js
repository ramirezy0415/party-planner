// The application updates state by fetching an array of parties from the API.
// === STATE ===
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/COHORT_CODE";
const EVENTS = "/events";
const ENDPOINT = BASE + COHORT + EVENTS;

let parties = [];
let party;

// The application renders a list of party names.
async function get_party_names() {
  try {
    const response = await fetch(ENDPOINT);
    const result = await response.json();
    parties = result.data;
    render();
  } catch (error) {
    console.log(error);
  }
}

// The application renders the name, ID, date, description, and location of the selected party.
async function get_single_party(id) {
  try {
    const response = await fetch(`${ENDPOINT}/${id}`);
    const result = await response.json();
    party = result.data;
    render();
  } catch (error) {
    console.log(error);
  }
}

// === COMPONENTS ===
// When a party name is clicked on, the application updates state by fetching information about a single party from the API.
function list_party_details(selected_party) {
  const $li = document.createElement("li");
  $li.innerHTML = `
    <a href="#selected_party">${selected_party.name}</a>
  `;
  $li.addEventListener("click", () => get_single_party(selected_party.id));
  return $li;
}

// The application renders a message telling users to select a party if none is selected.
function list_parties() {
  const $ul = document.createElement("ul");
  $ul.classList.add("lineup");
  const party_list_component = parties.map(list_party_details);
  $ul.replaceChildren(...party_list_component);
  return $ul;
}

function display_list_party_details() {
  if (!party) {
    const $p = document.createElement("p");
    $p.textContent = "Please select a party";
    return $p;
  }

  const $section = document.createElement("section");
  $section.innerHTML = `
  <h2>${party.name} #${party.id}</h2>
  <p>${party.date}</p>
  </br>
  <p>${party.location}</p>
  </br>
  <p>${party.description}</p>
  `;

  return $section;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <section>
        <h2>Upcoming Parties</h2>
        <PARTYLIST></PARTYLIST>
    </section>
    <section id="selected_party">
        <h2>Party Details</h2>
        <PARTYDETAILS></PARTYDETAILS>
    </section>
    `;

  $app.querySelector("PARTYLIST").replaceWith(list_parties());
  $app.querySelector("PARTYDETAILS").replaceWith(display_list_party_details());
}

async function init() {
  await get_party_names();
  render();
}

init();
