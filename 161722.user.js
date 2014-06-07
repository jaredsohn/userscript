// ==UserScript==
// @name                hv popup remover
// @namespace           smishe
// @description         open hentaiverse links without pop up a window
// @include              http://*e-hentai.org/*
// @version             1.1
// ==/UserScript==


(function(){
	if(document.getElementById("nb")){
		document.getElementById("nb").lastChild.removeAttribute("onclick");
		document.getElementById("nb").lastChild.setAttribute("target","_blank");
	}
	
		
		if(document.getElementById("eventpane")){
				var link = document.getElementById("eventpane").getElementsByTagName("div")[1].getElementsByTagName("a")[0];
				var att = link.getAttribute("onclick");
				var newlink = att.match(/http:\/\/hentaiverse\.org\/\?s=Battle&ss=ba&encounter=[a-z0-9A-Z]+==/);
				link.removeAttribute("onclick");
				link.setAttribute("href",newlink);
				link.setAttribute("target","_blank");
		}
})(); 