// ==UserScript==
// @name     Remove related youtubes
// @include  http://*.youtube.com/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant    GM_addStyle
// ==/UserScript==

jQuery.expr[':'].contains = function(a, i, m) {
    return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
};

function action () {
    var elements = $("span:contains('ryse')");
    elements.parent ().remove ();
    document.getElementById("player-api").innerHTML = document.getElementById("player-api").innerHTML.replace(/title%3D(.(?!%26))*?ryse(?!%2C)(.(?!%2C))*?id%3D[\w-]{11}/ig, 'id%3D');
    document.getElementById("player-api").innerHTML = document.getElementById("player-api").innerHTML.replace(/id%3D[\w-]{11}(?!%2C)(?=([^&](?!%2C))*?ryse)/ig, 'id%3D');
}

waitForKeyElements ("#watch-related", action);