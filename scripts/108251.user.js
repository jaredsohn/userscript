// ==UserScript==
// @name           MangaToshokan Enhancer
// @namespace      mangatoshokan_helpers
// @description    MangaToshokan enhancer
// @include        http://www.mangatoshokan.com/upload_manga*
// @include        http://www.doujintoshokan.com/upload_manga*
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @require        https://raw.github.com/harvesthq/chosen/master/chosen/chosen.jquery.js
// @require        http://usocheckup.dune.net/108251.js?maxage=7
// @version        1.0.1
// ==/UserScript==


var allTr = $('table[width="500"] tbody tr');
allTr.each(function(i){
	idString = 'up' + i;
	$(this).addClass(idString);
});

// $('.up0 select').addClass("chzn-select");
$('.up4 select').addClass("chzn-select");
$('.up5 select').addClass("chzn-select");
$('.up9 input').attr("id", "delay_amt");

$('head').append("<link href='http://harvesthq.github.com/chosen/chosen/chosen.css' type='text/css' rel='stylesheet'>");

// $(".chzn-select").chosen();

$('.up6 select').after(' <a class="quality" id="quality1">LQ</a> <a class="quality" id="quality2">MQ</a> <a class="quality" id="quality3">MHQ</a> <a class="quality" id="quality4">HQ</a>');

$('#delay_amt').after(' <a class="delay" id="delay12">12</a> <a class="delay" id="delay24">24</a> <a class="delay" id="delay48">48</a> <a class="delay" id="delay72">72</a>');


// =========== Style ============

GM_addStyle(""
	+".up2 input { width: 450px;}"
	+".up12 input { width: 450px;}"
	+".up12 small { display:none;}"
	+".up13 input { width: 450px;}"
	+".quality, .delay {cursor:pointer;}"
	+"input[type='text']:focus { background: #ffC; border-color: #ff1; color: #0d0d0d;}"
	// +".chzn-select { width: 450px;}"
);

// ====== Helper Functions =======

$("a#quality1").click(function() {
	document.getElementsByName('quality')[0].value = 1;
	return false;
});
$("a#quality2").click(function() {
	document.getElementsByName('quality')[0].value = 2;
	return false;
});
$("a#quality3").click(function() {
	document.getElementsByName('quality')[0].value = 3;
	return false;
});
$("a#quality4").click(function() {
	document.getElementsByName('quality')[0].value = 4;
	return false;
});

$("a#delay12").click(function() {
	document.getElementById('delay_amt').value = 12;
	return false;
});
$("a#delay24").click(function() {
	document.getElementById('delay_amt').value = 24;
	return false;
});
$("a#delay48").click(function() {
	document.getElementById('delay_amt').value = 48;
	return false;
});
$("a#delay72").click(function() {
	document.getElementById('delay_amt').value = 72;
	return false;
});

// ====== Start Helper Functions =======
// GM_addStyle if not available
if (typeof GM_addStyle === 'undefined')
  GM_addStyle = function(css) {
    var head = document.getElementsByTagName('head')[0], style = create('style', {});
    if (!head) {return}
    style.type = 'text/css';
    try {style.innerHTML = css}
    catch(x) {style.innerText = css}
    head.appendChild(style);
};
// Inject a script into the page
function addScript(js) {
  var body = document.body, script = create('script', {});
    if (!body) {return}
    script.type = 'text/javascript';
    try {script.innerHTML = js}
    catch(x) {script.innerText = js}
    body.appendChild(script);
};
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
};
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
};
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
};
// Remove an element
function remove(element1) { element1.parentNode.removeChild(element1); }
// Get element by id
function $i(element2) { return document.getElementById(element2); }
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
};
// Add a new class to an element
function addClass(el,cls) {
    if (!el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)')))
        el.className += " "+cls;
};
// Remove a particular class from an element
function removeClass(el,cls) {
    if (el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'))) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        el.className = el.className.replace(reg,' ');
    }
};
// Turn text into a document and pass it to a callback function
function makeDoc(txt, cb) {
  var dt = document.implementation.createDocumentType("html",
        "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
      doc = document.implementation.createDocument('', '', dt),
      html = doc.createElement('html');

  html.innerHTML = txt;
  doc.appendChild(html);
  cb(doc);
};
// ======== End Helper Functions =========

