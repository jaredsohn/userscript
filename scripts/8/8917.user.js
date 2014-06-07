// Webshots album - fullsize links v0.1.2
// 29-04-2007
//
// ==UserScript==
// @name	Webshots album - fullsize links
// @version	0.1.2
// @creator	asindo2030@netscape.com
// @namespace	http://userscripts.org/scripts/show/8917
// @description	Add fullsize anchors of all 28 photos in grid-view mode for batch download. Replace links of thumbnail photos with fullsize links. 
// @include     http://*.webshots.com/album/*
// @exclude
// ==/UserScript==

/*	
	>> FEATURES
		- Get fullsize links of all photos in an album page

	>> TODO 
		- Get fullsize links of all photos of an album
		- Replace all thumbnail links with fullsize links
		- Get PRO photo links
*/


(function() {

//get all photo links
var allPhotoAnchors = document.evaluate( "//div[@class='content']/div/a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var photoUrls = new Array();	//array of fullsize links
//convert thumbnail links to fullsize links
for (i = 0; i < allPhotoAnchors.snapshotLength; i++) {
	if (!(url = allPhotoAnchors.snapshotItem(i).style.background)) continue;
	photoUrls[i] = url.split(/[()]/)[1].replace("_th","_fs");
	allPhotoAnchors.snapshotItem(i).href = photoUrls[i];
	allPhotoAnchors.snapshotItem(i).parentNode.innerHTML += '<a class="photoUrl" href=' + photoUrls[i] + '>[ ' + i + ' ]</a>';
}
//manipulate DOM & show links
var photolinksDiv = document.createElement("div");
photolinksDiv.setAttribute("id", "PhotoLinks");
photolinksDiv.innerHTML =  "All Fullsize Photo Links: <br>";

var statsDiv = document.evaluate( "//div[@class='stats']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
if (statsDiv) {		//test to avoid "has no properties" error
	var parentDiv = statsDiv.parentNode;
	parentDiv.insertBefore(photolinksDiv, statsDiv);
}

for (i=0; i<photoUrls.length; i++) {
	var photoAnchor = document.createElement("a");
	photoAnchor.setAttribute("class", "fullsizeUrl");
	photoAnchor.href = photoUrls[i];
	photoAnchor.innerHTML = i;
	photolinksDiv.appendChild(photoAnchor);
}

//add styles
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('#album #PhotoLinks {background:transparent url(http://p.webshots.net/images/bg/bg_dot.gif) repeat-x scroll 0%; background-position:center top; display:block; color:#2468AC; padding:0.8em 0em 3em; margin:0pt 16px;} ');

addGlobalStyle('div#PhotoLinks a { display:block; background: #dcdcdc; color:#CBDEFF; display:block; float:left; margin:1px; padding:2px; text-align:center; text-decoration:none} '); 

addGlobalStyle('div#PhotoLinks a:hover { background: #ACDBED; }');

})(); 

