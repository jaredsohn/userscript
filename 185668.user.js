// ==UserScript==
// @name        Infraction button for members list by kLeptO
// @namespace   mlistinfractbutton
// @description Adds infraction button in members list and selects ban evasion infraction by default.
// @include     *.rune-server.org/members/list/*
// @include     *.rune-server.org/infraction.php*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// ==/UserScript==
$(document).ready(function() {
    $("a[class='username']").each(function(index) {
        $(this).after("<a rel='nofollow' id='infract_" + index + "' href='" + document.location + "#' class='small'>Give Infraction</a><br />");
        var profileUrl = $(this).attr("href");
        $("#infract_" + index).click(function() {
            redirectToInfraction(profileUrl);
        });
    });
    if (getURLParameter("evader") == "true") {
        $("#il_61").prop("checked", true);
        $("#banr").val("Ban evasion account");
    }
});

function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

function redirectToInfraction(profileUrl) {
    $.get(profileUrl, function( data ) {
        window.location = $($.parseHTML(data)).find("a[href^='http://www.rune-server.org/infraction.php?do=report']").attr("href") + "&evader=true";
    });
}