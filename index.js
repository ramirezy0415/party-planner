// The application updates state by fetching an array of parties from the API.
// === STATE ===
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/COHORT_CODE";
const BASE_ENDPOINT = BASE + COHORT;
const BASE_EVENTS_ENDPOINT = `${BASE_ENDPOINT}/events`;
const BASE_GUESTS_ENDPOINT = `${BASE_ENDPOINT}/guests`;
const BASE_RSVPS_ENDPOINT = `${BASE_ENDPOINT}/rsvps`;

let parties = [];
let party;
let guests = [];
let rsvps = [];

// The application renders a list of party names.
async function get_party_names() {
  try {
    const response = await fetch(BASE_EVENTS_ENDPOINT);
    const result = await response.json();
    parties = result.data;
    render();
  } catch (error) {
    console.log(error);
  }
}

// The application renders a list of guest names.
async function get_guest_names() {
  try {
    const response = await fetch(BASE_GUESTS_ENDPOINT);
    const result = await response.json();
    guests = result.data;
    render();
  } catch (error) {
    console.log(error);
  }
}

// The application renders a list of guest names.
async function get_rsvp_names() {
  try {
    const response = await fetch(BASE_RSVPS_ENDPOINT);
    const result = await response.json();
    rsvps = result.data;
    render();
  } catch (error) {
    console.log(error);
  }
}

// The application renders the name, ID, date, description, and location of the selected party.
async function get_single_party(id) {
  try {
    const response = await fetch(`${BASE_EVENTS_ENDPOINT}/${id}`);
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
  $ul.classList.add("events");
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

  // get rsvps for this event
  const event_rsvps = rsvps.filter((rsvp) => rsvp.eventId === party.id);
  // .forEach((rsvp) => rsvp.guestId);
  const guests = guests.filter((guest) => event_rsvps.includes(guest.id));

  const $section = document.createElement("section");
  $section.classList.add("selected_event");
  $section.innerHTML = `
  <h3>${party.name.toUpperCase()} #${party.id}</h3>
  <p>${party.date}</p>
  <p>${party.location}</p>
  <p>${party.description}</p>
  <p>${guests}</p>
  `;

  return $section;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <h1>Party Planner</h1>
    <div id="content">
    <section>
        <h2>Upcoming Parties</h2>
        <PARTYLIST></PARTYLIST>
    </section>
    <section id="selected_party">
        <h2>Party Details</h2>
        <PARTYDETAILS></PARTYDETAILS>
    </section>
    </div>
    `;

  $app.querySelector("PARTYLIST").replaceWith(list_parties());
  $app.querySelector("PARTYDETAILS").replaceWith(display_list_party_details());
}

async function init() {
  await get_party_names();
  await get_rsvp_names();
  await get_guest_names();
  render();
}

init();
