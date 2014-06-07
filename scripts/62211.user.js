// ==UserScript==
// @name Add or Replace ALT text - Broken Image Placeholder
// @author Deodrus (deodrus@gmail.com)
// @site http://userscripts.org/scripts/show/62211
// @include *
// ==/UserScript==


(function () {


// Only images with ALT text will be processed.
var altyes = document.evaluate("//img[string-length(@alt)>1]",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
    
// Commence loop for replacement of ALT text.
for (var i = 0; i < altyes.snapshotLength; i++) {
	var nextalt = altyes.snapshotItem(i);

// Show existing ALT (if any) in a tooltip on mouseover 
  nextalt.setAttribute('title',nextalt.getAttribute('alt'));
  nextalt.setAttribute('alt','##' + (i+1) + '##');
  }


// Only images without ALT text will be processed.
var altno = document.evaluate("//img[not(@alt)]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null); 

// Commence loop for adding of ALT text.
for (var j = 0; j < altno.snapshotLength; j++) {
	var nextimg = altno.snapshotItem(j);

// Commence loop for addition of ALT text.
var filenametext = nextimg.src.substring(nextimg.src.lastIndexOf('/')+1) ;
nextimg.setAttribute('title',filenametext);
nextimg.setAttribute('alt','##' + (i+1) + '##');
var i = i+1;
}

// Show total number of images in page with alert box. - optional.
// alert('There are ' + (i+j) + ' images on this page.');

})();
