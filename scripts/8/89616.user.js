// ==UserScript==
// @name             KoC - Hide Setup Progress Bar (QuickWidget)
// @version          0.4
// @namespace        KOCQuickWidgets
// @homepage         http://userscripts.org/scripts/show/89616
// @description      Small little script that will hide the annoying setup progress bar across top of screen
//                   (useful if you don't want to give Kingdoms of Camelot permission to post to your wall, for example).
//                   Should be compatible with other KoC greasemonkey scripts.

// @include          http://*.kingdomsofcamelot.com/*main_src.php*
// @require          http://sizzlemctwizzle.com/updater.php?id=89616

// ==/UserScript==

unsafeWindow.hideSetupProgressBar = function(){
	var progress_bar = document.getElementById("progressBar");
	if(progress_bar){
		progress_bar.style.display = "block";
		progress_bar.style.overflow = "hidden";
		progress_bar.style.height = "1px";
	}
}

window.addEventListener("load", function(e) {
	unsafeWindow.hideSetupProgressBar();
}, false);