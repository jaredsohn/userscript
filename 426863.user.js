
// JVC Signature Generator

// ==UserScript==
// @name          JVC Signature Generator
// @description   Script pour avoir une signature sur jeuxvideo.com
// @include       http://www.jeuxvideo.com/messages-prives/*
// @include       http://www.jeuxvideo.com/commentaires/*
// @include       http://www.jeuxvideo.com/forums/0-*
// @include       http://www.jeuxvideo.com/forums/3-*
// @include       http://*.forumjv.com/0-*
// @include       http://*.forumjv.com/3-*
// @include       http://www.jvflux.com/commentaires/*
// @include       http://www.forums.jvflux.com/1-*
// @include       http://www.forums.jvflux.com/3-*
// @include       http://jvflux.com/commentaires/*
// @include       http://forums.jvflux.com/1-*
// @include       http://forums.jvflux.com/3-*
// @author        DSG
// @contributor   DSG

// ==/UserScript==

var ligne1 = "";
var ligne2 = "";
var ligne3 = "";
var ligne4 = "you just lost the game.";
var base = document.getElementsByTagName("textarea").item(0).value;

function jvc () {
document.getElementsByTagName("textarea").item(0).value = /* base + */ "\n" + "\n" + ligne1 + "\n" + ligne2 + "\n" + ligne3 + "\n" + ligne4; 
clearInterval (jvcid) 
}
jvcid = setInterval (jvc,0)

