// ==UserScript==
// @version 1
// @name Orkut Scrap Count on all pages
// @author  http://www.orkut.com/Profile.aspx?uid=15963659674315462805
// @namespace
// @description Shows the scrap count in the header on all the pages on Orkut
// @include http://www.orkut.com*
// ==/UserScript==

function getScrapCount(){
var scrapcount = replyPage.match(/My scrapbook \([0-9]+\)/)[0].match(/\([0-9]+\)/)[0];
var header = document.getElementById("header");
var links = header.getElementsByTagName("a");
for(i=0;i<links.length;i++){
	if(links[i].innerHTML == "Scrapbook"){
	links[i].innerHTML = "Scrapbook "+scrapcount;
	break;	
	}
}
}
pageRequest = new XMLHttpRequest();
pageRequest.open('GET', 'http://www.orkut.com/Scrapbook.aspx', false);
pageRequest.send(null);
var replyPage = pageRequest.responseText;
addEventListener('load',getScrapCount,false);


