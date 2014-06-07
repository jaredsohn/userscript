// ==UserScript==
// @name           cam4.com Optimizer
// @namespace      http://marvinate.wordpress.com/
// @description    Optimize cam4 pages
// @include        http*://*.cam4.com/*
// @include        http*://*.cam4.*.com/*
// @version        2.5.7
// ==/UserScript==
//
// Version 1.1  [2010-12-27]
// [-] Bugfix: Adjusted to new cam4 layout
//
// Version 1.1a [2010-12-29]
// [-] Bugfix: Reenabled list enhancements
//
// Version 1.1b [2010-12-29]
// [+] Removed additional advertisments
//
// Version 1.2  [2011-04-12]
// [*] New cam4 layout for start page
//
// Version 1.2a [2011-05-22]
// [+] Include https:// URLs
//
// Version 1.2b [2011-06-08]
// [+] Include *.cam4.com
//
// Version 1.2c [2011-07-09]
// [+] Small enhancements
//
// Version 1.2d [2011-10-02]
// [-] Bugfix for preview generation
//
// Version 2.0 [2011-10-29]
// [*] Profile/Archive: Reformatted archive image list (include series marker)
// [+] Profile: Add optimized list of preview images for user
// [+] Profile/Image: Optimized layout of preview image detail page
// [+] List: Optimized bottom navigation
// [+] List: Show full status message in link hover
//
// Version 2.1 [2011-11-12]
// [+] Allow popup creation from video window
//
// Version 2.2 [2011-11-21]
// [+] Automatically load next pages in same document after click
// [+] Better placement of friends list
//
// Version 2.2.1 [2011-12-15]
// [*] Minor enhancements in profile detail image display
// [*] Allow reloads in detached video window
// [*] Added reload links to list pagination
//
// Version 2.2.2 [2012-01-17]
// [*] Tipping area can now be re-enabled
// [+] Remove "Send private tip" div
//
// Version 2.3 [2012-01-20]
// [+] Preferences Screen
//
// Version 2.4 [2012-02-02]
// [*] Completely rewritten codebase
// [*] Optimized layout
// [+] Highlight users from a specific country (editable in preferences)
//
// Version 2.4.1 [2012-03-15]
// [-] Bugfix: Archite wasn't rendered correctly
//
// Version 2.5 [2012-06-03]
// [+] Adjustments to new profile detail page
//
// Version 2.5.1 [2012-06-24]
// [+] Additional adverts removed
//
// Version 2.5.2 [2012-07-05]
// [*] Small layout fixes
//
// Version 2.5.2a [2012-12-16]
// [*] Removed obsolete source code
//
// Version 2.5.3 [2013-06-09]
// [*] Adjusted @matches to refelct new domain structure of cam4
//
// Version 2.5.4 [2013-06-20]
// [*] Removed additional advertisments
//
// Version 2.5.5 [2013-07-31]
// [*] Removed additional advertisments
//
// Version 2.5.6 [2013-08-03]
// [*] Removed additional advertisments
//
// Version 2.5.7 [2013-10-25]
// [-] Action buttons not shown on detail page

document.title = window.location.href;
document.optimizerVersion = "2.5.7";


// =============================================================================
// ===  Global :: Additional CSS ==============================================
// =============================================================================

