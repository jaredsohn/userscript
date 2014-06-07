// ==UserScript==
// @name          Dzone Link Corrector
// @description	  Recently Dzone changed their links to point to dzone's internal discussion pages instead of the story page. This user script changes it back.
// @namespace     http://www.openjs.com/
// @include       http://dzone.com*
// @include       http://www.dzone.com*

//by Binny V A (http://www.openjs.com/)
// ==/UserScript==
function changeLinks() {
	var thumbs = unsafeWindow.$$(".thumbnail");
	for (var i=0; i<thumbs.length; i++) {
		var url = thumbs[i].parentNode.href.toString();
		var container = thumbs[i].parentNode.parentNode.parentNode;
		
		var link = container.getElementsByTagName("h3")[0].getElementsByTagName("a")[0];
		link.href = url;
	}
}

(function (){
	window.addEventListener('load', function() {
		changeLinks();
		unsafeWindow.changeLinks = changeLinks;
		
		//A wild hack
		var jQuery_trim = unsafeWindow.jQuery.trim;
		unsafeWindow.jQuery.trim = function(string) {
			window.setTimeout("changeLinks()",1000);
			return jQuery_trim(string)
		}
	}, false);
})();
