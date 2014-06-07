// ==UserScript==
// @name           Japanese Titles for MAL (No Cache)
// @version        2.7
// @description    Displays Japanese titles along with English ones for anime/manga lists on myanimelist.net. This script, unlike its cache-version counterpart, does not download cached lists from dropbox.com. Although slow in fetching Japanese titles, this script is less cpu-intensive than its cache-version counterpart.
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

for (var i = 0; i < titles.length; i++) {	
	var inquiryId = titles[i].getAttribute("href").match(/\/(anime|manga)\/(\d+)/)[2];
	var inquiry = inquiryPrefix + inquiryId;
	
	sendRequest(inquiry, titles[i]);
}
