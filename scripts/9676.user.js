// ==UserScript==
// @name        USA Today Enlarge Image
// @namespace   http://userscripts.org/scripts/show/9676
// @description Display bigger size photo of embedded images. And make news page wider.
// @include     http://www.usatoday.com/*
// @include     http://usatoday.com/*
// ==/UserScript==

// Author: Hosup Chung <HosupChung@gmail.com>
// Created:  2007-06-04
// Modified: 2009-07-27

function enlargeImage() {
	var imageLinks = document.evaluate('//a[contains(@onclick, "imageURL=")]/img', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
	
	for (var i = 0; i < imageLinks.snapshotLength; i++) {
		var image = imageLinks.snapshotItem(i)
		var bigImageUrl = getBigImageUrl(image)
		var imageName = image.src.substring(image.src.lastIndexOf('/') + 1, image.src.lastIndexOf('.')).replace(/%20/, ' ')
		
		if (bigImageUrl.indexOf(imageName) >= 0) {
			image.src = bigImageUrl
			image.removeAttribute("width")
			image.removeAttribute("height")
			image.setAttribute("style", "padding-right:10px")
		}
	}
}

function getBigImageUrl(image) {
	var searchParm = 'imageURL='
	var onclick = image.parentNode.getAttribute('onclick')
	var bigImageUrl = onclick.substring(onclick.indexOf(searchParm) + searchParm.length)
	bigImageUrl = bigImageUrl.substring(0, bigImageUrl.indexOf('\''))

	return bigImageUrl
}

function applyCss() {
	var css =
		//
		// "#postContent, #bottomBanner, td[rowspan='3'], td[rowspan='4'], #marketplace2, #searchBar, " +
		//	".leaderboardContainer, #bodyMain>div[align='left'] { display: none !important } " +
		//
		"#footer { display: none !important } " +
		"#pageContainer, #bodyMain, #bodyMain>table, td { width: auto !important } "
		
	if (GM_addStyle != undefined)
		GM_addStyle(css)
	else {
		var head = document.getElementsByTagName('head')[0]
		if (!head) { return }
		var style = document.createElement('style')
		style.type = 'text/css'
		style.innerHTML = css
		head.appendChild(style)
	}
}

function isValidPath() {
	var excludePath = new Array("/", "/front.htm", "/default.htm", "/flash.htm")
	
	for (var i = 0; i < excludePath.length; i++) {
		if (window.location.pathname.lastIndexOf(excludePath[i]) ==
			window.location.pathname.length - excludePath[i].length) {
			return false
		}
	}
	
	return true
}

if (isValidPath()) {
	applyCss()
	enlargeImage()
}
