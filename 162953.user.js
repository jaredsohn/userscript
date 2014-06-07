// ==UserScript==
// @name           What.CD Bad Covers Collage Edition
// @namespace      https://github.com/Wingman4l7/badhost
// @description    Highlights all album covers in a collage not on a whitelisted host.
// @include        http*://*what.cd/collages.php?id=*
// @version        1.0
// @author         Wingman4l7
// ==/UserScript==

//To whitelist a host, add them to this list as a regex matching their domain
var goodhosts = [ 
    /whatimg\.com/
];

if (!window.location.search.match(/Report collage/)) { // Collage description page
    
	// this "clicks" on all the page links, which call collageShow(), 
	// which loads that page of albums into the page source
	var pageSpans = document.getElementsByTagName("span");
	for (var i = 0; i < pageSpans.length; i++) {
		if(pageSpans[i].id.indexOf("pagelink") != -1) {
			pageSpans[i].firstChild.click(); 
			}
	}
	document.getElementById("pagelink0").firstChild.click(); // return to first page
	
	// get the images within the UL only
	var coverElementNodeList = document.getElementById("coverart").querySelectorAll("[class^='image_group_']");
	var imgElement;
	for (var i = 0; i < coverElementNodeList.length; i++) {
		imgElement = coverElementNodeList[i].getElementsByTagName('img')[0];
		for (var j = 0; j < goodhosts.length; j++) {
			if (imgElement.src.match(goodhosts[j])) {
				j = goodhosts.length;
			}
			else { 
				imgElement.style.boxSizing = "border-box"; // inner border
				imgElement.style.border = ".3em solid red";		
			}
		}
	}
}