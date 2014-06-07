// ==UserScript==
// @name          Sportowe Forum Dyskusyjne - sfd.pl - clean
// @namespace     http://userstyles.org
// @description	  Styl, który poprawia wygląd SFD wycinając zbędne zapychacze miejsca. Nie jestem specem, więc nie każda przeglądarka pozbędzie się każdego śmiecia, ale styl wyraźnie porządkuje stronę. Jeżeli jesteś stałym gościem w SFD, myślę, że ci się to spodoba. Nie bawiłem się w blokowanie reklam, do tego jest ABP (Adblock Plus) - polecam
// @author        sinodrom
// @homepage      http://userstyles.org/styles/20878
// @include       http://sfd.pl/*
// @include       https://sfd.pl/*
// @include       http://*.sfd.pl/*
// @include       https://*.sfd.pl/*
// ==/UserScript==
(function() {
var css = "body {\nbackground-color:white !important;\nbackground-image: none !important;\n}\n\n\nDIV[style=\"border: 1px solid rgb(209, 228, 248); background: rgb(240, 247, 255) url(images/top_box_bg.jpg) repeat-x scroll 0% 0%; -moz-background-clip: border; -moz-background-origin: padding; -moz-background-inline-policy: continuous; margin-top: 30px; width: 985px; height: 69px; text-align: center; margin-bottom: -30px;\"] {\ndisplay: none !important;\nvisibility: hidden !important;\n}\n\n\ntd[style] {\ndisplay: none !important;\nvisibility: hidden !important;\n}\n\n\ntd[align=\"right\"][vAlign=\"middle\"][width=\"350\"][height=\"98\"] {\ndisplay: none !important;\nvisibility: hidden !important;\n}\n\n\ntable[width=\"99%\"][border=\"0\"][style=\"margin-left:8px\"] {\ndisplay: none !important;\nvisibility: hidden !important;\n}\n\n\ndiv[align=center] > center > a {\ndisplay: none !important;\nvisibility: hidden !important;\n}\n\n\ntd[height=\"78\"][align=\"middle\"][valign=\"bottom\"][colspan=\"6\"][bgcolor=\"#D1E4F8\"] {\ndisplay: none !important;\nvisibility: hidden !important;\n}\n\n\ntable[align=center][border=\"0\"][width=\"980\"][cellspacing=\"0\"][cellpadding=\"0\"] {\ndisplay: none !important;\nvisibility: hidden !important;\n}\n\n\nDIV.a8 {\ndisplay: none !important;\nvisibility: hidden !important;\n}\n\n\ntd[align=\"center\"][vAlign=\"bottom\"][width=\"350\"][height=\"98\"] {\ndisplay: none !important;\nvisibility: hidden !important;\n}\n\n\n#showimage {\ndisplay: none !important;\nvisibility: hidden !important;\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();