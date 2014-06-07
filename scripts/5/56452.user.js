// ==UserScript==
// @name         Mafia Corruption Bot Check Alert
// @namespace    Fugazi
// @description  Alerts you via a popup when the bot check is on screen
// @include      http://www.mafiacorruption.com/zapache.php*

// ==/UserScript==


if (document.body.textContent.indexOf("[number]") !== -1) alert("Please complete the Bot Check problem before continuing!");