// ==UserScript==
// @name			Symbaloo - Recherche DuckDuckGo
// @namespace		Symbaloo - Recherche DuckDuckGo
// @author			35niavlys
// @description		Remplace le moteur de recherche Google par celui de DuckDuckGo
// @include			http://www.symbaloo.com*
// ==/UserScript==

document.addEventListener('load', function()
{
	var gsearchform = document.getElementsByClassName('gsearchform');

	gsearchform[0].setAttribute('action', "http://www.duckduckgo.com/");
	var input = gsearchform[0].getElementsByTagName('input');
	input[4].setAttribute('value', 'Recherche DuckDuckGo');
	input[3].parentNode.removeChild(input[3]);
	input[2].parentNode.removeChild(input[2]);
	input[1].parentNode.removeChild(input[1]);
	
	var image = gsearchform[0].parentNode.getElementsByClassName('glogo');	
	image[0].setAttribute('style', 'background:url("https://duckduckgo.com/assets/logo_words.v101.png"); margin-left: -150px; top: 2px; width: 300px;');
	
},true);