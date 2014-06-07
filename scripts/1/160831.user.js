// ==UserScript==
// @name           Japanese Titles for MAL
// @version        2.8
// @description    Displays Japanese titles along with English ones for anime/manga lists on myanimelist.net. This script downloads cached lists from dropbox.com and uses mal-api.com as a supplementary source in the event of cache miss. If you cannot access dropbox.com or have a slow CPU, consider using the no-cache version of this script. 
// @license        GPL v2
// @match          http://myanimelist.net/animelist/*
// @match          http://myanimelist.net/mangalist/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @resource       ANIME_CACHE http://dl.dropbox.com/u/112209727/anime_ja.txt
// @resource       MANGA_CACHE http://dl.dropbox.com/u/112209727/manga_ja.txt
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
	insertCachedJapanese(GM_getResourceText('ANIME_CACHE'));
}
else if ('mangalist' == document.location.href.split('myanimelist.net/')[1].split('/')[0])
{
	inquiryPrefix = "http://mal-api.com/manga/";
	insertCachedJapanese(GM_getResourceText('MANGA_CACHE'));
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
				insertJapanese('', title);
				return;
			}
			
			var jsonObj = JSON && JSON.parse(response.responseText) || $.parseJSON(response.responseText);
			
			if 
			(
				typeof jsonObj.other_titles == 'undefined' 
				|| 
				typeof jsonObj.other_titles.japanese == 'undefined'
			)
			{
				insertJapanese('', title);
			}
			else
			{
				var japanese = jsonObj.other_titles.japanese.join(', ');
				insertJapanese(japanese, title);
			}
		}
	});
}

function insertCachedJapanese(text)
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
			japanese = cachedTitles[inquiryId];
			if (japanese)
			{
				insertJapanese(japanese, titles[i]);
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

function insertJapanese(japanese, title)
{
	if (typeof japanese == 'undefined' || japanese =='')
	{
		japanese = title.innerHTML;
	}
	else
	{
		japanese = String(japanese).trim();
	}
	title.innerHTML = '<div style="display:inline-block;float:left;text-decoration:inherit;">' + japanese + '</div>' + '<div style="opacity:0.5;filter:alpha(opacity=50);display:inline-block;float:left;clear:left;text-decoration:inherit;"><i>' + title.innerHTML + '</i></div>'; 
	var smallNode = title.parentNode.getElementsByTagName("small")[1];
	if (typeof smallNode != 'undefined')
	{
		smallNode.style['padding-left'] = '4px';
		smallNode.style['padding-right'] = '4px';
		smallNode.style['display'] = 'inline-block';
		smallNode.style['vertical-align'] = 'top';
	}
}
