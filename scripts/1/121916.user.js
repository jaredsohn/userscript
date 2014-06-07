// ==UserScript==
// @name           Chaturbate Optimizer
// @namespace      http://marvinate.wordpress.com
// @description    Optimize chaturbate.com
// @include        http*://*.chaturbate.com/*
// @grant          GM_xmlhttpRequest
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_log
// @version        2.3.2
// ==/UserScript==
//
// Version 1.1 [2012-11-24]
// [*] Latest chaturbate structure
//
// Version 1.1.1 [2012-12-19]
// [*] Additional advertisments
//
// Version 2.0 [2012-12-25]
// [+] Highlight users from selected countries
// [+] Remove tipping area if configured
// [+] Added inline paging
//
// Version 2.1 [2012-12-25]
// [+] Age filter
//
// Version 2.1.1 [2012-12-25]
// [*] Small bugfixes
//
// Version 2.1.2 [2012-12-26]
// [+] Optimized pagination bar
//
// Version 2.1.3 [2012-12-27]
// [-] Bugfix: All profile items were disabled when no age was found
//
// Version 2.2  [2013-02-09]
// [*] Updated kernel
// [*] Remove auto load feature of chaturbate, so that optimized list no longer
//     get overwritten
//
// Version 2.3  [2013-05-19]
// [+] Mark broadcasters wanting tips
//
// Version 2.3.1  [2013-05-26]
// [+] Disable any popup windows
//
// Version 2.3.2  [2013-07-31]
// [-] Bugfix for link identifier

document.optimizerVersion = "2.3.2";


// =============================================================================
// ===  Global settings  =======================================================
// =============================================================================

// Additional helper functions
String.prototype.endsWith = function(pSuffix) { return this.indexOf(pSuffix, this.length - pSuffix.length) !== -1; };


// =============================================================================
// ===  Remove advertisments  ==================================================
// =============================================================================

MV_removeElementsByPath("//div[@class='add']");
MV_removeElementsByPath("//div[@class='ad']");
MV_removeElementsByPath("//div[@class='remove_ads']");
MV_removeElementsByPath("//div[@class='featured_blog_posts']");
MV_removeElementsByPath("//div[@class='featured_text']");
MV_removeElementsByPath("//div[@class='footer-holder']/p");
MV_removeElementsByPath("//div[@class='top-section top-section_small_gfx']/ul[@class='actions']");
MV_removeElementsByPath("//div[@class='top-section top-section_small_gfx']//li/a[@href='/spy-on-cams/']");
MV_removeElementsByPath("//div[@class='top-section']/p");
MV_removeElementsByPath("//div[@class='nav-bar']//li/a[@href='/tipping/free_tokens/']");
MV_removeElementsByPath("//a[contains(@href, 'amateurmatch')]");
MV_removeElementsByPath("//a[@href='/contest/details/']");
MV_removeElementsByPath("//iframe");


// =============================================================================
// ===  CSS Styles  ============================================================
// =============================================================================

// Overwrite existing styles to make the elements displayed look better and
// nicer
GM_addStyle("#botright { display: none !important; }");
GM_addStyle("#defchat { width: 1000px !important; }");

