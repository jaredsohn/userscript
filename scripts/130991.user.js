// DebBugs-monkey
// version 1.0b3
// 2012-05-03
// Copyright (c) 2012, Mark Caglienzi <mark.caglienzi@gmail.com>
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
// This is the first version of the script.
// I didn't use images, links, or "strange" characters to avoid visualization problems.
//
// T = Top (goes to the top of the page)
// F = First (goes to the first message)
// P = Previous (goes to the previous message)
// N = Next (goes to the next message)
// L = Last (goes to the last message)
// B = Bottom (goes to the bottom of the page)
//
// Please note that Top and Bottom don't modify the "actual" message.
// You can drop me a line to this email address: mark.caglienzi@gmail.com
//
// CHANGELOG:
// 2012-04-15:  First version.
// 2012-04-17:  Now the mouse cursor changes shape hovering the letters.
// 2012-04-18:  Removed findPos() that isn't used, now.
// 2012-05-03:  Replaced letters with UTF-8 arrows and symbols. Added tooltips.
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
// ==UserScript==
// @name Debbugs-monkey
// @version 1.0b3
// @namespace mark.caglienzi@gmail.com
// @description Adds a useful <div> in the bottom right of the page to navigate easily through the messages in bugs.debian.org reports.
// @include http://bugs.debian.org/cgi-bin/bugreport.cgi*
// ==/UserScript==
function build_div()
{
    var _body = document.getElementsByTagName('body') [0];
    // Get messages
    var messages = document.getElementsByClassName('msgreceived');
    var number = messages.length - 1;
    var actualmessage = 1;
    // Create the actual div
    var _div = document.createElement('div');
    _div.innerHTML = '<a style="cursor:pointer;font-size:150%" id="debbugs-pagetop" title="Top of the page">↖</a> <a style="cursor:pointer;font-size:150%" id="debbugs-first" title="First message">⇤</a> <a style="cursor:pointer;font-size:150%" id="debbugs-prev" title="Previous message">⊲</a> <a style="cursor:pointer;font-size:150%" id="debbugs-next" title="Next message">⊳</a> <a style="cursor:pointer;font-size:150%" id="debbugs-last" title="Last message">⇥</a> <a style="cursor:pointer;font-size:150%" id="debbugs-pagebottom" title="Bottom of the page">↘</a>';
    _div.style.width = '150px';
    _div.style.position = 'fixed';
    _div.style.bottom = '1em';
    _div.style.right = '1em';
    _body.appendChild(_div);
    document.getElementById('debbugs-pagetop').onclick = function () {
        document.getElementsByTagName('h1') [0].scrollIntoView();
    }
    document.getElementById('debbugs-first').onclick = function () {
        actualmessage = 1;
        messages[actualmessage].scrollIntoView();
    }
    document.getElementById('debbugs-next').onclick = function () {
        actualmessage++;
        if (actualmessage > (number - 1)) {
            actualmessage = (number - 1);
        }
        messages[actualmessage].scrollIntoView();
    }
    document.getElementById('debbugs-prev').onclick = function () {
        if (actualmessage < 2) {
            actualmessage = 2;
        }
        actualmessage--;
        messages[actualmessage].scrollIntoView();
    }
    document.getElementById('debbugs-last').onclick = function () {
        actualmessage = (number - 1);
        messages[actualmessage].scrollIntoView();
    }
    document.getElementById('debbugs-pagebottom').onclick = function () {
        document.getElementsByTagName('ADDRESS') [0].scrollIntoView();
    }
}
window.onload = build_div();
