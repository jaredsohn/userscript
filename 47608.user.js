// ==UserScript==
// @name           Draggable Box
// @namespace      http://userscripts.org/users/23652
// @description    Draggable Box example
// @include        http://*
// @include        https://*
// @include        file://*
// @copyright      JoeSimmons
// @version        1.0.1
// @license        Creative Commons Attribution-Noncommercial 3.0 United States License
// ==/UserScript==

// OPTIONS ///////////////////////////////////////////////////////////////
var box_style = 'border:4px ridge #0099FF; background:#BFE6FF; color:#000; padding:16px; width:100px; height:14px; text-align:center; cursor:move;';
//////////////////////////////////////////////////////////////////////////

function dragStart(e) {
dragObj.elNode = e.target;
if (dragObj.elNode.nodeType == 3) dragObj.elNode = dragObj.elNode.parentNode;
dragObj.cursorStartX = e.clientX + window.scrollX;
dragObj.cursorStartY = e.clientY + window.scrollY;
dragObj.elStartLeft  = parseInt(dragObj.elNode.style.left, 10);
dragObj.elStartTop   = parseInt(dragObj.elNode.style.top,  10);
dragObj.elNode.style.zIndex = ++dragObj.zIndex;
document.addEventListener("mousemove", dragGo,   true);
document.addEventListener("mouseup",   dragStop, true);
e.preventDefault();
}

function dragGo(e) {
e.preventDefault();
var x = e.clientX + window.scrollX,
	y = e.clientY + window.scrollY;
dragObj.elNode.style.left = (dragObj.elStartLeft + x - dragObj.cursorStartX) + "px";
dragObj.elNode.style.top = (dragObj.elStartTop  + y - dragObj.cursorStartY) + "px";
}

function dragStop(e) {
document.removeEventListener("mousemove", dragGo,   true);
document.removeEventListener("mouseup",   dragStop, true);
}

var dragObj = new Object(), x, y;
dragObj.zIndex = 0;
var div = document.createElement('div');
div.textContent = 'Draggable Box';
div.setAttribute('id', 'draggable_box');
div.setAttribute('style', 'z-index:99; position:fixed; top:'+((window.innerHeight/2)-50)+'px; left:'+((window.innerWidth/2)-50)+'px; -moz-border-radius:6px; '+(box_style?box_style:''));
div.addEventListener('mousedown', function(e){dragStart(e);}, false);
document.body.insertBefore(div, document.body.firstChild);