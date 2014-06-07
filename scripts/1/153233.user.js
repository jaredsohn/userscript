// ==UserScript==
// @name           amazon (mp3) hi res cover art
// @description    gets you cover art for music in highest possible quality (CURRENTLY WORKS ONLY ON MP3 PAGES)
// @include        http://amazon.com/*
// @include        https://amazon.com/*
// @include        http://www.amazon.com/*
// @include        https://www.amazon.com/*
// @include        http://amazon.co.uk/*
// @include        https://amazon.co.uk/*
// @include        http://www.amazon.co.uk/*
// @include        https://www.amazon.co.uk/*
// @include        http://amazon.de/*
// @include        https://amazon.de/*
// @include        http://www.amazon.de/*
// @include        https://www.amazon.de/*
// @include        http://amazon.at/*
// @include        https://amazon.at/*
// @include        http://www.amazon.at/*
// @include        https://www.amazon.at/*
// @include        http://amazon.fr/*
// @include        https://amazon.fr/*
// @include        http://www.amazon.fr/*
// @include        https://www.amazon.fr/*
// @include        http://amazon.it/*
// @include        https://amazon.it/*
// @include        http://www.amazon.it/*
// @include        https://www.amazon.it/*
// @version        1.0.1
// ==/UserScript==


if(( location.hostname.indexOf('amazon') != -1 ) && ( location.href.indexOf('/images/') != -1 )) {

// document.getElementById('warning').style.display='none';


var lowresadd=document.getElementsByTagName('img')[3].src;

// SX420_SCLZZZZZZZ ==> SCRM
// javascript:alert(document.getElementsByTagName('img')[2].src)

window.moveTo(0,0);
 window.resizeTo(screen.availWidth,screen.availHeight);

var hiresadd = lowresadd.replace("SX420_SCLZZZZZZZ","SCRM");
hiresadd = hiresadd.replace("SS500","SCRM");
hiresadd = hiresadd.replace("SS550","SCRM");

// code needed for .co.uk, thanks to pabouk!
		var amazoncouk=new RegExp("SX413.*", "gi")
		hiresadd = hiresadd.replace(amazoncouk,"SCRM_.jpg");

location.href = hiresadd;


	}
  
