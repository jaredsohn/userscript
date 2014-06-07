// ==UserScript==
// @name           Direct Images AerisDies Beta
// @namespace      Bubba Damaged
// @description    Gallery direct images links
// @include        http://www.aerisdies.com*
// ==/UserScript==

// ============================================================================
// Still Beta only jpg is used for the links cant reconize gifs and other image formats
// maybe png if is used.
// ============================================================================

(function() {
	var allLinks = document.getElementsByTagName("a");
	for (var i=0; i<allLinks.length; i++) {
if ((allLinks[i].href.indexOf('img.php?') != -1) && 
(window.location.href.indexOf('aerisdies.com') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('/thumbnails/','/images/').replace('.gif','.jpg');		
            }
else if ((allLinks[i].href.indexOf('html/lb/img') != -1) && 
(window.location.href.indexOf('aerisdies.com') != -1)) {
			var images = allLinks[i].getElementsByTagName('img');
			var thumb = images[0].src;
			allLinks[i].href = thumb.replace('/thumbnails/','/images/').replace('.gif','.jpg');			
            }
	}
})();