// ==UserScript==
// @name           4chan - show post numbers
// @namespace      2
// @description    shows the post numbers
// @include        http://boards.4chan.org/b/*
// ==/UserScript==


function getpostnumber(html) {
	var p1 = /[\'|\#\q][0-9]{9}/;
	var p2 = /[0-9]{9}/;
	
	var out = p1.exec(html);
	var out = p2.exec(out);
	
	return out;
}

function update() {
	var aTags=document.getElementsByTagName("A");
	
	for (i=0; i<aTags.length; i++)
		if(aTags[i].className == "quotejs")
			if(aTags[i].innerHTML != "No.")
				aTags[i].innerHTML = getpostnumber(aTags[i].href);

}

setInterval(update,500);