// Define internal CSS classes for easier access
GM_addStyle(".marvinateButton { font-weight: bold; background-color: #E9E9E9; padding: 6px 8px 4px 8px; margin: 0px 4px 0px 0px; color: #006B94; border: 1px solid #006B94; }");
GM_addStyle(".marvinateButtonActive { background-color: #FFFFFF; }");
GM_addStyle(".marvinateButton:hover { cursor: pointer; text-decoration: none; background-color: #006B94; color: white; } ")
GM_addStyle(".marvinateButtonSmall { display: inline-block; font-weight: bold; background-color: #E9E9E9; padding: 4px 8px 4px 8px; margin: -2px 5px -4px 10px; color: #006B94; border: 1px solid #006B94; }");
GM_addStyle(".marvinateButtonSmall:hover { cursor: pointer; text-decoration: none; background-color: #006B94; color: white; } ")
GM_addStyle(".marvinateSelf { padding: 5px 8px 5px 8px; line-height: 1; position: absolute; left: 280px; top: 8px; border: 1px solid #006B94; font-family: Verdana, Tahoma, Arial, Helvetica; }");
GM_addStyle(".marvinateSelf small { font-size: 10px; }");
GM_addStyle(".marvinateSelfTitle { font-size: 12px; font-weight: bold; color: #000000; }");
GM_addStyle(".marvinatePrefs { width: 500px; margin: 20px auto 0px auto; padding: 10px 15px 10px 15px; border: 5px solid #006B94; background-color: #E9E9E9; }");
GM_addStyle(".marvinatePrefsTitle { font-weight: bold; font-size: 15px; margin: 0px 0px 10px 0px; }");
GM_addStyle(".marvinatePrefsWrapper { position: absolute; left: 0; top: 0; width: 100%; height: 100%; z-index: 9999; }");
GM_addStyle(".marvinatePrefsTable { width: 100%; }");
GM_addStyle(".marvinatePrefsTable td.title { width: 200px; padding: 1px 2px 1px 0px; }");
GM_addStyle(".marvinatePrefsTable td.content { padding: 1px 0px 1px 2px; }");
GM_addStyle(".marvinatePrefsTable td.content input[type=text] { width: 150px; }");
GM_addStyle(".marvinatePrefsButtons { margin: 10px 0px 0px 0px; }");
GM_addStyle(".marvinateTippingInfo { display: inline-block; position: absolute; left: 0; top: 0; z-index: 10; }");
GM_addStyle(".marvinateTippingInfo a { display: block; padding: 10px 5px 10px 5px; font-size: 30px; font-weight: bold; text-decoration: none; border: 1px solid #444444; margin: 5px 0px 0px 5px; }");
GM_addStyle(".marvinateTippingInfoLoading { background-color: #ffffff; opacity: 0.4; color: #000000; }");
GM_addStyle(".marvinateTippingInfoEnabled { background-color: #ff9999; opacity: 0.65; color: #000000; }");
GM_addStyle(".marvinateTippingInfoDisabled { background-color: #99ff99; opacity: 0.4; color: #99ff99; }");



// =============================================================================
// ===  Self identification and header  ========================================
// =============================================================================

var logoDiv = MV_getElementByPath("//div[@class='logo-zone']");
if(logoDiv != null) {

  var openPreferencesLink = MV_createElement("div", { "class": "marvinateButtonSmall" }, "Open Preferences");
  openPreferencesLink.addEventListener("click", preferencesOpen, true);

  var titleLink = MV_createElement("div", { "class": "marvinateSelfTitle" });
  titleLink.appendChild(document.createTextNode("Optimizations by marvin - Version " + document.optimizerVersion + " "));
  titleLink.appendChild(openPreferencesLink);

  var authorDiv = MV_createElement("div", { "class": "marvinateSelf" });
  authorDiv.appendChild(titleLink);
  authorDiv.appendChild(MV_createElement("div", { "style": "padding: 3px 0px 0px 0px;"}, "<small><a style=\"color: #000000;\" target=\"_blank\" href=\"http://marvinate.wordpress.com\">http://marvinate.wordpress.com</a></small>"));
  authorDiv.appendChild(MV_createElement("div", { "style": "padding: 10px 0px 0px 0px;"}, "<small><i>\"I think,\" Marvin murmured at last, from deep within his corroding <br />rattling thorax, \"I feel good about it.\"</i></small>"));
  logoDiv.insertBefore(authorDiv, null);

}


// =============================================================================
// ===  Global :: Utilities  ===================================================
// =============================================================================

// Replace window.open with a dummy to disable any popups
unsafeWindow.MV_open = unsafeWindow.open;
unsafeWindow.open = function(pUrl, pName, pParameters) {
  GM_log("Disabled window.open for URL: "+ pUrl);
};

// =============================================================================
// ===  Global :: Preferences  =================================================
// =============================================================================

function preferencesRow(pTitle, pContent) {
  var tableRow = MV_createElement("tr");
  var titleCell = MV_createElement("td", { "class": "title" }, pTitle);
  var contentCell = MV_createElement("td", { "class": "content" });
  contentCell.appendChild(pContent);
  tableRow.appendChild(titleCell);
  tableRow.appendChild(contentCell);
  return tableRow;
}

