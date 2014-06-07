// ==UserScript==
// @name           myfreemp3.eu Youtube Search
// @namespace      evilpig
// @version        1
// @author         evilpig
// @description    Adds an myfreemp3.eu search button to youtube. Edited version of this https://userscripts.org/scripts/show/176028
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js
// @include        http://www.youtube.com/watch*
// @include        http://youtube.com/watch*
// @include        http://www.youtube.com/watch*
// @include        http://youtube.com/watch*
// ==/UserScript==

if (window.location.href.match(/youtube.com/i)) {
var DIV = document.createElement('span');
	//DIV.innerHTML = '';
	DIV.appendChild(document.createTextNode(''));
	DIV.style.cssFloat = "";
var divp = document.getElementById("watch7-secondary-actions");
if (divp)
	divp.appendChild(DIV);

var url = encodeURIComponent(window.location);
var youtitle = parent.document.getElementsByTagName("title")[0].innerHTML;
    
var metas = document.getElementsByTagName('meta')[0].getAttribute('content');
    
var INAU = document.createElement('input');
	INAU.setAttribute('type','button');
	INAU.setAttribute('name','INAU');
	INAU.setAttribute('value','Download');
	INAU.setAttribute('class','yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip');
	INAU.style.borderLeft = "";
	INAU.style.marginRight = "";
	INAU.style.marginLeft = "";
	INAU.style.borderRadius = "0 3px 3px 0";
	DIV.appendChild(INAU);
	INAU.addEventListener('click', function(){window.open("http://myfreemp3.eu/music/" + metas + ""); self.focus();}, false);

}