// ==UserScript==
// @name        TwoP unpaged recaps
// @namespace   http://blairmitchelmore.com/greasemonkey/twop
// @description Retrieves the other pages of a long recap and fills in the blanks on the existing page
// @include     http://televisionwithoutpity.com/*
// @include     http://*.televisionwithoutpity.com/*
// @description Version 1.1.6
// ==/UserScript==

var getUrlParam = function(url, param) {
  return Number(url.substr(url.indexOf("?") + 1).split("&").filter(function(element) {
    try {
      return element.split("=")[0] == param;
    } catch(e) { }
    return false;
  }).map(function(element) {
    return element.split("=")[1];
  })[0]) || 0;
};

var addGlobalStyle = function(css) {
  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (!head) { return; }
  style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  head.appendChild(style);
  return style;
};

var lighten = function(colour) {
  var match, rgb = [], regex = /[0-9]+/gm, colourString = colour.toString();
  while (match = regex.exec(colourString)) {
    var calc = (parseFloat(match[0]) || 0) * 1.1;
    rgb.push(Math.max(0, Math.min(255, calc)));
  }
  return "rgb(" + rgb.join(",") + ")";
};

var currentPage = getUrlParam(location.search, "page");
var selectedPage = currentPage == 0 ? (currentPage = 1, 0) : currentPage;

var recap = document.evaluate("//div[@class='body_recap']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
var pageListing = document.evaluate("//*[contains(@class,'article_pages')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

if (recap) {
  var recap_contents, recap_wrapper = document.createElement("div");
  
  var addHighlightKiller = function(node) {
    node.className = "highlighted";
    var singleClick = function() {
      this.className = this.className == "highlighted" ? "" : "highlighted";
    };
    node.addEventListener("click", singleClick, false);
    node.addEventListener("dblclick", function() {
      node.removeEventListener("click", singleClick, false);
      node.removeEventListener("dblclick", arguments.callee, false);
    }, false);
  };
  
  // move the page listing outside of the recap content
  pageListing = recap.parentNode.insertBefore(pageListing, recap);
  
  // find the page links
  var links = document.evaluate("//ul[@class='pages' and position() = 1]//a[not(contains(.,'Prev')) and not(contains(.,'Next'))]", pageListing, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
  
  // move this page into its own div
  recap_wrapper.innerHTML = recap.innerHTML;
  recap.innerHTML = "";
  recap.appendChild(recap_wrapper);
  
  // set the id of the current page's div
  recap_wrapper.id = "Page_" + currentPage;
  
  if (selectedPage == currentPage) {
    addHighlightKiller(recap_wrapper);
  }
  
  for (var i = 0; i < links.snapshotLength; ++i) {
    var url = links.snapshotItem(i).href;
    var pageNumber = getUrlParam(url, "page");
    
    if (pageNumber != currentPage) {
      var event = (function(num) {
        var wrapper = document.createElement("div");
        wrapper.id = "Page_" + num;
        
        var message = document.createElement("p");
        message.appendChild(document.createTextNode("Loading content from page " + num + "."));
        wrapper.appendChild(message);
        wrapper.className = "loading";
        
        // Find the proper place to put the content
        if (num < currentPage) {
          for (var j = num + 1; j <= currentPage; ++j) {
            var sibling = document.getElementById("Page_" + j);
            if (sibling) {
              sibling.parentNode.insertBefore(wrapper, sibling);
              break;
            }
          }
        } else {
          for (var j = num - 1; j >= currentPage; --j) {
            var sibling = document.getElementById("Page_" + j);
            if (sibling) {
              sibling.parentNode.insertBefore(wrapper, sibling.nextSibling);
              break;
            }
          }
        }
        
        return function(response) {
          var html = response.responseText;
          var start = html.indexOf("<div class=\"body_recap\">");
          var end = html.indexOf("</div", start);
          var html_frag = html.substr(start+25, end-start);
          var frag = document.createElement("div");
          frag.innerHTML = html_frag;
          wrapper.className = "";
          if (num == selectedPage)
            addHighlightKiller(wrapper);
          wrapper.innerHTML = frag.innerHTML;
          var links = document.evaluate("//*[contains(@class,'article_pages')]", wrapper, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
          if (links)
            wrapper.removeChild(links);
        };
      })(pageNumber);
      
      // get the content for the other page
      GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        headers: {
          'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
          'Accept': 'text/html',
        },
        onload: event
      });
    }
  }
  
  if (pageListing)
    pageListing.parentNode.removeChild(pageListing);
  
  var subheader = document.evaluate("//div[contains(@class,'report_card')]//span[contains(.,'Episode Report Card')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  var style = document.defaultView.getComputedStyle(subheader, null);
  var backgroundColor = style.getPropertyValue("background-color");

  addGlobalStyle("div[id^=Page_][class=loading] {\
    background-color:" + backgroundColor + ";\
    padding:5px;\
    clear:both;\
    margin:5px;\
  }");
  addGlobalStyle("div[id^=Page_][class=highlighted] {\
    background-color:" + lighten(backgroundColor) + ";\
    border:1px solid " + backgroundColor + ";\
    padding:5px;\
  }");
}