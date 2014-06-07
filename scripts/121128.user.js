// ==UserScript==
// @name           test page stripper
// @namespace      test page stripper
// @description    test page stripper
// @include        *
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @version        0.0.2
// @copyright      MonkeyNround
// ==/UserScript== 
(function() {
	var text = '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"><html><head><title>something</title></head><body>something</body></html>';


	String.prototype.safeContent = function(src){
		return src.replace(new RegExp("(<!--.*?(?=-->)-->)|(<[ \n\r]*style[^>]*>.*?<[ \n\r]*/style[^>]*>)|(<[ \n\r]*script[^>]*>.*?<[ \n\r]*/script[^>]*>)|(<(?:.|\s)*?>)", 'gi'),' ');
	}

	var text = document.documentElement.textContent;
	text = text.safeContent(text);
	var encodedText = encodeURIComponent(text);
	content.document.location.href = "javascript:(function(){document.open();document.write('"+encodedText +"');document.close();})();";
})();