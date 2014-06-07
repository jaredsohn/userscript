// ==UserScript==
// @name           Sorted English Titles for MAL
// @version        1.8
// @description    Displays sorted (non-romaji) English titles for anime/manga lists on myanimelist.net. This script downloads cached lists from dropbox.com and uses mal-api.com as a supplementary source in the event of cache miss. Use unsorted version of this script if you have a slow computer or poor network connection.
// @license        GPL v2
// @match          http://myanimelist.net/animelist/*
// @match          http://myanimelist.net/mangalist/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @resource       ANIME_CACHE http://dl.dropbox.com/u/112209727/anime_en.txt
// @resource       MANGA_CACHE http://dl.dropbox.com/u/112209727/manga_en.txt
// @grant          GM_xmlhttpRequest
// @grant          GM_getResourceText
// ==/UserScript==

var titles = [];
var responsesPending;
var categorySizes = [];
var categoryBounds = [];
var inquiryPrefix;
var cachedTitles;
var map = [];

if (typeof String.prototype.startsWith != 'function') {
  String.prototype.startsWith = function(s) {
    return this.slice(0, s.length) == s;
  };
}

if (typeof String.prototype.endsWith != 'function') {
  String.prototype.endsWith = function(s) {
    return this.slice(-s.length) == s;
  };
}

if (typeof String.prototype.contains != 'function') {
	String.prototype.contains = function(s) {
		return this.indexOf(s) !== -1;
	};
}

init();

function sendRequest(url, titleIndex) 
{
	GM_xmlhttpRequest({
		method: "GET", 
		url: url, 
		timeout: 5000, 
		onload: function(response) {
			var t = response.responseText.trim();
			if (!t || t.startsWith('<')) 
			{
				//mal-api.com server error
				addToMap('', titleIndex);
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
				addToMap('', titleIndex);
			}
			else
			{
				var english = jsonObj.other_titles.english.join(', ');
				addToMap(english, titleIndex);
			}
		}, 
		//error-prone
		ontimeout: function(response) {
			GM_xmlhttpRequest({
				method: "GET", 
				url: url, 
				timeout: 1000, 
				onload: function(response) {
					var t = response.responseText.trim();
					if (!t || t.startsWith('<')) 
					{
						//mal-api.com server error
						addToMap('', titleIndex);
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
						addToMap('', titleIndex);
					}
					else
					{
						var english = jsonObj.other_titles.english.join(', ');
						addToMap(english, titleIndex);
					}
				}, 
				ontimeout: function(response) {
					addToMap('', titleIndex);		
				}
			});
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
	
	for(var i = 0; i < titles.length; i++)
	{
		var inquiryId = titles[i].getAttribute("href").match(/\/(anime|manga)\/(\d+)/)[2];
		english = cachedTitles[inquiryId];
		if (english)
		{
			addToMap(english, i);
		}
		//cache miss; may undermine performance
		else
		{
			var inquiry = inquiryPrefix + inquiryId;
			sendRequest(inquiry, i);
		}	
	}	
}

function getCategorySizes(titles)
{
	var categorySizes = [];
	sizes = document.getElementsByClassName("category_totals");
	
	for (var i = 0; i < sizes.length; i++)
	{
		categorySizes.push(parseInt(
			sizes[i].parentNode.parentNode.parentNode.previousElementSibling.previousElementSibling.children[0].children[0].children[0].textContent.trim()
		));
	}
	return categorySizes;
}

function toBounds(sizes)
{
	
	var bounds = [0];
	for (var i = 0; i < sizes.length; i++)
	{
		bounds.push(sizes[i] + bounds[i]);
	}
	bounds.pop();
	return bounds;
}

function addToMap(english, index)
{
	if (typeof english == 'undefined' || english =='')
	{
		english = titles[index].textContent.trim();
	}
	else
	{
		english = String(english).trim();
	}

	map[index] = [english, index];

	if (--responsesPending == 0)
	{
		for (var i = 0; i < categorySizes.length; i++)
		{
			var subMap = map.splice(0, categorySizes[i]);
			replacement = sortCategory(subMap);
			refreshPage(replacement, categoryBounds[i]);
		}
	}
}

function stringComparator(a, b)
{
	if (String(a[0]).toLowerCase() < String(b[0]).toLowerCase())
	{
		return -1;
	}
	if (String(a[0]).toLowerCase() > String(b[0]).toLowerCase())
	{
		return 1;
	}
	
	return 0;
}

function numberComparator(a, b)
{
	if (a[1] < b[1]) return -1;
	if (a[1] > b[1]) return 1;
	return 0;
}

function sortCategory(subMap)
{
	var replacement = [];
	
	var path = String(document.location.pathname);
	if (
		!path.contains("&order")
		|| 
		path.endsWith("&order=0")
		|| 
		path.endsWith("&order=1")
	)
	{
		subMap.sort(stringComparator);	
	}
	
	
	for (var i = 0; i < subMap.length; i++)
	{
		tableNode = titles[subMap[i][1]].parentNode.parentNode.parentNode.parentNode.cloneNode(true);
		tableNode.getElementsByClassName("animetitle")[0].innerHTML = '<span>' + subMap[i][0] + '</span>'
		replacement.push(
			[tableNode, titles[subMap[i][1]].parentNode.parentNode.parentNode.parentNode.nextElementSibling.cloneNode(true)]
		);	
	}
	return replacement;
}

function refreshPage(replacement, baseIndex)
{
	var root = titles[baseIndex].parentNode.parentNode.parentNode.parentNode.parentNode;

	var batchSize = 10;
	var i = 0;
	function batchProcess() 
	{
		
		var count = batchSize;
		while (count-- && i < replacement.length) 
		{
 			replacement[i][0].children[0].children[0].children[0].textContent = (i + 1).toString();

			var cells = replacement[i][0].getElementsByTagName('td');
			for (var j = 0; j < cells.length; j++)
			{
				cells[j].setAttribute("class", "td" + ((i % 2) + 1));
			}
			
			var c1 = titles[baseIndex + i].parentNode.parentNode.parentNode.parentNode;
			var c2 = titles[baseIndex + i].parentNode.parentNode.parentNode.parentNode.nextElementSibling;
			root.replaceChild(
				replacement[i][0], c1
			);
 			root.replaceChild(
 				replacement[i][1], c2
 			);
			
			i++;
		}
		if (i < replacement.length) 
		{
			setTimeout(batchProcess, 10);
		}
	}
	
	batchProcess();

}

function init()
{
	titles = document.getElementsByClassName("animetitle");
	responsesPending = titles.length;
	map = new Array(titles.length);
	categorySizes = getCategorySizes(titles);
	categoryBounds = toBounds(categorySizes);

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
}