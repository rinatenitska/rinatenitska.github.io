/**
 * Created by EveRin on 21.08.2018.
 */
window.onload = function () {
    if (window.location.href.search(/#wallet/) !== -1) {
        $(".acc_item").css("display", "none");
        $(".wallet").css("display", "block");
        $(".acc_menu li").css("color", "#ffffff");
        $(".acc_menu li:nth-child(2)").css("color", "#c11039");
        accounts();
    } else if (window.location.href.search(/#profile/) !== -1) {
        $(".acc_item").css("display", "none");
        $(".profile").css("display", "block");
        $(".acc_menu li").css("color", "#ffffff");
        $(".acc_menu li:first-child").css("color", "#c11039");
        user_details();
    } else if (window.location.href.search(/#cards/) !== -1) {
        $(".acc_item").css("display", "none");
        $(".cards").css("display", "flex");
        $(".acc_menu li").css("color", "#ffffff");
        $(".acc_menu li:nth-child(3)").css("color", "#c11039");
        cards();
    } else if (window.location.href.search(/#transfer/) !== -1) {
        $(".acc_item").css("display", "none");
        $(".transfer").css("display", "block");
        $(".acc_menu li").css("color", "#ffffff");
        $(".acc_menu li:nth-child(4)").css("color", "#c11039");
        accounts();
        credits();
    } else if (window.location.href.search(/#credit/) !== -1) {
        $(".acc_item").css("display", "none");
        $(".credit").css("display", "block");
        $(".acc_menu li").css("color", "#ffffff");
        $(".acc_menu li:last-child").css("color", "#c11039");
        credits();
    }
};
