





























// --------------------------------------------------------------------
//
// JVC Signature Generator
// Copyright (c) 2010-2011, JellyTime
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          JVC Signature Generator
// @description   Script pour ajouter une signature sur les forums et les commentaires de jeuxvideo.com
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
// @homepage      http://jellytime.free.fr/jvcsignature/
// @namespace     http://jellytime.free.fr/jvcsignature/
// @author        JellyTime
// @contributor   JellyTime
// ==/UserScript==

var ligne1 = "2 mentos pour toi si tu regarde :";
var ligne2 = "http://www.youtube.com/watch?v=1NsCPtvDLSI&list=UUBM-PUWglVuZM3Dzzos4qBg&index=1&feature=plcp";
var base = document.getElementsByTagName("textarea").item(0).value;

function jvc () {
document.getElementsByTagName("textarea").item(0).value = /* base + */ "\n" + "----------------------------------------" + "\n" + ligne1 + "\n" + ligne2; 
clearInterval (jvcid) 
}
jvcid = setInterval (jvc,0)

