// ==UserScript==
// @name           GeoachePrintDistiller
// @namespace      http://userscripts.org/users/67986
// @description    Paperless Caching
// @include        http://www.geocaching.com/seek/cdpf.aspx
// ==/UserScript==

function emitNodeText(node)
	{
	if (node != null)
		{
			emitAllText(node);
			document.write("\n");
		}
	}

function emitAllText(node)
	{
	var dive = true;
	if (node.textContent != null)
		{
		document.write(node.textContent);
		return;
		}
	else if (node.title != null)
		{
		document.write(node.title);
		return;
		}
	for (var k=0;k<node.childNodes.length;k++)
		{
		emitAllText(node.childNodes[k]);
		}
	}

function getElementsByClass(theClass,tag)
	{
		var classElements = new Array();
		node = document;
		if ( tag == null )
			tag = '*';
		var els = node.getElementsByTagName(tag);
		var elsLen = els.length;
		var pattern = new RegExp("(^|\\\\s)"+theClass+"(\\\\s|$)");
		for (i = 0, j = 0; i < elsLen; i++) {
			if ( pattern.test(els[i].className) ) {
				classElements[j] = els[i];
				j++;
			}
		}
		return classElements;
	}

var cc = document.getElementById('Header1_cacheCodeWidget');
var cacheid=cc.getElementsByTagName("p")[0].firstChild.data;

var cachename = document.getElementById('CacheName').firstChild.data;


var date = document.getElementById('DateHidden').firstChild.data;
var own = document.getElementById('CacheOwner').childNodes[1].firstChild.data;
var hintz = document.getElementById('Hints');
var hint='';
if (hintz != null)
	{
	hint = hintz.firstChild.data;
	}

var clearhint = '';
for (j=0;j<hint.length;j++)
	{
    b=hint.charCodeAt(j);
    if ( (b>64 && b<78) || (b>96 && b<110))
		{
		b=b+13;
		}
    else
		{
		if ( (b>77 && b<91) || (b>109 && b<123))
			{
			b=b-13;
			}
      }
	clearhint += String.fromCharCode(b);
}

var sizeseek = document.getElementById('Form1');
var imlist = sizeseek.getElementsByTagName("img");
var size = imlist[1].title;
var diff = imlist[2].title;
var terr = imlist[3].title;

var numVisits = document.getElementById('lblFindCounts');
var found = '';
var didnt = '';
if (numVisits != null)
	{
	var visitData = numVisits.getElementsByTagName('td');

	if (visitData.length > 1)
		{
		found = visitData[0].textContent;
	 	didnt = visitData[1].textContent;
		}
	}
var coord = document.getElementById('LatLon').firstChild.data;
var shortd = document.getElementById('ShortDescription');
var longd = document.getElementById('LongDescription');

var logs = getElementsByClass('logContainerRow');

document.writeln('Cache: '+cachename+' ('+cacheid+') by '+own);
document.writeln("<br />");
document.writeln('Hidden: '+date);
document.writeln("<br />");
document.writeln(size+', Difficulty: '+diff+', Terrain: '+terr);
document.writeln("<br />");
document.writeln('Coord: '+coord);
document.writeln("<br />");
document.writeln('Found: '+found+' Not Found:'+didnt);
document.writeln("<br />");
emitNodeText(shortd);
document.writeln("<br />");
emitNodeText(longd);
document.writeln("<br />");
for (var i=0;i<Math.min(3,logs.length);i++)
	{
	emitNodeText(logs[i]);
	}
document.writeln("<br />");
if (clearhint != '')
	{
		document.writeln('------------Hint:------------');
		document.writeln("<br />");
		document.writeln(clearhint);
	}
document.writeln('==================================================================');
document.writeln("<br />");