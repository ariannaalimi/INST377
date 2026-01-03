const apiKey = "YOUR_API_KEY_HERE";

const byCity = document.getElementById("byCity")
const byZip = document.getElementById("byZip")
const city = document.getElementById("city")
const zip = document.getElementById("zipCode")


//when the city button is selected, run this code
  byCity.addEventListener("change", () => {
    city.disabled = false; //enables the city box
    zip.disabled = true; //greys zip code box
    city.required = true; //requires user input for city
    zip.required = false; //disables requirement for zip code input
  });

//when zip code button is selected, run this code
    byZip.addEventListener("change", () => {
    city.disabled = true; //greys the city box
    zip.disabled = false; //enables zip code box
    city.required = false; //disables requirement for city input
    zip.required = true; //enables requirement for zip code input
  });

//fetches the search form element and attaches event listener for submit event
//code runs when user clicks submit
  document.getElementById("search_form").addEventListener("submit", (e) => { e.preventDefault();

    const radius = document.getElementById("radius").value; //fetches radius input

    let query = ""; //empty string to hold city or zip code

    if(byCity.checked){ //if user searches by city, run this code
      
      query = `city=${encodeURIComponent(city.value)}`; //stores city into query

    }
    else{ // if user searches by zip code, run this code
      query = `postalCode=${encodeURIComponent(zip.value)}`; //stores zip code into query
    }
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?${query}&radius=${radius}&unit=miles&countryCode=US&apikey=${apiKey}`;

    fetch(url) //fetching data from API
      .then(response => response.json())
      .then(data => {

        const eventsList = document.getElementById("events"); //storing events into new variable "eventsList"
        eventsList.innerHTML = ""; //clearing previous result when entering new input

        if (data._embedded && data._embedded.events) { //if the events exist, run this code

          data._embedded.events.forEach(event => { //for each event

            const li = document.createElement("li"); //create a new list element for that event

            li.textContent = `${event.name} — ${event.dates.start.localDate}`;  //display event name and date

            eventsList.appendChild(li); //adds the list to the page
          });
        } else { //if no events are found, run this code

          eventsList.textContent = "No events found.";
        }
      })


  })