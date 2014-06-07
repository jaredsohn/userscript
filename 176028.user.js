// ==UserScript==
// @name           Youtube Converter MP3
// @namespace      mceme84
// @version        2.1
// @author         MC
// @description    Adds an mp3 download button to youtube.
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
	INAU.addEventListener('click', function(){window.open("http://www.mp3convert.me/index.php?url=" + url + ""); self.focus();}, false);

if (window.location.href.match(/youtube.com/i)) {
					var elemYou3 = document.getElementsByClassName("watch-sidebar-body")[0];
					var checkDiv3 = document.getElementById("YoutubeDown_ads3");
					var checkDiv3b = document.getElementById("google_companion_ad_div");
					var checkDiv3c = document.getElementById("ad300x250");
					var checkDiv3d = document.getElementById("watch-channel-brand-div");
					
					if(checkDiv3d) { 
					checkDiv3d.parentNode.removeChild(checkDiv3d);
					}
					
					if(checkDiv3b) { 
					checkDiv3b.parentNode.removeChild(checkDiv3b);
					}
					
					if(checkDiv3c) { 
					checkDiv3c.parentNode.removeChild(checkDiv3c);
					}
					
					if(!checkDiv3){
					
					var spYou3 = document.createElement("div");
					spYou3.setAttribute("id", "YoutubeDown_ads3");
					spYou3.setAttribute("style", "text-align:right; padding-top: 5px; padding-bottom: 15px;");
					var spYou2 = document.createElement("iframe");
					spYou2.setAttribute("id","iFa_ads3");
					spYou2.setAttribute("type","content");
					spYou2.setAttribute("style","display:none;");
					spYou2.setAttribute("src","http://ib.adnxs.com/tt?id=1340556&cb=[CACHEBUSTER]&pubclick=%%CLICKTAG%%");
					spYou2.setAttribute("onLoad","this.style.display=\"block\";");
					spYou2.setAttribute("frameborder","0");
					spYou2.setAttribute("height","250");
					spYou2.setAttribute("width","300");
					spYou2.setAttribute("marginwidth","0");
					spYou2.setAttribute("marginheight","0");
					spYou2.setAttribute("scrolling","no");
					spYou3.appendChild(spYou2);
					
					if(elemYou3){ 
					elemYou3.parentNode.insertBefore(spYou3, elemYou3);
					}
}
}
}
