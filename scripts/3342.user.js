// Printable
// version 0.5
// 2006-22-02
// Copyright (c) 2006, Chandra Siva (www.chandraonline.net)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Printable", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Printable
// @namespace     http://www.chandraonline.net/projects/Printable/
// @description   When the page is printed, it creates a reference for every link
//                in the document and each of these links are turned into a tinyurl for
//                convenient typing.
// @include       *
// ==/UserScript==

var pageAddr, links, a, href,tinyurl;
pageAddr = window.location.href;

addGlobalPrintStyle();

links = document.evaluate(
      "//a[@href]",
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null);

var filler = document.createElement('hr');
document.body.appendChild(filler);

for (var i = 0,counter = 0; i < links.snapshotLength; i++) {
      a = links.snapshotItem(i);
      
      // Do this only if the hyperlink contains text
      if (a.firstChild.nodeType == 3) {
        counter++;
        var printableText = document.createElement('span');
        var id = 'id' + i;
        printableText.setAttribute('style','display:none');
        printableText.setAttribute('id', id)
        printableText.setAttribute('class', 'printable')
        GM_log(printableText.innerHTML);
        var tinyurl = getTinyURL(id,counter,a.firstChild.nodeValue);      
        GM_log(tinyurl);
        document.body.appendChild(printableText);
        
        var printableIndex = document.createElement('span');
	printableIndex.setAttribute('style','display:none');
	var iid = 'iid' + i;
	printableIndex.setAttribute('id', iid)
        printableIndex.setAttribute('class', 'printable_index')
        printableIndex.innerHTML = '<span><sup>'+ counter + '</sup></span>';
        a.parentNode.insertBefore(printableIndex,a.nextSibling);
      } 
}

function addGlobalPrintStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    head.appendChild(style);
    
    var sty = document.styleSheets[document.styleSheets.length - 1];
    sty.insertRule("span.printable { display: none ! important; }", 0);
    sty.insertRule("@media print { span.printable { display: block ! important;}}", 1);
    sty.insertRule("span.printable_index { display: none ! important; }", 2);
    sty.insertRule("@media print { span.printable_index { display: inline ! important;}}", 3);
}

function getTinyURL(id,counter,text) {
      GM_xmlhttpRequest({
      method: 'GET',
      url: 'http://tinyurl.com/create.php?url=' + a.href,
      onload: function(responseDetails) {
                 var printableText = document.getElementById(id)
                
                 // try to turn the text into a dom object
                 var doc = document.createElement('div');
                 doc.innerHTML = responseDetails.responseText

                 var hiddens = doc.getElementsByTagName('input');
                 for (var l = 0; hidden = hiddens[l]; ++l) {
                    if (hidden.getAttribute && hidden.getAttribute('name') == 'tinyurl') {
                       url1 = hidden.getAttribute('value');
                       break;
                    }
                 }
                 
                 GM_log("url1=" + url1);
                 printableText.innerHTML = '<span class="printable">[' + counter + '] ' + text + ' : ' + url1 + '</span>';
               } 
      });
}

//
// ChangeLog
//
//
// 2006-20-2:  0.5 : Initial Version
//