function preferencesOpen() {

  var preferencesInnerDiv = MV_createElement("div", { "class": "marvinatePrefs"});
  var preferencesOuterDiv = MV_createElement("div", { "class": "marvinatePrefsWrapper"});
  preferencesOuterDiv.close = function() { preferencesOuterDiv.parentNode.removeChild(preferencesOuterDiv); }
  preferencesOuterDiv.appendChild(preferencesInnerDiv);

  var markTipsInListingValue = GM_getValue("marvinateMarkTipsInListing");
  var markTipsInListingCheckbox = MV_createElement("input", { "type": "checkbox", "value": "true" });
  if(markTipsInListingValue == null || markTipsInListingValue == true) {
    markTipsInListingCheckbox.checked = true;
  }
  var markTipsInListingCheckboxInfo = MV_createElement("div");
  markTipsInListingCheckboxInfo.appendChild(markTipsInListingCheckbox);
  markTipsInListingCheckboxInfo.appendChild(document.createTextNode(" Mark users in list broadcasting for money"));

  var highlightLanguages = GM_getValue("marvinateHighlightLanguages");
  var highlightLanguagesField = MV_createElement("input", { "type": "text", "value": highlightLanguages == null ? "" : highlightLanguages});

  var ageMinimumValue = GM_getValue("marvinateAgeMinimum");
  var ageMinimumField = MV_createElement("input", { "type": "text", "value": ageMinimumValue == null ? "" : ageMinimumValue});
  var ageMaximumValue = GM_getValue("marvinateAgeMaximum");
  var ageMaximumField = MV_createElement("input", { "type": "text", "value": ageMaximumValue == null ? "" : ageMaximumValue});

  var prefsTable = MV_createElement("table", { "class": "marvinatePrefsTable"});
  prefsTable.appendChild(preferencesRow("User listings", markTipsInListingCheckboxInfo));
  prefsTable.appendChild(preferencesRow("Highlight users from countries", highlightLanguagesField));
  prefsTable.appendChild(preferencesRow("Age minimum", ageMinimumField));
  prefsTable.appendChild(preferencesRow("Age maximum", ageMaximumField));

  var saveFunction = function() {
    GM_setValue("marvinateMarkTipsInListing", markTipsInListingCheckbox.checked);
    GM_setValue("marvinateHighlightLanguages", highlightLanguagesField.value);
    GM_setValue("marvinateAgeMinimum", ageMinimumField.value != null && ageMinimumField.value.length > 0 ? parseInt(ageMinimumField.value.trim()) : "");
    GM_setValue("marvinateAgeMaximum", ageMaximumField.value != null && ageMaximumField.value.length > 0 ? parseInt(ageMaximumField.value.trim()) : "");
    alert("Preferences saved! (Reload the current page to make sure they're applied)");
    preferencesOuterDiv.close();
  }

  var prefsButtonArea = MV_createElement("div", { "class": "marvinatePrefsButtons"});
  prefsButtonArea.appendChild(MV_createButton({ "class": "marvinateButton", "value": "Save Preferences" }, saveFunction));
  prefsButtonArea.appendChild(MV_createButton({ "class": "marvinateButton", "value": "Cancel" }, function() { preferencesOuterDiv.close(); }));

  preferencesInnerDiv.appendChild(MV_createElement("div", { "class": "marvinatePrefsTitle" }, "Marvinate Preferences"));
  preferencesInnerDiv.appendChild(prefsTable);
  preferencesInnerDiv.appendChild(prefsButtonArea);
  document.body.appendChild(preferencesOuterDiv);

}

// =============================================================================
// ===  Cam listings  ==========================================================
// =============================================================================

// Restyle the list element to fit the complete page (normally, on the right
// side there would be place for ads, but since we removed them all, we can
// extend the page to fill the remaining space)
var listElement = MV_getElementByPath("//div[@class='c-1 endless_page_template']");
if(listElement != null) {
  listElement.setAttribute("style", "margin: 0px 0px 0px 15px; padding: 0; z-index: 999;");
}

// Add the optimizations to be performed dynamically
var optimizeUserListListeners = [];
function optimizeUserList() {
  for(var i=0; i < optimizeUserListListeners.length; i++) {
    optimizeUserListListeners[i]();
  }
}

