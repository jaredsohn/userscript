// ==UserScript==
// @name			Curse Addon Pages
// @namespace		http://userscripts.org/users/412619
// @description		Hides a lot of useless elements in addon pages on the new 2011 Curse.com, and rearranges some things to make more sense and save space.
// @include			http://www.curse.com/addons/*/*
// @include			http://www.curse.com/mods/*/*
// @exclude			http://www.curse.com/addons/*/category/*
// ==/UserScript==



// ----------------- FUNCTIONS ----------------- //

// Removes all occurences of elements whose XPath is provided from the document.
// Returns the last element that was removed
//
// Example: Remove all tables which use the CSS class 'toto':
// removeElement("//table[@class='toto']");
function removeElement(ElementXpath)
{
	var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (i=0; i<alltags.snapshotLength; i++)
	{
		element = alltags.snapshotItem(i);
		var removedElement = element.parentNode.removeChild(element); // Remove this element from its parent.
	}
	return removedElement
}

// Appends an element to the XPath provided
function addElement(elementToAdd, ElementXpath)
{
	var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	if (alltags.snapshotLength>0)
	{
		alltags.snapshotItem(0).appendChild(elementToAdd);
	}
}

// Set an attribute from all occurences of elements to a specified value.
// The previous value of this attribute is discarded.
// (All occurences of this elements are processed.)
//
// Example: Set with to 80 columns on all texteareas:
// setAttributeOfElement('cols',80,"//textarea")
function setAttributeOfElement(attributeName,attributeValue,ElementXpath)
{
	var alltags = document.evaluate(ElementXpath,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (i=0; i<alltags.snapshotLength; i++)
	alltags.snapshotItem(i).setAttribute(attributeName, attributeValue)
}

// Inject your own CSS in the page.
//
// Example: Do not underline link:
// injectCSS("a{text-decoration: none;}")
function injectCSS(cssdata)
{
	head = document.getElementsByTagName("head")[0];
	style = document.createElement("style");
	style.setAttribute("type", 'text/css');
	style.innerHTML = cssdata;
	head.appendChild(style);
}



// ----------------- MODIFICATIONS ----------------- //


// make the primary content take up the full width
injectCSS ( "div#primary-content\
{\
	width:100%;\
}") ;

//center the main screenshot in the screenshot tab (this seems extremely buggy considering i had to hardcode a width). I dont know enough CSS to know how to do this properly.
injectCSS ( "div#screenshot-gallery div.gallery-viewer\
{\
	width:938px;\
}")

// make the description a little bigger
injectCSS ( ".height-limit\
{\
	max-height:500px;\
	overflow:auto;\
}")

// remove the fade out at the bottom of the description frame
injectCSS ( ".height-limit:before\
{\
	visibility:hidden;\
}")

// tighten up the comments
//injectCSS ( ".forum-post-body-container\
//{\
//	margin:0 0 0 0px;\
//	padding:0 0 0 0px;\
//	min-height:30px;\
//}")

// darken the border line between comments
injectCSS ( "div.user-comments ul#comments>li\
{\
	border-top:1px solid #9E9E9E;\
}")





//var donationInfo = removeElement( "//div [@class='meta-info']" ) // remove the donation info
//if (donationInfo) addElement(donationInfo, "//div [@class='download-options']") // add it back in underneath the download links


removeElement( "//div [@id='secondary-content']" ) // get rid of the entire right side
removeElement( "//div [@class='project-pack']" ) //get rid of the addon pack list
removeElement( "//em [@class='cta-button secondary project-description-expand']" ) // get rid of the button and overlay that expand the description

//removeElement( "//li [@class='game']" ) // get rid of the link to World of Warcraft at the top of the page
//removeElement( "//li [@class='comments']" ) // get rid of the link to the comments section at the top of the page

removeElement( "//div [@class='instructions text']" ) // get rid of the warning about inaproppriate comments
var comments = removeElement( "//div [@id='comments']" ) // take the entire comments section out
addElement(comments, "//div [@id='project-comments']") // add it back in after the reply box and preview area

setAttributeOfElement("data-page-size","8","//div[@id='screenshot-gallery']//ul[@data-page-size=5]") // display 8 screenshot thumbnails instead of 5
setAttributeOfElement("class","height-limit","//div[@id='tab-changes']") // add a scroll bar to the changelog


