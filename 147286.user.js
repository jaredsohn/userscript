// ==UserScript==
// @name		tvcountdown.com Download Search
// @include	http://*tvcountdown.com/*
// @grant		none
// @description	Get multiple search options on tvcountdown.com to your favorite download portal. 
// @version	20122009
// ==/UserScript==

// === SETTINGS ===
// List of preferred search engine settings
// 'addOrReplaceLinkType', 'SearchEngineURL', 'LinkText', 'LinkDescription', 'AdditionalOption'	//you can add several additional search tags like WEB-DL, 1080p, HDTV, DVDRip, etc.

// If the 'LinkText' is called 'episode', it will show the episode code like S03E04
// The 'replace' option will replace the episode-code-text on the site with a link and put it at the first position of the search links order
const searchEngine0 = ['add','http://torrentz.eu/search?f=','DL','torrentLinks']; // torrentz.eu Torrent search
const searchEngine1 = ['add','http://www.mnova.eu/search.php?sort=5&term=','DL','torrentLinks']; // mnova.eu Torrent search
const searchEngine2 = ['replace','https://www.google.com/search?&q=site:http%3A%2F%2Ftehparadox.com+','episode','Download','720p']; // tehparadox.com Google search
const searchEngine3 = ['add','http://www.addic7ed.com/search.php?search=','subs','Subtitles']; // addic7ed.com subtitles search
const searchEngine4 = ['add','https://www.google.com/search?&q=site:http%3A%2F%2Ftehparadox.com+','WEB','Download','720p','WEB-DL']; // tehparadox.com Google 720p+WEB-DL
const searchEngine5 = ['add','https://nzbindex.com/search/?q=','nzb','NZBindex']; // NZBindex.com Usenet search

// logically you should use only one search engine with the 'replace' option in the search order, the second replace will not count
// for multiple search engine entries and their order, change the line below
var searchOrder = [searchEngine4,searchEngine2,searchEngine3];

// === END OF SETTINGS ===


//used HTML classes to scan
var HTML_classes = ['sixteen columns bc_p','sixteen columns bc_f','sixteen columns bc_t'];

function StripTags(strMod){
    if(arguments.length<3) strMod = strMod.replace(/<\/?(?!\!)[^>]*>/gi, '');
    else{
        var IsAllowed = arguments[1];
        var Specified = eval("["+arguments[2]+"]");
        if(IsAllowed){
            var strRegExp = '</?(?!(' + Specified.join('|') + '))\b[^>]*>';
            strMod = strMod.replace(new RegExp(strRegExp, 'gi'), '');
        }else{
            var strRegExp = '</?(' + Specified.join('|') + ')\b[^>]*>';
            strMod = strMod.replace(new RegExp(strRegExp, 'gi'), '');
        }
    }
    return strMod;
}

function createLink(url, text, description, target){
    var link = document.createElement('a');
    link.setAttribute('target', target);
    link.setAttribute('href', url);
    link.appendChild(document.createTextNode(text));
    
    return link;
}

function createDownloadLink(HTML_class, searchEngine){
	var addOrReplace = searchEngine[0];
	var sEngineURL = searchEngine[1];
	var sLinkText = searchEngine[2];
	var sLinkDescription = searchEngine[3];
	
	var sAdditionalOptions = [];
	for (j=4; j<searchEngine.length; j++){ //adding "AdditionalOptions" to an array
		sAdditionalOptions.push('+'+searchEngine[j]);
	}
	
	var HTML_trs = document.getElementsByClassName(HTML_class);
	
	for (i=0; i<HTML_trs.length; i++){
		var HTML_tds = HTML_trs[i].getElementsByTagName('div');
		var name = StripTags((HTML_tds[0].innerHTML.replace(/\([^()]*\)/g, "")).replace(/\b[a-zA-Z]*\'[a-zA-Z]*\b/g, "")); // parantheses // removes words with '
		var episodeCode = HTML_tds[1].innerHTML.slice(0, 6);
		var sLinkTextShow = (sLinkText == 'episode') ? episodeCode : sLinkText;
		var url = sEngineURL+escape(name)+'+'+episodeCode+sAdditionalOptions.join('');
		var link = createLink(url, sLinkTextShow, sLinkDescription, '_blank');
		if (addOrReplace == 'add'){
			HTML_tds[1].appendChild(document.createTextNode(' '));
			HTML_tds[1].appendChild(link);	
		}
			else{
				var newFirstElement = (link);; //element which should be first in E
				HTML_tds[1].replaceChild(newFirstElement, HTML_tds[1].firstChild);
			}
	}
}

//needed to avoid format error of the episode-code
//puts the search engine with the "replace" option to the last position in the search-engine-array
function sortSearchEngines(searchOrder){
	var replace_counter = 0;
	for (i=0; i<searchOrder.length; i++){
		var searchEngine = searchOrder[i];
		var addOrReplace = searchEngine[0];
		if (addOrReplace == 'replace'){
			searchOrder.splice(i, 1); //delete temporary the search engine with the "replace" option from the search-engine-array
			replace_counter = replace_counter+1;
			if (replace_counter == 1){
				var replacerSearchEngine = searchEngine;
			}
		}
	}
	if (replace_counter > 0){
		searchOrder.splice(searchOrder.length,0,replacerSearchEngine); //adds the replacer-search-engine to the last position
	}
	return searchOrder;
}

function setActiveSearchEngines(HTML_classes, searchOrder){
	var searchOrder = sortSearchEngines(searchOrder);
	for (i in searchOrder){
		var searchEngine = searchOrder[i];
		createLinkOfHTML_class(HTML_classes, searchEngine);
	}
}
function createLinkOfHTML_class(HTML_classes,searchEngine){
	for (i in HTML_classes){
		var HTML_class = HTML_classes[i];
		createDownloadLink(HTML_class, searchEngine)
	}
}

setActiveSearchEngines(HTML_classes,searchOrder);