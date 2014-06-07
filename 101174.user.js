// ==UserScript==
// @name           eRep D1241+ Latest News
// @namespace      ePseudoParadise
// @version        2.4
// @description    Adds "Latest" in erepublik home, "All" in news list
// @include        http://www.erepublik.com/*
// ==/UserScript==

var LOCALE;
var diva;

function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

function init() {
	var seg = document.location.href.split('/');
	LOCALE = seg[3].substr(0,2);

	if ((diva = document.getElementById('articles')) != null) {
		diva = diva.firstElementChild;

		var lics = document.getElementById('menu5').lastElementChild;
		if (lics.childNodes.length > 15) {
			lics = lics.childNodes[13];
		} else {
			lics = lics.lastElementChild.previousElementSibling;
		}
		var citizenshipCountry = lics.firstElementChild.getAttribute('href').split('/')[2];
		var residentCountry = document.getElementById('large_sidebar').firstElementChild.lastElementChild.lastElementChild.lastElementChild.getAttribute('href').split('/')[4];

		if (citizenshipCountry != residentCountry) addLatest(citizenshipCountry);
		addLatest(residentCountry);
	}
	else if (seg[4] == 'news') {
		if (seg[5] == 'latest') {
			fixLatest();
		}
		if (seg[6] != 'all' && (seg[5] == 'rated' || seg[5] == 'latest')) {
			improveCategory(seg[5], seg[7]);
		}
	}
}

function addLatest(country) {
	var la = document.createElement('a');
	la.innerHTML = '<a href="/' + LOCALE + '/news/latest/all/' + country + '/1" class="mbutton"><img src="/images/flags_png/M/' + country + '.png" alt="" width="16px" /><span>Latest news in ' + country.replace('-', ' ') + '</span></a>';
	diva.insertBefore(la, diva.firstChild);
}

function improveCategory(sort, country) {
	var filters = xpath("//ul[@class='news_filters']").snapshotItem(0);
	var sis = xpath("//a[@class='selector last']/img").snapshotItem(0).src;
	var la = document.createElement('a');
	la.innerHTML = '<li><a href="/' + LOCALE + '/news/' + sort + '/all/' + country + '/1" title="All articles"><img src="/images/modules/_icons/xp_icon.png" alt="" width="32" /></a></li>';
	filters.appendChild(la);
}

function fixLatest() {
	var cats = xpath("//ul[@class='news_filters']/li/a"), cat;
	for (var i = 0; i < cats.snapshotLength; i++) {
		cat = cats.snapshotItem(i);
		cat.setAttribute('href', cat.href.replace("rated", "latest"));
	}
}

init();
