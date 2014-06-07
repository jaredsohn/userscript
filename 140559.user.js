// ==UserScript==
// @name          FO Window Cleaner
// @namespace     http://www.xfire.com/profile/frostedfreeze/
// @description   Allows resizable games on FunOrb to reach the boundaries of the window.
// @include       http://*.funorb.com/g=*/*
// @include       http://*.funorb.com/l=*/g=*/*
// @exclude       http://*.funorb.com/g=*/gamelist.ws*
// @exclude       http://*.funorb.com/l=*/g=*/gamelist.ws*
// ==/UserScript==

var $ = function(x) { return document.querySelector(x); };

var e = $('#gamelist').parentNode;
var button = e.cloneNode(true);
button.setAttribute('id', 'Create');
button.getElementsByTagName('span')[0].textContent = 'Full screen';
var a = button.getElementsByTagName('a')[0];
a.setAttribute('href', '#');
a.onclick = create;
e.parentNode.insertBefore(button, e);
$('#navigation .menu li:last-child span').style.width = '78px';
$('#gameContainer li.p11').style.width = 'auto';

function create(event) {
  event.preventDefault();
  button.parentNode.removeChild(button);
  window.game = $('applet');
  $('body').style.minHeight = '0px';
  $('#ResizableContent').style.top = '0px';
  cleanup();
}

function cleanup() {
  var c = game;
  while(c.nodeName != 'BODY') {
    while(c.nextSibling) c.parentNode.removeChild(c.nextSibling);
    while(c.previousSibling) c.parentNode.removeChild(c.previousSibling);
    c = c.parentNode;
  }
}