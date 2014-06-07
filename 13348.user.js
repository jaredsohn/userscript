//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Hello World", and click Uninstall.
//
// −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−
//
// Amalgam
// 2010−10−30
//
// Copyright (c) 2010, Thomas Leske
//  This program is free software: you can redistribute it and/or modify
//  it under the terms of the GNU General Public License as published by
//  the Free Software Foundation, either version 3 of the License, or
//  (at your option) any later version.
//
//  This program is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//  GNU General Public License for more details.
//
//  You should have received a copy of the GNU General Public License
//  along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// As a special exception you are allowed to distribute this program online
// without including a copy of the license (GPL license version 3).
//
// ***************
//
// Improvements over 1.9.2:
//  - fixed red links for metapedia
//  - fixed highlighting in combination with the style Darklinks
// Improvements over 1.9.1:
//  - added support for secure wikipedia.
// Improvements over 1.9:
//  - Double click on a link is not ignored any more.
// Improvements over 1.8:
//  - option that let's you open the popup by click rather than hovering.
//  - Text taken from a selection can be edited, before it is used 
//    as input for a search.
//  - flag icons added
//  - ordering preferences is made easier
//  - updated URL for EvoWiki
// Improvements over 1.7:
//  - annotate page with attribute 'classb' for stylish style
//  - bug fix for non encyclopedia sites
//  - Popup will be shown for text selections.
// Improvements over 1.6:
//  - Greasemonkey menu replaced by HTML-based settings
//  - added: juraforum/LexisNexis (de)
// Improvements over 1.5.1:
//  - added: Metapedia (en)
//  - improved support for: Encyclopedia of Earth
//  - added link for information about Amalgam
//  - added description of the limitations for certain sites
// Improvements over 1.5:
//  - added: RationalWiki
// Improvements over 1.4:
//  - added: Lobbypedia, SourceWatch and PowerBase
//  - added: menue entry for turning off translations
// Improvements over 1.3:
//  - bug for red links in www.esowatch.com fixed
//  - added: Metapedia, Anarchopedia, EvoWiki and CreationWiki
// Improvements over 1.2.3:
//  - added some encyclopedias
// Improvements over 1.2.2:
//  - Popup closes automatically, when visiting an encyclopedia site
//  - bug fixed: Wrong language for links from encyclopedia sites.
// Improvements over 1.2.1:
//  - popup can be closed by clicking on it
//  - show icons in the popup
//  - bug fix for urls to headers
// Improvements over 1.2:
//  - New pop up interface is less intrusive when reading articles.
//  - bug fixes
// Improvements over 1.1.1:
//  - fixed or removed the broken encyclopedias
//  - added more encyclopedias
// Improvements over 1.1:
//  - handle changes in the HTML of encyclopedia2.thefreedictionary.com 
//    for missing articles
// Improvements over 1.05:
//  - any absolute links to the supported encyclopedias will be processed on any page.
//  - minor fixes regarding New World Encyclopedia and the language of the Greasemonkey commands
// Improvements over 1.04:
//  - Fallback from Columbia Encyclopedia was broken: 
//    New message for not found articles is detected now.
// Improvements over 1.03:
//  - layout: no line breaks in links in the header and footer, smaller questionmarks
// Improvements over 1.02:
//  - Cleaned up interface
//  - Footer on Veropedia and Columbia Encyclopedia was misplaced. Now it is not added any more.
//  - Links to headers (with url suffix "#") are cropped properly for internal processing
// Improvements over 1.01:
//  - Fixed bug in code that detects links to images.
// Improvements over 1.0:
//  - columbia.thefreedictionary.com has been renamed to encyclopedia2.thefreedictionary.com
// Improvements over 0.9-beta4:
//  - fixed link titles for references to special pages
// Improvements over 0.9-beta3:
//  - Encyclopedias added.
//  - Translations are stored.
//  - 'Move to rear'-botton added.
// Improvements over 0.9-beta2:
//  - new menu item that makes Amalgam open new tabs instead of
//    using IFrames, where sites can break out. This is the default, 
//    which makes disabling JavaScript unnecessary.
//  - another menu item determines whether to open the fallback in
//    a new tab (default) or by redirecting the page.
//  - Amalgam tracks for all seen articles, whether they exit.
// Improvements over 0.9-beta1:
//  - no IFrames for urls with colons
//  - Sections in Wikiweise (e. g. '==1==') are handled
//
// ==UserScript==
// @name           Amalgam
// @namespace      tag:leskets@web.de,2007-10-23:UserScripts
// @description    Crosslinks 16 online encyclopedias (8 English, 8 German). You can send all requests to the best encyclopedia and rely on the fallback functionality. Amalgam also keeps track of the availability of articles and the translations of lemmas.
// @version        1.9.3
// @include        http://www.wikiweise.de/wiki/*
// @include        http://de.wikipedia.org/wiki/*
// @include        http://en.wikipedia.org/wiki/*
// @include        https://secure.wikimedia.org/wikipedia/*/wiki/*
// @include        http://en.citizendium.org/wiki/*
// @include        http://www.conservapedia.com/*  
// @include        http://www.newworldencyclopedia.org/entry/* 
// @include        http://www.scholarpedia.org/article/*
// @include        http://encyclopedia2.thefreedictionary.com/*
// @include        http://www.esowatch.com/*
// @include        http://athpedia.de/*
// @include        http://www.encyclopaedia-germanica.org/*
// @include        http://de.mundipedia.com/*
// @include        http://www.infoplease.com/*
// @include        http://www.britannica.com/*
// @include        http://www.eoearth.org/*
// @include        http://knol.google.com/*
// @include        http://plato.stanford.edu/*
// @include        http://en.wikisource.org/wiki/1911_Encyclopædia_Britannica/*
// @include        http://de.metapedia.org/*
// @include        http://en.metapedia.org/*
// @include        http://eng.anarchopedia.org/*
// @include        http://deu.anarchopedia.org/*
// @include        http://creationwiki.org/*
// @include        http://www.sourcewatch.org/*
// @include        http://www.powerbase.info/*
// @include        http://www.lobbypedia.de/*
// @include        http://rationalwiki.org/*
// @include        http://www.juraforum.de/*
// @include        http://www.wikinfo.org/*
// @include        http://evolutionwiki.org/*
// @include        http://www.exika.de/*
// @include        http://www.kathpedia.com/*
// @include        *
// ==/UserScript==
//
//Chances are that one of the sites will be down at installation time:
// @resource       favicon_www_wikiweise_de    http://www.wikiweise.de/stylesheets/ockham//favicon.ico
// @resource       favicon_de_wikipedia_org    http://de.wikipedia.org/favicon.ico
// @resource       favicon_en_wikipedia_org    http://en.wikipedia.org/favicon.ico
// @resource       favicon_en_citizendium_org  http://en.citizendium.org/images/favicon.ico
// @resource       favicon_www_conservapedia_com  http://www.conservapedia.com/favicon.ico
// @resource       favicon_www_newworldencyclopedia_org http://static.newworldencyclopedia.org/favicon.ico
// @resource       favicon_www_scholarpedia_org http://www.scholarpedia.org/wiki/skins/common/images/favicon.ico
// @resource       favicon_encyclopedia2_thefreedictionary_com  http://encyclopedia2.thefreedictionary.com/favicon.ico
// @resource       favicon_www_esowatch_com http://www.esowatch.com/favicon.ico
// @resource       favicon_athpedia_de http://athpedia.de/favicon.ico
// @resource       favicon_www_encyclopaedia-germanica_org http://www.encyclopaedia-germanica.org/de/images/favicon.ico
// @resource       favicon_de_mundipedia_com http://de.mundipedia.com/pub/favicon.ico
// @resource       favicon_www_infoplease_com http://i.infopls.com/favicon.ico
// @resource       favicon_www_britannica_com http://www.britannica.com/favicon.ico
// @resource       favicon_www_eoearth_org http://www.eoearth.org/eoe_favicon.ico
// @resource       favicon_knol_google_com http://knol.google.com/k/3cnwfui25mvyg/_/rsrc/1288496697256/system/app/images/favicon.ico
// @resource       favicon_plato_stanford_edu http://plato.stanford.edu/favicon.ico
// @resource       favicon_en_wikisource_org http://en.wikisource.org/favicon.ico
// @resource       favicon_de_metapedia_org http://de.metapedia.org/favicon.ico
// @resource       favicon_en_metapedia_org http://en.metapedia.org/favicon.ico
// @resource       favicon_eng_anarchopedia_org http://eng.anarchopedia.org/favicon.ico
// @resource       favicon_deu_anarchopedia_org http://deu.anarchopedia.org/favicon.ico
// @resource       favicon_creationwiki_org http://creationwiki.org/favicon.ico
// @resource       favicon_www_sourcewatch_org http://www.sourcewatch.org/favicon.ico
// @resource       favicon_www_powerbase_info http://www.powerbase.info/favicon.ico
// @resource       favicon_www_lobbypedia_de http://www.lobbypedia.de/favicon.ico
// @resource       favicon_www_juraforum_de http://www.juraforum.de/favicon.ico
//
//
//sites that are currently down:
//
// @include        http://lexikon.meyers.de/meyers/*
// @include        http://*.veropedia.com/a/*
// @include        http://veropedia.com/a/*

var popupID = 'AmalgamLinkContainer';

var SETTINGS = "SETTING_";

var flag = {}; // flag icons as base64 encoded png-s
// Great Britain:
flag['en'] = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAflJREFUeNpinDRzn5qN3uFDt16%2BYWBg%2BPv339%2BKGN0rbVP%2B%2F%2F2rW5tf0Hfy%2F2%2Bmr99%2ByKpyOl3Ydt8njEWIn8f9zj639NC7j78eP%2F%2F8739GVUUhNUNuhl8%2F%2FysKeZrJ%2Fv7z10Zb2PTQTIY1XZO2Xmfad%2Bf7XgkXxuUrVB6cjPVXef78JyMjA8PFuwyX7gAZj97%2BT2e9o3d4BWNp84K1NzubTjAB3fH0%2Bfv6N3qP%2Fir9bW6ozNQCijB8%2F8zw%2FTuQ7r4%2FndvN5mZgkpPXiis3Pv34%2BZPh5t23%2F%2F79Rwehof%2F9%2FNDEgMrOXHvJcrllgpoRN8PFOwy%2FfzP8%2BgUlgZI%2Ff%2F5xcPj%2F69e%2F37%2F%2FAUX%2B%2FmXRkN555gsOG2xt%2F5hZQMwF4r9%2F%2F%2F75%2B%2Bf3nz8nr75gSms82jfvQnT6zqvXPjC8e%2FsrJQHo9P9fvwNtAHmG4f8zZ6dDc3bIyM2LTNlsbtfM9OPHH3FhtqUz3eXX9H%2BcOy9ZMB2o6t%2FPn0DHMPz%2Fb%2B2wXGTvPlPGFxdcD%2BmZyjP8%2B8MUE6sa7a%2Fxo6Pykn1s4zdzIZ6%2F%2F%2F8zMGpKM2pKAB0jqy4UE7%2FmsKat6Jw5mafrsxNtWZ6%2FfjvNLW29qv25pQd%2F%2F%2Fn%2B5%2B%2FfxDDVbcc%2F%2FP%2Fzx%2F36m5Ub9zL8%2B7t66yEROcHK7q5bldMBAgwADcRBCuVLfoEAAAAASUVORK5CYII%3D';
flag['de'] = 'iVBORw0KGgoAAAANSUhEUgAAABAAAAALCAIAAAD5gJpuAAAABGdBTUEAAK%2FINwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAGzSURBVHjaYvTxcWb4%2B53h3z8GZpZff%2F79%2Bv3n%2F7%2FfDAz%2FGHAAgABi%2Bf37e3FxOZD1Dwz%2B%2Fv3z9y%2BE%2FAMFv3%2F%2F%2BQumfv9et241QACxMDExAVWfOHkJJAEW%2FgUEP0EQDn78%2BAHE%2FgFOQJUAAcQiy8Ag8O%2BfLFj1n1%2B%2FQDp%2B%2FgQioK7fP378%2BvkDqOH39x9A%2FRJ%2FgE5lAAhAYhzcAACCQBDkgRXRjP034R0IaDTZTFZn0DItot37S94KLOINerEcI7aKHAHE8v%2F3r%2F9%2F%2FzIA1f36%2FR%2Bo4tevf1ANYNVA9P07RD9IJQMDQACxADHD3z8Ig4GMHz%2BAqqHagKp%2F%2FfwLVA0U%2F%2Fv7LwMDQACx%2FLZiYFD7%2F5%2F53%2F%2B%2F%2F%2F79BqK%2FEMZ%2FUPACSYa%2Fv%2F8DyX9A0oTxx2EGgABi%2Ba%2FH8F%2Fm339BoCoQ%2Bg8kgRaCQvgPJJiBYmAuw39hxn%2BuDAABxMLwi%2BE%2F0PusRkwMvxhBGoDkH4b%2Fv%2F%2BD2EDyz%2F%2F%2FQB1%2FQLb8%2BsP0lQEggFh%2BvGXYM2%2FSP6A2Zoaf30Ex%2FJ%2BPgekHwz9gQDAz%2FP0FYrAyMfz7wcDAzPDtFwNAgAEAd3SIyRitX1gAAAAASUVORK5CYII%3D';

