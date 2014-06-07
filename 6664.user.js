// ==UserScript==
// @name          Google More Links
// @namespace     http://loucypher.wordpress.com/
// @include       http://*.google.com/*
// @description	  Add more links to More link
// ==/UserScript==

// Last updated: 2008-02-26

(function() {
  var more = document.getElementById("gbardd") ||
             getXPathNode("//span[@class='gb3']"); 
  if (!more) return;

  var query = document.evaluate("//input[@name='q']",
                                document, null, 9, null).singleNodeValue;

  var moreLinks = [
      { text: "Bookmarks",
        href: "http://www.google.com/bookmarks/find" },
      { text: "Calendar",
        href: "http://www.google.com/calendar/render" },
      { text: "Catalog",
        href: "http://catalogs.google.com/catalogs" },
      { text: "Code Search",
        href: "http://www.google.com/codesearch" },
      { text: "Music Search",
        href: "http://www.google.com/musicsearch?q=" },
      { text: "News Archive",
        href: "http://news.google.com/archivesearch" },
      { text: "Notebook",
        href: "http://www.google.com/notebook/search" },
      { text: "Directory",
        href: "http://www.google.com/search?cat=gwd/Top" }

      //more links to come

  ];

  var moreLink;
  for (var i = 0; i < moreLinks.length ; i++) {
    moreLink = moreLinks[i];
    if (query && (query.value != "") && !moreLink.href.match(/musicsearch/)) {
      moreLink.href += moreLink.href.indexOf("?") > 0 ? "&q=" : "?q=";
      moreLink.href += query.value;
    } else {
      moreLink.href += query.value;
    }
    addLink(more, moreLink.text, moreLink.href);
  }

  // Optional: 2-column menu
  if (more.id == "gbardd") {
    more.style.width = "30ex";
    if (typeof opera != "object") {
      // Firefox
      more.style.MozColumnCount = "2";
    } else {
      // Opera
      var divL = document.createElement("div");
      divL.style.cssFloat = "left";
      divL.style.width = "50%";
      var divR = divL.cloneNode(false);
      var links = more.childNodes.length;
      for (var j = 0; j < links; j++) {
        if (j < links / 2) {
          divL.appendChild(more.firstChild);
        } else {
          divR.appendChild(more.firstChild);
        }
      }
      more.appendChild(divL);
      more.appendChild(divR);
    }
  }

  function addLink(aNode, aText, aURL) {
    var newLink, newDiv;
    if (aNode.id == "gbardd") {
      if (location.search == aURL.match(/\?\S+/)) {
        newLink = insertNode("b", aNode, aNode.lastChild);
      } else {
        newLink = insertNode("a", aNode, aNode.lastChild);
        newLink.setAttribute("onclick", "gbar.close(event)");
        newLink.href = aURL;
      }
    } else {
      newDiv = insertNode("span", aNode.parentNode,
                                  aNode.parentNode.lastChild.previousSibling);
      newDiv.className = "gb2";
      newDiv.style.display = "none";
      newDiv.style.left = "291px";
      newDiv.style.top = "25px";
      newLink = appendNode("a", newDiv);
      newLink.href = aURL;
    }
    appendText(newLink, aText);
    if (location.hostname == "mail.google.com") {
      newLink.setAttribute("target", "_blank");
    }
  }

  function getXPathNode(aXPath) {
    return document.evaluate(aXPath, document, null, 0, null).iterateNext();
  }

  function appendNode(aStrNewNode, aParentNode) {
    return aParentNode.appendChild(document.createElement(aStrNewNode));
  }

  function insertNode(aStrNewNode, aParentNode, aNode) {
    return aParentNode.insertBefore(document.createElement(aStrNewNode), aNode);
  }

  function appendText(aParentNode, aText) {
    return aParentNode.appendChild(document.createTextNode(aText));
  }

})()