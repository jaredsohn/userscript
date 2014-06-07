// ==UserScript==
// @name           Ovi Download from desktop
// @author         Sowrov (initila contribution by LordOfThePings)
// @description    Adds a download Link to Ovi Store
// @include        http://store.ovi.com/content/*
// @email          sowrov@ymail.com
// @version        1.0.0
// ==/UserScript==

var url=document.URL;
var links = document.getElementsByTagName("UL");

for (i=0; i<links.length; i++) { //make a loop to go
	var link = links[i];  
	if(link.className=="contentActions") {
		var downloadLi = document.createElement('li');
		var downloadLink = document.createElement('a');
		downloadLink.innerHTML = "<span class=\"overflow\" style=\"width:98px\" title=\"Download\">Download</span>";
		downloadLink.className = "btnGraphic btnDownload";
		var qMark = url.indexOf("?");
		if (qMark != -1) {
			url = url.substring(0,qMark);
		}
		downloadLink.href = url+"/download";
		downloadLi.appendChild(downloadLink);
		//alert(downloadLi.innerHTML);
		link.appendChild(downloadLi);
		break;
	}
}
