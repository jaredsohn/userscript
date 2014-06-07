// NRK XBMC Userscript
// version 0.01
// Aleksander Grande
// Based on NRK user script from Richard H. Tingstad 
//
// Provides a xbmc icon and link for opening a video on your xbmc system.
// Press the link and your xbox should start playing the video you selected.
//
// Enable the webserver in xbmc and configure hostname/ip in the script and you are ready to go.
//
// To use this script with Firefox, you need Greasemonkey. Works with Opera as well.
//
// ==UserScript==
// @name           NRKXBMC
// @namespace      http://grande.cc
// @description    Provides a link to open the NRK web streams in XBMC
// @include        http://www1.nrk.no/nett-tv/*
// @include        http://www.nrk.no/nett-tv/*
// ==/UserScript==
(function () {

var XBMCHOSTNAME = "";

if(!GM_getValue("XBMCHOSTNAME")){
	XBMCHOSTNAME = prompt("What is the ip and port of the XBMC host", "192.168.10.1:8080");
	GM_setValue("XBMCHOSTNAME",XBMCHOSTNAME ); 
}else{
	var XBMCHOSTNAME = GM_getValue("XBMCHOSTNAME");
}

var xmlhttp = new XMLHttpRequest();
var e = document.getElementById('ctl00_ucPlayer_Player');

var url = e.getAttribute('url');
url = url.substr(url.indexOf("://") + 3);
url = url.substr(url.indexOf("/"));

if (xmlhttp != null) {
	xmlhttp.onreadystatechange = stateChange;
	xmlhttp.open("GET", url, true);
	xmlhttp.send(null);
}


function stateChange() {
if (xmlhttp.readyState == 4) {
	if (xmlhttp.status == 200) {	
		var base = parseNrkUrl(xmlhttp);
		var xbmcurl = "http://"+XBMCHOSTNAME+"/xbmcCmds/xbmcHttp?command=PlayFile("+base+")"
		var li = createXbmcLi(xbmcurl);
	}
	else {
		var li = document.createElement('li');
		var textNode = document.createTextNode('Status ' + xmlhttp.status);
		li.appendChild(textNode);
		li=textNode;
	}
	var arr = document.getElementsByTagName("li");
	for (i = 0; i < arr.length; i++) {
   		if(arr[i].className == "tw-share"){
			arr[i].parentNode.appendChild(li);
		}
	}
}
}
function parseNrkUrl(xmlhttp){
	var s = xmlhttp.responseText.indexOf('http://');
	var i = xmlhttp.responseText.substr(s, xmlhttp.responseText.length - s);
	s = i.indexOf('"');
	i = i.substring(0, s);
	var source = i.substring(61,i.length)
	var base = "http://148.122.38.47:80/norsk-ripub/autodistribusjon/"+source+"?MSWMExt=.asf";
	return base;
		
} 
function createXbmcLi(xbmcurl){
	var li = document.createElement('li');
	var image = document.createElement('img');
	image.src = 'http://grande.cc/images/icon_xbmc_image_4.png';
	image.style.position = "relative";
	image.style.top = "-8px";
	var newLink = document.createElement('a');
	var textNode = document.createTextNode('  XBMC');
	newLink.setAttribute('href', xbmcurl);
	newLink.appendChild(image);
	newLink.appendChild(textNode);
	li.style.padding = "0px";
	li.style.margin = "0px";
	li.style.verticalAlign="baseline";
	li.style.top = "-10px";
	li.appendChild(newLink);
	return li;
}

})();