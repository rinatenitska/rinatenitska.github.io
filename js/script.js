/**
 * Created by EveRin on 29.06.2018.
 */
var cityName = "Kyiv";
$("#city").on("change", function () {
    cityName = $("#city").val()
});
var json;
function currentWeather() {
    var key = "327f72fab114ed047d69b86da9f3afc9";
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + key;
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function (objData) {
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
            $("#date").empty();
            $("#date").text(today);
            var parameters = objData.main;
            var temperature = Math.round(parameters.temp - 273);
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
                $("#temp").empty();
                if (temperature > 0) {
                    $("#temp").html("+" + temperature + " <sup>o</sup>C");
                } else {
                    $("#temp").html(temperature + " <sup>o</sup>C");
                }
            }
            if (humidity !== undefined) {
                $("#humidity").empty();
                $("#humidity").text(humidity + " %");
            }
            if (pressure !== undefined) {
                $("#pressure").empty();
                $("#pressure").text(pressure + " kPa");
            }
            if (windDirection !== undefined) {
                $("#wind").empty();
                if (wind.speed !== undefined) {
                    $("#wind").text(windDirection + ", " + Math.round(wind.speed) + " m/s")
                } else {
                    $("#wind").text(windDirection)
                }
            } else {
                $("#wind").text(Math.round(wind.speed) + " m/s")
            }
        }
    });
    $(".mini-plate").css("backgroundColor", "#0d568c");
    $("#back").css("visibility", "hidden");
}
function forecast() {
    var key = "327f72fab114ed047d69b86da9f3afc9";
    var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + key;
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function (objData) {
            var list = objData.list;
            for (var i=0; i<$(".mini-plate").length; i++) {
                var date = $(".mini-plate")[i];
                for (var j = 0; j < list.length; j++) {
                    var day = new Date();
                    var dd = day.getDate() + i + 1;
                    var mm = day.getMonth() + 1;
                    var yyyy = day.getFullYear();
                    if (dd < 10) {
                        dd = '0' + dd
                    }
                    if (mm < 10) {
                        mm = '0' + mm
                    }
                    day = yyyy + "-" + mm + "-" + dd;
                    if (list[j].dt_txt === day + " 12:00:00") {
                        var item = list[j];
                        var parameters = item.main;
                        var weather = item.weather;
                        var temp = Math.round(parameters.temp - 273);
                        var pressure = Math.round(parameters.pressure);
                        var humidity = parameters.humidity;
                        var wind = item.wind;
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
                        var temperature;
                        if (parameters.temp !== undefined) {
                            if (temp > 0) {
                                temperature = "+" + temp + " <sup>o</sup>C"
                            } else {
                                temperature = temp + " <sup>o</sup>C"
                            }
                        }
                        var icon;
                        switch (weather[0].icon) {
                            case "11d":
                            case "11n": {
                                icon = "img/thunderstorm-icon.png";
                            }
                                break;
                            case "09d":
                            case "09n": {
                                icon = "img/shower-rain-icon.png";
                            }
                                break;
                            case "10d":
                            case "10n": {
                                icon =  "img/rain-icon.png";
                            }
                                break;
                            case "13d":
                            case "13n": {
                                icon =  "img/snow-icon.png";
                            }
                                break;
                            case "50d":
                            case "05n": {
                                icon =  "img/img/mist-icon.png";
                            }
                                break;
                            case "01d":
                            case "01n": {
                                icon =  "img/clear-icon.png";
                            }
                                break;
                            case "02d":
                            case "02n": {
                                icon =  "img/few-clouds-icon.png";
                            }
                                break;
                            case "03d":
                            case "03n": {
                                icon =  "img/scattered-clouds-icon.png";
                            }
                                break;
                            case "04d":
                            case "04n": {
                                icon =  "img/broken-clouds-icon.png";
                            }
                                break;
                        }
                    }
                }
                $(date).html("<img src='" + icon + "'><h3>" + dd + "." + mm + "</h3><h4>" + temperature +
                    "</h4><p class='hum'>" + humidity + " %</p><p class='wind'>" + windDirection + ", " + Math.round(wind.speed) + " m/s</p><p class='press'>" + pressure + " kPa</p>");
                $(".mini-plate").on("click", function (event) {
                    $("#back").css("visibility", "visible");
                    $(".mini-plate").css("backgroundColor", "#0d568c");
                    $(this).css("backgroundColor", "#0D65A8");
                    var target = event.currentTarget;
                    var foreParams = $(target).children();
                    var iconFore = $(foreParams[0]).attr("src");
                    var dateFore = $(foreParams[1]).text();
                    var tempFore = $(foreParams[2]).html();
                    var humFore = $(foreParams[3]).text();
                    var windFore = $(foreParams[4]).text();
                    var pressFore = $(foreParams[5]).text();
                    $("#date").text(dateFore);
                    $("#temp").html(tempFore);
                    $("#humidity").text(humFore);
                    $("#wind").text(windFore);
                    $("#pressure").text(pressFore);
                    switch (iconFore) {
                        case "img/thunderstorm-icon.png": {
                            $(".main").css("backgroundImage", "url(img/thunderstorm.png)")
                        }
                            break;
                        case "img/shower-rain-icon.png": {
                            $(".main").css("backgroundImage", "url(img/shower-rain.png)")
                        }
                            break;
                        case "img/rain-icon.png": {
                            $(".main").css("backgroundImage", "url(img/rain.png)")
                        }
                            break;
                        case "img/snow-icon.png": {
                            $(".main").css("backgroundImage", "url(img/snow.png)")
                        }
                            break;
                        case "img/img/mist-icon.png": {
                            $(".main").css("backgroundImage", "url(img/mist.png)")
                        }
                            break;
                        case "img/clear-icon.png": {
                            $(".main").css("backgroundImage", "url(img/clear-sky.png)")
                        }
                            break;
                        case "img/few-clouds-icon.png": {
                            $(".main").css("backgroundImage", "url(img/few-clouds.png)")
                        }
                            break;
                        case "img/scattered-clouds-icon.png": {
                            $(".main").css("backgroundImage", "url(img/scattered-clouds.png)")
                        }
                            break;
                        case "img/broken-clouds-icon.png": {
                            $(".main").css("backgroundImage", "url(img/broken-clouds.png)")
                        }
                            break;
                    }
                });
            }
        }
    });
}
$(":button").on("click", function () {
    currentWeather();
    forecast()
});
$("#search").on("submit", function (e) {
    e.preventDefault();
    currentWeather();
    forecast()
});
$(window).on("load", function () {
    currentWeather();
    forecast()
});
$("#logo, #back").on("click", function () {
    currentWeather();
    forecast()
});