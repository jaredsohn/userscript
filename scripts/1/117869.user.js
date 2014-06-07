// ==UserScript==
// @name           GayRomeo Optimizer
// @namespace      http://marvinate.wordpress.com
// @description    Optimize GayRomeo (and PlanetRomeo) pages
// @include        http*://*.gayromeo.com/*
// @include        http*://*.planetromeo.com/*
// @include        http*://83.98.143.20/*
// @grant          GM_xmlhttpRequest
// @version        1.4
// ==/UserScript==

// Version 1.1 [2011-11-14]
// [*] Changed internal system to use real objects instead of procedural stuff
//
// Version 1.1a [2011-11-23]
// [*] Optimized JavaScript code - yes, back to procedural stuff... just shut up ;-)
//
// Version 1.2 [2012-01-14]
// [+] Integrated callback to GR-Tools
//
// Version 1.2.1 [2012-02-01]
// [*] Added GayRomeo IP address as default include
// [*] Special handling for club pages (thanks to gymnazein)
//
// Version 1.2.1a [2012-02-02]
// [*] Correct useof window.location instead of document.location
//
// Version 1.2.2 [2012-10-31]
// [*] Small DOM adjustments (thanks to gymnazein)
//
// Version 1.3 [2012-11-24]
// [*] Detect last page (thanks to djamana)
// [*] Optimized generated DOM (thanks to djamana)
// [*] Refactored internal logics
//
// Version 1.3a [2012-12-17]
// [*] Small source code enhancements
//
// Version 1.4 [2013-02-10]
// [*] Compatibility to latest GR-Tools

// -----------------------------------------------------------------------------
// ---  Search list enhancements  ----------------------------------------------
// -----------------------------------------------------------------------------

if(window.location.href.indexOf("/search/index.php") > -1 || window.location.href.indexOf("/search/?") > -1) {

  // We're in a list page, which means that we can create the list optimizer
  // that is being used to alter the current pages content
  function GrListOptimizer() {

    var currentPageRegexArray = /.*?resultPage=(\d+)/.exec(window.location.href);
    this.currentPageIndex = currentPageRegexArray == null ? 1 : parseInt(currentPageRegexArray[1]);

    var lastPageLink = MV_getElementByPath("//table[@class='searchLayout']//tr[last()]/td[last()]/a[last()]");
    this.lastPageIndex = lastPageLink == null ? -1 : parseInt(lastPageLink.innerHTML);

    var nextPageUrl = MV_getElementByPath("//body/table[2]/tbody/tr/td/a[last()]");
    this.nextPageLink = nextPageUrl.getAttribute("href");

    this.navigationTableElement = MV_getElementByPath("//body/table[2]");

  }

  // Append the given element to the currently displayed content on the screen.
  // The content is always added before the pagination table
  GrListOptimizer.prototype.appendContent = function(pElement) {
    this.navigationTableElement.parentNode.insertBefore(pElement, this.navigationTableElement);
  }

  // Append the link to the next page (if there is a next page, otherwise, we'll
  // do nothing)
  GrListOptimizer.prototype.appendNextPageLink = function(pNextPageIndex) {
    var targetPageIndex = pNextPageIndex ? pNextPageIndex : this.currentPageIndex + 1;
    if(this.lastPageIndex > 1 && targetPageIndex <= this.lastPageIndex) {

      var thisOptimizer = this;
      var nextPageLink = MV_createElement("a", {
        style: "display: block; text-align: left; border: 1px solid #ffffff; padding: 5px 5px 5px 5px;",
        name: "gayromeooptimizer_" + targetPageIndex,
        href: "#gayromeooptimizer_" + targetPageIndex
      }, "Load next page (page " + targetPageIndex + ")...");
      nextPageLink.addEventListener("click", function() { thisOptimizer.appendResultPage(nextPageLink, targetPageIndex); }, true);
      nextPageLink.addEventListener("mouseover", function() { thisOptimizer.appendResultPage(nextPageLink, targetPageIndex); }, true);
      this.appendContent(nextPageLink);

    }
  }

  // Load the content for the page with the specified index and append it to
  // the current page
  GrListOptimizer.prototype.appendResultPage = function(pSourceLinkElement, pPageIndex) {

    var loadingMessageDiv = MV_createElement("div", { style: "border: 1px solid #ffffff; padding: 5px 5px 5px 5px;" }, "Loading next page (page " + pPageIndex + ")...");
    pSourceLinkElement.parentElement.insertBefore(loadingMessageDiv, pSourceLinkElement);
    pSourceLinkElement.parentElement.removeChild(pSourceLinkElement);

    var thisOptimizer = this;
    var thisPageParameterStart = window.location.href.indexOf("?");
    var thisPageBaseUrl = thisPageParameterStart < 0 ? window.location.href : window.location.href.substring(0, thisPageParameterStart);
    var nextPageOriginalUrl = thisPageBaseUrl + this.nextPageLink;
    var nextPageMatchedArray = /(.*?)resultPage=\d+(.*)/.exec(nextPageOriginalUrl);
    var nextPageUrl = nextPageMatchedArray == null ? nextPageOriginalUrl : (nextPageMatchedArray[1] + "&resultPage=" + pPageIndex + nextPageMatchedArray[2]);

    MV_sendRequest({
      url: nextPageUrl,
      xpath: "//body/table[1]",
      onComplete: function(pElement, pRequest, pResponse) {
        thisOptimizer.appendResultFromResponse(loadingMessageDiv, pElement, pRequest, pResponse);
      },
      onError: function(pRequest, pResponse, pException) {
        thisOptimizer.appendResultFromError(loadingMessageDiv, pRequest, pResponse, pException);
      },
      pageIndex: pPageIndex
    });

  }

  GrListOptimizer.prototype.appendResultFromResponse = function(pLoadingElement, pElement, pRequest, pResponse) {

    // Replace the "loading" message with the title of the current page
    var nextPageTableHeader = MV_createElement("div", { style: "padding: 5px 5px 5px 5px; border: 1px solid #ffffff" }, "Result list (page " + pRequest.pageIndex + ")");
    pLoadingElement.parentElement.insertBefore(nextPageTableHeader, pLoadingElement);
    pLoadingElement.parentElement.removeChild(pLoadingElement);

    // Append the content we've received for the next page
    this.appendContent(pElement);
    this.appendNextPageLink(pRequest.pageIndex + 1);

    // retrigger GRT-Tools if installed
    // (http://userscripts.org/scripts/show/33184)
    var grtEvent = document.createEvent('Event');
    grtEvent.initEvent('GRT_RETRIGGER', false, false);
    document.dispatchEvent(grtEvent);

  }

  GrListOptimizer.prototype.appendResultFromError = function(pLoadingElement, pRequest, pResponse, pException) {

    var errorElement = MV_createElement("div", { style: "border: 1px solid red; padding: 5px 5px 5px; font-weight: bold;" }, "Cannot load page " + pRequest.pageIndex);
    if(pException != null) {
      errorElement.appendChild(document.createTextNode(" [" + pException + "]"))
    }

    var thisOptimizer = this;
    var retryLink = MV_createElement("a", null, "Retry loading page");
    retryLink.addEventListener("click", function() { thisOptimizer.appendResultPage(errorElement, pRequest.pageIndex); }, true);
    errorElement.appendChild(document.createTextNode(" ("));
    errorElement.appendChild(retryLink);
    errorElement.appendChild(document.createTextNode(")"));

    pLoadingElement.parentElement.insertBefore(errorElement, pLoadingElement);
    pLoadingElement.parentElement.removeChild(pLoadingElement);

  }

  // Initialize the Optimizer
  var listOptimizer = new GrListOptimizer();
  listOptimizer.appendNextPageLink();

}


