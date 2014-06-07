// ==UserScript==
// @name           Unofficial to official Guild Wars wiki link changer
// @description    Changes all links to the unofficial Guild Wars wiki (guildwars.wikia.com) to the official wiki (wiki.guildwars.com), simply because I like the official wiki a lot more, and I'm annoyed by people linking to the (uglier and more chaotic, imo) unofficial wiki. Note: The link may not be working on the official wiki too, but it will most of the time. Anyways, it's easier than to manually do what this userscript does.
// @include        *
// @version        0.1.1
// ==/UserScript==


function get_anchors(){
	var anchors = new Array();
	var elms = document.getElementsByTagName('a');
	for(var i = 0; i < elms.length; i++){
		if(elms[i].href) anchors.push(elms[i]);
	}
	return anchors;
}

var allLinks, thisLink;
allLinks = get_anchors();

for (var i = 0; i < allLinks.length; i++) {
	thisLink = allLinks[i];

	if (thisLink.href.match('guildwars.wikia.com')) {
		thisLink.href = thisLink.href.replace('guildwars.wikia.com', 'wiki.guildwars.com');
	}
}