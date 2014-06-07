// ==UserScript==
// @name	 prohardver.hu : articles : recolor
// @namespace	 http://www.prohardver.hu/
// @include	 http://www.prohardver.hu/*
// @include	 http://prohardver.hu/*
// ==/UserScript==
function addGlobalStyle(css)
{
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head)
		return;

	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

window.addEventListener(
	"load", 
	function() 
	{
		var page = document.getElementById("main");
		if (page)
			page.style.backgroundColor = "#EEEBE3";
	},
	false);

addGlobalStyle('li.head { border-top-color: #EEEBE3 ! important;');
