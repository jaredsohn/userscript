// ==UserScript==
// @name           Plurk Translator
// @namespace      http://plurk.com/
// @description    Translate plurks
// @include        http://*plurk.com/*
// @author         YungSang
// @version        0.5
// ==/UserScript==
// v0.1 : 2008.07.03 : First Release
// v0.2 : 2008.07.06 : Fixed converting some html special chars
// v0.3 : 2008.07.06 : Supported individual plurk pages
// v0.4 : 2008.07.26 : Optimized @include
// v0.5 : 2009.01.30 : @include path has been changed

(function (window) {
	var lang = 'en';

	if (navigator.language)	lang = navigator.language.split('-')[0];

	function loadScript(url) {
		var script     = document.createElement('script');
		script.type    = 'text/javascript';
		script.charset = 'utf-8';
		script.src     = url;
		document.getElementsByTagName('head')[0].appendChild(script);
	}

	window.translate_result = function(result) {
		if (result.responseStatus != 200) {
			alert("Error: " + result.responseDetails);
			return;
		}

		var content = result.responseData.translatedText;
		content = content.replace(/&quot;/g, '"');
		content = content.replace(/&#39;/g, '\'');
		content = content.replace(/&amp;/g, '&');
		content = content.replace(/&gt;/g, '>');
		content = content.replace(/&lt;/g, '<');
		if (typeof fluid != 'undefined') content = content.replace(/%/g, '%%');
		alert(content);
	};

	window.translate = function(event, text) {
		var url = 'http://ajax.googleapis.com/ajax/services/language/translate?v=1.0&callback=translate_result&langpair=' + encodeURIComponent('|'+lang) + '&q=' + encodeURIComponent(unescape(text));
		
		loadScript(url);
		
		event.preventDefault();
		event.stopPropagation();
		return false;
	};

	var org_Qualifiers_format = window.Qualifiers.format;
	window.Qualifiers.format = function(H, K, N, E, C, L) {
		var content = N;

		content = content.replace(/<[^>]+>/g, '');

//			N += ' (<a href="http://translate.google.com/translate_t?sl=auto&tl=en&q=' + encodeURIComponent(content) + '" target="_blank"><b>T</b></a>)';

		N += ' (<a href="#" onclick="return translate(event, \'' + escape(content) + '\');" target="_blank"><b>T</b></a>)';

		return org_Qualifiers_format.call(this, H, K, N, E, C, L);
	};

	if (/^http:\/\/www.plurk.com\/p\//.test(location.href)) {
		var plurk_contents = window.AJS.getElementsByTagAndClassName('span', 'plurk_content');
		for (var i = 0, len = plurk_contents.length ; i < len ; i++) {
			var plurk_content = plurk_contents[i];
			var content = plurk_content.innerHTML;
			content = content.replace(/<[^>]+>/g, '');
			plurk_content.innerHTML += ' (<a href="#" onclick="return translate(event, \'' + escape(content) + '\');" target="_blank"><b>T</b></a>)';
		}
	}

})((typeof unsafeWindow != 'undefined') ? unsafeWindow : window);