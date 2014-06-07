// ==UserScript==
// @name          TargetAlert modifier
// @namespace     http://home.earthlink.net/~x1011/
// @description   Makes the icons float by the cursor
// @include       *
// ==/UserScript==
/* last updated: 2005-10-02
This script also allows more than one icon for the same link to be shown.

You need to have the option "Show icons on mouseover rather than appending hyperlinks"
set for this script to work. I would also recommend unsetting the option "Do not append
TargetAlert icon to link if the link already contains an image".

If you don't already have TargetAlert, see the website:
http://www.bolinfest.com/targetalert/
*/
(function() {

links = document.evaluate('//a[img[@class="TargetAlertIcon"]]',
	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
if (!links)
	return

function mouseOver() {
	TargetAlertContainers[this.getAttribute('TargetAlertIndex')].style.display = 'inline'
}

function mouseMove(e) {
	span = TargetAlertContainers[this.getAttribute('TargetAlertIndex')]
	span.style.left = e.pageX + 12 + 'px'
	span.style.top = e.pageY + 20 + 'px'
}

function mouseOut() {
	TargetAlertContainers[this.getAttribute('TargetAlertIndex')].style.display = 'none'
}

TargetAlertContainers = new Array

for (i=0; link=links.snapshotItem(i); i++) {
	span = document.createElement('span')
	imgs = document.evaluate('img[@class="TargetAlertIcon"]',
		link, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)
	for (x=0; img=imgs.snapshotItem(x); x++) {
		img.setAttribute('style', 'position:static !important')
		span.appendChild(img)
	}
	span.setAttribute('class', 'TargetAlertContainer')
	span.style.position = 'absolute'
	span.style.display = 'none'
	document.body.appendChild(span)
	TargetAlertContainers[i] = span
	link.setAttribute('TargetAlertIndex', i)
	link.addEventListener('mouseover', mouseOver, false)
	link.addEventListener('mousemove', mouseMove, false)
	link.addEventListener('mouseout', mouseOut, false)
}

})();