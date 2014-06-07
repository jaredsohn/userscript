// ==UserScript==
// @name        Facebook ad-remove & improvements + font correction
// @namespace   sandros.atw.hu
// @include     https://www.facebook.com*
// @version     1
// ==/UserScript==

// ==============
body = document.body;
if(body != null) {
	div = document.createElement("style");
	div.setAttribute('type','text/css');
	div.innerHTML = ".messageBody .userContent{ font-size: 96%; }"
	               +".uiAttachmentTitle { font-size: 102%; }"
	               +".caption { font-size: 102%; }"
	               +"#headNav, #headNav *, a.navLink { font-family: 'Lucida Grande', serif !important; }"
	               +"a.navLink.bigPadding { padding-top: 0.16em !important; }"
	               +"a.navLink.bigPadding:hover { color: rgb(220, 220, 230) !important; }"
	               +".fbxWelcomeBox, #pagelet_side_ads, .rhcFooterBorder, .rhcFooterCopyright { display: none !important; }"
	               +".ego_column { display: none; } .egoOrganicColumn { display: block !important; }"
	               +"#leftCol, .fbReminders { padding-top: 0px !important; margin-top: -4px !important; }"
	               +"#rightCol { padding-top: 20px !important; }"
	               +"#contentArea { margin-top: -10px !important; }";
	body.appendChild(div);


}
// ==============
