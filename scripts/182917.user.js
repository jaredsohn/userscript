// ==UserScript==
// @name        Unicreatures Click Anyways
// @namespace   http://trueidiocy.us
// @description Adds a link in the exchange to click even when the pet has no credits.
// @include     http://exchange.unicreatures.com/view.php?id=*
// @version     1
// @copyright	© krazykat1980
// @license 	Creative Commons Attribution-Noncommercial-Share Alike 3.0
// @grant       GM_addStyle
// ==/UserScript==


if (document.body.textContent.match(/This pet currently has no credits/)){

var clicky=location.href
newClicky=clicky.replace( /exchange./,"")

var html = document.body.innerHTML;
html = html.replace( /This pet currently has no credits./, " This pet currently has no credits.  If you'd still like to help them without earning credits, click <a href=" + newClicky +'>' + "HERE" + "</a>")
document.body.innerHTML = html;
}






