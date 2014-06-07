// ==UserScript==
// @name           flyspray_addition
// @namespace      darioM
// @description    Flyspray Addition
// @version        0
// @copyright      2010, 2011 James Campos <dario.meloni@sabre.com>
// @license        GPLv3
// @include        *
// @exclude        http*://flyspray/*
// ==/UserScript==

var modIsPressed = false;
var modKey = 17;

var goToKey = 71; // g

function keyval(n)
{
    if (n == null) return 'undefined';
    var s= pad(3,n);
    if (n >= 32 && n < 127) s+= ' (' + String.fromCharCode(n) + ')';
    while (s.length < 9) s+= ' ';
    return s;
}

keydown = function(e) {
    if (modKey == keyval(e.keyCode))
    {
    	modIsPressed = true;
    }
    if (goToKey == keyval(e.keyCode))
    {
    	document.getElementsByClassName('textbox')[0].focus();
    }
};

keyup = function(e) {
    if (modKey == keyval(e.keyCode))
    {
    	modIsPressed = false;
    }
};

document.addEventListener('keydown', keydown, true);
document.addEventListener('keyup', keyup, true);