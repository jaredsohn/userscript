// ==UserScript==
// @name           GoerDetSelv.dk - show article issue/year in headline
// @description    Danish: Se hvilken udgave artikler er fra, info fra metaTags. English: This is for Danish site GoerDetSelv.dk to view article issue / year in header. This info is not available otherwise.
// @include        http://goerdetselv.dk/*
// ==/UserScript==

// ============================================
// Get information from metatag (keywords)
// can be usable in many other places also
// ============================================
  function metaKeywords() {
	metaCollection = document.getElementsByTagName('meta');

	for (i=0;i<metaCollection.length;i++) {
		nameAttribute = metaCollection[i].name.search(/keywords/);

		if (nameAttribute!= -1) {
			return(metaCollection[i].content);
		}
	}
} 

//create function, it expects 2 values.
// this function can be usable other places also
// mostly here because of proof-of-concept...
function insertAfter(newElement,targetElement) {

	// target is what you want it to go after. Look for this elements parent.
	var parent = targetElement.parentNode;
	
	// if the parents lastchild is the targetElement...
	if(parent.lastchild == targetElement) {
	
		// add the newElement after the target element.
		parent.appendChild(newElement);
		
		} else {
		// else the target has siblings, insert the new element between the target and it's next sibling.
		parent.insertBefore(newElement, targetElement.nextSibling);
		}
}


// make a new tag and style it
var myinfo = metaKeywords().replace(/.*?([0-9]+),\s([0-9]+).*$/g, "$1 - $2");
var nyttag = document.createElement('h3');
nyttag.innerHTML = myinfo;
nyttag.style.background="yellow";
nyttag.style.padding="30px";

//
// there is only one h1 tag in the page. So no need to use XPath here.
//
var h1tag = document.getElementsByTagName("h1");
if (h1tag) {
	//alert(h1tag[0].innerHTML);	
	insertAfter	(nyttag, h1tag[0]);
         }
	else
	{
		// alert("not found tag");
	}
