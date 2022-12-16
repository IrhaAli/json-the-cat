const client = require('request');

// Make an http request and wait for the response.
const fetchBreedDescription = function(breed, functionToRunWhenThingsAreDone) {
  const url = `https://api.thecatapi.com/v1/breeds/search?q=${breed}`;
  client.get(url, (error, response) => {
    const body = JSON.parse(response.body)[0];
    let desc;
    if (body === undefined) {
      error = "Breed not found: " + breed;
    } else {
      desc = (response.statusCode !== 200) ? `Status Code: ${response.statusCode}, (See https://http.cat/${response.statusCode} for more info)` : body["description"];
    }
    functionToRunWhenThingsAreDone(error, desc);
  });
};

module.exports = { fetchBreedDescription };