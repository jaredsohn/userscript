// ==UserScript==
// @name          Endless Forum Pages
// @namespace     http://squarefree.com/userscripts
// @description   Makes phpBB forum pages infinitely long instead of limited to 15 posts per page by loading more when you scroll to near the bottom of the page.
// @author        Jesse Ruderman - http://www.squarefree.com/
// @include       http://forums.mozillazine.org/viewtopic.php*
// @include       http://steelgryphon.com/blue/viewtopic.php*
// ==/UserScript==


var nextURL = null; // the URL for next, or null for pending/none
var nextLinkNode = null; // the node of the "Next" link
var mainTable = null;
window.addEventListener("load", init, false);

// Check the scroll position on a timer because we can't use onscroll (bug 189308).
// If we do switch to onscroll, remember to call testScrollPosition after changing the page.
setInterval(testScrollPosition, 100);


function init() 
{ 
  mainTable = findMainTable(document);
  nextLinkNode = findNextLink(document);
  setNextURL(document);
}


function testScrollPosition() 
{
  if ((nextURL != null) && (document.body.offsetHeight - document.body.scrollTop < 2.5 * window.innerHeight)) {

    // We're near the bottom of the page; one press of pgdn could get close to the bottom of the page.
    // (At about 1.9 * window.innerHeight, one press of pgdn would actually hit the bottom of the page.)
    pullMore();
  }
}


function pullMore()
{
  var iframe = document.createElement("iframe");
  iframe.addEventListener("load", whee, false);
  iframe.width = 1;
  iframe.height = 1;
  iframe.style.display = "none";
  iframe.src = nextURL;
  document.body.appendChild(iframe);

  // Don't pull this more than once.
  nextURL = null;

  function whee() {
    var iframeDoc = iframe.contentDocument;

    // Update nextURL for when we reach the bottom of the page again.
    setNextURL(iframeDoc);

    // Update the "Next" link in the page to make it a little less confusing.
    // Commented out because updating the "Next" link at the top of the page but not the one at
    // the bottom of the page is no good.
    // nextLinkNode.href = nextURL || "javascript:alert('No more!')";
    
    removeQuickReply(mainTable);

    // Move posts into the main page's table.
    siphon(findMainTable(iframeDoc), mainTable);

    // Get rid of the iframe to free memory once it's GCed and so on.
    // Use a setTimeout to work around bug 305471 and to spread out the CPU usage to keep Firefox responsive.
    setTimeout( function() { iframe.parentNode.removeChild(iframe); }, 1500);
  }
}


function findMainTable(doc)
{
  for (var table,i=0; table=doc.getElementsByTagName("table")[i]; ++i)
    if (table.className == "forumline")
      return table;

  return null;
}

function findNextLink(doc)
{
  for (var link,i=0; link=doc.links[i]; ++i)
    if (link.innerHTML == "Next" && link.getAttribute("href").substr(0,10) == "viewtopic.")
      return link;

  return null;
}

function setNextURL(doc)
{
  var nextLink = findNextLink(doc)

  if (nextLink)
    nextURL = nextLink.href;
}

// Active topics have a "Quick Reply" textarea at the bottom of each page.
// This function removes it so you only have to see the last "Quick Reply" box on the page.
function removeQuickReply(table)
{
  var lastRow = lastRowOf(table);
  if (lastRow.getElementsByTagName("textarea")[0] != null) {
    lastRow.parentNode.removeChild(lastRow);
    
    // Remove the second-to-last row too.
    var lastRow = lastRowOf(table);
    lastRow.parentNode.removeChild(lastRow);
  }
}

function lastRowOf(table)
{
  return table.tBodies[0].rows[table.tBodies[0].rows.length - 1];
}

function siphon(sourceTable, destTable)
{
  var row;
  while ((row = sourceTable.rows[0]))
    destTable.tBodies[0].appendChild(row);
}
