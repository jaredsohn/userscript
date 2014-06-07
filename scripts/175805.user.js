// KIBUSH NIGGAS!!!
// version 1 & only
// 2013-08-15
// Copyright (c) 2013 DK&DSH Conquering Niggas Ltd.

//
// ==UserScript==
// @name           Kibush
// @description    Kibush Nigga!
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==

function pageRunner(e) {
	urls = ["https://fbcdn-sphotos-b-a.akamaihd.net/hphotos-ak-frc3/429896_554723784571037_220627128_n.jpg",
		"https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/s32x32/372305_100001002621048_1266197020_q.jpg",
		"https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/c16.16.195.195/s160x160/429896_554723784571037_220627128_n.jpg",
		"https://fbcdn-profile-a.akamaihd.net/hprofile-ak-ash4/372305_100001002621048_1266197020_q.jpg",
		"https://fbcdn-profile-a.akamaihd.net/hprofile-ak-frc3/c9.9.113.113/s100x100/429896_554723784571037_220627128_s.jpg"];
	for (var i = 0; i < document.images.length; i++) {
		element = document.images[i];
		for (var j = 0; j < urls.length; j++) {
			if (element.src == urls[j]) {
				element.src = "http://up386.siz.co.il/up3/0vjeynngzmyy.png";
				break;
			}
		}
	}
}
runOnPage();
pageRunner();

function runOnPage(callback) {
    document.addEventListener("DOMNodeInserted", pageRunner, true);
}