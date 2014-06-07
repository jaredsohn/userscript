// ==UserScript==
// @id      lastfmheadphones
// @name    Last.fm: Headphones search
// @description Integrates headphones search with last.fm
// @updateURL http://userscripts.org/scripts/source/185774.meta.js
// @downloadURL http://userscripts.org/scripts/source/185774.user.js
// @author  Herman Dirk
// @version 0.0
// @grant     none
// @include http://*.last.fm/music/*
// @match   http://*.last.fm/music/*
// @run-at  document-end
// @namespace
// Edited version of arch5's http://userscripts.org/scripts/show/157727
// ==/UserScript==
(function(){
var debug=0,
	icon="data:image/png;base64,AAABAAEAEBAAAAAAAABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAAAEAAAAAAAAAAAAAAAEAAAAAAAAAAAAA8vLyANDQ0ADZ2dkA4uLiAOPi4gC3t7cA3+DfAOjp6ADV1NUA0tLSAN7d3gCwsLAA5OTkAMLCwgDm5uYAwcLBANXW1gDW1tYA6+rrAN/f3wDx8fEA29rbAL+/vwDb2toAuLi4AOzs7ADt7OwAsbGxAOTl5QDt7u4A7u7uANTV1QDd3t4A5+fnAO7u7QCsrKwA1dXUAOnp6QAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcJCQkJAAAJCQkJBwAAAAcBgIgJSQAACQSEgoZHAAAJAkDAwMkAAAkGBYYESQAACQhCyQkJAAAJCQkFAckAAAkBAUXAAAAAAAAFw0dJAAAJCIiJCQkAAAkJCQmJiQAACQPGxsbJAAAJCMeHwgkAAAMEBMVFSQAACQBARoODAAAAAwkJCQkAAAkJCQkDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP//AAD//wAA//8AAMGDAACBgQAAgYEAAIGBAACH4QAAgYEAAIGBAACBgQAAwYMAAP//AAD//wAA//8AAP//AAA=",
	hUrl="http://n54l:8181/search?name=",
	tc=document.querySelector("div[class='top-crumb']"),
	bAlbumPage=false;

getArtistOrAlbum=function(){
	var		a=document.querySelector("h1[itemprop='name']"),
			at=a.textContent.replace(/(^\s*)|(\s*$)/gi,'').replace(/[ ]{2,}/gi," ").replace(/\n /,"\n").replace(/\bEP&\b/g,'');
		if(a){
			if(bAlbumPage){
				var ar=tc.getElementsByTagName("a")[0].textContent.replace(/(^\s*)|(\s*$)/gi,'').replace(/[ ]{2,}/gi," ").replace(/\n /,"\n").replace(/\bEP\b/g,'');
				return (ar+' '+at);
			}
			return at;
		} else { dMsg("artist/album title not found on page, or js compatibility problem"); };
};

appendLink=function(){
	var		m=document.querySelector("ul.dropdown-btn-menu","ul.hidden-menu"),
			mn=document.createElement("li"),
			mnc=mn.appendChild(document.createElement("a")),
			mncc=mnc.appendChild(document.createElement("img"));
		if(m){
		m.insertBefore(mn,(m.getElementsByTagName("li")[1]));
		mnc.setAttribute("class","dropdown-btn-menu-item");
		mnc.setAttribute("target","_blank");
		mnc.setAttribute("href",hUrl+getArtistOrAlbum()+"&type=artist");
		mncc.setAttribute("class","download-icon");
		mncc.setAttribute("src",icon);
		mnc.appendChild(document.createTextNode("Download"));
	} else { dMsg("menu not found on page, or browser js compatibility problem"); };

};		

dMsg=function(msg){
	if(debug===1){ 
		console.log(/* arguments.callee.caller.name  + */'error: '+ msg); 
	}
};

// Initialization

if(tc){
	bAlbumPage=true;
	hUrl = "http://n54l:8181/search?name=";
	appendLink();
	
} else { appendLink(); };
//alert(bAlbumPage);
})();