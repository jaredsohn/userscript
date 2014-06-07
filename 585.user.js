// ==UserScript==
// @name          Show latest post on LiveJournal userinfo page
// @namespace     http://bje.nu/mozilla-greasemonkey.shtml
// @description   Show the latest post of an LJ user on the userinfo page.
// @include       http://www.livejournal.com/userinfo.bml*
// ==/UserScript==

(function(){
  // GM version check
  if (!GM_xmlhttpRequest) {
    alert('upgrade Greasemonkey to at least 0.2.6');
    return;
  }
  var elements = document.evaluate("//link[@type='application/atom+xml']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
  var e, i;
  for (e = null, i = 0; (e = elements.snapshotItem(i)); i++) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: e.getAttribute('href'),
        headers: [{'Content-type': e.getAttribute('type')}],
        onload:function(results){
          var d, x, t, et, b, eb;
          var DP = new DOMParser();
          x = results.responseText;
          d = DP.parseFromString(String(x), "text/xml");
          if (d) {
            var entries = d.getElementsByTagName("entry");
            var ent, j;
            for (ent = null, j = 0; (ent = entries[j]); j++) {
              if (j < 1) {
                t = ent.getElementsByTagName("title");
                b = ent.getElementsByTagName("content");
                l = ent.getElementsByTagName("link");
                var ehtml = "";
                ehtml += (t[0].textContent != '') ? '<h2>' + t[0].textContent + '</h2>' : '';
                ehtml += '<p>' + b[0].textContent + '</p>';
                if ((l[0].getAttribute('rel') == 'alternate') && (l[0].getAttribute('type') == 'text/html')) {
                  ehtml += '<p><a href="' + l[0].getAttribute('href') + '">link</a></p>';
                }
                div = document.createElement('div');
                div.innerHTML = ehtml;
                var tables = document.evaluate("//table[@cellpadding='5']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                var table, k;
                for (table = null, k = 0; (table = tables.snapshotItem(k)); k++) {
                  var row = table.insertRow(3);
                  row.setAttribute('valign', 'top');
                  // left cell
	                var cellLeft = row.insertCell(0);
	                cellLeft.setAttribute('align', 'right');
	                var textNode = document.createTextNode('Latest post:');
	                var boldNode = document.createElement('b');
	                boldNode.appendChild(textNode);
	                cellLeft.appendChild(boldNode);
	                // right cell
	                var cellRight = row.insertCell(1);
	                cellRight.appendChild(div);
                }
              }
            }
          }
        }
    });
  }
})();