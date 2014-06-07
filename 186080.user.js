// ==UserScript==
// @id             UntangledLeaderBoard
// @name           Untangled Leader Board
// @version        0.1
// @namespace      http://home.comcast.net/~mailerdaemon
// @author         BlindWanderer
// @description    Show the leader board in a new frame
// @include        https://untangled.unt.edu/play.php
// @run-at         document-end
// ==/UserScript==
//{
GM_addStyle("div#wrapper {float: right;}")
let f = document.createElement("iframe");
f.width = 500;
f.frameBorder = 0;
f.height = document.documentElement.clientHeight - f.frameBorder;
f.style = "float:right;";
f.scrolling = "no";
f.addEventListener("load", function(){
		let fc = this.contentDocument;
		GM_addStyle([
				".table4 tbody td, .table4 thead th {padding:2px!important; border}",
				".table4 tbody td, .table4 thead th, #container, #content_nobox, #mainwrapper { width: auto !important; overflow:visible!important;}",
				"div#nav-bar2, div#footer, #buttons-jquery {display:none;}",
				"#wrapper_outer > div.table {padding-bottom:30px;}",
				"#content_nobox {margin-top:0!important; margin-left:10px;}",
			].join("\n"), this.contentDocument);
	}, false );
f.src = "/leader.php";
window.addEventListener("resize", function(){
		f.height = document.documentElement.clientHeight - f.frameBorder;
	}, false );
insertBefore(f, document.body.firstChild);


function GM_addStyle(css, doc) {
  doc = doc || document;
  var head = doc.getElementsByTagName("head")[0];
  if (head) {
    var style = doc.createElement("style");
    style.textContent = css;
    style.type = "text/css";
    head.appendChild(style);
  }
  return style;
}

