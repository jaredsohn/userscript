// ==UserScript==
// @name        mail.yandex.ru redirects remover
// @namespace   http://userstyles.org/
// @description Removes annoying mail.yandex.ru redirects from all in-mail links.
// @grant       none
// @include     https://mail.yandex.ru*
// @include     http://mail.yandex.ru*
// @version     0.5
// ==/UserScript==

(function() {

	document.addEventListener("DOMNodeInserted", function(evt) {
		replaceReds(evt.relatedNode);
	});

	function replaceReds(parentNode) {
		var AllLinks	= parentNode.getElementsByTagName('a');
		var RedLinkExpr	= /(.*)mail.yandex.ru\/re\.jsx\?(.*)/i;

		for (var i = 0; i < AllLinks.length; i++)
			if(RedLinkExpr.test(AllLinks.item(i).href)) {
				linkEncoded = getParam(RegExp.$2, "l");
				
				linkParts = linkEncoded.split("_");
				
				// dunno if more than one parameter group possible, but why take a chance?
				for (var j = 0; j < linkParts.length; j++)
					linkParts[j] = b64_to_utf8(linkParts[j]);

				AllLinks.item(i).href = linkParts.join("?");
			}
	}

	function getParam(parameters, paramName) {
		var paramArray = parameters.split("&");
		var i = 0;
		while(i < paramArray.length) {
			var paramParsed = paramArray[i].split("=");
			if(paramParsed[0] == paramName)	// check parameter name
				return paramParsed[1];		// return parameter value if name matched
			i++;
		}
		
		return "";
	}

	// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding#The_.22Unicode_Problem.22
	function b64_to_utf8(str) {
		return decodeURIComponent(escape(window.atob(str)));
	}

})();