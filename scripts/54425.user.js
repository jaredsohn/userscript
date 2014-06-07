// ==UserScript==
// @name           Refresh-Link in Threadview
// @namespace      Meinvz
// @include        http://www.studivz.net/Forum/ThreadMessages/*
// @include        http://www.meinvz.net/Forum/ThreadMessages/*
// ==/UserScript==


var link = document.getElementById('answerMsgLink');
if (link) {
   var neu = document.createElement('a');
   neu.appendChild(document.createTextNode('Refresh'));
   neu.href = window.location.href;

   link.parentNode.appendChild(document.createTextNode(' | '));
   link.parentNode.appendChild(neu);
}