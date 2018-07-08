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
    var url = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + key;
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function (objData) {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1;
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
            var temperature = Math.round(objData.main.temp);
            var pressure = parseInt(objData.main.pressure);
            var humidity = objData.main.humidity;
            var wind = objData.wind;
            switch (objData.weather[0].icon) {
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
            $("#location").text(objData.name + ", " + objData.sys.country);
            $("#temp").empty();
            if (objData.main.temp !== undefined) {
                if (temperature > 0) {
                    $("#temp").html("+" + temperature + " <sup>o</sup>C");
                } else {
                    $("#temp").html(temperature + " <sup>o</sup>C");
                }
            }
            $("#humidity").empty();
            if (humidity !== undefined) {
                $("#humidity").text(humidity + " %");
            }
            $("#pressure").empty();
            if (pressure !== undefined) {
                $("#pressure").text(pressure + " kPa");
            }
            $("#wind").empty();
            if (windDirection !== undefined) {
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
    $("#back").css("visibility", "hidden");
}
function forecast() {
    var key = "327f72fab114ed047d69b86da9f3afc9";
    var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=metric&appid=" + key;
    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        success: function (objData) {
            var list = objData.list;
            var param = [];
            for (var i=0; i<4; i++) {
                var dayParam = {};
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
                    dayParam.day = dd + "." + mm + "." + yyyy;
                    var temps = [];
                    var hums = [];
                    var presses = [];
                    var speeds = [];
                    for (var j = 0; j < list.length; j++) {
                        if (list[j].dt_txt.match(day)) {
                            temps.push(list[j].main.temp);
                            hums.push(list[j].main.humidity);
                            presses.push(list[j].main.pressure);
                            speeds.push(list[j].wind.speed);
                            var icon;
                            var windDirection;
                            if (list[j].dt_txt === day + " 15:00:00") {
                                if (list[j].wind.deg >= 337.5 || list[j].wind.deg <= 22.5) {
                                    windDirection = "N";
                                } else if (list[j].wind.deg >= 22.5 && list[j].wind.deg <= 67.4) {
                                    windDirection = "NE";
                                } else if (list[j].wind.deg >= 67.5 && list[j].wind.deg <= 112.4) {
                                    windDirection = "E";
                                } else if (list[j].wind.deg >= 112.5 && list[j].wind.deg <= 157.4) {
                                    windDirection = "SE";
                                } else if (list[j].wind.deg >= 157.5 && list[j].wind.deg <= 202.4) {
                                    windDirection = "S";
                                } else if (list[j].wind.deg >= 247.5 && list[j].wind.deg <= 247.4) {
                                    windDirection = "SW";
                                } else if (list[j].wind.deg >= 202.5 && list[j].wind.deg <= 292.4) {
                                    windDirection = "W";
                                } else if (list[j].wind.deg >= 292.5 && list[j].wind.deg <= 337.4) {
                                    windDirection = "NW";
                                }
                                switch (list[j].weather[0].icon) {
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
                                        icon = "img/rain-icon.png";
                                    }
                                        break;
                                    case "13d":
                                    case "13n": {
                                        icon = "img/snow-icon.png";
                                    }
                                        break;
                                    case "50d":
                                    case "05n": {
                                        icon = "img/img/mist-icon.png";
                                    }
                                        break;
                                    case "01d":
                                    case "01n": {
                                        icon = "img/clear-icon.png";
                                    }
                                        break;
                                    case "02d":
                                    case "02n": {
                                        icon = "img/few-clouds-icon.png";
                                    }
                                        break;
                                    case "03d":
                                    case "03n": {
                                        icon = "img/scattered-clouds-icon.png";
                                    }
                                        break;
                                    case "04d":
                                    case "04n": {
                                        icon = "img/broken-clouds-icon.png";
                                    }
                                        break;
                                }
                                dayParam.icon = icon;
                            }
                        }
                    }
                    speeds.sort();
                    speeds.reverse();
                    var windSpeed = Math.round(speeds[0]);
                    var averageHum = 0;
                    for (var k = 0; k < hums.length; k++) {
                        averageHum += hums[k];
                    }
                    var humidity = Math.round(averageHum / k);
                    var averagePress = 0;
                    for (var l = 0; l < presses.length; l++) {
                        averagePress += presses[l];
                    }
                    var pressure = Math.round(averagePress / l);
                    temps.sort();
                    var minTemperature;
                    if (temps[0] > 0) {
                        minTemperature = "+" + Math.round(temps[0]) + " <sup>o</sup>C"
                    } else {
                        minTemperature = Math.round(temps[0]) + " <sup>o</sup>C"
                    }
                    temps.reverse();
                    var temperature;
                    if (temps[0] > 0) {
                        temperature = "+" + Math.round(temps[0]) + " <sup>o</sup>C"
                    } else {
                        temperature = Math.round(temps[0]) + " <sup>o</sup>C"
                    }
                }
                dayParam.speed = windSpeed;
                dayParam.humidity = humidity;
                dayParam.pressure = pressure;
                dayParam.minTemperature = minTemperature;
                dayParam.temperature = temperature;
                param.push(dayParam);
                $(date).html("<img src='" + icon + "'><h3>" + dd + "." + mm + "</h3><h4>" + temperature +
                    "</h4><p class='hum'>" + humidity + " %</p><p class='wind'>" + windDirection + "</p><p class='press'>" + pressure + " kPa</p>");
                $(".mini-plate").on("click", function (event) {
                    $("#back").css("visibility", "visible");
                    var target = event.currentTarget;
                    for (var m=0; m<param.length; m++) {
                        var item;
                        if (target == $(".mini-plate")[0]) {
                            item = param[0];
                        } else if (target == $(".mini-plate")[1]) {
                            item = param[1]
                        } else if (target == $(".mini-plate")[2]) {
                            item = param[2]
                        }else if (target == $(".mini-plate")[3]) {
                            item = param[3]
                        }
                        $("#date").text(item.day);
                        $("#temp").html(item.minTemperature + "<br>" + item.temperature);
                        $("#humidity").text(item.humidity + " %");
                        $("#wind").text(item.speed + " m/s");
                        $("#pressure").text(item.pressure + " kPa");
                        switch (item.icon) {
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

                    }
                });
            }
        }
    });
}
$("#search").on("submit", function (e) {
    e.preventDefault();
    currentWeather();
    forecast();
});
$(window).on("load", function () {
    currentWeather();
    forecast();
});
$("#logo, #back").on("click", function () {
    currentWeather();
    forecast();
});