// Hopefully this will become a regular feature on WordPress.com soon.
// They are collecting stats for pages, but they don't offer an easy way
// to access the stats. This script makes the Edit Pages panel work the same
// way as the Edit Posts panel and gives you access to the stats.
//
// ==UserScript==
// @name           WordPress.com Stats for Pages
// @namespace      http://InternetDuctTape.com
// @description    Adds the missing stats links to the WordPress.com edit pages admin panel.
// @include        http*/wp-admin/edit-pages.php
// ==/UserScript==

(function() {
  addStats();
 })();

function $x(p, context) {
  if (!context) context = document;
  var i, arr = [], xpr = document.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
  return arr;
}

function insertAfter(newNode, node) {
  return node.parentNode.insertBefore(newNode, node.nextSibling);
}

function addStats () {
  var header = $x("/html/body/div[4]/table/thead/tr/th[3]");
  if (header.length > 0) {
    var th = document.createElement("th");
    th.innerHTML = "Stats";
    insertAfter(th, header[0]);
  }

  var rows = $x("/html/body/div[4]/table/tbody/tr");
  rows.forEach(function(r) {
		 var pageid = $x(".//th", r);
		 if (pageid.length > 0) {
		   pageid = pageid[0].innerHTML;
		   var pos = $x(".//td[2]", r);
		   if (pos.length > 0) {
		   var td = document.createElement("td");
		   td.innerHTML = '<a title="Page statistics" href="/wp-admin/index.php?page=stats&view=post&post='+pageid+'">&nbsp;<img src="/i/stats-icon.gif" />&nbsp;</a>';
		   insertAfter(td, pos[0]);
		   }
		 }
	       }
	       );  
}
