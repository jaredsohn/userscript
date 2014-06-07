// ==UserScript==
// @author      Hazirah Hamdani
// @name        WIKIM2E
// @namespace   http://wikim2e.appspot.com
// @description Cross Language Link Discovery From Malay Newspaper to English Wikipedia
// @include     http://www.bharian.com.my/*
// @include     http://www.mediapermata.com.bn/*
// @include     http://mediapermata.com.bn/*
// @include     http://bharian.com.my/*
// @exclude     http://www.bharian.com.my/
// @exclude     http://www.mediapermata.com.bn/
// @exclude     http://mediapermata.com.bn/
// @exclude     http://bharian.com.my/
// @version     1.0
// @date        24 October 2012
// @resource 	myResource http://www.zee-note.net/WIKIM2E/lang_links_M2E_indexed.txt
// @require	http://www.zee-note.net/WIKIM2E/WIKIM2E_ANCHOR.js 
// @require 	http://www.zee-note.net/WIKIM2E/jshashtable-2.1/jshashtable.js
// ==/UserScript==



// Import Malay Language Links and map them

var wordList = new Hashtable();
var newCon = new Array();
var MalaySource = GM_getResourceText("myResource");

// split data by next line
var MalayList = MalaySource.split(/\r\n|\r|\n/);
var MalayWord = new Array();
for (var i = 0; i < MalayList.length; i++) {

	// split line by ":"
	var tmp = MalayList[i].split(/\r\n|\r|\:/);
	MalayWord[i] = tmp[0];

	wordList.put(tmp[0], tmp[1]);

}

// For Mediapermata webpage
var currentHost = document.location.hostname;
if ((currentHost == 'www.mediapermata.com.bn') || (currentHost == 'mediapermata.com.bn')) {
	var article = document.getElementsByTagName('p');
	for ( var i = 0; i < article.length; i++)
	{
		var paragraph = article[i].textContent;
		if (paragraph.indexOf('gostats.com') == -1) {
			if (paragraph == "") {
				continue;
			}
			var newArticle = anchorNews(paragraph);
			if (i == 1) {
				article[i].innerHTML = "<b>" + newArticle + "</b>";
			} else {
				article[i].innerHTML = newArticle;
			}
		}
	}
}

if ((currentHost == 'www.bharian.com.my') || (currentHost == 'bharian.com.my')) {
	var article = document.getElementsByClassName('article-body');

	var newArticleArray = new Array();
	
		var lineArticle = article[0].innerHTML;
		var paragraphArticle = lineArticle.split(/\r\n|\r|\n/);
		for ( var i = 0; i < paragraphArticle.length; i++) {
			var paragraph = paragraphArticle[i];
			var newArticle = anchorNews(paragraph);
			newArticleArray.push(newArticle);
		}
		
	var anchoredArticle = newArticleArray.join(" ");	
	
	//console.log(anchoredArticle);
	article[0].innerHTML = anchoredArticle;
}