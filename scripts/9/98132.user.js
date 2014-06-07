// ==UserScript==
// @name                Party news
// @description	        News from ecoalition parties
// @include				http://www.erepublik.com/*
// @require				https://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js
// ==/UserScript==

// Script created by xivrox for eCoalition parties

$(document).ready(function(){
	var VERSION = '0.5';
	var URL = "http://www.partiaimperialna.pl/vote/main/json";
	var UPDATE_URL = "http://userscripts.org/scripts/show/98132";
	var UPDATE_TEXT = "Update your Party News script!";
	var UPDATE_STR = "Update";
	var VOTE_TEXT = "Vote these articles";
	var VOTE_STR = "Vote";


	GM_xmlhttpRequest({
		method: 'GET',
		url: URL,
		headers: {
			'User-Agent': 'Mozilla/5.0 (compatible) Greasemonkey',
			'Accept': 'application/json'
		},
		onload: function(response) {
			var battleListing = document.getElementById('battle_listing');
			var campaign = battleListing.getElementsByTagName('h4')[0];
			
			var voteTitle = document.createElement('h4');
			voteTitle.innerHTML = VOTE_TEXT;
			battleListing.insertBefore(voteTitle, campaign);
			
			var voteListing = document.createElement('ul');
			voteListing.setAttribute('class', 'allies_battles');
			battleListing.insertBefore(voteListing, campaign);
			
			var output = eval('('+response.responseText+')');
			for(x in output.news) {
				var article = output.news[x];
				
				var item = document.createElement('li');
				item.innerHTML = '<strong>'+article.text+'</strong> <a title="" href="'+article.url+'"><span>'+VOTE_STR+'</span></a>';
				voteListing.appendChild(item);
			}
			
			if(VERSION != output.version) {
				var item = document.createElement('li');
				item.innerHTML = '<strong>'+UPDATE_TEXT+'</strong> <a title="" href="'+UPDATE_URL+'"><span>'+UPDATE_STR+'</span></a>';
				voteListing.appendChild(item);
			}
		}
	});
});
