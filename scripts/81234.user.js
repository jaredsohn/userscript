// ==UserScript==
// @name           Ovi Download Link
// @namespace      http://userscripts.org/users/61677
// @description    Adds a download Link to Ovi Store
// @include        http://store.ovi.com/content/*
// ==/UserScript==

var url=null;
var links = document.getElementsByTagName("UL");
for (i=0; i<links.length; i++) { //make a loop to go
	var link = links[i];  
	if(link.className=="contentActions") {
		
		for(u=0;u<link.children.length;u++){
			if(link.children[u].innerHTML.indexOf("send-to-friend")!=-1){
			url=link.children[u].innerHTML.replace("Send to friend","Download");
			url=url.replace("Send to friend","Download");
			link.innerHTML += url.replace("send-to-friend","download");
			break;
			}
		}	
	}
}
