// ==UserScript==
// @name				SalesForceHebrewFix
// @namespace		
// @description		TableFix
// @author				Idan Damari
// @include				http*://*.salesforce.com*
// ==/UserScript==
var allElements , thisElement;
var itemsfound = new Array;
var allElements = document.getElementsByTagName('*');
for(var i=0;i<allElements.length;i++){
  if(allElements[i].className == ' dataCell  ' ||
	 allElements[i].className == 'pageDescription' ||
	 allElements[i].id == 'Name_ileinner' ||
	 allElements[i].id == 'Product2_ileinner'
	) {
	 itemsfound.push(allElements[i]);		 
  }
}

for (var i = 0; i < itemsfound.length; i++) {
	thisElement = itemsfound[i];		
	thisElement.dir = "ltr";
	thisElement.style.textAlign = "right";
}