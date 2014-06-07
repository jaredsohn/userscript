// ==UserScript==
// @name           Google Two Columns by chesmer
// @description    Shows the search results in two columns
// @author         chesmer~ http://www.linuxlife.net
// @include        http://www.google.com*/search?*
// @include        http://google.com*/search?*
// @version        1.5
// ==/UserScript==


result2 = '<table width="100%" align="center" cellpadding="10" style="font-size:12px">';
gEntry = document.evaluate("//li[@class='g']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
for (var i = 0; i < gEntry.snapshotLength; i++) {
  if (i==0) { var sDiv = gEntry.snapshotItem(i).parentNode.parentNode; }
  if(i%2 == 0) { result2 += '<tr><td width="50%" valign="top">'+gEntry.snapshotItem(i).innerHTML+'</td>'; }
  if(i%2 == 1) { result2 += '<td width="50%" valign="top">'+gEntry.snapshotItem(i).innerHTML+'</td></tr>'; }
}
sDiv.innerHTML = result2+'</table>';

if (document.getElementById('mbEnd') !== null) { document.getElementById('mbEnd').style.display = 'none'; }

// Change log
//
// v1 First release.
// v1.1 Updated due to changes in Google's markup.
// v1.2 Removed sponsored links to the right, which overlapped the search results.
// v1.3 Updated due to changes in Google's markup.
// v1.4 Updated due to changes in Google's markup.
// v1.5 Updated due to changes in Google's markup.