// ==UserScript==
// @name	Google Video Exposer
// @description	Makes title a link to the FLV file on Google Video.
// @include	http://video.google.*/*
// ==/UserScript==

var pScripts = document.getElementsByTagName("script");
for (var i=0; i < pScripts.length; i++) {
	var insertContent = pScripts[i].innerHTML.match(/insertFlashHtmlOnLoad[^{]*{([^}]*)/);
	if (insertContent != null) {
		var vidURL = unescape(insertContent[1].match(/videoUrl(?:=|\\u003d)([^&]*)/)[1]);
		vidURL = vidURL.match(/^(.*?&secureurl=[^&]*)/)[1];
		var vidTitleElm = document.getElementById('pvprogtitle');
		vidTitleElm.innerHTML = vidTitleElm.innerHTML.replace(/((?:[^\u003c]|<[^dD])+)/,
			function(sMatch, mMatch, offset, sOrg) {
				return "<a href='" + vidURL+ "' type='video/x-flv'>" + sMatch.replace(/^\s+/g, "").replace(/\s+$/g, "") + "</a>";
			});
		break;
	}
}