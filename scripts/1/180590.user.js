// ==UserScript==
// @name		MarketGold In a New Look
// @namespace	http://userscripts.org/scripts/edit_src/180590
// @description	This script is intended to enhance the playing experience with the strategy game at http://www.marketglory.com
// @downloadURL	http://userscripts.org/scripts/source/180590.user.js
// @author		jl_wind
// @include		http://*.marketglory.com/*
// @include     http://stackoverflow.com/questions/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @exclude		http://*.marketglory.com/forum/*
// @exclude		http://forum.marketglory.com/*
// @grant		GM_addStyle
// @grant		GM_getValue
// @grant		GM_setValue
// @grant		GM_deleteValue
// @version		1.0.1
// ==/UserScript==

// Creating The Box //
// OPTIONS ///////////////////////////////////////////////////////////////
var box_style = 'border:2px ridge #0099FF; background:#BFE6FF; color:#000; padding:10px; width:100px; height:14px; text-align:center; cursor:move;';
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

// Creating The Button
var zNode       = document.createElement ('div');
zNode.innerHTML = '<button id="myButton" type="button">'
                + 'Attack Now!</button>'
                ;
zNode.setAttribute ('id', 'myContainer');
document.body.appendChild (zNode);

//--- Activate the newly added button.
document.getElementById ("myButton").addEventListener (
    "click", ButtonClickAction, false
);

function ButtonClickAction (zEvent) {
    /*--- When clicked, The button should POST the following info to the server --- name:Action+value:startFight && name:username+value:trainer && class:nd_submit_big mt13+type:submit+name:test---
    */
    var zNode       = document.createElement ('p');
    zNode.innerHTML = 'The button was clicked.';
    document.getElementById ("myContainer").appendChild (zNode);
}

//--- Style our newly added elements using CSS.
GM_addStyle ( multilineStr ( function () {/*!
    #myContainer {
        position:               absolute;
        top:                    0;
        left:                   0;
        font-size:              20px;
        background:             orange;
        border:                 3px outset black;
        margin:                 5px;
        opacity:                0.9;
        z-index:                222;
        padding:                5px 20px;
    }
    #myButton {
        cursor:                 pointer;
    }
    #myContainer p {
        color:                  red;
        background:             white;
    }
*/} ) );

function multilineStr (dummyFunc) {
    var str = dummyFunc.toString ();
    str     = str.replace (/^[^\/]+\/\*!?/, '') // Strip function () { /*!
            .replace (/\s*\*\/\s*\}\s*$/, '')   // Strip */ }
            .replace (/\/\/.+$/gm, '') // Double-slash comments wreck CSS. Strip them.
            ;
    return str;
}