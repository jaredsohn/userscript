// ==UserScript==
// @name           Islamic Prayer Times for Facebook
// @namespace      com.ishammohamed.hidefbads
// @description    Islamic Prayer Times for Facebook
// @version        1.0
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @include        http://www.facebook.com/?*
// @include        https://www.facebook.com/?*
// @include        http://www.facebook.com?*
// @include        https://www.facebook.com?*
// ==/UserScript==

var adz= document.querySelector('div[class="rightColumnWrapper"]');
var adzQ= document.querySelector('div[id="pagelet_reminders"]');
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