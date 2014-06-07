// ==UserScript==
// @name           gw_forschung
// @namespace      galaxywars
// @include        *galaxywars.de/forschung*
// ==/UserScript==

var leng = document.getElementsByClassName('a').length;
var arrayname = new Array();
var arraynumb = new Array();

var i = 0;
while (i < (leng)) {
	gtext = document.getElementsByClassName('a')[i].getElementsByTagName('a')[0].textContent;
	if (gtext.substring(gtext.length - 1,gtext.length) != ")") {
		gtext += " (Stufe 0)";
		document.getElementsByClassName('a')[i].getElementsByTagName('a')[0].textContent += " (Stufe 0)";
	}
	gname  = gtext.substring(0,gtext.length - 10);
	if (gtext.substring(gtext.length - 3,gtext.length - 2) != " ") {
		gnumma = gtext.substring(gtext.length - 3,gtext.length - 1);
	}else {
		gnumma = gtext.substring(gtext.length - 2,gtext.length - 1);
	}
	arrayname.push(gname);
	arraynumb.push(gnumma);
		
	i = (i + 1);
}

var i = 0;
while (document.getElementsByClassName('negative').length > i) {
	document.getElementsByClassName('negative')[i].style.color = "#900";
	i = i + 1;
}


var foorm = document.createElement('form');
foorm.action = 'http://stevo.saxn.at/gw/index.php?updateforsch=1';
foorm.method = 'post';
foorm.style.position = "absolute";
foorm.style.left = "0px";
foorm.style.top = "0px";

var i = 0;
while (arrayname.length > i) {
	var inputt = document.createElement('input');
	inputt.name = i;
	inputt.value = arrayname[i];
	inputt.type = "hidden";
	foorm.appendChild(inputt);
	
	i = (i + 1);
}
var iminus = i;
var anumb = (arraynumb.length * 2);
while (anumb > i) {
	var inputt = document.createElement('input');
	inputt.name = i;
	inputt.value = arraynumb[(i - iminus)];
	inputt.type = "hidden";
	foorm.appendChild(inputt);
	i = (i + 1);
}

var submitter = document.createElement('input');
submitter.type = "submit";
submitter.style.height = "20px";
submitter.style.padding = "0 0 0 0";
submitter.style.fontSize = "8pt";
submitter.style.fontFamily = "arial";
foorm.appendChild(submitter);
document.body.appendChild(foorm);