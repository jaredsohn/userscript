// ==UserScript==
// @name       Block contact list ads on plus.im
// @namespace DalekSec Userscripts
// @version    1.0
// @description  Blocks the annoying ad on plus.im which Adblock+ fails to block.
// @match      https://plus.im
//
// ==/UserScript==
var footers = document.getElementsByClassName("footer");
var ad = footers[1]; // The actual annoying ad -- Adblock+ fails on this because there are multiple elements with this class.
ad.style.height = "0px";
ad.style.width = "0px";