//{Xpath
function $W(_xpath, node, array, transform){
	array = array || [];
	var res;
	if(_xpath instanceof XPathExpression){
		res = _xpath.evaluate(node || document, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	else{
		var doc = (node)?(node.ownerDocument || node):(node = document);
		try{
			res = doc.evaluate(_xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		}
		catch(e){
			log([e].concat(Array.slice(arguments)));
			return;
		}
	}

	if(transform) {
		var args = Array.slice(arguments, 4);
		for (let j, i = 0; i < res.snapshotLength; ++i)
			if((j = transform.apply(null, [res.snapshotItem(i), i].concat(args))) !== undefined)
				array.push(j);
	}
	else
		for (let i = 0; i < res.snapshotLength; ++i)
			array.push(res.snapshotItem(i));
	return array;
}

function $X(_xpath, node, result){//to search in a frame, you must traverse it's .contentDocument attribute.
	if(_xpath instanceof XPathExpression){
		return _xpath.evaluate(node || document, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	}
	else{
		var doc = (node)?(node.ownerDocument || node):(node = document);
		try{
			return doc.evaluate(_xpath, node, null, result || XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
		}
		catch(e){
			log([e].concat(Array.slice(arguments)));
			return null;
		}
	}
}

function $Y(_xpath, node, transform){
	var res;
	if(_xpath instanceof XPathExpression){
		res = _xpath.evaluate(node || document, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	else{
		var doc = (node)?(node.ownerDocument || node):(node = document);
		try{
			res = doc.evaluate(_xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		}
		catch(e){
			log([e].concat(Array.slice(arguments)));
			return;
		}
	}
	if(transform) {
		var args = Array.slice(arguments, 3);
		for (let i = 0, j; i < res.snapshotLength; ++i)
			if((j = transform.apply(null, [res.snapshotItem(i), i].concat(args))) !== undefined)
				yield j;
	}
	else
		for (let i = 0; i < res.snapshotLength; ++i)
			yield res.snapshotItem(i);
}

function $Z(_xpath, func, node){
	var res;
	if(_xpath instanceof XPathExpression){
		res = _xpath.evaluate(node || document, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	}
	else{
		var doc = (node)?(node.ownerDocument || node):(node = document);
		try{
			res = doc.evaluate(_xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		}
		catch(e){
			log([e].concat(Array.slice(arguments)));
			return null;
		}
	}
	var args = Array.prototype.slice.call(arguments, 3);
	var i = 0;
	for (; i < res.snapshotLength; ++i)
		func.apply(null, [res.snapshotItem(i), i].concat(args));
	return i;
}
function compileXPath(){
	compileXPath = function(_xpath, namespaceURLMapper, doc){
		if(_xpath instanceof XPathExpression)
			return _xpath;//dipshit, you don't need to compile this!
		if(compileXPath.CompiledXPath.hasOwnProperty(_xpath)){
			let expr = compileXPath.CompiledXPath[_xpath];
			if(XPathProfilingLevel > 0)
				++expr.lookups;
			return expr;
		}
		let expr;
		try{
			expr = (doc || document).createExpression(_xpath, namespaceURLMapper);
		}
		catch(e){
			log([e].concat(Array.slice(arguments)));
			return null;
		}
		switch(XPathProfilingLevel){
			case 1:
				if(typeof(expr.evaluate.bind) === "function"){
					expr = {
						__proto__:expr,
						source:_xpath,
						lookups:1,
						evaluate:expr.evaluate.bind(expr),
						evaluateWithContext:expr.evaluateWithContext.bind(expr),
					};
					break;
				}//if you don't have bind, fall through to the next level that doesn't require bind.
			case 2:
				expr = {
					__proto__:expr,
					source:_xpath,
					lookups: 1,
					evaluated: 0,
					evaluate:function(){ this.evaluated++; return this.__proto__.evaluate.apply(this.__proto__, arguments); },
					evaluateWithContext: function(){ this.evaluated++; return this.__proto__.evaluateWithContext.apply(this.__proto__, arguments); },
				};
				break;
		}
		return compileXPath.CompiledXPath[_xpath] = expr;
	}
	compileXPath.CompiledXPath = {};
	if(typeof(XPathProfilingLevel) !== "undefined" && XPathProfilingLevel > 0)
		log(compileXPath.CompiledXPath); //used for later inspection of the cache
	return compileXPath.apply(compileXPath, arguments);
}

function xPathListContains(name, value, seperator){
	if(seperator === undefined) seperator = " ";
	let sep = SmartQuotes(seperator);
	return "contains(concat("+sep+", "+name+", "+sep+"), "+SmartQuotes(seperator+value+seperator)+")";
}
//}
//{HTML Maintanance
function insertAsParent(new_parent, node) {
	return new_parent.appendChild(node.parentNode.replaceChild(new_parent, node)) && new_parent;
}
function insertAfter(insert, after){ if(after && after.parentNode) return after.parentNode.insertBefore(insert, after.nextSibling); log("insertAfter", arguments);}
function insertBefore(insert, before){ if(before && before.parentNode) return before.parentNode.insertBefore(insert, before); log("insertBefore", arguments);}
function replace(n, old){ if(n !== old) old.parentNode.replaceChild(n, o); return n;}
function remove(r){return r.parentNode.removeChild(r);}
function getTag(element){
	let expr = compileXPath("ancestor-or-self::*[1]");
	return (getTag = function(node){ return $X(expr, node); })(element);
}
//}
function addEvent( obj, type, fn, capture ) {
	obj.addEventListener( type, fn, capture?capture:false );
}
function removeEvent( obj, type, fn, capture ) {
	obj.removeEventListener( type, fn, capture?capture:false );
}

function log() {
	var arg;
	switch(arguments.length) {
		case 1:
			arg = arguments[0];
			break;
		case 0:
			arg = null;
			break;
		default:
			arg = Array.slice(arguments);
			break;
	}
	
//	if(JSON && JSON.stringify)
//		arg = JSON.stringify(arg);
	if(typeof(unsafeWindow.console) != "undefined" && typeof(unsafeWindow.console.log) === "function")
		unsafeWindow.console.log(arg);
	else if(typeof(GM_log) === "function")
		GM_log(arg);
	return arg;
}
//}