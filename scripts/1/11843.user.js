// ==UserScript==
// @name           Gendou.com - Sub-Forums Menu
// @namespace      http://loucypher.wordpress.com/
// @include        http://gendou.com/*
// @include        http://animesheep.com/*
// @description    Add new menu for easy navigating between sub-forums
// ==/UserScript==

(function() { 
  var ID = [8, 1, 11, 4, 10, 5, 7, 12, 15, 13, 2, 3, 14, 6];
  var topics = ["Help", "Anime", "Game", "Music", "Report Problems",
    "\u65e5\u672c\u8a9e", "Japan", "Introduce Yourself", "Philosophy",
    "Gendou City", "Physics", "Programming", "Waste of Time", "Other"]

  var XPath = "//div[@id='navPanel']/ul[@class='navHorizontal']" + 
              "/li/a[contains(@href, '/forum/search.php')]/parent::li";
  var forumMenu = document.evaluate(XPath, document, null, 9, null)
                          .singleNodeValue;
  if (!forumMenu) return;

  var forumLink = addLink("http://gendou.com/forum/", "Sub-Forums");
  var newMenu = insertMenu(forumMenu.nextSibling, forumLink);
  var newSubMenu = addSubMenu(newMenu);

  var link, menu;
  for (var i in ID) {
    link = addLink("http://gendou.com/forum/topic.php?top=" + ID[i], topics[i]);
    link.style.display = "block";
    if (location == link.href) {
      link.style.fontWeight = "bold";
      link.style.color = "white";
      link.title = "You are here!";
    }
    menu = addMenu(newSubMenu, link);
  }

  function insertMenu(aNode, aChild) {
    var mi = aNode.parentNode.insertBefore(document.createElement("li"),
                                           aNode);
    mi.appendChild(aChild);
    return mi;
  }

  function addSubMenu(aNode) {
    var mp = aNode.appendChild(document.createElement("ul"));
    mp.className = "navVertical";
    return mp;
  }

  function addMenu(aNode, aChild) {
    var mi = aNode.appendChild(document.createElement("li"));
    mi.appendChild(aChild);
    return mi;
  }

  function addLink(aURL, aText) {
    var lnk = document.createElement("a");
    lnk.href = aURL;
    lnk.textContent = aText;
    return lnk;
  }
})();