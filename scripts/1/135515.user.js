// ==UserScript==
// @name         Yougle (Very minimalistic Youtube theme)
// @description	 Make Youtube look the way Google does!
// @include	 http://www.youtube.com/
// @include      http://youtube.com/
// @include	 https://www.youtube.com/
// @include      https://youtube.com/
// @resource     CSS   http://webaround.nl/gm/youtube.css
// @grant        GM_addStyle
// @grant        GM_getResourceText
// ==/UserScript==
     
    var content = document.getElementById("page-container");
    var footer = document.getElementById("footer-container");
    var logo = document.getElementById("logo-container");
    var logo_img = document.getElementById("logo");
	
    var CSS = GM_getResourceText("CSS");
    GM_addStyle(CSS);
	
    //Remove all unwanted content
    footer.parentNode.removeChild(footer);
    content.parentNode.removeChild(content);
	
    //The logo shouldn't link to anything
    logo.href = 'javascript:void(0)';
    logo_img.style.backgroundImage = "url()";
    logo_img.src = "http://webaround.nl/YouTube-Logo-Big.png";