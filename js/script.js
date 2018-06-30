/**
 * Created by EveRin on 29.06.2018.
 */
var json;
var cityName = "Kyiv";
$("#city").on("change", function () {
    cityName = $("#city").val()
});
function locateWeather() {
    var key = "327f72fab114ed047d69b86da9f3afc9";
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + key;
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function (objData) {
            var parameters = objData.main;
            var temperature = parseInt(parameters.temp - 273);
            var pressure = parseInt(parameters.pressure);
            var humidity = parameters.humidity;
            var wind = objData.wind;
            var weather = objData.weather;
            switch (weather[0].icon) {
                case "11d":
                case "11n": {
                    $(".main").css("backgroundImage", "url(img/thunderstorm.png)")
                }
                break;
                case "09d":
                case "09n": {
                    $(".main").css("backgroundImage", "url(img/shower-rain.png)")
                }
                break;
                case "10d":
                case "10n": {
                    $(".main").css("backgroundImage", "url(img/rain.png)")
                }
                break;
                case "13d":
                case "13n": {
                    $(".main").css("backgroundImage", "url(img/snow.png)")
                }
                break;
                case "50d":
                case "05n": {
                    $(".main").css("backgroundImage", "url(img/mist.png)")
                }
                break;
                case "01d":
                case "01n": {
                    $(".main").css("backgroundImage", "url(img/clear-sky.png)")
                }
                break;
                case "02d":
                case "02n": {
                    $(".main").css("backgroundImage", "url(img/few-clouds.png)")
                }
                break;
                case "03d":
                case "03n": {
                    $(".main").css("backgroundImage", "url(img/scattered-clouds.png)")
                }
                break;
                case "04d":
                case "04n": {
                    $(".main").css("backgroundImage", "url(img/broken-clouds.png)")
                }
                break;
            }
            var sysInfo = objData.sys;
            var windDirection;
            if (wind.deg >= 337.5 || wind.deg <= 22.5) {
                windDirection = "N";
            } else if (wind.deg >= 22.5 && wind.deg <= 67.4) {
                windDirection = "NE";
            } else if (wind.deg >= 67.5 && wind.deg <= 112.4) {
                windDirection = "E";
            } else if (wind.deg >= 112.5 && wind.deg <= 157.4) {
                windDirection = "SE";
            } else if (wind.deg >= 157.5 && wind.deg <= 202.4) {
                windDirection = "S";
            } else if (wind.deg >= 247.5 && wind.deg <= 247.4) {
                windDirection = "SW";
            } else if (wind.deg >= 202.5 && wind.deg <= 292.4) {
                windDirection = "W";
            } else if (wind.deg >= 292.5 && wind.deg <= 337.4) {
                windDirection = "NW";
            }
            $("#location").text(objData.name + ", " + sysInfo.country);
            if (parameters.temp !== undefined) {
                $("#temp").html("+" + temperature + " <sup>o</sup>C");
            }
            if (humidity !== undefined) {
                $("#humidity").text(humidity + " %");
            }
            if (pressure !== undefined) {
                $("#pressure").text(pressure + " kPa");
            }
            if (windDirection !== undefined) {
                if (wind.speed !== undefined) {
                    $("#wind").text(windDirection + ", " + wind.speed + " km/h")
                } else {
                    $("#wind").text(windDirection)
                }
            } else {
                $("#wind").text(wind.speed + " km/h")
            }
        }
    });
}
$(":button").on("click", function () {
    locateWeather()
});
$("#search").keypress(function (e) {
    if (e.keyCode === 13) {
        locateWeather();
    }
});
$("#search").on("submit", function (e) {
    e.preventDefault()
});
$(window).on("load", function () {
    locateWeather();
});
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();
if(dd<10) {
    dd = '0'+dd
}
if(mm<10) {
    mm = '0'+mm
}
today = dd + '.' + mm + '.' + yyyy;
$("#date").html(today);