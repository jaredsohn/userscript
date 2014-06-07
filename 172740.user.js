// ==UserScript==
// @name       Goblins arrow navigation
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Allow navigation of the Goblins comic using the arrow keys
// @match      http://goblinscomic.org/*
// @match      http://www.goblinscomic.org/*
// @copyright  2012+, Francisco Vieira
// ==/UserScript==


function handleKeyCode(keycode) {
    if (keycode == 37) {
        prevPageLink = document.querySelector('.nav-previous a');
        if (prevPageLink) {
            window.location.href = prevPageLink.href;
        }
    } else if (keycode == 39) {
        nextPageLink = document.querySelector('.nav-next a');
        if (nextPageLink) {
            window.location.href = nextPageLink.href;
        }
    }
    return false;
}

function keydownie(e) {
    var keycode;
    if (!e) {
        e = window.event;
    }
    if (e.keyCode) {
        keycode = e.keyCode;
        if ((keycode == 39) || (keycode == 37)) {
            window.event.keyCode = 0;
        }
    } else {
        keycode = e.which;
    }
    handleKeyCode(keycode);
}

function keydown(e) {
    var keycode;
    if (e.which) {
        keycode = e.which;
    } else {
        keycode = e.keyCode;
    }
    handleKeyCode(keycode);
}


var browser = navigator.appName;
if (browser == "Microsoft Internet Explorer") {
    document.onkeydown=keydownie;
} else {
    document.onkeydown=keydown;
}