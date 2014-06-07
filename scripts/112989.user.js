// ==UserScript==
// @name           Enable shift key on Fukung
// @namespace      thedmd
// @version        1.0.1
// @description    Key handler for fukung.net
// @include        http://fukung.net/*
// ==/UserScript==

function enableShiftKey()
{
    if (document.captureEvents && Event.KEYUP)
        document.captureEvents(Event.KEYUP);
        
    document.addEventListener('keyup', keyHandlerWithShift, false); 
}

function keyHandlerWithShift(e)
{
    var key = window.event ? e.keyCode : e.which;

    if (16 == key)    
    {
        GM_log('Moveing to the random page...');
        document.location.href = "/random";
    }
}

enableShiftKey()
