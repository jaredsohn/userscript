// ==UserScript==
// @name           Islamic Prayer Times for Google
// @namespace      com.ishammohamed.googlePrayerTimes
// @description    Islamic Prayer Times for Google
// @version        1.0
// @include        http://www.google.com/*
// @include        https://www.google.com/*
// @include        http://google.com/*
// @include        https://google.com/*
// @include        http://www.google.*/*
// @include        https://www.google.*/*
// @include        http://google.*/*
// @include        https://google.*/*
// @include        http://www.google.lk/*
// @include        https://www.google.lk/*
// @include        http://google.lk/*
// @include        https://google.lk/*
// @include        http://google.lk/
// @include        https://google.lk/
// ==/UserScript==

var adz= document.querySelector('div[id="main"]');
var adzQ= document.querySelector('div[id="lga"]');
var ifrm = document.createElement("iframe");
	ifrm.setAttribute("src", "http://akurana.info/prayertimes/a.php?tblGradient1Color=adecff&tblOddRowColor=5aa4e0&tblGradient2Color=63cfed&tblEvenRowColor=73b6f0&tblDateColor=025fc2&tblDataColor=78073e&tblHeadingColor=57024d"); 
        ifrm.setAttribute("scrolling", "no");
	ifrm.style.width = 250+"px"; 
	ifrm.style.height = 300+"px"; 
        ifrm.style.borderWidth="0";
if (adz) {
    adz.insertBefore(ifrm, adzQ);
	//adz.appendChild(ifrm);
	//adz.parentNode.innerHTML ('http://akurana.info/prayertimes/a.php?tblGradient1Color=000f6e&tblOddRowColor=400269&tblGradient2Color=040f5c&tblEvenRowColor=4a0573&tblDateColor=000000&tblDataColor=ffffff&tblHeadingColor=a3aaf7');
}

//ifrm = document.createElement("iframe");
//ifrm.setAttribute("src", "http://akurana.info/prayertimes/a.php?tblGradient1Color=000f6e&tblOddRowColor=400269&tblGradient2Color=040f5c&tblEvenRowColor=4a0573&tblDateColor=000000&tblDataColor=ffffff&tblHeadingColor=a3aaf7"); 
//ifrm.style.width = 640+"px"; 
//ifrm.style.height = 480+"px"; 
//document.body.appendChild(ifrm);