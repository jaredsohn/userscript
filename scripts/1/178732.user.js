// ==UserScript==
// @name        GoldenMiner Autoclick
// @author      trololo
// @namespace   *
// @description Clicks the mine automatically
// @version     1.0
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// ==/UserScript==

function ClickLoop()
{
$("#mines").click();
window.setTimeout(ClickLoop, 1);
}
ClickLoop();

