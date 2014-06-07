// ==UserScript==
// @author         Kenton Self
// @name           Amazon_to_BN
// @namespace      http://userscripts.org/users/208634
// @description    Add a link to equivalent barnesandnoble page to amazon pages (great for nook users who always see links to amazon.)
// @include        http://www.amazon.com/*
// ==/UserScript==

var amzpage;
var title;
amzpage=document.evaluate("//SPAN[@id='btAsinTitle']",
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if(amzpage.snapshotLength) {
  GM_log(amzpage.snapshotItem(0).textContent);
  title = amzpage.snapshotItem(0).textContent;
  
  /* Remove crap from title */
  //GM_log(title);
  title = title.replace(/\[.*\]/, "");
  //GM_log(title);
  title = encodeURIComponent(title);
  
  var newButton = document.createElement("DIV");
  newButton.innerHTML =
    '<a href="http://productsearch.barnesandnoble.com/search/results.aspx?WRD='
    + title
    + '"><img src="http://images.barnesandnoble.com/presources/images/bn_logo.gif" border=0></a>';
  
  amzpage.snapshotItem(0).parentNode.insertBefore(newButton, amzpage.snapshotItem(0).nextSibling);
}