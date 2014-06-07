// ==UserScript==
// @name           Multiupload2RS
// @namespace      http://userscripts.org/scripts/show/63470
// @description    Replaces multiupload's links by RS ones
// @include        *
// @exclude        http://www.multiupload.com/*
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
    if (thisLink.href.match('http://www.multiupload.com/')) {
		thisLink.href = thisLink.href.replace('http://www.multiupload.com/', 'http://www.multiupload.com/RS_');
	}
}