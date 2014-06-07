// ==UserScript==
// @name          prohardver profile like
// @namespace     http://www.prohardver.hu/
// @include       http://www.prohardver.hu/tag/*.html
// @include       http://prohardver.hu/tag/*.html
// @include       http://gamepod.hu/tag/*.html
// @include       http://www.gamepod.hu/tag/*.html
// @include       http://logout.hu/tag/*.html
// @include       http://www.logout.hu/tag/*.html
// @include       http://mobilarena.hu/tag/*.html
// @include       http://www.mobilarena.hu/tag/*.html
// @include       http://hardverapro.hu/tag/*.html
// @include       http://www.hardverapro.hu/tag/*.html
// @include       http://itcafe.hu/tag/*.html
// @include       http://www.itcafe.hu/tag/*.html

// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

//---ADD LIKE BUTTON TO PH PROFILES
if (document.getElementById("page") != null) {
	var profil = document.getElementById('page');	
	var like = profil.getElementsByClassName('okbutton');
	var fb_like = document.createElement('iframe');
	var pageurl = location.href;
		fb_like.src ="http://www.facebook.com/widgets/like.php?href="+pageurl;
		fb_like.scrolling="no";
		fb_like.show_faces="false";
		fb_like.frameborder="0";
		fb_like.style.border = "none";
		fb_like.style.width = "234px";
		fb_like.style.height = "30px";
                fb_like.style.position = "absolute";
                fb_like.style.left = "40%";
		fb_like.style.allowTransparency = "true";

like[0].parentNode.insertBefore(fb_like, like[3]);	
}