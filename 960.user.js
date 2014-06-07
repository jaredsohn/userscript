// ==UserScript==
// @name          Google Headings 
// @namespace     http://zeus.jesus.cam.ac.uk/~jg307/mozilla/userscripts/
// @description	  Add real heading elements to google search results
// @include       http://google*/search*
// @include       http://www.google*/search*
// ==/UserScript==

(function() { 

  var mainHeading = document.createElement('h1');
  var headingText = document.createTextNode('Search Results');
  mainHeading.appendChild(headingText);
  mainHeading.style.visibility="Hidden";
  mainHeading.style.height="0";
  mainHeading.style.width="0";


  var body = document.getElementsByTagName('body')[0];
  body.insertBefore(mainHeading, body.firstChild);

  var resultsParagraphs =  document.evaluate("//p[@class='g']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

  if(resultsParagraphs.snapshotLength) {
    var heading = resultsParagraphs.snapshotItem(0);
    var headingSize = document.defaultView.getComputedStyle(heading, '').getPropertyValue("font-size");
    var headingWeight = document.defaultView.getComputedStyle(heading, '').getPropertyValue("font-weight");
  }

  for (var i=0; i<resultsParagraphs.snapshotLength; i++) {
    var paragraphNode =  resultsParagraphs.snapshotItem(i);
    var linkNode = paragraphNode.getElementsByTagName('a')[0];

    var heading = document.createElement('h2');
    heading.appendChild(linkNode.cloneNode(true));
    heading.style.fontSize = headingSize;
    heading.style.fontWeight = headingWeight;
    heading.style.marginBottom = 0;
    heading.style.marginTop = 0;
    paragraphNode.replaceChild(heading, linkNode);
    try {
      paragraphNode.removeChild(paragraphNode.getElementsByTagName('br')[0]);
    }
    catch(error) {
    }
  }
 }
 )();
