// ==UserScript==
// @name           Tumblr v3 Endless Dashboard
// @namespace      com.toldorknown.tumblr
// @description    Allows continuous scrolling of Tumblr v3 Dashboard
// @include        http://www.tumblr.com/dashboard
// @include        http://www.tumblr.com/show/*
// ==/UserScript==

// based on Paul Dawson's  "Endless vBulletin Forum Pages"
// http://userscripts.org/scripts/show/3972

var nextPageUrl = null;
var postList = null;

window.addEventListener("load",init, false);

setInterval(testScrollPosition, 100);

//GM_registerMenuCommand("Toggle Followed Posts", toggle_other_posts);

function init(){
	postList = findPostList(document);
	setNextPageUrl(document);
	GM_addStyle("#pagination { visibility: hidden;}");
}

function findPostList(doc){
	var ol = doc.getElementById("posts");
	return ol;
}

function setNextPageUrl(doc){
	var pdiv = doc.getElementById("pagination");
	if (pdiv != null){
	var plinks = pdiv.getElementsByTagName("a");
	for (var i = plinks.length - 1; i >= 0; --i)
		{
			if (plinks[i].innerHTML.substr(0,5) == "older")
				{
					nextPageUrl= plinks[i].href;
				}
		}
	}
}

function testScrollPosition(){
if ((nextPageUrl != null) && 
	((document.documentElement.offsetHeight - document.documentElement.scrollTop)
	 < (2.5 * window.innerHeight)))
		{
		pullMore();
		}
}
	

function pullMore(){
	var iframe = document.createElement("iframe");
	iframe.addEventListener("load",innerload,false);
	iframe.width = 1;
	iframe.height = 1;
	iframe.style.visibility = "hidden";
	iframe.src = nextPageUrl;
	document.documentElement.appendChild(iframe);
	
	nextPageUrl = null;
	
	function innerload(){
		var iframeDoc = iframe.contentDocument;
		
		setNextPageUrl(iframeDoc);
		
		siphon(findPostList(iframeDoc),postList);
		
		setTimeout(function() { iframe.parentNode.removeChild(iframe);}, 1500);
		
	}
}

function siphon(sourceList, destList){
	var item;
	while ((item = sourceList.getElementsByTagName("li")[0]))
		{
			postList.appendChild(item);
			
		}
}
