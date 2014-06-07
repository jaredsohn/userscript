// ==UserScript==
// @name               Google Two Columns (Modified version)
// @namespace      http://userscripts.org/scripts/show/112530
// @description      Shows the search results in two columns
// @version             1.81
// @author              nohexie
// @include             http://www.google.*/search?*
// @include             https://www.google.*/search?*
// @include             https://encrypted.google.*/search?*
// ==/UserScript==

result2 = '<table width="200%" align="center" cellpadding="10" style="font-size:12px">';
gEntry = document.evaluate("//li[@class='g'] | //div[@class='g'] | //li[@class='g w0'] | //li[@class='g s w0']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < gEntry.snapshotLength; i++) {
  if (i==0) { var sDiv = gEntry.snapshotItem(i).parentNode.parentNode; }
  if(i%2 == 0) { result2 += '<tr><td width="50%" valign="top">'+gEntry.snapshotItem(i).innerHTML+'</td>'; }
  if(i%2 == 1) { result2 += '<td width="50%" valign="top">'+gEntry.snapshotItem(i).innerHTML+'</td></tr>'; }
}
sDiv.innerHTML = result2+'</table>';

if (document.getElementById('mbEnd') !== null) { document.getElementById('mbEnd').style.display = 'none'; }