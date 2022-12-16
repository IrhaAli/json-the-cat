const client = require('request');
const args = process.argv;
const breedName = args.slice(2);

// Make an http request and wait for the response.
const pageFetcher = (url) => {
  client.get(url, (error, response) => {
    const body = JSON.parse(response.body)[0];
    if (error) {
      console.log(error);
      return;
    } else if (body === undefined) {
      console.log("Breed not found: " + breedName);
    } else {
      (response.statusCode !== 200) ? console.log('Status Code: ', response.statusCode, ` (See https://http.cat/${response.statusCode} for more info)`) : console.log(body["description"]);
    }
  });
};

pageFetcher('https://api.thecatapi.com/v1/breeds/search?q=' + breedName);