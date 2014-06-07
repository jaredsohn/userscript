// ==UserScript==
// @name       NZB Suche direkt von moviepilot starten
// @version    1.1
// @description  NZB-Links auf moviepilot.de
// @match      http://*.moviepilot.de/*
// @match      http://moviepilot.de/*
// @copyright  2014+, Rufus George
// ==/UserScript==

function getElements(){

	var elements = document.getElementsByTagName("UL");
	var elements2=[];
	for (var i=0;i<elements.length;i++){
		if (elements[i].className == "movies" && elements[i].getElementsByTagName("LI").length>3){
			elements2.push(elements[i]);
	 }
	}
	var els2 = elements2[0].getElementsByTagName("LI");
	for (var i=0;i<els2.length;i++){
	
		var h3 = els2[i].getElementsByTagName("h3")[0];
		h3.style.display="inline-block";
		
		var title = h3.firstChild.innerHTML;
		
		var link = document.createElement("A");
		
		link.setAttribute("target", "_blank");
		
		link.style.marginLeft="10px";
		link.setAttribute("href", "http://nzbindex.nl/search/?q="+title+"&age=&max=50&minage=&sort=agedesc&minsize=500&maxsize=&dq=german+%7C+deutsch&poster=&nfo=&hidespam=0&hidespam=1&more=1");
		link.innerHTML = "Auf NZB-Index suchen";
		
		els2[i].insertBefore(link, h3.nextSibling);
	
	}
	return elements2;
}

window.setTimeout(getElements, 1000);