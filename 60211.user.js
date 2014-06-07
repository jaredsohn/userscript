// ==UserScript==
// @author		 vandalizmo
// @name         Filmweb_Torrent
// @version		 0.24
// @namespace	 http://furorra.pl/scripts/gm/
// @require      http://code.jquery.com/jquery-latest.min.js
// @description  Adds IMDb, Mininova, ThePirateBay, IsoHunt links to Filmweb.pl pages
// @include      http://*.filmweb.pl/*
// ==/UserScript==

//http://wiki.greasespot.net/Code_snippets#Make_menu_toggle
function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
  // Load current value into variable
  window[key] = GM_getValue(key, defaultValue);
  // Add menu toggle
  GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn), function() {
    GM_setValue(key, !window[key]);
    location.reload();
  });
}

(function() {
	film_title	= $.trim($("div.film-title h1 a").html());
	film_aka	= $.trim($("span.aka").html());
	film_year	= $.trim($("span.year a").text().trim());
	
	film_search_title	= (film_title+" "+film_year).replace(/\s+/g, "+");
	film_search_aka		= (film_aka+" "+film_year).replace(/\s+/g, "+");

	sites = {
		IMDb: {
			query:	'http://www.imdb.com/find?s=all&q={film_title}',
			favicon:'http://imdb.com/favicon.ico'
		},
		Mininova: {
			query:	'http://mininova.org/search/{film_title}/4/seeds',
			favicon:'http://mnstat.com/images/favicon.ico'
		},
		ThePirateBay: {
			query:	'http://thepiratebay.org/search/{film_title}/0/7/200',
			favicon:'http://thepiratebay.org/favicon.ico'
		},
		IsoHunt: {
			query:	'http://isohunt.com/torrents/{film_title}?iht=1&ihp=1&ihs1=2&iho1=d',
			favicon:'http://isohunt.com/favicon.ico'
		}
	}

	for (var site_name in sites) {
		makeMenuToggle(site_name, true, "Enable", "Disable", site_name);
	
		if (eval(site_name)) {
			if (film_title != '')  {
				var q = sites[site_name].query.replace(/\{film_title\}/, film_search_title);
				$("div.film-title h1").append('<span><a href="'+q+'"><img src="'+sites[site_name].favicon+'" title="'+site_name+'"/></a></span>');
			}
			if (film_aka != '') {
				var q = sites[site_name].query.replace(/\{film_title\}/, film_search_aka);
				$("div.film-title").append('<span><a href="'+q+'"><img src="'+sites[site_name].favicon+'" title="'+site_name+'"/></a></span>');
			}
		}
	}

})();