// ==UserScript==
// @name           test
// @namespace      idon'tknow
// @description    sample
// @include        about:blank
// @exclude        *
// ==/UserScript==

var temp = document.createElement("div");

// above element is iframe

var newElement = document.createElement("div");

// above element is links
/* temp.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
    'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
    'font-size: small; background-color: #000000; ' +
    'color: #ffffff;"><p style="margin: 2px 0 1px 0;"> ' +
    'YOUR TEXT HERE ' +
    '</p></div>';
 */

temp.innerHTML = '<iframe height="600px" width="100%" border="0px"  src="http://www.google.co.in" onchange="this.src"></iframe>';

newElement.innerHTML = '<span style="padding:20px"> <a href="http://ktree.com/atrium">Atrium</a> <a href="http://email.goktree.com">Email</a> <a href="http://mail.google.com">Gmail</a> <a href="http://bowlyorker.com/cfmc">CFMC</a> <a href="https://docs.google.com/a/goktree.com/">Gdocs</a></span>';

document.body.insertBefore(temp, document.body.firstChild);



targetElement = document.body.firstChild;

/*
var temp2 = document.createElement("div"); */

/* temp.innerHTML = '<div style="margin: 0 auto 0 auto; ' +
    'border-bottom: 1px solid #000000; margin-bottom: 5px; ' +
    'font-size: small; background-color: #000000; ' +
    'color: #ffffff;"><p style="margin: 2px 0 1px 0;"> ' +
    'YOUR TEXT HERE ' +
    '</p></div>';
 */

/*
temp2.innerHTML = '<iframe height="300px" width="100%" border="0px"  src="http://www.google.co.in"></iframe>';

document.body.insertBefore(temp2, document.body.firstChild); */


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

insertAfter(newElement, targetElement);


