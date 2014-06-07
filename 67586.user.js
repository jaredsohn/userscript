// ==UserScript==
// @name          Hide posts by dim100
// @description   Hide posts by dim100
// @version       1.1
// @include       http://smangii.proboards.com/*
// @include       http://forum.smangii.com/*
// ==/UserScript==

var td = document.getElementsByTagName("td");

for(i=0;i<td.length;i++){
	if(td[i].getElementsByTagName("a").length == 1 && td[i].width == "14%"){
		if(td[i].getElementsByTagName("a")[0].innerHTML == "dim100")
			td[i].parentNode.style.display="none";
	}
	if(td[i].getElementsByTagName("a").length == 3 && td[i].getElementsByTagName("b").length == 1 && td[i].className=="newsbg"){
		if(td[i].getElementsByTagName("a")[2].innerHTML == "dim100")
			td[i].parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none";
	}
}