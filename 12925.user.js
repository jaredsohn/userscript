// ==UserScript==
// @name           Heise.de Forum: Threadanzeige an
// @description    aktiviert Threadanzeige
// @include        http://*heise.de/*
// ==/UserScript==
// Thanks to Rockmaster for script base!

function get_anchors() {
	var anchors = new Array();
  var Links = document.getElementsByTagName('a');
  for (var i=0; i < Links.length; i++) {
    if (Links[i].href) anchors.push (Links[i]);
  }
  return anchors;
}

var allLinks, thisLink;
allLinks = get_anchors();

for (var i = 0; i < allLinks.length; i++) {
	thisLink = allLinks[i];
	if (thisLink.href.match("read=1")) {
		thisLink.href = thisLink.href.replace("read=1", "read=1&showthread=1");
	}
}