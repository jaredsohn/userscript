// ==UserScript==
// @name           ITFtennis.com
// @description    highlight surface and win/loss on page with player's activity on the www.itftennis.com
// @namespace      itf
// @include       http://www.itftennis.com/procircuit/players/player/profile.aspx*
// @include       http://www.itftennis.com/juniors/players/player/profile.aspx*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

var SURFACE_PATTERN = "Surface: ";

var WIN_COLOR = "#C8F7D1";
var LOSS_COLOR = "#FAD2D2";

var SURFACE_CLAY = "#FF9966";
var SURFACE_HARD_OUTDOOR = "#3399CC";
var SURFACE_HARD_INDOOR = "#99CCFF";
var SURFACE_GRASS= "#339933";
var SURFACE_CARPET= "#FFFFCC";

$("h3").css("border-top", "13px solid #000000");

jQuery.each($("ul[class='ulMatch']"), function(i, ul) {
    jQuery.each($(this).children("li"), function(i) {
       var str = jQuery.trim($(this).text());
       if(str.indexOf(SURFACE_PATTERN) > -1) {
         //console.log(str.substr(SURFACE_PATTERN.length) + jQuery.trim($(this).next().text()));
         var surface = str.substr(SURFACE_PATTERN.length) + jQuery.trim($(this).next().text());
         setColorSurface(ul, surface);
         return false;
       }
    });
});

jQuery.each($("td[class='td-30']"), function(i, td) {
    setColorWinLoss(this);
});

jQuery.each($("li[class='liVenue']"), function(i, td) {
    var txt = $(this).text();
    if(txt == "Main Draw") {
        $(this).css("color","black").css("font-weight", "bold").css("font-size","larger");
    } else if(txt == "Qualifying Draw") {
        $(this).css("color","black").css("font-weight", "bold");
    }
});

/** ------ Functions -------------- */

function setColorSurface(ul, surface) {
    var color = null;
    if(surface.indexOf('Clay') != -1) {
        color = SURFACE_CLAY;
    } else if(surface.indexOf('Hard(O)') != -1) {
        color = SURFACE_HARD_OUTDOOR;
    } else if(surface.indexOf('Hard(I)') != -1) {
        color = SURFACE_HARD_INDOOR;
    } else if(surface.indexOf('Grass') != -1) {
        color = SURFACE_GRASS;
    } else if(surface.indexOf('Carpet') != -1) {
        color = SURFACE_CARPET;
    }
    if(color != null) {
        $(ul).css("background-color",color);
        $(ul).css("color","black");
    }
}

function setBackgroundColorToAllTdsInRow(td, color) {
    td.parent().children().css("background-color",color);
}

function setColorWinLoss(td) {
    var wl = jQuery.trim($(td).text());
    if(wl == "W") {
        setBackgroundColorToAllTdsInRow($(td), WIN_COLOR);
    } else if(wl == "L") {
        setBackgroundColorToAllTdsInRow($(td), LOSS_COLOR);
    }
}


