$(document).ready(function() {
  //Hide all Weather Images
  $("#rain").hide();
  $("#clear").hide();
  $("#cloudy").hide();
  $("#snow").hide();
  //Variables
  unitType = "imperial"
  Conditions = 0;
  Current = "";
  Deg = "F";
  zip = "85001";
  lon = 0;
  lat = 0;
  method = "";
  Location = "Home";
  $('#formZip').on('submit', setZip);
  getLocation();
  //getWeather();
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {showError();}
}

function showPosition(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  method = "coords";
  getWeather();
}

function showError(error) {
  $("#msg").append("Location information is unavailable. Please enter your Zip code.");
  method = "zip";
  getWeather();
}

function setZip(event) {
  event.preventDefault();
  zip = document.getElementById("inputZip").value;
  method ="zip";
  $("#msg").hide();
  getWeather();
}

function itFailed(results){$("#weather").append(" No weather for you!");}

function getWeather(){
  if (method === "coords") {
    $.getJSON("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon="+ lon + "&units=" + unitType + "&appid=5e8452b9d9337812247ee5c644a4f0a4").done(update).fail(console.log("error " + textStatus));}
  else {
    $.getJSON("https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?zip=" + zip + "&units=" + unitType + "&appid=5e8452b9d9337812247ee5c644a4f0a4").done(update).fail(console.log("error " + textStatus));}
}

function update(results){
  Temp = Math.round(results.main.temp);
  Conditions = results.weather[0].id;
  Location = results.name;
  //Figure out Current Conditions
  $("#rain").hide();
  $("#clear").hide();
  $("#cloudy").hide();
  $("#clear").hide();
  Current = "Clear";
  $("#clear").show();
  if (Conditions < 600) {Current= "Rainy"; $("#clear").hide(); $("#rain").show();};
  if (Conditions >= 600 && Conditions < 700) {Current = "Snowing"; $("#clear").hide(); $("#snow").show();};
  if (Conditions >= 803 && Conditions <=804) {Current = "Cloudy"; $("#clear").hide(); $("#cloudy").show();};
  $("#weather").empty();
  $("#weather").append("Current conditions in " + Location + " are "+ Current + " and " + Temp + Deg);
}

function Convert() {
  if (unitType === "metric") {unitType="imperial"; Deg="F";} else {unitType="metric"; Deg="C";}
  getWeather();
}
