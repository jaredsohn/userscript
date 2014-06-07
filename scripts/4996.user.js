// Zooomr BB Code Generator
// version 1.0
// 03-08-2006
// Copyright (c) 2006, JAPIO
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
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
// select "Zooomr BB Coder", and click Uninstall.
//
//
// ==UserScript==
// @name           Zooomr BB Code Generator
// @namespace      http://beta.zooomr.com/photos/jaapkramer
// @description    BB Coder for Zooomr. 
// @include        http://beta.zooomr.com/zooom_it.awe*
// ==/UserScript==
//
// ------------------------------------------------------------------------------------//
// ------------------------------------------------------------------------------------//


var allAreas, textArea, textAreaValue, newPElement, newTextArea, allInputs, inputArea, photoPageLink, imageLink;

allAreas = document.evaluate("//textarea[@rows='4']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
textArea = allAreas.snapshotItem(0);
textAreaValue = textArea.value;
photoPageLink = textAreaValue.substring(textAreaValue.indexOf('a href="')+8, textAreaValue.indexOf('/"')+1)

allInputs = document.evaluate("//input[@name='textfield']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
inputArea = allInputs.snapshotItem(0);
imageLink = inputArea.getAttribute("value");

newPElement = document.createElement('p');
pel = document.createElement('p');
text = "...Or Copy and paste this BB Code into your Forum:";
doc = document.createTextNode(text);
newPElement.appendChild(doc);
newPElement.appendChild(pel);
newTextArea = document.createElement('textarea');
newTextArea.setAttribute('name', 'bbcodetextfield');
newTextArea.setAttribute('onFocus', 'this.select();' );
newTextArea.setAttribute('rows', '2');
newTextArea.setAttribute('style', 'width: 500px;');
newTextArea.setAttribute('wrap', 'virtual');
newTextArea.value='[url=' + photoPageLink + '][img]'+ imageLink +'[/img][/url]';

newPElement.appendChild(newTextArea);
textArea.parentNode.parentNode.insertBefore(newPElement, textArea.parentNode.nextSibling);


//.user.js
