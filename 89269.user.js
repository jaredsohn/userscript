// Certificates Google (Most Secure)
// version 1.0
// Started 10/29/2010
//
//
// ==UserScript==
// @name	Certificates Google (Most Secure)
// @description	Forces google to use secure connection.
// @include     http://www.google.com/*

//Note: .tld extension dosent works if is .tdl/*

// ==/UserScript==

// ###### Start of Wikipedia secure script

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
			newurl=original.replace(keyword

[i]+'.wikimedia.org/','https://secure.wikimedia.org/wikipedia/'+keyword[i]+'/')
			if ((original == keyword[i]+'.wikimedia.org')||(original == keyword

[i]+'.wikimedia.org/'))
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
	var keywords =	

'wikipedia,wiktionary,wikinews,wikibooks,wikiquote,wikisource,wikiversity,commons,species,meta';
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

// ###### End of Wikipedia secure script

if (window.location.protocol == "http:") {
if (window.location.hostname != "wikipedia.org") {
if (window.location.hostname != "fr.wikipedia.org") {
if (window.location.hostname != "en.wikipedia.org") {
if (window.location.hostname != "es.wikipedia.org") {
if (window.location.hostname != "ja.wikipedia.org") {
if (window.location.hostname != "pl.wikipedia.org") {
if (window.location.hostname != "ru.wikipedia.org") {
if (window.location.hostname != "nl.wikipedia.org") {
if (window.location.hostname != "pt.wikipedia.org") {
if (window.location.hostname != "it.wikipedia.org") {
if (window.location.hostname != "de.wikipedia.org") {
(function(){ 
var l=window.location; 
l.replace(l.href.replace(/^http:/, 'https:')); 
})(); 
}}}}}}}}}}}}