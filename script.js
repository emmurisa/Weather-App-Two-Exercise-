
/**
 * Weather App
 * TODO: Complete getWeatherData() to return json response Promise
 * TODO: Complete searchCity() to get user input and get data using getWeatherData()
 * TODO: Complete showWeatherData() to set the data in the the html file from response
 */

/* DIV ID's you'll need access to 👇
"city-name"
"weather-type"
"temp"
"min-temp"
"max-temp"
*/

const cityName = document.getElementById("city-name")
const weatherType = document.getElementById('weather-type')
const temp = document.getElementById('temp')
const minTemp = document.getElementById('min-temp')
const maxTemp = document.getElementById('max-temp')


// API_KEY for maps api
const API_KEY = "a8e71c9932b20c4ceb0aed183e6a83bb";

/**
 * Retrieve weather data from openweathermap
 * HINT: Use fetch()
 * HINT: URL should look like this: 
 * https://api.openweathermap.org/data/2.5/weather?q=detroit&appid=a8e71c9932b20c4ceb0aed183e6a83bb&units=imperial
 */

const getWeatherData = (city) => {

    // const URL = "https://api.openweathermap.org/data/2.5/weather";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`;
    //HINT: Use template literals to create a url with input and an API key

  return new Promise((resolve, reject) => {
    fetch(URL)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        reject(
          "Unable to recover the JSON file. Server response code is: " +
            response.status
        );
      })
      .then((json) => resolve(json))
      .catch((err) => reject(err));
  });
}

/**
 * Retrieve city input and get the weather data
 * HINT: Use the promise returned from getWeatherData()
 */
const searchCity = () => {
  const city = document.getElementById('city-input').value;
     getWeatherData(city)
      .then((json) => {
        // console.log(json);
         const weatherData = {city: json.name, weather: json.weather[0].main, temp: json.main.temp, min: json.main.temp_min, max: json.main.temp_max}
        //console.log(weatherData)
        showWeatherData(weatherData)
      })
      .catch((err) => {
        console.log("Error found:", err);
      });


}

/**
 * Show the weather data in HTML
 * HINT: make sure to console log the weatherData to see how the data looks like
 */
const showWeatherData = (weatherData) => {
  cityName.innerText = weatherData.city
  weatherType.innerText = weatherData.weather
  temp.innerText = weatherData.temp
  minTemp.innerText = weatherData.min
  maxTemp.innerText = weatherData.max  
}
