// ==UserScript==
// @name          Something Awful Open Updated Threads In Tabs
// @include     http://forums.somethingawful.com/usercp.php*
// @description   Adds a button on the User Control Panel that opens any updated threads into new tabs
// ==/UserScript==

function handleClick(e) {
   // Remove the button
   element = document.getElementById("openall");
   element.parentNode.removeChild(element);

   // Open all updated threads in tabs
   var got = document.evaluate('.//*[@class="count"]', document, null, XPathResult.ANY_TYPE, null);
   while (a = got.iterateNext())
     GM_openInTab(a.href);
}

// Add the button
var title = document.evaluate('.//*[@class="title"]', document, null, XPathResult.ANY_TYPE, null).iterateNext();
var dummyDiv = document.createElement('div');
dummyDiv.innerHTML = '<div id="openall" style="float:right;font-size:12px;background:#F7F7F7; padding: 2px;'
  + 'border:1px solid #D5D5D5;color:#555;cursor:pointer;">Open updated threads into new tabs</div>';
title.insertBefore(dummyDiv.firstChild, title.firstChild);
document.getElementById("openall").addEventListener('click', handleClick, false);
