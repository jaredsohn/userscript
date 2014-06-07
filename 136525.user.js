// ==UserScript==
// @name        ExtractNumbers
// @namespace   None
// @include     http*://*.google.com/*
// @version     1
// ==/UserScript==

function extract()
{
	var page_content;
	var results;
	results = document.body.innerHTML.match(/\+[0-9]{11}:/gi);
	results = results.join(String.fromCharCode(10));
	results = results.replace(/\+/g, "");
	results = results.replace(/:/g, "");
	alert(results);
}

var divs = document.getElementsByTagName('div');
for(var i = 0; i < divs.length; i++)
{
	if(divs[i].innerHTML == '<a class="gc-appbar-label" href="https://www.google.com/voice">Voice</a>')
	{
		divs[i].innerHTML = '<a class="gc-appbar-label" href="https://www.google.com/voice">Voice</a> [<a href="#" id="func_extract">Extract Numbers</a>]';
	}
}
document.getElementById('func_extract').addEventListener('click', extract, false);