// ==UserScript==
// @name		Oriole Killer
// @description		Gets rid of Toot from the hermit page
// @include *127.0.0.1*
// @include *kingdomofloathing.com*
// ==/UserScript==

var paragraphs = document.getElementsByTagName("p");
var images = document.getElementsByTagName("img");
var thePath = document.location.pathname;
var hermit = 0;
var image = 0;


if (thePath == "/hermit.php") {
	for(l in images) {
		if(images[l].getAttribute("src").indexOf("hermit.gif") != -1 ) {
			hermit = 1;
		}
	}
	for(i in images) {
		if(images[i].getAttribute("src").indexOf("oriole.gif") != -1 && hermit != 1) {
			images[i].src = "http://images.kingdomofloathing.com/otherimages/hermit.gif";
			image = i;
		} 
		else if(images[i].getAttribute("src").indexOf("oriole.gif") != -1 && hermit == 1) {
			images[i].parentNode.removeChild(images[i]);
		} 
	}
	for(j in paragraphs) {
		if(paragraphs[j].innerHTML.indexOf("Remember what I taught") != -1) {
			paragraphs[j].parentNode.removeChild(paragraphs[j]);
			break
		}
	}
	for(m in paragraphs) {
		if(paragraphs[m].innerHTML.indexOf("flies away before") != -1) {
				paragraphs[m].parentNode.removeChild(paragraphs[m]);
				break
		}	
	}
	for(n in paragraphs) {
		if(paragraphs[n].innerHTML.indexOf("lights on a rock") != -1) {
			if(hermit != 1) {
				paragraphs[n].innerHTML = 'You don\'t have a Hermit Permit, so you\'re not allowed to visit the Hermit.';
			} else {
				paragraphs[n].parentNode.removeChild(paragraphs[n]);
			}
			break
		}	
	}
}