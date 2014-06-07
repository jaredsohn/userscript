// ==UserScript==
// @name           imageloader
// @namespace      imageloader
// @description    image loader to make ://www.buzzfeed.com work with AutoPager
// @include        http://www.buzzfeed.com/*
// ==/UserScript==


document.addEventListener("AutoPagerAfterInsert", function (e){
GM_log("AutoPagerBeforeInsert:" + e.target)
var nodes = document.evaluate(".//img[@class='thumb bf_dom']", e.target, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null );
var node = nodes.iterateNext();
var imgs=[];
while (node) {
	//work on the node
	imgs.push(node);
    	node = nodes.iterateNext();
}
for(var i=0;i<imgs.length;i++)
	imgs[i].src = imgs[i].getAttribute('rel:bf_image_src');

}, true)

