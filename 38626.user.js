// ==UserScript==
// @name           Last.fm artist page tag cloud
// @namespace      http://www.google.com/search?q=brtkrbzhnv
// @description    Adds a tag cloud to the artist page
// @include        http://www.last.fm/music/*
// @include        http://last.fm/music/*
// @include        http://www.lastfm.*/music/*
// @include        http://lastfm.*/music/*
// ==/UserScript==
// 2012-08-31 update: Fix for Last.fm redesign.
// 2009-03-13 update: Added an ignorelist for useless tags.
var hideSmallestTags = true;
var hideTagList = true;
var ignoreTags = ["seen live", "sett live"];

function main() {
	if(!artistPage()) return;
	do_http_request(location.href + "/+tags", getTags);
}

function getTags(doc) {
	var tagPlace = p = x("//section[@class='g4 artist-actions remove-bottom-margin']").snapshotItem(0)
	tagHolder = tagPlace.parentNode.insertBefore(document.createElement("div"), p);
	for(var i=0, D=doc.getElementsByTagName("div"); d = D[i++];) if(d.id == "tagcloud") tagHolder.appendChild(d);
	filterTags(tagHolder);
	if(hideTagList) x("//div[@class='tags']").snapshotItem(0).style.display = "none";
}

function filterTags(tagHolder) {
	A = tagHolder.getElementsByTagName("a");
	if(hideSmallestTags)for(i = 0; a = A[i];++i) if(hasStyle(a,"12px")) a.style.display = "none";
	for(i = 0; tag = ignoreTags[i]; ++i) for(j=0; a = A[j]; ++j) if(a.innerHTML == tag) a.style.display = "none";
}

function hasStyle(element, style) {
	return (element.getAttribute("style").indexOf(style) >= 0);
}

function artistPage() {
	return location.href.split("/")[5] ? false : true; // nothing after the fifth slash on artist-page URLs
}

// From Dive Into Greasemonkey:
 function x(q) { 
	return document.evaluate(q, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null); 
}
// From OiNKPlus: 
function do_http_request(url, callbackFunc){
	GM_xmlhttpRequest({
		method: "GET",
  url: url,
  onload: function(res) {
	  var result;
	  var range = document.createRange();
	  range.selectNode(document.body);
	  var parsedHTML = range.createContextualFragment(res.responseText);
	  result = document.createElement("div");
	  result.appendChild(parsedHTML);
	  callbackFunc(result);							
  }
	});
}

main();