//
// ==UserScript==
// @name			FacebookSpyGlass
// @author			Charlie Cheever <xgreasemonkey@ccheever.com>
// @namespace		http://www.ccheever.com/userscripts
// @description		Makes a tooltip of the larger image for every small image on the facebook.com
// @include			http://*.thefacebook.com/*
// @include			http://*.facebook.com/*
// ==/UserScript==
//

//
// based on Brian Pilnick's script "TheFacebook Image Linker" that can be found here: 
// http://www.andrew.cmu.edu/user/bpilnick/greasemonkey/TheFacebookImageLinker.user.js
//

//
// code for tooltips based on the dynamic drive cool dhtml tooltips that can be found here:
// http://www.dynamicdrive.com/dynamicindex5/index.html
//

// the global namespace works a little differently under greasemonkey and so we need to attach our
// quasi-globals to the window object.  we'll create a single object attached to it called fixedToolTip 
// and use that as a sort of namespace
window.fixedToolTip = new Object();
var ftt = window.fixedToolTip;

// since we know the user must be using firefox, we can use data URIs.  
// these were made using the data: URI kitchen  
// http://software.hixie.ch/utilities/cgi/data/data 
ftt.magnifyingGlassGif = "data:image/gif,GIF89a%09%00%0B%00%C4%00%00%14%25%B2cn%C8%DB%DD%E9t~%CC%D9%DA%E8%B8%BD%DF%3FM%BEjt%CA9G%BC%DF%E0%EA1%40%BA%B7%BC%DF%1B%2C%B4y%83%CEGU%C0%B6%BA%DE%0D%1F%B0%13%24%B2%E0%E1%EA%DC%DE%E96E%BB%02%15%AD%10%22%B1%96%9D%D6%BA%BE%E0Zf%C5%EE%EE%EE%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%00%00%00%00%00%2C%00%00%00%00%09%00%0B%00%00%059%A0%86eV%86i(F%5D%D2E%9DZv%A1%DA%95%A1%96D'%16*%D3%8D%9Bh5%09%40%0E%B4%91EQa%3Ch%B4A%05%B0%80j%26%8E%0A%C2%AA!%18%22%5CMA%10%02%00%3B"
ftt.tipExtension = "data:image/gif,GIF89a%0F%00%0F%00%F7%00%00%04%02%04%FC%FE%E4%FC%FE%FC%00%00%00%95%98%A0%1E%E60%00%12E%00%00%00%9A%E3%90%1D%EA%E7%00%90%12%00%7C%00%004%EB%00%E6%87%15%12%D4%00%00w%0C8%00%00%00%F0%00%00%FD%00%00%7F%008%90%02%00%E7%00%00%12%00%00%00%00%E32%01%94%88%00%D4%D4%00ww%A0%D5P%E5%B2%E7%12%D4%12%00w%00y%00%FF%08%06%87%82%06%D4%7C%00w%00%20%0C%00%00%00%01%00%00%00%00%00V%0A%A0%00%06%83%00%05~%00%00%00%A8%12%B4%E4%00%83%12%00~%00%02%00n%00%14%00%00%00%00%00%00%00%00%00%C8%9E%01%E5%02%00%12%00%00%00%00%00%18%01%00%EE%00%00%90%00%00%7C%00%00p%00%00%05%06%00%91%06%00%7C%00%00%FF0%10%FF%80%00%FFE%00%FF%00%00m%0A%00%05%06%00%91%05%00%7C%00%00%15%00%07%0A%00%00%82%99%00%7C%E2%00%00%E3%00%00%94%00%15%D4%00%00w%00%60I%00%03f%00%00%D6%00%00w%00%B0%02%01%90%06%00%17%05%00%00%00%00xN1ao0%15t0%00%20%20%00a%25%00%20%20%00f%00%00i%00~l%24%00e%EC%00%00%12%C0%00%00%00%13%94%00%06%04%00%FF%D7%00%FFw%FF%A4%08%FF%E6%88%FF%12%D4%FF%00w%FF%10%FF%FF%E0%FF%FF%D4%FF%FFw%FF%00%00%FF%00%06%87%00%06%D4%00%00w%00%20C%00%00%B7%00%00%D4%00%00w%00%0A%00%00%06%00%15%05%00%00%00%00W%12%A0%F3%000%00%00E%00%02%00%D8%01%02%E5%00%06%12%00%05%00%00%00%2F%EC%00%0E%E6%00%82%12%00%7C%00%00%DB%BE%07%05%DF%00%82%D4%00%7Cw%00%40%00%00%E5%06%00O%06%00%00%00%00x%20%00a%00%00%01%00%15%00%00%00l%0A%00%00%06%00%00%05%00%00%00%00%14W%00%E5%F3%00%12%00%00%00%00%004%F0%00%00%E6%00%00%12%00%C0%00%00%F8%83%00%F7*%00%12%82%00%00%7C%00%18%00%08%EE%00%00%90%00%A1%7C%00%00p%00%00%05%00%00%91%00%00%7C%00%00%FF%00%00%FF%00%00%FF%00%00%FF%00%00m%00%0D%05%01%00%91%00%00%7C%00%00J%E7%0D%F6*%00%80%82%00%7C%7C%00%00%14%5C%00%E7%F0%15%12%12%00%00%00%00%C2%FF%00*%FF%00%82%FF%00%7C%FFx%00%00a%00%00%15%00%00%00%00%00%00%0C%1C%01%00%E8%00%A1%12%00%00%00%00%BE%0E%00%3E%CF%00%82K%00%7C%00W%FF%FC%F6%FF%E7%80%FF%12%7C%FF%00%00%18%5B%E7%E8%E2%12%12N%00%00%00x%F70a%3E%E8%15%82%12%00%7C%00%D1%B8%BE%DC%EF%3E%D4N%82w%00%7C%A0%10%A9%83%19%E8~O%12%00%00%00%0C%00%F1%00%01%FF%00%00%FF%00%00%7F%00%14%9C%00%E7%E8%00%12%12%00%00%00%E0%00%0C%DC%01%00%D4%00%A1w%00%00%00%16%BE%00%3F%3E%00%82%82%00%7C%7C%0C%01%0C%00%00%00%00%00%A1%00%00%00%13%00W%06%00%F3%FF0%00%FF%00%00%01%CD%00%00%AB%00%00%BA%00%00%DC%00%00%00~%00%00U%00%00G%00%00%00!%F9%04%01%00%00%02%00%2C%00%00%00%00%0F%00%0F%00%07%08D%00%01%08%18H%B0%60A%00%02%0D*%14%800%E1B%82%00%02%20%7C%081%80D%87%0B%23Z%9C%F8P%E3F%8C%07-%8A%E4h%D0%E3H%90%0CE%AA%249%D0%E4J%8C._VTI%93c%CC%9A%02o%E2%0C%08%00%3B";


