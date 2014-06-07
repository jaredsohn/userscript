// ==UserScript==
// @name           Wer kennt wen? Link
// @namespace      http://felix-kloft.invalid/werkenntwenlink
// @description    Verlinkt Foreneinträge in "Wer kennt wen?"
// @include        http://www.wer-kennt-wen.de/forum.php?*
// ==/UserScript==

var breakAfter = 45; // WKW bricht nach 45 Buchstaben um



function removeSpaces(div)
{
	var node;
	for(var i=0;node=div.childNodes[i];i++)
	{
		if(node.nodeType != 3) // Textknoten
			continue;
		
		if(node.nodeValue.match(/^(\s*)(.*?)(\s*)$/))
		{
			node.nodeValue = RegExp.$2;
		}
		
		// Wenn es ein leerer Knoten ist, komplett löschen
		if(node.nodeValue=="")
		{
			div.removeChild(node);
			i--;
			continue;
		}
	}
}


function removeBreaks(div)
{
	var node;
	for(var i=0;node=div.childNodes[i];i++)
	{
		if(node.nodeType != 3) // Textknoten
			continue;
		if(node.nodeValue.indexOf(" ") > -1)
			continue;
		if(node.nodeValue.length < breakAfter || !node.nodeValue.match(/^(http|https|ftp):\/\//))
			continue;
		
		while(1) // Es könnte mehrfach umgebrochen sein
		{
			// nächster Knoten muss ein <br> sein
			if(!(node.nextSibling && node.nextSibling.nodeName.toLowerCase() == "br"))
				break;
			
			// übernächster muss ein Textknoten sein
			if(!(node.nextSibling.nextSibling && node.nextSibling.nextSibling.nodeType == 3))
				break;
			
			// Speichern, wie lang der anzuhängende Knoten ist.
			var addedLength = node.nextSibling.nextSibling.nodeValue.length;
			
			node.nodeValue += node.nextSibling.nextSibling.nodeValue
			div.removeChild(node.nextSibling.nextSibling);
			div.removeChild(node.nextSibling); // <br>
			
			// Wenn der anzuhängende Knoten selbst umgebrochen wurde, müssen wir noch einen Durchgang machen
			if(addedLength < breakAfter)
				break;
		}
	}
}


function linkify(div)
{
	var node;
	for(var i=0;node=div.childNodes[i];i++)
	{
		if(node.nodeType != 3) // Textknoten
			continue;
		
		re = /^(.*?)((https?|ftp):\/\/\S+)(.*?)$/;
		if(node.nodeValue.match(re))
		{
			var before = RegExp.$1;
			var link = RegExp.$2;
			var after = RegExp.$4; // $3 ist das Protokoll (https?|ftp)
			
			node.nodeValue = before;
			var a = div.insertBefore(document.createElement("a"), node.nextSibling);
			div.insertBefore(document.createTextNode(after), node.nextSibling.nextSibling);
			
			a.href = link;
			a.appendChild(document.createTextNode(link));
		}
	}
}


function parseDiv(div)
{
	removeSpaces(div);
	removeBreaks(div);
	linkify(div);
}


var div;
var divs = document.getElementsByTagName("div");
for(var i=0; div=divs[i]; i++)
{
	if(div.className == "entry" && div.innerHTML.match(/(http|https|ftp):\/\//))
	{
		parseDiv(div);
	}
}

