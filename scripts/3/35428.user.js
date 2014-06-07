// ==UserScript==
// @name          Google Search Results - Numbered
// @namespace     http://yourtextgoeshere.com/
// @description   Show numbers on google search results
// @include       http://www.google.com/search*
// ==/UserScript==

var addListStyle = {
	addListStyleOL: function() {
		var listItems = document.getElementsByTagName('li');
		for(var i = 0; i < listItems.length; i++) {
			listItems[i].style.marginLeft="25px";
			listItems[i].style.listStyle="decimal";
		}
	},
};

addListStyle.addListStyleOL();


