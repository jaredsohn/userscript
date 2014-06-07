// ==UserScript==
// @name           LT Cover View Links
// @namespace      http://userscripts.org/users/brightcopy
// @description    A script for LibraryThing that creates links for each book when viewing your catalog by covers, letting you easily open links in new tabs or windows.
// @include        http://*.librarything.tld/catalog_bottom.php*
// ==/UserScript==

var loadbar = document.getElementById('catalogCoversbuffer_catalogCovers');
makeChangesWhenReady();

function makeChangesWhenReady() {
  if (loadbar.childNodes.length != 0)
    setTimeout(makeChangesWhenReady, 200)
  else {
    var covers = $x('//div[@id="catalogCovers"]/div[@class="grid LT_coverdisplay"]/div');
    
    if (covers.snapshotLength) {
      for (var i = 0; i < covers.snapshotLength; i++) {
        cover = covers.snapshotItem(i);
        var id = cover.getAttribute('id').match(/catalogCovers_imgdiv_(\d+)/)[1];
        var a = document.createElement('a');
        a.href = '/work//covers/' + id;
        a.target = '_top';
        cover.parentNode.insertBefore(a, cover);
        cover.parentNode.removeChild(cover);
        a.appendChild(cover);
      }
    }
  }
}

function $x(x, t, r) {
    if (t && t.nodeType) 
        var h = r, r = t, t = h;    
    var d = r ? r.ownerDocument || r : r = document, p;
    switch (t) {
    case 1:
        p = 'numberValue';
        break;
    case 2:
        p = 'stringValue';
        break;
    case 3:
        p = 'booleanValue';
        break;
    case 8: case 9:
        p = 'singleNodeValue';
        break;
    default:
        return d.evaluate(x, r, null, t || 6, null);
    }
    return d.evaluate(x, r, null, t, null)[p];
}
