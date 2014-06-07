// ==UserScript==
// @name          Zoom BookCrossing Textarea
// @namespace     http://zartbitter.heim.at/BC/
// @description   add controls to zoom some textareas of www.bookcrossing.com
// @include       *bookcrossing.com/editjournalentry/*
// @include       *bookcrossing.com/myprofile*
// @include       *bookcrossing.com/sendmessage/*
// @include       *bookcrossing.com/forum/*
// @include       *bookcrossing.com/*-*
// ==/UserScript==
//
// version 0.2
// 2005-12-11
// Updated for GreaseMonkey 0.6.4 and Firefox 1.5
// Based on Zoom Textarea by Mark Pilgrim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Zoom BookCrossing Textarea", and click Uninstall.
//
// --------------------------------------------------------------------

var textareas, textarea;

textareas = document.getElementsByTagName('textarea');
if (!textareas.length) { return; }

function textarea_zoom(event,target,step,direction) {
    var link, textarea, s, altwert, neuwert;
    link = event.currentTarget;
    if (direction == 'x') {
        altwert = document.defaultView.getComputedStyle(target,'').getPropertyValue('width');
        neuwert = (parseFloat(altwert) + step);
        if (neuwert < 10) { neuwert = 10; }
        target.style.width = neuwert + 'px';
    } else {
        if (direction == 'y') {
            altwert = document.defaultView.getComputedStyle(target,'').getPropertyValue('height');
            neuwert = (parseFloat(altwert) + step);
            if (neuwert < 10) { neuwert = 10; }
            target.style.height = neuwert + 'px';
        }
    }
    event.preventDefault();
}

function createZoomLink(target, title, step, direction) {
    var boldText, linkText;
    boldText = document.createElement('code');
    boldText.appendChild(document.createTextNode(title));
    linkText = document.createElement('a');
    linkText.href='#';
    linkText._target = target;
    linkText.appendChild(boldText);

    linkText.addEventListener('click', function(event) {
      textarea_zoom(event,target,step,direction);
      }, true);

    return linkText;
}

for (var i = 0; i < textareas.length; i++) {
    textarea = textareas[i];
    textarea.parentNode.insertBefore(document.createTextNode('[ '), textarea);
    textarea.parentNode.insertBefore(createZoomLink(textarea, '-x', -50, 'x'), textarea);
    textarea.parentNode.insertBefore(document.createTextNode(' '), textarea);
    textarea.parentNode.insertBefore(createZoomLink(textarea, '+x', 50, 'x'), textarea);
    textarea.parentNode.insertBefore(document.createTextNode(' '), textarea);
    textarea.parentNode.insertBefore(createZoomLink(textarea, '-y', -50, 'y'), textarea);
    textarea.parentNode.insertBefore(document.createTextNode(' '), textarea);
    textarea.parentNode.insertBefore(createZoomLink(textarea, '+y', 50, 'y'), textarea);
    textarea.parentNode.insertBefore(document.createTextNode(' ]'), textarea);
    textarea.parentNode.insertBefore(document.createElement('br'), textarea);

}