var useFrames;
var openNewTab;
var translateLemmas;
var extraClickOnLinks;
var tolerateTrackingByIcons;
function readSettings() {
    useFrames = GM_getValue(SETTINGS + "useFrames", false);
    openNewTab = GM_getValue(SETTINGS + "openNewTab", false);
    translateLemmas = GM_getValue(SETTINGS + "translateLemmas", true);
    extraClickOnLinks = GM_getValue(SETTINGS + "extraClickOnLinks", true);
    tolerateTrackingByIcons = GM_getValue(SETTINGS + "tolerateTrackingByIcons", false);
}
readSettings();

function insideFrame() {
    if (useFrames && isEncyclopediaSite) {
	return (unsafeWindow.top != unsafeWindow.self);
    } else {
	return false;
    }
}

var today = new Date();
var today_ms = today.getTime();
var URL_DB_PREFIX = "DB:";
var MS_PER_HOUR = 60 * 60 * 1000;
var MS_PER_DAY = 24 * MS_PER_HOUR;
var REPROBE_INTERVAL_DAYS = 1;
var REPROBE_INTERVAL_MS = REPROBE_INTERVAL_DAYS * MS_PER_DAY;

var url = window.location.href;
var realHost = window.location.host;
var urlSuffix;
var local;
var urlPrefixLength;
var urlPrefix = "";
var path = '';

var STRAIGHT  = 2;
var SPECIAL   = 3;

function Encyclopedia (hostname, localPath, xPath, shorthand, language, name, explicitPOV, targetEnd, knownBugs) {
  this.hostname = hostname;
  this.localPath = localPath;
  this.xPath = xPath;
  this.shorthand = shorthand;
  this.language = language;
  this.name = name;
  this.explicitPOV = explicitPOV;
  this.targetEnd = targetEnd;
  this.knownBugs = knownBugs;
}

var encyclopedias = 
    [
     // ******** Comment out the encyclopedias that you do not care for: ****************

     new Encyclopedia('www.wikiweise.de', "/wiki/", "//div[@id='div-maincontent-inner-default']", "WW", "de", 'Wikiweise', null, STRAIGHT, null),
     // Encyclopedia is down: 
     //   new Encyclopedia('lexikon.meyers.de', "/meyers/", "//div[@id='content']", "MY", "de", 'Meyers', null, STRAIGHT, null),
     new Encyclopedia('de.wikipedia.org', "/wiki/", "//div[@id='bodyContent']", "WP", "de", 'Wikipedia', null, SPECIAL, null),
     new Encyclopedia('www.scholarpedia.org', "/article/", "//div[@id='bodyContent']", "SP", "en", 'Scholarpedia', null, STRAIGHT, null),
     // Encyclopedia is down: 
     //   new Encyclopedia('www.veropedia.com', "/a/", "//div[@id='container']", "VP", "en", 'Veropedia', null, SPECIAL, null),
     new Encyclopedia('en.citizendium.org', "/wiki/", "//div[@id='bodycontent']", "CZ", "en", 'Citizendium', null, SPECIAL, null),
     new Encyclopedia('encyclopedia2.thefreedictionary.com', "/", "//div[@id='Ov']", "CE", "en", 'Columbia Encyclopedia', null, STRAIGHT, null),
     new Encyclopedia('en.wikipedia.org', "/wiki/", "//div[@id='bodyContent']", "WP", "en", 'Wikipedia', null, SPECIAL, null),
     new Encyclopedia('www.conservapedia.com', "/", "//div[@id='bodyContent']", "CS", "en", 'Conservapedia', "Conservative and Christian", SPECIAL, null),
     new Encyclopedia('www.esowatch.com', "/en/index.php?title=", "//div[@id='bodyContent']", "EW", "en", 'EsoWatch', null, STRAIGHT, null),
     new Encyclopedia('www.esowatch.com', "/ge/index.php?title=", "//div[@id='bodyContent']", "EW", "de", 'EsoWatch', null, STRAIGHT, null),

     // Actually one cannot determine the language by the URL for Wikinfo, so do not uncomment more than one of the following two lines:
     new Encyclopedia('www.wikinfo.org', "/index.php/", "//div[@id='bodyContent']", "WI", "en", 'Wikinfo', "The main article on a subject should present the subject in a positive light or as a concept which makes sense.", STRAIGHT, null),
     // new Encyclopedia('www.wikinfo.org', "/index.php/", "//div[@id='bodyContent']", "WI", "de", 'Wikinfo', "The main article on a subject should present the subject in a positive light or as a concept which makes sense.", STRAIGHT, null),

     new Encyclopedia('athpedia.de', "/wiki/", "//div[@id='bodyContent']", "AT", "de", 'Athpedia', "säkular", STRAIGHT, null),
     new Encyclopedia('www.kathpedia.com', "/index.php?title=", "//div[@id='bodyContent']", "KT", "de", 'Kathpedia', "katholisch", STRAIGHT, null),
     new Encyclopedia('www.encyclopaedia-germanica.org', "/de/index.php/", "//div[@id='bodyContent']", "EG", "de", 'Encyclopædia Germanica', null, STRAIGHT, null),

     // Script is broken too much for this site:
     //     new Encyclopedia('de.mundipedia.com', "/", "//div[@class='textblock']", "MU", "de", 'Mundipedia', null, STRAIGHT, "broken"),
     new Encyclopedia('www.exika.de', "/", "//div[@class='content']", "EX", "de", 'Exika', null, STRAIGHT, "Gibt eine leere Seite zurück, falls das Stichwort nicht gefunden wurde."),

     new Encyclopedia('www.newworldencyclopedia.org', "/entry/", "//div[@id='bodyContent']", "NW", "en", 'New World Encyclopedia', "Unification Church", SPECIAL, "Alternatives will always be opened in a new tab. Links to nonexistent articles can not be distinguished on this site."),
     new Encyclopedia('www.infoplease.com', "/search?q=", "//td[@id='Pg']", "IP", "en", 'infoplease', null, STRAIGHT, "The article for a headword will not be directly shown, but has to be choosen from the search page."),
     new Encyclopedia('www.eoearth.org', "/article/", "//div[@id='content']", "EoE", "en", 'Encyclopedia of Earth', null, STRAIGHT, "The headword for an article might not be reliably reconstructed, if an article has not been found."),
     // does not work, yet:
     new Encyclopedia('www.britannica.com', "/EBchecked/topic/", "//div[@id='bps-content-panel-body']", "EB", "en", 'Encyclopædia Britannica', null, STRAIGHT, "The article for a headword will not be directly shown, but has to be choosen from the search page."),
     new Encyclopedia('knol.google.com', "/k/", "//div[@id='knol-content']", "KN", "en", 'Knol', null, STRAIGHT, "The article for a headword will not be directly shown, but has to be choosen from the search page. On some URLs the headword cannot be extracted."),
     new Encyclopedia('plato.stanford.edu', "/entries/", "//div[@id='content']", "SE", "en", 'Stanford Encyclopedia Of Philosophy', null, STRAIGHT, null),
     new Encyclopedia('en.wikisource.org', "/wiki/1911_Encyclop%C3%A6dia_Britannica/", "//div[@id='bodyContent']", "EB1911", "en", 'Encyclopædia Britannica 1911', null, STRAIGHT, null),
     new Encyclopedia('de.metapedia.org', "/wiki/", "//div[@id='bodyContent']", "MP", "de", 'Metapedia', null, SPECIAL, null),
     new Encyclopedia('eng.anarchopedia.org', "/", "//div[@id='bodyContent']", "AP", "en", 'Anarchopedia', null, SPECIAL, null),
     new Encyclopedia('deu.anarchopedia.org', "/", "//div[@id='bodyContent']", "AP", "de", 'Anarchopedia', null, SPECIAL, null),
     new Encyclopedia('evolutionwiki.org', "/wiki/", "//div[@id='bodyContent']", "EW", "en", 'EvoWiki', null, SPECIAL, null),
     new Encyclopedia('creationwiki.org', "/", "//div[@id='bodyContent']", "CW", "en", 'CreationWiki', null, SPECIAL, null),
     new Encyclopedia('www.powerbase.info', "/index.php?title=", "//div[@id='bodyContent']", "PB", "en", 'PowerBase', null, STRAIGHT, null),
     new Encyclopedia('www.sourcewatch.org', "/index.php?title=", "//div[@id='bodyContent']", "SW", "en", 'SourceWatch', null, STRAIGHT, null),
     new Encyclopedia('www.lobbypedia.de', "/index.php/", "//div[@id='bodyContent']", "LP", "de", 'Lobbypedia', null, STRAIGHT, null),
     new Encyclopedia('rationalwiki.org', "/wiki/", "//div[@id='bodyContent']", "RW", "en", 'RationalWiki', null, SPECIAL, null),
     new Encyclopedia('en.metapedia.org', "/wiki/", "//div[@id='bodyContent']", "MP", "en", 'Metapedia', null, SPECIAL, null),
     new Encyclopedia('www.juraforum.de', "/lexikon/", "//div[@id='spalte-inhalt']", "LN", "de", 'LexisNexis', null, STRAIGHT, null),
     new Encyclopedia('www.juraforum.de', "/wiki/", "//div[@id='spalte-inhalt']", "JF", "de", 'JuraforumWiki', null, STRAIGHT, null),
    ];

var localNamespaces = [ "Wikipedia", "Meyers", "Wikiweise", "Wikiweise", "Bearbeitung", "Bearbeitung_Diskussion", "Meta", "Navigation", "Teilnehmer", "Diskussion", "Talk", "CZ", "Conservapedia", "New_World_Encyclopedia", "Scholarpedia", "Secure", "Lobbypedia"]; // "Bearbeitung" is treated specially

var noIndex = -1;

var hostIndex = noIndex;
var hostIndexRaw = encyclopedias.length;

