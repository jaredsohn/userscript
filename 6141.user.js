
// Force Margins v2.0!! BETA!!!!
// copyright Ola Bauge, osbulb atte ye olde gmayle, ye knowe the drille

// ==UserScript==
// @name          Force Margins
// @namespace     http://spod-central.org/~osb
// @description   Force margins onto every page.
// @include       *
// ==/UserScript==

var marginLeft = GM_getValue("marginL", "3em");
var marginRight = GM_getValue("marginR", "4em");

var boddi = document.getElementsByTagName('body')[0];
//boddi.style = "margin-left: " +marginLeft+ "; margin-right: " +marginRight;
//Grocible says, "Error: boddi.sativa has no enlightenment"

boddi.style.marginLeft = marginLeft;
boddi.style.marginRight = marginRight;

GM_setValue("marginL", marginLeft);
GM_setValue("marginR", marginRight);
