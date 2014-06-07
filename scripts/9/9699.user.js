// ==UserScript==
// @name           Show flix.co.il movies in Firefox when plaxo.com is blocked
// @namespace      http://www.splintor.com/userscripts
// @description    See http://splintor.wordpress.com/2007/06/06/flixcoil-on-firefox/ for details
// @include        http://www.flix.co.il/tapuz/showVideo.asp?m=*
// ==/UserScript==

(function() {
	// update automatically -  // see http://userscripts.org/scripts/show/2296 for details
	try {
		window.addEventListener("load", function () { try {
			(unsafeWindow || window.wrappedJSObject || window).UserScriptUpdates.requestAutomaticUpdates({
				name: "Show flix.co.il movies in Firefox when plaxo.com is blocked",
				namespace: "http://www.splintor.com/userscripts",
				description: "See http://splintor.wordpress.com/2007/06/06/flixcoil-on-firefox/ for details",
				source: "http://userscripts.org/scripts/show/9699",
				identifier: "http://userscripts.org/scripts/source/9699.user.js",
				version: "0.1",
				date: (new Date(2007, 6 - 1, 6)).valueOf()
			});
		} catch (ex) {} }, false);
	} catch (ex) {}

	var td = document.getElementById("TitleDiv").parentNode.getElementsByTagName("table")[2].getElementsByTagName("td")[0];
	if(td.getElementsByTagName("object").length == 0 && td.getElementsByTagName("embed").length == 0) {
		td.innerHTML = "<embed src='http://albums.tapuz.co.il/albums/flixPlayer.swf?mediaId=" + location.href.split("m=")[1] +
			"' quality='high' scale='noscale' width='458' height='440' id='FLVPlayer' name='FLVPlayer' salign='LT' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' allowScriptAccess='always' allowFullScreen='true' />";
		if(window.console && console.log) console.log("ShowFlix userscript: Player movie was not started correctly, and was added by the script.");
	} else
		if(window.console && console.log) console.log("ShowFlix userscript: Player movie started OK.");
})();