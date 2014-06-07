// ==UserScript==
// @name          Bugzilla See Earlier Comments
// @namespace     http://jmason.org/software
// @description   Display previous comments on a bug, when viewing the Bugzilla 'create new attachment' page.  Thanks to Jesse Ruderman - http://www.squarefree.com/ - for the nifty iframe-transclusion trick.
// @author        Justin Mason - http://jmason.org/
// @include       http://bugzilla.*/attachment.cgi*
// @include       http://bugs.*/attachment.cgi*
// @include       http://issues.*/attachment.cgi*
// ==/UserScript==

var commentsUrl = null; // the URL, or null for pending/none
var entryForm = null;

// the new HTML that will be added after the textbox 'entryform', to hold
// transcluded comments.  Note that the first DOM child of div
// id='transcluded_comments' will be removed and replaced by the comments,
// once they're loaded.
var newHtmlChunk = 
        "<div style='border: 1px; border-style: dashed; "+
             "padding: 1px 10px 10px 10px;'> "+
        "<h4>Description And Earlier Comments:</h4> "+
        "<div id='transcluded_comments' style='border: 10px; '>"+
        "<span class='transcluded_comments_loading'>"+
             "<em>Loading...</em></span>"+
        "</div></div>";

// do all the hard work after the page is loaded, and from a timer
window.addEventListener("load", init, false);
setInterval(loadComments, 500);


function init() 
{
  // find the 'entryform' textbox; we'll be adding our new nodes after
  // that one.

  var nodes;
  nodes = document.evaluate(
        "//form[contains(@name,'entryform')]",
        document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

  if (nodes) {
    entryForm = nodes.snapshotItem(0);
  } else {
    //GM_log("failed to find entryform");
    return;
  }

  // extract the good bits from the page's URL
  var url = document.URL;
  var bugidRe = new RegExp("^(.*)attachment.cgi\\?.*?bugid=(\\d+)");
  var m = bugidRe.exec(url);
  if (m != null) {
    var urlBase = m[1];
    var bugId = parseInt(m[2]);
    commentsUrl = urlBase+"show_bug.cgi?id="+bugId;
  }

  // and now, all that stuff is saved for when loadComments() runs
}

function loadComments() 
{
  // have we got the data we need yet?
  if (commentsUrl == null) { return; }
  if (entryForm == null) { return; }

  // add in the HTML framework, complete with "loading..." indicator
  var newspan = document.createElement("span");
  newspan.innerHTML = newHtmlChunk;
  document.body.insertBefore(newspan, entryForm.nextSibling);

  // this (very nifty) trick is largely nicked from Jesse Ruderman's "endless
  // forum pages" script.  cheers ;)
  var iframe = document.createElement("iframe");
  iframe.addEventListener("load", whee, false);
  iframe.width = 1;
  iframe.height = 1;
  iframe.style.display = "none";
  iframe.src = commentsUrl;
  document.body.appendChild(iframe);

  // Don't load this more than once.
  commentsUrl = null;

  function whee() {
    var iframeDoc = iframe.contentDocument;

    var nodes = document.evaluate(
          "//div[contains(@id,'transcluded_comments')]",
          document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    var appendCursor = nodes.snapshotItem(0);

    // remove the "waiting" indicator
    appendCursor.removeChild(appendCursor.firstChild);

    // we want both the pre id='comment_text_N' *and* the
    // <span class='bz_comment'> nodes.
    nodes = iframeDoc.evaluate(
          "//div/pre[contains(@id,'comment_text_')]|"+
          "//div/span[contains(@class,'bz_comment')]",
          iframeDoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    for(div = null, i = 0; (div = nodes.snapshotItem(i)); i++) {
      appendCursor.appendChild(div);
    }

    // Get rid of the iframe to free memory once it's GCed and so on.
    // Use a setTimeout to work around bug 305471 and to spread out
    // the CPU usage to keep Firefox responsive.
    setTimeout( function() { iframe.parentNode.removeChild(iframe); }, 1500);
  }
}

