
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  const city = search.split("=")[1];
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  const URL = `${config.backendEndpoint}/adventures/?city=${city}`;

  // cover the code which makes network call in try and catch block
  try {
    // fetch the adventure details using the fetch API
    const adventuresResponse = await fetch(URL);

    // check if the status of response object is ok
    if (adventuresResponse.ok) {
      // convert the response object to json object and return it
      const adventures = await adventuresResponse.json();
      return adventures;
    }

    // else throw a new error with the status code
    else {
      const message = `⚡⚡An error occurred with a status code of ${adventuresResponse.status}⚡⚡`;
      throw new Error(message);
    }
  } catch (err) {
    // catch any errors that may happed during a network call made using fetch
    console.log(err.message);
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM

  // fetch the data element from the dom where col element need to be inserted
  const dataElement = document.querySelector("#data");

  // set the innerHTML of the dataElement to empty
  dataElement.innerHTML = "";

  // loop through each of the adventures and add all of then to DOM
  adventures.forEach((adventure) => {
    // create a colElement which acts as a bootstrap column
    const colElement = document.createElement("div");

    // set the class attribute on the col element
    colElement.setAttribute("class", "col-md-6 col-lg-3 mt-3");

    // cardHTML that need to inserted in bootstrap column
    const cardHTML = `
    <div class='activity-card'>
        <div class='category-banner'>${adventure.category}</div>
        <a id="${adventure.id}" href="detail/?adventure=${adventure.id}">
            <img src=${adventure.image} >
            <div class='activity-card-text p-3 d-flex flex-column justify-content-between'>
                <div class='description-text d-flex justify-content-between'>
                    <h4 class='fs-6 w-75'>${adventure.name}</h4>
                    <span>₹${adventure.costPerHead}</span>
                </div>
                <div class='duration-text d-flex justify-content-between'>
                    <h4 class='fs-6'>Duration</h4>
                    <span>${adventure.duration} hours</span>
                </div>
            </div>
        </a>
    </div>
  `;

    // set the innerHTML of colElement to cardHTML
    colElement.innerHTML = cardHTML;

    // append the calElement to dataElement
    dataElement.append(colElement);
  });
}


//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const filteredList = list.filter((listItem) => {
    return listItem.duration >= low && listItem.duration <= high;
  });

  return filteredList;

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  const filteredList = list.filter((listItem) => {
    // Check if the current list item matches any of the target category
    return categoryList.includes(listItem.category);
  });

  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  if (filters.category.length !== 0) {
    list = filterByCategory(list, filters.category);
  }

  // check if the duration key of filter object is empty or not
  // call filterByDuration method only if its truthy
  if (filters.duration) {
    // extract the low and high values using split and destructuring
    const [low, high] = filters.duration.split("-");

    // get adventures filtered by duration
    list = filterByDuration(list, low, high);
  }

  
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem("filters", JSON.stringify(filters));

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object


  // Place holder for functionality to work in the Stubs
  return JSON.parse(window.localStorage.getItem("filters"));
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

  // Get the dom element into where we need to append the pills to
  const categoryPillsElement = document.querySelector("#category-list");

  // Set the innerHTML of the categoryPillsElement to empty
  categoryPillsElement.innerHTML = "";

  // Loop over the category key of filter object and populate pills into the DOM
  filters.category.forEach((categoryItem) => {
    // Create a span element for the pill
    const pillElement = document.createElement("p");

    // Set the class attribute of the pill element
    pillElement.setAttribute("class", "category-filter");

    // add the HTML necessary for the pill element
    pillElement.innerHTML = `
        <span>${categoryItem}</span>
        <ion-icon name="close-outline" id="close-icon"></ion-icon>
    `;

    // append the pill element to the categoryPillsElement
    categoryPillsElement.append(pillElement);
  });
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
