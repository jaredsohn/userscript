// ==UserScript==
// @name           TranslateIt
// @author         Dhruva Sagar
// @version        0.1.2
// @namespace      http://www.dhruvasagar.net/blog/
// @description    Translates text on web sites to your desired language using Google Language AJAX API
// @include        *
// ==/UserScript==

/*
Version 0.1.2

Change Log:

18 Nov '2008 v0.1.2
	* Fixed problem of conversion of html special characters such as ", ' into html codes such as &quot;

17 Nov '2008 v0.1.1
	* Fixed problem of replacement where the entire text contained in the parent node of the text was being replaced by the translated text instead of just the replaced text.
 */

(function() {
	/*
	 *	This is the source language, initially set to detect.
	 */
	var srcLang = "detect";

	/*
	 *	Change this variable to your desired destination language;
	 */
	var destLang = "en";

	function detect(text) {
		GM_xmlhttpRequest ({
			method:	'GET',
			url:	'http://ajax.googleapis.com/ajax/services/language/detect?v=1.0&q=' + text,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.8.2',
				'Referer': 'http://www.dhruvasagar.net/',
			},
			onload: function(req) {
				var res = eval( '(' + req.responseText + ')' );
				if ( res.responseData.language ) {
					translateIt( text, res.responseData.language );
				}
			}
		});
	}

	function translate() {
		var text = window.getSelection();
		if ( srcLang == "detect" ) {
			detect( text );
		} else {
			translateIt( text, srcLang, destLang );
		}
	}

	function translateIt( text, srcLang ) {
		GM_xmlhttpRequest ({
			method:	'GET',
			url:	'http://ajax.googleapis.com/ajax/services/language/translate?v=1.0&q=' + text + '&langpair=' + srcLang + '%7C' + destLang,
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.8.2',
				'Referer': 'http://www.dhruvasagar.net/',
			},
			onload: function(req) {
				var res = eval( '(' + req.responseText + ')' );
				if ( res.responseData.translatedText ) {
					if ( window.getSelection().getRangeAt(0).commonAncestorContainer.innerHTML ) {
						window.getSelection().getRangeAt(0).commonAncestorContainer.innerHTML = window.getSelection().getRangeAt(0).commonAncestorContainer.innerHTML.replace( window.getSelection().toString(), res.responseData.translatedText );
						} else {
							window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode.innerHTML = window.getSelection().getRangeAt(0).commonAncestorContainer.parentNode.innerHTML.replace( window.getSelection().toString(), res.responseData.translatedText );
						}
				}
			}
		});
	}

	GM_registerMenuCommand( "Translate", translate, "l", "control shift alt", "t");
})();