// ==UserScript==
// @name       Etherpad Notifier
// @namespace  http://software-carpentry.org/
// @version    0.95
// @description  Flashes your window title when someone chats. 
// @match      https://*.etherpad.mozilla.org/*
// @grant      GM_getValue
// @copyright  2013,  Jon Pipitone
// @require http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @require https://raw.github.com/heyman/jquery-titlealert/master/jquery.titlealert.js
// @require https://raw.github.com/luciferous/beepjs/master/beep.js
// ==/UserScript==

var pageChangeHandler = function (e) {
    if (document.hasFocus()) return;
   
    // new Beep(22050).play(500, .1, [Beep.utils.amplify(10000)]);
    $.titleAlert("...", {
        requireBlur:false,
        stopOnFocus:true,
        stopOnMouseMove: true,
        duration:0,
        interval:1000
	})
}

// can also use element 'chatlines' for only chat notifications
document.getElementById('padbody').addEventListener("DOMSubtreeModified", pageChangeHandler, false);