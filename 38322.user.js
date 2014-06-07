// ==UserScript==
// @name          Twitter Translate
// @namespace     http://almaer.com/firefox/userscripts/
// @description   Translate foreign talk in Twitter
// @include       http://twitter.com/*
// @exclude       http://twitter.com/account/*
// @exclude       http://twitter.com/logout*
// @exclude       https://twitter.com/invitations
// ==/UserScript==
 
(function() {	
	var jQuery = unsafeWindow['jQuery']; // Bring it over from the dark side
	
	// Load Google API
	var script = document.createElement('script');
	script.src = 'http://www.google.com/jsapi';
	script.type = "text/javascript";
	document.getElementsByTagName('head')[0].appendChild(script);

	// Given the comment element inject a translation if it exists
	var translate = function(el) {		
		var google = unsafeWindow['google'];
		var language = "en";
		var text = jQuery.trim(jQuery(el).html());
		
		google.load("language", "1", { callback: function() {
			google.language.detect(text, function(dresult) {
				if (!dresult.error && dresult.language != language ) {
					google.language.translate(text, dresult.language, language, function(tresult) {
						if (tresult.translation) {
							jQuery(el).html(tresult.translation + ' <a href="javascript:void(0);" title="click to show / hide the translation" onclick="toggleTranslation(this)" style="color: #666; font-size: smaller;"><img src="http://good-translations.googlecode.com/svn/trunk/twitter-translate/twittertranslate.png" border="0" width="31" height="16" style="margin-left: 4px;" /> translated from ...</a> <span style="display: none; color: #666; font-size: smaller;">' + text + '</span>');
						}
					});
				}
			});
		}
		});		
	}
	
	// Flip the translation text back and forth
	unsafeWindow['toggleTranslation'] = function(el) {
		var translationContent = jQuery(el).next();
		if (translationContent.css('display') != 'none') {
			translationContent.css('display', 'none');
		} else {
			translationContent.css('display', 'inline');
		}
	}

	// Go through the twitters
	window.addEventListener('load', function(event) {
		if (!unsafeWindow['jQuery']) return; // If jQuery hasn't been loaded we are in trouble
				
		jQuery('.entry-content').each(function() {
			translate(this);
		});
		
	}, false);
})();