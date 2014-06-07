// ==UserScript==
// @name           Tumblr Dashboard Filter by Post Type
// @namespace      http://cxx.tumblr.com/
// @include        http://www.tumblr.com/*
// @version        0.3.0.20090726
// ==/UserScript==

(function(){

var w = this.unsafeWindow || window;
var types = [
	'everything', 'text', 'photos', 'quotes', 'links', 'chats', 'audio', 'videos'
];
var searchType = 'type_everything';

function $(id) {
  return document.getElementById(id);
}

function refreshSearchControls() {
	w.refresh_search_controls();
	$X('id("' + searchType + '")/img')[0].style.display = '';
}

function fixPagination(doc, uri) {
	var found = uri.match(/www\.tumblr\.com(.*?)(?:\/(\d+))?\/?(\?|$)/);
	var base = found[1];
	var page = found[2] ? Number(found[2]) : 1;
	var prev = base + '/' + (page - 1);
	var next = base + '/' + (page + 1) + '?offset=' + $X('.//li[starts-with(@id,"post")][last()]', doc)[0].id.match(/\d+/)[0];

	var controls = $X('id("dashboard_controls")//a', doc);
	if (controls.length > 0) {
		controls[0].href = base;
		controls[1].href = prev;
		if (controls[2]) controls[2].href = next;
	}
	var pagination = $X('id("pagination")/a', doc);
	pagination[0].href = (page > 1) ? prev : next;
	if (pagination[1]) pagination[1].href = next;
}

if (window.AutoPagerize) {
	alert('"Tumblr Dashboard Filter by Post Type" must be executed earlier than AutoPagerize. Please set execution order in "Manage User Scripts."');
	return;
}

var found;
if ((found = location.pathname.match(/^(?:\/tumblelog\/[-\w]*)?\/show\/(\w+)/))
	|| location.pathname.indexOf('/tumblelog//') == 0) {
	if (found)
		searchType = 'type_' + found[1];
	fixPagination(document, location.href);

	setTimeout(function(){
		if (window.AutoPagerize && window.AutoPagerize.addDocumentFilter)
			window.AutoPagerize.addDocumentFilter(fixPagination);
	}, 0);
}

var controls = $('search_controls');
if (controls) {
	controls.appendChild(document.createElement('a'));
	types.forEach(function(t){
		var label = t.replace(/^./, function(s){ return s.toUpperCase(); });
		var a = document.createElement('a');
		a.id = 'type_' + t;
		a.textContent = label;
		a.addEventListener('click', function(){ searchType = this.id; }, false);
		var img = document.createElement('img');
		img.src = 'http://assets.tumblr.com/images/search_controls_check.png?alpha';
		img.className = 'check';
		a.appendChild(img);
		controls.appendChild(a);
	});
	(controls.wrappedJSObject || controls).onclick = refreshSearchControls;
	refreshSearchControls();

  var form = $X('//form[@action="/search"]')[0];
	form.addEventListener('submit', function(e){
		var scope = form.elements.namedItem('scope').value;
    var t = form.elements.namedItem('t');
    var tumblelog = (t ? t.value : '');
    var query = form.elements.namedItem('q').value;
		if (searchType != 'type_everything' && (scope == 'everyone_i_follow' || scope == 'my_posts')) {
			location.pathname = [
				(scope == 'my_posts') ? ('/tumblelog/' + tumblelog) : '',
				'/show/' + searchType.replace('type_', ''),
				(query == '') ? '' : ('/filter/' + query)
			].join('');
			e.preventDefault();
		}
	}, false);
}


// simple version of $X
// $X(exp);
// $X(exp, context);
// @source http://gist.github.com/3242.txt
function $X (exp, context) {
	context || (context = document);
	var expr = (context.ownerDocument || context).createExpression(exp, function (prefix) {
		return document.createNSResolver(context.documentElement || context).lookupNamespaceURI(prefix) ||
			context.namespaceURI || document.documentElement.namespaceURI || "";
	});

	var result = expr.evaluate(context, XPathResult.ANY_TYPE, null);
		switch (result.resultType) {
			case XPathResult.STRING_TYPE : return result.stringValue;
			case XPathResult.NUMBER_TYPE : return result.numberValue;
			case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
			case XPathResult.UNORDERED_NODE_ITERATOR_TYPE:
				// not ensure the order.
				var ret = [], i = null;
				while (i = result.iterateNext()) ret.push(i);
				return ret;
		}
	return null;
}

})();
