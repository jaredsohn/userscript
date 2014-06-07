// ==UserScript==
// @name           UserScripts.org > Auto-Watch Topics You Reply To
// @namespace      sizzlemctwizzle
// @include        http://userscripts.org/topics/*
// @require        http://sizzlemctwizzle.com/updater.php?id=57208
// @description    Automatically monitor topics to which you reply
// @version        1.0.2
// ==/UserScript==

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
function $x1(x, r) { return $x(x, XPathResult.FIRST_ORDERED_NODE_TYPE , r) } 

function xhr(url, cb, data) {
  var res =  new XMLHttpRequest();
  res.onreadystatechange = function() { 
    if (res.readyState==2 && res.status==200) 
      cb(res.responseText) 
  };
  res.open(data ? 'POST' : 'GET', url, true);
  if (data) {
    res.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    res.setRequestHeader("Connection", "close");
    res.setRequestHeader("Content-length", data.length);
  }
  res.send(data||null);
}

function $(el) { return document.getElementById(el); }

if ($('monitor_checkbox').checked) return;

// hijack the sumbit button
var button = $x1('//div[@id="reply"]//input[@type="submit"]');
var tid = location.pathname.match(/topics\/(\d+)/)[1];
if (button) {
  button.setAttribute("type", "button");
  button.addEventListener('click',  function() {
      xhr('/topics/' + tid + '/monitorships', 
          function() { $x1('//div[@id="reply"]//form[1]').submit(); }, 
          'authenticity_token=' + encodeURIComponent(unsafeWindow.auth_token));
    }, false);
}