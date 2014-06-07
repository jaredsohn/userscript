// ==UserScript==
// @name           IncrementalFilter4LDRize
// @namespace      jimo1001
// @include        *
// @version        0.92
// ==/UserScript==

(function(){
	if(!window.LDRize || !window.Minibuffer) return;
	var $X = window.Minibuffer.$X;
	// Class: Paragraph
	var Paragraph = function(node){
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
		this.filter(contexts, paragraphs);
	};
	ParagraphManager.prototype.filter = function(contexts, paragraphs) {
//		console.log("contexts: ", contexts, ", cacheContexts: ", this.cacheContexts);
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
		var css = "div#IF4L { opacity:0.2; padding:5px 10px 5px 20px; position:fixed; bottom:0px; right:0px; } \n";
		css += "div#IF4L:hover { opacity:1.0 } \n";
		css += "input#IF4L_input { type: text; }\n";
		css += "div#IF4L_indicator { height: 2px; background: green; width: 0; margin-top: 2px; }";
		addStyle(css);
		var root = document.createElement("div");
		var title = document.createTextNode("絞り込み文字列: ");
		var input = document.createElement("input");
		var indicator = document.createElement("div");
		root.setAttribute("id","IF4L");
		input.setAttribute("id","IF4L_input");
		indicator.setAttribute("id", "IF4L_indicator");
		root.appendChild(title);
		root.appendChild(input);
		root.appendChild(indicator);
		document.body.appendChild(root);
		return {"input": input, "indicator":indicator};
	};
	ParagraphManager.prototype.setEvent = function(elm) {
		var self = this;
		window.Minibuffer.addShortcutkey({
			key: 'A-i',
			description: 'IncrementalFilter4LDRize',
			command: function(){
				elm.input.focus();
			}
		});
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
		elm.input.addEventListener("focus", function() { setOpacity(1.0) }, false);
		elm.input.addEventListener("blur", function() {
			setOpacity(null);
			window.Minibuffer.execute('LDRize::paragraph-re-collect');
		}, false);
	};

	var addStyle = function(css) {
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = 'data:text/css,' + escape(css);
		document.documentElement.childNodes[0].appendChild(link);
	};

	if(document.body) {
		// LDRize set paragraph(xpath)
		if(!window.LDRize.getSiteinfo()) return;
		var siteinfo = window.LDRize.getSiteinfo();
		var xpath = siteinfo.paragraph;
		siteinfo.paragraph = siteinfo.paragraph.concat('[not(contains(@style, "display: none;"))]');
		window.LDRize.setSiteinfo(siteinfo);

		var pm = new ParagraphManager($X(xpath));
		var boot = function() {
			window.AutoPagerize.addFilter(function(docs) {
				pm.createInstance($X(xpath, docs[0]));
				pm.filterParagraphs();
			});
		}
		if(window.AutoPagerize) {
			boot();
		}else{
			window.addEventListener('GM_AutoPagerizeLoaded', boot, false);
		};
	}
})();
