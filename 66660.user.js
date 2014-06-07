// ==UserScript==
// @name           WDK Tags
// @namespace      warez-dk.org
// @description    Viser tags på tråde
// @include        *warez-dk.org/forumdisplay.php*
// @include        *warez-dk.org/subscription.php*
// @include        *warez-dk.org/tags.php*
// @include        *warez-dk.org/search.php*
// ==/UserScript==

//This domain name
var host = window.location.host;

//Find divs with class "threaddetailicons"
var allDivs, thisDiv;
allDivs = document.evaluate(
"//div[@class='threaddetailicons']",
document,
null,
XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
null);
for (var i = 0; i < allDivs.snapshotLength; i++) {
thisDiv = allDivs.snapshotItem(i);

//Do something to all divs "threaddetailicons"
var imgs, thisImg, altText;
imgs = thisDiv.getElementsByTagName('img');
thisImg = imgs[0]; 
if (thisImg && thisImg.src !=  'http://' + host + '/images/misc/subscribed.png')	// Do something to images within the divs
{
	var linkTags, linkTag, thisTag;
	altText = thisImg.alt;			// Get alt text
	var tags = altText.split(",");	// Split to seperate tags
	
	thisTag = tags[0];
	linkTag = document.createElement('a');	// Create link
	linkTag.href = 'http://' + host + '/tags.php?tag=' + thisTag;
	linkTag.innerHTML = thisTag;
	thisDiv.insertBefore(linkTag, thisImg); // Add link
	if(tags.length == 1)
	{
		thisDiv.insertBefore(document.createTextNode(" "), thisImg); // Add space
	}
	
	if(tags.length > 1) // If several tags
	{
		for(var j = 1; j < tags.length; j++)
		{
			thisTag = tags[j];
			thisTag = thisTag.replace(" ", "");		// Remove whitespace. Only removes first space.
			thisDiv.insertBefore(document.createTextNode(", "), thisImg);		// Append a comma after last tag
			linkTag = document.createElement('a');	// Create link
			linkTag.href = 'http://' + host + '/tags.php?tag=' + thisTag;
			linkTag.innerHTML = thisTag;
			thisDiv.insertBefore(linkTag, thisImg); // Append link
			
			if(j == tags.length-1)
			{
				thisDiv.insertBefore(document.createTextNode(" "), thisImg); // Add space
			}
		}	
	}
}
}