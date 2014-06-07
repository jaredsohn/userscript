// ==UserScript==
// @name           Userscript.org Reply to PM on Same Page
// @namespace      sizzlemctwizzle
// @description    Lets you reply to a message on the same page.
// @include        http://userscripts.org/messages/*
// @require        http://sizzlemctwizzle.com/updater.php?id=95413
// @version        0.0.3
// ==/UserScript==

// Smart XPath Function
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
// Optional shortcut functions I like
function $x1(x, r) { return $x(x, XPathResult.FIRST_ORDERED_NODE_TYPE , r) } 
function $xb(x, r) { return $x(x, XPathResult.BOOLEAN_TYPE, r) }
// A robust and universal forEach
function forEach(lst, cb) {
    if(!lst) 
        return;
    if (lst.snapshotItem)
        for (var i = 0, len = lst.snapshotLength; i < len; ++i)
            cb(lst.snapshotItem(i), i, lst);
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
// Insert an element after another
function insertAfter(node, after) { after.parentNode.insertBefore(node, after.nextSibling);}
// A really cool element creation funtion by avg and JoeSimmons, and modified by me
function create() {
    switch(arguments.length) {
        case 1:
            var A = document.createTextNode(arguments[0]);
	    break;
        default:
            var A = document.createElement(arguments[0]),
                B = arguments[1];
            for (var b in B) {
	        if (b.indexOf("on") == 0)
		    A.addEventListener(b.substring(2), B[b], false);
		else if (",style,accesskey,id,name,src,href,which".indexOf("," +
                         b.toLowerCase()) != -1)
		    A.setAttribute(b, B[b]);
		else
		    A[b] = B[b];
            }
            for(var i = 2, len = arguments.length; i < len; ++i)
	        A.appendChild(arguments[i]);
    }
    return A;
}
// Remove an element
function remove(element1) { element1.parentNode.removeChild(element1); }
// Get element by id
function $(element2) { return document.getElementById(element2); }
// Get elements by classname
function $c(element3, root) { return (root||document).getElementsByClassName(element3); }
function xhr(url, callback, data) {
    GM_xmlhttpRequest({
          method: (data) ? 'POST' : 'GET',
	  url: url,
	  headers: {
	  'User-agent': window.navigator.userAgent,
	  'Content-type': (data) ? 'application/x-www-form-urlencoded' : null
	  },
	  data: (data) ? data : null,
	  onload: function(res) { if (res.status == 200) callback(res.responseText); }
      });
}
function makeDoc(txt, cb) {
  var dt = document.implementation.createDocumentType("html", 
        "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
      doc = document.implementation.createDocument('', '', dt),
      html = doc.createElement('html');

  html.innerHTML = txt;
  doc.appendChild(html);
  cb(doc);
}

function createForm(doc) {
  var form = $x1('//form[@id="new_message"]', doc);
  if (!$x1) window.location.href += '/reply';
  
  form.setAttribute('style', 'margin-top:10px;');
  $('reply_holder_div').appendChild(form);
}

var replyLink = $x1('//p[@class="controls"]/a/child::text()[.="reply"]/..');

if (replyLink) {
  replyLink.setAttribute('href', '#');
  replyLink.addEventListener('click', function(e) {
      if (!$('reply_holder_div')) {
          var spacer = create('div', { style: 'height: 10px;width:100%;border-bottom:1px solid #ccc;' });
          var holder = create('div', { id: 'reply_holder_div', style: 'margin-left: 200px;clear:both;' }, spacer);
          $x1('//li[@class="full"]').appendChild(holder);
        xhr(window.location.href + '/reply', function(txt) { makeDoc(txt, createForm); });
      }
      e.preventDefault();
  }, false);
}