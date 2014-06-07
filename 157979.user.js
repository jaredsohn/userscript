// ==UserScript==
// @name           Color Code Individual Google Tasks
// @namespace      Tevi
// @description	   Looks for specific key words and changes the background of the cell of a google task to a predefined color
// @include        https://www.google.com/calendar/*
// ==/UserScript==
var keyWords = ["workout", "school"];
var backgroundColors = ['#B30202','#010101'];
document.addEventListener('DOMNodeInserted', function() { 
	var checkBox = document.querySelectorAll('span.tc-icon');
	for (var J = checkBox.length-1;  J >= 0;  --J){
		var str = checkBox[J].parentNode.textContent.toString();
		for (var I = keyWords.length - 1; I>= 0; --I)
			if(str.indexOf(keyWords[I]) >= 0)
            			checkBox[J].parentNode.parentNode.style.background = backgroundColors[I];
	}
}, false);
