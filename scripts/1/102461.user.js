// ==UserScript==
// @name           LT Large Change Cover Image
// @namespace      http://userscripts.org/users/brightcopy
// @description    A script for LibraryThing that adds a large image of the current cover at the top-right of the change cover image page.
// @include        http://*.librarything.tld/work/*/covers/*
// ==/UserScript==
 
var book_id = location.pathname.split('/').pop();
var td = $x('//td[@class="right"]', XPathResult.ANY_UNORDERED_NODE_TYPE);
if (td && book_id) {
  var center = document.createElement('center');
  var img = document.createElement('img');
  img.setAttribute('src', '/coverthing_dynamic.php?book=' + book_id + '&width=200');
  img.setAttribute('style', 'margin-bottom: 6px');
  center.appendChild(img);
  td.insertBefore(center, td.firstChild);
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
