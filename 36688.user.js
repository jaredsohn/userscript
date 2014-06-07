// ==UserScript==
// @name           Text URL Linker
// @namespace      http://ss-o.net/
// @include        http://*
// @version        0.8.1
// ==/UserScript==

(function(){

function TextURLLinker(config) {
	if (TextURLLinker.isInit) return;
	TextURLLinker.isInit = true;
	var newtab = config.open_in_newtab;
	var noref = config.noreferrer;
	var style = escapeTags(config.link_style);
	var TEXT = 'descendant::text()[contains(self::text(),"ttp") and not(ancestor::'+
	      ['a','textarea','script','style','head'].join(' or ancestor::') + ')]';
	linker(document.body);

	function linker(doc){
		return $X(TEXT, doc).filter(function(txt){
			return linkfy(txt, 'h?ttp(s?://.*)', '[ 　\\)\\]\'\"\n]|$', 'http');
		});
	}

	function linkfy(node, start, end, prefix) {
		var linked = false;
		if (node.nodeValue.search(start) >= 0) {
			var text = node.nodeValue, index;
			var parent = node.parentNode;
			while (text && (index = text.search(start)) >= 0) {
				var _txt = node.splitText(index);
				var _end = _txt.nodeValue.search(end);
				var __txt = _txt.splitText(_end);
				var a = document.createElement('a');
				a.href = prefix + _txt.nodeValue.match(start)[1];
				newtab && a.setAttribute('target', '_blank');
				noref && a.setAttribute('rel', 'noreferrer');
				style && a.setAttribute('style', style);
				if (noref && typeof GM_openInTab !== 'undefined' && !window.getMatchedCSSRules) {
					a.addEventListener('click',function(e){
						e.preventDefault();
						GM_openInTab(a.href);
					},false);
				}
				a.appendChild(_txt);
				parent.insertBefore(a, __txt);
				text = __txt.nodeValue;
				node = __txt;
				linked = true;
			}
		}
		return linked;
	}
	function escapeTags(str){
		return str.replace(/["&<>]/g,function($){
			return '&'+{'"':'quot','&':'amp','<':'lt','>':'gt'}[$]+';';
		});
	}
	var wait = true;
	document.addEventListener('DOMNodeInserted',function(e){
		if (wait){
			setTimeout(function(){
				linker(document.body);
				wait = true;
			}, 1500);
			wait = false;
		}
	},true);
}
var TextURLLinkerID = 'aegfbpchoheaflicfmggkmlmcccpjpgd';
if (this.chrome && chrome.extension &&
   /aegfbpchoheaflicfmggkmlmcccpjpgd/.test(chrome.extension.getURL('manifest.json')) ){
	chrome.extension.sendRequest(TextURLLinkerID,'init', TextURLLinker);
} else if(this.safari){
	safari.self.tab.dispatchMessage('config','');
	safari.self.addEventListener('message',function(evt){
		TextURLLinker(evt.message);
	},false);
} else {
	TextURLLinker({
		open_in_newtab:true,
		noreferrer:true,
		link_style:'cursor:help;display:inline !important;'
	});
}

// XPath snippet from http://gist.github.com/184276

// XPath 式中の接頭辞のない名前テストに接頭辞 prefix を追加する
// e.g. '//body[@class = "foo"]/p' -> '//prefix:body[@class = "foo"]/prefix:p'
// http://nanto.asablo.jp/blog/2008/12/11/4003371
function addDefaultPrefix(xpath, prefix) {
	var tokenPattern = /([A-Za-z_\u00c0-\ufffd][\w\-.\u00b7-\ufffd]*|\*)\s*(::?|\()?|(".*?"|'.*?'|\d+(?:\.\d*)?|\.(?:\.|\d+)?|[\)\]])|(\/\/?|!=|[<>]=?|[\(\[|,=+-])|([@$])/g;
	var TERM = 1, OPERATOR = 2, MODIFIER = 3;
	var tokenType = OPERATOR;
	prefix += ':';
	function replacer(token, identifier, suffix, term, operator, modifier) {
		if (suffix) {
			tokenType = 
				(suffix == ':' || (suffix == '::' && (identifier == 'attribute' || identifier == 'namespace')))
				? MODIFIER : OPERATOR;
		} else if (identifier) {
			if (tokenType == OPERATOR && identifier != '*')
				token = prefix + token;
			tokenType = (tokenType == TERM) ? OPERATOR : TERM;
		} else {
			tokenType = term ? TERM : operator ? OPERATOR : MODIFIER;
		}
		return token;
	}
	return xpath.replace(tokenPattern, replacer);
}

// $X on XHTML
// $X(exp);
// $X(exp, context);
// @target Freifox3, Chrome3, Safari4, Opera10
// @source http://gist.github.com/184276.txt
function $X (exp, context) {
	context || (context = document);
	var _document  = context.ownerDocument || document,
	documentElement = _document.documentElement;
	var isXHTML = documentElement.tagName !== 'HTML' && _document.createElement('p').tagName === 'p';
	var defaultPrefix = null;
	if (isXHTML) {
		defaultPrefix = '__default__';
		exp = addDefaultPrefix(exp, defaultPrefix);
	}
	function resolver (prefix) {
		return context.lookupNamespaceURI(prefix === defaultPrefix ? null : prefix) ||
			   documentElement.namespaceURI || '';
	}

	var result = _document.evaluate(exp, context, resolver, XPathResult.ANY_TYPE, null);
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
