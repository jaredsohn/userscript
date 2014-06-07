// ==UserScript==
// @name           DealTaker
// @namespace      http://www.dealtaker.com
// @description    Remove URL redirect that required javascript to be enabled for dealtaker.com
// @include        http://www.dealtaker.com/*
// ==/UserScript==
// Based on and inspired by the TESSource URL Replacer script
// orignal source code from the TESSource URL Replacer
// http://userscripts.org/scripts/review/12392

function get_anchors(){
       var anchors = new Array();
       var elms = document.getElementsByTagName('A');
       for(var i=0; i<elms.length; i++){
            if(elms[i].href) anchors.push(elms[i]);
       }
       return anchors;
	   
    }

var allLinks, thisLink;
allLinks = get_anchors();

for (var i = 0; i < allLinks.length; i++) {
    thisLink = allLinks[i];
    if (thisLink.href.match(/goshop\.php\?F0url\=/)) {
		thisLink.href = thisLink.href.replace(/http\:\/\/www\.dealtaker\.com\/goshop.php\?F0url\=/, '');
                thisLink.title = 'URL Corrected';
	}
}