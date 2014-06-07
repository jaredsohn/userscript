// ==UserScript==
// @name           gelio
// @description    shorten url with http://gel.io
// @copyright      2010, Hasan Tayyar BEŞİK (http://hasantayyar.com)
// @license        LGPL 
// @include        *
// ==/UserScript==

function shorten(){
lurl = document.URL;
var tb = document.getElementsByTagName('body')[0];
var ifr = document.createElement("iframe");
ifr.src="http://gel.io/s/"+lurl;
ifr.width=400;
ifr.height=24;
ifr.frameborder=0;
ifr.scrolling="no";
ifr.style="color:#efefef;background-color:#010101";
tb.insertBefore(ifr,tb.firstChild);
}

