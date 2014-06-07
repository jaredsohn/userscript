// ==UserScript==
// @name           Google loves Wolfram
// @namespace      http://www.collectitstoreit.com/
// @description    Have your google search results followed by WolframAlpha data
// @include        http://*google.com*
// @include	  http://*.wolframalpha.com/*
// ==/UserScript==

var ranOnce = false;
if(/wolfram/.test(location.href)){
	document.getElementById('header').style.display = 'none';
	document.getElementById('calculate').style.display = 'none';
	document.getElementById('footer').style.display = 'none';
	}
else {
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
					div.src = 'http://www64.wolframalpha.com/input/?i=' + searchText;
					list.style.cssFloat = 'left';
					div.style.width = '600px';
					div.style.height = '700px';
					div.style.border = '0px';
					div.style.overflowX = 'hidden';
					container.appendChild(div);
					return true;
				}
			}
		}
		return false;
	})
}

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
