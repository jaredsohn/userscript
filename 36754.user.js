// ==UserScript==
// @name           Google Three Columns
// @description    Shows the search results in three columns
// @author         Pnux~ http://www.pnux.org
// @include        http://www.google.com*/search?*
// @include        http://google.com*/search?*
// @include        http://www.google.co.*/search?*
// @include        http://google.co.*/search?*
// @version        1.0
// ==/UserScript==


result2 = '<table width="100%" align="center" cellpadding="10" style="font-size:12px">';
gEntry = document.evaluate("//li[@class='g'] | //div[@class='g'] | //li[@class='g w0']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < gEntry.snapshotLength; i++) {
  if (i==0) { var sDiv = gEntry.snapshotItem(i).parentNode.parentNode; }
  if(i%3 == 0) { result2 += '<tr><td width="33%" valign="top">'+gEntry.snapshotItem(i).innerHTML+'</td>'; }
  if(i%3 == 1) { result2 += '<td width="33%" valign="top">'+gEntry.snapshotItem(i).innerHTML+'</td>'; }
  if(i%3 == 2) { result2 += '<td width="33%" valign="top">'+gEntry.snapshotItem(i).innerHTML+'</td></tr>'; }
}
sDiv.innerHTML = result2+'</table>';

if (document.getElementById('mbEnd') !== null) { document.getElementById('mbEnd').style.display = 'none'; }

// Change log
//