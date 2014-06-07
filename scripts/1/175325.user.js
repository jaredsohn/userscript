// ==UserScript==
// @name        TF2R Sidepic Source
// @namespace   http://yulli.org
// @description Adds a link to the sidepic, if one exists
// @grant       none
// @match       http://tf2r.com/k*.html
// @version     1.1
// @copyright   2012+, Yulli
// ==/UserScript==

var iconpardiv = document.getElementsByClassName("raffleicon")[0];
var icondiv = iconpardiv.getElementsByTagName("div")[0];
var iconstyle = icondiv.style.cssText;
var icon_id = iconstyle.split("raffle_icons/")[1].split(".png")[0];
var iconlink = "http://tf2r.com/raffle_icons/" + icon_id + ".png";
var title = document.getElementsByClassName("hfont");

if(iconlink !== undefined) {
    title[0].innerHTML = title[0].innerHTML + "<br/><a href=\"" + iconlink + "\">Sidepic source</a>";
}