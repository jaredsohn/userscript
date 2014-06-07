// ==UserScript==
// @name           MM Link
// @description	   eRepublik script adds MM link for currency purchase below Marketplace Header
// @author	   Endy
// @namespace      DeNada
// @include        http://www.erepublik.com/en/market/*
// ==/UserScript==

var id = document.getElementById("country_id").value; 

var allLinks = document.getElementsByTagName("h1");
var newElement = '';

for(var i=0; i < allLinks.length; i++) {

    	newElement = document.createElement('a');
newElement.innerHTML = '<a href="http://www.erepublik.com/en/exchange#buy_currencies='+id+';sell_currencies=62;page=1">Purchase Currency</a>';
    	allLinks[i].parentNode.insertBefore(newElement, allLinks[i].nextSibling);
}


