// Google Groups - Single Page Listings
// version 0.1
// 2008-08-30
// Copyright (c) 2008, Julien Couvreur
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
//
// ==UserScript==
// @name            Google Groups - Single Page Listings
// @namespace	http://blog.monstuff.com/archives/cat_greasemonkey.html
// @description    Combines the multi-page listings on groups.google.com into single-page views with endless scrolling. For example: http://groups.google.com/group/greasemonkey-users/topics
// @include         http://groups.google.com/*
// ==/UserScript==



// make a url with page parameter incremented
function makeNextUrl(baseUrl, pageNumber) {

// GHV=1 Topic summary: 10 per page
// GHV=2 Topic list: 30 per page
  var itemsPerPage = 10;
  // if (document.cookie.match(/GHV=2/) != null) { itemsPerPage = 30; }
  // TODO: fix the Topic list view

  var nextUrl = baseUrl + "?start=" + (pageNumber * 10) + "&sa=N";
  return nextUrl;
}

function getNextPage(href, pageNumber, doneCallback) {   
  var loadingHref = makeNextUrl(href, pageNumber);
  GM_log("loading next url: " + loadingHref);

// handle last page
  GM_xmlhttpRequest({
      method: 'GET',
      url: loadingHref,
      onload: function(responseDetails) {
        var iframeOnload = function() {
          var iframeDoc = iframe.contentDocument;
          iframeDoc.getElementsByTagName("body")[0].innerHTML = responseDetails.responseText;
	            
          injectContent(iframeDoc);
          doneCallback(responseDetails.responseText);            
       };
       
       var iframe = createIframe(iframeOnload);
     }
  });
}

function getContent(doc) {
  var xpath = "//div[@class='maincontoutboxatt'][last()]";
  return getNode(doc, xpath);
}

function cleanIFrame(iframeDoc) 
{
/*
    var node1 = getNode(iframeDoc, "//h1");
    if (node1) {
        node1.parentNode.removeChild(node1);
    }
*/
}

function createIframe(onload) {
    var iframe = document.createElement("iframe");
    iframe.addEventListener("load", onload, false);
    iframe.src = "about:blank";
    iframe.style.width = '0px';
    iframe.style.height = '0px';
    //iframe.style.width = '1000px';
    //iframe.style.height = '100px';
    
    iframe.style.border = '0px';    
    document.getElementsByTagName('body')[0].appendChild(iframe);
    return iframe;
}

function hasReachedEnd(loadedText) {
  return (loadedText.match("This group has no topics.") != null);
}

function monitorScrolling(){
  var isUpdating = false;
  var currentPage = 1;
  var checkInterval = 100; // how frequently to check the scroll status
  var preloadDistance = 1000; // how far from the bottom of the page should we start pre-loading the next page
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

  var loaded = function(loadedText) {
    isUpdating = false;
    hideLoading();
    
    if (hasReachedEnd(loadedText)) {
      clearInterval(timer);
    }
  }

  var startTimer = function() {
    timer = setInterval(check, checkInterval);
  }

  var showLoading = function() {
    spinner = document.createTextNode("Loading...");

    var contentNode = getContent(document);
    var separatorDiv = document.createElement("div");
    separatorDiv.innerHTML = "<hr><b>Page " + (currentPage+1) + "</b>";
    contentNode.appendChild(separatorDiv);

    getContent(document).appendChild(spinner);
  }

  var hideLoading = function() {
    spinner.parentNode.removeChild(spinner);
  }

  startTimer();
}


function injectContent(iframeDoc) 
{
    GM_log("processing new content");

    //cleanIFrame(iframeDoc);
    
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

    // remove the iframe
    // TODO
}

function getNode(iframeDoc, xpath) {
    GM_log("looking for xpath: " + xpath + " in doc: " + iframeDoc);

    var result = iframeDoc.evaluate(xpath, iframeDoc, null,
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

// http://groups.google.com/group/ubiquity-firefox/topics
// http://groups.google.com/group/ubiquity-firefox/topics?start=10&sa=N



// if this is the first page of an article...
if (document.location.href.match(/\/topics/) != null &&
   document.location.href.match(/\?start/) == null &&
   document.cookie.match(/GHV=1/) != null ) 
{
    GM_log("found matching url");

    monitorScrolling();
}
