// ==UserScript==
// @name           TWoP Single Page Recaps
// @version        0.6
// @author         Maik Zumstrull <maik@zumstrull.net>
// @description    Combines TWoP's multi-page recaps into one page
// @namespace      http://greasemonkey.zumstrull.net/
// @include        http://www.televisionwithoutpity.com/show/*
// ==/UserScript==

/* GLOBAL VARIABLES */

var debug = false;

var pages = new Array();
var p_have = 0;
var p_want = 0;

/* FUNCTIONS */

function debugMsg (msg) {
  if (debug) { GM_log (msg); }
}

function xpath_first_rel (query, node) {
  var result = document.evaluate (
    query, node, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
  );
  if (result) {
    return result.singleNodeValue;
  } else {
    return null;
  }
}

function xpath_all_rel (query, node) {
  return document.evaluate (
    query, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
  );
}

function xpath_first (query) { return xpath_first_rel (query, document); }
function xpath_all (query) { return xpath_all_rel (query, document); }

function parseHTML (htmlstring) {
  var newdoc = document.createElement ('div');
  newdoc.innerHTML = htmlstring;
  return newdoc;
}

function find (a, k) {
  for (var i = 0; i < a.length; i++) {
    if (a[i] == k) {
      return i;
    }
  }
  return -1;
}

function unlink (node) {
  node.parentNode.removeChild (node);
}

function unlink_all (query) {
  var nodes = xpath_all (query);
  for (var i = 0; i < nodes.snapshotLength; i++) {
    unlink (nodes.snapshotItem (i));
  }
}

function removePageLinks () {
  debugMsg ("Removing page links.");
  unlink_all ('//p[@class="pages"]');
}

function renderPage (page) {
  debugMsg ("Rendering page " + page + ".");
  var doc = pages[page];
  var recapdiv = xpath_first ('//div[@class="body_recap" or @class="blog_post"]');
  if (!recapdiv) {
    recapdiv = document.body;
  }
  if (doc) {
    {
      var pagelinks = xpath_all_rel (
        './descendant::p[@class="pages"]', doc
      );
      for (var i = 0; i < pagelinks.snapshotLength; i++) {
        unlink (pagelinks.snapshotItem (i));
      }
    }

    var story =
      xpath_first_rel (
        './descendant::div[@class="body_recap" or @class="blog_post"]',
        doc
      );

    while (story.firstChild) {
      var node = story.firstChild;
      story.removeChild (node);
      recapdiv.appendChild (node);
    }
  }
}

function removeDuplicateImages () {
  var allimages = xpath_all ('//img');
  var seen = new Object();

  for (var i = 0; i < allimages.snapshotLength; i++) {
    var image = allimages.snapshotItem (i);
    if (seen[image.src]) {
      unlink (image);
    } else {
      seen[image.src] = true;
    }
  }
}

function handleResponse (pageno, url, failedAttempts, request) {
  debugMsg (
    "Handling response for download " + pageno
    + ", " + failedAttempts + " previous failed attempts"
  );

  if (request.readyState == 4) {
    if (request.status == 200) {
      var doc = parseHTML (request.responseText);
      if (doc) {
        debugMsg ("Download " + pageno + ": Page retrieved successfully.");
        pages[pageno] = doc;
        p_have++;
        if (p_have >= p_want) {
          debugMsg ("All pages retrieved, rendering...");
          for (var i = 0; i < p_want; i++) {
            renderPage (i);
          }
          removeDuplicateImages ();
          unlink_all ("//p[not(node())]");
        }
        return;
      }
    }
  }

  if (failedAttempts <= 2) {
    dispatchDownload (url, failedAttempts + 1);
  }
}

function dispatchDownload (pageno, url, failedAttempts) {
  var request = new XMLHttpRequest ();
  if (request) {
    request.open ('GET', url, true);
    request.addEventListener (
      'load',
      function (event) {
        handleResponse (pageno, url, failedAttempts, request);
      },
      false
    );
    request.send (null);
    debugMsg (
      "Download " + pageno + " dispatched: "
      + url
      + ", " + failedAttempts + " previous failed attempts"
    );
  } else {
    GM_log ("Failed to get a XMLHttpRequest object!", 2);
  }
}

function getRemainingPages (event) {
  event.preventDefault ();
  debugMsg ("getRemainingPages called.");
  var allpagelinks = xpath_all ('//p[@class="pages"]/a');
  
  var pageurls = Array();

  {
    var i = 0;
    if (
      (i < allpagelinks.snapshotLength) &&
      (allpagelinks.snapshotItem (i).textContent == "Previous")
    ) {
      var previousurl = allpagelinks.snapshotItem (i).href;
      i++;
      while (
        (i < allpagelinks.snapshotLength) &&
        (allpagelinks.snapshotItem (i).href != previousurl)
      ) { i++; }
      i++;
    }
    while (
      (i < allpagelinks.snapshotLength) &&
      (!isNaN (parseInt (allpagelinks.snapshotItem (i).textContent)))
    ) {
      var url = allpagelinks.snapshotItem (i).href;
      debugMsg ("Will retrieve page at " + url);
      pageurls.push (url);
      i++;
    }
  }

  removePageLinks ();

  p_want = pageurls.length;

  for (var i = 0; i < pageurls.length; i++) {
    dispatchDownload (i, pageurls[i], 0);
  }
}

/* INSERTER CODE */

{
  var pagelinks = xpath_first ('//p[@class="pages"]');
  if (pagelinks) {
    var link = document.createElement ('a');
    link.appendChild (document.createTextNode ("View as One Page"));
    link.setAttribute ('href', '/');
    link.addEventListener ('click', getRemainingPages, false);
    pagelinks.appendChild (link);
  }
}