GM_addStyle(".marvinateButton { display: inline-block; font-size: 14px; font-weight: bold; background-color: #FC531D; padding: 4px 8px 4px 8px; margin: 0px 10px 0px 0px; color: white; border: 1px solid #FC531D; } ")
GM_addStyle(".marvinateButton:hover { cursor: pointer; text-decoration: none; background-color: #FFE1D7; color: #FC531D; } ")
GM_addStyle(".marvinateButtonSmall { display: inline-block; font-weight: bold; background-color: #FFE1D7; padding: 4px 8px 4px 8px; margin: -4px 5px -4px 10px; color: #FC531D; border: 0; }");
GM_addStyle(".marvinateButtonSmall:hover { cursor: pointer; text-decoration: none; background-color: #FC531D; color: white; } ")
GM_addStyle(".marvinateSelf { padding: 9px 0px 0px 250px; line-height: 1; position: absolute; left: 0px; top: 0px; width: 550px; }");
GM_addStyle(".marvinateSelf small { font-size: 10px; }");
GM_addStyle(".marvinateSelfTitle { font-size: 12px; font-weight: bold; color: #000000; }");
GM_addStyle(".marvinatePrefs { width: 500px; margin: 20px auto 0px auto; padding: 10px 15px 10px 15px; border: 5px solid #FC531D; background-color: #FFE1D7; }");
GM_addStyle(".marvinatePrefsTitle { font-weight: bold; font-size: 15px; margin: 0px 0px 10px 0px; }");
GM_addStyle(".marvinatePrefsWrapper { position: absolute; left: 0; top: 0; width: 100%; height: 100%; }");
GM_addStyle(".marvinatePrefsTable { width: 100%; }");
GM_addStyle(".marvinatePrefsTable td.title { width: 200px; padding: 1px 2px 1px 0px; }");
GM_addStyle(".marvinatePrefsTable td.content { padding: 1px 0px 1px 2px; }");
GM_addStyle(".marvinatePrefsTable td.content input[type=text] { width: 150px; }");
GM_addStyle(".marvinatePrefsButtons { margin: 10px 0px 0px 0px; }");
GM_addStyle(".marvinatePager .pagerLinkActive { background-color: #FC531D; color: white; }");
GM_addStyle(".marvinateNextPageArea { font-size: 12px; cursor: pointer; margin: 5px 10px 5px 10px; padding: 10px 10px 10px 10px; border: 5px solid #FC531D; font-weight: bold; background-color: #FFE1D7; }");
GM_addStyle(".marvinateNextPageAreaWrapper { clear: both; padding: 10px 0px 0px 0px; }");
GM_addStyle(".marvinateNextPageContent { font-size: 12px; margin: 5px 10px 5px 10px; padding: 13px 10px 13px 10px; border: 2px solid #FC531D; }");
GM_addStyle(".marvinateNextPageContentWrapper { clear: both; border: 5px solid blue; }");
GM_addStyle(".marvinateDetailTitle { clear: left; margin: 5px 0px 5px 0px; padding: 0px 5px 0px 5px; font-size: 12px; font-weight: bold; }");
GM_addStyle(".marvinateDetailActions { margin: 5px 0px 5px 0px; text-align: left; }");
GM_addStyle(".marvinateDetailArea { clear: both; display: block; margin: 0px 10px 10px 10px; padding: 5px 5px 5px 5px; border: 2px solid #FFE1D7; }");
GM_addStyle(".marvinateDetailAreaPhotos { display: inline-block; }");
GM_addStyle(".marvinateDetailAreaArchive { max-height: 200px; overflow: auto; }");
GM_addStyle(".marvinateImagesTitle { font-weight: bold; font-size: 16px; margin: 0px 0px 5px 0px; }");
GM_addStyle(".marvinateImagesList { margin: 0px 0px 0px 0px; padding: 5px 5px 5px 5px; border: 2px solid #FFE1D7; }");
GM_addStyle(".marvinateImagesList img.active { border: 4px solid #FC531D; margin: -4px; }");
GM_addStyle(".marvinateImagesContent { margin: 10px 0px 0px 0px; padding: 5px 5px 5px 5px; border: 2px solid #FFE1D7; }");
GM_addStyle(".multicamWrap_mini { margin: 10px 0px 0px 20px; }");


// =============================================================================
// ===  Global :: Remove advertisments ========================================
// =============================================================================

