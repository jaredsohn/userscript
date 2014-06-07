// ==UserScript==
// @name       Hide Signatures
// @namespace  http://z61.org/
// @version    1.0
// @description  Hides all user signatures on Se7ensins.
// @match      http://www.se7ensins.com/*
// @copyright  2014+, Z61
// ==/UserScript==
var hideSpecificUsers = false;
var users = new Array();
// to add a user, start at zero and increment by one for each user.
// ex: users[0] = "Z61";
// currently is useless.
$(document).ready(hideSigs);
$(".hideSig").css("display", "none");
function hideSigs()
{
    //if (hideSpecificUsers)
    //{
     // will implement later   
    //}
    $(".signature").each(function( index ) {
        var s = $(this).html();
        $(this).html("");
        $(this).prepend("<a href='#'class='sigToggle' style='display:block;'>Show Signature</a><div class='hideSig'></div>");
        $(this).find(".hideSig").html(s);
        //$(this).
    });
    $(".sigToggle").click(function() {
       	 $(this).parent().find(".hideSig").slideToggle();
        if ($(this).parent().find(".hideSig").css('display') == "block")
            $(this).text("Hide Signature");
        else
            $(this).text("Show Signature");
        return false;
    });
}
