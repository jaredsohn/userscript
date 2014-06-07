// MiB2MB4PtP
// version 0.0.1, 20140121

// ==UserScript==
// @name          MiB2MB4PtP
// @namespace     http://joisey.net/projects/greasemonkey/
// @description   Script to change displayed IEC mebibytes (2^20 bytes) to SI megabytes (10^6 bytes) on PtP
// @grant         none
// @include       http://passthepopcorn.me/torrents.php*
// @include       http://*.passthepopcorn.me/torrents.php*
// @include       https://passthepopcorn.me/torrents.php*
// @include       https://*.passthepopcorn.me/torrents.php*
// ==/UserScript==

// conversion function liberated from http://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable
function fileSizeSI(a,b,c,d,e){
	return (b=Math,c=b.log,d=1e3,e=c(a)/c(d)|0,a/b.pow(d,e)).toFixed(2)+' '+(e?'kMGTPEZY'[--e]+'B':'Bytes')
}

var sizeSpans = document.evaluate("/html/body//span[contains(@title,' bytes')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < sizeSpans.snapshotLength; i++){
	var thisSpan = sizeSpans.snapshotItem(i);
	var thisSpanOrigTitle = thisSpan.title;
	var origSize = thisSpanOrigTitle.match(/^[\d\,]+/)[0].replace(/\,/g, '');

	thisSpan.title = thisSpanOrigTitle + ', ' + thisSpan.innerHTML;
	thisSpan.innerHTML = fileSizeSI(parseInt(origSize, 10));
}
