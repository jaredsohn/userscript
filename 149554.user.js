// ==UserScript==
// @name       Spectator Tweak
// @namespace  http:/www.cognitechnica.com
// @version    0.1
// @description Tweak that modifies the Columbia spectator website for an experiment for Allison
// @match      http://www.columbiaspectator.com/issue/*
// @copyright  2012+, Andrew Pope
// ==/UserScript==

//Restore jQuery functionality
var $ = unsafeWindow.jQuery;

//Set to false to open automatically
var hide = false;

if(hide) { $("#interalTwoColWrapper > .colRight > .divider.nobar").remove(); }
else { 
    var evt = document.createEvent("MouseEvents"); 
    evt.initMouseEvent("click", true, true, window, 
    0, 0, 0, 0, 0, false, false, false, false, 0, null); 
    $("#interalTwoColWrapper > .colRight > .divider.nobar > a")[0].dispatchEvent(evt);
}