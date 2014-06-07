// AuctionSearchKit - "eBay on Google Maps" User Script
// Version 8.4
// 2012-03-08
// Copyright (c) 2008, Auction Search Kit. All rights reserved.
// Feedback to auctionsearchkit@gmail.com is welcome.
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "eBay on Google Maps", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          eBay on Google Maps
// @namespace     http://www.auctionsearchkit.co.uk
// @description   Show eBay items on a Google Map. Links from search results and individual items.
// @include       http://*.ebay.*
// ==/UserScript==

// Script version. NOTE: This should also be updated at the top.
var version = '8.4';
var DEBUG_MODE = false;

// If in DEBUG mode and FireBug is installed, define a logging function using the FireBug console
if ((DEBUG_MODE === true) && (unsafeWindow.console)) {
  // Log a variable's value via the Firebug console (if debug mode is turned on)
  function fbLog(name, value) {
    if (DEBUG_MODE === true) {
      switch (typeof value) {
        case 'undefined':
          unsafeWindow.console.log(name + ' is undefined');
          break;
        case 'object':
          if (value === null) {
            unsafeWindow.console.log(name + ' is null');
          } else {
            if (value.constructor === Date) {
              unsafeWindow.console.log(name + ' = ' + value);
            } else if (typeof value.length == 'undefined') {
              unsafeWindow.console.log(name + ':');
            } else if (value.length === 0) {
              unsafeWindow.console.log(name + ' is empty (length = 0)');
            } else {
              unsafeWindow.console.log(name + ' (length = ' + value.length + '):');
            }
            unsafeWindow.console.dir(value);
          }
          break;
        case 'string':
          unsafeWindow.console.log(name + ' = "' + value + '"');
          break;
        default:
          unsafeWindow.console.log(name + ' = ' + value);
          break;
      }
    }
  }
} else {
  // Assign a function that does nothing whenever a logging call is made
  function fbLog(name, value) {}
}

