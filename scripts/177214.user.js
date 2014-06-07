// ==UserScript==
// @name        DailyMail right pane remover
// @namespace   http://tilman.baumann.name/femaleremover
// @description If you have to read that site, you can at least without getting blind
// @include     http://www.dailymail.co.uk/news/*
// @version     1
// @requir      http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       none
// ==/UserScript==

window.$(document).ready(function () {
    window.$(".beta").remove();
});