// ==UserScript==
// @name Engadget Gallery Navigation using arrow keys.
// @description Let's you navigate the Engadget galleries using your keyboard's arrow keys.
// @include http://www.engadget.com/photos/*
// @namespace http://www.csc.kth.se/~johanhil/
// ==/UserScript==

(function() {

function clickElem(elem)
{
var clickEvent = document.createEvent ("MouseEvent");
clickEvent.initMouseEvent ("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
elem.dispatchEvent(clickEvent);
}

// TODO uses unsafeWindow instead of window because that's how Chrome does it...? Nt sure if this is proper behaviour.
unsafeWindow.addEventListener('keydown', 
function(e) {
    
    var e = e;

    if (e.keyCode == 39) // TODO what's the proper way to do this? KeyEvent in FF but KeyboardEvent in Chrome? :/
    {
        clickElem(document.getElementById('nav-arrow-right'));
    }
        
    if (e.keyCode == 37)
    {
        clickElem(document.getElementById('nav-arrow-left'));
    }
}
, false);

})();
