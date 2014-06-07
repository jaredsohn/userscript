// ==UserScript==
// @name           Radiopannen Download
// @namespace      http://www.radiopannen.de/
// @include        http://www.radiopannen.de/verlacht.html
// @include        http://www.radiopannen.de/chaos.html
// @include        http://www.radiopannen.de/versprecher.html
// @include        http://www.radiopannen.de/verwirrt.html
// @include        http://www.radiopannen.de/peinlich.html
// @include        http://www.radiopannen.de/unerwartet.html
// @include        http://www.radiopannen.de/erschrocken.html
// @include        http://www.radiopannen.de/albern.html
// @include        http://www.radiopannen.de/backstage.html
// @include        http://www.radiopannen.de/professionell.html
// @include        http://www.radiopannen.de/reporterglueck.html
// @include        http://www.radiopannen.de/haarstraeubend.html
// @include        http://www.radiopannen.de/index.php?p=*
// ==/UserScript==


var strongElems = document.getElementsByTagName('script');

var pfad = new Array(5);
var nummer;
for (var i=0; i<strongElems.length; i++)
{
  var thisElem = strongElems[i];
pfad[i] = "http://www.radiopannen.de/";
 	if (thisElem.innerHTML.indexOf('player.swf?pfad=') != -1) {
	pfad[i] = pfad[i] + thisElem.innerHTML.substring(thisElem.innerHTML.indexOf('mp3'),thisElem.innerHTML.indexOf('"', thisElem.innerHTML.indexOf('mp3')));
	var createLink = document.createElement('a');
	createLink.setAttribute('href',''+pfad[i]+'');
	createLink.setAttribute('target','_blank');
	createLink.setAttribute('style','color: grey; font-size:12px; margin-left:20px; text-decoration:none; font-family: verdana;');
	createLink.innerHTML = 'Download';
	thisElem.parentNode.insertBefore(createLink, thisElem.nextSibling);
	}
}

