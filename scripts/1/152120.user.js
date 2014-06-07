// ==UserScript==
// @name        Gmail mute label
// @namespace   https://mail.google.com/*
// @description Mutes a message that is not in Inbox
// @include     https://mail.google.com/*
// @version     1
// @grant       none
// ==/UserScript==

function KeyCheck(e)
{
  var keychar=String.fromCharCode(e.KeyCode);
  if (e.keyCode == 'M')
    alert("M pressed");
}

window.addEventListener('keypress', KeyCheck, true);