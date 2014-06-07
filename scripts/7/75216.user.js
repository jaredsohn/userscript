// ==UserScript==
// @name           rm fb imgs -v2
// @namespace      http://woyg.blogspot.com/
// @include        http://*.facebook.com/*
// @exclude			http://static.ak.facebook.com/*
// ==/UserScript==

(function(){

var rfbi=function(){
var imgs;
imgs = document.evaluate(
    "//img[@class='img']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);
	var i=0;
	for (; i < imgs.snapshotLength; i++) {
	    var img = imgs.snapshotItem(i);
		if(img.height==32 && (/profile.ak.fbcdn.net\/hprofile\-ak/.test(img.src) 
			|| /profile\.ak\.fbcdn.net\/.*\/q.*\.jpg/.test(img.src)
			|| /static.ak.fbcdn.net\/pics\/q_silhouette.gif/.test(img.src)
		)){
			img.src='';
		}		
	}
};	

document.addEventListener('DOMNodeInserted', rfbi, false);
rfbi();
})();
