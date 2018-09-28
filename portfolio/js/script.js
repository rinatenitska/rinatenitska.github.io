/**
 * Created by EveRin on 12.09.2018.
 */
function photoblock() {
    $.ajax({
        type: "GET",
        url: "photoBase.json",
        dataType: "json",
        success: function (objData) {
            var descriptions = [];
            objData.reverse();
            for (var i in objData) {
                descriptions.push(objData[i].description);
            }
            for (var j = 0; j < objData.length/9; j++) {
                $("<li></li>").appendTo("#pages");
                var page = j + 1;
                $("#pages li:last-child").text(page);
            }
            $("#pages li:first-child").addClass("active");
            var number = Number($("#pages li.active").text());
            $("#pages li").on("click", function () {
                $("#pages li").removeClass("active");
                $(this).addClass("active");
                $(".item").remove();
                number = Number($("#pages li.active").text());
                for (var a = (number - 1) * 9; a < number * 9; a++) {
                    if (a < objData.length) {
                        $("<div class='item col-xs-6 col-sm-4'></div>").appendTo(".content");
                        var album = objData[a].category;
                        $(".item:last-child").html("<div class='shadow'><img src='img/item_hover.png'><h4></h4></div>" +
                            "<div class='back'></div>");
                        $(".item:last-child h4").addClass(album);
                        $(".item:last-child h4").text(album);
                        var background = "url(" + objData[a].url + ")";
                        $(".item:last-child .back").css("background-image", background);
                        $(".item").on("mouseover", function() {
                            var width = $(this).find($(".back")).width();
                            $(this).find($(".shadow")).width(width);
                            $(this).find($(".shadow")).css("visibility", "visible");
                        });
                        $(".item").on("mouseout", function() {
                            $(this).find($(".shadow")).css("visibility", "hidden");
                        });
                    }
                }
                $(".item").on("click", function () {
                    $("<div class='big_photo'></div>").prependTo(document.body);
                    $(".big_photo").html("<div class='photo_content'><figure><img></figure><div class='description'></div></div>");
                    var big_photo_url = $(this).find(".back").css("background-image").slice(5, -2);
                    $(".big_photo img").attr("src", big_photo_url);
                    var height = $(".photo_content").height() - $(".big_photo img").height();
                    var figureHeight = $(".photo_content").height()/2 - $(".big_photo img").height();
                    var windowHeight = $(window).innerHeight() - $(".photo_content").height();
                    if ($(window).innerWidth() <= 768) {
                        $(".big_photo figure").css("padding-top", figureHeight/2);
                    } else {
                        $(".big_photo figure").css("padding-top", height/2);
                    }
                    $(".big_photo").css("padding-top", windowHeight/2);
                    number = Number($("#pages li.active").text());
                    for (var b = (number - 1) * 9; b < number * 9; b++) {
                        if (b < objData.length) {
                            var bigPhoto = $(".big_photo img").attr("src");
                            if (bigPhoto.match(objData[b].url)) {
                                $(".big_photo .description").text(objData[b].description);
                            }
                        }
                    }
                    $(".big_photo").on("click", function () {
                        $(".big_photo").remove();
                    })
                })
            });
            for (var a = 0; a < 9; a++) {
                if (a < objData.length) {
                    $("<div class='item col-xs-6 col-sm-4'></div>").appendTo(".content");
                    var album = objData[a].category;
                    $(".item:last-child").html("<div class='shadow'><img src='img/item_hover.png'><h4></h4></div>" +
                        "<div class='back'></div>");
                    $(".item:last-child h4").addClass(album);
                    $(".item:last-child h4").text(album);
                    var background = "url(" + objData[a].url + ")";
                    $(".item:last-child .back").css("background-image", background);
                    descriptions.push(objData[a].description);
                    $(".item").on("mouseover", function() {
                        var width = $(this).find($(".back")).width();
                        $(this).find($(".shadow")).width(width);
                        $(this).find($(".shadow")).css("visibility", "visible");
                    });
                    $(".item").on("mouseout", function() {
                        $(this).find($(".shadow")).css("visibility", "hidden");
                    });
                }
            }
            $(".item").on("click", function () {
                $("<div class='big_photo'></div>").prependTo(document.body);
                $(".big_photo").html("<div class='photo_content'><figure><img></figure><div class='description'></div></div>");
                var big_photo_url = $(this).find(".back").css("background-image").slice(5, -2);
                $(".big_photo img").attr("src", big_photo_url);
                var height = $(".photo_content").height() - $(".big_photo img").height();
                var figureHeight = $(".photo_content").height()/2 - $(".big_photo img").height();
                var windowHeight = $(window).innerHeight() - $(".photo_content").height();
                if ($(window).innerWidth() <= 768) {
                    $(".big_photo figure").css("padding-top", figureHeight/2);
                } else {
                    $(".big_photo figure").css("padding-top", height/2);
                }
                $(".big_photo").css("padding-top", windowHeight/2);
                for (var j = 0; j < $(".item").length; j++) {
                    if ($(this)[0] === $(".item")[j]) {
                        $(".description").text(descriptions[j]);
                    }
                }
                $(".big_photo").on("click", function () {
                    $(".big_photo").remove();
                })
            })
        }
    });
}
function slideshow() {
    $.ajax({
        type: "GET",
        url: "photoBase.json",
        dataType: "json",
        success: function (objData) {
            for (var i in objData) {
                $("<div class='preview'></div>").prependTo("#slides");
                var background = "url(" + objData[i].url + ")";
                $("#slides .preview:first-child").css("background-image", background);
                $(".preview").on("click", function () {
                    $(document.body).css("background-image", $(this).css("background-image"));
                })
            }
            $("#slides .preview:first-child").addClass("active");
            $(document.body).css("background-image", $(".preview.active").css("background-image"));
            $(document).ready(function(){
                $('#slides').slick({
                    autoplay: true,
                    vertical: true,
                    slidesToShow: 7,
                    focusOnSelect: true,
                    pauseOnFocus: false,
                    arrows: false
                });
                $("#slides").on("afterChange", function() {
                    $(document.body).css("background-image", $(".slick-current").css("background-image"));
                })
            });
        }
    });
}
$(".category").on("click", function () {
    $(".category").removeClass("active");
    $(this).addClass("active");
    $(".item").remove();
    $("#pages").empty();
    $.ajax({
        type: "GET",
        url: "photoBase.json",
        dataType: "json",
        success: function (objData) {
            var descriptions = [];
            var categoryItem = [];
            objData.reverse();
            var itemNumber = 0;
            for (var i in objData) {
                if (objData[i].category === $(".category.active").text()) {
                    itemNumber++;
                    categoryItem.push(objData[i]);
                    descriptions.push(objData[i].description);
                }
            }
            for (var j = 0; j < itemNumber/9; j++) {
                $("<li></li>").appendTo("#pages");
                var page = j + 1;
                $("#pages li:last-child").text(page);
            }
            if ($("#pages li:last-child").text() == 1) {
                $("#pages").empty();
            }
            $("#pages li:first-child").addClass("active");
            var number = Number($("#pages li.active").text());
            $("#pages li").on("click", function () {
                $("#pages li").removeClass("active");
                $(this).addClass("active");
                $(".item").remove();
                number = Number($("#pages li.active").text());
                for (var a = (number - 1) * 9; a < number * 9; a++) {
                    if (a < categoryItem.length) {
                        $("<div class='item col-xs-6 col-sm-4'></div>").appendTo(".content");
                        var album = categoryItem[a].category;
                        $(".item:last-child").html("<div class='shadow'><img src='img/item_hover.png'><h4></h4></div>" +
                            "<div class='back'></div>");
                        $(".item:last-child h4").addClass(album);
                        $(".item:last-child h4").text(album);
                        var background = "url(" + categoryItem[a].url + ")";
                        $(".item:last-child .back").css("background-image", background);
                        $(".item").on("mouseover", function() {
                            var width = $(this).find($(".back")).width();
                            $(this).find($(".shadow")).width(width);
                            $(this).find($(".shadow")).css("visibility", "visible");
                        });
                        $(".item").on("mouseout", function() {
                            $(this).find($(".shadow")).css("visibility", "hidden");
                        });
                    }
                }
                $(".item").on("click", function () {
                    $("<div class='big_photo'></div>").prependTo(document.body);
                    $(".big_photo").html("<div class='photo_content'><figure><img></figure><div class='description'></div></div>");
                    var big_photo_url = $(this).find(".back").css("background-image").slice(5, -2);
                    $(".big_photo img").attr("src", big_photo_url);
                    var height = $(".photo_content").height() - $(".big_photo img").height();
                    $(".big_photo figure").css("padding-top", height/2);
                    var windowHeight = $(window).innerHeight() - $(".photo_content").height();
                    $(".big_photo").css("padding-top", windowHeight/2);
                    number = Number($("#pages li.active").text());
                    for (var b = (number - 1) * 9; b < number * 9; b++) {
                        if (b < categoryItem.length) {
                            var bigPhoto = $(".big_photo img").attr("src");
                            if (bigPhoto.match(categoryItem[b].url)) {
                                $(".big_photo .description").text(categoryItem[b].description);
                            }
                        }
                    }
                    $(".big_photo").on("click", function () {
                        $(".big_photo").remove();
                    })
                })
            });
            for (var a = 0; a < 9; a++) {
                if (a < categoryItem.length) {
                    $("<div class='item col-xs-6 col-sm-4'></div>").appendTo(".content");
                    var album = categoryItem[a].category;
                    $(".item:last-child").html("<div class='shadow'><img src='img/item_hover.png'><h4></h4></div>" +
                        "<div class='back'></div>");
                    $(".item:last-child h4").addClass(album);
                    $(".item:last-child h4").text(album);
                    var background = "url(" + categoryItem[a].url + ")";
                    $(".item:last-child .back").css("background-image", background);
                    descriptions.push(objData[a].description);
                    $(".item").on("mouseover", function() {
                        var width = $(this).find($(".back")).width();
                        $(this).find($(".shadow")).width(width);
                        $(this).find($(".shadow")).css("visibility", "visible");
                    });
                    $(".item").on("mouseout", function() {
                        $(this).find($(".shadow")).css("visibility", "hidden");
                    });
                }
            }
            $(".item").on("click", function () {
                $("<div class='big_photo'></div>").prependTo(document.body);
                $(".big_photo").html("<div class='photo_content'><figure><img></figure><div class='description'></div></div>");
                var big_photo_url = $(this).find(".back").css("background-image").slice(5, -2);
                $(".big_photo img").attr("src", big_photo_url);
                var height = $(".photo_content").height() - $(".big_photo img").height();
                $(".big_photo figure").css("padding-top", height/2);
                var windowHeight = $(window).innerHeight() - $(".photo_content").height();
                $(".big_photo").css("padding-top", windowHeight/2);
                for (var j = 0; j < $(".item").length; j++) {
                    if ($(this)[0] === $(".item")[j]) {
                        $(".description").text(descriptions[j]);
                    }
                }
                $(".big_photo").on("click", function () {
                    $(".big_photo").remove();
                })
            })

        }
    });
});
$(window).on("load", function () {
    photoblock();
    slideshow();
});
$(".category:first-child").on("click", function () {
    photoblock();
});