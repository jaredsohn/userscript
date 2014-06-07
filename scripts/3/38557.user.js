// ==UserScript==
// @name           Logo Hanamasize
// @namespace      http://ikenie.com/
// @include        *
// @require        http://gist.github.com/raw/3242/1a7950e033a207efcfc233ae8d9939b676bdbf46
// @require        http://gist.github.com/raw/34615/04333b7e307eb029462680e4f4cf961f72f4324c
// ==/UserScript==

(function() {
	var DATABASE_URL = 'http://wedata.net/databases/LogoHanamasize/items.json';
	var map = {};
	
	function hanamasize(doc) {
		for (var i in map) {
			if (location.href.match(map[i].url)) {
				var logo = $X(map[i].logoPath, doc);
				if (!map[i].imgPath) {
					map[i].imgPath = "http://w.ikenie.com/hanamasa/hanamasa.png";
				}
				logo[0].src = map[i].imgPath;
			}	
		}
	}
	
	var database = new Wedata.Database(DATABASE_URL);

	if(document.referrer.match(/http:\/\/wedata\.net\/.*\/[new|edit]/) && document.location.href.match(/http:\/\/wedata\.net\/items\/\d+/)) {
		database.clearCache();
		database = new Wedata.Database(DATABASE_URL);
	}

	database.get(function(items) {
		items.forEach(function(item) {
			map[item.name] = item.data;
		});
		hanamasize(document);
	});
	
	setTimeout(function() {
		if (window.AutoPagerize && window.AutoPagerize.addDocumentFilter) {
			//window.AutoPagerize.addDocumentFilter(hanamasize);
		}
	}, 0);
})();
