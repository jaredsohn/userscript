// ==UserScript== 
// @name Tumblr Notes Nicer
// @namespace http://edada.ms/havent-set-this-up
// @description Makes the new Notes view a bit better 
// @include www.tumblr.com/* 
// @include http://tumblr.com/* 
// @include http://www.tumblr.com/* 
// ==/UserScript== 

function etnn(){ // make function to be executed
    var docHead = document.getElementsByTagName('head')[0];
    var theStyle = document.createElement('style');
    theStyle.type = 'text/css';
    theStyle.id = 'tumblr_notes_better';
    var styleInner = '.notification .notification_inner { padding: 3px !important; min-height: 33px !important; } .notification .notification_sentence { margin-top: 3px !important; margin-bottom: 2px !important; font-weight: 500 !important; } .notification .notification_right { top: 3px !important; right: 4px !important; } .notification .avatar_frame { top: 3px !important; left: 4px !important; } .notes .note span.action { margin-top: 5px !important; font-size: 11px !important; } #posts .post li.note { padding: 3px !important; }';
    theStyle.innerHTML = styleInner;
    docHead.appendChild(theStyle);
}

window.addEventListener("DOMContentLoaded", etnn, true); // run it after body load