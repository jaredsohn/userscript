// ==UserScript==
// @name           IT Avisen - Hide ads
// @namespace      http://userscripts.org/users/110690
// @description    Hide QXL and "Ledige stillinger" ads on itavisen.no
// @include        http://www.itavisen.no/*/*
// ==/UserScript==
var elem = document.getElementById('rubrikk_stilling_holder');  
elem.style.display = 'none';
var allHTMLTags = new Array();
var allHTMLTags=document.getElementsByTagName("*");
for (i=0; i<allHTMLTags.length; i++) {
	if (allHTMLTags[i].className=='qxlAdBox') {
		allHTMLTags[i].style.display='none';
	}
}