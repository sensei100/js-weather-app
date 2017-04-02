$(document).ready(function() {
  getLocation();
});

function getLocation() {
  $.getJSON('http://ipinfo.io/json', function(response) {
    var loc = response.loc.replace(',', ' ').split(' ');
    var lat = loc[0];
    var long = loc[1];
    var units = "F";
    setLocation(response.city + ', ' + response.region);
    var url = "https://api.darksky.net/forecast/7c91a2f1a58cbd3bbcadae04002b6d0f/"+ lat + "," +long;
            
  function setLocation(loc) {
  $('#location').html(loc);
  }
    
  $.ajax( {
    url: url,
    dataType: 'jsonp',
    success: function(response) { 
      $('#temp').html(Math.round(response.currently.temperature) + '&deg;' + units); 
      $('#summary').html(response.currently.summary);
      $("#change-temp").click(function(temp){
        var temp = Math.round(response.currently.temperature);
        if (units === "F"){
          units = "C";
          temp = (temp - 32) * 5/9;
        } else if (units === "C") {
          units = "F";
          temp = response.currently.temperature;
        }    
        $('#temp').html(Math.round(temp) + '&deg;' + units);                });                         
      var icon = response.currently.icon;
      switch(icon) {
        case "clear-day":
          $('i').addClass('wi wi-day-sunny');
          break;
         case "clear-night":
          $('i').addClass('wi wi-night-clear');
          break;
         case "cloudy":
          $('i').addClass('wi wi-day-cloudy');
          break;
         case "rain":
          $('i').addClass('wi wi-raindrops');
          break;
         case "sleet":
          $('i').addClass('wi wi-day-sleet');
          break;
         case "snow":
          $('i').addClass('wi wi-day-snow');
          break;
         case "wind":
          $('i').addClass('wi wi-day-windy');
          break;
         case "fog":
          $('i').addClass('wi wi-day-fog');
          break;
         case "partly-cloudy-day":
          $('i').addClass('wi wi-day-cloudy');
          break;
         case "partly-cloudy-night":
          $('i').addClass('wi wi-night-partly-cloudy');
          break;
         default:
          $('i').addClass('wi wi-na');
          
      }
      
    } 
  });
 });
}
         
