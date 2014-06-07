// ==UserScript==
// @name         Maximize Yahoo Korea's News
// @namespace    http://userscripts.org/scripts/show/25999
// @description  Maximize Yahoo Korea's News pages
// @include      http://kr.news.yahoo.com/service/news/shellview*
// Author        : Hosup Chung <HosupChung@gmail.com>
// Created       : 2008-05-05
// Last Modified : 2008-05-07
//
// 2008-05-07
//  Fixed a bug that overlap main content and top menu on some pages
//
// 2008-05-06
//  Implemented a function to replace image with linked larger image (if exist)
//
// 2008-05-05
//  Change layout to maximize the content. Removed left side menu.

function enlargeImage() {
	var imageLinks = document.evaluate('//a[starts-with(@href, "http")]/img', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)

	for (var i = 0; i < imageLinks.snapshotLength; i++) {
		var image = imageLinks.snapshotItem(i)
		var parentHref = image.parentNode.getAttribute('href')

		if (parentHref.match(/jpg$/i) != null || parentHref.match(/gif$/i) != null || parentHref.match(/png$/i) != null) {
			image.src = parentHref
			image.removeAttribute("width")
			image.removeAttribute("height")
		}
	}
}

css =	".yp, #yb, .yb, .yb_sb, .ymz, .ybs_sub, .ybs_sb_sub, #prn, .sports, iframe#smallbbs { width: 99% !important } " +
	".ym, #uh, .news, .ym .ctn, .nuriwl { width: auto !important } " +
	".yb, .yb_sb, .ybs_sub, .ybs_sb_sub { background-image: none !important } " +
	".yb_sb, .ybs_sub, .ybs_sb_sub, .ymz { position: relative !important } " +
	".yma { float: none !important } " +
	".ym { margin-right: 310px !important; clear: none !important } " +
	".ys { float: left !important } " +
	".ymbr2 { top: 0 !important; right: 0 !important; position: absolute !important } " +
	".ymz, .ybs_sb_sub>.ym { top: 15px !important; left: 0 !important; margin-right: 310px !important } " +
        /*
	"iframe#sponsor, #btm_ad, #btm_ads, .ys embed, " +
        */
		".yma, .yl, .yf, #uf { display: none !important } "

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

//  Since Yahoo Korea News site has its own javascript onload function that
//   limit images width to 520 max, I have to delay calling enlargeImage()
window.addEventListener('load', function() { setTimeout(enlargeImage, 5); }, false); 