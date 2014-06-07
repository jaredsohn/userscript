// This script changes the download text to an actual link for
// each item.  I have no need to go to the extra page before downloading
//
// This is my 2nd Greasemonkey script ever!  How cool...
//
// Version 0.2 - Added @grant line to conform with new Greasemonkey 1.0 standards
//
// ==UserScript==
// @name             Lisvid Download Links on Search Pages
// @namespace        http://home.rochester.rr.com/ruta/
// @description      Insert links to go directly to the download
// @author           Ryan Ruta
// @version          0.2
// @include          http://*lisvid.com/?s=*
// @grant            none
// ==/UserScript==
//

//for(var i=0;i<document.getElementsByTagName('*').length;i++){
//	if(document.getElementsByTagName('*')[i].className == 'sbox'){
//		document.getElementsByTagName('p')[i].style.backgroundColor = 'black';
//	}
//}

var DownloadLinks;
var CurrentHTML;
var LinkHTML;

DownloadLinks = document.evaluate(
"//div[@class='sbox']//p",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i = 0; i < DownloadLinks.snapshotLength; i++) {
CurrentHTML = DownloadLinks.snapshotItem(i).innerHTML;
LinkHTML = CurrentHTML.substr(24); //remove lefthand side of string to get just the link
//DownloadLinks.snapshotItem(i).innerHTML = " Download here: <a href=\"" + LinkHTML + "\">" + LinkHTML + "</a>";
DownloadLinks.snapshotItem(i).innerHTML = "\&nbsp\;Download here: <a href=\"" + LinkHTML + "\">" + LinkHTML + "</a>";
}