MV_removeElementsByPath("//a[@class='upgrade']");
MV_removeElementsByPath("//a[@href='/gold']");
MV_removeElementsByPath("//a[@href='/profiles/tokens.jsp']");
MV_removeElementsByPath("//a[@href='/contest']");
MV_removeElementsByPath("//a[@href='/contest/month/']");
MV_removeElementsByPath("//a[@href='/contest/month']");
MV_removeElementsByPath("//a[@href='/super_shows']");
MV_removeElementsByPath("//a[@href='/videos']");
MV_removeElementsByPath("//a[contains(@href, 'cam4bucks.com')]");
MV_removeElementsByPath("//a[contains(@href, 'cam4premium.com')]");
MV_removeElementsByPath("//a[contains(@href, 'theater.aebn.net')]");
MV_removeElementsByPath("//a[contains(@href, 'naughtyreviews.com')]");
MV_removeElementsByPath("//a[contains(@href, 'cam4ultimate')]");
MV_removeElementsByPath("//body/h2");
MV_removeElementsByPath("//div[@class='ads']");
MV_removeElementsByPath("//div[@class='bottom_footer']");
MV_removeElementsByPath("//div[@class='c4_socials']");
MV_removeElementsByPath("//div[@class='newjoin']");
MV_removeElementsByPath("//div[@class='sponsorAd']");
MV_removeElementsByPath("//div[@class='profileDisclaimer']");
MV_removeElementsByPath("//div[@id='announceHome']");
MV_removeElementsByPath("//div[@id='skyscraper']");
MV_removeElementsByPath("//div[@id='footer']");
MV_removeElementsByPath("//div[@id='headerBanner']");
MV_removeElementsByPath("//div[@id='myAccount']");
MV_removeElementsByPath("//div[@id='privateshowBanner']");
MV_removeElementsByPath("//div[@id='options']");
MV_removeElementsByPath("//div[@id='options2']");
MV_removeElementsByPath("//div[@id='right-content']");
MV_removeElementsByPath("//div[@id='right-content-top']");
MV_removeElementsByPath("//div[@id='right-content-bottom']");
MV_removeElementsByPath("//div[@id='socialBookmarkProfile']");
MV_removeElementsByPath("//div[@id='subfoot']");
MV_removeElementsByPath("//div[@id='tippingJarDiv']");
MV_removeElementsByPath("//div[@id='topHeader']");
MV_removeElementsByPath("//li[@class='right search']");
MV_removeElementsByPath("//iframe");
MV_removeElementsByPath("//h3");


// =============================================================================
// ===  Global :: Self identification and header ==============================
// =============================================================================

var logoDiv = document.getElementById('C4Logo');
if(logoDiv != null) {

  var openPreferencesLink = MV_createElement("div", { "class": "marvinateButtonSmall" }, "Open Preferences");
  openPreferencesLink.addEventListener("click", preferencesOpen, true);

  var titleLink = MV_createElement("div", { "class": "marvinateSelfTitle" });
  titleLink.appendChild(document.createTextNode("Optimizations by marvin - Version " + document.optimizerVersion + " "));
  titleLink.appendChild(openPreferencesLink);

  var authorDiv = MV_createElement("div", { "class": "marvinateSelf" });
  authorDiv.appendChild(titleLink);
  authorDiv.appendChild(MV_createElement("div", { "style": "padding: 3px 0px 0px 0px;"}, "<small><a style=\"color: #000000;\" target=\"_blank\" href=\"http://marvinate.wordpress.com\">http://marvinate.wordpress.com</a></small>"));
  authorDiv.appendChild(MV_createElement("div", { "style": "padding: 10px 0px 0px 0px;"}, "<small><i>\"I think,\" Marvin murmured at last, from deep within his corroding rattling thorax, \"I feel good about it.\"</i></small>"));
  logoDiv.insertBefore(authorDiv, null);

}


