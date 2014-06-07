// ==UserScript==
// @name           MediaWiki Reupload Image Link
// @namespace      tleish
// @description    Shows a little "[reupload]" link to the right of an image on MediaWiki
// @version        1.0
// @copyright      2010, tleish
// @include        http://wiki*
// @include        https://wiki*
// @include        http://*.wiki.*
// @include        https://*.wiki.*
// ==/UserScript==

(function () { // function wrapper for Opera

  function selectNodes(contextNode, xpathExpression) {
    var nodes = document.evaluate(xpathExpression, contextNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    var nodeArray = new Array(nodes.snapshotLength);

    for (var i = 0; i < nodeArray.length; i++)
      nodeArray[i] = nodes.snapshotItem(i);

    return nodeArray;
  }

  createDirectLinks();

  function createDirectLinks() {
  	
  	var directLinkHtmlClass = "directLink";
    var dataImageElements = selectNodes(document, "//p/a[@class='image']");

    for (var i = 0; i < dataImageElements.length; i++) {
      var dataImageElement = dataImageElements[i];
      var dataImageLink = dataImageElement.getAttribute("href");
      var dataImageUploadLink = dataImageLink.replace("/File:", "?title=Special:Upload&wpDestFile=") + "&wpForReUpload=1";
      
      var uploadImageLinkDivElement = document.createElement("span");
      uploadImageLinkDivElement.className = "editsection";
	  
	  
      dataImageElement.parentNode.appendChild(uploadImageLinkDivElement, dataImageElement);
	  	
      var uploadImageLinkElement = document.createElement("A");
		
      uploadImageLinkElement.setAttribute("href", dataImageUploadLink);
      // uploadImageLinkElement.setAttribute("class", "external");
      // uploadImageLinkDivElement.style.margin = "0 0 3px 10px";
      // uploadImageLinkDivElement.style.textAlign = "left";

      uploadImageLinkElement.innerHTML = "reupload";
      // uploadImageLinkElement.style.fontSize = "75%";

      uploadImageLinkDivElement.appendChild(uploadImageLinkElement);
      uploadImageLinkDivElement.innerHTML = "[" + uploadImageLinkDivElement.innerHTML + "]";

    }

  } //function createDirectLinks()

})(); // function wrapper for Opera