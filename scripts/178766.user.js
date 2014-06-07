// ==UserScript==
// @name       douban fm float
// @namespace  http://life.pbunny.me/
// @version    0.1
// @description  float the fm.
// @match      http://douban.fm/
// @copyright  2012+, mippy
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

$(document).ready(
    function(){
        //$(".pro-promo").eq(0).replaceWith("<a id='change_fp'>MEOW:fix</a>");
        //$("#user_info").append("<a id='change_fp'>MEOW:fix</a>");
        //$(".pro-promo").eq(0).replaceWith($(".menu_wrapper").eq(0));
        $(".pro-promo").eq(0).remove();
        $(".menu_wrapper").eq(0).replaceWith("<a id='change_fp'>MEOW:fix</a>");
        $("#change_fp").click(function(){
            if($("#change_fp").text() == 'MEOW:fix'){
                $("#fm-section").css("position", "inherit");
                $("#fm-section").css("width", "auto");
                $("#change_fp").text("MEOW:float");
            } else {
                $("#fm-section").css("position", "relative");
                $("#fm-section").css("width", "900px");
                $("#change_fp").text("MEOW:fix");
            }
        });
    }
);

/*
function change_float_position(set){
    if(set == true) {
        $("#fm-section").css("position", "inherit");
        $("#change_fp").attr("onClick", "change_float_position(false)");
    } else {
        $("#fm-section").css("position", "relative");
        $("#change_fp").attr("onClick", "change_float_position(true)");
    }
    return false;
};
*/