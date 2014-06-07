// ==UserScript==
// @name           Textarea Keyboard Shortcuts
// @description    Userscripts Comments Fix style shortcuts for the whole web
// @namespace      sizzlemctwizzle
// @version        0.0.7
// @icon           http://sizzlemctwizzle.com/arrrkitty.jpg
// @require        http://sizzlemctwizzle.com/updater.php?id=95587
// @include        http://*
// @include        https://*
// @exclude        http://userscripts.org/*
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

// Format the quote and append the quote to the correct box
function quote_handle(e) {
 var box = $x1('//textarea');
 if (lastSelectedBox) box = lastSelectedBox;
 else if (!box) return;
 
 var select = window.getSelection();
 if (!select || !select.focusNode) return;
	
 e.preventDefault();
 
 var tag = select.focusNode.parentNode.tagName.toLowerCase();
 var opentag = '', closetag = '';
 if (tag == "pre"  || tag == 'code') {
	opentag = '<' + tag + '>';
	closetag = '</' + tag + '>';
 }
 
 var quoted = select.toString().replace(/^\s+|\s+$/g, '');
 if (quoted == '') return;
 quoted = '<blockquote>' + opentag + quoted + closetag + '</blockquote>';
   
  box.focus();
  if (box.value == '') {
		box.value = quoted;
		box.scrollTop = box.scrollHeight;
  } else {
	var x, y;
    if ( (y=box.selectionEnd) - (x=box.selectionStart) == 0 ) { // insert quote at cursor
      box.value = (box.value).substring(0, x) + quoted + '\n' + (box.value).substring(y, (box.value).length);
      var len = ((box.value).substring(0, x) + quoted).length
      box.setSelectionRange(len, len);
    } else { // append quote
      if (/\n$/.test(box.value))
        box.value = box.value.replace(/\n+$/,'');
      box.value += quoted;
      box.scrollTop = box.scrollHeight;
    }
  }
}

function process(e) {
  document.documentElement.removeEventListener('DOMNodeInserted', process, false);

  if (e && e.target) {
    if (e.target.tagName == "TEXTAREA") listen(e.target);

    forEach(document.evaluate('.//textarea', e.target, null, 7, null), function(box) {
      listen(box);
    });
  }

  document.documentElement.addEventListener('DOMNodeInserted', process, false);
}

function shortcuts(e, box) {
  var x=box.selectionStart,y=box.selectionEnd;
  var before = (box.value).substring(0,x);
  var selected=(box.value).substring(x,y);
  var after = (box.value).substring(y, (box.value).length);
  var tag, length;

  // The activate key is ctrl on mac and alt on everything else
  switch(e.keyCode) {
    case 67: tag="<code>"+selected+"</code>";break;
    case 80: tag="<pre>"+selected+"</pre>";break;
    case 66: tag="<strong>"+selected+"</strong>";break;
    case 73: tag="<em>"+selected+"</em>";break;
    case 85: tag="<ins>"+selected+"</ins>";break;
    case 81: tag="<blockquote>"+selected+"</blockquote>";break;
    case 83: tag="<del>"+selected+"</del>";break;
    case 65: tag="<a href=\"\">"+selected+"</a>";break;
    case 88: tag="<img src=\""+selected+"\" />";break;
    case 72: tag="<h4>"+selected+"</h4>";break;
    case 76: if (y-x>0) tag='<a href="'+((h=prompt('What do you want to link "'+selected+'" to?'))?h:'')+'">'+selected+'</a>';break;
  }

  if (tag) {
    var topScroll = box.scrollTop;
    box.value = before+tag+after;
    length = (y-x == 0) ? before.length + ((tag.length - 1) / 2) : y + tag.length;
    box.setSelectionRange(length, length);
    box.focus();
    box.scrollTop = topScroll;
    if (e.keyCode) e.preventDefault();
  }
}

function listen(box) {
  box.addEventListener("keydown", function(e) { 
      if((window.navigator.userAgent.match('Macintosh')) ? e.ctrlKey && !e.altKey : e.altKey && !e.ctrlKey) {
        shortcuts(e, this);
      }
  } ,false);
  box.addEventListener("focus", function(e) { 
      lastSelectedBox = e.target;
  } ,false);
}

forEach(document.evaluate('//textarea', document, null, 7, null), function(box) {
  listen(box);
});

var lastSelectedBox = null;
document.documentElement.addEventListener('DOMNodeInserted', process, false);

window.addEventListener("keydown", function(e) {
      if(((window.navigator.userAgent.match('Macintosh')) ? e.ctrlKey && !e.altKey : e.altKey && !e.ctrlKey)
		&& e.keyCode == 81) {
        quote_handle(e);
      }
  } ,false);