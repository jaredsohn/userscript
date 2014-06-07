// ==UserScript==
// @name           Photosight large pictures
// @description    On pages with prewiev images showes large images instead
// @include        http://*photosight.ru/*
// @version        0.0.6
// @include        wildcar
// ==/UserScript==

// Set width of left column to minimal and content column to no limit
var cols = document.evaluate("//td[starts-with(@class, 'left_col')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (cols.snapshotItem(0)){
	cols.snapshotItem(0).setAttribute('style','width:250px');
	}
var cols = document.evaluate("//td[starts-with(@class, 'middle_col')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (cols.snapshotItem(0)){
	cols.snapshotItem(0).setAttribute('class','');
	}
// Clear class "photo_list" form DL's
var allDLs = document.evaluate("//dl[starts-with(@class, 'photo_list')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var j = 0; j < allDLs.snapshotLength; j++) {
	allDLs.snapshotItem(j).setAttribute('class','');
}

// Replace source images from icon to large
var links = document.evaluate("//a[starts-with(@id, 'photo_')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < links.snapshotLength; i++) {
//		links.snapshotItem(i).firstChild.src = links.snapshotItem(i).firstChild.src.replace(/icon/, "large");  /img/e/e1e/2966716_icon.jpeg" 
//	if (links.snapshotItem(i).firstChild.src.match(/^http:\/\/img-[0-9a-f]\.photosight\.ru\/[0-9a-f]+\/\d+_icon\.(?:jpg|jpeg)$/)) {
	if (links.snapshotItem(i).firstChild.src.match(/^http:\/\/s\.photosight\.ru\/img\/[0-9a-f]\/[0-9a-f]+\/\d+_icon\.(?:jpg|jpeg)$/)) {
		links.snapshotItem(i).firstChild.src = links.snapshotItem(i).firstChild.src.replace(/icon/, "large");
	} else if (links.snapshotItem(i).firstChild.src.match(/^http:\/\/prv-\d+-\d+\.photosight\.ru\/\d+\/pv_\d+\.(?:jpg|jpeg)$/)) {
		links.snapshotItem(i).firstChild.src = links.snapshotItem(i).firstChild.src.replace(/^http:\/\/prv(.*)pv_(.*)$/, "http://img$1$2");
	}
}

// Add keyboard navigation: Ctrl-left previous page, Ctrl-right next page
var prevLink, nextLink
var links = document.evaluate("//a[starts-with(@class, 'prev')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if (links.snapshotItem(0)) prevLink=links.snapshotItem(0).getAttribute('href');
for (var i = 0; i < links.snapshotLength; i++) {
    links.snapshotItem(i).innerHTML='&#8592;&#160;<b>Ctrl</b>&#160;&#160;&#160;пред.';
}
var links = document.evaluate("//a[starts-with(@class, 'next')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (links.snapshotItem(0)) nextLink=links.snapshotItem(0).getAttribute('href');
for (var i = 0; i < links.snapshotLength; i++) {
    links.snapshotItem(i).innerHTML='след.&#160;&#160;&#160;<b>Ctrl</b>&#160;&#8594;';
}

document.addEventListener('keydown', function(event) {
	switch (event.keyCode ? event.keyCode : event.which ? event.which : null)
	{
		case 0x25:
			link = prevLink;
			break;
		case 0x27:
			link = nextLink;
			break;
	}
	if (link) document.location = link;	
}, true);
