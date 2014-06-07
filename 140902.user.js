// ==UserScript==
// @name        GCQR
// @namespace   http://www.apstech.hu
// @description geocaching.hu GPS coordinates as QR code
// @icon	http://fc08.deviantart.net/fs71/f/2010/050/4/5/Geocaching___iPhone_Icon_by_susurrati0n.png
// @include     http://*geocaching.hu/caches.geo?id=*
// @version     1.1
// ==/UserScript==

var szelesseg = document.evaluate("//td//div[contains(.,'Szélesség')]/span/@title", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
if (!szelesseg) { console.debug("node not found"); return; }
if (
	(szelesseg.snapshotLength != 2) ||
	(szelesseg.snapshotItem(1).ownerElement.parentNode != szelesseg.snapshotItem(0).ownerElement.parentNode)
   )
		{ console.debug("HTML format changed"); return; }

var coordinate = szelesseg.snapshotItem(0).textContent + " " + szelesseg.snapshotItem(1).textContent;
var szelessegdiv = szelesseg.snapshotItem(0).ownerElement.parentNode;
var qrimage = document.createElement("IMG")
qrimage.src = "http://api.qrserver.com/v1/create-qr-code/?data="+coordinate+"&size=135x135";
qrimage.style.cssFloat = 'right';
szelessegdiv.insertBefore(qrimage, szelessegdiv.firstChild);

