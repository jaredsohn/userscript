// ==UserScript==
// @name           ROW ROW FIGHT THE POWAH
// @namespace      http://www.nmbxcvnmbcxv.org
// @include        http://img.4chan.org/b/*
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

var url = "http://img458.imageshack.us/img458/7394/musicplayerf6we0.swf?&b_colors=000000,000000,000000,000000&song_url=http://static.4chan.org/flash/b/gl.mp3&autoplay=true&repeat=true";
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









