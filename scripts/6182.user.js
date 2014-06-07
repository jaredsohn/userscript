// ==UserScript==
// @name           Addons Improvements
// @namespace      http://pile0nades.wordpress.com/
// @description    Fixes some issues of Addons.mozilla.org
// @include        https://addons.mozilla.org/*
// @exclude        https://addons.mozilla.org/thunderbird/*
// @exclude        https://addons.mozilla.org/mozilla/*
// ==/UserScript==

// This script does the following on Addons:
// - Adds "Dictionaries" to the sidebar menu
// - Adds the search bar to the sidebar, and have it on every page
// - Link the preview image of addons to the preview page




// add dictionaries to main menu;
var themesMenuItem = get("//div[@id='menu-box']/ul/li[4]");
if(themesMenuItem.snapshotLength != 0) {
  var dictMenuItem = document.createElement("li");
  if(location.href == "https://addons.mozilla.org/firefox/dictionaries/")
    dictMenuItem.innerHTML = "<span>Dictionaries</span>";
  else
    dictMenuItem.innerHTML = "<a href='https://addons.mozilla.org/firefox/dictionaries/'>Dictionaries</a>";
  insertAfter(dictMenuItem, themesMenuItem.snapshotItem(0));
}



// insert search form in sidebar
var sidebar = get("//div[@id='menu-box']");
if(sidebar.snapshotLength != 0) {
  // set the search options
  var ESelected = "";
  var TSelected = "";
  var ASelected = "";
  if(location.href.indexOf("/extensions/") != -1 || location.href.indexOf("type=E") != -1)
    ESelected = " selected";
  else if(location.href.indexOf("/themes/") != -1 || location.href.indexOf("type=T") != -1)
    TSelected = " selected";
  else
    ASelected = " selected";

  var whoSaysHTMLStoredInJSHasToBeUgly = ''
    +'<form id="extensions-search" method="get" action="https://addons.mozilla.org/search.php" title="Search Mozilla Add-ons" class="corner-box">'
    +'  <h3>Find more Add-ons:</h3>'
    +'  <div>'
    +'  <input id="q2" type="text" name="q" accesskey="s" class="keywords" style="width: 115px; font-weight: normal;"/>'
    +'  <select name="type">'
    +'    <option value="A"'+ ASelected +'>all Add-ons</option>'
    +'    <option value="E"' + ESelected + '>just Extensions</option>'
    +'    <option value="T"' + TSelected + '>just Themes</option>'
    +'  </select>'
    +'  <input type="hidden" name="app" value="firefox"/>'
    +'  <input type="submit" value="Search" />'
    +'  </div>'
    +'</form>';
  sidebar.snapshotItem(0).innerHTML += whoSaysHTMLStoredInJSHasToBeUgly;

  // remove original search form
  var searchform = get("//div[contains(@class, 'search-container')]");
  if(searchform.snapshotLength != 0) {
    remove(searchform.snapshotItem(0));
  }
}



// link the screenshots to the previews page
var previewpic = get("//p[@class='preview-image']/img");
if(previewpic.snapshotLength != 0) {
  var previewlink = get("//p[@class='preview-image']/a[contains(@href, '/previews/')]").snapshotItem(0);
  var link = document.createElement("a");
  link.href = previewlink.href;
  insertAfter(link, previewpic.snapshotItem(0));
  link.appendChild(previewpic.snapshotItem(0));
  previewpic.snapshotItem(0).style.border = "none";
  // remove a br tag
  remove(get("//p[@class='preview-image']/br").snapshotItem(0));
}
if(location.href.indexOf("search.php") != -1) {
  var searchpics = get("//img[@class='search-result-image']");
  var searchpicslinks = get("//img[@class='search-result-image']/../h2/a[1]");

  for(var i=0; i<searchpics.snapshotLength; i++) {
    searchpics.snapshotItem(i).style.float = "none";
    searchpics.snapshotItem(i).style.border = "none";
    var link = document.createElement("a");
    link.href = searchpicslinks.snapshotItem(i).href + "previews/";
    link.style.float = "right";
    insertAfter(link, searchpics.snapshotItem(i));
    link.appendChild(searchpics.snapshotItem(i));
  }
  
}







// helper functions
function insertAfter(node, referenceNode) {
  referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
}

function remove(node) {
  node.parentNode.removeChild(node);
}

function get(query) {
  return document.evaluate(
    query,
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
  );
}
