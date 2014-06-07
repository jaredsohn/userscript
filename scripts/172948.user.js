// ==UserScript==
// @name       M-L Sealed Card Image Loader
// @namespace  http://www.magic-league.com/
// @version    1.1
// @description  Used to pull back card pics for M-L sealed builder
// @match      http://www.magic-league.com/tournament/sealed/*
// @copyright  2013+, runt9, Henri
// @require http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

function loadCardImg(name) {
    // Clip off the mana cost and the newline
    var realName = name.replace(/ \(.*/, "").trim();

    // This is the magic. Gatherer's image script takes a name argument... That makes it easy.
    var url = "http://gatherer.wizards.com/Handlers/Image.ashx?name=" + realName + "&type=card";

    // Now just replace the div's content with our image!
    $("#cardImg").html('<img src="' + url + '"/>');
}

$(document).ready(function() {    
    // Bind to sideboard
    $("select[name=select1]").change(function() {
        loadCardImg($(this).find(":selected").last().text());
    });

    // Bind to mainboard
    $("select[name=select2]").change(function() {
        loadCardImg($(this).find(":selected").last().text());
    });

    // Create the image div
    $("form[name='myForm']").find(">:first-child").find(">:first-child").find(">:first-child").append('<div style="float:left; padding-left: 50px" id=cardImg></div>');
});