// ==UserScript==
// @name           GameTracker.com IP to HLSW
// @namespace      http://bakterion.com/
// @description    converts IP address to HLSW link on GameTracker.com server info pages
// @include        http://*.gametracker.com/server_info/*
// @include        http://gametracker.com/server_info/*
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

var ipaddress = trim(document.getElementsByClassName("infosection_text")[2].innerHTML);
var port = trim(document.getElementsByClassName("infosection_text")[3].innerHTML);

document.getElementsByClassName("infosection_text")[2].innerHTML = "<a href=\"hlsw://" + ipaddress + ":" + port + "\"><u>" + ipaddress + "</u></a>";

