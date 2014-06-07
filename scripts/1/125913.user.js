// ==UserScript==
// @name           English Reads Left To Right
// @author         nyatagarasu
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
// This software is licensed under poop
// Thanks @xephero for the full profile fix

var s = document.createElement('style');
s.type = "text/css";
s.appendChild(document.createTextNode('.dashboard {float: right; } .content-main {float: left; } .profile-card {float: left !important; } #suggested-users {display: none; }'));
document.head.appendChild(s);