// ==UserScript==
// @name       Filtre anti manifestation au Québec
// @description    Cache les posts qui parlent de la grève, juste pour prendre un break
// @namespace  loi78
// @version    0.4
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// @match          http://www.facebook.com/*
// @match          https://www.facebook.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.js
// ==/UserScript==

var patterns = {
		"manifestation" : /\bmanif/i,
		"police" : /\bpolice\b/i,
		"charest" : /\bcharest\b/i,
		"GND" : /\bGND\b/,
		"gouvernement" : /\bgouvernement/i,
		"grève" : /\bgrève\b/i,
        "CLASSE" : /\bCLASSE\b/i,
        "conflit" : /\bconflit\b/i,
        "Richard Martineau" : /\bRichard Martineau\b/i,
        "étudiant" : /\btudiant/i,
		"Dubois" : /\bDubois\b/i,
        "loi78" : /\bloi 78\b/i,
        "boycott" : /\boycott\b/i
	};


function isNewsFeedPage() {
	return $("#sideNav li:first").hasClass("selectedItem");
}

function showHideFeeds() {
	
    if (isNewsFeedPage()) {
	

		$(".uiUnifiedStory").each(function() {
			var str = $(this).html();
			for (var key in patterns) {
				
				if (str.match(patterns[key])) {
				
						$(this).hide();

					break;
				}
			}
		});

		
		$(".uiStreamStory:has(a[href*='apps.facebook.com'])").hide();
		
	}
}

window.addEventListener("load", function() { showHideFeeds(); }, false);
window.addEventListener("DOMNodeInserted", function() { showHideFeeds(); }, false);
