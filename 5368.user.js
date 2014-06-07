// ==UserScript==
// @name     Bloglines - Open All Links in New Tabs
// @namespace   
// @description Adds an "Open All Links" link on the blue bar
// @include  http://*bloglines.com/myblogs_display?*
// ==/UserScript==

if (!GM_openInTab) 
 alert("Install a newer version of Greasemonkey to run.");

ULlist=document.getElementsByTagName('ul')[1];
newLink=document.createElement('li');
newLink=ULlist.insertBefore(newLink,ULlist.firstChild);
newLink.innerHTML='<a href=# style="color:#ffff00"><b>open all links</b></a>';
newLink.addEventListener("click", 
 function(event) {
  var xpath = "//h3/a";
  var res = document.evaluate(xpath, document, null,
   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < res.snapshotLength; i++) 
   GM_openInTab(res.snapshotItem(i).href);
  var xpath = "//div/ul/li/a";
  var res = document.evaluate(xpath,  document, null,
   XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (var i = 0; i < res.snapshotLength; i++) 
   if (res.snapshotItem(i).innerHTML=="Permalink")
    GM_openInTab(res.snapshotItem(i).href);
  },
 true);