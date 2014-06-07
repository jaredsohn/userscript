// ==UserScript==
// @name         		 Googlize
// @namespace   		 
// @description   		See how the Internet would look like when Google takes over the world
// @include     		 *
// @exclude  		http://www.google.com/*
// @exclude 		http://google.com/*
// @exclude 		http://*.google.com/*
// ==/UserScript==

imageLoc = 'data:image/gif;base64,' +
		'R0lGODlhFAFuAPcAAPf39//7/+fn59bT1u/r787Lzq0UAN7b3hhFrRhJtRA0hBA8lMYYALWytffz94wQ' +
		'AMa+vb26vRhNxufj5+/v78bDxvfz772+vcbHxghRCM7PzggkYyFZ1tYkCNbX1hhRzpyenO+6AN7f3gBl' +
		'ANauAGOW7zFl1kp95wg8pbW2tZyanHOi797f5zlx3msMAAB9CP/PAL22va2mraWipedJMSlRtf91Y72W' +
		'AFqK76WmpRBFta2qrcaeAK2urfdpUuc8If39/e9ZQmPTY94wGFrLWrUkEISq9/n5+ZR5ABCWGLWOAIRp' +
		'AGNRAClJlK2GAL0sGGssITG2OaWCAK3H9848KaW+762qpcbX/73jvWN5pGvTc/eGc//vCFppfIwgEJRB' +
		'MYSGlPeWhJSSjHN5jMaSjKWmrb3P787V1ilBa4R9c9nXy+rq6ntNQu/y95Su3svO1kphlISa1t7b1vf7' +
		'/3uGraWGexdAmoySlDm6QrWyraWqrRiiIWtpa0LDStrl/1JtrcbHzpxlWntlUklVcztZk3vbhISStfff' +
		'Wufr786upVmB1ta2taW21tLS0ve6rd7j5zlhtfemnJSetefn78LCw7W2vdnZ2bVFMf/3//f3/8Z1a9bb' +
		'59bb3eHh4a2WjM7HxoR1OSGqKbW6xvT09JyGQrXD3v/r5+fk3s7rzufb3q2ytffXKbWiY6inp1p1WrWm' +
		'jP/LxnOOzsC/v+/n56qSMffXzr2eEP/3hPHx8f//987T57m4ubVZShk5f97LjO/HKQ03ks7DpdZlWv/v' +
		'Md7LxqWuvefr/86uKd66QgwyhcnJyf/ztbKxsrWqpe/37//z7///75zTpf/397Szsvfn1ozLjO/jlN7v' +
		'3qWko62OEO/r5//73tbX3vf37wotd1qqYxlNvYyujN7X1qKgoHuWe5KUmkKOQhZKvildMRh5IZqZmcXE' +
		'wZ2amaajoNfU0QMaTAsiV5STlSo+bZibpSti2puZl5u28pGs5pqbn9Hd8/fr94WFi7i1sBguYfP09v//' +
		'/ywAAAAAFAFuAAAI/wD/CRxIsKDBgwgTKlzIsKHDhxAjSpxIsaLFixgzatzIsaPHjyBDihxJsqTJkyhT' +
		'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';

// Change all images
var allImages, thisImage;
allImages = document.getElementsByTagName("img");
for (var i = 0; i < allImages.length; i++) {
	thisImage = allImages[i];
	thisImage.src = imageLoc
}


// Change all headers
window.changeHeaders = function(tag) {
	var allHeaders, thisHeader;
	allHeaders = document.getElementsByTagName(tag);
	for (var i = 0; i < allHeaders.length; i++) {
		thisHeader = allHeaders[i];
		thisHeader.innerHTML = "Google";
	}
}
for (var i = 1; i < 7; i++) {
	window.changeHeaders("h" + i);
}

// Change all links
var allLinks, thisLink;
allLinks = document.getElementsByTagName("a");
for (var i = 0; i < allLinks.length; i++) {
	thisLink = allLinks[i];
	thisLink.innerHTML = "Google.com";
	thisLink.href = "http://www.google.com";
}

// Change all formatted text
window.changeFormattedText = function(tag) {
	var allFormat, thisFormat;
	allFormat = document.getElementsByTagName(tag);
	for (var i = 0; i < allFormat.length; i++) {
		thisFormat = allFormat[i];
		thisFormat.innerHTML = "Google";
	}
}
changeFormattedText("b");
changeFormattedText("i");
changeFormattedText("u");
changeFormattedText("em");


/*
// Remove stylesheets
var allStyles, thisStyle;
allStyles = document.evaluate("//link[@type='text/css']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allStyles.snapshotLength; i++) {
	thisStyle = allStyles.snapshotItem(i);
	thisStyle.href = "";
}
*/

// Change  all backgrounds
var allBG, thisBG;
allBG = document.evaluate("//*[@background]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < allBG.snapshotLength; i++) {
	thisBG = allBG.snapshotItem(i);
	thisBg.background = imageLoc
}

// Create search boxes
var searchbox = document.createElement("form");
searchbox.method = "get";
searchbox.action = "http://www.google.com/search";
searchbox.innerHTML = "<input type=\"text\" name=\"q\" size=\"25\" maxlength=\"255\" value=\"\" /><input type=\"submit\" value=\"Google Search\" />"
document.body.insertBefore(searchbox, document.body.firstChild);
			
// Change all forms
var allForms, thisForm;
allForms = document.getElementsByTagName("form");
for (var i = 0; i < allForms.length; i++) {
	thisForm = allForms[i];
	thisForm.method = "get";
	thisForm.action = "http://www.google.com/search";
	thisForm.innerHTML = "<input type=\"text\" name=\"q\" size=\"25\" maxlength=\"255\" value=\"\" /><input type=\"submit\" value=\"Google Search\" />"
}