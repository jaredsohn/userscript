// --------------------------------------------------------------------
//
// JVC Signature
// Copyright (c) 2013 - Zeper
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          JVC Signature
// @description   ajouter une signature sur jeuxvideo.com et sa version mobile.
// @version       0.1
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
// @include       http://m.jeuxvideo.com/messages-prives/*
// @include       http://m.jeuxvideo.com/commentaires/*
// @include       http://m.jeuxvideo.com/forums/0-*
// @include       http://m.jeuxvideo.com/forums/3-*
// @include       http://*.forumjv.com/0-*
// @include       http://*.forumjv.com/3-*
// @include       http://m.jvflux.com/commentaires/*
// @include       http://m.forums.jvflux.com/1-*
// @include       http://m.forums.jvflux.com/3-*
// @include       http://jvflux.com/commentaires/*
// @include       http://forums.jvflux.com/1-*
// @include       http://forums.jvflux.com/3-*
// @homepage      http://m.jeuxvideo.com/profil/zeper666.html
// @namespace     http://m.jeuxvideo.com/profil/zeper666.html
// @author        Zeper
// @contributor   Zeper
// ==/UserScript==

var ligne1 = "             ";
var ligne2 = "insert ton message";
var ligne3 = "¯¯\\/¯¯¯¯¯¯¯¯¯¯";
var ligne4 = " Mais ton smile";
var base = document.getElementsByTagName("textarea").item(0).value;

function jvc () {
document.getElementsByTagName("textarea").item(0).value = /* base + */ "\n" + "______________________________" + "\n" + ligne1 + "\n" + ligne2 + "\n" + ligne3 + "\n" + ligne4; 
clearInterval (jvcid) 
}
jvcid = setInterval (jvc,0)

