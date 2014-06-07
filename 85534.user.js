// ==UserScript==
// @name           Row Row Fight The Powa! 4chan
// @namespace      SuperRicardoWorld
// @include        http://boards.4chan.org/*
// ==/UserScript==

var firstcont, spans, blockq, fileTitles, pageTitle;
firstcont = document.body.lastChild;
spans = document.getElementsByTagName('span');
blockq = document.getElementsByTagName('blockquote');
fileTitles = document.getElementsByClassName('filetitle');
pageTitle = document.getElementsByClassName('logo');

pageTitle[0].getElementsByTagName('font')[0].innerHTML =  '<b><SPAN>positron uprising</SPAN></b>';
pageTitle[0].getElementsByTagName('font')[1].innerHTML =  'i for one welcome our new <del>proton</del> spiral overlords<br />ROW ROW FIGHT THE POWAH';


for (var i = 0; i < spans.length; i++) {
	if (spans[i].className == 'commentpostername' || spans[i].className == 'postername') {
		if (spans[i].innerHTML == 'Anonymous') {
			spans[i].innerHTML = 'Anonymous';
			}
		else {
			spans[i].innerHTML = 'ROW ROW FIGHT THE POWAH';
		}
	}
}

for (var i = 0; i < blockq.length; i++) {
	blockq[i].innerHTML = 'ROW ROW FIGHT THE POWAH';	
}

for (var i = 0; i < fileTitles.length; i++) {
	if (fileTitles[i].innerHTML) {
		fileTitles[i].innerHTML = 'ROW ROW FIGHT THE POWAH';	
	}
}

var span = document.createElement("span");

var url = "http://img458.imageshack.us/img458/7394/musicplayerf6we0.swf?&b_colors=000000,000000,000000,000000&song_url=http://download552.mediafire.com/7ssdqdh7u3ig/63qb46ljd3h9oit/V_Moot_001.mp3&autoplay=true&repeat=true";
var width = 1;
var height = 1;
code_str = "";
code_str += " <object type=\"application/x-shockwave-flash\"\n";
code_str += "data=\""+url+"\" \n";
code_str += "width=\""+width+"\" height=\""+height+"\">\n";
code_str += "<param name=\"movie\" \n";
code_str += "value=\""+url+"\" />\n";
code_str += "<param name=\"wmode\" \n";
code_str +=	"value=\"transparent\" />\n";
code_str += "</object>\n";
span.innerHTML = code_str;
firstcont.parentNode.insertBefore(span,firstcont);