// =============================================================================
// ===  Global :: Preferences =================================================
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

  var showTippingAreaCheckbox = MV_createElement("input", { "type": "checkbox", "value": "true" });
  if(GM_getValue("marvinateShowTippingArea")) {
    showTippingAreaCheckbox.checked = true;
  }
  var showTippingAreaCheckboxInfo = MV_createElement("div");
  showTippingAreaCheckboxInfo.appendChild(showTippingAreaCheckbox);
  showTippingAreaCheckboxInfo.appendChild(document.createTextNode(" Show tipping area on user page"));

  var highlightLanguages = GM_getValue("marvinateHighlightLanguages");
  var highlightLanguagesField = MV_createElement("input", { "type": "text", "value": highlightLanguages == null ? "" : highlightLanguages});

  var prefsTable = MV_createElement("table", { "class": "marvinatePrefsTable"});
  prefsTable.appendChild(preferencesRow("Tipping area", showTippingAreaCheckboxInfo));
  prefsTable.appendChild(preferencesRow("Highlight users from countries", highlightLanguagesField));

  var saveFunction = function() {
    GM_setValue("marvinateShowTippingArea", showTippingAreaCheckbox.checked);
    GM_setValue("marvinateHighlightLanguages", highlightLanguagesField.value);
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
// ===  Userlist  ::  Variables ===============================================
// =============================================================================

var optimizeUserListListeners = [];

function getCurrentPageInfo() {
  var currentPagePrefix = null;
  var currentPageIndex = 1;
  var lastSlashIndex = window.location.href.lastIndexOf("/");
  if(lastSlashIndex == window.location.href.length - 1) {
    currentPagePrefix = window.location.href.substring(0, lastSlashIndex);
  } else {
    var lastUrlPart = parseInt(window.location.href.substring(lastSlashIndex + 1));
    if(lastUrlPart) {
      currentPageIndex = lastUrlPart;
      currentPagePrefix = window.location.href.substring(0, lastSlashIndex);
    } else {
      currentPagePrefix = window.location.href;
    }
  }
  return { prefix: currentPagePrefix, index: currentPageIndex, minIndex: Math.max(1, currentPageIndex - 7), maxIndex: Math.max(15, currentPageIndex + 7) };
}


// =============================================================================
// ===  Userlist :: Highlight specified countries =============================
// =============================================================================

optimizeUserListListeners.push(function() {
  var profileNodes = document.evaluate("//div[@class='profileBox']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var highlightCountriesPrefsValue = GM_getValue("marvinateHighlightLanguages");
  var highlightCountries = highlightCountriesPrefsValue == null ? null : highlightCountriesPrefsValue.split(",");
  if(profileNodes != null && highlightCountries != null) {
    for(var i=0; i < profileNodes.snapshotLength; i++) {
      var profileNode = profileNodes.snapshotItem(i);
      var imageNode = document.evaluate("div[@class='profileDataBox']//span[@class='country']//img", profileNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
      for(var j=0; j < highlightCountries.length; j++) {
        if(highlightCountries[j].trim() == imageNode.getAttribute("alt")) {
          profileNode.setAttribute("style", "border: 2px solid green; margin: 1px 1px 1px 1px !important; background-color: #dddddd; position: relative; ");
        }
      }
    }
  }
});


// =============================================================================
// ===  Userlist :: Optimize boxes ============================================
// =============================================================================

optimizeUserListListeners.push(function() {
  var profileDetailBoxList = document.evaluate("//div[@class='profileBox']/div[@class='profileDataBox']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for(var i=0; i < profileDetailBoxList.snapshotLength; i++) {
    var profileDetailElement = profileDetailBoxList.snapshotItem(i);
    var statusMessageLink = document.evaluate("div[@class='profileDetailBox']//a", profileDetailElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    if(statusMessageLink != null && statusMessageLink.snapshotLength > 1) {
      var statusMessage = statusMessageLink.snapshotItem(1).innerHTML;
      if(statusMessage != null && statusMessage.length > 0) {
        for(var j=0; j < statusMessageLink.snapshotLength; j++) {
          statusMessageLink.snapshotItem(j).setAttribute("title", statusMessage);
        }
      }
    }
  }
});


// =============================================================================
// ==  Userlist :: Optimize pager =============================================
// =============================================================================

var pagerElementList = document.evaluate("//div[@class='pager']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if(pagerElementList.snapshotLength > 0) {

  var currentPageInfo = getCurrentPageInfo();
  var newPagerElement = MV_createElement("div", { "class": "marvinatePager" });
  newPagerElement.appendPageLink = function(pPageIndex, pActive) {
    var targetPageLink = currentPageInfo.prefix + "/" + String(pPageIndex);
    this.appendChild(MV_createElement("a", { "href": targetPageLink, "class": pActive ? "pagerLink pagerLinkActive" : "pageLink" }, pPageIndex));
  }

  newPagerElement.appendChild(MV_createElement("a", { "style": "border-left: 0", "href": "JavaScript:window.location.href = window.location.href;" }, "Reload page"));
  if(currentPageInfo.minIndex > 1) {
    newPagerElement.appendPageLink(1);
    if(currentPageInfo.minIndex > 2) {
      newPagerElement.appendChild(MV_createElement("span", { "style": "color: #FC531D;" }, "..."));
    }
  }
  for(var i=currentPageInfo.minIndex; i < currentPageInfo.maxIndex; i++) {
    newPagerElement.appendPageLink(i, i == currentPageInfo.index);
  }
  newPagerElement.appendChild(MV_createElement("span", { "style": "color: #FC531D" }, "..."));
  newPagerElement.appendChild(MV_createElement("a", { "href": "JavaScript:window.location.href = window.location.href;" }, "Reload page"));

  var pagerParentNode = pagerElementList.snapshotItem(0);
  pagerParentNode.innerHTML = "";
  pagerParentNode.appendChild(newPagerElement);

}


// =============================================================================
// ===  Userlist :: Optimize user list ========================================
// =============================================================================

function optimizeUserList() {
  for(var i=0; i < optimizeUserListListeners.length; i++) {
    optimizeUserListListeners[i]();
  }
}
optimizeUserList(); // When loading we call all the listeners


// =============================================================================
// ==  Userlist :: Integrate loading of further pages =========================
// =============================================================================

var pagerElementList = document.evaluate("//div[@class='pager']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if(pagerElementList.snapshotLength > 0) {

  var currentPageInfo = getCurrentPageInfo();

  function appendSearchResultSensitiveArea(pPageIndex) {
    var loadNextPageInnerDiv = MV_createElement("div", { "class": "marvinateNextPageArea" }, "Load next page (Page " + pPageIndex + ")");
    loadNextPageInnerDiv.addEventListener("click", function() { appendSearchResultPage(pPageIndex, loadNextPageInnerDiv); }, true);
    var loadNextPageOuterDiv = MV_createElement("div", { "class" : "marvinateNextPageAreaWrapper" });
    loadNextPageOuterDiv.appendChild(loadNextPageInnerDiv);
    var pagerElement = pagerElementList.snapshotItem(0);
    pagerElement.parentNode.insertBefore(loadNextPageOuterDiv, pagerElement);
  }

  function appendLoadedPageError(pRequest, pResponse, pException) {
    pRequest.pageDiv.innerHTML = "Cannot load next page (Page " + pRequest.pageIndex + ")" + (pException == null ? "" : (" [" + pException + "]"));
    pRequest.pageDiv.setAttribute("style", "background-color: #FC531D; color: #ffffff;");
  }

  function appendLoadedPageContent(pElement, pRequest, pResponse) {

    var directoryDivHeader = MV_createElement("div", { "class": "marvinateNextPageContent" });
    directoryDivHeader.appendChild(document.createTextNode("Results from page " + pRequest.pageIndex))
    directoryDivHeader.appendChild(MV_createElement("a", { "class": "marvinateButtonSmall", "href": currentPageInfo.prefix + "/" + pRequest.pageIndex }, "Reload page directly"));
    directoryDivHeader.appendChild(MV_createElement("a", { "class": "marvinateButtonSmall", "href": "JavaScript:window.location.href = window.location.href;" }, "Reload original page"));

    var directoryDivWrapper = document.createElement("div", { "class": "marvinateNextPageContentWrapper" });
    directoryDivWrapper.appendChild(directoryDivHeader);
    directoryDivWrapper.appendChild(pElement);
    pRequest.pageDiv.parentNode.insertBefore(directoryDivWrapper, pRequest.pageDiv);
    pRequest.pageDiv.parentNode.removeChild(pRequest.pageDiv);

    optimizeUserList();
    appendSearchResultSensitiveArea(pRequest.pageIndex + 1);

  }

  function appendSearchResultPage(pPageIndex, pDiv) {
    pDiv.innerHTML = "";
    pDiv.appendChild(MV_createElement("div", { "class": "marvinateNextPageWaiting" }, "Loading next page (Page " + pPageIndex + ")"));
    MV_sendRequest({
      url: currentPageInfo.prefix + "/" + pPageIndex,
      xpath: "//div[@id='directoryDiv']",
      onComplete: appendLoadedPageContent,
      onError: appendLoadedPageError,
      pageIndex: pPageIndex,
      pageDiv: pDiv
    });
  }

  // Inital next page area
  appendSearchResultSensitiveArea(currentPageInfo.index + 1);

}

// =============================================================================
// ===  Profile Detail :: Reformat video detail area ==========================
// =============================================================================

if(document.getElementById('profile-left-col') != null) {

  function openUserInPopup() {

    var lastSlash = window.location.href.lastIndexOf("/");
    var profileName = window.location.href.substring(lastSlash + 1);
    var rootUrl = window.location.href.substring(lastSlash);

    var newWindowBodyContent = "<div class=\"marvinateDetailTitle\" style=\"margin: 0px 0px 10px 0px\">";
    newWindowBodyContent += "Video for: <a target=\"_blank\" href=\"" + window.location.href + "\">" + profileName + "</a> &nbsp; <input class=\"marvinateButtonSmall\" type=\"button\" value=\"Reload video area\" id=\"marvinateReload\" /></div>";
    newWindowBodyContent += document.getElementById('Cam4VChat').innerHTML;

    var newWindowContent = "<html><head><title>cam4 [" + profileName + "]</title></head>";
    newWindowContent += "<body id=\"marvinateBody\">" + newWindowBodyContent + "</body></html>";

    var newWindow = window.open("about:blank", "", "width=950,height=550");
    newWindow.document.writeln(newWindowContent);
    newWindow.document.close();

    function makeReloadable() {
      var newWindowBodyElement = newWindow.document.getElementById('marvinateBody');
      var reloadLink = newWindow.document.getElementById('marvinateReload');
      reloadLink.addEventListener("click", function() {
        newWindowBodyElement.innerHTML = newWindowBodyContent;
        makeReloadable();
      }, true);
    }
    makeReloadable();

  }

  var nicknameResult = document.evaluate("//h1[@class='profileName']/a", document, null, XPathResult.STRING_TYPE, null);
  if(nicknameResult != null) {
    document.title = nicknameResult.stringValue + " [cam4.com]";
  }

  var camPanel = document.getElementById('camPaneBig') == null ? document.getElementById('camPaneSmall') : document.getElementById('camPaneBig');
  var flashObjectElement = document.getElementById('Cam4VChat');
  if(flashObjectElement != null && camPanel != null) {

    var actionsPanel = MV_createElement("div", { "class": "marvinateDetailActions" });

    var tippingDiv = document.getElementById('tippingDiv');
    if(tippingDiv != null) {
      tippingDiv.visible = GM_getValue("marvinateShowTippingArea");
      tippingDiv.setAttribute("style", tippingDiv.visible ? "display: inline-block; " : "display: none; ");
      tippingDiv.showOrHide = function() {
        if(tippingDiv.visible) {
          document.getElementById('tippingDiv').setAttribute("style", "display: none; ");
          tippingDiv.visible = false;
        } else {
          document.getElementById('tippingDiv').setAttribute("style", "display: inline-block; ");
          tippingDiv.visible = true;
        }
      }
      actionsPanel.appendChild(MV_createButton({ "class": "marvinateButton", "value": "Show/Hide tipping area" }, tippingDiv.showOrHide));
    }
    actionsPanel.appendChild(MV_createButton({ "class": "marvinateButton", "value": "Open broadcast in popup window" }, openUserInPopup));

    camPanel.setAttribute("style", "display: block; padding: 5px; margin: 2px 4px 8px 10px; border: 2px solid #FFE1D7; height: auto; ");
    camPanel.appendChild(actionsPanel);

  }

}


// =============================================================================
// ===  Includes ==============================================================
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
