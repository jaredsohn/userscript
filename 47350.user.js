// ==UserScript==
// @name         Mafia Corruption Enemy Online Alert
// @namespace    Fugazi
// @description  Alerts you via a popup when one of your enemies is online
// @include      http://*mafiacorruption.com/usersonline.php*

// ==/UserScript==


if (document.body.textContent.indexOf("[DeathDealer]") !== -1) alert("One of your enemies is online!");