// ==UserScript==
// @name			Jappy-Extended Mail und GB
// @namespace		gorgon
// @description		erweitert die freunde-online liste und die suchseiten um mail- und gb-links
// @version			1.0
// @include			http://www.jappy.*
// @exclude			http://www.jappy.*chat*
// ==/UserScript==

// seitenadresse auslesen
var url = document.location.href;
if (url.indexOf("jappy.de")>=0) {
var serverURL = "http://www.jappy.de";
}
if (url.indexOf("jappy.at")>=0) {
var serverURL = "http://www.jappy.at";
}

// anzeige freunde online unter linker mini-navi
var contenta = document.getElementById("blBuddies");
if(contenta.hasChildNodes()){
	for(i=0;i<contenta.childNodes.length;i++){
	node = contenta.childNodes[i];
	if(node.hasChildNodes()){
		nicknamea = node.childNodes[1].getAttribute("href").replace("/mailbox/new?to=","");
		node.innerHTML = node.innerHTML + '<a href="/user/'+nicknamea+'/gb/new" title="GB-Eintrag"><span class="icGbRe">&nbsp;</span></a>';
		}
	}
}

// anzeige eigene freundesseite
if (url.indexOf(""+serverURL+"/myjappy/friends")>=0) {

var contentb = document.getElementsByClassName("mr5 pl10 ldN mt10");
for(i=0;i<contentb.length;i++){
node = contentb[i];
if(node.hasChildNodes()){
	nicknameb = node.childNodes[1].getAttribute("href").replace("/user/","");
	node.innerHTML = node.innerHTML + '<a href="/mailbox/new?to='+nicknameb+'" title="Mail an '+nicknameb+'"><span class="icMailbox">&nbsp;</span></a><a href="/user/'+nicknameb+'/gb/new" title="GB-Eintrag"><span class="icGbRe">&nbsp;</span></a>';
	}
}
}

// anzeige auf den suchseiten
if(url == ""+serverURL+"/search" || window.location.href == ""+serverURL+"/search/online" || window.location.href == ""+serverURL+"/search/newUsers/"){

var contentc = document.getElementsByClassName("result");
for(i=0;i<contentc.length;i++){
node = contentc[i];
if(node.hasChildNodes()){
	nicknamec = node.childNodes[1].getAttribute("href").replace("/user/","");
	node.innerHTML = node.innerHTML + '<br/><a style="position:relative; top:-42px; height:22px; float:left; padding:0px 10px 0px 10px; color:#111BC4;" href="/user/'+nicknamec+'/gb/new" title="GB-Eintrag schreiben"><span class="icGbRe">&nbsp;</span></a><a style="position:relative; top:-42px; height:22px; float:left; padding:0px 10px 0px 10px; color:#111BC4;" href="/mailbox/new?to='+nicknamec+'" title="Mail an '+nicknamec+'"><span class="icMailbox">&nbsp;</span></a>';
	}
}
}

// anzeige auf den interessen seiten
if (url.indexOf("http://www.jappy.de/search/interests/list")>=0) {
var contentc = document.getElementsByClassName("result");

for(i=0;i<contentc.length;i++){
node = contentc[i];
if(node.hasChildNodes()){
	nicknamec = node.childNodes[1].getAttribute("href").replace("/user/","");
	node.innerHTML = node.innerHTML + '<br/><a style="position:relative; top:-38px; height:22px; float:left; padding:0px 10px 0px 10px;" href="/user/'+nicknamec+'/gb/new" title="GB-Eintrag schreiben"><span class="icGbRe">&nbsp;</span></a><a style="position:relative; top:-38px; height:22px; float:left; padding:0px 10px 0px 10px;" href="/mailbox/new?to='+nicknamec+'" title="Mail an '+nicknamec+'"><span class="icMailbox">&nbsp;</span></a>';
	}
}
}