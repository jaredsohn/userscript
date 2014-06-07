// ==UserScript==
// @name           Userscripts.org Issues Enhancement
// @namespace      sizzlemctwizzle
// @description    Makes the issues feature a little more pleasant.
// @version        0.0.1
// @require        http://sizzlemctwizzle.com/updater.php?id=95979
// @include        http://userscripts.org/scripts/issues/*
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

function showComments(link) {
  if (commentState) $(commentState + '_comments').parentNode.style.display = 'none';
  if (voteState) {
    $(voteState + '_votes').parentNode.style.display = 'none';
    voteState = null;
  }
  commentState = link.getAttribute('type');
  $(commentState + '_comments').parentNode.style.display = 'block';
}

var userlink = $x1("//ul[@id='homeMenu']//a[@user_id]");
if (!userlink) return;

GM_addStyle('.votes, .comments, h3:nth-of-type(2) { display: none; }');
var userid = userlink.getAttribute('user_id');
var voteState = null;
var commentState = null;
forEach($x('//td/a[contains(@href,"_votes")]'), function(link) {
    var type = link.href.match(/#(.*)_votes/)[1];
    link.setAttribute('type', type);
    link.setAttribute('href', '#');
    link.addEventListener('click', function(e) {
        if (commentState) {
          $(commentState + '_comments').parentNode.style.display = 'none';
          commentState = null
        }
        if (voteState) $(voteState + '_votes').parentNode.style.display = 'none';
        voteState = e.target.getAttribute('type');
        $(voteState + '_votes').parentNode.style.display = 'block';
        e.preventDefault();
    }, false);
});

forEach($x('//td/a[contains(@href,"_comments") and not(contains(@href,"_new_"))]'), function(link) {
    var type = link.href.match(/#(.*)_comments/)[1];
    link.setAttribute('type', type);
    link.setAttribute('href', '#');
    link.addEventListener('click', function(e) {
        showComments(e.target);
        e.preventDefault();
    }, false);
});

forEach($x('//td/em/a[contains(@href,"_new_comment")]'), function(link) {
    var type = link.href.match(/#(.*)_new_comment/)[1];
    link.setAttribute('type', type);
    link.setAttribute('href', '#');
    link.addEventListener('click', function(e) {
        showComments(e.target);
        e.preventDefault();
    }, false);
});

forEach($x('//a[starts-with(@href, "/issues/vote?")]'), function(link) {
      var type = link.href.match(/\?category=(.*?)&/)[1];
      var tdnum = /&yes=true/.test(link.href) ? 1 : 2;
      var votes = $(type + '_votes');
      if (votes && $xb('.//td[' + tdnum + ']//a[@href="/users/' + userid + '"]', votes.parentNode)) {
        insertAfter(create(tdnum == 1 ? 'yes' : 'no'), link);
        link.style.display = 'none';
      }
});