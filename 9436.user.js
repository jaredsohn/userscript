// ==UserScript==
// @name           Tumblr - Check New Followers
// @namespace      http://userscripts.org/scripts/show/9436
// @include        http://www.tumblr.com/dashboard
// ==/UserScript==

// 2007/11/28 DOM Storage (for browser crash)
// 2007/11/04 Tumblr v3

var CHECK_LEAVER = false;
var CHECK_INTERVAL = 24*60*60*1000;
var ID = 'CNF_'+$x('//li[@class="post is_mine with_avatar"]//div[@class="username"]/a/@href');


var lastChecked = storage(ID+'lastChecked') || 0;
var now = (new Date()).getTime();
if((now - lastChecked) > CHECK_INTERVAL)
	checkNewFollower(true);


function checkNewFollower(quiet){
	getUsers('followers', function(current){
		var old = storage(ID + 'followers');
		storage(ID+'lastChecked', (new Date()).getTime());
		storage(ID+'followers', current);
		if(!old){
			if(!quiet) alert('Initialized!');
			return;
		}
		
		var comers = diff(current, old);
		var leavers = CHECK_LEAVER? diff(old, current) : {};
		
		if(isEmpty(comers) && isEmpty(leavers)){
			if(!quiet) alert("There is no change in the followers.");
			return;
		}
		
		if(!confirm([
			(isEmpty(comers) ? '' : '[+] New Followers\n\n' + keys(comers).join(' / ')),
			(isEmpty(leavers) ? '' : '[-] Leaved Followers\n\n' + keys(leavers).join(' / ')),
			'Are you sure you want to open tabs?'
		].join('\n\n'))){
			return;
		}
		
		for(var name in comers){
			GM_openInTab(comers[name]);
		}
	})
}

GM_registerMenuCommand('Check New Followers', checkNewFollower);

GM_registerMenuCommand('Open OPML(Followers)', function(){
	getUsers('followers', openOPML);
});

GM_registerMenuCommand('Open OPML(Friends)', function(){
	getUsers('following', openOPML);
});

// ----[Application]-------------------------------------------------
function openOPML(ps){
	var opml = <opml version="1.0">
		<body>
			<outline title="Subscriptions" />
		</body>
	</opml>
	
	for(var p in ps)
		opml.body.outline.outline += <outline type="rss" title={p} htmlUrl={ps[p]} xmlUrl={ps[p]+"rss"} />
	
	GM_openInTab('data:application/xml;charset=utf-8,' + opml.toXMLString());
}

function getUsers(type, callback){
	getText('http://www.tumblr.com/' + type, function(text){
		var doc = convertToHTMLDocument(text);
		var res = {};
		map(
			function(link){
				res[link.textContent]=link.getAttribute('href');
			}, 
			$x('//div[@class="username"]/a', doc));
		callback(res);
	});
}

function diff(a, b){
	var res = {};
	for(var prop in a)
		if(!(prop in b))
			res[prop] = a[prop];
	return res;
}

// ----[Utility]-------------------------------------------------
function storage(key, value){
	var map = globalStorage.wrappedJSObject[document.domain];
	return (storage = function(key, value){
		if(arguments.length == 1)
			return eval('('+map[key]+')');
		
		if(value!=null){
			map[key] = uneval(value);
			return value;
		}
		
		delete map[key];
	}).apply(null, arguments);
}

function isEmpty(obj){
	if(obj==null)
		return true;
	
	for(var i in obj)
		return false;
	return true;
}

function keys(obj){
	var res=[];
	for(var key in obj)
		res.push(key);
	return res;
}

function map(){
	var fn = Array.shift(arguments);
	var res = [];
	while(arguments[0].length){
		var args = Array.map(arguments, Array.shift);
		res.push(fn.apply(null, args));
	}
	return res;
}

// cho45 - http://lowreal.net/
function $x(exp, context) {
	var Node = unsafeWindow.Node;
	if (!context) context = document;
	var resolver = function (prefix) {
		var o = document.createNSResolver(context)(prefix);
		return o ? o : (document.contentType == "text/html") ? "" : "http://www.w3.org/1999/xhtml";
	}
	var exp = document.createExpression(exp, resolver);
	
	var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
	switch (result.resultType) {
		case XPathResult.STRING_TYPE : return result.stringValue;
		case XPathResult.NUMBER_TYPE : return result.numberValue;
		case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
		case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
			result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var ret = [];
			for (var i = 0, len = result.snapshotLength; i < len ; i++) {
				var item = result.snapshotItem(i);
				switch (item.nodeType) {
				case Node.ELEMENT_NODE:
					ret.push(item);
					break;
				case Node.ATTRIBUTE_NODE:
				case Node.TEXT_NODE:
					ret.push(item.textContent);
					break;
				}
			}
			return ret;
		}
	}
	return null;
}

function convertToHTMLDocument(html) {
	var xsl = (new DOMParser()).parseFromString(
		'<?xml version="1.0"?>\
			<stylesheet version="1.0" xmlns="http://www.w3.org/1999/XSL/Transform">\
			<output method="html"/>\
		</stylesheet>', "text/xml");
	
	var xsltp = new XSLTProcessor();
	xsltp.importStylesheet(xsl);
	
	var doc = xsltp.transformToDocument(document.implementation.createDocument("", "", null));
	doc.appendChild(doc.createElement("html"));
	
	var range = doc.createRange();
	range.selectNodeContents(doc.documentElement);
	doc.documentElement.appendChild(range.createContextualFragment(html));
	
	return doc
}

function getText(url, onload, onerror){
	GM_xmlhttpRequest({
		method : 'GET',
		url : url,
		onload : function(res){
			if(res.status!=200)
				return onerror(res);
			onload && onload(res.responseText);
		},
		onerror : onerror || function(){},
	})
}