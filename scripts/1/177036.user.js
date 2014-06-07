// ==UserScript==
// @name           Google yahoo duckduckgo wolframalpha
// @namespace      http://www.collectitstoreit.com/
// @description    Have your google search results followed by yahoo followed by duckduckgo followed by WolframAlpha data
// @include        http://*google.com*
// @include        https://*google.com*
// @include	  http://*.wolframalpha.com/*
// @include	  https://*.wolframalpha.com/*
// @include http://*.duckduckgo.com/*
// @include https://*.duckduckgo.com/*
// @include http://*.yahoo.com/*
// @include https://*.yahoo.com/*
// ==/UserScript==

var ranOnce = false;
if(/wolfram/.test(location.href)){
	document.getElementById('header').style.display = 'none';
	document.getElementById('calculate').style.display = 'none';
	document.getElementById('footer').style.display = 'none';
	}
//else if(1) {
	waitForIt(function () {
		if(/q=[^&]+/.test(location.href)){
			var searchText = location.href.match(/q=[^&]+/)[0];
			searchText = searchText.substr(2).replace('+',' ','g');
			if(document.getElementById('res')) {
				if(document.getElementById('res').getElementsByTagName('OL').length > 0) {
					var list = document.getElementById('res').getElementsByTagName('OL')[0];
					list.style.width = '500px';
					var container = list.parentNode;
					var div = document.createElement('iframe');
					//@div.src = 'http://www64.wolframalpha.com/input/?i=' + searchText;
					
		           // div.src = 'http://www.wolframalpha.com/input/?i=' + searchText;
		           div.src = 'http://search.yahoo.com/search?p=' + searchText;
					list.style.cssFloat = 'left';
					div.style.width = '1200px';
					div.style.height = '1000px';
					div.style.border = '0px';
					//div.style.left = '10px';
					//object.style.margin="10px 5px"
					//div.style.marginLeft = ".25in";
					div.style.margin="10px 0px 0px 0px";
					div.style.overflowX = 'hidden';
					container.appendChild(div);
					return true;
				}
			}
		}
		return false;
	})
//}

waitForIt(function () {
		if(/q=[^&]+/.test(location.href)) {
			var searchText = location.href.match(/q=[^&]+/)[0];
			searchText = searchText.substr(2).replace('+',' ','g');
			if(document.getElementById('res')) {
				if(document.getElementById('res').getElementsByTagName('OL').length > 0) {
					var list = document.getElementById('res').getElementsByTagName('OL')[0];
					list.style.width = '500px';
					var container = list.parentNode;
					var div = document.createElement('iframe');
					//@div.src = 'http://www64.wolframalpha.com/input/?i=' + searchText;
					
		            div.src = 'https://duckduckgo.com/?q=' + searchText;
					list.style.cssFloat = 'left';
					div.style.width = '1200px';
					div.style.height = '1000px';
					div.style.border = '0px';
					div.style.margin="10px 0px 0px 0px";
					
					div.style.overflowX = 'hidden';
					container.appendChild(div);
					return true;
				}
			}
		}
		return false;
	})
//else if(1) {
	waitForIt(function () {
		if(/q=[^&]+/.test(location.href)) {
			var searchText = location.href.match(/q=[^&]+/)[0];
			searchText = searchText.substr(2).replace('+',' ','g');
			if(document.getElementById('res')) {
				if(document.getElementById('res').getElementsByTagName('OL').length > 0) {
					var list = document.getElementById('res').getElementsByTagName('OL')[0];
					list.style.width = '500px';
					var container = list.parentNode;
					var div = document.createElement('iframe');
					//@div.src = 'http://www64.wolframalpha.com/input/?i=' + searchText;
					
		            div.src = 'http://www.wolframalpha.com/input/?i=' + searchText;
					list.style.cssFloat = 'left';
					div.style.width = '1200px';
					div.style.height = '1000px';
					div.style.border = '0px';
					div.style.margin="10px 0px 0px 0px";
					
					div.style.overflowX = 'hidden';
					container.appendChild(div);
					return true;
				}
			}
		}
		return false;
	})
//}

function findOpeningBracket(text, token) {
	var index = text.indexOf(token);
	
	while(index > 0 && text.charAt(index) != '<')
		index--;
	
	return index;
}

function findClosingBracket(text, token) {
	var index = text.indexOf(token);
	
	while(index < text.length && text.charAt(index) != '>')
		index++;
		
	return index;
}


	function waitForIt(now, interval, iteration){
		if(interval == null)
			interval = 100;
			
		var find;
			
		function run() {
			if(now())
				window.clearInterval(find);
				
			if(iteration &&  iteration <= 0)
				window.clearInterval(find);
			else
				iteration--;
		}
			
		find = window.setInterval(run,interval);

		return find;
	}
