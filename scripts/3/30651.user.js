// ==UserScript==
// @name           BLIP Colorfull tags
// @namespace      http://userscripts.org/users/21431
// @description    Colors tags
// @include        http://*blip.pl*
// @version        0.3.1
// ==/UserScript==

window.addEventListener('load', function() {

	GM_addStyle(".tag { border-width:1px 0; margin:0 1px; padding:0; white-space:nowrap; }" +
	".innerTag { border-width:0 1px; margin:0 -1px; }"+
	".tag, .innerTag { border-style:solid; font-weight:normal; }"+
	".content .tag { white-space:nowrap; }");

	var fgColors = {};
	var bgColors = {};
	function computeBgColor(title) {
		function djb2hash(hashstring) {
			var i, hashvalue = 1742;
			for (i = 0; i < hashstring.length; i++) {
				var ascii_code = hashstring.charCodeAt(i);
				hashvalue = ((hashvalue << 2) + (hashvalue << 5)) + ascii_code%32;
			}
			return hashvalue;
		};

		// Compute a hash of the hostname, and clamp it to the 0-360 range allowed for the hue.
		var hash = djb2hash(title);
		var hue = hash % 360;

		fgColors[title] = {hue: hue, sat: 50 + (hash % 50)};
		return {hue: hue, sat: 50 + (hash % 50)};
	}
	
	function computeFgColor(title) {
		function djb2hash(hashstring) {
			var i, hashvalue = 59981;
			for (i = 0; i < hashstring.length; i++) {
				var ascii_code = hashstring.charCodeAt(i);
				hashvalue = ((hashvalue << 2) + (hashvalue < 5)) + ascii_code%32;
			}
			return hashvalue;
		};

		// Compute a hash of the hostname, and clamp it to the 0-360 range allowed for the hue.
		var hash = djb2hash(title);
		var hue = hash % 360;

		fgColors[title] = {hue: hue, sat: hash % 50};		
		return {hue: hue, sat: hash % 50};
	}

    function colorTags () {
    	var tags = document.evaluate("//a[contains(@href, 'blip.pl/tags/') and not(contains(@class, 'tagged'))]", document, null, 6, null);
    	var tag, _i=0;
    	while (tag = tags.snapshotItem(_i++)) {
    		var tagName = tag.href.substr(tag.href.indexOf("/tags/")+6);
    		var bgColor = bgColors[tagName]?bgColors[tagName]:computeBgColor(tagName);
    		var fgColor = fgColors[tagName]?fgColors[tagName]:computeFgColor(tagName);
    		var bgColorStyle = "hsl(" + bgColor.hue + ", "+bgColor.sat+"%, 80%)"
    		var fgColorStyle = "color: hsl(" + (fgColor.hue) + ", 66%, 33%) !important;"
    		
    		var newTag = tag.cloneNode(true);
    		newTag.className = "tagged";
    		newTag.setAttribute("style", fgColorStyle);

			var spanInnerTag = document.createElement("span");
    		spanInnerTag.className = "innerTag";
    		spanInnerTag.style.background = bgColorStyle;
    		spanInnerTag.style.borderColor = bgColorStyle
    		spanInnerTag.appendChild(newTag);
    		
    		var spanTag = document.createElement("span");
    		spanTag.className = "tag";
    		spanTag.style.background = bgColorStyle
    		spanTag.style.borderColor = bgColorStyle
    		spanTag.appendChild(spanInnerTag);

    		tag.parentNode.replaceChild(spanTag, tag);
    	}
    }
    
	colorTags();
	var interval = window.setInterval(colorTags, 1000);


}, true);