try {
  // Get all the elements below the specified node with the specified ID, name, class, tag and any further checks
  // (all parameters are optional)
  function getElementsByINCT(node, elementId, elementName, className, tagName, furtherNodeChecksJs) {
    var elementsArray = [];
    try {
      var logText = 'Elements for ID=' + elementId
                  + ', name=' + elementName 
                  + ', class=' + className 
                  + ', tag=' + tagName 
                  + ', js=' + (typeof furtherNodeChecksJs == 'undefined' ? '<undefined>' : '"' + furtherNodeChecksJs + '"');
      if ((typeof elementId == 'undefined') || (elementId === '')) {
        elementId = null;
      }
      if ((typeof elementName == 'undefined') || (elementName === '')) {
        elementName = null;
      }
      if ((typeof className == 'undefined') || (className === '')) {
        className = null;
      }
      if ((typeof tagName == 'undefined') || (tagName === null) || (tagName === '')) {
        tagName = null;
      }
      if ((typeof node == 'undefined') || (node === null) || (node === ''))  {
        node = document;
      }
      if ((typeof furtherNodeChecksJs == 'undefined') || (furtherNodeChecksJs === '')) {
        furtherNodeChecksJs = null;
      }
      var elementsNodeList = [];
      if ((elementName !== null) && (typeof node.getElementsByName == 'function')) {
        var elementsNodeList = node.getElementsByName(elementName);
        elementName = null;
      } else if ((className !== null) && (typeof node.getElementsByClassName == 'function')) {
        var elementsNodeList = node.getElementsByClassName(className);
        className = null;
      } else if ((tagName !== null) && (typeof node.getElementsByTagName == 'function')) {
        var elementsNodeList = node.getElementsByTagName(tagName);
        tagName = null;
      } else if ((typeof node.elements == 'object') && (node.elements !== null)) {
        var elementsNodeList = node.elements;
      } else if ((typeof node.all == 'object') && (node.all !== null)) {
        var elementsNodeList = node.all;
      }
      
      var nodeChecksJs = '';
      if (elementId !== null) {
        nodeChecksJs += '(/^' + elementId + '$/i.test(node.id) == true) && '
      }
      if (elementName !== null) {
        nodeChecksJs += '(/^' + elementName + '$/i.test(node.name) == true) && '
      }
      if (className !== null) {
        nodeChecksJs += '(/^' + className + '$/i.test(node.className) == true) && '
      }
      if (tagName !== null) {
        nodeChecksJs += '(/^' + tagName + '$/i.test(node.tagName) == true) && '
      }
      if (furtherNodeChecksJs !== null) {
        nodeChecksJs += '(' + furtherNodeChecksJs + ') && '
      }
      if (nodeChecksJs === '') {
        nodeChecksJs = 'true';
      } else {
        nodeChecksJs = nodeChecksJs.substring(0, nodeChecksJs.length - 4);
      }
      
      for (var enlIndex = 0; enlIndex < elementsNodeList.length; enlIndex++) {
        node = elementsNodeList[enlIndex];
        if (eval(nodeChecksJs) === true) {
          elementsArray.push(node);
        }
      }
      
      fbLog(logText, elementsArray);
    } catch (err) {
      fbLog('Unexpected error', err);
    }

    return elementsArray;
  }

  function getItemsUrl(rootElement) {
    if (typeof rootElement == 'undefined') {
      rootElement = document;
    }
    var url = null;
    var anchorElementsArray = rootElement.getElementsByTagName('a');
    if (anchorElementsArray !== null) {
      var regexp = /(&|\?|QQ|%26|Q26|_W0QQ)item(=|Z|%3D|Q3D)([0-9]{9,12})[^0-9]*/i;
      var itemsArray = [];
      for (var index = 0; index < anchorElementsArray.length; index++) {
        var anchorElement = anchorElementsArray[index];
        var href = anchorElement.href;
        var matches = regexp.exec(href);
        if (matches != null) { 
          itemsArray.push(matches[3]);
        }
      }
      if (itemsArray.length > 0) {
        itemsArray.sort();
        url = 'http://www.auctionsearchkit.co.uk/search.php?item=';
        var prevItem = null;
        for (var index = 0; index < itemsArray.length; index++) {
          var item = itemsArray[index];
          if (item !== prevItem) {
            url += item + ',';
            prevItem = item;
          }
        }
        url = url.substring(0, url.length - 1);
      }
    }
    
    return url;
  }

  // Get the item ID from the current URL if possible
  function getItemIdFromUrl(url) {
    // If a URL is not supplied, use the current page URL
    if (typeof url == 'undefined') {
      url = document.location.href;
    }
    var matches = /(&|\?|QQ|%26|Q26|_W0QQ)item(=|Z|%3D|Q3D)([0-9]{9,12})[^0-9]*/i.exec(url);
    if (matches == null) {
      var itemId = null;
    } else {
      var itemId = matches[3];
    }
    
    if (itemId == null) {
      var matches = /\/([0-9]{9,12})(\?|_W0QQ|$)/i.exec(url);
      if (matches == null) {
        var itemId = null;
      } else {
        var itemId = matches[1];
      }
    }
    
    return itemId;
  }

  var advsearchElement = document.getElementById('AdvSearchId');
  var headerSearchFormElements = document.getElementsByName('headerSearch');
  if ((headerSearchFormElements != null) &&
      (headerSearchFormElements[0] != null) && 
      (advsearchElement != null)) {
    newElement = document.createElement('span');
    newElement.innerHTML = ' <input class="gh-btn"'
                                + ' title="Show the results of this search on a Google Map"'
                                + ' type="button" value="Map-Search"'
                                + ' onclick="var headerSearchFormElements = document.getElementsByName(\'headerSearch\');'
                                         + ' if ((headerSearchFormElements != null) && (headerSearchFormElements[0] != null)) {'
                                            + ' var url = headerSearchFormElements[0].action;'
                                            + ' if ((url == \'\') || (url[0] == \'?\') || (url[0] == \'/\')) {'
                                            + '   url = window.location.href + url; '
                                            + ' }'
                                            + ' var allCtrls = headerSearchFormElements[0].elements;'
                                            + ' for (ctrlNum = 0; ctrlNum < allCtrls.length; ctrlNum++) {'
                                            + '   var ctrl = allCtrls[ctrlNum];'
                                            + '   var ctrlType = ctrl.type;'
                                            + '   if (typeof ctrlType != \'undefined\') {'
                                            + '     ctrlType = ctrlType.toLowerCase();'
                                            + '     if ((ctrlType != \'submit\') && (ctrlType != \'reset\') &&'
                                            + '         (ctrlType != \'image\') && (ctrlType != \'button\') &&'
                                            + '         (((ctrlType != \'checkbox\') && (ctrlType != \'radio\')) || (ctrl.checked != false))) {'
                                            + '       url += (url.indexOf(\'?\') >= 0) ? \'&\' : \'?\';'
                                            + '       url += ctrl.name + \'=\' + escape(ctrl.value);'
                                            + '     }'
                                            + '   }'
                                            + ' }'
                                            + ' window.open(\'http://www.auctionsearchkit.co.uk/search.php?\''
                                              + ' + url + \'&asksrc=gm' + version + 'p1\'); }">';
    advsearchElement.parentNode.insertBefore(newElement, advsearchElement);
  }

  var submitElementsArray = getElementsByINCT(null, null, null, 'standard', 'input');
  if (submitElementsArray.length <= 0) {
    var searchButtonElement = document.getElementById('inlinebutton');
    var advSearchFormElements = document.getElementsByName('advsearch_form');
    if ((advSearchFormElements != null) &&
        (advSearchFormElements[0] != null) && 
        (searchButtonElement != null)) {
      var newElement = document.createElement('td');
      newElement.innerHTML = ' <input title="Show the results of this search on a Google Map"'
                                  + ' type="button" class="standard" value="Map-Search"'
                                  + ' onclick="var advSearchFormElements = document.getElementsByName(\'advsearch_form\');'
                                           + ' if ((advSearchFormElements != null) && (advSearchFormElements[0] != null)) {'
                                              + ' var url = advSearchFormElements[0].action;'
                                              + ' if ((url == \'\') || (url[0] == \'?\') || (url[0] == \'/\')) {'
                                              + '   url = window.location.href + url; '
                                              + ' }'
                                              + ' var allCtrls = advSearchFormElements[0].elements;'
                                              + ' for (ctrlNum = 0; ctrlNum < allCtrls.length; ctrlNum++) {'
                                              + '   var ctrl = allCtrls[ctrlNum];'
                                              + '   var ctrlType = ctrl.type;'
                                              + '   if (typeof ctrlType != \'undefined\') {'
                                              + '     ctrlType = ctrlType.toLowerCase();'
                                              + '     if ((ctrlType != \'submit\') && (ctrlType != \'reset\') &&'
                                              + '         (ctrlType != \'image\') && (ctrlType != \'button\') &&'
                                              + '         (((ctrlType != \'checkbox\') && (ctrlType != \'radio\')) || (ctrl.checked != false))) {'
                                              + '       url += (url.indexOf(\'?\') >= 0) ? \'&\' : \'?\';'
                                              + '       url += ctrl.name + \'=\' + escape(ctrl.value);'
                                              + '     }'
                                              + '   }'
                                              + ' }'
                                              + ' window.open(\'http://www.auctionsearchkit.co.uk/search.php?\''
                                                + ' + url + \'&asksrc=gm' + version + 'p2\'); }">';
      searchButtonElement.parentNode.insertBefore(newElement, searchButtonElement.nextSibling);
      newElement = document.createElement('td');
      newElement.innerHTML = '<img width="10" height="1" border="0" '
                            + 'xmlns="http://www.w3.org/1999/xhtml" src="http://pics.ebaystatic.com/aw/pics/s.gif"/>'
      searchButtonElement.parentNode.insertBefore(newElement, searchButtonElement.nextSibling);
    }
  } else {
    for (submitElementIndex = 0; submitElementIndex < submitElementsArray.length; submitElementIndex++) {
      var newElement = document.createElement('span');
      newElement.innerHTML = '<input title="Show the results of this search on a Google Map"'
                           + ' type="button" value="Map-Search" class="standard"'
                           + ' onclick="var advSearchFormElements = document.getElementsByName(\'advsearch_form\');'
                                    + ' if ((advSearchFormElements != null) && (advSearchFormElements[0] != null)) {'
                                       + ' var url = advSearchFormElements[0].action;'
                                       + ' if ((url == \'\') || (url[0] == \'?\') || (url[0] == \'/\')) {'
                                       + '   url = window.location.href + url; '
                                       + ' }'
                                       + ' var allCtrls = advSearchFormElements[0].elements;'
                                       + ' for (ctrlNum = 0; ctrlNum < allCtrls.length; ctrlNum++) {'
                                       + '   var ctrl = allCtrls[ctrlNum];'
                                       + '   var ctrlType = ctrl.type;'
                                       + '   if (typeof ctrlType != \'undefined\') {'
                                       + '     ctrlType = ctrlType.toLowerCase();'
                                       + '     if ((ctrlType != \'submit\') && (ctrlType != \'reset\') &&'
                                       + '         (ctrlType != \'image\') && (ctrlType != \'button\') &&'
                                       + '         (((ctrlType != \'checkbox\') && (ctrlType != \'radio\')) || (ctrl.checked != false))) {'
                                       + '       url += (url.indexOf(\'?\') >= 0) ? \'&\' : \'?\';'
                                       + '       url += ctrl.name + \'=\' + escape(ctrl.value);'
                                       + '     }'
                                       + '   }'
                                       + ' }'
                                       + ' window.open(\'http://www.auctionsearchkit.co.uk/search.php?\''
                                         + ' + url + \'&asksrc=gm' + version + 'p2b\'); }">';
      submitElementsArray[submitElementIndex].parentNode.insertBefore(
          newElement,
          submitElementsArray[submitElementIndex].nextSibling);
    }
  }

  var saveSearchElement = document.getElementById('span_save_search');
  if (saveSearchElement == null) {
    saveSearchElement = document.getElementById('fpcSaveSearchLink');
  }
  if (saveSearchElement == null) {
    saveSearchElement = document.getElementById('saveSearchLinkDash');
  }
  if (saveSearchElement == null) {
    var saveSearchElementsArray = getElementsByINCT(null, null, null, 'saveSearch', 'span');
    if (saveSearchElementsArray.length > 0) {
      saveSearchElement = saveSearchElementsArray[0];
    }
  }
  if (saveSearchElement != null) {
    var newElement = document.createElement('span');
    newElement.innerHTML = '<span class="saveSearch"> <a class="links" title="Show the results of this search on a Google Map" '
                         + ' href="http://www.auctionsearchkit.co.uk/search.php?'
                         + window.location.href + '&asksrc=gm' + version + 'p3" target="_blank">Map this search</a> | </span>';
    saveSearchElement.parentNode.insertBefore(newElement, saveSearchElement);

    var url = getItemsUrl();
    if (url != null) {
      newElement = document.createElement('span');
      newElement.innerHTML = '<span class="saveSearch"> <a title="Show all the items on the current page on a Google Map" '
                           + ' href="' + url + '&asksrc=gm' + version + 'p4" target="_blank">Map all items on page</a> |</span>';
      saveSearchElement.parentNode.insertBefore(newElement, saveSearchElement);
    }
  }

  var watchingElement = document.getElementById('watching');
  if (watchingElement != null) {
    var newElement = document.createElement('td');
    newElement.align = 'right';
    newElement.innerHTML = '<b><a title="Show this item\'s location on a Google Map"'
                         + ' href="http://www.auctionsearchkit.co.uk/search.php?'
                         + window.location.href 
                         + '&asksrc=gm' + version + 'p5" target="_blank">Map&nbsp;this&nbsp;item</a></b>';
    watchingElement.parentNode.insertBefore(newElement, watchingElement);
  }

  var bsElement = document.getElementById('bs');
  var findElement = document.getElementById('find');
  if ((bsElement != null) &&
      (findElement != null)) {
    newElement = document.createElement('span');
    newElement.innerHTML = ' <input title="Show the results of this search on a Google Map"'
                                + ' type="button" class="standard" value="Map-Search"'
                                + ' onclick="var findElement = document.getElementById(\'find\');'
                                         + ' if (findElement != null) {'
                                            + ' var qMarkPos = window.location.href.search(/(\\?|__W0QQ)/i);'
                                            + ' if (qMarkPos > 0) {'
                                              + ' var url = window.location.href.substring(0, qMarkPos);'
                                            + ' } else { '
                                              + ' var url = \'\';'
                                            + ' }'
                                            + ' var allCtrls = findElement.elements;'
                                            + ' for (ctrlNum = 0; ctrlNum < allCtrls.length; ctrlNum++) {'
                                            + '   var ctrl = allCtrls[ctrlNum];'
                                            + '   var ctrlType = ctrl.type;'
                                            + '   if (typeof ctrlType != \'undefined\') {'
                                            + '     ctrlType = ctrlType.toLowerCase();'
                                            + '     if ((ctrlType != \'submit\') && (ctrlType != \'reset\') &&'
                                            + '         (ctrlType != \'image\') && (ctrlType != \'button\') &&'
                                            + '         (((ctrlType != \'checkbox\') && (ctrlType != \'radio\')) || (ctrl.checked != false))) {'
                                            + '       url += (url.indexOf(\'?\') >= 0) ? \'&\' : \'?\';'
                                            + '       url += ctrl.name + \'=\' + escape(ctrl.value);'
                                            + '     }'
                                            + '   }'
                                            + ' }'
                                            + ' window.open(\'http://www.auctionsearchkit.co.uk/search.php?\''
                                              + ' + url + \'&asksrc=gm' + version + 'p6\'); }">';
    bsElement.parentNode.insertBefore(newElement, bsElement.nextSibling);
  }

  var watchButtonElement = document.getElementById('watchLinkMiddle');
  if (watchButtonElement != null) {
    var newElement = document.createElement('span');
    newElement.innerHTML = ' <input class="navigation" title="Show the results of this search on a Google Map"'
                                + ' type="button" class="standard" value="Map This Item"'
                                + ' onclick="window.open(\'http://www.auctionsearchkit.co.uk/search.php?'
                                + window.location.href + '&asksrc=gm' + version + 'p7\');"';
    watchButtonElement.parentNode.insertBefore(newElement, watchButtonElement);
  }

  if (window.location.href.search(/my\.ebay/i) >= 0) {
    var titleElementsArray = getElementsByINCT(null, null, null, 'c_Title', 'td');
    for (var index = 0; index < titleElementsArray.length; index++) {
      var titleElement = titleElementsArray[index];
      var anchorElementsArray = titleElement.getElementsByTagName('a');
      if (anchorElementsArray.length == 1) {
        var anchorElement = anchorElementsArray[0];
        var newElement = document.createElement('span');
        newElement.innerHTML = '&nbsp;&nbsp;[<a title="Show this item on a Google Map" '
                             + ' href="http://www.auctionsearchkit.co.uk/search.php?'
                             + anchorElement.href
                             + '&asksrc=gm' + version + 'p10" target="_blank">Map&nbsp;Item</a>] ';
        anchorElement.parentNode.insertBefore(newElement, anchorElement.nextSibling);
      }
    }

    var searchElementsArray = getElementsByINCT(null, null, null, 'c_SearchName', 'td');
    for (var index = 0; index < searchElementsArray.length; index++) {
      var titleElement = searchElementsArray[index];
      var anchorElementsArray = titleElement.getElementsByTagName('a');
      if (anchorElementsArray.length == 1) {
        var anchorElement = anchorElementsArray[0];
        var newElement = document.createElement('span');
        newElement.innerHTML = '&nbsp;&nbsp;[<a title="Show this item on a Google Map" '
                             + ' href="http://www.auctionsearchkit.co.uk/search.php?'
                             + anchorElement.href
                             + '&asksrc=gm' + version + 'p11" target="_blank">Map&nbsp;Search</a>] ';
        anchorElement.parentNode.insertBefore(newElement, anchorElement.nextSibling);
      }
    }

    var pdmColElementsArray = getElementsByINCT(null, null, null, 'pdm-col', 'ul');
    for (var index = 0; index < pdmColElementsArray.length; index++) {
      var pdmColElement = pdmColElementsArray[index];
      var pdmItemElementsArray = getElementsByINCT(pdmColElement, null, null, 'pdm-item', 'li');
      var pdmItemElement = pdmItemElementsArray[0];
      var anchorElementsArray = pdmItemElement.getElementsByTagName('a');
      if (anchorElementsArray.length == 1) {
        var anchorElement = anchorElementsArray[0];
        if ((anchorElement.innerHTML != 'Summary') &&
            (anchorElement.innerHTML != 'Inbox') &&
            (anchorElement.innerHTML.substring(0, 18) != '<span id="editmenu') &&
            (anchorElement.innerHTML.substring(0, 17) != '<span id="imgspan') &&
            (anchorElement.innerHTML.substring(0, 3) != 'All') &&
            (anchorElement.innerHTML.substring(0, 4) != 'Last') &&
            (anchorElement.innerHTML.substring(0, 4) != 'Time')) {
          var newElement = document.createElement('li');
          newElement.className = 'pdm-item';
          if (anchorElement.innerHTML == 'Go to search results') {
            newElement.innerHTML = '<a title="Show this search on a Google Map" '
                                 + ' href="http://www.auctionsearchkit.co.uk/search.php?'
                                 + anchorElement.href
                                 + '&asksrc=gm' + version + 'p12b" target="_blank">Map&nbsp;this&nbsp;search</a>';
          } else {
            newElement.innerHTML = '<a title="Show this item on a Google Map" '
                                 + ' href="http://www.auctionsearchkit.co.uk/search.php?'
                                 + anchorElement.href
                                 + '&asksrc=gm' + version + 'p12" target="_blank">Map&nbsp;this&nbsp;item</a>';
          }
          pdmItemElement.parentNode.insertBefore(newElement, pdmItemElement.nextSibling);
        }
      }
    }

    var titleElementsArray = getElementsByINCT(null, 'ttl_.*', null, null, 'a');
    for (var index = 0; index < titleElementsArray.length; index++) {
      var titleElement = titleElementsArray[index];
      var newElement = document.createElement('span');
      newElement.innerHTML = '&nbsp;&nbsp;[<a title="Show this item on a Google Map" '
                           + ' href="http://www.auctionsearchkit.co.uk/search.php?'
                           + titleElement.href
                           + '&asksrc=gm' + version + 'p13" target="_blank">Map&nbsp;Item</a>] ';
      titleElement.parentNode.insertBefore(newElement, titleElement.nextSibling);
    }

    var gotoSearchesElement = document.getElementById('GotoSearchesLnk');
    if (gotoSearchesElement != null) {
      var newElement = document.createElement('span');
      newElement.innerHTML = '<span><a id="mapsavedsearch" class="customization_paddingleft5px" title="Show the results of this search on a Google Map"'
                           + ' href="http://www.auctionsearchkit.co.uk/search.php?'
                           + gotoSearchesElement.href + '&asksrc=gm' + version + 'p13b" onmouseover="var gotoSearchesElement = document.getElementById(\'GotoSearchesLnk\'); if (gotoSearchesElement != null) { this.href = \'http://www.auctionsearchkit.co.uk/search.php?\' + gotoSearchesElement.href + \'&asksrc=gm' + version + 'p13b\'; }" target="_blank">Map this search</a> |</span>';
      gotoSearchesElement.parentNode.insertBefore(newElement, gotoSearchesElement);
    }
  }

  var sacatElement = document.getElementById('_sacat');
  var findingSearchBarFormElement = document.getElementById('findingsearchbarfrm');
  if ((findingSearchBarFormElement != null) && (sacatElement != null)) {
    var newElement = document.createElement('span');
    newElement.innerHTML = ' <input title="Show the results of this search on a Google Map"'
                                + ' type="button" value="Map-Search"'
                                + ' onclick="var findingSearchBarFormElement = document.getElementById(\'findingsearchbarfrm\');'
                                         + ' if (findingSearchBarFormElement != null) {'
                                            + ' var url = findingSearchBarFormElement.action;'
                                            + ' if ((url == \'\') || (url[0] == \'?\') || (url[0] == \'/\')) {'
                                            + '   url = window.location.href + url; '
                                            + ' }'
                                            + ' var allCtrls = findingSearchBarFormElement.elements;'
                                            + ' for (ctrlNum = 0; ctrlNum < allCtrls.length; ctrlNum++) {'
                                            + '   var ctrl = allCtrls[ctrlNum];'
                                            + '   var ctrlType = ctrl.type;'
                                            + '   if (typeof ctrlType != \'undefined\') {'
                                            + '     ctrlType = ctrlType.toLowerCase();'
                                            + '     if ((ctrlType != \'submit\') && (ctrlType != \'reset\') &&'
                                            + '         (ctrlType != \'image\') && (ctrlType != \'button\') &&'
                                            + '         (((ctrlType != \'checkbox\') && (ctrlType != \'radio\')) || (ctrl.checked != false))) {'
                                            + '       url += (url.indexOf(\'?\') >= 0) ? \'&\' : \'?\';'
                                            + '       url += ctrl.name + \'=\' + escape(ctrl.value);'
                                            + '     }'
                                            + '   }'
                                            + ' }'
                                            + ' window.open(\'http://www.auctionsearchkit.co.uk/search.php?\''
                                              + ' + url + \'&asksrc=gm' + version + 'p14\'); }"';
    sacatElement.parentNode.insertBefore(newElement, sacatElement.nextSibling ? sacatElement.nextSibling.nextSibling : sacatElement.nextSibling);
  }

  var deleteBtnElementArray = getElementsByINCT(null, null, 'SubmitAction.BulkDelete', null, 'input');
  if (deleteBtnElementArray.length > 0) {
    btnHtml = ' <input title="Display these items on a Google Map"'
                   + ' type="button" value="Map Items"'
                   + ' onclick="var containerElement = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;'
                            + ' if (containerElement != null) {'
                              + ' var anchorElementsArray = containerElement.getElementsByTagName(\'a\');'
                              + ' if (anchorElementsArray !== null) {'
                                + ' var regexp = new RegExp(\'(&|\\\\?|QQ|%26|Q26|_W0QQ)item(=|Z|%3D|Q3D)([0-9]{9,12})[^0-9]*\', \'i\');'
                                + ' var itemsArray = [];'
                                + ' for (var index = 0; index < anchorElementsArray.length; index++) {'
                                  + ' var anchorElement = anchorElementsArray[index];'
                                  + ' var href = anchorElement.href;'
                                  + ' var matches = regexp.exec(href);'
                                  + ' if (matches != null) { '
                                    + ' itemsArray.push(matches[3]);'
                                  + ' }'
                                + ' }'
                                + ' if (itemsArray.length > 0) {'
                                  + ' itemsArray.sort();'
                                  + ' url = \'http://www.auctionsearchkit.co.uk/search.php?item=\';'
                                  + ' var prevItem = null;'
                                  + ' for (var index = 0; index < itemsArray.length; index++) {'
                                    + ' var item = itemsArray[index];'
                                    + ' if (item !== prevItem) {'
                                      + ' url += item + \',\';'
                                      + ' prevItem = item;'
                                    + ' }'
                                  + ' }'
                                  + ' url = url.substring(0, url.length - 1);'
                                  + ' window.open(url + \'&asksrc=gm' + version + 'p15\');'
                                 + '}'
                              + ' }'
                            + ' }">';
    for (var index = 0; index < deleteBtnElementArray.length; index++) {
      var newElement = document.createElement('span');
      newElement.innerHTML = btnHtml;
      var deleteBtnElement = deleteBtnElementArray[index];
      deleteBtnElement.parentNode.insertBefore(newElement, deleteBtnElement.nextSibling);
    }
  }

  var removeBtnElementArray = getElementsByINCT(null, null, 'SubmitAction.BulkRemove', null, 'input');
  if (removeBtnElementArray.length > 0) {
    btnHtml = ' <input title="Display these items on a Google Map"'
                   + ' type="button" value="Map Items"'
                   + ' onclick="var containerElement = this.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;'
                            + ' if (containerElement != null) {'
                              + ' var anchorElementsArray = containerElement.getElementsByTagName(\'a\');'
                              + ' if (anchorElementsArray !== null) {'
                                + ' var regexp = new RegExp(\'(&|\\\\?|QQ|%26|Q26|_W0QQ)item(=|Z|%3D|Q3D)([0-9]{9,12})[^0-9]*\', \'i\');'
                                + ' var itemsArray = [];'
                                + ' for (var index = 0; index < anchorElementsArray.length; index++) {'
                                  + ' var anchorElement = anchorElementsArray[index];'
                                  + ' var href = anchorElement.href;'
                                  + ' var matches = regexp.exec(href);'
                                  + ' if (matches != null) { '
                                    + ' itemsArray.push(matches[3]);'
                                  + ' }'
                                + ' }'
                                + ' if (itemsArray.length > 0) {'
                                  + ' itemsArray.sort();'
                                  + ' url = \'http://www.auctionsearchkit.co.uk/search.php?item=\';'
                                  + ' var prevItem = null;'
                                  + ' for (var index = 0; index < itemsArray.length; index++) {'
                                    + ' var item = itemsArray[index];'
                                    + ' if (item !== prevItem) {'
                                      + ' url += item + \',\';'
                                      + ' prevItem = item;'
                                    + ' }'
                                  + ' }'
                                  + ' url = url.substring(0, url.length - 1);'
                                  + ' window.open(url + \'&asksrc=gm' + version + 'p16\');'
                                 + '}'
                              + ' }'
                            + ' }">';
    for (var index = 0; index < removeBtnElementArray.length; index++) {
      var newElement = document.createElement('span');
      newElement.innerHTML = btnHtml;
      var removeBtnElement = removeBtnElementArray[index];
      removeBtnElement.parentNode.insertBefore(newElement, removeBtnElement.nextSibling);
    }
  }

  var viewItemElementsArray = getElementsByINCT(null, 'viewItemId', null, null, 'td');
  for (var index = 0; index < viewItemElementsArray.length; index++) {
    var viewItemElement = viewItemElementsArray[index];
    var anchorElementsArray = viewItemElement.getElementsByTagName('a');
    if (anchorElementsArray.length == 1) {
      var anchorElement = anchorElementsArray[0];
      var newElement = document.createElement('span');
      newElement.innerHTML = '&nbsp;&nbsp;[<a title="Show this item on a Google Map" '
                           + ' href="http://www.auctionsearchkit.co.uk/search.php?'
                           + anchorElement.href
                           + '&asksrc=gm' + version + 'p17" target="_blank">Map&nbsp;Item</a>] ';
      anchorElement.parentNode.insertBefore(newElement, anchorElement.nextSibling);
    }
  }

  if (window.location.href.search(/feedback\.ebay/i) >= 0) {
    var url = getItemsUrl();
    if (url != null) {
      var menuLinksElementsArray = getElementsByINCT(null, null, null, 'menuLayerLinksYukon', 'a');
      if (menuLinksElementsArray.length > 0) {
        var menuLinksElement = menuLinksElementsArray[0];
        var newElement = document.createElement('span');
        newElement.innerHTML = '<a class="menuLayerLinksYukon" title="Show all the items on the current page on a Google Map" '
                             + ' href="' + url + '&asksrc=gm' + version + 'p18" target="_blank">Map all items on page</a></div></span>';
        menuLinksElement.parentNode.insertBefore(newElement, menuLinksElement);
      }

      var doNextListElementsArray = getElementsByINCT(null, null, null, 'outline_list dft_blt bullets', 'ul');
      for (dnleIndex = 0; dnleIndex < doNextListElementsArray.length; dnleIndex++) {
        var doNextListElement = doNextListElementsArray[dnleIndex];
        if (doNextListElement.childNodes.length > 0) {
          var newElement = document.createElement('li');
          newElement.class = 'bullets normal';
          newElement.innerHTML = '<span class="listext"><div class="ddl2-content">'
                               + '<a title="Show all the items on the current page on a Google Map" '
                               + ' href="' + url + '&asksrc=gm' + version + 'p19" target="_blank">Map all items on page</a></div></span>';
          doNextListElement.insertBefore(newElement, doNextListElement.childNodes[0]);
        }
      }
    }
  }

  var watchItemElementsArray = getElementsByINCT(null, 'l_WatchItem', null, null, 'a');
  if (watchItemElementsArray.length > 0) {
    var regexp = /(&|\?|QQ|%26|Q26|_W0QQ)item(=|Z|%3D|Q3D)([0-9]{9,12})[^0-9]*/i;

    for (var index = 0; index < watchItemElementsArray.length; index++) {
      var watchItemElement = watchItemElementsArray[index];
      var href = watchItemElement.href;
      var matches = regexp.exec(href);
      if (matches != null) { 
        var newElement = document.createElement('li');
        newElement.innerHTML = '<a title="Show this item on a Google Map" '
                             + ' href="http://www.auctionsearchkit.co.uk/search.php?item='
                             + matches[3]
                             + '&asksrc=gm' + version + 'p20" target="_blank">Map this item</a>';
        watchItemElement.parentNode.parentNode.insertBefore(newElement, watchItemElement.parentNode);
      }
    }
  } else {
    var viewItemElementsArray = getElementsByINCT(null, 'l_ViewItem', null, null, 'a');
    if (viewItemElementsArray.length > 0) {
      var regexp = /(&|\?|QQ|%26|Q26|_W0QQ)item(=|Z|%3D|Q3D)([0-9]{9,12})[^0-9]*/i;

      for (var index = 0; index < viewItemElementsArray.length; index++) {
        var viewItemElement = viewItemElementsArray[index];
        var href = viewItemElement.href;
        var matches = regexp.exec(href);
        if (matches != null) { 
          var newElement = document.createElement('li');
          newElement.innerHTML = '<a title="Show this item on a Google Map" '
                               + ' href="http://www.auctionsearchkit.co.uk/search.php?item='
                               + matches[3]
                               + '&asksrc=gm' + version + 'p20" target="_blank">Map this item</a>';
          viewItemElement.parentNode.parentNode.insertBefore(newElement, viewItemElement.parentNode);
        }
      }
    }
  }

  var myLabelElementsArray = getElementsByINCT(null, 'myLabel', null, 'vi-display', 'label');
  if (myLabelElementsArray.length > 0) {
    for (var index = 0; index < myLabelElementsArray.length; index++) {
      var myLabelElement = myLabelElementsArray[index];
      var wantItLinkElementsArray = myLabelElement.getElementsByTagName('a');
      if (wantItLinkElementsArray.length > 0) {
        var regexp = /(&|\?|QQ|%26|Q26|_W0QQ)TrackingItemId(=|Z|%3D|Q3D)([0-9]{9,12})[^0-9]*/i;

        var wantItLinkElement = wantItLinkElementsArray[0];
        var href = wantItLinkElement.href;
        var matches = regexp.exec(href);
        if (matches != null) { 
          var newElement = document.createElement('span');
          newElement.innerHTML = '<a class="watchLink" title="Show this item on a Google Map" '
                               + ' href="http://www.auctionsearchkit.co.uk/search.php?item='
                               + matches[3]
                               + '&asksrc=gm' + version + 'p20b" target="_blank"><u>Map this item</u></a> | ';
          myLabelElement.parentNode.insertBefore(newElement, myLabelElement);
        }
      }
    }
  }

  var watchStatusElementsArray = getElementsByINCT(null, 'watchStatus', null, 'vi-wantit-display', 'label');
  if (watchStatusElementsArray.length > 0) {
    for (var index = 0; index < watchStatusElementsArray.length; index++) {
      var watchStatusElement = watchStatusElementsArray[index];
      var wantItLinkElementsArray = watchStatusElement.getElementsByTagName('a');
      if (wantItLinkElementsArray.length > 0) {
        var regexp = /(&|\?|QQ|%26|Q26|_W0QQ)TrackingItemId(=|Z|%3D|Q3D)([0-9]{9,12})[^0-9]*/i;

        var wantItLinkElement = wantItLinkElementsArray[0];
        var href = wantItLinkElement.href;
        var matches = regexp.exec(href);
        if (matches != null) { 
          var newElement = document.createElement('span');
          newElement.innerHTML = '<a class="watchLink" title="Show this item on a Google Map" '
                               + ' href="http://www.auctionsearchkit.co.uk/search.php?item='
                               + matches[3]
                               + '&asksrc=gm' + version + 'p20c" target="_blank">Map this item</a> | ';
          watchStatusElement.parentNode.insertBefore(newElement, watchStatusElement);
        }
      }
    }
  }

  var watchButtonPlaced = false;
  var watchButtonStatusElementsArray = getElementsByINCT(null, 'watchButtonStatus', null, 'vi-is-hideDiv', 'label');
  if (watchButtonStatusElementsArray.length > 0) {
    for (var index = 0; index < watchButtonStatusElementsArray.length; index++) {
      var watchButtonStatusElement = watchButtonStatusElementsArray[index];
      var watchLinkElementsArray = watchButtonStatusElement.getElementsByTagName('a');
      if (watchLinkElementsArray.length > 0) {
        var regexp = /(&|\?|QQ|%26|Q26|_W0QQ)TrackingItemId(=|Z|%3D|Q3D)([0-9]{9,12})[^0-9]*/i;

        var watchLinkElement = watchLinkElementsArray[0];
        var href = watchLinkElement.href;
        var matches = regexp.exec(href);
        if (matches != null) { 
          var newElement = document.createElement('span');
          newElement.innerHTML = '<button class="sfbtn" type="button" title="Show this item on a Google Map" '
                               + ' onclick="window.open(\'http://www.auctionsearchkit.co.uk/search.php?item='
                               + matches[3]
                               + '&asksrc=gm' + version + 'p20e\');">Map this item</button> ';
          watchButtonStatusElement.parentNode.insertBefore(newElement, watchButtonStatusElement);
          watchButtonPlaced = true;
        }
      }
    }
  }

  if (watchButtonPlaced !== true) {
    var watchLinkSpanElementsArray = getElementsByINCT(null, null, null, 'watchlinkSpan', 'span');
    if (watchLinkSpanElementsArray.length > 0) {
      for (var index = 0; index < watchLinkSpanElementsArray.length; index++) {
        var watchLinkSpanElement = watchLinkSpanElementsArray[index];
        var wlsAnchorElementsArray = watchLinkSpanElement.getElementsByTagName('a');
        if ((wlsAnchorElementsArray != null) && (wlsAnchorElementsArray.length > 0)) {
          var newElement = document.createElement('span');
          var itemId = getItemIdFromUrl();
          if (itemId != null) {
            newElement.innerHTML = '<b><a class="watchLink" title="Show this item on a Google Map" '
                                 + ' href="http://www.auctionsearchkit.co.uk/search.php?item='
                                 + itemId
                                 + '&asksrc=gm' + version + 'p20d" target="_blank">Map this item</a></b> | ';
            watchLinkSpanElement.parentNode.insertBefore(newElement, watchLinkSpanElement);
          }
        }
      }
    }
  }

  var searchItemElementsArray = getElementsByINCT(null, 'searchBtnAnc', null, 'aBtn-btn', 'span');
  if (searchItemElementsArray.length > 0) {
    var newElement = document.createElement('td');
    newElement.innerHTML = '<input title="Show the results of this search on a Google Map"'
                         + ' type="button" value="Map-Search"'
                         + ' style="background-color: #0040b2; color: white; font-weight: bold;"'
                         + ' onmouseover="this.style.cursor=\'pointer\'" onmouseout="this.style.cursor=\'default\'"'
                         + ' onclick="var advSearchFormElements = document.getElementsByName(\'adv_search_from\');'
                                  + ' if ((advSearchFormElements != null) && (advSearchFormElements[0] != null)) {'
                                     + ' var url = advSearchFormElements[0].action;'
                                     + ' if ((url == \'\') || (url[0] == \'?\') || (url[0] == \'/\')) {'
                                     + '   url = window.location.href + url; '
                                     + ' }'
                                     + ' var allCtrls = advSearchFormElements[0].elements;'
                                     + ' for (ctrlNum = 0; ctrlNum < allCtrls.length; ctrlNum++) {'
                                     + '   var ctrl = allCtrls[ctrlNum];'
                                     + '   var ctrlType = ctrl.type;'
                                     + '   if (typeof ctrlType != \'undefined\') {'
                                     + '     ctrlType = ctrlType.toLowerCase();'
                                     + '     if ((ctrlType != \'submit\') && (ctrlType != \'reset\') &&'
                                     + '         (ctrlType != \'image\') && (ctrlType != \'button\') &&'
                                     + '         (((ctrlType != \'checkbox\') && (ctrlType != \'radio\')) || (ctrl.checked != false))) {'
                                     + '       url += (url.indexOf(\'?\') >= 0) ? \'&\' : \'?\';'
                                     + '       url += ctrl.name + \'=\' + escape(ctrl.value);'
                                     + '     }'
                                     + '   }'
                                     + ' }'
                                     + ' window.open(\'http://www.auctionsearchkit.co.uk/search.php?\''
                                       + ' + url + \'&asksrc=gm' + version + 'p21\'); }">&nbsp;&nbsp;&nbsp;';
    searchItemElementsArray[0].parentNode.parentNode.parentNode.insertBefore(
        newElement,
        searchItemElementsArray[0].parentNode.parentNode.nextSibling);
  }

  var locationElementsArray = getElementsByINCT(null, null, null, null, 'td',
      '(/^\\s*Item location:$/i.test(node.innerHTML) == true) && (/^(infolabel_txt|titlePurchase|inf_lab)$/i.test(node.className) == true)');
  for (var index = 0; index < locationElementsArray.length; index++) {
    var locationElement = locationElementsArray[index];
    var itemId = getItemIdFromUrl();
    if (itemId != null) {
      locationElement.nextSibling.innerHTML +=
          ' | <a title="Show this item on a Google Map" '
          + ' href="http://www.auctionsearchkit.co.uk/search.php?item='
          + itemId
          + '&asksrc=gm' + version + 'p23" target="_blank">Map this item</a>';
    }
  }
  
  var locationElementsArray = getElementsByINCT(null, null, null, null, 'div',
      '(/^\\s*Item location:/i.test(node.innerHTML) == true)');
  for (var index = 0; index < locationElementsArray.length; index++) {
    var locationElement = locationElementsArray[index];
    var itemId = getItemIdFromUrl();
    if (itemId != null) {
      locationElement.innerHTML +=
          ' | <a title="Show this item on a Google Map" '
          + ' href="http://www.auctionsearchkit.co.uk/search.php?item='
          + itemId
          + '&asksrc=gm' + version + 'p26" target="_blank">Map this item</a>';
    }
  }
  
  var askQuestionElementsArray = getElementsByINCT(null, null, null, 'asqLink', 'a');
  if (askQuestionElementsArray.length > 0) {
    for (var index = 0; index < askQuestionElementsArray.length; index++) {
      var askQuestionElement = askQuestionElementsArray[index];
      var newElement = document.createElement('div');
      var itemId = getItemIdFromUrl();
      if (itemId != null) {
        newElement.innerHTML = '<a title="Show this item on a Google Map" '
                             + ' href="http://www.auctionsearchkit.co.uk/search.php?item='
                             + itemId
                             + '&asksrc=gm' + version + 'p24" target="_blank">Map this item</a>';
        askQuestionElement.parentNode.className = 's-f-da';
        askQuestionElement.parentNode.parentNode.insertBefore(
            newElement, 
            askQuestionElement.parentNode);
      }
    }
  }

  var subMessageListElementsArray = getElementsByINCT(null, null, null, 'subMsg-disc', 'ul');
  if (subMessageListElementsArray.length > 0) {
    for (var index = 0; index < subMessageListElementsArray.length; index++) {
      var subMessageListElement = subMessageListElementsArray[index];
      var newElement = document.createElement('li');
      newElement.className = 'subMsg-bulletPadd';
      var itemId = getItemIdFromUrl();
      if (itemId != null) {
        newElement.innerHTML = '<a title="Show this item on a Google Map" '
                             + ' href="http://www.auctionsearchkit.co.uk/search.php?item='
                             + itemId
                             + '&asksrc=gm' + version + 'p25" target="_blank">Map this item</a>';
        subMessageListElement.insertBefore(
            newElement, 
            subMessageListElement.childNodes[0]);
      }
    }
  }

  var outlineListElementsArray = getElementsByINCT(null, null, null, 'outline_list dft_blt bullets', 'ul');
  if (outlineListElementsArray.length > 0) {
    for (var index = 0; index < outlineListElementsArray.length; index++) {
      var outlineListElement = outlineListElementsArray[index];
      var viewItemDetailsElementsArray = getElementsByINCT(outlineListElement,
                                                           null,
                                                           null,
                                                           null,
                                                           'a',
                                                           '/^View item details$/i.test(node.innerHTML) == true');
      if (viewItemDetailsElementsArray.length > 0) {
        var itemId = getItemIdFromUrl(viewItemDetailsElementsArray[0]);
        if (itemId != null) {
          var newElement = document.createElement('li');
          newElement.className = 'bullets normal';
          newElement.innerHTML = '<span class="listext"><div class="ddl2-content"><span><a title="Show this item on a Google Map" '
                               + ' href="http://www.auctionsearchkit.co.uk/search.php?item='
                               + itemId
                               + '&asksrc=gm' + version + 'p25" target="_blank">Map this item</a></span></div></span>';
          outlineListElement.insertBefore(
              newElement, 
              outlineListElement.childNodes[0]);
        }
      }
    }
  }

  // Make the default Messages topic "Other" and automatically submit it
  if (window.location.href.search(/contact\.ebay/i) >= 0) {
    var otherElementsArray = getElementsByINCT(null, 'Other', 'cat', null, 'input');
    if (otherElementsArray.length > 0) {
      var otherElement = otherElementsArray[0];
      otherElement.selected = true;
      otherElement.click();
      
      // Submit the form
      var continueElementsArray = getElementsByINCT(null, null, null, 'ctb', 'input');
      if (continueElementsArray.length > 0) {
        continueElementsArray[0].click();
      } else {
        var continueDiv = document.getElementById('continueBtnDiv');
        if ((continueDiv != null) && (continueDiv.firstChild != null)) {
          continueDiv.firstChild.click();
        }
      }
    }
    
    // Clear the question text
    var messageElementsArray = getElementsByINCT(null, 'msg_cnt_cnt', 'msg_cnt_cnt', null, 'textarea');
    if (messageElementsArray.length > 0) {
      for (var index = 0; index < messageElementsArray.length; index++) {
        messageElementsArray[index].value = '';
      }
    }
  }
  
  // Check if there is already an Email Alerts element (e.g. if the "eBay Supercharged Email Alerts"
  // script is already installed as well. If there is, do not do anything here.
  var emailAlertsElement = document.getElementById('email_alerts');
  if ((emailAlertsElement == null) && (saveSearchElement != null)) {
    var currency = '';
    var curElement = document.getElementById('sacur');
    if (curElement != null) {
      var labelElement = curElement.nextSibling;
      if (labelElement != null) {
        if (labelElement.innerHTML.substring(0, 16) == 'Items listed in ') {
          currency = labelElement.innerHTML.substring(16);
        }
      }
    }
    var newElement = document.createElement('span');
    var defaultSearchTitle = document.title;
    var itemsPos = defaultSearchTitle.search(/ items - Get great deals on /i);
    if (itemsPos >= 0) {
      defaultSearchTitle = defaultSearchTitle.substring(0, itemsPos);
    }
    var eBayPos = defaultSearchTitle.search(/ \| eBay/);
    if (eBayPos >= 0) {
      defaultSearchTitle = defaultSearchTitle.substring(0, eBayPos);
    }
    newElement.innerHTML = 
                        '<table style="position: fixed;'
                                    + '_position: absolute;'
                                    + 'left: 72px;'
                                    + 'top: 100px;'
                                    + '_top: expression(eval(document.body.scrollTop + 96));'
                                    + 'z-index: 999999;'
                                    + 'border-width: 5px;'
                                    + 'border-spacing: 5px;'
                                    + 'border-style: outset;'
                                    + 'border-color: gray;'
                                    + 'border-collapse: separate;'
                                    + 'background-color: white;'
                                    + 'visibility: hidden;"'
                            + ' id="email_alerts">'
                        + '<tr>'
                          + '<td>'
                            + '<b>Email Alerts</b> - Receive alerts when new items match this search.'
                          + '</td>'
                          + '<td align="right" valign="top">'
                            + '<img src="http://pics.ebaystatic.com/aw/pics/buttons/btnClose_16x16.gif"'
                                + ' onclick="var emailAlertsTable = document.getElementById(\'email_alerts\');'
                                          + 'if (emailAlertsTable != null) {'
                                            + 'emailAlertsTable.style.visibility = \'hidden\';'
                                          + '}"'
                                + ' onmouseover="this.style.cursor=\'pointer\'"'
                                + ' onmouseout="this.style.cursor=\'default\'" />'
                          + '</td>'
                        + '</tr>'
                        + '<tr>'
                          + '<td>'
                            + '<table style="border-width: 0px;'
                                          + 'border-spacing: 5px;'
                                          + 'border-collapse: separate;">'
                              + '<tr>'
                                + '<td>'
                                 + 'Search&nbsp;Title:'
                                + '</td>'
                                + '<td colspan="2">'
                                  + '<input type="text" id="search_title" title="Enter a title for this search" size=50 value="'
                                    + defaultSearchTitle + '"/>'
                                + '</td>'
                              + '</tr>'
                              + '<tr>'
                                + '<td>'
                                  + 'Email&nbsp;Address:'
                                + '</td>'
                                + '<td colspan="2">'
                                  + '<input type="text" id="email" title="Email address for receiving alerts" size=50 />'
                                + '</td>'
                              + '</tr>'
                              + '<tr>'
                                + '<td>'
                                  + 'Max&nbsp;Total&nbsp;'
                                  + (currency != '' ? '(' + currency + ')' : 'Price')
                                + ':</td>'
                                + '<td>'
                                  + '<input type="text" id="max_total" title="Maximum total price (optional)" size=10 />'
                                + '</td>'
                                + '<td align="right">'
                                  + '<input type="checkbox" id="bin_only"/><font color="red">Buy&nbsp;It&nbsp;Now</font> items only'
                                + '</td>'
                              + '</tr>'
                            + '</table>'
                          + '</td>'
                        + '</tr>'
                        + '<tr>'
                          + '<td>'
                            + '<input type="button" value="OK"'
                            + ' onclick="var emailAlertsTable = document.getElementById(\'email_alerts\');'
                                      + 'var emailElement = document.getElementById(\'email\');'
                                      + 'var searchTitleElement = document.getElementById(\'search_title\');'
                                      + 'var maxTotalElement = document.getElementById(\'max_total\');'
                                      + 'var binOnlyElement = document.getElementById(\'bin_only\');'
                                      + 'if ((emailAlertsTable != null) && (emailElement != null) && '
                                          + '(maxTotalElement != null) && (binOnlyElement != null)) {'
                                         + 'var email = escape(emailElement.value.replace(/^\\s+|\\s+$/g, \'\'));'
                                         + 'var searchTitle = escape(searchTitleElement.value.replace(/^\s+|\s+$/g, \'\'));'
                                         + 'var maxTotal = maxTotalElement.value.replace(/^\\s+|\\s+$/g, \'\');'
                                         + 'if (maxTotal != \'\') {'
                                           + 'maxTotal = parseFloat(maxTotal);'
                                         + '}'
                                         + 'var binOnly = binOnlyElement.checked;'
                                         + 'if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,4}$/i.test(email) == false) {'
                                           + 'alert(\'Not a valid email address?\\nPlease check, correct and retry.\');'
                                         + '} else if ((maxTotal != \'\') && (isNaN(maxTotal) == true)) {'
                                           + 'alert(\'Max Total must be a number or blank.\\nPlease check, correct and retry.\');'
                                         + '} else {'
                                           + 'emailAlertsTable.style.visibility = \'hidden\';'
                                           + 'var resultsWindow = window.open(\'http://www.auctionsearchkit.com/startalerts.php?email=\''
                                                    + ' + escape(email) + \'&search=\' + escape(window.location.href)'
                                                    + ' + (searchTitle != \'\' ? escape(\'&asktitle=\' + escape(searchTitle)) : \'\')'
                                                    + ' + (maxTotal != \'\' ? (binOnly == true ? escape(\'&asksatotbinhi=\' + maxTotal) : escape(\'&asksatotprchi=\' + maxTotal)) : \'\')'
                                                    + ' + (binOnly == true ? escape(\'&askbinonly=true\') : \'\')'
                                                    + ' + escape(\'&asksrc=gm' + version + 'p22\')'
                                                    + ', \'_blank\', \'channelmode=yes,directories=no,location=no,menubar=no,resizeable=no,scrollbars=no,status=no,titlebar=no,toolbar=no,width=400,height=100\');'
                                           + 'resultsWindow.moveTo(72,100);'
                                         + '}'
                                      + '}"'
                            + '/>'
                            + '<input type="button" value="Cancel"'
                            + ' onclick="var emailAlertsTable = document.getElementById(\'email_alerts\');'
                                      + 'if (emailAlertsTable != null) {'
                                        + 'emailAlertsTable.style.visibility = \'hidden\';'
                                      + '}"/>'
                          + '</td>'
                        + '</tr>'
                      + '</table>';
    saveSearchElement.parentNode.insertBefore(newElement, saveSearchElement);
    var newElement2 = document.createElement('span');
    newElement2.innerHTML = '<span class="saveSearch"><a class="anchor" rel="nofollow" href="javascript:;"'
                             + 'title="Receive email alerts when new eBay items match this search."'
                              + ' onmouseover="this.style.cursor=\'pointer\'" onmouseout="this.style.cursor=\'default\'"'
                              + ' onclick="var emailAlertsTable = document.getElementById(\'email_alerts\');'
                                        + 'if (emailAlertsTable != null) {'
                                          + 'emailAlertsTable.style.visibility = \'visible\';'
                                        + '}'
                                        + 'return false;">Email Alerts (ASK)</a> </span>';
    saveSearchElement.parentNode.insertBefore(newElement2, saveSearchElement);
  }

  // Add T&D ("Title and Description") checkbox to search inputs that don't already have them
  var searchElementsArray = getElementsByINCT(null, null, null, null, 'input', '/^(satitle|query|_nkw|lred|keywords|field-keywords)$/i.test(node.name) == true');
  if (searchElementsArray.length > 0) {
    afiElement = document.getElementById('afi');
    if (afiElement != null) {
      afiElement.style.width = '90%';
      afiElement.style.overflow = 'visible';
    }
    for (var index = 0; index < searchElementsArray.length; index++) {
      var searchElement = searchElementsArray[index];

      // Remove keywords search max length restriction
      searchElement.removeAttribute('maxLength');
      
      // Look for parent form
      var formElement = searchElement.parentNode;
      while ((formElement !== null) && (/^form$/i.test(formElement.tagName) == false)) {
        formElement = formElement.parentNode;
      }
      
      // If parent form found, check whether it already has a title and description input
      if (formElement !== null) {
        var titleAndDescElementsArray = getElementsByINCT(formElement, null, null, null, 'input', '/(^sotextsearched$|^srchdesc$|^LH_TitleDesc$)/i.test(node.name) == true');
        
        // If no title and description input was found, add one
        if (titleAndDescElementsArray.length == 0) {
          var newElement = document.createElement('span');
          newElement.className = 'afi';
          newElement.innerHTML = '<input id="asktandd" name="LH_TitleDesc" value="1" type="checkbox" title="Include title and description" onclick="var asktandd = this.checked; setTimeout(function(){var me = document.getElementById(\'asktandd\'); me.checked = asktandd; });"><span title="Include title and description">T&D</span> </input>';
          searchElement.parentNode.insertBefore(newElement, searchElement.nextSibling);
          
          if ((typeof formElement.action == 'string') &&
              (formElement.action.charAt(formElement.action.length - 1) == '/')) {
            formElement.action += 'i.html';
          }
        }

        // Commented out: Don't need to do this since can be set in the "Customise" options.
        // Code left in case it is ever needed in future
        /*// Change number of items per page
        var itemsPerPageElementsArray = getElementsByINCT(formElement, null, '_ipg', null, null, null);
        if (itemsPerPageElementsArray.length > 0) {
          for (ippIndex = 0; ippIndex < itemsPerPageElementsArray.length; ippIndex++) {
            itemsPerPageElementsArray[ippIndex].value = '50';
          }
        } else {
          var newElement = document.createElement('span');
          newElement.innerHTML = '<input id="askitemsperpage" name="_ipg" value="50" type="hidden" />';
          searchElement.parentNode.insertBefore(newElement, searchElement.nextSibling);
        }*/
		
        // Change sort order
        var sortElementsArray = getElementsByINCT(formElement, null, '_sop', null, null, null);
        if (sortElementsArray.length > 0) {
          for (sopIndex = 0; sopIndex < sortElementsArray.length; sopIndex++) {
            sortElementsArray[sopIndex].value = '15';
          }
        } else {
          var newElement = document.createElement('span');
          newElement.innerHTML = '<input id="asksortorder" name="_sop" value="15" type="hidden" />';
          searchElement.parentNode.insertBefore(newElement, searchElement.nextSibling);
        }
      }
    }
  }
  
  // Add shorter distance filters
  var sadisElementArray = getElementsByINCT(null, null, '_sadis', null, 'select', null);
  if (sadisElementArray.length > 0) {
    for (var sadIndex = 0; sadIndex < sadisElementArray.length; sadIndex++) {
      var sadElement = sadisElementArray[sadIndex];
      var prependText = '';
      if (sadElement.className == 'saveNameDistDrop') {
        prependText = ' miles';
      }
      var newElement = document.createElement('option');
      newElement.value = '5';
      newElement.innerHTML = '5' + prependText;
      sadElement.insertBefore(newElement, sadElement.firstChild);
      newElement = document.createElement('option');
      newElement.value = '3';
      newElement.innerHTML = '3' + prependText;
      sadElement.insertBefore(newElement, sadElement.firstChild);
      newElement = document.createElement('option');
      newElement.value = '2';
      newElement.innerHTML = '2' + prependText;
      sadElement.insertBefore(newElement, sadElement.firstChild);
      newElement = document.createElement('option');
      newElement.value = '1';
      newElement.innerHTML = '1' + prependText;
      sadElement.insertBefore(newElement, sadElement.firstChild);
      
      //TODO: Select the correct distance in the dropdown by getting the _sadis parameter value from the URL
    }
  }
} catch(err) {
  fbLog('Error', err);
}

// Update script code taken from "Script Update Checker": http://userscripts.org/scripts/show/20145
// Credit and many thanks to Jarett for making this free for all to use.
var SUC_script_num = 27159; // Change this to the number given to the script by userscripts.org (check the address bar)
try{function updateCheck(forced){if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))){try{GM_xmlhttpRequest({method: 'GET',url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),headers: {'Cache-Control': 'no-cache'},onload: function(resp){var local_version, remote_version, rt, script_name;rt=resp.responseText;GM_setValue('SUC_last_update', new Date().getTime()+'');remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);local_version=parseInt(GM_getValue('SUC_current_version', '-1'));if(local_version!=-1){script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];GM_setValue('SUC_target_script_name', script_name);if (remote_version > local_version){if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?')){GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);GM_setValue('SUC_current_version', remote_version);}}else if (forced)alert('No update is available for "'+script_name+'."');}else GM_setValue('SUC_current_version', remote_version+'');}});}catch (err){if (forced)alert('An error occurred while checking for updates:\n'+err);}}}GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function(){updateCheck(true);});updateCheck(false);}catch(err){}
