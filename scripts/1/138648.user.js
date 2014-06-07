// ==UserScript==
// @name         Always escortmode on By Awan
// @description   A script to always have your escort mode on in die2nite
// @include       *
// @exclude       *
// ==/UserScript==
var evt = document.createEvent("MouseEvents");
evt.initEvent("click", true, true);
document.getElementById(#user/waitForLeader?sk=ebd65").dispatchEvent(evt);