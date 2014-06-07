// ==UserScript==
// @name           IncrementalFilter4GoogleSearch
// @namespace      jimo1001
// @include        http://www.google.co.jp/search*
// @version        0.92
// ==/UserScript==

(function() {
	// Class: Paragraph
	var Paragraph = function(node) {
		this.node = node;
		this.hidden = false;
		this.content = node.textContent;
	};
	Paragraph.prototype.hide = function() {
		this.node.style.display = "none";
		this.hidden = true;
	};
	Paragraph.prototype.show = function() {
		this.node.style.display = "";
		this.hidden = false;
	};
	// Class: ParagraphManager
	var ParagraphManager = function(nodes) {
		this.pool = [];
		this.cacheContexts = [];
		this.timeoutID = null;
		this.intervalID = null;
		this.createInstance(nodes);
		this.elm = this.createInputElement();
		this.setEvent(this.elm);
	};
	ParagraphManager.prototype.getContext = function() {
		return this.elm.input.value || "";
	};
	ParagraphManager.prototype.createInstance = function(nodes) {
		var self = this;
		nodes.forEach(function(node) {
			self.pool.push(new Paragraph(node));
		});
	};
	ParagraphManager.prototype.filterParagraphs = function(str) {
		var paragraphs = [], contexts = [];
		var f = this.checkFilterContext(str);
		if(f.init) {
			paragraphs = this.pool;
			contexts = this.cacheContexts;
		} else {
			paragraphs = this.pool.filter(function(elm) { return !elm.hidden });
			contexts = f.contexts;
		}
//		console.log("init: ", f.init, ", contexts: ", contexts, "f.contexts: ", f.contexts, ", cacheContexts: ", this.cacheContexts);
		this.filter(contexts, paragraphs);
	};
	ParagraphManager.prototype.filter = function(contexts, paragraphs) {
		if(!contexts.length) return;
		paragraphs.forEach(function(paragraph) {
			var match = true;
			contexts.forEach(function(context) {
				if(!paragraph.content.match(new RegExp(context, "i"))) match = false;
			});
			(match) ? paragraph.show() : paragraph.hide();
		});
	};
	ParagraphManager.prototype.checkFilterContext = function(str) {
		var self = this, initFilter = false;
		var currentContexts = str || this.getContext(), samedContexts = new Array(this.cacheContexts.length);
		var addedContexts = currentContexts.split(" ").filter(function(current,i) {
			var samedContext = self.cacheContexts.some(function(cache, j) {
				var sameContext = (current == cache);
				if(sameContext) samedContexts[j] = true;
				return sameContext;
			});
			return !samedContext;
		});
		for(var i = 0, num=0; i < samedContexts.length; i++) {
			if(!samedContexts[i]) self.cacheContexts.splice(i-num++, 1);
			if((i+1)==samedContexts.length && num != 0) initFilter = true;
		}
		this.cacheContexts = this.cacheContexts.concat(addedContexts);
		if(addedContexts=="") initFilter = true;
		return {"contexts": addedContexts, "init": initFilter};
	};
	ParagraphManager.prototype.createInputElement = function() {
		var css = "div#IF4G_indicator { height: 2px; background: green; width: 0; margin-top: 2px; }";
		addStyle(css);
		var input = $X("id('sff')//td/input[@type='text']")[0];
		var indicator = document.createElement("div");
		indicator.setAttribute("id", "IF4G_indicator");
		input.parentNode.appendChild(indicator);
		return {"input": input, "indicator":indicator};
	};
	ParagraphManager.prototype.setEvent = function(elm) {
		var self = this;
		var setOpacity = function(num) {
			elm.input.parentNode.setAttribute("style","opacity:"+num);
		}
		elm.input.addEventListener("keyup", function() {
			if(self.timeoutID) {
				window.clearTimeout(self.timeoutID);
				clearInterval(self.intervalID);
			}
			var width = 0;
			self.intervalID = window.setInterval(function(){
				width += 25;
				elm.indicator.style.width = (width + "%");
			}, 200);
			self.timeoutID = window.setTimeout(function() {
				self.filterParagraphs(elm.input.value);
				clearInterval(self.intervalID);
			}, 800);
		}, false);
	};

	var addStyle = function(css) {
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = 'data:text/css,' + escape(css);
		document.documentElement.childNodes[0].appendChild(link);
	};

	if(document.body) {
		var xpath = ".//li[contains(concat(' ',@class,' '),'g')]";
		var pm = new ParagraphManager($X(xpath));
		var boot = function() {
			window.AutoPagerize.addFilter(function(docs) {
				pm.createInstance($X(xpath, docs[0]));
				pm.filterParagraphs();
			});
		};
		if(window.AutoPagerize) {
			boot();
		}else{
			window.addEventListener('GM_AutoPagerizeLoaded', boot, false);
		};
	};
	//=== extend version of $X ===
	// http://coderepos.org/share/browser/lang/javascript/userscripts/jautopagerize.user.js?rev=1966
	function $X (exp, context, type /* want type */) {
		if (arguments.callee.forceRelative || navigator.userAgent.indexOf("Safari/523.12") != -1)
			exp = exp.replace(/id\(\s*([\"\'])([^\"\']+)\1\s*\)/g, '//*[@id="$2"]');
		if (arguments.callee.forceRelative)
			exp = exp.indexOf("(//") == 0
			? "(.//" + exp.substring(3)
			: (exp[0] == "/" ? "." : "./") + exp;
		if (typeof context == "function") {
			type = context;
			context = null;
		}
		if (!context) context = document;
		exp = (context.ownerDocument || context).createExpression(exp, function (prefix) {
			return document.createNSResolver((context.ownerDocument == null ? context
											  : context.ownerDocument).documentElement)
				.lookupNamespaceURI(prefix) || document.documentElement.namespaceURI;
		});
		switch (type) {
		case String:
			return exp.evaluate(context, XPathResult.STRING_TYPE, null).stringValue;
		case Number:
			return exp.evaluate(context, XPathResult.NUMBER_TYPE, null).numberValue;
		case Boolean:
			return exp.evaluate(context, XPathResult.BOOLEAN_TYPE, null).booleanValue;
		case Array:
			var result = exp.evaluate(context, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var ret = [];
			for (var i = 0, len = result.snapshotLength; i < len; i++) {
				ret.push(result.snapshotItem(i));
			}
			return ret;
		case undefined:
			var result = exp.evaluate(context, XPathResult.ANY_TYPE, null);
			switch (result.resultType) {
			case XPathResult.STRING_TYPE : return result.stringValue;
			case XPathResult.NUMBER_TYPE : return result.numberValue;
			case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
			case XPathResult.UNORDERED_NODE_ITERATOR_TYPE: {
				/* not ensure the order. */
				var ret = [];
				var i = null;
				while (i = result.iterateNext()) {
					ret.push(i);
				}
				return ret;
			}
			}
			return null;
		default:
			throw(TypeError("$X: specified type is not valid type."));
		}
	}
})();
