// ==UserScript==
// @name        Rotten Tomatoes link for IMDb
// @namespace   http://userscripts.org/users/Ede123
// @description Adds a direct link to the corresponding Rotten Tomatoes movie description page for every IMDb movie
// @version     0.92
// @icon        http://s3.amazonaws.com/uso_ss/icon/463944/large.png
// @updateURL   https://userscripts.org/scripts/source/463944.meta.js
// @downloadURL https://userscripts.org/scripts/source/463944.user.js
// @include     http://www.imdb.com/title/*
// @grant       none
// ==/UserScript==

// get IMDb movie ID
var IMDbID_RegEx = /\/title\/tt(\d{7})\//;
var IMDbID = IMDbID_RegEx.exec(window.location.href)[1];
//alert(IMDbID);


// create link element to Rotten Tomatoes
RT_link = "http://www.rottentomatoes.com/alias?type=imdbid&s=" + IMDbID;
RT_icon = "http://www.rottentomatoes.com/favicon.ico";

var RT = document.createElement('span');
RT.style.cssFloat = "right";
RT.innerHTML = "<a target='_blank' href='" + RT_link + "'>" +
                   "<img src='" + RT_icon + "' width='16' height='16' style='vertical-align:bottom'/>" +
               "</a>";

//add link to IMDb movie page
var overview = document.getElementById("overview-top");
if (overview) {
    var star_box = overview.getElementsByClassName("star-box")[0];
    var star_box_rating_widget = star_box.getElementsByClassName("star-box-rating-widget")[0];
    star_box_rating_widget.appendChild(RT);
}