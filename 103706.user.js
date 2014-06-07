// ==UserScript==
// @name           allourl helper
// @namespace      ep_auh
// @include        http://www.allourl.com/*
// @include        http://209.212.147.251/*
// @version        1.4
// ==/UserScript==

	
var hasIframe=false;
if(document.body.getElementsByTagName('iframe').length>0) hasIframe=true;
//alert(hasIframe);

if(!hasIframe){
	var sc = document.createElement("script");
	sc.type = "text/javascript";
	sc.charset = "utf-8";
    sc.innerHTML = " function gourl(){if(document.getElementById('movieL').innerHTML.match(/mega/)){window.parent.parent.location.href=document.getElementById('movieL').getElementsByTagName('a')[0].href;window.parent.document.body.innerHTML='<div style=\"font-size:100px;font-family:georgia;text-align:center;padding-top:50px;font-style:italic;\">Loading hard..'+'.</div>';clearInterval(gou);}} var gou=setInterval(gourl,500);";
	document.body.appendChild(sc);

} else {
    var host = "unknown";
    if (/\?u=/.test(window.location.href)) {
        //look at t=
        if (/t=mv/.test(window.location.href)) host = "MegaVideo";
        if (/t=mu/.test(window.location.href)) host = "MegaUpload";
    }

	var he = document.createElement("div");
	he.style.fontSize=20;
	he.style.fontFamily="arial";
	he.style.color="#000";
	he.style.position="absolute";
	he.style.top="130px";
	he.style.left="50%";
	he.style.marginLeft="-28px";
	he.style.width="200px";
	he.style.textAlign="center";
	he.innerHTML="Host is "+host;
	document.body.appendChild(he);

	
}
