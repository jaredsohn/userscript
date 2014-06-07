// ==UserScript==
// @name           Expand PhotoBucket photos
// @namespace      http://userscripts.org/users/359022
// @description    This script expands small thumbnaillinks to photobucket to directly show the normal sized image
// @include        http://www.n-spoorforum.nl/phpbb3/viewtopic.php?*
// ==/UserScript==

function getElementByClassName(className, searchFrom)
{
		var foundNodes = [];
		if(!searchFrom)
		{
				var elements = document.getElementsByTagName('*');
		}
		else
		{
				var startElement = document.getElementById(searchFrom);
				var elements = startElement.getElementsByTagName('*');
		}
		for(var i = 0; i < elements.length; i++)
		{
				if(elements[i].className == className)
				{
						foundNodes.push(elements[i]);
				}
		}
		return foundNodes;
};

photobucketLinks = getElementByClassName('postlink', 'pagecontent');
for(var i = 0; i < photobucketLinks.length; i++)
{
		if(photobucketLinks[i].href.indexOf('photobucket.com') != -1 && photobucketLinks[i].href.indexOf('.jpg') != -1)
		{
				// found a link to photobucket, get the large image.
				img = photobucketLinks[i].childNodes[0];
				img.src = img.src.replace('th_', '');
		}
}