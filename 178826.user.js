// ==UserScript==
// @name            Transformice lower
// @namespace       http://zantier.net/
// @version         1.0
// @description     Read news, then press any key to enter fullscreen, with the game near the bottom of the page. See code for config.
// @match           http://*.transformice.com
// @require         http://code.jquery.com/jquery-1.10.2.min.js
// @grant           none
// ==/UserScript==

// These 3 variables are for configuring.

// If you see white at the top of the game, increase this, but use an even number.
// Default: 1550
var gameHeight = 1550;

// How many pixels the bottom of the game is above the bottom of the window.
// Negative numbers will move the game downwards.
// Default: 10
var distanceFromBottom = 10;

// How many pixels from the top of the page the game initially is.
// Default: 68 (45 looks normal)
var initialGameTop = 68;

/*
    This script lets you check the news, then press a key to fullscreen the game,
    positioning it near the bottom of the window, allowing you to see high up.
    In Firefox, note that the key press doesn't work if you've clicked the game.
    If this happens, click the URL bar, then click anywhere on the page except
    the game. To fullscreen the browser, click the URL bar, then press F11.
    
    We move the SWF to a new element, so that as many elements as possible can be deleted.
    
    When moving the SWF in Chrome, or changing its "position" style, it reloads
    the SWF, so we move the SWF as soon as the page loads, then change its style when
    a key is pressed.
*/

// A div to put swfElement into
var wrapper;
// TransformiceChargeur.swf
var swfElement;

$(document).ready(init);

function init()
{
    $(document.body).keypress(onKeyPress);
    
    swfElement = document.getElementById("swf2");
    wrapper = document.createElement("div");
    // Use a separate span to pad, to stop the links on the right from being covered.
    var paddingSpan = document.createElement("span");
    
    document.body.appendChild(wrapper);
    wrapper.appendChild(swfElement);
    wrapper.appendChild(paddingSpan);
    
    document.body.setAttribute("style", "margin:0;");
    wrapper.setAttribute("style", "position:absolute; top:0; width:100%; height: 0px; text-align:center;");
    swfElement.setAttribute("style", "position:relative; width:800px; height:600px; top:" +
            initialGameTop + "px; margin:auto;");
    paddingSpan.setAttribute("style", "padding-right: 194px; vertical-align:top;");
}

function onKeyPress()
{
    // Note that .keypress(...) is short for .on('keypress, ...)
    $(document.body).off('keypress');
    formatPage();
}

// Delete all nodes except for the given node and its parents.
function deleteAllExcept(node)
{
    var parent = node.parentNode;
    
    if (parent != null)
    {
        var children = parent.childNodes;
        for (var i = children.length - 1; i >= 0; i--)
        {
            if (children[i] != node)
            {
                parent.removeChild(children[i]);
            }
        }
        
        deleteAllExcept(parent);
    }
            
}

// Make the SWF the only thing on the page, filling the window.
function formatPage()
{
    deleteAllExcept(swfElement);
    
    // Get rid of white border and scrollbar
    document.body.setAttribute("style", "margin:0; overflow:hidden;");
    wrapper.setAttribute("style", "position:absolute; bottom:0; width:100%;");
    
    // 600 is the height of the game
    // For an odd "gameHeight", would need to use (f)loor for (F)irefox, and (c)eil for (C)hrome.
    // Nope, I don't know why.
    var bottomOffset = Math.ceil((600 - gameHeight) / 2);
    swfElement.setAttribute("style","position:relative; bottom:" + (bottomOffset + distanceFromBottom) +
            "px; width:100%; height:" + gameHeight + "px;");
    
    // Scroll to the top of the page
    $('body,html').animate({scrollTop: 0}, 1000);
}
