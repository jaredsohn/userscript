// ==UserScript==
// @name         lgjhkghj
// @namespace      rterter
// @description    dgdfgh
// @include        http://www.zorybux.com/advertisements/*
// @include		http://twinbux.com/v/*
// @include		http://*bux.*/v/*
// @include		http://sendmehits.com/aframe.aspx?sid*
// @include		*://*.*/aheader.aspx?time=*
// @include		http://www.10khits.com/surf.php?id*
// @exclude		http://www.neobux.com/v/*
// @include		http://69.65.50.169/adv/*
// ==/UserScript==
if(Iframe = document.evaluate("//iframe[@scrolling='yes']",document,null,9,null).singleNodeValue)
	Iframe.src = '';
else if(Iframe = document.evaluate("//frame[@name='surfmainframe']",document,null,9,null).singleNodeValue) // QualityBux
	Iframe.src = '';
else if(Iframe = document.evaluate("//frame[@name='Main']",document,null,9,null).singleNodeValue) // Fortuda
	Iframe.src = '';
else if(frame = document.evaluate("//frame[@name='view']",document,null,9,null).singleNodeValue) // proautosurf
	frame.src = 'http://vnexpress.net';
else if(frame = document.evaluate("//frame[@id='main']",document,null,9,null).singleNodeValue) // Sendmehits
	frame.src = '';
//else if(frame = document.evaluate("//frame[@id='header']",document,null,9,null).singleNodeValue) // Sendmehits
	frame.src = '';
;