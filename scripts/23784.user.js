// ==UserScript==
// @name           hamsterforum
// @namespace      hamsterforum
// @description    thumbnails voor te grote foto's op het hamsterforum
// @include        http://www.dehamster.nl/forum/*
// @include        http://forum.dehamster.nl/*
// @include        http://www.forum.dehamster.nl/*
// ==/UserScript==

var smilie = new Array()

//*********************************************************************************************

// Geef hieronder een woord op waarop je posts wilt highlighten. Geef 'uitgeschakeld' op om highlighting uit te schakelen.

var highlight = "uitgeschakeld"

// voer hieronder de locatie van een smilie in, tussen de haakjes.


smilie[0] = "http://smilie.gif"
smilie[1] = "http://smilie.gif"

//*********************************************************************************************

var i;
var x = 0;
var toevoeging = "";
var link = document.getElementsByTagName('a');
var span = document.getElementsByTagName('span');
var td = document.getElementsByTagName('td');


if (location.href.search("viewtopic") != -1 ){
	for ( i = 0; i < span.length; i++) { 
		span[i].innerHTML = span[i].innerHTML.replace(":')","<img src=\"http://i.fok.nl/s/emo.gif\">");
	}
}
else if (location.href.search("posting") != -1 ){
	for ( i = 0; i < span.length; i++) { 
		span[i].innerHTML = span[i].innerHTML.replace(":')","[img]http://i.fok.nl/s/emo.gif[/img]");
	}
}

for ( i = 0; i < link.length; i++) { 
	if (link[i].innerHTML.search("Klik hier om de foto te bekijken") != -1) {
		link[i].innerHTML = "<img width=\"300\" src=\""+link[i].href+"\">";
	}
	if (link[i].innerHTML.search("emoticons") != -1 || link[i].innerHTML.search("Smilies") != -1 ) {
		link[i].setAttribute("onclick","window.open('posting.php?mode=smilies', '_phpbbsmilies', 'HEIGHT=400,resizable=yes,scrollbars=yes,WIDTH=400');return false;") ;
	}
}

if (window.location.href.search("smilies") != -1) {
	var table = document.getElementsByTagName('table');
	var close = '<td align="center">'+table[1].innerHTML.split('<td align="center">')[1];
	table[0].removeAttribute("width")

	table[1].innerHTML = table[1].innerHTML.split('<td align="center">')[0];
	table[1].innerHTML += '<tr><th class="thHead" height="25"> Eigen Emoticons:</th></tr>';
	table[1].innerHTML += '<tr><td><table width="100" border="0" cellspacing="0" cellpadding="5" ';
	table[1].innerHTML += '</table></td></tr>';
	table[1].innerHTML += close;
	
	table[3].innerHTML = "<tr>"

	for (i = 0; i < smilie.length; i++) {
		x++;
		if (smilie[i] != ""){
			toevoeging += "<td><a href=\"javascript:emoticon('[img]"+smilie[i]+"[/img]')\"><img src=\""+smilie[i]+"\" border='0' /></a></td>";
			}
		if ( x == 8){
			toevoeging += "</tr><tr>";
			x = 0;
		}
		
	}
	table[3].innerHTML += toevoeging + "</tr>"
}


if (highlight && highlight != 'uitgeschakeld' && highlight.length > 2 ){
var hl = highlight.toLowerCase()
	for ( i = 0; i < td.length; i++) { 
		if (td[i].innerHTML.toLowerCase().match(hl) && td[i].parentNode.innerHTML.match('postbody') ) {
			td[i].parentNode.style.backgroundColor="#95bcfe";
		}
	}
}