// ==UserScript==
// @name          Iwiw original image
// @namespace     http://diveintogreasemonkey.org/download/
// @description   Adds a link to the original image on an iwiw image page
// @include       *iwiw.hu/pages/image/imagedata.jsp*
// @author		  Kovianyo
// ==/UserScript==


function log(line)
{
/*
var curdate = new Date();
var times = curdate.toGMTString();

GM_log("\n" + times + ";  " + line);
*/
console.log(line);
}


// described here: http://www-xray.ast.cam.ac.uk/~jgraham/mozilla/xpath-tutorial.html
function NSResolver(prefix) {
  if(prefix == 'html') {
    return 'http://www.w3.org/1999/xhtml';
  }
  else  {
  //this shouldn't ever happen
    return null;
  }
}


//log("hello");

var allElements, thisElement;

allElements = document.evaluate(
    "//*[@id='imageFull']",
    document,
    NSResolver, 
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null);

//log(allElements.snapshotLength);

thisElement = allElements.snapshotItem(0);

//log(thisElement.src);

var imgsrc = thisElement.src;

var originalimagesrc;

//log(imgsrc.substring(imgsrc.length-4, imgsrc.length));

if (imgsrc.substring(imgsrc.length-4, imgsrc.length) == "_box")
{
	originalimagesrc = imgsrc.substring(0,imgsrc.length-4);
//	log(originalimagesrc);

var newElement = document.createElement('a');
newElement.innerHTML = "Eredeti kep";
newElement.href = originalimagesrc;
newElement.target = "_blank";
thisElement.parentNode.parentNode.insertBefore(newElement, thisElement.parentNode.nextSibling);

}

