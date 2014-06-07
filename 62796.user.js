// ==UserScript==
// @name          BGG url replacer
// @namespace     http://*
// @description    replaces links to boardgamegeek.com with geekdo.com, based on TESSource URL Replacer
// @include        http://*
// ==/UserScript==

function get_anchors(){
       var anchors = new Array();
       var elms = document.getElementsByTagName('a');
       for(var i=0; i<elms.length; i++){
            if(elms[i].href) anchors.push(elms[i]);
       }
       return anchors;
    }

var allLinks, thisLink;
allLinks = get_anchors();

for (var i = 0; i < allLinks.length; i++) {
    thisLink = allLinks[i];
    if ((thisLink.href.match('boardgamegeek.com'))&&!(thisLink.href.match('images.boardgamegeek.com'))&&!(thisLink.href.match('store.boardgamegeek.com'))) {
		thisLink.href = thisLink.href.replace('boardgamegeek.com', 'geekdo.com');
	}
}