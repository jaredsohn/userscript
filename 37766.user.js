// ==UserScript==
// @name           Endless Danbooru Comments
// @namespace      2345-Namespace
// @description    Endless Comments page on Danbooru
// @include        http://danbooru.donmai.us/comment*
// ==/UserScript==

var mainTable = null;

var nextPage = null;      // the number of the next page
var lastPage = null;
var danbooruURL = "http://" + window.location.host + "/comment";
var danbooruQuery = "?page=";
var pending = false;

var crlf = String.fromCharCode(10) + String.fromCharCode(13);

window.addEventListener("load", init, false);
window.addEventListener("scroll", testScrollPosition, false);

function init() { 
  mainTable = findMainTable(document);

  // structure of paginator is -
  // [previous] [first] [text node elipsis] [page -2] [page -1] [text node current page] [page +1] [page +2] [text node elipsis] [last] [next]

  if (document.evaluate("//div[@id='paginator']/div[@class='pagination']/a[text()='>>']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue) {
    // if the paginator has a '>>' "next page" element then get the next page number and the last page number.
    nextPage = Number(document.evaluate("//div[@id='paginator']/div[@class='pagination']/span[@class='current']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent) + 1;
    // element before >> contains the last page number, remove any commas
    lastPage = Number(document.evaluate("//div[@id='paginator']/div[@class='pagination']/a[text()='>>']/preceding-sibling::*[1]", document, null, XPathResult.STRING_TYPE, null).stringValue.replace(",", "", "g"));
  }
//  testScrollPosition();
}

function testScrollPosition() {
  if ((!pending) && ((nextPage <= lastPage) && (window.innerHeight + window.scrollMaxY) - window.pageYOffset < 2.5 * window.innerHeight)) {
    // We're near the bottom of the page; one press of pgdn could get close to the bottom of the page.
    // (At about 1.9 * window.innerHeight, one press of pgdn would actually hit the bottom of the page.)
    pullMore();
  }
}

function pullMore() {

  var iframe = document.createElement("iframe");
  iframe.addEventListener("load", pullingMore, false);
  iframe.width = 1;
  iframe.height = 1;
  iframe.style.visibility = "hidden";
  iframe.src = danbooruURL + danbooruQuery + nextPage;
  document.body.appendChild(iframe);

  function pullingMore(responseDetails) {

    // copy posts from retrived page to current page.
    siphon(findMainTable(iframe.contentDocument), mainTable);

    // clear the pending request marker and increment to the next page number
    pending = false;
    nextPage += 1;

    // remove the iframe
    setTimeout( function() { iframe.parentNode.removeChild(iframe); pending = false; }, 1500);    
  }
  pending = true;
}

function findMainTable(doc) {
  return doc.evaluate("//div[@id='comment-list']", doc, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
}

function siphon (source, destination) {
  var child, oldChild, paginator;
  paginator = document.getElementById("paginator");

  // add a HR and page number every (10 pages)
  if (((nextPage % 10) == 0) && (nextPage+1 <= lastPage) ) {
    var hrTag = null, hTag = null, a2Tag = null;

    hrTag = document.createElement("hr");
    hrTag.style.clear = "both";
    hTag = document.createElement("h2");
    aTag = document.createElement("a");
    aTag.href = danbooruURL + danbooruQuery + nextPage;
    aTag.textContent = "Page " + String(nextPage);

    hTag.appendChild(aTag, paginator)
    oldchild = paginator.parentNode.insertBefore(hTag, paginator);
    oldchild = paginator.parentNode.insertBefore(hrTag, paginator);
  }

  while ((child = source.childNodes[0])) {
    if (child.className == "post") {
      oldchild = paginator.parentNode.insertBefore(child, paginator);
      //destination.appendChild(child);
    } else {
      oldChild = child.parentNode.removeChild(child)
    }
  }
}
