// ==UserScript==
// @name           Youtube Title Link to Lyrics
// @namespace      http://userscripts.org/
// @include        http*://*.youtube.*/watch*
// ==/UserScript==

var TITLE_ID = 'eow-title';

var IM_FEELING_LUCKY = 'http://www.google.com/search?ie=UTF-8&sourceid=navclient&btnI=I\'m+Feeling+Lucky&q=';
var BROWSE_BY_NAME = 'http://www.google.com/search?ie=UTF-8&sourceid=navclient&gfns=1&q=';

// --------------------------------

// choose lyrics website such as 'az lyrics', 'lyricwiki' or just simply 'lyrics' if there is no website preference
var lyricsWebsite = 'az lyrics';

// choose between Google's "I'm Feeling Lucky" and "Browse by Name" (Firefox default behavior in address bar)
var searchEngine = BROWSE_BY_NAME;

// --------------------------------

var titleElement = document.getElementById(TITLE_ID);
var title = titleElement.title;
var inner = titleElement.innerHTML;

var innerWithoutLinks = removeLinks(inner);		// can't have nested <a> tags

var searchTerms = removeWhitespace(removeUnnecessaries(removeEnclosedTerms(title)));
var searchResultURL = searchEngine + lyricsWebsite + ' ' + searchTerms;

var newInner = '<a style="color: inherit" target="_blank" href="' + searchResultURL + '">' + innerWithoutLinks + '</a>';

document.getElementById(TITLE_ID).innerHTML = newInner;

// --------------------------------

function removeWhitespace(str) {
	// remove leading, trailing and multiple spaces
	return str.replace(/^\s|\s$/gi,"").replace(/\s+/gi," ");
}

function removeUnnecessaries(str) {
	// removes special characters, "ft", "official", "version", "HQ", "HD", "(high) quality", "(with) lyrics", "(music) video"
	return str.replace(/(?!['\s])[\W_]|\b(?:ft|official|version|H[QD]|(?:high\s)?quality|(?:with\s)?lyrics|(?:music\s)?video)\b/gi," ");
}

function removeEnclosedTerms(str) {
	// remove stuff in ()'s, []'s, {}'s and **'s
	return str.replace(/[\(\[\*\{]+[^\)\]\*\}]*[\)\]\*\}]+/gi,"");
}

function removeLinks(str) {
	// remove all <a> tags
	return str.replace(/<\/?a[^>]*>/gi,"");	
}