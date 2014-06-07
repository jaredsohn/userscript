// ==UserScript==
// @name Orkut Full Name in Scraps
// @description Shows Full Name of the person who posted the scrap
// @include http://www.orkut.com/Scrap*
// ==/UserScript==

function expandnames(){
var mboxfull =  document.getElementById("mboxfull");
var scrapcontainer = mboxfull.getElementsByTagName("div");
for(i=0;i<=scrapcontainer.length;i++){
	var chkclass = scrapcontainer[i].getAttribute("class");
	if(chkclass == "listitemchk"){
		var scrapimg = scrapcontainer[i].getElementsByTagName("img");
		for(j=0; j<scrapimg.length; j++){
			titles = scrapimg[j].getAttribute("title");
			if(titles != null)
			break;
		}
		if(titles != "no photo"){
		var scraphead = scrapcontainer[i].getElementsByTagName("h3")[0];
		var scraplink = scraphead.getElementsByTagName("a");
		for(k=0;k<scraplink.length;k++){
		if(scraplink[k].getAttribute("href").match(/Profile/) != null){	
		scraplink[k].innerHTML = titles;
		break;
	    }
		}
	}
		
	}
}
}

addEventListener('load',expandnames,false);


