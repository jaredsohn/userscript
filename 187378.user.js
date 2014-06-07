// ==UserScript==
// @name        Guardian Picture Downloader
// @namespace   http://userscripts.org/users/4223
// @description Adds a link to The Guardian pages to download images (meant for image series like Eyewitness)
// @include     http://www.theguardian.com/*
// @include     http://theguardian.co.uk/*
// @version     1
// @grant       GM_log
// ==/UserScript==
//{

var imagesrc = $X("html/head/meta[@property='og:image']");
if(imagesrc){
    var titlenode = $X("//div[@id='main-article-info']/h1");
    titlenode.textContent += " - ";
    var a = titlenode.appendChild(document.createElement("a"));
    a.appendChild(document.createTextNode("Download"));
    a.href = imagesrc.content;
}


function $X(_xpath, node){//to search in a frame, you must traverse it's .contentDocument attribute.
	var doc = (node)?(node.ownerDocument || node):(node = document);
	try{
    	return doc.evaluate(_xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	}
	catch(e){
		log([e].concat(Array.slice(arguments)));
		return null;
	}
}

function log() {
	var arg;
	switch(arguments.length) {
		case 1:
			arg = arguments[0];
			break;
		case 0:
			arg = null;
			break;
		default:
			arg = Array.slice(arguments);
			break;
	}
	
//	if(JSON && JSON.stringify)
//		arg = JSON.stringify(arg);
	if(typeof(unsafeWindow.console) != "undefined" && typeof(unsafeWindow.console.log) === "function")
		unsafeWindow.console.log(arg);
	else if(typeof(GM_log) === "function")
		GM_log(arg);
	return arg;
}
//}