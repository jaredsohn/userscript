// ==UserScript==
// @name           XLR8R Torrent F1NDR
// @namespace      f1ndr
// @description    Find torrents for albums reviewed on xlr8r.com
// @include        http://xlr8r.com/reviews/*
// ==/UserScript==

function getElementsByClassName(strClass, strTag, objContElm) {
  strTag = strTag || "*";
  objContElm = objContElm || document;
  var objColl = objContElm.getElementsByTagName(strTag);
  if (!objColl.length &&  strTag == "*" &&  objContElm.all) objColl = objContElm.all;
  var arr = new Array();
  var delim = strClass.indexOf('|') != -1  ? '|' : ' ';
  var arrClass = strClass.split(delim);
  for (var i = 0, j = objColl.length; i < j; i++) {
	var arrObjClass = objColl[i].className.split(' ');
	if (delim == ' ' && arrClass.length > arrObjClass.length) continue;
	var c = 0;
	comparisonLoop:
	for (var k = 0, l = arrObjClass.length; k < l; k++) {
	  for (var m = 0, n = arrClass.length; m < n; m++) {
		if (arrClass[m] == arrObjClass[k]) c++;
		if (( delim == '|' && c == 1) || (delim == ' ' && c == arrClass.length)) {
		  arr.push(objColl[i]);
		  break comparisonLoop;
		}
	  }
	}
  }
  return arr;
}

// To cover IE 5.0's lack of the push method
Array.prototype.push = function(value) {
  this[this.length] = value;
}

var artist, album;
var nodeHeader = getElementsByClassName('node_header')[0];
for(var i = 0; i < nodeHeader.childNodes.length; i++){
	var child = nodeHeader.childNodes[i];	
	if(child.tagName == 'H2'){
		artist = child.firstChild.nodeValue;
		album  = child.childNodes[3].firstChild.nodeValue;
		//alert(artist + " " + album);
		break;
	}
}

var keyword = artist.replace(" ","+") + "+" + album.replace(" ","+");

var container = document.createElement("DIV");
container.style.backgroundColor = "#CCFFFF";
container.style.padding = "5px";
container.style.margin = "5px";
var scrapeTorrent = document.createElement('A');
scrapeTorrent.href = "http://scrapetorrent.com/Results/index.php?search=" + keyword + "&sort=date";
scrapeTorrent.target = "_new";
scrapeTorrent.appendChild(document.createTextNode('ScrapeTorrent'));
var pirateBay = document.createElement('A');
pirateBay.href = "http://thepiratebay.org/search/" + keyword;
pirateBay.target = "_new";
pirateBay.appendChild(document.createTextNode('The Pirate Bay'));
var mininova = document.createElement('A');
mininova.href = "http://www.mininova.org/search/?search=" + keyword;
mininova.target = "_new";
mininova.appendChild(document.createTextNode('Mininova'));
var btb = document.createElement('A');
btb.href = "http://btbeat.com/xbttracker/torrents.php?search=" + keyword;
btb.target = "_new";
btb.appendChild(document.createTextNode('BTBeat'));
var fmp3 = document.createElement('A');
fmp3.href = "http://www.filemp3.org/browse.php?keywords="+ keyword + "&search_type=t_name&cat=0&incldead=0&x=0&y=0";
fmp3.target = "_new";
fmp3.appendChild(document.createTextNode('FileMP3'));
var ft = document.createElement('A');
ft.href = "http://funkytorrents.com/browse.php?search="+ keyword + "&blah=0&incldead=0&cat=0";
ft.target = "_new";
ft.appendChild(document.createTextNode('Funky Torrents'));

var lbl = document.createElement("span");
lbl.style.fontWeight = "bold";
lbl.appendChild(document.createTextNode('Find Torrent: '));

container.appendChild(lbl);
container.appendChild(scrapeTorrent);
container.appendChild(document.createTextNode(' | '));
container.appendChild(pirateBay);
container.appendChild(document.createTextNode(' | '));
container.appendChild(mininova);
container.appendChild(document.createTextNode(' | '));
container.appendChild(btb);
container.appendChild(document.createTextNode(' | '));
container.appendChild(fmp3);
container.appendChild(document.createTextNode(' | '));
container.appendChild(ft);


//nodeHeader.insertBefore(container, nodeHeader.childNodes[5]);

var metadiv = getElementsByClassName('meta')[0];
metadiv.appendChild(container);
