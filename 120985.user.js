// ==UserScript==
// @name			TVLog.me Download Link Fixer
// @author			TorusFox
// @version			1.0.0
// @description		Rewrites provided download links so they can be copied en masse.
// @include			http://tvlog.me/*
// ==/UserScript==

/*
	Script History
	
	1.0.0	2011-12-20		Initial release
*/

(function() {
	
	var codeLinks = document.getElementsByClassName('entry post clearfix')[0].getElementsByTagName("code"); // All of TVLog.me's download links are wrapped in "<CODE>" tags, contained within a particular DIV element. :)
		
	for (var i = 0; i < codeLinks.length; i++) {
			
			codeLinks[i].appendChild(document.createElement('br')); // Add a linebreak following each download link and voila!  The links are now copy-able. :)
			
	}
	
})();