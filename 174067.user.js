// ==UserScript==
// @name        Remove Multireddit Thing
// @namespace   aweawefawefawefawe
// @include     http://www.reddit.com/
// @include     /^https?://(www\.)?reddit\.com/((new|rising|controversial|top)/)?$/
// @version     1
// ==/UserScript==
var multireddit_thing = document.querySelector("div.listing-chooser");
multireddit_thing.parentNode.removeChild(multireddit_thing);

document.querySelector("div.content").style.marginLeft = "0px";