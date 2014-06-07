// ==UserScript==
// @name        NHL Favorite Team Stats Highlighter
// @namespace   userscripts.org/scripts/show/161413
// @description Highlight your favorite team's player stats in nhl.com
// @include     http://www.nhl.com/ice/playerstats.htm*
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @author      shenault
// @version     1.0.0
// ==/UserScript==

//Change for the abbreviation of your favorite team.
var favoriteTeam = "MTL"

$("table.data tbody tr")
    .filter(function (index) {
        return ($(this).find("td:nth-child(3) a").text().match(favoriteTeam + "$") || $(this).find("td:nth-child(3)").text().match(favoriteTeam + "$"));
    })
.css("background-color", "yellow");