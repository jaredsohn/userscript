// ==UserScript==
// @name           dA: Random Emo Title Generator
// @namespace      http://solitude12.deviantart.com
// @description    Allows you to generate a random emo title for your deviation.
// @include        http://www.deviantart.com/submit/*
// ==/UserScript==

var button = document.createElement('input');
button.setAttribute("type", "button");
button.setAttribute("class", "button");
button.setAttribute("value", "Random Emo Title");
button.setAttribute("style", "margin-left:10px;");
document.getElementById('devtitle').parentNode.insertBefore(button, document.getElementById('devtitle').nextSibling);
GM_xmlhttpRequest(
{
	method: 'GET',
	url: 'http://www.deviantart.com/download/108693304/',
	onload: function(details){
		var src = details.responseText; // get data
		
		eval("var emotitles=["+src+"];");
		button.addEventListener("click", function(e){
						
			document.getElementById('devtitle').value=emotitles[Math.floor(Math.random()*emotitles.length)];
												  
		}, false);

	}
});
	