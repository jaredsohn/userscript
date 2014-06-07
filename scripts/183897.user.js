// ==UserScript==
// @name        Youtube-Always-There
// @namespace   youtube
// @description Clicks the "Are you still there?"-button
// @include     https://*youtube.*/watch*
// @include     http://*youtube.*/watch*
// @version     2
// @grant	none
// ==/UserScript==

function isVisible(obj)
{
    if (obj == document) return true
    
    if (!obj) return false
    if (!obj.parentNode) return false
    if (obj.style) {
        if (obj.style.display == 'none') return false
        if (obj.style.visibility == 'hidden') return false
    }
    
    //Try the computed style in a standard way
    if (window.getComputedStyle) {
        var style = window.getComputedStyle(obj, "")
        if (style.display == 'none') return false
        if (style.visibility == 'hidden') return false
    }
    
    //Or get the computed style using IE's silly proprietary way
    var style = obj.currentStyle
    if (style) {
        if (style['display'] == 'none') return false
        if (style['visibility'] == 'hidden') return false
    }
    
    return isVisible(obj.parentNode)
}


checkStillThere = setInterval(function() {

var thing = document.getElementById("watch7-playlist-interstitial");
var button = thing.children[0].children[1];
button.onclick = function()
{
    return;
}
if(!isVisible(button))
{
    return;
}
if(document.createEvent)
{
    var click = document.createEvent("MouseEvents");
    click.initMouseEvent("click", true, true, window,
    0, 0, 0, 0, 0, false, false, false, false, 0, null);
    button.dispatchEvent(click);
    button.focus();
}else if(document.documentElement.fireEvent)
{
    button.fireEvent("onclick");
    button.focus();
}

}, 30000);