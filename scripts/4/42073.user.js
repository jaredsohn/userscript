// ==UserScript==
// @name           Google Image Search Direct Links
// @namespace      http://userscripts.org/users/79816
// @description    Shows a little "direct image link" above Google image search results
// @version        1.0.8
// @copyright      2009, ulrichb
// @include        http://www.google.com/images*
// @include        http://www.google.de/images*
// @include        http://www.google.tld/images*
// @include        http://www.google.*/images*
// @include        http://images.google.com/*
// @include        http://images.google.de/*
// @include        http://images.google.tld/*
// @include        http://images.google.*/*
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
  window.addEventListener("resize", createDirectLinks, true);

  function createDirectLinks() {
  	var directLinkHtmlClass = "directLink";
    var dataImageElements = selectNodes(document, "//td[starts-with(@id, 'tDataImage')]");
    //console.log(dataImageElements.length);

    for (var i = 0; i < dataImageElements.length; i++) {
      var dataImageElement = dataImageElements[i];
      var dataImageDirectLinkElements = selectNodes(dataImageElement, "./div[@class='" + directLinkHtmlClass + "']");
      var dataImageLinkElements = selectNodes(dataImageElement, "./a");

      if ((dataImageLinkElements.length > 0) && (dataImageDirectLinkElements.length == 0)) {
        var dataImageLinkElement = dataImageLinkElements[0];

        if (dataImageLinkElement.hasAttribute("href")) {
          var linkAddress = dataImageLinkElement.getAttribute("href");
          var imageUrlMatchResult = linkAddress.match(/imgurl=(.*)&imgrefurl=/);

          if ((imageUrlMatchResult != null) && (imageUrlMatchResult[1] != null)) {
            var imageUrl = decodeURIComponent(imageUrlMatchResult[1]);
            //GM_log(imageUrl);

            var directImageLinkDivElement = document.createElement("DIV");
            directImageLinkDivElement.className = directLinkHtmlClass;

            dataImageElement.insertBefore(directImageLinkDivElement, dataImageLinkElement);

            var directImageLinkElement = document.createElement("A");

            directImageLinkElement.setAttribute("href", imageUrl);

            directImageLinkDivElement.style.margin = "0 0 3px 10px";
            directImageLinkDivElement.style.textAlign = "left";

            directImageLinkElement.innerHTML = "direct link";
            directImageLinkElement.style.fontSize = "75%";

            directImageLinkDivElement.appendChild(directImageLinkElement);
          }
        }
      }
    }

  } //function createDirectLinks()

})(); // function wrapper for Opera