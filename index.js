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

// When a party name is clicked on, the application updates state by fetching information about a single party from the API.
// The application renders a message telling users to select a party if none is selected.
// Functions are used to organize logic involving state changes.
// The application is rerendered whenever state changes.
// UI elements are organized into component functions.
//

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <section>
        <h2>Upcoming Parties</h2>
        <PARTYLIST></PARTYLIST>
    </section>
    <section>
        <h2>Party Details</h2>
        <PARTYDETAILS></PARTYDETAILS>
    </section>
    `;
}

async function init() {
  await get_party_names();
  render();
}

init();
