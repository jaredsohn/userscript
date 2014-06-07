// IEEE - Single Page Results
// version 0.1
// 2008-06-02
// Copyright (c) 2008, Julien Couvreur
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            IEEE - Single Page Results
// @namespace	http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description    Combines the multi-page results on IEEE Xplore into single-page view with endless scrolling.
// @include         http://ieeexplore.ieee.org/xpl/tocresult.jsp?*
// ==/UserScript==

// make a url with page parameter incremented
function makeNextUrl(baseUrl, pageNumber) {
  var resultsPerPage = 25;

  var nextUrl = baseUrl + "&ResultStart=" + (pageNumber * resultsPerPage) + "&page=" + pageNumber;
  return nextUrl;
}

// point to the interesting div with the results
function getContent(doc) {
  var xpath = "//table[@id='gm_res'][last()]";
  return getNode(doc, xpath);
}

function cleanIFrame(iframeDoc) 
{
  // give a name to the interesting div in the results
  var resTable = getNode(iframeDoc, "//span[contains(text(),'View:')]/../../../../../../../../..");
  resTable.setAttribute("id", "gm_res");

  var searchNode = getNode(iframeDoc, "tbody/tr", resTable);
  searchNode.parentNode.removeChild(searchNode);

  var newTable = iframeDoc.createElement("table");
  newTable.appendChild(searchNode);  
  resTable.parentNode.insertBefore(newTable, resTable);

  for (var count = 0; count < 3; count++) {
    var delNode1 = getNode(iframeDoc, "tbody/tr", resTable);
    delNode1.parentNode.removeChild(delNode1);
  }

  for (var count = 0; count < 7; count++) {
    var delNode1 = getNode(iframeDoc, "tbody/tr[last()]", resTable);
    delNode1.parentNode.removeChild(delNode1);
  }
}


function getNextPage(href, pageNumber, doneCallback) {   
  var loadingHref = makeNextUrl(href, pageNumber);
  GM_log("loading next url: " + loadingHref);


  var iframeOnload = function() {
     var iframeDoc = iframe.contentDocument;
     //iframeDoc.getElementsByTagName("body")[0].innerHTML = responseDetails.responseText;
	            
     injectContent(iframeDoc);
     doneCallback();            
  };
       
  var iframe = createIframe(loadingHref, iframeOnload); 

}


function createIframe(url, onload) {
    var iframe = document.createElement("iframe");
    iframe.addEventListener("load", onload, false);
    iframe.src = url;
    iframe.style.width = '0px';
    iframe.style.height = '0px';
    //iframe.style.width = '1000px';
    //iframe.style.height = '100px';
    
    iframe.style.border = '0px';    
    document.getElementsByTagName('body')[0].appendChild(iframe);
    return iframe;
}


function monitorScrolling(){
  var isUpdating = false;
  var currentPage = 0;
  var checkInterval = 100; // how frequently to check the scroll status
  var preloadDistance = 200; // how far from the bottom of the page should we start pre-loading the next page
  var isUpdating = false;
  var timer;
  var spinner;

  var check = function() {
    //GM_log("checking for scroll status: " + scrollPosFromBottom());

    if ( isUpdating == false
               && scrollPosFromBottom() < preloadDistance)
    {
      isUpdating = true;
      showLoading();
      currentPage++;
      getNextPage(document.location.href, currentPage, loaded);
    }
  }

  var loaded = function() {
    isUpdating = false;
    hideLoading();
  }

  var startTimer = function() {
    timer = setInterval(check, checkInterval);
  }

  var showLoading = function() {
    spinner = document.createTextNode("Loading...");

    var contentNode = getContent(document);

    var separatorDiv = document.createElement("div");
    separatorDiv.innerHTML = "<hr><b>Page " + (currentPage+2) + "</b>";
    contentNode.appendChild(separatorDiv);

    contentNode.appendChild(spinner);
  }

  var hideLoading = function() {
    spinner.parentNode.removeChild(spinner);
  }

  startTimer();
}


function injectContent(iframeDoc) 
{
    GM_log("processing new content");

    cleanIFrame(iframeDoc);
    
    // Take the interesting part out of the iframe
    // and stick it right after the interesting part in the main document
    
    var dest = getContent(document);
    GM_log("looking for destination: " + dest);
    if (dest != null) 
    {    
        GM_log("found destination content and position");

        var source = getContent(iframeDoc);
        GM_log("looking for source: " + source);

        if (source != null) 
        {
            GM_log("found source content");
            dest.parentNode.insertBefore(source, dest.nextSibling);
        }
    }
}

function getNode(iframeDoc, xpath, contextNode) {
    GM_log("looking for xpath: " + xpath + " in doc: " + iframeDoc + " starting at node: " + contextNode);

    if (!contextNode) {
       contextNode = iframeDoc;
    }

    var result = iframeDoc.evaluate(xpath, contextNode, null,
                                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    if (result.snapshotLength > 0) {
        return result.snapshotItem(0);
    }

    GM_log("no content found");
    return null;
}


function scrollPosFromBottom() {
  return parseInt(document.body.offsetHeight) - parseInt(self.pageYOffset) - parseInt(self.innerHeight);
}

// ******************************* Main logic ******************************* //

// if this is the first page of an article...
if (document.location.href.match(/\&ResultStart=/) == null) 
{
    GM_log("found matching url");
    document.title = document.title.replace(/Welcome to IEEE Xplore 2.0: /, "IEEE: "); 

    cleanIFrame(document); // re-organize the result page a little
    monitorScrolling();
}

