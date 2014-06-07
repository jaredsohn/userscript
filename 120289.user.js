// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "TribalWars Enhancer v2", and click Uninstall.
//
// --------------------------------------------------------------------
// ==UserScript==
// @name           TribalWars Enhancer v2
// @version        0.1f
// @namespace      i.am.timas-at-gmail.com
// @description    Ads Remover. 15x15 Map. Shortcuts Bar. twstats quick-access. Multi-Language and more!
// @include        http://pl*.plemiona.pl/*
// @include	   http://en*.ds.ignames.net/*
// @copyright      Copyright (c) 2007 - 2008, Gelu Kelu
// @maintainer     Timas
// ==/UserScript==
javascript:coords='101|836 103|833';var doc=document;if(window.frames.length>0)doc=window.main.document;url=doc.URL;if(url.indexOf('screen=place')==-1)alert('Najpierw wejdz na plac skad masz wysylac czujki');coords=coords.split(" ");index=0;pomocookie=document.cookie.match('(^|;) ?pomo=([^;]*)(;|$)');if(pomocookie!=null)index=parseInt(pomocookie[2]);if(index>=coords.length)alert('To ostatnia wioska');if(index>=coords.length)index=0;coords=coords[index];coords=coords.split("|");index=index+1;cookie_date=new Date(2019,11,11);document.cookie ="pomo="+index+";expires="+cookie_date.toGMTString ();doc.forms[0].x.value=coords[0];doc.forms[0].y.value=coords[1];doc.forms[0].spear.value=5;doc.forms[0]. spy.value=0;javascript:document.forms[0].attack.click();document.forms[0].submit.focus()