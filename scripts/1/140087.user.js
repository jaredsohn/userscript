// ==UserScript==
// @name        Better Vote Page
// @namespace   9gag.com/vote
// @description Restores the old vote page
// @include     http://9gag.com/vote
// @include     https://9gag.com/vote
// @version     1.1
// @grant       none
// ==/UserScript==


function run() {
    var script = document.createElement("script");
    script.textContent = "setInterval(function() {$$('.small-thumb').fireEvent('click');}, 500);";
    document.body.appendChild(script);
}

run();