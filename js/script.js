/**
 * Created by EveRin on 29.06.2018.
 */
var weatherHeight = $("#parameters").height();
$("#current-weather").css("height", weatherHeight);
$(window).on("resize", function () {
    var weatherHeight = $("#parameters").height();
    $("#current-weather").css("height", weatherHeight);
});
var itemHeight = $("#current-weather").height()/2 - $("#temp").height()/2;
$("#temp").css("top", itemHeight);
$(window).on("resize", function () {
    var itemHeight = $("#current-weather").height()/2 - $("#temp").height()/2;
    $("#temp").css("top", itemHeight);
});