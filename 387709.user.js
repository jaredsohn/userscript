// ==UserScript==
// @name          Like Everything On Mobile Facebook
// @namespace     http://m.facebook.com/
// @description   Drink everybody's KoolAide
// @include       http://m.facebook.com/home.php*
// ==/UserScript==
function xhr(url, cb, data) {
  if (!cb) cb = function() {};
  var res =  new XMLHttpRequest();
  res.onreadystatechange = function() { if (res.readyState==4 && res.status==200) cb(res.responseText) };
  res.open(data ? 'POST' : 'GET', url, true);
  if (data) {
    res.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    res.setRequestHeader("Connection", "close");
    res.setRequestHeader("Content-length", data.length);
  }
  res.send(data||null);
}

function forEach(lst, cb) {
    if(!lst) 
        return;
    if (lst.snapshotItem)
        for (var i = 0, len = lst.snapshotLength, 
                 snp = lst.snapshotItem; i < len; ++i)
            cb(snp(i), i, lst);
    else if (lst.iterateNext) {
        var item, next = lst.iterateNext;
        while (item = next()) 
            cb(item, lst);
    } else if (typeof lst.length != 'undefined') 
        for (var i = 0, len = lst.length; i < len; ++i)
            cb(lst[i], i, lst);
    else if (typeof lst == "object")
        for (var i in lst) 
            cb(lst[i], i, lst);
}

function $x(x, t, r) {
    if (t && t.tagName) 
        var h = r, r = t, t = h;    
    var d = r ? r.ownerDocument || r : r = document, p;
    switch (t) {
    case XPathResult.NUMBER_TYPE:
        p = 'numberValue';
        break;
    case XPathResult.STRING_TYPE:
        p = 'stringValue';
        break;
    case XPathResult.BOOLEAN_TYPE:
        p = 'booleanValue';
        break;
    case XPathResult.ANY_UNORDERED_NODE_TYPE: 
    case XPathResult.FIRST_ORDERED_NODE_TYPE:
        p = 'singleNodeValue';
        break;
    default:
        return d.evaluate(x, r, null, t || XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    }
    return d.evaluate(x, r, null, t, null)[p];
}

// Now the actual code
forEach($x('//a[starts-with(@href, "/a/like.php?") and not(contains(@href, "del=1"))]'),
  function(link) {
	xhr(link.href.replace(/&amp;/g, '&'));
        link.href = link.href.replace('del=0', 'del=1');
        link.textContent = 'Unlike';
});