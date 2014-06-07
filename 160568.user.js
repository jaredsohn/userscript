// ==UserScript==
// @name           GD fixer
// @author          Kiwi
// @include        http://www.facepunch.com/*
// @include        http://facepunch.com/*
// ==/UserScript==
var aa = document.getElementsByTagName("a");
var gdlnk = ["http://www.facepunch.com/forumdisplay.php?f=6", "http://www.facepunch.com/forums/6", "http://facepunch.com/forumdisplay.php?f=6", "http://facepunch.com/forums/6"];
for (var i = 0; i <= aa.length; i++) {
	for (j = 0; j <= gdlnk.length; j++) {
		if (aa[i].href == gdlnk[j]) {
			aa[i].href = "http://facepunch.com/forumdisplay.php?f=6&sort=lastpost&order=desc";
			break;
		}
	}
}