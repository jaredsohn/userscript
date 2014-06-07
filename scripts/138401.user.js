// ==UserScript==
// @name          Gmail Label Easyfier
// @namespace     http://devadutta.net/goobe
// @description   Adds a shortcut to access righter label
// @include       https://mail.google.com/mail/u*
// @author        shr
// ==/UserScript==

function clkLabel()
{
    var target = document.getElementById("canvas_frame").contentDocument.body;
    var ifmCls=target.getElementsByClassName("aeF")[0].getElementsByClassName("hN");
    button=ifmCls[ifmCls.length-1];
    simulateClick( button );
}

function simulateClick(element) {
    var clickEvent;
    clickEvent = document.createEvent("MouseEvents")
    clickEvent.initEvent("mousedown", true, true)
    element.dispatchEvent(clickEvent);
    
    clickEvent = document.createEvent("MouseEvents")
    clickEvent.initEvent("click", true, true)
    element.dispatchEvent(clickEvent);
    
    clickEvent = document.createEvent("MouseEvents")
    clickEvent.initEvent("mouseup", true, true)
    element.dispatchEvent(clickEvent);
}

function keyPressEvent(event){
        var kcode = (event.keyCode)?event.keyCode:event.which;
        if(event.altKey) {
                if( kcode == 75) clkLabel(); // 'k' 
        }
} 

document.addEventListener("keydown", keyPressEvent, true);