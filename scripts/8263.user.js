// ==UserScript==
// @name           Sourceforge Direct Links
// @namespace      http://www.digivill.net/~joykillr
// @description    Direct download links on sourceforge.net.  Works with SF's latest changes.  Mirrors selectable by continent.
// @include        http://*sourceforge.net/projects/*
// @include        http://sourceforge.net/projects/*
// @include        https://*sourceforge.net/projects/*
// @include        https://sourceforge.net/projects/*
// ==/UserScript==

// v 3.3 wasn't working with all sourceforge downloads
// v 3.2 updated for sourceforge site changes, bad mirrors commented out.
// v 3.1 finally updated for sourceforge site changes
// v 2.8 added https locs
// http://sourceforge.net/apps/trac/sourceforge/wiki/Mirrors

// Mirrors are seperated by continent, for speed purposes you can select which continents to include/exclude:
function defineMirrors() {
	var MIRRORS = [

/*...North America: */	"hivelocity", "iweb", "internap", /*"superb-east",*/ "softlayer", "voxel",
/*...South America: */	"ufpr",
/*...Europe: */		"dfn", "fastbull", "freefr", /*"garr",*/ "mesh", "kent", "heanet", "surfnet",/*"nfsi",*/ /*"ovh",*/ "puzzle", "sunet", "switch",
/*...Australia: */	"waix", "transact", "internode",
/*...Asia: */		"biznetnetworks", "jaist", "ncu", "nchc"
	
	];
	return MIRRORS;
}

function randomServer(mirrors){
	var mirrors = new Array();
	mirrors = defineMirrors();
	return mirrors[Math.floor(Math.random() * mirrors.length)];
}

var q, sfvar;
var nodes = document.evaluate("//a[contains(@href, '\/download')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (window.content.location.href.match(/\/files\//i)&&nodes) {
	mirrorID = randomServer();
	for (q=0;q<nodes.snapshotLength;q++) {
		if (nodes.snapshotItem(q).href) {
			sfvar = nodes.snapshotItem(q).href;
			if (sfvar.indexOf("\/project\/")!=-1) {sfvar = sfvar.split("\/project\/")[1];}
			else if (sfvar.indexOf("\/projects\/")!=-1) {sfvar = sfvar.split("\/projects\/")[1];}
			if (sfvar.indexOf("?")!=-1) {sfvar = sfvar.split("?")[0];}
			nodes.snapshotItem(q).removeAttribute("onclick");
			nodes.snapshotItem(q).href = "http\:\/\/" + mirrorID + ".dl.sourceforge.net\/project\/" + sfvar.replace("/files","").split("/download")[0];
		}
	}
}