/***********************************************
* Fixed ToolTip script- Â© Dynamic Drive (www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit http://www.dynamicdrive.com/ for full source code
***********************************************/
ftt.tipwidth='120px' //default tooltip width
ftt.tipbgcolor='white'  //tooltip bgcolor
ftt.disappeardelay=250  //tooltip disappear speed onMouseout (in miliseconds)
ftt.vertical_offset="5px" //horizontal offset of tooltip from anchor link
ftt.horizontal_offset="5px" //horizontal offset of tooltip from anchor link

ftt.ie4=document.all
ftt.ns6=document.getElementById&&!document.all

// ccheever:
// we have to change the way we add the div to the page since the page already exists, we can't use document.write...
ftt.fixedTip = document.createElement("div");
ftt.fixedTip.innerHTML = '<div id="fixedtipdiv" style="z-index: 200; border-style: solid; border-color: black; border-width: 1px 1px 1px 1px; padding: 5px 5px 5px 5px; position: absolute; visibility:hidden;width:' + ftt.tipwidth + ';background-color:' + ftt.tipbgcolor + '" ></div>';
document.body.insertBefore(ftt.fixedTip, document.body.firstChild);

ftt.getposOffset = function(what, offsettype){
var totaloffset=(offsettype=="left")? what.offsetLeft : what.offsetTop;
var parentEl=what.offsetParent;
while (parentEl!=null){
totaloffset=(offsettype=="left")? totaloffset+parentEl.offsetLeft : totaloffset+parentEl.offsetTop;
parentEl=parentEl.offsetParent;
}
return totaloffset;
}


