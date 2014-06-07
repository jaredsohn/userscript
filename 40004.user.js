// ==UserScript==
// @name           urlficarea codurilor
// @namespace      http://userscripts.org/users/andone
// @include        http://www.realoem.com/bmw/showparts.do?model=AS71&mospid=47635&btnr=21_0093&hg=21&fg=05
// @version        0.0.1
// ==/UserScript==

var findRow = '/html/body/table/tbody/tr/td/div[@id="div3"]/table/tbody/tr'
var snap = document.evaluate( findRow, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var nr = snap.snapshotLength;
for( i=1; i<nr; i++) {
  var tr = snap.snapshotItem(i);
  var td = null;
  if ( tr.childNodes.length>6 )
    td = tr.childNodes[6];
  if ( td )
    td.innerHTML="<a href='http://www.site.ro/cod="+td.innerHTML+"'>"+td.innerHTML+"</a>";
}
