// ==UserScript==
// @name           doubles get!
// @namespace      3
// @description    counts yer doubles
// @include        http://boards.4chan.org/b/*
// ==/UserScript==

// This script is based on my post number untrunctuator,
// and it therefore basically does the exact same thing.
// You should not run another xxx script along with this
// or you might experience blinking or flickering.
// It works just fine with 4chan X and other updaters, though.

// My post number fix:
// http://userscripts.org/scripts/review/69625


function getpostnumber(html) {
	var p1 = /[\'|\#\q][0-9]{9}/;
	var p2 = /[0-9]{9}/;
	var out = p1.exec(html);
	var out = p2.exec(out);
	return ''+out; //gaah! does anyone know of any better way to typecast?
}

function countlastdigits(html) {
	var str = getpostnumber(html);
	var n=0;
	var last = str[str.length-1];
	
	for(var i=str.length-2; i>=0; i--) {
		if(str[i] != last)
			break;
		n++;
	}
	
	if(n>0) {
		n++;
		var str1 = str.substr(0, str.length-n);
		var str2 = str.substr(str.length-n);
		return str1+"<b style=\"font-size:"+(10+n)+"pt; color:#F0F;\">"+str2+"</b>";
	}

	return str;
}

function update() {
	var aTags=document.getElementsByTagName("A");
	for (i=0; i<aTags.length; i++)
		if(aTags[i].className == "quotejs")
			if(aTags[i].innerHTML != "No.")
				aTags[i].innerHTML = countlastdigits(aTags[i].href);
}

setInterval(update,500);
//document.addEventListener('DOMContentLoaded', update, false); //sadly this doesn't work with updaters.