ftt.showhide = function(obj, e, visible, hidden, tipwidth){
	if (ftt.ie4||ftt.ns6) {
		dropmenuobj.style.left=dropmenuobj.style.top = -500;
	}
	
	if (tipwidth!="") {
		dropmenuobj.widthobj=dropmenuobj.style;
		dropmenuobj.widthobj.width=tipwidth;
	}
	if (e.type=="click" && obj.visibility==hidden || e.type=="mouseover") {
		obj.visibility=visible;
	} else if (e.type=="click") {
		obj.visibility=hidden;
	}
}

ftt.iecompattest = function(){
	return (document.compatMode && document.compatMode!="BackCompat")? document.documentElement : document.body;
}

ftt.clearbrowseredge = function(obj, whichedge){
	var edgeoffset=(whichedge=="rightedge")? parseInt(ftt.horizontal_offset)*-1 : parseInt(ftt.vertical_offset)*-1;
	if (whichedge=="rightedge") {
		var windowedge=ie4 && !window.opera? iecompattest().scrollLeft+iecompattest().clientWidth-15 : window.pageXOffset+window.innerWidth-15
		dropmenuobj.contentmeasure=dropmenuobj.offsetWidth
		if (windowedge-dropmenuobj.x < dropmenuobj.contentmeasure) {
			edgeoffset=dropmenuobj.contentmeasure-obj.offsetWidth
		}
	} else {
		var windowedge=ie4 && !window.opera? iecompattest().scrollTop+iecompattest().clientHeight-15 : window.pageYOffset+window.innerHeight-18
		dropmenuobj.contentmeasure = dropmenuobj.offsetHeight;
		if (windowedge-dropmenuobj.y < dropmenuobj.contentmeasure) {
			edgeoffset=dropmenuobj.contentmeasure+obj.offsetHeight

			// we don't want to show the pointer gif if we're near the 
			// bottom of the screen and the tooltip is going to go above the image
			ftt.showPointer = false;
		} else {

			// normally we want to show the pointer gif to make the tooltip look fancy
			ftt.showPointer = true;
		}
	}
	return edgeoffset;
}

ftt.fixedtooltip = function(menucontents, obj, e, tipwidth){
	if (window.event) {
		event.cancelBubble = true;
	} else if (e.stopPropagation) {
		e.stopPropagation();
	}
	ftt.clearhidetip();
	dropmenuobj = document.getElementById? document.getElementById("fixedtipdiv") : fixedtipdiv;
	dropmenuobj.innerHTML=menucontents;

	if (ftt.ie4||ftt.ns6) {
		ftt.showhide(dropmenuobj.style, e, "visible", "hidden", tipwidth)
		dropmenuobj.x = ftt.getposOffset(obj, "left")
		dropmenuobj.y = ftt.getposOffset(obj, "top")
		dropmenuobj.style.left = dropmenuobj.x - ftt.clearbrowseredge(obj, "rightedge") + "px";
		dropmenuobj.style.top = dropmenuobj.y - ftt.clearbrowseredge(obj, "bottomedge") + obj.offsetHeight + "px";
	}

}

