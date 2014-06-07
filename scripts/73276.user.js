// ==UserScript==
// @name           Remove styles in Human Pets
// @namespace      
// @description    removes embedded styles but leaves default style, now you can read text on a page again for a change! made by Ian (humanpets.com/imp)
// @include        http://humanpets.com*
// ==/UserScript==


	//remove all embedded styles
	var daStyles = document.getElementsByTagName('style');
	for (var i = daStyles.length -1; i >= 0; i--) {
		//replace the tags with empty blocks
		var elmStyle = daStyles[i];
		var elmNewStyle = document.createElement('style');
		elmStyle.parentNode.replaceChild(elmNewStyle,elmStyle);
	}