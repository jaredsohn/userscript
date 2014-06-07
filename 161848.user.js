// ==UserScript==
// @name          YouTube Full HD & Centered
// @namespace     http://userscripts.org
// @description	  YouTube for 1080p or higher.
// @author        weeandykidd
// @include       http://youtube.com/watch*
// @include       https://youtube.com/watch*
// @include       https://www.youtube.com/watch*
// @include       http://www.youtube.com/watch*
// @include       http://www.youtube.com/list*
// @include       http://youtube.com/
// @include       https://youtube.com/
// @include       https://www.youtube.com/
// @include       http://www.youtube.com/
// @run-at        document-start
// ==/UserScript==


(function() {
var css = "";
if (false || (document.location.href.indexOf("http://youtube.com/watch") == 0) || (document.location.href.indexOf("https://youtube.com/watch") == 0) || (document.location.href.indexOf("https://www.youtube.com/watch") == 0) || (document.location.href.indexOf("http://www.youtube.com/watch") == 0))
	css += "  div#watch7-sidebar{background: transparent!important; margin-left: 1000px !important; width:280px!important;\n    } #player-api { margin-left: 25%!important; margin-right: 25%!important;height: 750px !important;width: 1280px !important;}   div#page.watch.clearfix{margin-lefT:0px;}   #watch7-main-container{margin-left:25% !important;} #watch7-content{width:1000px !important;margin-right:0px!important;} .yt-uix-button-panel{width:1000px !important;margin-right:0px!important;}  ";
if (false || ((new RegExp('list')).test(document.location.href) == false))
	css += "div#watch7-sidebar{\n    margin-top: -0.05px !important; padding-top:10px!important;}";
if (false || ((new RegExp('list')).test(document.location.href) == true))
	css += "div#watch7-sidebar{\n    margin-top: -0.05px !important; padding-top:10px!important;}    .watch7-playlist-bar-secondary-controls{margin-right:70px!important;} #watch7-playlist-bar-controls{width:230px!important;} .watch7-playlist-bar{margin-left:70%!important; }    #watch7-playlist-tray-container{height: 750px !important;width:330px!important;} #playlist{margin-left:25%!important;}   ";
if (false || (location.href.replace(location.hash,'') == "http://youtube.com/") || (location.href.replace(location.hash,'') == "https://youtube.com/") || (location.href.replace(location.hash,'') == "https://www.youtube.com/") || (location.href.replace(location.hash,'') == "http://www.youtube.com/"))
	css += ".branded-page-v2-primary-col{width:1240px!important;margin-left:-280px!important;} #guide{margin-left:-280px!important;}.branded-page-v2-secondary-col{display:none;}";
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

// Main
function main() {
	document.body.classList.remove('site-left-aligned');
	document.body.classList.add('site-center-aligned');
}

if (window.opera) {
	try {
		document.addEventListener('DOMContentLoaded', main(), false)
	}
	catch(err) {
		document.addEventListener('DOMContentLoaded', main, false)
	}
}
else {
	document.addEventListener('DOMContentLoaded', main, false);
}