// Flickr BBCode Generator user script
// version 0.1 BETA!
// 2006-07-18
// Copyright (c) 2006, Ryan Waddell
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
// select "Hello World", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Flickr BBCode Generator
// @namespace     http://www.ryanwaddell.com
// @description   Script to add a textarea with BBCode 
// @include       http://*flickr.com/photo_zoom.gne*
// ==/UserScript==

var allAreas, textArea, textAreaValue, newPElement, newTextArea, allInputs, inputArea, photoPageLink, imageLink;

allAreas = document.evaluate("//textarea[@name='textfield']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
textArea = allAreas.snapshotItem(0);
textAreaValue = textArea.value;
photoPageLink = textAreaValue.substring(textAreaValue.indexOf('a href="')+8, textAreaValue.indexOf('/"')+1)

allInputs = document.evaluate("//input[@name='textfield']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
inputArea = allInputs.snapshotItem(0);
imageLink = inputArea.getAttribute("value");

newPElement = document.createElement('p');
newTextArea = document.createElement('textarea');
newTextArea.setAttribute('name', 'bbcodetextfield');
newTextArea.setAttribute('onFocus', 'this.select();' );
newTextArea.setAttribute('rows', '4');
newTextArea.setAttribute('style', 'width: 520px;');
newTextArea.setAttribute('wrap', 'virtual');
newTextArea.value='[url=' + photoPageLink + '][img]'+ imageLink +'[/img][/url]';
newPElement.appendChild(newTextArea);
	
textArea.parentNode.parentNode.insertBefore(newPElement, textArea.parentNode.nextSibling);

