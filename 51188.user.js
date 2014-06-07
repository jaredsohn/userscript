// ==UserScript==
// @name           GameTracker.com IP to HLSW (search page)
// @namespace      http://bakterion.com/
// @description    converts IP addresses to HLSW link on GameTracker.com server search results page
// @include        http://*.gametracker.com/search/*
// @include        http://gametracker.com/search/*
// @date           2009-06-10
// @creator        bgr.gyk@gmail.com 
// @version        1.0
// ==/UserScript==


document.getElementsByClassName = function(cl) {
	var retnode = [];
	var myclass = new RegExp('\\b'+cl+'\\b');
	var elem = this.getElementsByTagName('*');
	for (var i = 0; i < elem.length; i++) {
	var classes = elem[i].className;
	if (myclass.test(classes)) retnode.push(elem[i]);
	}
	return retnode;
}; 



function trim(str, chars) {
	return ltrim(rtrim(str, chars), chars);
}
 
function ltrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
function rtrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}



/////////////////

var a = document.getElementsByClassName("gttable_item gttable_srchsrvr_c07");
for (var i=1; i<a.length-1; i++) {
	a[i].innerHTML = "<a href=\"hlsw://" + a[i].childNodes[1].innerHTML + a[i].childNodes[2].innerHTML + "\"><u>" + trim(a[i].innerHTML) + "</u></a>";
}