// -----------------------------------------------------------------------------
// ---  Close a picture in a popup Window by clicking on it. -------------------
// -----------------------------------------------------------------------------

if(window.location.pathname.indexOf("/auswertung/pix/popup") > -1) {
  var imageElementsResult = document.evaluate("//img", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for(var i = 0; i < imageElementsResult.snapshotLength; i++) {
    imageElementsResult.snapshotItem(i).addEventListener("click", function() {
      window.close();
    }, false);
  }
}


// -----------------------------------------------------------------------------
// ---  Includes  --------------------------------------------------------------
// -----------------------------------------------------------------------------

// Include start [xmlhttpUtil.js]
/**
 * Sends the request to the remote system and evaluates the response which
 * must be valid HTML and contain a specified element identifiable by an XPath
 * expression
 *
 * Expected properties in the request are:
 * url
 *   the URL to which the request will be made
 * xpath
 *   the XPath expression that must evaluate to an element that will be
 *   extracted from the response received by the remote system
 * onComplete
 *   a function that will be called when the result has been received and the
 *   content should be displayed
 * onError
 *   a function that will be called if the request cannot be sent or the
 *   response received is invalid
 */
function MV_sendRequest(pRequest) {

  var processResponse = function(pResponse) {
    var responseHtmlStart = pResponse.responseText.indexOf("<html");
    var responseHtmlEnd = pResponse.responseText.indexOf("</html>");
    if(responseHtmlStart < 0 || responseHtmlEnd < 0) {
      pRequest.onError(pRequest, pResponse, "Invalid HTML document received");
    } else {
      var responseHtmlElement = document.createElement("html");
      responseHtmlElement.innerHTML = pResponse.responseText.substring(responseHtmlStart, responseHtmlEnd + "</html>".length);
      var responseXpathResult = document.evaluate(pRequest.xpath, responseHtmlElement, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
      if(responseXpathResult.snapshotLength <= 0) {
        pRequest.onError(pRequest, pResponse, "Invalid HTML document received");
      } else {
        pRequest.onComplete(responseXpathResult.snapshotItem(0), pRequest, pResponse);
      }
    }
  };

  try {
    GM_xmlhttpRequest({
      method: "GET",
      url: pRequest.url,
      onload: processResponse,
      onerror: function(pResponse) { pRequest.onError(pRequest, pResponse, null); }
    });
  } catch(e) {
    pRequest.onError(pRequest, null, e);
  }

}
// Include end [xmlhttpUtil.js]
// Include start [domUtil.js]
function MV_removeElementsByPath(pPath) {
  var pathResult = document.evaluate(pPath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  if(pathResult.snapshotLength > 0) {
    for(var i=0; i < pathResult.snapshotLength; i++) {
      var pathNode = pathResult.snapshotItem(i);
      pathNode.parentNode.removeChild(pathNode);
    }
  }
}

function MV_getElementByPath(pPath, pRoot) {
  var pathResult = document.evaluate(pPath, pRoot == null ? document : pRoot, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  return pathResult.snapshotLength <= 0 ? null : pathResult.snapshotItem(0);
}

function MV_createButton(pAttributes, pClickListener) {
  pAttributes.type = "button";
  var resultElement = MV_createElement("input", pAttributes);
  if(pClickListener != null) {
    resultElement.addEventListener("click", pClickListener, true);
  }
  return resultElement;
}

function MV_createElement(pElementName, pAttributes, pInnerHtml) {
  var resultElement = document.createElement(pElementName);
  for(attributeName in pAttributes) {
    resultElement.setAttribute(attributeName, pAttributes[attributeName]);
  }
  if(pInnerHtml != null) {
    resultElement.innerHTML = pInnerHtml;
  }
  return resultElement;
}
// Include end [domUtil.js]
