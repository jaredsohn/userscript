// ==UserScript==
// @name         Sort by Start Date for MAL (No Cache)
// @namespace    http://userscripts.org/users/92143
// @version      1.4
// @description  Displays dated anime titles for user lists on myanimelist.net. his script, unlike its cache-version counterpart, does not use dropbox.com and is hence slower. Yet it is less cpu-intensive and always returns update-to-date results. For (partial) manga support, use the cache-version. May NOT work with other MAL scripts. 
// @match        http://myanimelist.net/animelist/*
// @author       zanetu
// @license      GPL version 2 or any later version; http://www.gnu.org/licenses/gpl-2.0.txt
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require      http://userscripts.org/scripts/source/164164.user.js
// @grant        GM_xmlhttpRequest
// ==/UserScript==

var titles = [];
var responsesPending;
var categorySizes = [];
var categoryBounds = [];
var inquiryPrefix;
var map = [];

init();

fetchStartDate();

function sendRequest(url, titleIndex) 
{
	GM_xmlhttpRequest({
		method: "GET", 
		url: url, 
		timeout: 5000, 
		onload: function(response) {
			var t = response.responseText.trim();
			if (!t || t.startsWith('<html>')) {
				//mal-api.com server error
				addToMap('', titleIndex);
				return;
			}
			
			var jsonObj = JSON && JSON.parse(response.responseText) || $.parseJSON(response.responseText);
			
			if 
			(
				typeof jsonObj.start_date == 'undefined' 
				|| 
				jsonObj.start_date == null 
			)
			{
				addToMap('', titleIndex);
			}
			else
			{
				var startDate = jsonObj.start_date.split(' ')[0];
				addToMap(startDate, titleIndex);
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
					if (!t || t.startsWith('<html>')) {
						//mal-api.com server error
						addToMap('', titleIndex);
						return;
					}
					
					var jsonObj = JSON && JSON.parse(response.responseText) || $.parseJSON(response.responseText);
					if 
					(
						typeof jsonObj.start_date == 'undefined' 
						|| 
						jsonObj.start_date == null 
					)
					{
						addToMap('', titleIndex);
					}
					else
					{
						var startDate = jsonObj.start_date.split(' ')[0];
						addToMap(startDate, titleIndex);
					}
				}, 
				ontimeout: function(response) {
					addToMap('', titleIndex);		
				}
			});
		}
	});
	//when ontimeout won't work
	setTimeout(function() {addToMap('Timed out', titleIndex);}, 3600000);
}

function fetchStartDate()
{
	for(var i = 0; i < titles.length; i++)
	{
		var inquiryId = titles[i].getAttribute("href").match(/\/(anime|manga)\/(\d+)/)[2];
		var inquiry = inquiryPrefix + inquiryId;
		sendRequest(inquiry, i);
	}	
}

function getCategorySizes()
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

function addToMap(startDate, index)
{
	if (typeof startDate == 'undefined' || startDate =='')
	{
		startDate = 'Not available';
	}
	else
	{
		startDate = String(startDate).trim();
		if (startDate.length == 4)
		{
			startDate += "-00-00"
		}
		else if (startDate.length == 7)
		{
			startDate += "-00"
		}
	}

	if (map[index] == null)
	{
		map[index] = [startDate, index];
		if (--responsesPending == 0)
		{
			for (var i = 0; i < categorySizes.length; i++)
			{
				var subMap = map.splice(0, categorySizes[i]);
				replacement = generateCategory(subMap);
				refreshPage(replacement, categoryBounds[i]);
			}
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

function generateCategory(subMap)
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
		var tableNode = titles[subMap[i][1]].parentNode.parentNode.parentNode.parentNode.cloneNode(true);
		tableNode.getElementsByClassName("animetitle")[0].innerHTML = '<span>[' + subMap[i][0] + '] ' + tableNode.getElementsByClassName("animetitle")[0].innerHTML + '</span>'
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
	categorySizes = getCategorySizes();
	categoryBounds = toBounds(categorySizes);

	if ('animelist' == document.location.href.split('myanimelist.net/')[1].split('/')[0])
	{
		inquiryPrefix = "http://mal-api.com/anime/";
	}
	else if ('mangalist' == document.location.href.split('myanimelist.net/')[1].split('/')[0])
	{
		inquiryPrefix = "http://mal-api.com/manga/";
	}
}