// ==UserScript==
// @name Expand Subtasks
// @namespace http://www.toodledo.com/delayedFeatures/expandsubtasks
// @include http://www.toodledo.com/views/*
// @include https://www.toodledo.com/views/*
// ==/UserScript==



var fireClicker = function fireClicker(oid)
{
var target=document.getElementById(oid);
if(document.dispatchEvent)
{
var oEvent = document.createEvent("MouseEvents");
oEvent.initMouseEvent("click", true, true,window, 1, 1, 1, 1, 1, false, false, false, false, 0, target);
target.dispatchEvent(oEvent);
}
else if(document.fireEvent)
{
target.fireEvent("onclick");
}
}

fireClicker('action_toggleSubtasks');

var originalSwapTab = unsafeWindow.swapTab;

unsafeWindow.swapTab = function(e) { originalSwapTab(); fireClicker('action_toggleSubtasks'); } 