// ==UserScript==
// @name           English Titles for MAL
// @version        1.9
// @description    Displays (non-romaji) English titles for anime/manga lists on myanimelist.net. This script downloads cached lists from dropbox.com and uses mal-api.com as a supplementary source in the event of cache miss. If you cannot access dropbox.com or have a slow CPU, consider using the no-cache version of this script. 
// @license        GPL v2
// @match          http://myanimelist.net/animelist/*
// @match          http://myanimelist.net/mangalist/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @resource       ANIME_CACHE http://dl.dropbox.com/u/112209727/anime_en.txt
// @resource       MANGA_CACHE http://dl.dropbox.com/u/112209727/manga_en.txt
// @grant          GM_xmlhttpRequest
// @grant          GM_getResourceText
// ==/UserScript==

var titles = document.getElementsByClassName("animetitle");
var inquiryPrefix;
var cachedTitles;

if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function(s) {
    return this.slice(0, s.length) == s;
  };
}

if ('animelist' == document.location.href.split('myanimelist.net/')[1].split('/')[0])
{
	inquiryPrefix = "http://mal-api.com/anime/";
	insertCachedEnglish(GM_getResourceText('ANIME_CACHE'));
}
else if ('mangalist' == document.location.href.split('myanimelist.net/')[1].split('/')[0])
{
	inquiryPrefix = "http://mal-api.com/manga/";
	insertCachedEnglish(GM_getResourceText('MANGA_CACHE'));
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

function insertCachedEnglish(text)
{
	if (text && text.trim && !text.trim().startsWith('<html>')) {
		cachedTitles = text.split("\n");
	}
	//dropbox error
	else {
		cachedTitles = [];
	}
	
	var chunk = 10;
	var i = 0;
	function doChunk() 
	{
		var count = chunk;
		while (count-- && i < titles.length) 
		{
			var inquiryId = titles[i].getAttribute("href").match(/\/(anime|manga)\/(\d+)/)[2];
			english = cachedTitles[inquiryId];
			if (english)
			{
				insertEnglish(english, titles[i]);
			}
			//cache miss
			else
			{
				var inquiry = inquiryPrefix + inquiryId;
				sendRequest(inquiry, titles[i]);
			}
			
			i++;
		}
		if (i < titles.length) 
		{
			setTimeout(doChunk, 10);
		}
	}
	
	doChunk();
	
}

function insertEnglish(english, title)
{
	if (typeof english != 'undefined' && english !='')
	{
		title.innerHTML = '<span>' + String(english).split('; ')[0].trim() + '</span>'
	}
}