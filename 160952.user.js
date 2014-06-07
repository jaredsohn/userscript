// ==UserScript==
// @name           English Titles for MAL (No Cache)
// @version        1.8
// @description    Displays (non-romaji) English titles along with English ones for anime/manga lists on myanimelist.net. This script, unlike its cache-version counterpart, does not download cached lists from dropbox.com. Although slow in fetching English titles, this script is less cpu-intensive than its cache-version counterpart.
// @license        GPL v2
// @match          http://myanimelist.net/animelist/*
// @match          http://myanimelist.net/mangalist/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @grant          GM_xmlhttpRequest
// ==/UserScript==

if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function(s) {
    return this.slice(0, s.length) == s;
  };
}

function insertEnglish(english, title)
{
	if (typeof english != 'undefined' && english !='')
	{
		title.innerHTML = '<span>' + String(english).split('; ')[0].trim() + '</span>'
	}
}    

var titles = document.getElementsByClassName("animetitle");
var inquiryPrefix;
if ('animelist' == document.location.href.split('myanimelist.net/')[1].split('/')[0])
{
	inquiryPrefix = "http://mal-api.com/anime/";
}
else if ('mangalist' == document.location.href.split('myanimelist.net/')[1].split('/')[0])
{
	inquiryPrefix = "http://mal-api.com/manga/";
}

function sendRequest(url, title) 
{
	GM_xmlhttpRequest({
		method: "GET",
		url: url,
		onload: function(response) {
			var t = response.responseText.trim();
			if (!t || t.startsWith('<html>'))
			{
				//mal-api.com server error
				insertEnglish('', title);
				return;
			}
			
			var jsonObj = JSON && JSON.parse(response.responseText) || $.parseJSON(response.responseText);
			if 
			(
				typeof jsonObj.other_titles == 'undefined' 
				|| 
				typeof jsonObj.other_titles.english == 'undefined'
			)
			{
				insertEnglish('', title);
			}
			else
			{
				var english = jsonObj.other_titles.english.join(', ');
				insertEnglish(english, title);
			}
		}
	});
}

for (var i = 0; i < titles.length; i++) {	
	var inquiryId = titles[i].getAttribute("href").match(/\/(anime|manga)\/(\d+)/)[2];
	var inquiry = inquiryPrefix + inquiryId;
	
	sendRequest(inquiry, titles[i]);
}
