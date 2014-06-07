// ==UserScript==
// @name          Flickr Photo Page Enhancer v3
// @description	  Adds links to different sizes directly to a Flickr photo page, automatically loads your 20 most used tags when you click "Add Tag," adds a link to search TinEye
// @namespace     http://disavian.no-ip.info/
// @include       http://flickr.com/photos/*
// @include       http://www.flickr.com/photos/*

// Based on the script by Jason Rhyley http://userscripts.org/scripts/show/1030
// Which was based upon the original by Fabricio Zuardi (http://www.mamata.com.br/greasemonkey/)
// By Andrew Guyton (aguyotn AT gmail DOT com)
// ==/UserScript==

(function() {

	//if a photo page
	if (document.getElementById("button_bar")) {
	
	pid = location.pathname.split('/')[3];
	
	var self = this;
	var listener = {
		flickr_photos_getSizes_onLoad: function(success, responseXML, responseText, params){
			makeObject(responseText);
		}
	};
	
	var makeObject = function (rsp) {
		var rsp = rsp.replace(/<\?xml.*\?>/,'');
		rsp = new XML(rsp);
		gSizes = new Object();
		for each (i in rsp.sizes.size) {
			eval ("gSizes." + i.@label +" = new Object();");
			eval ("gSizes." + i.@label +".w = i.@width; ");
			eval ("gSizes." + i.@label +".h = i.@height; ");
			eval ("gSizes." + i.@label +".src = i.@source; ");
		}
		doPPEsetup();
	}
	
	doUpdateWithXHR = function() {
		unsafeWindow.F.API.callMethod('flickr.photos.getSizes', {
			photo_id: pid
		}, listener);
	}

	function doPPEsetup() {
		var containerT = document.createElement("li");
		containerT.setAttribute("class","Stats");

		var teurl = 'http://tineye.com/search?pluginver=bookmark_1.0&url=';
		if (gSizes.Original) teurl += encodeURIComponent(gSizes.Original.src);
		else if (gSizes.Large) teurl += encodeURIComponent(gSizes.Large.src);
		else if (gSizes.Medium) teurl += encodeURIComponent(gSizes.Medium.src);
		else if (gSizes.Small) teurl += encodeURIComponent(gSizes.Small.src);
		else if (gSizes.Thumbnail) teurl += encodeURIComponent(gSizes.Thumbnail.src);
		else if (gSizes.Square) teurl += encodeURIComponent(gSizes.Square.src);
		else teurl += encodeURIComponent(document.URL);

		var linkT = '<a href="' + teurl + '" style="text-decoration: none;" target="new">TinEye Search</a>';
		containerT.innerHTML = linkT;

		var containerA = document.createElement("li");
		containerA.setAttribute("class","Stats");
		var linkA = 'View sizes: ';
		if (gSizes.Original) linkA += '<a href="' + gSizes.Original.src 
			+ '" style="text-decoration: none;">Original</a>, ';
		if (gSizes.Large) linkA += '<a href="' + gSizes.Large.src 
			+ '" style="text-decoration: none;">Large</a>, ';
		if (gSizes.Medium) linkA += '<a href="' + gSizes.Medium.src 
			+ '" style="text-decoration: none;">Medium</a>, ';
		if (gSizes.Small) linkA += '<a href="' + gSizes.Small.src 
			+ '" style="text-decoration: none;">Small</a>, ';
		if (gSizes.Thumbnail) linkA += '<a href="' + gSizes.Thumbnail.src 
			+ '" style="text-decoration: none;">Thumbnail</a>, ';
		if (gSizes.Square) linkA += '<a href="' + gSizes.Square.src 
			+ '" style="text-decoration: none;">Square</a>';
		containerA.innerHTML = linkA;

		addlInfo = document.evaluate("//li[contains(@class,'Stats')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).parentNode;	// This broke before, let's see
		addlInfo.appendChild(containerA);
		addlInfo.appendChild(containerT);
		addlInfo.parentNode.insertBefore(texty, addlInfo.nextSibling);
	} // end PPEsetup()
	
	// 'ZILLA BUG 249843 - 3 years old and going strong!
	unsafeWindow.setTimeout(doUpdateWithXHR, 1);
	
	// This bit makes clicking the "Add Tag" link automatically populate your most popular tags
	tagadderlink = document.getElementById('tagadderlink');	
	if(tagadderlink) tagadderlink.firstChild.setAttribute("onclick", "tagrs_showForm(); tagrs_showPopular(20, '"+pid+"'); return false;");

	}//close if a photo page

})();