// Optimize each of the cells in which a user cam is being displayed.
var profileNodes = document.evaluate("//ul[@class='list']/li", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if(profileNodes != null && profileNodes.snapshotLength > 0) {

  // We do not want the site to trigger all timeouts. First of all, no ads should
  // be allowed to be reloaded and second of all, the site implements a global
  // reload scheduling process, that doesn't take the optimizations into account.
  // So, what we do here is to replace the default windows setTimeout function
  // with a dummy, that does nothing. However, if we ourselves ever want to
  // initiate a setTimeout we capture the function itself by making it available
  // under the MV_setTimeout key
  unsafeWindow.MV_setTimeout = unsafeWindow.setTimeout;
  unsafeWindow.setTimeout = function(pFunction) {}

  optimizeUserListListeners.push(function() {

    var profileNodes = document.evaluate("//ul[@class='list']/li", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    var ageMinimumValue = GM_getValue("marvinateAgeMinimum");
    var ageMaximumValue = GM_getValue("marvinateAgeMaximum");
    var highlightCountriesPrefsValue = GM_getValue("marvinateHighlightLanguages");
    var highlightCountries = highlightCountriesPrefsValue == null ? null : highlightCountriesPrefsValue.split(",");
    for(var i=0; i < profileNodes.snapshotLength; i++) {
      var profileNode = profileNodes.snapshotItem(i);
      var alreadyAltered = profileNode.getAttribute("marvinateAltered");
      if(!alreadyAltered) {
        profileNode.setAttribute("marvinateAltered", true);
      
        var linkElement = MV_getElementByPath("a", profileNode);
        var locationInfoNode = document.evaluate("div[@class='details']//li[@class='location']", profileNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
        var locationInfo = locationInfoNode == null ? "" : locationInfoNode.innerHTML;
        if(highlightCountries != null) {
          for(var j=0; j < highlightCountries.length; j++) {
            if(locationInfo.endsWith(", " + highlightCountries[j].trim()) || locationInfo == highlightCountries[j].trim()) {
              profileNode.setAttribute("style", "background-color: #CDD9E5; border: 4px solid green; margin: -3px 4px 4px -3px; border-radius: 2px; ");
            }
          }
        }
  
        // Check if the current user is broadcasting for cash and mark the box
        // accordingly
        var markTipsInListingValue = GM_getValue("marvinateMarkTipsInListing");
        if(markTipsInListingValue == null || markTipsInListingValue == true) {
          var locationInfoNode = document.evaluate("div[@class='details']//li[@class='location']", profileNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
          var detailPageUrl = "http://" + window.location.hostname + document.evaluate("a", profileNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0).getAttribute("href");
          var tippingInfoElement = MV_createElement("div", { "class": "marvinateTippingInfo" });
          var tippingInfoLink = MV_createElement("a", { "class": "marvinateTippingInfoLoading", "href": detailPageUrl }, "?");
          tippingInfoElement.appendChild(tippingInfoLink);
          profileNode.appendChild(tippingInfoElement);
          MV_sendRequest({
            url: detailPageUrl,
            xpath: "//div[@class='token_options']",
            tippingInfoElement: tippingInfoElement,
            tippingInfoLink: tippingInfoLink,
            onComplete: function(pElement, pRequest, pResponse) {
              var tipButtonNode = MV_getElementByPath("//a[@class='tip_button']", pElement);
              pRequest.tippingInfoLink.setAttribute("class", tipButtonNode == null ? "marvinateTippingInfoDisabled" : "marvinateTippingInfoEnabled");
              pRequest.tippingInfoLink.innerHTML = "&#8364;";
            },
            onError: function(pRequest, pResponse, pException) {
              // Ignore here - we canot do anything!
            }
          });
        }
        
        var ageElement = MV_getElementByPath("div[@class='details']//span[contains(@class, 'age')]", profileNode);
        var ageElementValue = ageElement == null ? null : ageElement.innerHTML;
        var ageInteger = ageElementValue == null || isNaN(ageElementValue.trim()) ? null : parseInt(ageElementValue.trim());
        var ageMinimum = ageMinimumValue == null || ageMinimumValue == "" ? null : parseInt(ageMinimumValue);
        var ageMaximum = ageMaximumValue == null || ageMaximumValue == "" ? null : parseInt(ageMaximumValue);
        if(ageInteger != null && ageInteger != Number.NaN && ageMinimum != null || ageMaximum != null) {
          var ageValidMinimum = ageMinimum == null || ageMinimum <= ageInteger;
          var ageValidMaximum = ageMaximum == null || ageMaximum >= ageInteger;
          if(!ageValidMinimum || !ageValidMaximum) {
            var blockingElement = MV_createElement("a", { "style": "display: block; position: absolute; left: 0; top: 0; width: 180px; height: 220px; opacity: 0.75; background-color: #ffffff; z-index: 20; text-decoration: none;" }, "&nbsp;")
            blockingElement.setAttribute("href", linkElement.getAttribute("href"));
            profileNode.appendChild(blockingElement);
          }
        }

      }
    }
  });
}

// Append the next page link
var pagingElement = MV_getElementByPath("//ul[@class='paging']");
if(pagingElement != null) {

  function createLinkToNextPage(pNextPageNumber) {

    var nextPageArea = MV_createElement("ul", { "id": "marvinatePageArea_" + pNextPageNumber, "class": "list", "style": "font-weight: bold; " }, "");
    var nextPageLink = MV_createElement("a", { "id": "marvinatePageLink_" + pNextPageNumber, "href": "#", "style": "display: block; border: 1px solid #8BB3DA; margin: 10px 0px 10px 0px; padding: 5px;" }, "Load next page (page " + pNextPageNumber + ")");
    nextPageArea.appendChild(nextPageLink);

    var appendResultPageFunction = function() {

      // Show everyone we're busy
      var waitingElement = MV_createElement("div", { "style": "border: 1px solid #8BB3DA; margin: 10px 0px 10px 0px; padding: 5px;" }, "Loading page " + pNextPageNumber + "...");
      nextPageArea.removeChild(nextPageLink);
      nextPageArea.appendChild(waitingElement);

      var completeFunction = function(pElement, pRequest, pResponse) {
        nextPageArea.removeChild(waitingElement);
        nextPageArea.appendChild(MV_createElement("div", { "style": "border: 1px solid #8BB3DA; margin: 10px 0px 10px 0px; padding: 5px;" }, "Page: " + pNextPageNumber));
        pagingElement.parentNode.insertBefore(pElement, pagingElement);
        optimizeUserList();
        createLinkToNextPage(pNextPageNumber + 1);
      }

      var errorFunction = function(pRequest, pResponse, pException) {
        nextPageArea.removeChild(waitingElement);
        nextPageArea.appendChild(MV_createElement("div", { "style": "border: 1px solid #8BB3DA; margin: 10px 0px 10px 0px; padding: 5px;" }, "Cannot load page " + pNextPageNumber + " [" + pException + "]"));
      }

      // Load the next page
      var currentPageUrl = window.location.href;
      var lastSlashIndex = currentPageUrl.lastIndexOf("/");
      var nextPageUrl = currentPageUrl.substring(0, lastSlashIndex + 1) + "?page=" + pNextPageNumber;
      MV_sendRequest({
        url: nextPageUrl,
        xpath: "//ul[@class='list']",
        onComplete: completeFunction,
        onError: errorFunction
      });

    };

    nextPageLink.addEventListener("click", appendResultPageFunction, true);
    pagingElement.parentNode.insertBefore(nextPageArea, pagingElement);

  }

  optimizeUserListListeners.push(function() {
    var activePageLink = MV_getElementByPath("li[@class='active']/a", pagingElement);
    if(activePageLink != null) {
      var activePage = parseInt(activePageLink.innerHTML);
      createLinkToNextPage(activePage + 1);
    }
  });

  optimizeUserListListeners.push(function() {

    var currentPageUrl = window.location.href;
    var currentPageNeedle = "page=";
    var currentPageValueStartIndex = currentPageUrl.indexOf(currentPageNeedle);
    var currentPageValueEndIndex = currentPageValueStartIndex < 0 ? -1 : currentPageUrl.indexOf("&", currentPageValueStartIndex + 1);
    var currentPageValue = currentPageValueStartIndex < 0 ? 1 : parseInt(currentPageUrl.substring(currentPageValueStartIndex + currentPageNeedle.length, currentPageValueEndIndex < 0 ? currentPageUrl.length : currentPageValueEndIndex));

    var lastSlashIndex = currentPageUrl.lastIndexOf("/");
    var nextPageRootUrl = currentPageUrl.substring(0, lastSlashIndex + 1) + "?page=";

    var newPagingContent = MV_createElement("div");
    var appendTargetLinkFunction = function(pPageIndex) {
      var classValue = pPageIndex == currentPageValue ? "marvinateButton marvinateButtonActive" : "marvinateButton";
      var targetLinkElement = MV_createElement("a", { "class": classValue, "style": "margin: 0px 3px 0px 3px; padding: 6px 12px 5px 12px; ", "href": nextPageRootUrl + pPageIndex}, pPageIndex);
      newPagingContent.appendChild(targetLinkElement);
    };
    for(var i=1; i <= currentPageValue + 3; i++) {
      appendTargetLinkFunction(i);
    }
    pagingElement.innerHTML = "";
    pagingElement.appendChild(newPagingContent);

  });

}

// Run the optimizations (called when the list page is loaded for the first
// time)
optimizeUserList();


// =============================================================================
// ===  Includes  ==============================================================
// =============================================================================
//
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
