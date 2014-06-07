// ==UserScript==
// @name            Ze Egg Clicker
// @namespace       Cronick
// @description     Clicks on ze eggs
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *lectio.dk/*
// @version         1.0
// ==/UserScript==

setInterval(function() {
    $("#easterhuntCanvas").click();
    console.log("Interval run");
}, 1000);

$("#easterhuntCanvas").click(function () {
    console.log("CLICKED");
});