var lang = /\.de$/.test(realHost) ? "de" : "en"; // A first guess, if we lack other information.
var langInfos = document.evaluate
	    ('//html[@lang]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var langInfo = langInfos.snapshotItem(0);
if (langInfo && (langInfo == 'de' || langInfo == 'en')) {
    lang = langInfo;
}

var newworldencyclopediaIndex = -1;

var storageprefix = "preference";

function getIndexOfXthBest(preference) {
    return GM_getValue(storageprefix + preference, preference);
}

function log(message) {
    // Do not log from Frames:
    if (!insideFrame()) {
	GM_log(message);
    }
}

function checkAndLogPreferences() {
    var currentPreferences = "";
    var checklist = Array(encyclopedias.length);
    var passcheck = true;
    for (var i = 0; i < encyclopedias.length; i++) {
	if (passcheck) {
	    var index = getIndexOfXthBest(i);
	    if (index < encyclopedias.length) {
		currentPreferences += encyclopedias[index].hostname + " ";
		if (checklist[index]) {
		    passcheck = false;
		} else {
		    checklist[index] = true;
		}
	    } else {
		passcheck = false;
	    }
	}
    }
    if (passcheck) {
	//log("Your preferences:" + currentPreferences);
    } else {
	log("Resetting broken preferences.");    
	for (var i = 0; i < encyclopedias.length; i++) {
	    setPreference(i, i);
	}
    }
}

var eoearth_error_url = 'http://www.eoearth.org/';
var isEncyclopediaSite = false;
var secure_wikimedia = "secure.wikimedia.org";
for (var i = 0; i < encyclopedias.length; i++) {
    var k = getIndexOfXthBest(i);
    var the_encyclopedia = encyclopedias[k];
    if (encyclopedias[k].hostname == 'www.newworldencyclopedia.org') {
	newworldencyclopediaIndex = k;
    }
    var transport = "https";
    if (url.substring(0, transport.length) == transport) {
	var secure_wikimedia_url = transport + "://secure.wikimedia.org";
	if (url.substring(0, secure_wikimedia_url.length) == secure_wikimedia_url 
	    && (the_encyclopedia.hostname == 'de.wikipedia.org' ||  the_encyclopedia.hostname == 'en.wikipedia.org')) {
	    var new_encyclopedia = new Encyclopedia(secure_wikimedia, "/wikipedia/" + the_encyclopedia.language + "/wiki/", "//div[@id='bodyContent']", "WP", the_encyclopedia.language, 'Wikipedia', null, SPECIAL, null);
	    the_encyclopedia = new_encyclopedia;
	}
    } else {
	transport = "http";
    }
    var hostTmp = the_encyclopedia.hostname;
    var urlPrefixTmp = transport + "://" + hostTmp + the_encyclopedia.localPath;
    var urlPrefixLengthTmp = urlPrefixTmp.length;
    if ((url.substring(0, urlPrefixLengthTmp) == urlPrefixTmp) 
	|| ((url == eoearth_error_url) && hostTmp == 'www.eoearth.org')) {    

	local = the_encyclopedia.localPath;
	path = the_encyclopedia.xPath;
	urlPrefix = urlPrefixTmp;
	lang = the_encyclopedia.language;
	hostIndex = k;
	hostIndexRaw = i;
	isEncyclopediaSite = true;
	if (realHost == secure_wikimedia) {
	    realHost = encyclopedias[k].hostname;
	}
    }
}

if (/(|.+\.)veropedia\.com/.test(realHost)) {
    host = "www.veropedia.com";
} else {
    host = realHost;
}
var globalhost = host;

function addEscapeSequencesForRegExp(searchString) {
    return searchString.replace(/\?/g, "\\?");
}

function addLinksToAnExternalOne(thisLink) {
    var href = thisLink.getAttribute("href");
    for (var j = 0; j < encyclopedias.length; j++) {
	var hostTmp = encyclopedias[j].hostname;
	var regexp = new RegExp("^http:\/\/" + hostTmp + addEscapeSequencesForRegExp(encyclopedias[j].localPath) + "(.+)$");
	addLinksConditionally(regexp.exec(href), false, thisLink, j, encyclopedias[j].language);
    }
}

var selectionPopupsEnabled = true;

var previousSeltxt = '';
function popupForSelection(event) {
    if (!selectionPopupsEnabled) {
	return;
    }
    //adapted from:
    // 
    // name        QuickiWiki  http://userscripts.org/scripts/show/5858
    // namespace   http://www.ruinsofmorning.net/greasemonkey/
    // description Quickly look up selected text in Wikiqedia, Wiktionary or Wikiquote.
    // version	1.0 - 2006-10-05
    var selectionObject = window.getSelection();
    seltxt = String(selectionObject);
    if (seltxt == '') {
	closePopup();
	previousSeltxt = '';
	return;
    }
    seltxt = seltxt.replace(/(^\s+|\s+$)/g, '');

    // Kill HTML //
    seltxt = seltxt.replace(/\"/g, "'");
    seltxt = seltxt.replace(/>/g, '&gt');
    seltxt = seltxt.replace(/</g, '&lt');

    // Hide on Big Selections //
    if (seltxt.length > 500) {
	return;
    }

    // Truncate on Long Selections //
    if (seltxt.length > 70) {
	seltxt = seltxt.substring(0,70);
    }
    //
    ////////////////////////////////////


    if (previousSeltxt == seltxt) {
	return;
    }
    previousSeltxt = seltxt;

    var myLang = lang;
    var step = selectionObject.anchorNode;
    
    while (step) {
	if (step.lang) {
	    myLang = step.lang;
	    if (myLang.substring(2,3) == "-") {
		myLang = myLang.substring(0,2);
	    }
	    break;
	}
	step = step.parentNode;
    }

    var selectionArray = Array(1 + 1);
    selectionArray[1] = seltxt;
    addLinksConditionally(selectionArray, false, document.createElement('a'), noIndex, myLang);
}

var popupCausedBySelection = false;
var lastMouseUpEvent;
var lastMouseMoveEvent;
function popupForSelectionMouse(event) {
    lastMouseUpEvent = event;
    if (!event.target.id || event.target.id != popupID + "_cause") {
	popupForSelection(event);
    }
}

function handleMouseMove(event) {
    lastMouseMoveEvent = event;
}

function closePopup() {
    var popup = document.getElementById(popupID);
    if (popup) {
	remove(popup);
	invalidateLinkCause(document.getElementById(popupID + "_cause"));
    }
    selectionPopupsEnabled = true;    
}

var DEFAULT_TEXT = 'text';
function popupForSelectionKey(event) {
    var kcode = (event.keyCode) 
	? event.keyCode 
	: event.which;
    var ctrlKeyPressed = event.ctrlKey;
    var altKeyPressed  = event.altKey;
    var k = String.fromCharCode(kcode);
    if (ctrlKeyPressed && altKeyPressed && (k == "e" || k == "E")) {
	var searchbox = document.getElementById('amalgam_searchbox');
	if (!searchbox) {
	    var selectionArray = Array(1 + 1);
	    selectionArray[1] = DEFAULT_TEXT;
	    addLinksConditionally(selectionArray, false, document.createElement('a'), noIndex, lang);
	    searchbox = document.getElementById('amalgam_searchbox');
	}
	var searchParagraph = document.getElementById('amalgam_searchparagraph');
	if (searchParagraph.style) {
	    searchParagraph.removeAttribute("style");
	}
	searchbox.focus();
	searchbox.select();	    
	selectionPopupsEnabled = false;
    } else if (kcode == 27) {
	closePopup();
    } else {
	popupForSelection(event);
    }
}

document.addEventListener('mouseup', popupForSelectionMouse, false);
document.addEventListener("mousemove", handleMouseMove, false);
document.addEventListener("keypress", popupForSelectionKey, false);

urlPrefixLength = urlPrefix.length;

var urlSuffixTmp = url.substring(urlPrefixLength);
var urlSuffixTmpArray = /[^#]*#(.+)/.exec(urlSuffixTmp);

checkAndLogPreferences();

if (!isEncyclopediaSite) {
    var allLinks;
    allLinks = document.evaluate
	('//a[@href]',
	 document,
	 null,
	 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	 null);
    for (var i = 0; i < allLinks.snapshotLength; i++) {
	var thisLink = allLinks.snapshotItem(i);
	addLinksToAnExternalOne(thisLink);
    }
    return;
}

if (urlSuffixTmpArray) {
    urlSuffix = urlSuffixTmpArray[0];
} else {
    urlSuffix = urlSuffixTmp;
}

function isStillASearchURL() {
    var arrayIsStillASearch = /(Special|Spezial):(Search|Suche)\?search=([^&]*).*/.exec(urlSuffix);
    if (arrayIsStillASearch) {
	var isStillASearch = arrayIsStillASearch[3];
	if (isStillASearch) {
	    urlSuffix = isStillASearch;
	    return true;
	}
    }
    return false;
}

function isArticleOnPage() {
    if (isStillASearchURL()) {
	return false;
    }
    if (host == 'www.wikiweise.de') {
	var articlesInside = document.evaluate
		("//div[@class='div-articletext']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var articleInside = articlesInside.snapshotItem(0);
	if (articleInside) {
	    return true;
	} else {
	    return false;
	}
    } else if ((host == 'lexikon.meyers.de') || (host == 'en.citizendium.org' ) || (host == 'www.conservapedia.com') || (host == 'athpedia.de') || (host == 'www.kathpedia.com') || (host == 'www.encyclopaedia-germanica.org') || (host == 'www.sourcewatch.org') || (host == 'www.powerbase.info') || (host == 'www.lobbypedia.de')) {
	var articlesInside = document.evaluate
	    ("//div[@class='noarticletext']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var articleInside = articlesInside.snapshotItem(0);
	if (articleInside) {
	    return false;
	} else {
	    return true;
	}	
    } else if (host == 'www.veropedia.com') {
	var textsInside = document.getElementsByTagName('B');
      	for (var i = 0; i < textsInside.length; i++) {
	    var candidate = textsInside.item(i).firstChild;
	    if (candidate) {
	      if (/^We couldn\'t find the article:/.test(candidate.nodeValue)) {
		  return false;
	      }
	    }
	}
	var articlesInside = document.evaluate
	    ("//span[@class='bodyText']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var bodytext = articlesInside.snapshotItem(0);
	if (bodytext) {
	    return (1 < bodytext.childNodes.length);
	} else {
	    return false;
	}
    } else if (host == 'www.scholarpedia.org') {
	var textsInside = document.getElementsByTagName('P');
      	for (var i = 0; i < textsInside.length; i++) {
	    var candidate = textsInside.item(i).firstChild;
	    if (candidate) {
	      if (/This article does not have authors yet\. It has not been peer-reviewed or accepted for publication\./.test(candidate.nodeValue)) {
		  return false;
	      } else if (/This article is in development and will be visible upon completion of the peer-review process\./.test(candidate.nodeValue)) {
		  return false;
	      }
	    }
	}
	return true;
    } else if (host == 'en.wikisource.org') {
	return !document.getElementById("Wikisource_does_not_have_a_text_with_this_exact_name");
    } else if (host == 'plato.stanford.edu') {
	var textsInside = document.getElementsByTagName('strong');
      	for (var i = 0; i < textsInside.length; i++) {
	    var candidate = textsInside.item(i).firstChild;
	    if (candidate) {
	      if (candidate && /We are sorry that the document you requested cannot be/.test(candidate.nodeValue)) {
		  return false;
	      }
	    }
	}
	return true;
    } else if (host == 'www.juraforum.de') {
	var textsInside = document.getElementsByTagName('H1');
      	for (var i = 0; i < textsInside.length; i++) {
	    var candidate = textsInside.item(i).firstChild;
	    if (candidate) {
	      if (candidate && /Fehler 404/.test(candidate.nodeValue)) {
		  return false;
	      }
	    }
	}
	return !(document.getElementById("post_message_-1"));
    } else if (host == 'encyclopedia2.thefreedictionary.com') {
	var textsInside = document.getElementsByTagName('P');
      	for (var i = 0; i < textsInside.length; i++) {
	    var candidateTmp = textsInside.item(i).firstChild;
	    if (candidateTmp) {
		var candidate = candidateTmp.nodeValue;
		if (/Word not found in the/.test(candidate)) {
		    return false;
		} else if (/Phrase not found in the/.test(candidate)) {
		    return false;
		}
	    }
	}
	textsInside = document.getElementsByTagName('TD');
      	for (var i = 0; i < textsInside.length; i++) {
	    if (/is not available in the encyclopedia/.test(textsInside.item(i).innerHTML)) {
		return false;
	    }
	}
	return true;
    } else  if (host == 'www.esowatch.com' || host == "www.wikinfo.org" || host == "www.lobbypedia.de") {
	var articlesInside = document.evaluate
	    ("//div[@class='noarticletext']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var articleInside = articlesInside.snapshotItem(0);
	if (articleInside) {
	    return false;
	} else {
	    return true;
	}
    } else { // *.wikipedia.org
	var articlesInside = document.evaluate
	    ("//div[@id='no-articletext']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var articleInside = articlesInside.snapshotItem(0);
	if (articleInside) {
	    return false;
	} else {
	    articlesInside = document.evaluate
		("//a[@href='wiki?title=" + urlSuffix + "&action=edit']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	    articleInside = articlesInside.snapshotItem(0);
	    if (articleInside) {
		return false;
	    } else {
		return true;
	    }
	}
    }
}

var articleFound = true;
if (url == eoearth_error_url) {
	var textsInside = document.getElementsByTagName('LI');
	for (var i = 0; i < textsInside.length; i++) {
	    var candidate = textsInside.item(i).firstChild;
	    if (candidate) {
	      if (/^The website id is invalid\./.test(candidate.nodeValue)) {
		  if (!urlSuffix || urlSuffix == "") {
		      urlSuffix = GM_getValue("headword_for_www.eoearth.org", "");
		  }
		  articleFound = false;
		  break;
	      }
	    }
	}
	if (articleFound) {
	    articleFound = isArticleOnPage();
	}
} else {
    articleFound = isArticleOnPage();
}

for (var i=0; i <= 1; i++) {
    var marker = "shortcut icon";
    maker = (i == 0)
	? marker
	: marker.toUpperCase();
  var faviconInfos = document.evaluate
	      ("//link[@rel='" + marker + "']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var faviconInfo = faviconInfos.snapshotItem(0);
  if (faviconInfo) {
      GM_setValue("faviconInfo:" + host, faviconInfo.href);

      /*
      // broken code meant to save the icon:

      GM_xmlhttpRequest({
      	method: "GET",
      	url: faviconInfo.href,
	overrideMimeType: 'text/plain; charset=x-user-defined',
      	onload: function(response) {
		  if(response.status == 200) {
		      GM_setValue("faviconInfo_header:" + host, response.responseHeaders);
		      var encodedImage = response.responseText;
		      var decodedImage = encodedImage.substring(0,-1);
		      for (var i = 0; i < encodedImage.length; i++) {
			  decodedImage = decodedImage + (encodedImage.charCodeAt(i) & 0xff);
		      }
		      GM_setValue("faviconInfo_image:" + host, encodeURIComponent(btoa(decodedImage)));
		  }
	      }

      });
      */

      break;
  }
}

urlSuffix = decodeForHost(urlSuffix, host);
setLinkStateSticky(urlSuffix, !articleFound);

function undoSiteLocal(linkEnd) {
     var localnameCandidateArray = /^(\w*)(:|%3A)(.*)/.exec(linkEnd);
    if (localnameCandidateArray) {
	var localnameCandidate = localnameCandidateArray[1];
	for (var j = 0; j < localNamespaces.length; j++) {
	    if (localnameCandidate == localNamespaces[j]) {
		if (localnameCandidate == "Bearbeitung") {
		    return localnameCandidateArray[3];
		} else {
		    return null; // not possible
		}
	    }
	}
    }
    return linkEnd;
}

// translationAvailable must be an Array or null
function isOK(hostIndexFrom, hostIndexCheck, translationAvailable, lang) {
    if (hostIndexFrom == hostIndexCheck) {
	return false;
    } else {
	if (translationAvailable) {
	    if (translationAvailable[hostIndexCheck]) {
		return true;
	    } else {
		return false;
	    }
	} else {
	    return (lang == encyclopedias[hostIndexCheck].language);
	}
    }
}

function getTextOpenAlternative() {
    if (lang == "de") {
	return "Falls der Artikel fehlt (und Frames deaktiviert sind), beim weiteren Nachschlagen";
    } else {
	return "In case the article is missing (and frames are disabled), open the fallback";
    }
}

function getTextSkipping() {
    if (lang == "de") {
	return "übergangen";
    } else {
	return 'skipping';
    }
}

function getTextNewTab() {
    if (lang == "de") {
	return "autom. in neuem Tab geöffnet (Menüeinstellung)";
    } else {
	return 'auto new Tab (menu setting)';
    }
}

function getTextRedirect() {
    if (lang == "de") {
	return "autom. Weiterleitung (Menüeinstellung)";
    } else {
	return 'auto redirect (menu setting)';
    }
}

function getTextArticleNotFound() {
    if (lang == "de") {
	return "Artikel nicht gefunden";
    } else {
	return "Article not found";
    }
}

function getTextLeaveFrame() {
    if (lang == "de") {
	return "Frame verlassen";
    } else {
	return "leave frame";
    }    
}

function getTextIFramePrefered(isFallback) {
    var result = "";
    if (lang == "de") {
	if (isFallback) {
	    result += "<b>Rückgriff</b> auf die zweitbeste Enzyklopädie.";
	} else {
	    result += "Als besser eingestufte Enzyklopädien werden nun automatisch aufgeschlagen.";
	}
	 result += " Durch Klicken auf enthaltene Verweise öffnen Sie einen neuen Tab. Falls sich die enthaltene Seite selbst aus ihrem Frame befreit, schalten Sie, bitte, JavaScript ab!";
    } else {
	if (isFallback) {
	    result += "<b>Fallback</b> to the second best encyclopedia.";
	} else {
	    result += "Encyclopedias considered better are looked up automatically.";
	}
	result +=  " Clicking on any a link inside will open a new tab. You may want to deactivate JavaScript in order to keep the framed site from escaping.";
    }
    return '<p>' + result + '</p>';
}

function getTranslationKey(sourceLang, urlSuffix, targetLang) {
    return sourceLang + "|" + targetLang + "|" + urlSuffix.toLowerCase();
}

function saveTranslation(sourceLang, urlSuffix, targetLang, translation) {
    if (translation) {
	var key = getTranslationKey(sourceLang, urlSuffix, targetLang);
	GM_setValue(key, translation);
	if (!loadTranslation(targetLang, translation, sourceLang)) {
	    var key2 = getTranslationKey(targetLang, translation, sourceLang);
	    GM_setValue(key2, urlSuffix);
	}
    }
}

function loadTranslation(sourceLang, urlSuffix, targetLang) {
    var key = getTranslationKey(sourceLang, urlSuffix, targetLang);
    return GM_getValue(key, null);
}

function getTranslation(sourceLang, urlSuffix, targetLang) {
    if (sourceLang == targetLang) {
	return urlSuffix;
    } else if (translateLemmas) {
	return loadTranslation(sourceLang, urlSuffix, targetLang);
    } else {
	return null;
    }
}

// Evaluates interwiki links, if available:
function getTranslationForPageLemma(urlSuffix, targetLang) {
    if (lang == targetLang) {
	return urlSuffix;
    } else {
	var interwikiLinks = document.evaluate
	    ("//li[@class='interwiki-" + targetLang + "']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var interwikiLink = interwikiLinks.snapshotItem(0);
	if (interwikiLink) {
	    var a = interwikiLink.firstChild;
	    if (a) {
		if (a.nodeName.toUpperCase() == "A") {
		    href = a.getAttribute("href");
		    if (href) {
			var pos = 0;
			var posSave = 0;
			while (true) {
			    pos = href.indexOf("/", pos);
			    if (pos <= 0) {
				break;
			    } else {
				posSave = pos;
				pos++;
			    }
			}
			var result = href.substring(posSave + 1);
			saveTranslation(lang, urlSuffix, targetLang, result);

			if (host.substring(3) == ".anarchopedia.org") {
			    var targetLang3 = (targetLang == 'de')
				? "deu"
				: "eng";
			    setLinkState(getHostIdx(targetLang3 + ".anarchopedia.org"), urlSuffix, false);
			} else if (host.substring(0, 2) == lang && host.substring(2, 3) == ".") {
			    setLinkState(getHostIdx(targetLang + host.substring(2)), urlSuffix, false);
			}

			if (translateLemmas) {
			    return result;
			} else {
			    return null;
			}
		    }
		}
	    }
	}
	return getTranslation(lang, urlSuffix, targetLang);
    }
}

function getTextPOV() {
    if (lang == "de") {
	return "erklärter Standpunkt"
    } else {
	return "explicit point of view"
    }
}

var LINK_SEPARATOR = ' &ndash;&nbsp;';

function createNode(HTMLString) {
    var tmp = document.createElement('div');
    tmp.innerHTML = HTMLString;
    return tmp.firstChild;
}

function getFlagIcon(lang) {
    if (!lang) {
	alert("language not specified");
    }
    var icon = document.createElement('img');
    if (!flag[lang]) {
	alert("no flag for language:" + lang);
    }
    var iconURL = 'data:png;base64,' + flag[lang];
    icon.setAttribute("src", iconURL);
    icon.setAttribute("alt", '(' + lang + ')');
    icon.style.cursor = "pointer";
    return icon;
}

function appendFlag(parent, lang, hostIndex) {
    if (lang != encyclopedias[hostIndex].language) {
	parent.appendChild(createNode('&nbsp;'));
	parent.appendChild(getFlagIcon(encyclopedias[hostIndex].language));    
    }
}

var firstCallOfgetAlternativeLinksParagraph = true;
function getAlternativeLinksParagraph(urlSuffix, isRepetition, linkNames, linkTargets, urlSuffixTranslation) {
    var idsuffix = isRepetition ? "2" : "";
    var linksElement = document.createElement('div');
    var p = document.createElement('p');
    linksElement.appendChild(p);
    p.setAttribute("style", "font-size: small");
    p.id = 'collection_of_article_links' + ((isRepetition) ? "2" : "");
    p.setAttribute('hostindex', hostIndex);

    p.linkname = linkNames[hostIndex];
    if (!isRepetition && !articleFound && !containsColon(urlSuffix)) {
	var titlesInside = document.evaluate
	    ("//title", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	var titleInside = titlesInside.snapshotItem(0);
	titleInside.firstChild.nodeValue = getTextNotFound() + " " + titleInside.firstChild.nodeValue;
    }

    var isIndexFirstAfterHostIndex = true;
    var isFirstItem = true;    
    var currentpageFirst = false;
    var currentEncyclopediaProcessed = false;
    var numberOfEncyclopediasSinceCurrentOne = 0;
    var numberOfSuppressedEncyclopedias = 0;
    var extraSpanItem;

    var reversePreferences = Array(encyclopedias.length);
    for (var i = 0; i < encyclopedias.length; i++) {
	reversePreferences[i] = -1;
    }    

    var extraItemPreference;
    for (var i = 0; i < encyclopedias.length; i++) {
	var k = getIndexOfXthBest(i);

	function appendLinkMTF(parent) {
	    var arrow_back = document.createElement('a');
	    arrow_back.setAttribute('classb', 'amalgam');
	    arrow_back.name = "MoveToFront";
	    arrow_back.style.cursor = "pointer";
	    arrow_back.id = 'MTF_button' + idsuffix;
	    arrow_back.title = getTextMTFButton();
	    arrow_back.innerHTML = '&laquo;';

	    var lastIndex = k;
	    var savedPreference = i;
	    arrow_back.addEventListener
		('click', 
		 function(event) {		    
		     checkAndLogPreferences();
		     for (var preference = 0; preference < savedPreference; preference++) {
			 var index = reversePreferences[preference];
			 if (index != -1) {
			     setPreference(lastIndex, preference);
			     lastIndex = index;
			 }
		     }
		     setPreference(lastIndex, savedPreference);
		     checkAndLogPreferences();
		     insertHeaderAndFooter();
		 }, 
		 true);
	    parent.appendChild(arrow_back);
	    var arrow_back1 = document.createElement('a');
	    arrow_back1.setAttribute('classb', 'amalgam');
	    arrow_back1.name = "MoveToFront1";
	    arrow_back1.style.cursor = "pointer";
	    arrow_back1.title = getTextMTFButton1();
	    arrow_back1.innerHTML = '&lsaquo;';// '&larr;';
	    arrow_back1.addEventListener
		('click', 
		 function(event) {		    
		     checkAndLogPreferences();
		     for (var preference = savedPreference - 1; 0 <= preference; preference--) {
			 var index = reversePreferences[preference];
			 if (index != -1) {
			     setPreference(lastIndex, preference);
			     lastIndex = index;
			     break;
			 }
		     }
		     setPreference(lastIndex, savedPreference);
		     checkAndLogPreferences();
		     insertHeaderAndFooter();
		 }, 
		 true);
	    parent.appendChild(arrow_back1);
	    parent.appendChild(createNode('&nbsp;'));
	}

	function appendLinkMTB(parent) {
	    parent.appendChild(createNode('&nbsp;'));
	    var arrow_forward = document.createElement('a');
	    arrow_forward.setAttribute('classb', 'amalgam');
	    arrow_forward.name = "MoveToRear";
	    arrow_forward.style.cursor = "pointer";
	    arrow_forward.id = 'MTR_button' + idsuffix;
	    arrow_forward.title = getTextMTRButton();
	    arrow_forward.innerHTML = '&raquo;';

	    var lastIndex = k;
	    var savedPreference = i;
	    arrow_forward.addEventListener
		('click', 
		 function(event) {
		     checkAndLogPreferences();
		     for (var preference = encyclopedias.length - 1; savedPreference < preference; preference--) {
			 var index = reversePreferences[preference];
			 if (index != -1) {
			     setPreference(lastIndex, preference);
			     lastIndex = index;
			 }
		     }
		     setPreference(lastIndex, savedPreference);
		     checkAndLogPreferences();
		     insertHeaderAndFooter();
		 }, 
		 true);

	    var arrow_forward1 = document.createElement('a');
	    arrow_forward1.setAttribute('classb', 'amalgam');
	    arrow_forward1.name = "MoveToRear1";
	    arrow_forward1.style.cursor = "pointer";
	    arrow_forward1.title = getTextMTRButton1();
	    arrow_forward1.innerHTML = '&rsaquo;'; // '&rarr;';
	    arrow_forward1.addEventListener
		('click', 
		 function(event) {
		     checkAndLogPreferences();
		     for (var preference = savedPreference + 1; preference < encyclopedias.length; preference++) {
			 var index = reversePreferences[preference];
			 if (index != -1) {
			     setPreference(lastIndex, preference);
			     lastIndex = index;
			     break;
			 }
		     }
		     setPreference(lastIndex, savedPreference);
		     checkAndLogPreferences();
		     insertHeaderAndFooter();
		 }, 
		 true);

	    parent.appendChild(arrow_forward1);	    
	    parent.appendChild(arrow_forward);	    
	}

	if (k == hostIndex) {
	    reversePreferences[i] = k;
	    if (!isFirstItem) {
		p.appendChild(createNode(LINK_SEPARATOR));
	    }
	    if (isFirstItem) {
		currentpageFirst = true;
	    }
	    appendLinkMTF(p);

	    var encyclopedia_name = document.createElement('b');
	    encyclopedia_name.style.cursor = "pointer";
	    encyclopedia_name.title = getTextToggleReorderingMode();
	    encyclopedia_name.id = 'current_encyclopedia' + idsuffix;
	    encyclopedia_name.appendChild(createNode(toNonbreaking(linkNames[k])));
	    encyclopedia_name.addEventListener('click', toggleAllMoveToBottons, true);

	    p.appendChild(encyclopedia_name);

	    appendLinkMTB(p);

	    isFirstItem = false;
	    currentEncyclopediaProcessed = true;
	} else if (isOK(hostIndex, k, urlSuffixTranslation, lang)) {
	    var suppressOutput = (useSuppression && articleFound && 2 <= numberOfEncyclopediasSinceCurrentOne);
	    if (suppressOutput) {
		numberOfSuppressedEncyclopedias++;
	    }
	    if (!suppressOutput || numberOfSuppressedEncyclopedias == 1) {
		reversePreferences[i] = k;
		var span = document.createElement('span');
		if (!isRepetition && encyclopedias[k].hostname == 'www.eoearth.org') {
		    GM_setValue("headword_for_www.eoearth.org", urlSuffixTranslation[k]);
		}
		if (!isFirstItem) {
		    span.appendChild(createNode(LINK_SEPARATOR));
		}

		var tmpLink = document.createElement('a');
		if (clickOpensNewTab) {
		    tmpLink.setAttribute("target", "_blank");
		}
		tmpLink.href = linkTargets[k];
		tmpLink.setAttribute('classb', 'amalgam');
		tmpLink.setAttribute('hostindex', k);
		tmpLink.innerHTML = toNonbreaking(linkNames[k]);
		if (showAllMoveToBottons) {
		    appendLinkMTF(span);
		}
		span.appendChild(tmpLink);
		appendFlag(span, lang, k);
		if (showAllMoveToBottons) {
		    appendLinkMTB(span);
		}

		if (encyclopedias[k].hostname == 'www.eoearth.org') {
		    var myLinkEnd = urlSuffixTranslation[k];
		    tmpLink.addEventListener('mouseover', function(event) {GM_setValue("headword_for_www.eoearth.org", myLinkEnd);}, true);
		}

		var redinfo = isLinkRed(k, urlSuffixTranslation[k]); //TODO: encode?
		setRed(tmpLink, (!(!redinfo.defined || !redinfo.red)));
		if (!redinfo.defined && !containsColon(urlSuffixTranslation[k])) {
		    var questionmark = document.createElement('span');
		    questionmark.setAttribute("style", "");
		    questionmark.style.fontSize = ".8em";
		    questionmark.style.color = "black";
		    var sub = document.createTextNode("?");
		    questionmark.appendChild(sub);
		    tmpLink.appendChild(questionmark);
		}
		insertRedInfo(tmpLink, linkNames[k], redinfo);
		if ((hostIndexRaw < i) && isIndexFirstAfterHostIndex) {
		    if (!articleFound && !containsColon(urlSuffix)) {
			if (firstCallOfgetAlternativeLinksParagraph && !useFrames) {

			    var processing_info;
			    if (redinfo.defined && redinfo.red && (today_ms - redinfo.timestamp_ms < REPROBE_INTERVAL_MS)) {
				processing_info = getTextSkipping();
			    } else {
				if (openNewTab || (k == newworldencyclopediaIndex)) {
				    processing_info = getTextNewTab();
				    if (!isRepetition) {
					GM_openInTab(linkTargets[k]);
				    }
				} else {
				    processing_info = getTextRedirect();
				    if (!isRepetition) {
					location.href = linkTargets[k];
				    }
				}
				if (k != newworldencyclopediaIndex) isIndexFirstAfterHostIndex = false;
			    }
			    span.appendChild(document.createTextNode('(->' + processing_info + ')'));
			} else {
			    if (k != newworldencyclopediaIndex) isIndexFirstAfterHostIndex = false;
			}
		    } else {
			if (k != newworldencyclopediaIndex) isIndexFirstAfterHostIndex = false;
		    }
		}
		isFirstItem = false;
		if (currentEncyclopediaProcessed) {
		    numberOfEncyclopediasSinceCurrentOne++;
		}
		if (numberOfSuppressedEncyclopedias == 0) {
		    p.appendChild(span);
		} else {
		    extraSpanItem = span;
		    extraItemPreference = i;
		}
	    }
	}
    }
    if (numberOfSuppressedEncyclopedias == 1) {
	// Do not actually suppress, because the suppression note 
	// would take just as much space as the regular link.
	p.appendChild(extraSpanItem);
    } else if (numberOfSuppressedEncyclopedias != 0) {
	reversePreferences[extraItemPreference] = -1;
	p.appendChild(createNode(LINK_SEPARATOR));
	var suppressionLink = document.createElement('a');
	suppressionLink.id = "suppressed_encyclopedias" + idsuffix;
	suppressionLink.setAttribute('classb', 'amalgam');
	suppressionLink.title = getTextExpand();
	suppressionLink.innerHTML = '&lang;' + numberOfSuppressedEncyclopedias + '&nbsp;' +getTextMore() + '&rang;';
	suppressionLink.style.cursor = "pointer";
	suppressionLink.addEventListener('click', unsuppress, true);
	p.appendChild(suppressionLink);
    }

    if (!isRepetition) {
	p.appendChild(createNode(' &mdash; '));
	var settingsLink = document.createElement('a');
	settingsLink.id = 'settings_amalgam';
	settingsLink.setAttribute('classb', 'amalgam');
	settingsLink.name = "settings_amalgam";
	settingsLink.title = getTextTitleForMenu();
	settingsLink.innerHTML = '&diams;';
	settingsLink.style.cursor = "help";
	settingsLink.addEventListener('click', showSettingsAndInfo, true);
	p.appendChild(settingsLink);
    }

    firstCallOfgetAlternativeLinksParagraph = false;

    return linksElement;
}

function encodeURLForHost(urlSuffixTranslation, hostname, language, thisTargetEnd, localpath) {
  var linkTargetEnd = "";
   if (urlSuffixTranslation) {
      var urlSuffixTranslationTmp = encodeForHost(urlSuffixTranslation, hostname);
       if (hostname == 'www.britannica.com') {
	   // e. g. http://www.britannica.com/bps/search?query=mammal
	   return "http://" + hostname + "/bps/search?query=" + urlSuffixTranslationTmp;
       }
      if (thisTargetEnd == STRAIGHT) {
	  linkTargetEnd = decodeURIComponent(urlSuffixTranslationTmp);
      } else if (thisTargetEnd == SPECIAL) { //TODO: use encodeURIComponent?
	  if (language == "de") {
	      linkTargetEnd = 'Spezial:Suche?search=' + urlSuffixTranslationTmp + '&go=Go';
	  } else {
	      linkTargetEnd = 'Special:Search?search=' + urlSuffixTranslationTmp + '&go=Go';
	  }
      } else {
	  log("unknown targetEnd:" + thisTargetEnd);
      }
      return "http://" + hostname + localpath + linkTargetEnd;
  } else {
      return null;
  }
}

function encodeURLForHostIndex(urlSuffixTranslation, index) {
    return encodeURLForHost(urlSuffixTranslation, encyclopedias[index].hostname, encyclopedias[index].language, encyclopedias[index].targetEnd, encyclopedias[index].localPath);
}


function getAlternativeLinks(urlSuffix, isRepetition) {
    var newElement = document.createElement('div');
    var newLink;
    if (insideFrame()) { // avoid recursive embedding of iframes
	newElement.innerHTML = '<a href="' + url + '">' + getTextLeaveFrame() + '</a>';
	newLink = newElement.firstChild;
	newLink.addEventListener('click', leaveFrame, true);
    } else {
	var urlSuffixTranslation = Array(encyclopedias.length);
	// indices correlate:
	var linkNames = Array(encyclopedias.length);
	for (var i = 0; i < encyclopedias.length; i++) {
	    urlSuffixTranslation[i] = getTranslationForPageLemma(urlSuffix, encyclopedias[i].language);
	    linkNames[i] = encyclopedias[i].name;
	}

	var linkTargets = Array(encyclopedias.length);
	for (var i = 0; i < encyclopedias.length; i++) {
	    linkTargets[i] = encodeURLForHostIndex(urlSuffixTranslation[i], i);
	}
	if (isRepetition && host != 'www.wikiweise.de') {
	    newElement.appendChild(document.createElement('hr'));
	}    
	if (encyclopedias[hostIndex].explicitPOV) {
	    var p = document.createElement('p');
	    p.innerHTML = getTextPOV() + ": " + '<i>' + encyclopedias[hostIndex].explicitPOV + '</i>';
	    newElement.appendChild(p);
	}    
	if (!articleFound && !containsColon(urlSuffix)) {
	    var p = document.createElement('p');
	    p.innerHTML = '<b>' + getTextArticleNotFound() + '</b>';
	    newElement.appendChild(p);
	}
	if (encyclopedias[hostIndex].knownBugs) {
	    var p = document.createElement('p');
	    p.innerHTML = getTextLimitedSupport() + " " + encyclopedias[hostIndex].knownBugs;
	    newElement.appendChild(p);
	}

	newElement.appendChild(getAlternativeLinksParagraph(urlSuffix, isRepetition, linkNames, linkTargets, urlSuffixTranslation));
	newElement.appendChild(getIframesConditionally(urlSuffix, isRepetition, linkNames, linkTargets));
    }
    if (!isRepetition && host != 'www.wikiweise.de') {
	var newElement2 = document.createElement('div');
	newElement2.innerHTML = '<hr />';
	newElement.appendChild(newElement2.firstChild);
    }    
    return newElement;
}

function getIframesConditionally(urlSuffix, isRepetition, linkNames, linkTargets) {
    var links = "<p>";
    if (!isRepetition && !containsColon(urlSuffix) && useFrames) {
	// copied from 'getAlternativeLinks(urlSuffix, isRepetition)':
	var urlSuffixTranslation = Array(encyclopedias.length);
	var linkNames = Array(encyclopedias.length);
	for (var i = 0; i < encyclopedias.length; i++) {
	    urlSuffixTranslation[i] = getTranslationForPageLemma(urlSuffix, encyclopedias[i].language);
	    linkNames[i] = encyclopedias[i].name;
	    if (lang != encyclopedias[i].language) {
		linkNames[i] += " (" + encyclopedias[i].language + ")";
	    }
	}

	var isFirst = true;
	var isIframeWritten = false;
	for (var i = 0; i < hostIndexRaw; i++) { // only look up in better (->preferences) encyclopedias
	    var k = getIndexOfXthBest(i);
	    if (isOK(hostIndex, k, urlSuffixTranslation, lang)) {
		if (isFirst) {
		    links += getTextIFramePrefered(false);
		    isFirst = false;
		}
		links += getIFrame(k, linkNames, linkTargets);
		isIframeWritten = true;
	    }
	}
	if (!articleFound && !isIframeWritten) { // Search in second best encyclopedia
	    for (var i = hostIndexRaw + 1; i < encyclopedias.length; i++) { // Find second best encyclopedia
		var k = getIndexOfXthBest(i);
		if (isOK(hostIndex, k, urlSuffixTranslation, lang)) {
		    links += getTextIFramePrefered(true);
		    links += getIFrame(k, linkNames, linkTargets);
		    break;
		}
	    }
	}
    }    
    links += '</p>';
    var resultElement = document.createElement('div');
    resultElement.innerHTML = links;
    return resultElement;
}

function getTextLimitationsLink() {
    if (lang == "de") {
	return "Bekannte Einschränkungen für Websites";
    } else {
	return "Known Limitations for Sites";
    }
}

function getTextLicenseLink() {
    if (lang == "de") {
	return "Weitergabe und Gewährleistung";
    } else {
	return "Copying and warranty";
    }
}

function getTextTitleForMenu() {
    if (lang == "de") {
	return "Userscript Amalgam: Informationen und Einstellungen";
    } else {
	return "Userscript Amalgam: information and settings";
    }
}

function getTextMore() {
    if (lang == "de") {
	return "weitere";
    } else {
	return "more";
    }
}

function getTextExpand() {
    if (lang == "de") {
	return "weitere Enzyklopädien anzeigen";
    } else {
	return "show more encyclopedias";
    }
}

function getTextLimitedSupport() {
    if (lang == "de") {
	return "Einschränkungen für diese Website:";
    } else {
	return "Limitations for this site:";
    }
}

function getKnownBugs() {
    var result = '<dl>';
    for (var i = 0; i < encyclopedias.length; i++) {
	if (encyclopedias[i].knownBugs) {
	    result += '<dt>' + encyclopedias[i].name + '</dt><dd>' + encyclopedias[i].knownBugs + '</dd>';
	}
    }
    result += '</dl>';
    return result;
}

function remove(node) {
    node.parentNode.removeChild(node);
}

function showSettingsAndInfo(event) {
    var settings = document.getElementById('settings_amalgam_content');
    if (settings) {
	remove(settings);
    } else {
	readSettings();

	settings = document.createElement('div');
	settings.appendChild(document.createElement('hr'));
	settings.appendChild(document.createElement('hr'));
	settings.id = 'settings_amalgam_content';
	var title = document.createElement('div');
	title.innerHTML = '<p><b><a href="http://userscripts.org/scripts/show/13348">Amalgam</a></b></p>';
	settings.appendChild(title);
	{
	    licenseInfoBox = document.createElement('div');
	    licenseLink = document.createElement('a');
	    licenseLink.innerHTML = getTextLicenseLink();
	    licenseLink.style.cursor = "help";

	    licenseInfo = document.createElement('div');
	    licenseInfo.id = 'license_info';
	    licenseInfo.setAttribute("style", "");
	    licenseInfo.style.display = 'none';

	    var text = '<p>This program is free software: you can redistribute it and/or modify it under the terms of the <a href="http://www.gnu.org/copyleft/gpl.html">GNU General Public License</a> as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.<br>This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.</p>';
	    licenseInfo.innerHTML = text;
	    licenseInfoBox.appendChild(licenseLink);
	    licenseInfoBox.appendChild(licenseInfo);
	    settings.appendChild(licenseInfoBox);
	    licenseLink.addEventListener('click', 
					 function(event) 
					 {
					     if (licenseInfo.style.display == 'none') {
						 licenseInfo.style.display = '';
					     } else {
						 licenseInfo.style.display = 'none';
					     }
					 }, 
					 false);
	    settings.appendChild(document.createElement('hr'));

	    bugInfoBox = document.createElement('div');
	    var bugLink = document.createElement('a');
	    bugLink.appendChild(document.createTextNode(getTextLimitationsLink()));
	    bugLink.style.cursor = "help";
	    bugInfo = document.createElement('div');
	    bugInfo.id = 'bug_info';
	    bugInfo.setAttribute("style", "");
	    bugInfo.style.display = 'none';
	    bugInfo.innerHTML = getKnownBugs();
	    bugInfoBox.appendChild(bugLink);
	    bugInfoBox.appendChild(bugInfo);
	    settings.appendChild(bugInfoBox);
	    bugLink.addEventListener
		('click', 
		 function(event) {
		     if (bugInfo.style.display == 'none') {
			 bugInfo.style.display = '';
		     } else {
			 bugInfo.style.display = 'none';
		     }
		 }, 
		 false);
	    settings.appendChild(document.createElement('hr'));
	}
	var text2 = '<hr />' + getTextAlternatives() + '<br><input type="radio" name="useFrames" id="useFrames_off" value="false"' + getHTMLButtonChecked(!useFrames) + '> ' + getTextFullSize() + '<br><input type="radio" name="useFrames" id="useFrames_on" value="true"' + getHTMLButtonChecked(useFrames) + '> ' + getTextFrame();


	text2 += '<hr />' + getTextOpenAlternative() + '<br><input type="radio" name="openNewTab" id="openNewTab_off" value="false"' + getHTMLButtonChecked(!openNewTab) + '> ' + getTextReplacing() + '<br><input type="radio" name="openNewTab" id="openNewTab_on" value="true"' + getHTMLButtonChecked(openNewTab) + '> ' + getTextNewTabMenuitem();

	text2 += '<hr />' + getTextHeadwords() + '<br><input type="radio" name="translateLemmas" id="translateLemmas_off" value="false"' + getHTMLButtonChecked(!translateLemmas) + '> ' + getTextNoTranslation() + '<br><input type="radio" name="translateLemmas" id="translateLemmas_on" value="true"' + getHTMLButtonChecked(translateLemmas) + '> ' + getTextTranslation();

	text2 += '<hr />' + getTextPopOpeningMode() + '<br><input type="radio" name="extraClickOnLinks" id="extraClickOnLinks_off" value="false"' + getHTMLButtonChecked(!extraClickOnLinks) + '> ' + getTextPopOpeningModeMouseHover() + '<br><input type="radio" name="extraClickOnLinks" id="extraClickOnLinks_on" value="true"' + getHTMLButtonChecked(extraClickOnLinks) + '> ' + getTextPopOpeningModeClick();

	text2 += '<hr />' + getTextIconLoading() + '<br><input type="radio" name="tolerateTrackingByIcons" id="tolerateTrackingByIcons_off" value="false"' + getHTMLButtonChecked(!tolerateTrackingByIcons) + '> ' + getTextIconLoadingOff() + '<br><input type="radio" name="tolerateTrackingByIcons" id="tolerateTrackingByIcons_on" value="true"' + getHTMLButtonChecked(tolerateTrackingByIcons) + '> ' + getTextIconLoadingOn();
	var settingForm = document.createElement('form');
	settingForm.setAttribute('action', '#');
	settingForm.innerHTML = text2;
	settings.appendChild(settingForm);
	insertAfter(settings, document.getElementById('settings_amalgam'));

	document.getElementById("useFrames_off").addEventListener('click', function(event) {GM_setValue(SETTINGS + "useFrames", false); useFrames=false;}, false);
	document.getElementById("useFrames_on").addEventListener('click', function(event) {alert(getTextunsafeWindowWarning()); GM_setValue(SETTINGS + "useFrames", true); useFrames=true;}, false);

	document.getElementById("openNewTab_off").addEventListener('click', function(event) {GM_setValue(SETTINGS + "openNewTab", false); openNewTab=false;}, false);
	document.getElementById("openNewTab_on").addEventListener('click', function(event) {GM_setValue(SETTINGS + "openNewTab", true); openNewTab=true;}, false);

	document.getElementById("translateLemmas_off").addEventListener('click', function(event) {GM_setValue(SETTINGS + "translateLemmas", false); translateLemmas=false;}, false);
	document.getElementById("translateLemmas_on").addEventListener('click', function(event) {GM_setValue(SETTINGS + "translateLemmas", true); translateLemmas=true;}, false);

	document.getElementById("extraClickOnLinks_off").addEventListener('click', function(event) {GM_setValue(SETTINGS + "extraClickOnLinks", false); extraClickOnLinks=false;}, false);
	document.getElementById("extraClickOnLinks_on").addEventListener('click', function(event) {GM_setValue(SETTINGS + "extraClickOnLinks", true); extraClickOnLinks=true;}, false);

	document.getElementById("tolerateTrackingByIcons_off").addEventListener('click', function(event) {GM_setValue(SETTINGS + "tolerateTrackingByIcons", false); tolerateTrackingByIcons=false;}, false);
	document.getElementById("tolerateTrackingByIcons_on").addEventListener('click', function(event) {GM_setValue(SETTINGS + "tolerateTrackingByIcons", true); tolerateTrackingByIcons=true;}, false);

	settings.appendChild(document.createElement('hr'));
    }
}

var useSuppression = true;
function unsuppress() {
    useSuppression = false;
    insertHeaderAndFooter();
}

function setPreference(index, preference) {
    // log("setPreference: " + encyclopedias[index].hostname + " " + preference);
    GM_setValue(storageprefix + preference, index);
}

function getPreference(index) {
    for (var i = 0; i < encyclopedias.length; i++) {
	if (index == getIndexOfXthBest(i)) {
	    return i;
	}
    }
    log("Error: ReversePreference not found");
}

function getHTMLButtonChecked(isChecked) {
    if (isChecked) {
	return ' checked="checked"';
    } else {
	return '';
    }
}

function getTextAlternatives() {
    if (lang == "de") {
	return "Alternative Enzyklopädien öffnen";
    } else {
	return "Open alternative encyclopedias";
    }
}

function getTextReplacing() {
    if (lang == "de") {
	return "die Suchseite ersetzen";
    } else {
	return "replacing the search page";
    }
}

function getTextNoTranslation() {
    if (lang == "de") {
	return "nicht übersetzen";
    } else {
	return "do not translate";
    }
}

function getTextTranslation() {
    if (lang == "de") {
	return "übersetzen (anhand besuchter Artikel aus Wikipedia, Metapedia und Anarchopedia)";
    } else {
	return "translate (according to visited articles from Wikipedia, Metapedia and Anarchopedia)";
    }
}

function getTextIconLoading() {
    if (lang == "de") {
	return "Favicons der Enzylopädien:";
    } else {
	return "Favicons of the encyclopedias:";
    }
}

function getTextIconLoadingOff() {
    if (lang == "de") {
	return "nicht online laden";
    } else {
	return "do not fetch online";
    }
}

function getTextIconLoadingOn() {
    if (lang == "de") {
	return "ggf. online laden. Dies erlaubt der Website mit dem Icon das Ansehen bestimmter Seiten über die Referer-URL zu verfolgen. Installieren Sie stattdessen lieber das Skript neu, nachdem Sie im Quellcode die Zeilen '// @resource ...' über die Zeile '// ==/UserScript==' kopiert haben. Sollte die Installation fehlschlagen, so entfernen Sie die verantwortliche Zeile '// @resource ...' wieder.";
    } else {
	return "fetch online, if necessary. This reduces your privacy, because the site with the icon could track your referrer URL. You should rather reinstall the skript after copiing the lines '// @resource ...' above the line '// ==/UserScript=='. If installation fails, then you should remove the offending line '// @resource ...'.";
    }
}

function getTextPopOpeningModeMouseHover() {
    if (lang == "de") {
	return "sobald sich die Maus darüber befindet";
    } else {
	return "when the mouse is over the link";
    }
}

function getTextPopOpeningModeClick() {
    if (lang == "de") {
	return "per Klick (Ein weiterer Klick folgt der Verknüpfung.)";
    } else {
	return "on click (Click a second time to follow the link.)";
    }
}

function getTextPopOpeningMode() {
    if (lang == "de") {
	return "Zu einer Verknüpfung das Popup mit alternativen Enzyklopädien öffen";
    } else {
	return "Open popup with alternative encyclopedias for a link";
    }
}

function getTextHeadwords() {
    if (lang == "de") {
	return "Stichworte";
    } else {
	return "headwords";
    }
}

function getTextNewTabMenuitem() {
    if (lang == "de") {
	return "einen neuen Tab öffnen";
    } else {
	return "in a new Tab";
    }
}

function getTextFrame() {
    if (lang == "de") {
	return "in einem Rahmen (IFrame) (Bitte schalten Sie JavaScript ab, damit Websites nicht aus ihrem Rahmen ausbrechen!)";
    } else {
	return "in IFrames (Disable JavaScript, so that sites cannot break out of their IFrames!)";
    }
}

function getTextFullSize() {
    if (lang == "de") {
	return "in voller Größe";
    } else {
	return "full size";
    }
}

function getTextToggleReorderingMode() {
    if (lang == "de") {
	return "Reihenfolgeänderungsmodus ein- und ausschalten";
    } else {
	return "toggle reordering mode";
    }
}

function getTextMTFButton1() {
    if (lang == "de") {
	return "Diese Enzyklopädie gegenüber ihrem linken Nachbarn vorziehen";
    } else {
	return "Prefer this encyclopedia over its left neighbour";
    }
}

function getTextMTFButton() {
    if (lang == "de") {
	return "Diese Enzyklopädie den übrigen Aufgelisteten vorziehen";
    } else {
	return "Prefer this encyclopedia over the others that are listed";
    }
}

function getTextMTRButton1() {
    if (lang == "de") {
	return "Den rechten Nachbarn dieser Enzyklopädie vorziehen";
    } else {
	return "Prefer the right neighbour of this encyclopedia";
    }
}

function getTextMTRButton() {
    if (lang == "de") {
	return "Die übrigen aufgelisteten Enzyklopädien dieser vorziehen";
    } else {
	return "Prefer all other encyclopedias that are listed over this one";
    }
}

function getTextIFramesUnsupported() {
    if (lang == "de") {
	return "Ihr Browser kann leider keine eingebetteten Frames anzeigen: Sie k&ouml;nnen die eingebettete Seite &uuml;ber den folgenden Verweis aufrufen: ";
    } else {
	return "Your Browser does not support IFrames: You can access the embedded page with the following link: "; 
    }
}

function getIFrame(hostIndex, linkNames, linkTargets) {
    var result = "";
    result += '<p><b>' + linkNames[hostIndex] + ':</b> ' + linkTargets[hostIndex] + '</p>';
    result += '<iframe src="' + linkTargets[hostIndex] + '" width="100%" height="200" name="' + linkNames[hostIndex] + '">';
    result += '  <p>' + getTextIFramesUnsupported() + '<a href="' + linkTargets[hostIndex] + '">' + linkNames[hostIndex] + '</a></p>';
    result += '</iframe>';
    return result;
}

function leaveFrame(event) {
    if (useFrames && isEncyclopediaSite) {
	// location.assign( "javascript:window.top.location = window.self.location;void(0)" );
	unsafeWindow.top.location = unsafeWindow.self.location;
	event.stopPropagation();
	event.preventDefault();
    } else {
	GM_log("Unexpected call to 'leaveFrame(event)'.");
    }
}

function insertAfter(newNode, position) {
    position.parentNode.insertBefore(newNode, position.nextSibling);
}

function insertLinks(articletext, nonLocalUrlSuffix) {
    articletext.setAttribute('classb', 'bodyContent');
    for (var i=0; i <= 1; i++) {
	var isRepetition = (1 == i);
	var idsuffix = isRepetition ? "2" : "";
	var newElement = getAlternativeLinks(nonLocalUrlSuffix, isRepetition);
	var newElementId = (isRepetition)
	    ? "amalgam_footer"
	    : "amalgam_header";
	var previousLinkContainer = document.getElementById(newElementId);
	if (previousLinkContainer) {
	    remove(previousLinkContainer);
	}
	newElement.id = newElementId;
	if (i == 0) {
	    articletext.insertBefore(newElement, articletext.firstChild);
	} else {
	    articletext.appendChild(newElement);
	}
	if (!insideFrame()) {
	}
	if (host == 'www.veropedia.com' || host == 'encyclopedia2.thefreedictionary.com') {
	    break; // footer would not be placed properly
	}
    }
}

function refersToImage(thisLink) {
    if ("image" == thisLink.getAttribute("class")) {
	return true;
    } else {
	style = thisLink.getAttribute("style");
	if (style) {
	    if (0 <= style.indexOf("image")) {
		return true;
	    }
	}
	if (thisLink.firstChild) {
	    return ("IMG" == thisLink.firstChild.nodeName.toUpperCase());
	} else {
	    return false;
	}
    }
}

function setRed(thisLink, red) {
    if (red) {
	if (host == "www.wikiweise.de") {
	    thisLink.setAttribute("class", "inexistingArticle");//thisLink.removeAttribute("class");
	} else if (host == "encyclopedia2.thefreedictionary.com") {
	    thisLink.style.color = "#a00000";
	} else { // works for Mediawikis
	    thisLink.setAttribute("class", "new");
	}
    } else {
	if (host == "www.wikiweise.de") {
	    thisLink.setAttribute("class", "existingArticle");
	} else if (host == "encyclopedia2.thefreedictionary.com") {
	    thisLink.style.color = "#000080";
	} else { // works for Mediawikis
	    thisLink.removeAttribute("class");
	}
    }
}

// spaces to underscores, remove reference to section
function decodeWikiweise(linkEnd) {
    return linkEnd.replace(/(%20|\ )/g, "_").replace(/==[0-9]+==$/, "");
}

// spaces to underscores
function decodeVeropedia(linkEnd) {
    return linkEnd.replace(/(%20|\ )/g, "_");
}

// pluses to underscores
function decodeColumbia(linkEnd) {
    return linkEnd.replace(/(\+)/g, "_").toLowerCase();
}

// minuses to underscores
function decodeLexisNexis(linkEnd) {
    return linkEnd.replace(/(\-)/g, "_").toLowerCase();
}

function decodeStanford(linkEnd) {
    return linkEnd.replace(/\/$/, "");
}
// remove number; minuses to underscores
function decodeBritannica(linkEnd) {
    return linkEnd.replace(/[0-9]+\//, "").replace(/(\-)/g, "_");
}

function toNonbreaking(myString) {
    return myString.replace(/\ /g, "&nbsp;");
}

function underscoresTo(linkEnd, replacement) {
    var result = "";
    var pos = 0;
    var oldpos;
    var tail = linkEnd;
    while (pos < linkEnd.length) {
	oldpos = pos;
	pos = linkEnd.indexOf("_", pos);
	if (pos < 0) {
	    break;
	} else {
	    result += linkEnd.substring(oldpos, pos);
	    result += replacement;
	    pos++;
	    tail = linkEnd.substring(pos);
	}
    }
    result += tail;
    return result;
    // has issues with an illegal character:
    //  return linkEnd.replace(new RegExp("\\_", "g"), replacement); // linkEnd.replace(/\_/g, replacement)
}

// underscores to pluses
function encodeColumbia(linkEnd) {
    return underscoresTo(linkEnd, "+");
}

function encodeLexisNexis(linkEnd) {
    return underscoresTo(linkEnd.toLowerCase(), "-");
}

function encodeStanford(linkEnd) {
    return linkEnd.toLowerCase() + "/";
}

// underscores to spaces
function encodeWikiweise(linkEnd) {
    return underscoresTo(linkEnd, "%20");
}

function encodeForHost(linkEnd, hostname) {
    if (hostname == "www.wikiweise.de") {
	return encodeWikiweise(linkEnd);
    } else if (hostname == "encyclopedia2.thefreedictionary.com") {
	return encodeColumbia(linkEnd);
    } else if (hostname == "www.juraforum.de") {
	return encodeLexisNexis(linkEnd);
    } else if (hostname == "plato.stanford.edu") {
	return encodeStanford(linkEnd);
    } else {
	return linkEnd;
    }
}

function decodeForHost(linkEnd, hostname) {
    if (hostname == 'www.wikiweise.de') {
	return decodeWikiweise(linkEnd);
    } else if (hostname == 'www.veropedia.com') {
	return decodeVeropedia(linkEnd);
    } else if (hostname == 'encyclopedia2.thefreedictionary.com') {
	return decodeColumbia(linkEnd);
    } else if (hostname == 'www.juraforum.de') {
	return decodeLexisNexis(linkEnd);
    } else if (hostname == 'www.britannica.com') {
	return decodeBritannica(linkEnd);
    } else if (hostname == 'plato.stanford.edu') {
	return decodeStanford(linkEnd);
    } else if (hostname == 'www.infoplease.com') {
	if (host == hostname) {
	    if (!document.getElementById('SearchList')) {
		var textsInside = document.getElementsByTagName('H1');
		if (textsInside.length != 0) {
		    linkEnd = textsInside.item(0).innerHTML;
		}
	    }
	}
	return linkEnd; 
    } else {
	return linkEnd;
    }
}

function getTextMissing() {
    if (lang == "de") {
	return "fehlt";
    } else {
	return "missing";
    }
}

function getTextunsafeWindowWarning() {
    if (lang == "de") {
	return "Warnung: Diese Option führt zur Verwendung des Greasemonkey-Objekts 'unsafeWindow'. Sie sollen die für Amalgam freigegebenen Websites möglicherweise einschränken! (Falls Sie JavaScript nicht ohnehin ganz abgeschaltet haben.)";
    } else {
	return "Warning: This option will cause the use of the Greasemonkey object 'unsafeWindow'. Consider restricting the sites Amalgam is applied to! (If you did not completely disable JavaScript anyways.)";
    }
}

function getTextAvailable() {
    if (lang == "de") {
	return "vorhanden";
    } else {
	return "available";
    }
}

function getTextDays() {
    if (lang == "de") {
	return "Tage";
    } else {
	return "days";
    }
}

function getTextHours() {
    if (lang == "de") {
	return "Stunden";
    } else {
	return "hours";
    }
}

function getTextUnknown() {
    if (lang == "de") {
	return "unbekannt";
    } else {
	return "unknown";
    }
}

function getTextSpecialPage() {
    if (lang == "de") {
	return "Spezialseite";
    } else {
	return "special page";
    }
}

function insertRedInfo(link, name, redinfo) {
    var state ="";
    if (redinfo.defined) {
	if (redinfo.red) {
	    state += getTextMissing();
	} else {
	    state += getTextAvailable();
	}
	state += " ";
	state += "(";
	var age_ms = (today_ms - redinfo.timestamp_ms);
	var age_days = Math.floor(age_ms / MS_PER_DAY);
	if (0 < age_days) {
	    state += age_days + " " + getTextDays() + " ";
	}
	var age_hours = Math.floor((age_ms - age_days * MS_PER_DAY) / MS_PER_HOUR);
	state += age_hours + " " + getTextHours();
	state += ")";
    } else {
	if (redinfo.isSpecial) {
	    state = getTextSpecialPage();
	} else {
	    state = getTextUnknown();
	}
    }
    link.setAttribute('title', name + ": " + state);
}

function getKey(hostIdx, linkEnd) {
    var host = encyclopedias[hostIdx].hostname;
    if (host == 'www.esowatch.com' || host == 'www.juraforum.de') {
	// The host name 'host' is not sufficient as a key.
	host += encyclopedias[hostIdx].localPath;
    }
    return URL_DB_PREFIX + host + "|" + linkEnd;
}

var stickyHostIdx;
var stickyLinkEnd;

// Do not change this setting again during the remaining Processing
// of the page via setLinkState().
// Call only once!
function setLinkStateSticky(linkEnd, isRed) {
    var myLinkEnd = linkEnd.toLowerCase();
    setLinkStateUnsave(hostIndex, myLinkEnd, isRed);
    stickyHostIdx = hostIndex;
    stickyLinkEnd = myLinkEnd;
}

function containsColon(linkEnd) {
    return /^(\w*)(:|%3A)(.*)/.test(linkEnd);
}

function setLinkStateUnsave(hostIdx, linkEnd, isRed) {
    var myLinkEnd = linkEnd.toLowerCase();
    if (stickyHostIdx && stickyLinkEnd) {
	if ((stickyHostIdx == hostIdx) && (stickyLinkEnd == myLinkEnd)) {
	    return; //ignore
	}
    }
    if (containsColon(myLinkEnd)) {
	return; //ignore
    }
    var key = getKey(hostIdx, myLinkEnd);
    GM_setValue(key, (isRed ? "true" : "false") + "|" + today_ms);
}

function getHostIdx(host) {
    var result;
    for (var i = 0; i < encyclopedias.length; i++) {
	if (encyclopedias[i].hostname == host) {
	    if (!result) {
		result = i;
	    } else { // index is not unique
		return null;
	    }
	}
    }
    return result;
}

function setLinkState(hostIdx, linkEnd, isRed) {
    if (hostIdx == noIndex) {
	return;
    }
    var host = encyclopedias[hostIdx].hostname;
    if (host != globalhost) {
	if (isRed) {
	    log("setLinkState() for lemma " + linkEnd + " on foreign host " + host + ((isRed) ? "blocked" : ""));
	    return; // setting would be insecure
	}
    }
    if (host == 'www.newworldencyclopedia.org') {
	return;  // links to nonexistent articles can not be distinguished on this site.
    }
    setLinkStateUnsave(hostIdx, linkEnd.toLowerCase(), isRed);
}

function isLinkRed(hostIdx, linkEnd) {
    if (hostIdx == noIndex) {
	return {defined: false, isSpecial: false};
    }
    var myLinkEnd = linkEnd.toLowerCase();
    var key = getKey(hostIdx, myLinkEnd)
    var value = GM_getValue(key, null);
    if (value) {
	var valueArray = /(true|false)\|([0-9]+)/.exec(value);
	var isRed = (valueArray[1] == "true");
	return {defined: true, red: isRed, timestamp_ms: parseInt(valueArray[2])};
    } else {
	if (containsColon(linkEnd)) {
	    return {defined: false, isSpecial: true};
	} else {
	    return {defined: false, isSpecial: false};
	}
    }
}

function activateLinkCause(linkCause) {
    linkCause.setAttribute('classb', 'amalgam');
    linkCause.id = popupID + "_cause";
}

function invalidateLinkCause(linkCause) {
    if (linkCause) {
	linkCause.removeAttribute('classb');
	linkCause.removeAttribute('id');			    
    }    
}

function addLinksConditionally(linkEndArray, isRed, thisLink, hostIdx, lang) {
    if (linkEndArray) {
	var linkEnd = linkEndArray[1];
	if (!refersToImage(thisLink)) {
	    var nonLocalLinkEnd;
	    if (hostIdx == noIndex) {
		nonLocalLinkEnd = decodeVeropedia(linkEnd);
	    } else {
		nonLocalLinkEnd = undoSiteLocal(decodeForHost(linkEnd, encyclopedias[hostIdx].hostname));
	    }
	    if (nonLocalLinkEnd) {
		if (nonLocalLinkEnd == '') {
		    alert('ok');
		}
		setLinkState(hostIdx, nonLocalLinkEnd, isRed);

		var hostIdx_local = hostIdx;
		var thisLink_local = thisLink;
		var linkEnd_local = nonLocalLinkEnd;
		var lang_local = lang;
		var addLinks = function(event) {
		    popupCausedBySelection = !(thisLink_local.parentNode);
		    if (!popupCausedBySelection && extraClickOnLinks 
			  && (!thisLink_local.id || thisLink_local.id != popupID + "_cause")) {
			if (event) {
			    event.preventDefault();
			}
		    }
		    var linksAdded = false;
		    var myLinkRed = isLinkRed(hostIdx_local, linkEnd_local);
		    var isRed = popupCausedBySelection 
		      || ((myLinkRed.defined) 
			  ? myLinkRed.red 
			  : true); // link probably contains column

		    var addLink = function(thisLink_local, linkContainer, hostIndex, linkEnd_local, redinfo) {
			var newElement = thisLink_local.cloneNode(false);
			newElement.setAttribute('classb', 'amalgam');
			if (clickOpensNewTab) {
			    newElement.setAttribute("target", "_blank");
			}
			
			var paragraph = document.createElement('p');
			
			var showFavicon = true;
			if (showFavicon) {
			    var targetHost = encyclopedias[hostIndex].hostname;

			    var iconURL;
			    var iconHeader = GM_getValue("faviconInfo_header:" + targetHost, null);
			    /*
			    // The code would use a previously saved icon, if saving them did work ...

			    var iconImage = GM_getValue("faviconInfo_image:" + targetHost, null);
			    if (iconImage) {
				// Content-Type: image/x-icon
				var contentType = "image/x-icon";
				var matches = /^Content-Type: image\/(.*)$/m.exec(iconHeader);
				if (matches) {
				    contentType = "image/" + matches[1];
				}
				iconURL = 'data:' + contentType + ';base64,' + iconImage;
			    }
			    */
			    try {
				iconURL = GM_getResourceURL("favicon_" + targetHost.replace(/(\.)/g, "_"));
			    } catch (err) {
			    }
			    
			    if (!iconURL && tolerateTrackingByIcons) {
				var localIconURL = ((targetHost == "www.wikiweise.de")
						     ? "/stylesheets/ockham//favicon.ico" 
						     : GM_getValue("faviconInfo:" + targetHost, "/favicon.ico"));
				iconURL = (localIconURL.substring(0, 1) == "/")
				    ? ("http://" + targetHost + localIconURL)
				    : localIconURL;
			    }
			    if (!iconURL) {
				iconURL = "data:image/png,%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%0A%00%"+
				    "00%00%0A%08%06%00%00%00%8D2%CF%BD%00%00%00%04gAMA%00%00%AF%C87%05%8"+
				    "A%E9%00%00%00%19tEXtSoftware%00Adobe%20ImageReadyq%C9e%3C%00%00%00%"+
				    "92IDATx%DAb%FC%FF%FF%3F%03%0C%AC_%BF%1E%C1A%03%2C%E8%02%81%81'1%14%"+
				    "AD_o%CE%C0%84M7H%E2%CC%19a%141%B0%C23g%CE%FCGV%24%2B%7B%87AZZ%0FE1%"+
				    "13%CC%5D0%1A%A4%C8%C4%E4-%C3%D3%A7%97%18%1E%3FVAu%A3%89%89%09%94%BB"+
				    "%1F%AC%08d%12H%11%B2%7B%E1%9E%81(6%01*%EA%86%9B%04r%06N_308%02%F1c%"+
				    "A0i%81%8C%18%9EA%06%20%93eeeQ%3C%087%11%E8%11%06%CC%F0D5%11%20%C0%0"+
				    "0%E5Z9%1E%A6%8Fq%17%00%00%00%00IEND%AEB%60%82";
			    }
			    if (iconURL) {
				var icon = document.createElement('img');
				icon.setAttribute("src", iconURL);
				icon.setAttribute("alt", "");
				paragraph.innerHTML = '&nbsp;';
				paragraph.insertBefore(icon, paragraph.firstChild);
			    }
			}

			paragraph.appendChild(newElement);
			appendFlag(paragraph, lang_local, hostIndex);
			linkContainer.appendChild(paragraph);
			var myLinkEnd = encodeForHost(linkEnd_local, encyclopedias[hostIndex].hostname);

			if (encyclopedias[hostIndex].hostname == 'www.eoearth.org') {
			    newElement.addEventListener('mouseover', function(event) {GM_setValue("headword_for_www.eoearth.org", myLinkEnd);}, true);
			}

			newElement.href = encodeURLForHostIndex(myLinkEnd, hostIndex);
			var textNodeContent = "";

			textNodeContent += encyclopedias[hostIndex].name
			if (!redinfo.defined && !containsColon(myLinkEnd)) {
			    textNodeContent += "?";
			}

			var sub = document.createTextNode(textNodeContent);
			newElement.appendChild(sub);
			insertRedInfo(newElement, encyclopedias[hostIndex].name, redinfo);
			setRed(newElement, (redinfo.defined && redinfo.red));
		    }

		    closePopup();
		    //  Adapted from the Greasemonkey script 'WikipediaFootnotePopup':
		    var linkContainer = document.createElement('div');
		    linkContainer.id = popupID;
		    linkContainer.style.position = 'absolute';
		    linkContainer.style.left = ((event && event.pageX) 
						? (event.pageX - 50)
						: 0) 
			+ 'px';
		    linkContainer.style.top = ((event && event.pageY) 
					       ? (event.pageY + 10)
					       : 0)
			+ 'px';
		    linkContainer.style.width = 'auto';
		    linkContainer.style.textAlign = 'left';
		    linkContainer.style.backgroundColor = '#F9F9F9';
		    linkContainer.style.border = '1px solid #636363';
		    linkContainer.style.padding = '10px';
		    linkContainer.style.zIndex = '99';
		    linkContainer.className = 'references-small';
		    //
		    ////

		    var input;
		    var flagIcon;

		    //TODO:
		    // if (popupCausedBySelection) {
		    if (true) {
			var paragraph = document.createElement('p');
			{
			    var searchForm = document.createElement('form');
			    searchForm.addEventListener
			        ('submit',
			         function (event) {
				    event.preventDefault();
				    var span = linkContainer.lastChild;
				    if (span && span.tagName.toLowerCase() == 'span') {
					// The previous paragraphs likely contain links to missing articles:
					var paragraph = span.lastChild;					

					if (paragraph && paragraph.tagName.toLowerCase() == 'p')  {
					    var link = paragraph.firstChild;
					    while (link) {
						if (link && link.tagName && link.tagName.toLowerCase() == 'a') {
						    if (link.target) {
							GM_openInTab(link.href);
						    } else {
							location.href = link.href;
						    }
						    break;
						}
						link = link.nextSibling;
					    }
					}
				    }
				    return false;
			         },
				 false);
			    {
				input = document.createElement('input');
				input.type = 'text';
				input.name = 'searchbox';
				input.id = 'amalgam_searchbox';
				input.accesskey = "e";
				input.value = (popupCausedBySelection)
				    ? linkEnd
				    : underscoresTo(decodeURIComponent(nonLocalLinkEnd), ' ');
				input.size = linkEnd.length;
				searchForm.appendChild(input);
				searchForm.appendChild(createNode('&nbsp;'));
				flagIcon = document.createElement('span');
				flagIcon.appendChild(getFlagIcon(lang_local));
				searchForm.appendChild(flagIcon);
			    }
			    paragraph.appendChild(searchForm);
			}
			if (!popupCausedBySelection) {
			    var style = document.createAttribute("style");
			    style.nodeValue = "display: none;";
			    paragraph.setAttributeNode(style);
			}
			paragraph.id = 'amalgam_searchparagraph';
			linkContainer.appendChild(paragraph);
		    }
		    

		    var appendLinks = function(nonLocalLinkEnd, linkContainer) {
			var linkEndTranslation = Array(encyclopedias.length);
			for (var i = 0; i < encyclopedias.length; i++) {
			    linkEndTranslation[i] = getTranslation(lang_local, nonLocalLinkEnd, encyclopedias[i].language);
			}
			for (var i = 0; i < encyclopedias.length; i++) {
			    var k = getIndexOfXthBest(i);
			    var myLinkEnd = (encyclopedias[k].hostname == "encyclopedia2.thefreedictionary.com")
				? linkEnd_local.toLowerCase()
				: linkEnd_local;
			    if (isOK(hostIdx_local, k, linkEndTranslation, encyclopedias[k].language)
				  || (hostIdx_local == k && popupCausedBySelection)) {
				var theLinkEnd = linkEndTranslation[k];
				var redinfo = isLinkRed(k, theLinkEnd);
				if (useFrames) {
				    if (i > hostIndexRaw) {
					if (isRed && !linksAdded) {
					    addLink(thisLink_local, linkContainer, k, theLinkEnd, redinfo);
					}
					if (k != newworldencyclopediaIndex) {
					    break;
					}
				    } else {
					addLink(thisLink_local, linkContainer, k, theLinkEnd, redinfo);
					linksAdded = true;
				    }
				} else {
				    if (isRed || (i < hostIndexRaw)) {
					addLink(thisLink_local, linkContainer, k, theLinkEnd, redinfo);
					if (!redinfo.defined || !redinfo.red) {
					    if (k != newworldencyclopediaIndex) {
						break; // because of the automatic fallback, one working link is sufficient.
					    }
					}
				    }
				}
			    }
			}
		    }
		    
		    var linkBox = document.createElement('span');
		    linkContainer.appendChild(linkBox);
		    appendLinks(nonLocalLinkEnd, linkBox);

		    var old_cause = document.getElementById(popupID + "_cause");
		    if (old_cause != thisLink_local) {
			selectionPopupsEnabled = true;
			invalidateLinkCause(old_cause);
		    }
		    
		    if (extraClickOnLinks && !linkBox.firstChild) {
			activateLinkCause(thisLink_local);
			linkBox.appendChild(createNode("2&times;"));
		    }

		    if (linkBox.firstChild) {
			activateLinkCause(thisLink_local);
			document.body.appendChild(linkContainer);
			if (input) {
			    var oldInputValue = input.value;
			    
			    var updateLinks = function() {
				remove(linkBox);
				linkBox = document.createElement('span');
				linkContainer.appendChild(linkBox);
				appendLinks(nonLocalLinkEnd, linkBox);
			    }
			    
			    document.addEventListener
				("keyup", 
				 function(event) {
				    if (input.value != oldInputValue) {
					var stepSize = 5;
					if (input.size < input.value.length) {
					    input.size = input.value.length + stepSize;
					}
					oldInputValue = input.value;
					nonLocalLinkEnd = decodeVeropedia(input.value);
					updateLinks();
				    }
				 }, 
				 false);
			    flagIcon.addEventListener
				('click',
				 function(event) {
				    if (lang_local == 'de') {
					lang_local = 'en';
				    } else {
					lang_local = 'de';
				    }
				    remove(flagIcon.firstChild);
				    flagIcon.appendChild(getFlagIcon(lang_local));
				    updateLinks();
				 },
				 true);

			}

			linkContainer.addEventListener
			  ('click',
			   function(event) {
			      if (linkContainer && linkContainer.parentNode) {
				  var tag = event.target.tagName.toLowerCase();
				  if (tag == 'div' || tag == 'p') {
				      closePopup();
				  }
			      }
			   },
                           true);

			linkContainer.addEventListener
			  ('mouseover',
			   function(event) {
			      selectionPopupsEnabled = false;
			   },
                           true);

			linkContainer.addEventListener
			    ('mouseout',
			     function(event) {
				var movedTo = event.relatedTarget;
				while (movedTo) {
				    if (movedTo.id && movedTo.id == popupID) {
					return; // The mouse is still inside the popup
				    }
				    movedTo =  movedTo.parentNode;
				}
				closePopup();
			     },
			     true);
		    }
		}
		if (thisLink_local.parentNode) {
		    var addLinksClick = function(event) {
			if (extraClickOnLinks) {
			    addLinks(event);
			}
		    };
		    var addLinksMouseHover = function(event) {
			if (!extraClickOnLinks) {
			    addLinks(event);
			}
		    };
		    thisLink_local.addEventListener('click', addLinksClick, true);
		    thisLink_local.addEventListener('mouseover', addLinksMouseHover, true);
		} else {
		    addLinks((DEFAULT_TEXT == linkEnd)
			     ? lastMouseMoveEvent
			     : lastMouseUpEvent);
		}
	    }
	}
    }
}

function insertLinksAt(path, nonLocalUrlSuffix) {
    var articleTexts = document.evaluate
	(path, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var articleText = articleTexts.snapshotItem(0);
    if (articleText) {
	insertLinks(articleText, nonLocalUrlSuffix);
    }
    return articleText;
}

var allLinks = document.evaluate
    ('//a[@href]',
     document,
     null,
     XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
     null);

var showAllMoveToBottons = false;

function toggleAllMoveToBottons() {
    showAllMoveToBottons = !showAllMoveToBottons;
    insertHeaderAndFooter();
}

// Add links to other encyclopedias:
function insertHeaderAndFooter() {
  if (path != '') {
      var nonLocalUrlSuffix = undoSiteLocal(urlSuffix);
      if (nonLocalUrlSuffix) {
	  if (!insertLinksAt(path, nonLocalUrlSuffix)) {
	      if (host == 'encyclopedia2.thefreedictionary.com') {
		 if (!insertLinksAt("//div[@id='MainTxt']", nonLocalUrlSuffix)) {
		    insertLinksAt("//td[@id='MainTitle']", nonLocalUrlSuffix);
		 }
	      }
	  }
      }
  }
}

var clickOpensNewTab = !useFrames && !openNewTab;
insertHeaderAndFooter();

var regexp = new RegExp("^" + addEscapeSequencesForRegExp(local) + "(.+)");
for (var i = 0; i < allLinks.snapshotLength; i++) {
    var thisLink = allLinks.snapshotItem(i);
    if (insideFrame()) { // leave the frame by opening links in a new tab
	thisLink.setAttribute("target", "_blank");
    }
    var href = thisLink.getAttribute("href"); // relative path
    addLinksToAnExternalOne(thisLink);
    
    if (host == 'www.conservapedia.com' || host == 'www.esowatch.com' || host == 'eng.anarchopedia.org' || host == 'deu.anarchopedia.org' || host == "creationwiki.org" || host == 'www.powerbase.info' || host == 'www.sourcewatch.org' || host == 'www.lobbypedia.de') {
	var local2 = (local == "/" || host == 'www.lobbypedia.de') // (host == 'www.conservapedia.com')
	    ? "/index.php?title="
	    : local;
	var escaped_local2 = addEscapeSequencesForRegExp(local2);
	var matches_for_edit = new RegExp("^" + escaped_local2 + "([^&]*)&action=edit").exec(href);
	if (!matches_for_edit && (host == 'www.lobbypedia.de')) {
	    matches_for_edit = new RegExp("^" + escaped_local2 + "([^&]*)&action=view&redlink=1").exec(href);
	}
	if (matches_for_edit) {
	    addLinksConditionally(matches_for_edit, true, thisLink, hostIndex, lang);
	} else {
	    addLinksConditionally(regexp.exec(href), false, thisLink, hostIndex, lang);
	}
    } else if (host == 'www.veropedia.com') {
	addLinksConditionally(new RegExp("^\.\." + local + "(.+)").exec(href), false, thisLink, hostIndex, lang);
    } else if (host == 'plato.stanford.edu') {
	addLinksConditionally(new RegExp("^\.\.\/" + "(.+)").exec(href), false, thisLink, hostIndex, lang);
    } else if (host == 'encyclopedia2.thefreedictionary.com') {
	addLinksConditionally(new RegExp("^([^:/]*)$").exec(href), false, thisLink, hostIndex, lang);
    } else {
	{
	    var isRed = ((host == 'www.scholarpedia.org') 
			 && thisLink.getAttribute("class") == 'stub');
	    addLinksConditionally(regexp.exec(href), isRed, thisLink, hostIndex, lang);
	}
	// check for red links:
	if (host == "www.wikiweise.de") {
	    //  e. g. http://www.wikiweise.de/Frontcontroller?command=editArticle&article=Nachschlagewerk
	    addLinksConditionally(/^\/Frontcontroller\?command=editArticle&article=([^&]*)/.exec(href), true, thisLink, hostIndex, lang);
	} else if (host == "en.citizendium.org") { 
	    //  e. g. http://en.citizendium.org/wiki?title=Reference&action=edit
	    addLinksConditionally(/^\/wiki\?title=([^&]*)&action=edit/.exec(href), true, thisLink, hostIndex, lang);
	} else if (host == 'www.scholarpedia.org' || host == 'rationalwiki.org') {
	    // e. g. http://www.scholarpedia.org/wiki/index.php?title=Probability_theory&action=edit
	    addLinksConditionally(/^\/wiki\/index.php\?title=([^&]*)&action=edit/.exec(href), true, thisLink, hostIndex, lang);
	} else if (realHost == secure_wikimedia && lang == 'en') {
	    //  e. g. https://secure.wikimedia.org/wikipedia/en/w/index.php?title=Wikipedia:WikiProject_Fungi/Assessment&action=edit&redlink=1
	    addLinksConditionally(/^\/wikipedia\/en\/w\/index.php\?title=([^&]*)&action=edit/.exec(href), true, thisLink, hostIndex, lang);
	} else if (realHost == secure_wikimedia && lang == 'de') {
	    addLinksConditionally(/^\/wikipedia\/de\/w\/index.php\?title=([^&]*)&action=edit/.exec(href), true, thisLink, hostIndex, lang);
	} else if (realHost == 'de.metapedia.org' || realHost == 'en.metapedia.org') {
	    //  e. g. http://de.metapedia.org/m/index.php?title=Regentschaft&action=edit&redlink=1
	    addLinksConditionally(/^\/m\/index.php\?title=([^&]*)&action=edit/.exec(href), true, thisLink, hostIndex, lang);
	} else {
	    //  e. g. http://de.wikipedia.org/w/index.php?title=Nullarbor-Nationalpark&action=edit
	    addLinksConditionally(/^\/w\/index.php\?title=([^&]*)&action=edit/.exec(href), true, thisLink, hostIndex, lang);
	}	
    }
}

function getTextNotFound() {
    if (lang == "de") {
	return "Nicht gefunden:"
    } else {
	return "Not found:"
    }
}