ftt.hidetip = function(e) {
	if (typeof dropmenuobj!="undefined") {
		if (ftt.ie4||ftt.ns6) {
			dropmenuobj.style.visibility="hidden"
		}
	}
}

// function delayhidetip(){
ftt.delayhidetip = function() {
	if (ftt.ie4||ftt.ns6) {
		delayhide=setTimeout("window.fixedToolTip.hidetip()",ftt.disappeardelay);
	}
};

ftt.clearhidetip = function() {
	if (typeof delayhide!="undefined") {
		clearTimeout(delayhide);
	}
};

(function () {

	// modify all the images
	var allImages = document.evaluate("//img[contains(@src, 'http://i')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	window.fixedToolTip.imageCache = new Array();

	// preload all the big images for everyone, 
	// mainly so that the tooltip div can be positioned correctly when it first pops up,
	// but also for speed
	var cache = window.fixedToolTip.imageCache;

	for (var i = 0; i < allImages.snapshotLength; i++) {
	
		var originalImage = allImages.snapshotItem(i);

		// don't add tooltips to images that are already fullsize
		if (originalImage.src.match(/\/n\d+_\d+.*jpg/)) {
			continue;
		}

		var bigImageSrc = originalImage.src.replace("/t", "/n").replace("/s", "/n");
		// we'll add only the first 25 images to the cache to avoid
		// using tons of memory and bandwidth and slowing down the
		// browser app and page load
		if (i < 25) {
			cache[i] = new Image();
			cache[i].src = bigImageSrc;
		}
		
		var newImage = document.createElement("img");
		newImage.setAttribute("src", originalImage.src);
		newImage.setAttribute("onmouseover", "window.fixedToolTip.fixedtooltip(\"<div style='position: absolute; left: 15px; top: -15px; width: 15px; height: 15px; background: transparent;'><img id=tipExtension /></div><span style='font-weight: bold; line-height: 1.8em;'><img id=magnifyingGlass />&nbsp;FacebookSpyGlass</span><br /><img src='" + bigImageSrc + "'/>\", this, event, \"205px\"); document.getElementById('magnifyingGlass').src = window.fixedToolTip.magnifyingGlassGif; var ptr = document.getElementById('tipExtension'); if (window.fixedToolTip.showPointer) { ptr.src = window.fixedToolTip.tipExtension; }");
		newImage.setAttribute("onmouseout", "window.fixedToolTip.delayhidetip();");
		originalImage.parentNode.replaceChild(newImage, originalImage);

	}

	// make tooltip popups for all the small and tiny photos from photo albums using a similar method
	var albumPhotos = document.evaluate("//img[starts-with(@src, 'http://photos-')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i = 0; i < albumPhotos.snapshotLength ; ++i ) {
		var originalImage = albumPhotos.snapshotItem(i);

		// skip photos that are already full-size
		if (originalImage.src.match("http://photos-.*/n")) {
			continue;
		}

		var bigImageSrc = originalImage.src.replace("/s", "/n", "g").replace("/t", "/n", "g");
		var newImage = document.createElement("img");
		newImage.setAttribute("src", originalImage.src);
		newImage.setAttribute("onmouseover", "window.fixedToolTip.fixedtooltip(\"<div style='position: absolute; left: 15px; top: -15px; width: 15px; height: 15px; background: transparent;'><img id=tipExtension /></div><span style='font-weight: bold; line-height: 1.8em;'><img id=magnifyingGlass />&nbsp;FacebookSpyGlass</span><br /><img src='" + bigImageSrc + "'/>\", this, event, \"606px\"); document.getElementById('magnifyingGlass').src = window.fixedToolTip.magnifyingGlassGif; var ptr = document.getElementById('tipExtension'); if (window.fixedToolTip.showPointer) { ptr.src = window.fixedToolTip.tipExtension; }");
		newImage.setAttribute("onmouseout", "window.fixedToolTip.delayhidetip();");
		originalImage.parentNode.replaceChild(newImage, originalImage);
	}


})();
