// ==UserScript==
// @name           	metadatafix
// @namespace      	com.appareo
// @author         	dschwartz
// @description    	add links from metadata that are useful
// @version        	0.0.2
// @date           	2012-04-20
// @include			https://devtest.*
// ==/UserScript==


var divs = document.getElementsByTagName('div');
var spans = divs[0].getElementsByTagName('span');

for (var index = 0; index < spans.length; index++) 
{
	var operationLink = document.createElement('a');
	var newURL = document.URL.replace("metadata", spans[index].innerHTML);
	operationLink.setAttribute('href', newURL);
	operationLink.innerHTML = spans[index].innerHTML;

	spans[index].innerHTML = "";
	spans[index].appendChild(operationLink);
}