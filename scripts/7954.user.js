/*	

	Secure Wiki, a GreaseMonkey Script - version 0.1.6
	Copyright 2007-2008 by Banzoo (http://banzoo.blogspot.com)

	This software is licensed under the GPL license version 3
	http://www.gnu.org/copyleft/gpl.html
	
	Based on SSLGoogle script by Nils Meier

*/

// ==UserScript==
// @name          Secure Wiki
// @namespace     securewiki
// @description	  Makes sure Wikipedia uses a secure connection.
// @include       http://*.wikipedia.org*
// @include       http://*.wikisource.org*
// @include       http://*.wiktionary.org*
// @include       http://*.wikinews.org*
// @include       http://*.wikibooks.org*
// @include       http://*.wikiquote.org*
// @include	  http://*.wikiversity.org*
// @include	  http://*.wikimedia.org*
// @include	  https://*.wikimedia.org*

// ==/UserScript==

//Secure a given link
function fixlink(link){
	var special='commons,species,meta'
	var keyword = special.split(',');
	var original = ''; 
	original = original + link;
	original = original.replace(/^http\:\/\/(.+)/, "$1");
	var words = original.split('.');
	var newurl='https://secure.wikimedia.org/'+words[1]+'/'+words[0];
	for (var i=0; i<keyword.length;i++) {
		if (words[0]==(keyword[i])) {
			newurl=original.replace(keyword[i]+'.wikimedia.org/','https://secure.wikimedia.org/wikipedia/'+keyword[i]+'/')
			if ((original == keyword[i]+'.wikimedia.org')||(original == keyword[i]+'.wikimedia.org/'))
				newurl=newurl+'wiki/';
			return newurl;
		}
	}
	words[2] = words[2].replace(/^org(.+)/, "$1");
	if(words[2].length==1) words[2]='/wiki';
	for (var i=2;i<words.length;i++) {
		newurl = newurl + (i==2?'':'.') + words[i];
	}
	return newurl;
}

//Check whether a given link need to be fixed or not
function needtofix(link){
	//the set of wikipedia sister projects that support secure http
	var keywords =	'wikipedia,wiktionary,wikinews,wikibooks,wikiquote,wikisource,wikiversity,commons,species,meta';
	var keyword = keywords.split(',');
	var linkslash =link.split('/');
	var domainlevel = '';


	if (linkslash[0]=='https:')
		return false;
	if (linkslash.length > 1)
		domainlevel = linkslash[2].split('.');
	if (domainlevel[0]=='www')
		return false;
	for(var i=0; i < keyword.length; i++){
		if (keyword[i] == domainlevel[1] || keyword[i] == domainlevel[0])
			return true;
	}
	return false;
}


if (needtofix(location.href))
	location.replace( fixlink(location.href) );

var allLinks, thisLink;
allLinks = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allLinks.snapshotLength; i++) {
 thisLink = allLinks.snapshotItem(i);
 if (needtofix(thisLink.href))
	 thisLink.href = fixlink(thisLink.href);
}

