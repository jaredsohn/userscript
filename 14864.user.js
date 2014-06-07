// ==UserScript==
// @name           Divxplanet'tan tek tikla indir
// @description    Divxplanet'tan tek tikla indir
// @author         jnothing
// @version        1.0
// @include        http://www.divxplanet.com/sub/s/*
// @include        http://divxplanet.com/sub/s/*


// ==/UserScript==

	

var ilk='href="/indir.php?id=';
var badi=document.body.innerHTML;
var kod=badi.substring(badi.indexOf(ilk)+20);
kod=kod.substring(0,kod.indexOf('"'));

window.location='http://www.divxplanet.com/indir.php?id='+kod;

	