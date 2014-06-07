// ==UserScript==
// @name           Dave's ESL Cafe - Super Google Search
// @namespace      http://www.dmitryvolokhov.com
// @description    Replaces the shoddy ESL Cafe search function with a wonderful custom Google Search of ESL Cafe
// @include        http://www.eslcafe.com/*
// @include        http://*.eslcafe.*
// ==/UserScript==

document.addEventListener('click', function(event) { 
	if (event.target.textContent.toLowerCase() == "search")
	{
		var searchTerms = prompt("What would you like to search for on Dave's ESL Cafe via Google Search?");
		if (searchTerms == null) {return;}
		window.location.href = "http://www.google.com/cse?cx=006359271486458796786%3A_ooozypbm6u&ie=UTF-8&q=" + searchTerms + "&sa=Search";
		event.stopPropagation(); 
  		event.preventDefault(); 
	}
}, true);