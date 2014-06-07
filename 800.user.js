// ==UserScript==
// @name          Bloglines Tweaks
// @namespace     http://persistent.info/greasemonkey
// @description	  Integrates Bloglines with del.icio.us, adds "Expand" links that convert snippet feeds into full content ones, and makes the "Extras" section toggleable (with more to come).

// Subscriptions page
// @include       http://bloglines.com/myblogs_subs*
// @include       http://www.bloglines.com/myblogs_subs*

// Items page
// @include       http://www.bloglines.com/myblogs_display*
// @include       http://bloglines.com/myblogs_display*

// ==/UserScript==

(function() {
  function tweakSubscriptions() {
    // Get the "Extras" header    
    var divs = document.getElementsByTagName("div");
    var extrasHeader = null;
    
    for (var i=0; i < divs.length; i++) {
      if (divs[i].className == "account") {
        extrasHeader = divs[i];
        break;
      }
    }
    
    if (!extrasHeader) {
      fail("Could not find the 'Extras' header.");
      return;
    }
    
    // And all of the links underneath
    var tables = document.getElementsByTagName("table");
    
    for (var i=0; i < tables.length; i++) {
      var t = tables[i];
      
      if (t.getAttribute("cellspacing") == 0 &&
          t.getAttribute("cellpadding") == 0 &&
          t.innerHTML.indexOf("Recommendations") != -1) {
        extrasHeader.linksTable = t;
        break;
      }
    }
    
    if (!extrasHeader.linksTable) {
      fail("Could not find the links table.");
      return;
    }
    
    extrasHeader.hideLinks = function() {
      extrasHeader.linksTable.style.display = "none";
      extrasHeader.onclick = extrasHeader.showLinks;
    }
    
    extrasHeader.showLinks = function() {
      extrasHeader.linksTable.style.display = "";
      extrasHeader.onclick = extrasHeader.hideLinks;
    }
    
    extrasHeader.style.cursor = "pointer";
    extrasHeader.hideLinks();
    
    // Get the tabs header and hide it
    var tabs = document.evaluate("//div[@class='tabs']", 
                                 document, 
                                 null, // namespace resolver
                                 XPathResult.FIRST_ORDERED_NODE_TYPE,
                                 null).singleNodeValue;

    tabs.style.display = "none";

    // We still want a refresh link
    var hnav = document.evaluate("//div[@class='hnav']", 
                                 document, 
                                 null, // namespace resolver
                                 XPathResult.FIRST_ORDERED_NODE_TYPE,
                                 null).singleNodeValue;

    var refreshLink = document.createElement("a");
    refreshLink.className = "navbar";
    refreshLink.innerHTML = "Refresh";
    refreshLink.href = "http://www.bloglines.com/myblogs_subs";
    hnav.insertBefore(document.createTextNode(" | "), hnav.firstChild);
    hnav.insertBefore(refreshLink, hnav.firstChild);
    
    // Trim this link text so that it all fits on one line
    hnav.innerHTML = hnav.innerHTML.replace("Reorder/Sort", "Sort");
  }
  
  function tweakItems() {
    var links = document.evaluate("//div[@class='item_nav']//a", 
                                  document, 
                                  null, // namespace resolver
                                  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                  null); // existing result

    for (var l = null, i = 0; l = links.snapshotItem(i); i++) { 
      // divs with id "siteItem.number.number" serve as the container for each
      // feed item.
      var siteItem = l.parentNode;
      while (siteItem && 
             (!siteItem.id || siteItem.id.indexOf("siteItem") != 0)) {
        siteItem = siteItem.parentNode;
      }
      if (!siteItem) {
        fail("Could not find the site item");
      }
      
      titleLink = siteItem.firstChild;
      
      while (titleLink && 
             (!titleLink.nodeName || titleLink.nodeName.toLowerCase() != "h3")) {
        titleLink = titleLink.nextSibling;
      }
      
      if (titleLink) {
        // the header has a link tag inside of it (there may be others, but the
        // one we want has no ID)
        var titleLinks = titleLink.getElementsByTagName("a");
        titleLink = null;
        for (var j=0; j < titleLinks.length; j++) {
          if (!titleLinks[j].id) {
            titleLink = titleLinks[j];
            break;
          }
        }
        
        if (!titleLink) {
          fail("Could not find the title link");
          return;
        }
      } else {
        // If there's no header/title link, then the post doesn't have a title.
        // However, it does seem to have a "Permalink" item that we can use
        // instead
        
        var itemLinks = siteItem.getElementsByTagName("a");
        
        for (var j=0; j < itemLinks.length; j++) {
          if (itemLinks[j].innerHTML == "Permalink") {
            titleLink = itemLinks[j];
          }
        }
        
        if (!titleLink) {
          fail("Could not find permalink");
          return;
        }      
      }
      
      if (l.innerHTML.indexOf("Clip/Blog This") != -1) {
        addDeliciousLink(l, titleLink);
      } else if (l.innerHTML.indexOf("Email This") != -1) {
        addExpandLink(l, titleLink, siteItem);
      }
    }
  }
  
  function addDeliciousLink(link, titleLink) {
    link.innerHTML = "Post to del.icio.us";
    
    link.onclick = function() {
      postToDelicious(titleLink.innerHTML, titleLink.getAttribute("href"));
      return false;
    };

    link.setAttribute("href", "http://del.icio.us/post"); // symbolic
  }

  function getSnippetNode(link, siteItem) {
    var set = document.evaluate("//div[@id='" + siteItem.id + "']//td[@class='article']", 
                                siteItem,
                                null, // namespace resolver
                                XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                null); // existing result

    var snippetNode = set.snapshotItem(0);
    if (snippetNode == null) {
      fail("couldn't find snippet node");
    }
    
    return snippetNode;
  }

  function addExpandLink(link, titleLink, siteItem, snippetNode) {
    link.innerHTML = "Expand";
    
    if (!snippetNode) {
      snippetNode = getSnippetNode(link, siteItem);
    }
    
    if (!link.collapsedHTML) {
      link.collapsedHTML = snippetNode.innerHTML;
    }
    
    link.onclick = function() {
      if (link.expandedHTML) {
        snippetNode.innerHTML = link.expandedHTML;
        addCollapseLink(link, titleLink, siteItem, snippetNode);
      } else {
        link.innerHTML = "Expanding...";
        GM_xmlhttpRequest({
          method: "GET",
          url: titleLink.href,
          onload: function(response) {
                    link.expandedHTML = getExpandedHTML(titleLink.innerHTML + 
                                                          ' ' + 
                                                          snippetNode.innerHTML,
                                                        response.responseText);
                    snippetNode.innerHTML = link.expandedHTML;
                    addCollapseLink(link, titleLink, snippetNode);
                  }
        });
      }
      return false;
    }
    link.setAttribute("href", titleLink.href);
  }
  
  function addCollapseLink(link, titleLink, siteItem, snippetNode) {
    link.innerHTML = "Collapse";
    
    link.onclick = function() {
      snippetNode.innerHTML = link.collapsedHTML;
      addExpandLink(link, titleLink, siteItem, snippetNode);
      return false;
    }
  }
  
  // Lame linear search since associative arrays can only have strings as keys
  Array.prototype.indexOf = function(item) {
    for (var i=0; i < this.length; i++) {
      if (this[i] == item) {
        return i;
      }
    }
    
    return -1;
  }
  
  function getExpandedHTML(snippetHTML, pageHTML) {
    // Remove HTML tags
    snippetHTML = snippetHTML.replace(/<[^>]+>/g, '');

    // We first find all page nodes that contain words from the snippet. This is
    // done by creating fake <word> tags and then using getElementsByTagName to
    // locate them in the DOM hierarchy
    var snippetWords = snippetHTML.split(/\s+/);
    
    for (var i=0; i < snippetWords.length; i++) {
      var word = snippetWords[i];
      
      // Remove punctuation
      word = word.replace(/[,\.\:;]+$/g, ' ');
      word = word.replace(/^[,\.\:;]+/g, ' ');
      word = word.replace(/[\(\)\[\]\{\}]+/g, ' ');

      if (word.length <= 3) {
        continue;
      }
      
      // Escape regular expression special characters
      var searchWord = word.replace(/([\^\$\-\|])/g, '\\$1');
      
      // We don't want to match things inside HTML tags
      pageHTML = pageHTML.replace(new RegExp('(>[^<>]*)' + searchWord, 'gi'), 
                                  "$1<word>" + word + "</word>");
    }
    
    // The temporary node needs to be part of the document so we can use range 
    // operations on it
    var tempNode = document.createElement("div");
    tempNode.style.display = "none";
    document.body.appendChild(tempNode);
    tempNode.innerHTML = pageHTML;
    var matches = tempNode.getElementsByTagName("word");
    
    // Now we count how many matched word each found node contains
    var blocks = new Array();
    
    for (var i=0; i < matches.length; i++) {
      var parent = matches[i].parentNode;
      
      var itemIndex = blocks.indexOf(parent);
      if (itemIndex != -1) {
        blocks[itemIndex].matchCount++;
      } else {
        blocks.push(parent);
        blocks[blocks.length - 1].matchCount = 1;
      }
    }
    
    if (blocks.length == 0) {
      fail("couldn't find any matching article text");
    }
  
    // We pick those that contain at least 20% of the snippet words
    var selectedNodes = [];
    var expandedText = "";
    for (var i=0; i < blocks.length; i++) {
      if (blocks[i].matchCount > snippetWords.length/5) {
        selectedNodes.push(blocks[i]);
      }
    }
    
    // If that fails, we lower our threshold to 10%
    if (selectedNodes.length == 0) {
      for (var i=0; i < blocks.length; i++) {
        if (blocks[i].matchCount > snippetWords.length/10) {
          selectedNodes.push(blocks[i]);
        }
      }
    }

    // And if we still have nothing, then we just use the entire match list
    if (selectedNodes.length == 0) {
      selectedNodes = blocks;
    }
    
    // Finally, we want the complete set of nodes that contains all selected
    // nodes
    var range = document.createRange();
    range.setStartBefore(selectedNodes[0]);
    range.setEndAfter(selectedNodes[selectedNodes.length - 1]);
    
    var fragment = range.cloneContents();
    var fragmentParent = document.createElement("div");
    fragmentParent.appendChild(fragment);

    var expandedHTML = fragmentParent.innerHTML;
    
    // Remove remants of the word finding
    expandedHTML = expandedHTML.replace(/<word>/gi, '');
    expandedHTML = expandedHTML.replace(/<\/word>/gi, '');

    tempNode.parentNode.removeChild(tempNode);    
        
    return expandedHTML;
  }
    
  function postToDelicious(title, href) {
    var username = getCookie("deliciousUsername");
    
    if (!username) {
      username = prompt("Please enter your del.icio.us username", "");
      if (!username) {
        return;
      }
      setCookie("deliciousUsername", username);
    }
  
    // adapted from the popup post bookmarklet
    open('http://del.icio.us/' + username +
         '?v=2&noui=yes&jump=close&url=' + encodeURIComponent(href) +
         '&title=' + encodeURIComponent(title),
         'delicious',
         'toolbar=no,width=700,height=250');
  }
  
  function getCookie(name) {
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
  }
  
  function setCookie(name, value) {
    var today = new Date();
    // plus 28 years
    var expiry = new Date(today.getTime() + 28 * 365.24 * 24 * 60 * 60 * 1000);   
    
    document.cookie = name + "=" + escape(value) +
              "; expires=" + expiry.toGMTString() +
              "; path=/";
  }
  
  function fail(reason) {
    alert(reason + "\nPlease look for an updated version of this script");
  }

  var href = window.location.href;
  
  if (href.indexOf("myblogs_subs") != -1) {
    tweakSubscriptions();
  } else if (href.indexOf("myblogs_display") != -1) {
    tweakItems();
  } else {
    fail("Unknown URL: " + href);
  }
})();