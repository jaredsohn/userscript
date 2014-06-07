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
    elements = $("span:contains('ryse')");
    elements.parent ().remove ();
    movie_player = document.getElementById("movie_player").outerHTML;
    movie_player = movie_player.replace(/title%3D(.(?!%26))*?ryse(?!%2C)(.(?!%2C))*?id%3D[\w-]{11}/ig, 'id%3D');
    movie_player = movie_player.replace(/id%3D[\w-]{11}(?!%2C)(?=([^&](?!%2C))*?ryse)/ig, 'id%3D');
    if (document.getElementById("movie_player").outerHTML != movie_player) {
        document.getElementById("movie_player").outerHTML = movie_player;
    }
}

unsafeWindow._spf_state.config["navigate-limit"] = 0; // disables spf aka red bar
waitForKeyElements ("#watch-related", action);