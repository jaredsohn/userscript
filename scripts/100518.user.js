// ==UserScript==
// @name           [El'Che'Yoh-ns] Smileys pour FB
// @description    created by El Che Yoh
// @version			3.0.5
// @include        http://*.facebook.com/* 
// @copyright		El Che Yoh-ns Chah Asakura   
// @licence        JavaScript
// @contact		    [yoh@asakura.jp]
// ==/UserScript==

var smileys;

smileys = {};

add(":noel:", ":noel:", "http://image.jeuxvideo.com/smileys_img/11.gif");
add(":coeur:", ":coeur:", "http://image.jeuxvideo.com/smileys_img/54.gif");
add(":bave:", ":bave:", "http://image.jeuxvideo.com/smileys_img/71.gif");
add(":ok:", ":ok:", "http://image.jeuxvideo.com/smileys_img/36.gif");
add(":hap:", ":hap:", "http://image.jeuxvideo.com/smileys_img/18.gif");
add(":honte:", ":honte:", "http://image.jeuxvideo.com/smileys_img/30.gif");
add(":oui:", ":oui:", "http://image.jeuxvideo.com/smileys_img/37.gif");


function add(reg, alt, img) {
	smileys[reg] = "<img src=\"" + img + "\" alt=\"" + alt + "\"/>";
}

function main() {
	var key;
	for (key in smileys) {
		document.body.innerHTML = document.body.innerHTML.replace(new RegExp(key, "g"), smileys[key]);
	}
}

window.setTimeout(main, 100000);