// This is a script for the Skype call histoty page. Please see the description below.
//
// Copyright (c) 2009, Ricardo Mendonca Ferreira (ric@mpcnet.com.br)
// Released under the GPL license - http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Skype Call history page totals
// @description   See the sum of your call times and total cost for each month on the Skype site
// @namespace     http://userscripts.org/scripts/show/57759
// @include       https://secure.skype.com/account/call-history*
// @version       2009.09.14
// ==/UserScript==
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://www.greasespot.net/
// Install Greasemonkey, then restart Firefox and revisit this script.
//
// To uninstall, go to Tools/Greasemonkey/Manage User Scripts,
// select this script and click Uninstall.
//
// --------------------------------------------------------------------
//
// History:
// --------
// 2009.09.14  First version
//


(function() {


var html = document.body.innerHTML.replace(/[\n\r]+/g, ' ');

var paging = html.match(/<span id="page-next"/);

var list = html.match(/<table class="list">(.+?)<\/table/)[1];
var rows = list.match(/<td>\d*?:?\d+:\d+<\/td>\s*<td class="price">.*?<\/td>/g);
var ccy  = rows[0].match(/<span class="ccy">(.*?)<\/span>/)[1];
var t_time = 0;
var t_cost = 0;

for (var i = 0; i < rows.length; i++) {
   var r = rows[i].match(/<td>(\d*?):?(\d+):(\d+)<\/td>/);
   var h = r[1] * 1;
   var m = r[2] * 1;
   var s = r[3] * 1;
   if (s && s > 0)
      m++;
   var duration = m + h*60;
   t_time += duration;

   r = rows[i].match(/<span class="ccy">.*?<\/span>\s*(\d+),(\d+)<\/td>/);
   t_cost += (r[1]*1) + (r[2]*1)/1000;
}

var h = (t_time / 60) - ((t_time / 60) % 1);
var m = t_time - h*60;

if (!h) h = '00'; else if (h < 10) h = '0'+h;
if (!m) m = '00'; else if (m < 10) m = '0'+m;
//print(t_time +' min. ('+h+'h'+m+')');
//print("Total: "+ccy+' '+t_cost);

var table = document.evaluate("//table[@class='list']", document, null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
var row = table.insertRow(table.rows.length);
var cell0 = row.insertCell(0);
var cell1 = row.insertCell(1);
var cell2 = row.insertCell(2);
var cell3 = row.insertCell(3);
var cell4 = row.insertCell(4);
var cell5 = row.insertCell(5);

if (paging) {
   cell1.textContent = "Show 'ALL items per page' to see a summary";
} else {
   cell4.textContent = t_time +' min. ('+h+'h'+m+')';
   cell5.setAttribute('class','price');
   cell5.textContent = "Total: "+ccy+' '+t_cost.toFixed(3);
}

})()
