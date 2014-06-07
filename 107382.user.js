// --------------------------------------------------------------------------
// ==UserScript==
// @name           Show Bangumi Reply
// @description    Show reply
// @include        http://bangumi.tv/*
// @include        http://bgm.tv/*
// @include        http://chii.in/*
// ==/UserScript==
//
// --------------------------------------------------------------------------


var msg = document.getElementsByClassName("message");
for (var i = 0; i < msg.length; i++)
  {
  msg[i].style.overflow = 'hidden';
  }
