// ==UserScript==
// @name           Replace flash video with original link
// @namespace      userscripts.org
// @description    Replaces flash videos with link to original page
// @version        0.2.2
// @date           18.08.2010
// @author         nihil
// @require        http://usocheckup.redirectme.net/83188.js?id=usoCheckup
// @require        http://userscripts.org/scripts/source/82206.user.js
// ==/UserScript==

function findElements(tagName)
{
	var elemsArray = document.getElementsByTagName(tagName);
	console.log('Number of ' + tagName + ' elements: ' + elemsArray.length);
	return elemsArray;
}

function transformEmbed(elements)
{
	var anchor = document.createElement('a');
	
	for(var currentElement, currentSource, currentParentNode, len = elements.length; len; --len )
	{
		currentElement = elements.item(len-1);
		currentSource = currentElement.getAttribute('src');

		anchor.setAttribute('href', currentSource);
		anchor.innerHTML = currentSource;
		
		currentParentNode = currentElement.parentNode;
		
		currentParentNode.insertBefore(anchor, currentElement);
		currentParentNode.removeChild(currentElement);
	}
}

function transformObject(elements)
{
	var anchor = document.createElement('a');
	
	for(var currentElement, currentSource, currentParentNode, len = elements.length; len; --len )
	{
		currentElement = elements.item(len-1);
		
		currentSource = currentElement.getAttribute('src') ? currentElement.getAttribute('src') : currentElement.getAttribute('data') ;

		anchor.setAttribute('href', currentSource);
		anchor.innerHTML = currentSource;
		
		currentParentNode = currentElement.parentNode;
						
		currentParentNode.insertBefore(anchor, currentElement);
		currentParentNode.removeChild(currentElement);
	}
}

function transform()
{	
	//Looking for objects
	var objectElements = findElements('object');
	
	if( objectElements.length )
		transformObject(objectElements);
	
		
	//Looking for embeds
	var embedElements = findElements('embed');
	
	if( embedElements.length )
		transformObject(embedElements);
}

transform();