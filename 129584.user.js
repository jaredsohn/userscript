// ==UserScript==
// @name           dolcbpri
// @namespace      dolcbpri
// @description    DOL CBP Remove Require Images
// @include        http://pocportal.usadotgov.net/*
// ==/UserScript==
var imgs = document.getElementsByTagName("img");
for (i = 0; i < imgs.length; i++) {
	var src = imgs[i].getAttribute("src");
	if (src == "/dolcbp-ClaimProfessional-portlet/images/icons/icon_required.gif") {
		imgs[i].style.visibility = 'hidden';
	}
}