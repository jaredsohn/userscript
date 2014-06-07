// ==UserScript==

// @name           Galaxynews Vote-Button

// @namespace      Galaxynews

// @description    Galaxynews Vote-Button

// @include        http://www*.erepublik.com/*

// ==/UserScript==


var LinkDiv = document.createElement('div');
LinkDiv.id = 'LinkDiv';
LinkDiv.innerHTML += '<a href="http://www.galaxy-news.de/charts/?op=vote&game_id=3090"><img src="http://www.galaxy-news.de/images/vote.gif" style="border:0;" alt="Browsergame-Charts"></a>';
document.getElementById('miniprofile').appendChild(LinkDiv);

