// ==UserScript==
// @name          imdbAllTheWebPictureSearch
// @namespace     http://imdb.com/
// @description	  Search for pictures of Actors/Actresses on AllTheWeb based on their IMDB Name field
// @include       http://imdb.com/name/*
// ==/UserScript==



	var sName = document.getElementsByTagName('title')[0].innerHTML;
	var elmName = document.getElementsByTagName('h1')[0];
	var elmNewDiv = document.createElement('div');
	var elmNewLink = document.createElement('a');
	var elmNewImg = document.createElement('img');
	
	elmNewDiv.setAttribute('style','display:inline;padding-left:10px;');
	elmNewLink.setAttribute('href','http://alltheweb.com/search?cat=img&q='+sName);
	elmNewLink.setAttribute('target','_blank');
	elmNewImg.setAttribute('src','http://conceptualbridge.com/imgSearchLink.png');
	elmNewImg.setAttribute('border','0');
	elmNewImg.setAttribute('alt','search AllTheWeb for pictures of '+sName);
	
	elmNewLink.appendChild(elmNewImg);
	elmNewDiv.appendChild(elmNewLink);
	elmName.appendChild(elmNewDiv);