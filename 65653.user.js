// ==UserScript==
// @name           PornHost Page Cleaner
// @namespace      local
// @description    Hide Everything from the page except the Video and remove all "on play" ad/
// @include        http://www.pornhost.com/*
// ==/UserScript==

function todo(){
	document.getElementsByTagName("center")[0].style.display = "none";
	document.getElementsByTagName("center")[4].style.display = "none";
	document.getElementById("leftpanel").style.display = "none";
	document.getElementById("rightpanel").style.display = "none";
	document.getElementById("clickmovie").style.display = "none";
	document.getElementById("movie_add").style.display = "none";
	
	var p = document.getElementsByTagName("p");
		p[0].style.display = "none";
		
		document.getElementsByTagName("fieldset")[0].style.display = "none";
		
		document.getElementsByTagName("ul")[1].style.display = "none";
		document.getElementsByTagName("ul")[2].style.display = "none";
		
		document.getElementById("moviecontainer").style.marginTop = "100px";
}

todo();