// AuctionSearchKit - "eBay Supercharged Email Alerts" User Script
// Version 3.1
// 2013-01-26
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
// select "eBay Supercharged Email Alerts", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          eBay Supercharged Email Alerts
// @namespace     http://www.auctionsearchkit.co.uk
// @description   Get instant emails when new eBay items match your search. Set a maximum *total* price including p&p. Emails include photos. 
// @include       http://*.ebay.*
// ==/UserScript==

// Script version. NOTE: This should also be updated at the top.
var version = '3.1';
var DEBUG_MODE = false;

// If in DEBUG mode and FireBug is installed, define a logging function using the FireBug console
if ((DEBUG_MODE === true) && (unsafeWindow.console)) {
  // Log a variable's value via the Firebug console (if debug mode is turned on)
  function fbLog(name, value) {
    if (DEBUG_MODE === true) {
      switch (typeof value) {
        case 'ftp://ftp.':
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

  // Check if there is already an Email Alerts element (e.g. if the "eBay Items on Google Maps"
  // script is already installed as well. If there is, do not do anythnig here.
  var emailAlertsElement = document.getElementById('email_alerts');
  if (emailAlertsElement == null) {
    var saveSearchElement = document.getElementById('span_save_search');
    if (saveSearchElement == null) {
      saveSearchElement = document.getElementById('fpcSaveSearchLink');
    }
    if (saveSearchElement == null) {
      saveSearchElement = document.getElementById('saveSearchLinkDash');
    }
    if (saveSearchElement == null) {
      saveSearchElement = getElementsByINCT(null, null, null, 'saveSearch', 'span');
      if (saveSearchElement != null) {
        saveSearchElement = saveSearchElement[0];
      }
    }
    if (saveSearchElement != null) {
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
      var defaultSearchTitle = document.title;
      var itemsPos = defaultSearchTitle.search(/ items - Get great deals on /i);
      if (itemsPos >= 0) {
        defaultSearchTitle = defaultSearchTitle.substring(0, itemsPos);
      }
      var eBayPos = defaultSearchTitle.search(/ \| eBay/);
      if (eBayPos >= 0) {
        defaultSearchTitle = defaultSearchTitle.substring(0, eBayPos);
      }
      var newElement = document.createElement('span');
      newElement.innerHTML = 
                          '<table style="position: fixed;'
                                      + '_position: absolute;'
                                      + 'left: 72px;'
                                      + 'top: 100px;'
                                      + '_top: expression(eval(document.body.scrollTop + 96));'
                                      + 'z-index: 99999999999999;'
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
                              + '<b>Email Alerts (using'
                                 + ' <font color="red">A</font>uction<font color="green">S</font>earch<font color="blue">K</font>it)'
                              + '</b><br>'
                              + 'Please enter email address to receive alerts when new items match this search.<br>'
                              + '(You may also enter a maximum total price for the matching items if required.)'
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
      newElement2.innerHTML = '<span class="saveSearch">[ <a class="anchor" rel="nofollow" href="javascript:;"'
                               + 'title="Receive email alerts when new eBay items match this search."'
                                + ' onmouseover="this.style.cursor=\'pointer\'" onmouseout="this.style.cursor=\'default\'"'
                                + ' onclick="var emailAlertsTable = document.getElementById(\'email_alerts\');'
                                          + 'if (emailAlertsTable != null) {'
                                            + 'emailAlertsTable.style.visibility = \'visible\';'
                                          + '}'
                                          + 'return false;">Email Alerts (ASK)</a> ] |</span>';
      saveSearchElement.parentNode.insertBefore(newElement2, saveSearchElement);
    }
  }
} catch(err) {
  fbLog('Error', err);
}
