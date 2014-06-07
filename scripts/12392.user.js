// ==UserScript==
// @name           TESSource URL Replacer
// @namespace     http:// *
// @description    replaces TESSource/TESdb with TESNexus
// @include        http://*
// ==/UserScript==
//
// replaces all TESSource/TESdb links with the new TESNexus site (in beta)

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
    if (thisLink.href.match(/tessource\.net\/files/)) {
		thisLink.href = thisLink.href.replace(/tessource\.net\/files/, 'tesnexus\.com\/downloads');
	}
	if (thisLink.href.match(/tesdb\.com\/files/)) {
		thisLink.href = thisLink.href.replace(/tesdb\.com\/files/,'tesnexus\.com\/downloads');
	}
}