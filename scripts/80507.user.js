/ --------------------------------------------------------------------
//
// Script Coupedumonde: Smiley
// Version 0.5
// 30-6-2010
// Copyright (C) 2010, [Coupedumonde10]
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Script Coupedumonde: Smiley 
// @description   Version 0.1 du 30-06-2010 par [Coupedumonde10] / Script pour ajouter les nouveaux smiley sur les forums de jeuxvideo.com
// @homepage      
// @namespace     
// @include       http://*.blog.jeuxvideo.com/*
// @include       http://www.jeuxvideo.com/commentaires/*
// @exclude       http://www.jeuxvideo.com/forums/0-*
// @include       http://www.jeuxvideo.com/forums/1-*
// @include       http://www.jeuxvideo.com/forums/3-*
// @include       http://www.jeuxvideo.com/profil/*.html
// @include       http://www.jeuxvideo.com/smileys/legende.htm
// @include       http://www.jeuxvideo.com/cgi-bin/jvforums/forums.cgi
// @author        [Coupedumonde10]
// @contributor   [C
// ==/UserScript==

var smiley=document.body.innerHTML;

var reg=new RegExp(":wesh:", "g");
smiley=smiley.replace(reg,"<img border='0' src='http://img228.imageshack.us/img228/2811/msgplusimg0461.png/' alt=':wesh:' />");

