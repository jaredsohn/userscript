// ==UserScript==
// @name       awesomenauts forum fixer
// @namespace  awesomenauts.nodja
// @version    0.1
// @description  no middle click shenanigans
// @match      http://*.awesomenauts.com/forum/*
// @copyright  2013+,
// ==/UserScript==

// gets all td elements with class="row1 clickable"
var allClickables = document.evaluate
                                    (
                                      '//td[@class="row1 clickable"]',
                                      document, 
                                      null,
                                      XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                                      null
                                    );

//replaces the onclick to check for left button
for (var i=0; i<allClickables.snapshotLength; i++) 
{
  var elem = allClickables.snapshotItem(i);
  elem.setAttribute("onclick","if (event.button == 0) " + elem.getAttribute("onclick"));
}