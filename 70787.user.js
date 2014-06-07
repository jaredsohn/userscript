// ==UserScript==
// @name           IMDB enlarge actor pictures on hover
// @namespace      http://henrik.nyh.se
// @description    Enlarges actor pictures in IMDB cast lists when you hover over that table row.
// @include        http://*.imdb.com/title/*
// @include        http://imdb.com/title/*
// ==/UserScript==
function GM_testUrl(include) {
    return (new RegExp(include.replace(/(\/|\?|\.|\^|\,|\+)/g, "\\\$1").replace(/\*/g, '.*')).test(document.URL)) ? true : false;
}

if (GM_testUrl("http://*.imdb.com/title/*/", "http://*.imdb.com/title/*/#*", "http://*.imdb.com/title/*/maindetails*", "http://*.imdb.com/title/*/combined*", "http://*.imdb.com/title/*/fullcredits*", "http://*.imdb.com/title/*/epcast*")) {
var tiny_heads_xp = "//a[contains(@onclick, 'tinyhead')]/img";

GM_addStyle(
	// Since we replaced thumbs with medium images and removed width/height, keep them small this way
	"img.GM_actorPicture { height:32px; width:22px; }" +
	// Enlarge on hover
	"tr:hover a img.GM_actorPicture { height:auto; width:100px; position:absolute; margin-left:-107px; margin-top:-51px; }"
);

$x(tiny_heads_xp).forEach(function(img) {
	img.addEventListener("mouseover",enlarge,false);
});

function enlarge(evt) {
	img = evt.target;
	if(img.src.search(/_SX100_SY150_/) < 0) {//if not enlarged yet
		img.removeEventListener("mouseover",enlarge,false);
		img.src = img.src.replace(/_SY\d+_SX\d+_/, "_SX100_SY150_");  // Replace thumbs with larger images
		img.className = "GM_actorPicture";
		img.height = img.width = null;
	}
}

/* Staple functions */

function $x(path, root) {
	if (!root) root = document;
	var i, arr = [], xpr = document.evaluate(path, root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}
}