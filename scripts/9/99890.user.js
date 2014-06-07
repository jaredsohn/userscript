// ==UserScript==
// @name            Forum Auto Pager Powered by AZAZEL Empire Board
// @namespace       http://userscripts.org/scripts/show/9848
// @description     Auto Pager for forum

// Discuz
// @include         http://*/viewthread.php?*
// @include         http://*/thread-*-*-*.html

// vBulletin
// @include         http://*/showthread.php?*
// @include         http://*/thread/*
// @include         http://*/thread*-*.html

// IP Board
// @include         http://*/index.php?*

// general rule
// @include         http://*forum*

// @version     0.6.6
// ==/UserScript==

// Version history:
//
// Version 0.6.6:
// [Bugfix] Change Discuz6 last page detection
// [Bugfix] Wrong Next page link for vBulletin3_8

(function(){

	if (!Array.prototype.forEach) {
		Array.prototype.forEach = function(func, scope){
			scope = scope || this;
			for (var i = 0, l = this.length; i < l; i++) 
				func.call(scope, this[i], i, this);
		}
	}
	
	Function.prototype.bind = function(){
		var __method = this, args = Array.prototype.slice.call(arguments, 0), object = args.shift();
		return function(){
			return __method.apply(object, args.concat(Array.prototype.slice.call(arguments, 0)));
		}
	}
	
})();

(function(){

	var AutoPager = function(){
		var plugin = null;
		var remain = -1;
		var Remain = function(){
			if (document.compatMode == "CSS1Compat") {
				return {
					valueOf: function(){
						var sc = document.documentElement.scrollTop;
						var total = (document.documentElement.scrollHeight - document.documentElement.clientHeight);
						var remain = total - sc;
						return total - sc;
					}
				};
			}
			else if (document.compatMode == "BackCompat" || document.compatMode == "" || document.compatMode == null) {
				return {
					valueOf: function(){
						var sc = document.body.scrollTop;
						var total = (document.body.scrollHeight - document.body.clientHeight);
						var remain = total - sc;
						return remain;
					}
				};
			}
		}();
		
		var monitorScroll = function(){
			var self = arguments.callee;
			var remain_tmp = Remain.valueOf();
			if (remain != remain_tmp) {
				remain = remain_tmp;
				plugin.onScroll(remain);
			}
			setTimeout(self, 150);
		};
		
		return {
			init: function(inPlugin){
				plugin = inPlugin;
				plugin.init();
				monitorScroll();
			}
		};
	}();
	
	window.AutoPager = AutoPager;
	
	var AutoPagerComponent = function(){
		function init_protected(protected){
			protected.insertPoint = null;
			protected.maxPage = 1;
			protected.requested = 1;
			protected.nextPage = 2;
			protected.scrollRange = 1900;
			protected.url = null;
			protected.disabled = false;
			var $this = null;
			protected.infoBox = {
				timer: null,
				startTime: 0,
				action: null,
				state: null,
				box: null,
				text: null,
				options: {
					hideDelay: 325,
					interval: 40,
					moveLength: 10
				},
				init: function(){
					$this = this;
					var div = document.createElement('div');
					div.setAttribute("style", "border: solid 1px; position: fixed; right: -200px; bottom: 100px; width: 200px; line-height: 50px;height: 50px;background-color: #ff5; opacity: 0.78;text-align: center; vertical-align: middle;");
					var text = document.createTextNode('');
					div.appendChild(text);
					div.id = '_infoBox';
					document.body.appendChild(div);
					$this.text = text;
					$this.box = div;
					$this.action = 'idle';
					$this.state = 'hided';
				},
				setText: function(input){
					if (!$this.action) 
						alert('setText');
					$this.text.nodeValue = input;
					return $this;
				},
				show: function(){
					if (!$this.action) 
						alert('show');
					if ($this.action != 'showing' && $this.state != 'showed') {
						$this.action = 'showing';
						$this.state = 'showing';
						if (!$this.timer) 
							$this.timer = setInterval($this.slide, $this.options.interval);
					}
					return $this;
				},
				hide: function(){
					if (!$this.action) 
						alert('hide');
					if ($this.action != 'hiding' && $this.state != 'hided' && $this.state != 'wantToHide') {
						$this.state = 'wantToHide';
						$this.startTime = (new Date()).valueOf();
						if (!$this.timer) 
							$this.timer = setInterval($this.slide, $this.options.interval);
					}
					return $this;
				},
				slide: function(){
					var value = parseInt($this.box.style.right.toString().match('-?\\d+'));
					if ($this.action == 'hiding') {
						if (value <= -200) {
							$this.action = 'idle';
							if ($this.state == 'hiding') 
								$this.state = 'hided';
						}
						else {
							var result = value - $this.options.moveLength + 'px';
							$this.box.style.right = result;
						}
					}
					else if ($this.action == 'showing') {
						if (value >= 0) {
							$this.action = 'idle';
							if ($this.state == 'showing') 
								$this.state = 'showed';
						}
						else {
							var result = value + $this.options.moveLength + 'px';
							$this.box.style.right = result;
						}
					}
					else if ($this.state == 'wantToHide') {
						var diff = (new Date()).valueOf() - $this.startTime;
						if (diff > 3000) {
							$this.action = 'hiding';
							$this.state = 'hiding';
							$this.startTime = 0;
						}
					}
					else if ($this.state == 'showed' || $this.state == 'hided') {
						clearInterval($this.timer);
						$this.timer = null;
					}
					return $this;
				}
			};
			protected.write = function(str){
				var moz = !window.opera && !/Apple/.test(navigator.vendor);
				
				// Watch for writing out closing tags, we just
				// ignore these (as we auto-generate our own)
				if (str.match(/^<\//)) 
					return;
				
				// Make sure & are formatted properly, but Opera
				// messes this up and just ignores it
				if (!window.opera) 
					str = str.replace(/&(?![#a-z0-9]+;)/g, "&amp;");
				
				// Watch for when no closing tag is provided
				// (Only does one element, quite weak)
				str = str.replace(/<([a-z]+)(.*[^\/])>$/, "<$1$2></$1>");
				
				// Mozilla assumes that everything in XHTML innerHTML
				// is actually XHTML - Opera and Safari assume that it's XML
				if (!moz) 
					str = str.replace(/(<[a-z]+)/g, "$1 xmlns='http://www.w3.org/1999/xhtml'");
				
				// The HTML needs to be within a XHTML element
				var div = document.createElementNS("http://www.w3.org/1999/xhtml", "div");
				div.innerHTML = str;
				
				// Find the last element in the document
				var pos;
				
				// Opera and Safari treat getElementsByTagName("*") accurately
				// always including the last element on the page
				if (!moz) {
					pos = document.getElementsByTagName("*");
					pos = pos[pos.length - 1];
					
					// Mozilla does not, we have to traverse manually
				}
				else {
					pos = document;
					while (pos.lastChild && pos.lastChild.nodeType == 1) 
						pos = pos.lastChild;
				}
				
				// Add all the nodes in that position
				var nodes = div.childNodes;
				while (nodes.length) 
					pos.parentNode.appendChild(nodes[0]);
			};
		}
		return {
			getInstance: function(protected){
				protected = protected || {};
				init_protected(protected);
				var $this = {
					onScroll: function(scroll){
						if (!protected.disabled && scroll < protected.scrollRange) {
							if (protected.requested != protected.maxPage && protected.requested != protected.nextPage) {
								protected.requested = protected.nextPage;
								if (protected.url != null) {
									this.sendRequest(protected.url);
								}
							}
						}
					},
					sendRequest: function(url){
						protected.infoBox.setText(' Loading Next Page ').show();
						var docFragment = document.createDocumentFragment();
						var obj = document.createElement('html');
						docFragment.appendChild(obj);
						var win = (typeof(unsafeWindow) === 'undefined') ? window : unsafeWindow;
						var callback = function(data){
							protected.infoBox.setText(' Data Received ');
							var oldFunction = win.document.write;
							var oldFunction2 = win.document.writeln;
							win.document.write = protected.write;
							win.document.writeln = protected.write;
							
							obj.innerHTML = data;
							//console.log(iframe.contentWindow.document.documentElement.innerHTML);
							//obj = (new DOMParser()).parseFromString(data, "text/xml");
							
							protected.nextPage++;
							$this.ProcessResultData(data, obj);
							win.document.write = oldFunction;
							win.document.writeln = oldFunction2;
							obj.innerHTML = null;
							docFragment.removeChild(obj);
							obj = null;
							docFragment = null;
							protected.infoBox.hide();
						};
						var ajaxOptions = {
							type: "GET",
							url: url,
							data: null,
							contentType: "application/x-www-form-urlencoded",
							async: true,
							beforeSend: function(xml){
								xml.overrideMimeType('text/html;charset=' + (!document.characterSet ? document.charset : document.characterSet));
							},
							success: callback,
						};
						try {
							jQ.ajax(ajaxOptions);
						} 
						catch (e) {
							GM_xmlhttpRequest({
								method: ajaxOptions.type,
								url: ajaxOptions.url,
								data: ajaxOptions.data,
								overrideMimeType: 'text/html;charset=' + (!document.characterSet ? document.charset : document.characterSet),
								headers: {
									"X-Requested-With": "XMLHttpRequest",
									"Content-Type": "application/x-www-form-urlencoded"
								},
								onload: function(d){
									ajaxOptions.success(d.responseText);
								}
							});
						}
					}
				};
				return $this;
			}
		};
	}();
	
	if (window.AutoPagerComponent == null) 
		window.AutoPagerComponent = AutoPagerComponent;
	
})();



(function(){

	var Discuz7 = function(){
		var protected = {};
		var that = AutoPagerComponent.getInstance(protected);
		
		that.init = function(){
			protected.infoBox.init();
			try {
				var xpath = document.evaluate(".//div[@class='pages']/a[attribute::class='next']/preceding-sibling::a[position()=1]/text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				if (xpath.snapshotLength == 2) 
					protected.maxPage = xpath.snapshotItem(1).nodeValue.match(/(\d+)/)[1];
				else 
					throw new Error("Cannot get maximum page of this thread.");
				
				var maxPageNode = xpath.snapshotItem(1);
				
				var div = xpath.snapshotItem(0).parentNode.parentNode;
				xpath = document.evaluate("./strong/child::text()", div, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				var curpage = xpath.snapshotItem(0).nodeValue;
				if (curpage == protected.maxPage) {
					throw new Error("Already the last page of thread.");
				}
				protected.nextPage = curpage;
				protected.nextPage++;
				
				xpath = document.evaluate(".//ancestor::div[contains(concat(' ',normalize-space(@class),' '),' forumcontrol ')]", maxPageNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				protected.insertPoint = xpath.snapshotItem(0).nextSibling;
				
				var loc = document.location.href.toString();
				var result = null;
				if (loc.match(/\?tid=\d+/)) {
					if (loc.match(/&page=\d+/)) {
						protected.url = loc.replace(/&page=\d+/, '&page=' + protected.nextPage);
					}
					else // curpage == 1
 						protected.url = loc + '&page=' + protected.nextPage;
				}
				else if (result = loc.match(/thread-(\d+)-(\d+)-(\d+)/)) {
					protected.url = loc.replace(/thread.*?\.html/, 'viewthread.php?tid=' + result[1] + '&extra=page=' + result[3] + '&page=' + protected.nextPage);
				}
				else {
					throw new Error("Cannot get the next link of thread.");
				}
			} 
			catch (e) {
				protected.disabled = true;
				throw (e);
				return;
			}
		};
		
		that.ProcessResultData = function(data, obj){
			var xpath = document.evaluate(".//div[contains(concat(' ',normalize-space(@class),' '),' mainbox ') and contains(concat(' ',normalize-space(@class),' '),' viewthread ')]", obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var docFragment = document.createDocumentFragment();
			var content = docFragment.appendChild(xpath.snapshotItem(0).cloneNode(true));
			
			xpath = document.evaluate(".//div[contains(concat(' ',normalize-space(@class),' '),' forumcontrol ')]", obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			
			docFragment.insertBefore(xpath.snapshotItem(0).cloneNode(true), content);
			docFragment.appendChild(xpath.snapshotItem(1).cloneNode(true));
			
			protected.insertPoint.parentNode.insertBefore(docFragment, protected.insertPoint);
			content = null;
			docFragment = null;
			protected.url = protected.url.replace(/&page=\d+/, '&page=' + protected.nextPage);
		};
		
		return that;
	}();
	
	var Discuz6 = function(){
		var protected = {};
		var that = AutoPagerComponent.getInstance(protected);
		
		that.init = function(){
			protected.infoBox.init();
			try {
				var xpath = document.evaluate(".//div[@class='pages_btns']/div[@class='pages']/a[attribute::class='last']/text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				if (xpath.snapshotLength == 2) 
					protected.maxPage = xpath.snapshotItem(1).nodeValue.match(/(\d+)/)[1];
				else 
				{
					xpath = document.evaluate(".//div[@class='pages']/a[attribute::class='next']/preceding-sibling::a[position()=1]/text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
					if (xpath.snapshotLength == 2) 
						protected.maxPage = xpath.snapshotItem(1).nodeValue.match(/(\d+)/)[1];
					else
						throw new Error("Cannot get maximum page of this thread.");
				}
				protected.insertPoint = xpath.snapshotItem(1).parentNode.parentNode.parentNode.nextSibling;
				var div = xpath.snapshotItem(0).parentNode.parentNode;
				xpath = document.evaluate("./strong/child::text()", div, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				var curpage = xpath.snapshotItem(0).nodeValue;
				if (curpage == protected.maxPage) {
					throw new Error("Already the last page of thread.");
				}
				protected.nextPage = curpage;
				protected.nextPage++;
				
				var loc = document.location.href.toString();
				var result = null;
				if (loc.match(/\?tid=\d+/)) {
					if (loc.match(/&page=\d+/)) {
						protected.url = loc.replace(/&page=\d+/, '&page=' + protected.nextPage);
					}
					else // curpage == 1
 						protected.url = loc + '&page=' + protected.nextPage;
				}
				else if (result = loc.match(/thread-(\d+)-(\d+)-(\d+)/)) {
					protected.url = loc.replace(/thread.*?\.html/, 'viewthread.php?tid=' + result[1] + '&extra=page=' + result[3] + '&page=' + protected.nextPage);
				}
				else {
					throw new Error("Cannot get the next link of thread.");
				}
			} 
			catch (e) {
				protected.disabled = true;
				throw (e);
				return;
			}
		};
		
		that.ProcessResultData = function(data, obj){
			var xpath = document.evaluate(".//form//div[@class='mainbox viewthread']/ancestor::form", obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var content = [];
			content[1] = xpath.snapshotItem(0).cloneNode(true);
			
			xpath = document.evaluate(".//div[@class='pages_btns']", obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			content[0] = xpath.snapshotItem(0).cloneNode(true);
			content[2] = xpath.snapshotItem(1).cloneNode(true);
			
			content.forEach(function(item){
				protected.insertPoint.parentNode.insertBefore(item, protected.insertPoint);
			});
			
			protected.url = protected.url.replace(/&page=\d+/, '&page=' + protected.nextPage);
		};
		
		return that;
	}();
	
	var Discuz5 = function(){
		var protected = {};
		var that = AutoPagerComponent.getInstance(protected);
		
		that.init = function(){
			protected.infoBox.init();
			try {
				var xpath = document.evaluate("self::node()/descendant-or-self::node()/child::div[attribute::class='maintable']/descendant-or-self::node()/child::div[attribute::class='p_bar']/a[attribute::class='p_pages']/child::text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				if (xpath.snapshotLength == 2) 
					protected.maxPage = xpath.snapshotItem(1).nodeValue.match("/(\\d+)")[1];
				else 
					throw new Error("Cannot get maximum page of this thread.");
				protected.insertPoint = xpath.snapshotItem(1).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.nextSibling;
				var div = xpath.snapshotItem(0).parentNode.parentNode;
				xpath = document.evaluate("self::node()/child::a[attribute::class='p_curpage']/child::text()", div, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				var curpage = xpath.snapshotItem(0).nodeValue;
				if (curpage == protected.maxPage) {
					throw new Error("Already the last page of thread.");
				}
				protected.nextPage = curpage;
				protected.nextPage++;
				
				var loc = document.location.href.toString();
				var result = null;
				if (loc.match(/\?tid=\d+/)) {
					if (loc.match(/&page=\d+/)) {
						protected.url = loc.replace(/&page=\d+/, '&page=' + protected.nextPage);
					}
					else // curpage == 1
 						protected.url = loc + '&page=' + protected.nextPage;
				}
				else if (result = loc.match(/thread-(\d+)-(\d+)-(\d+)/)) {
					protected.url = loc.replace(/thread.*?\.html/, 'viewthread.php?tid=' + result[1] + '&extra=page=' + result[3] + '&page=' + protected.nextPage);
				}
				else {
					throw new Error("Cannot get the next link of thread.");
				}
			} 
			catch (e) {
				protected.disabled = true;
				throw (e);
				return;
			}
		};
		
		that.ProcessResultData = function(data, obj){
			// mixing descendant with ancestor seems odd, but who knows?
			var xpath = document.evaluate("self::node()/descendant-or-self::node()/child::div[attribute::class='maintable']/descendant-or-self::node()/child::div[attribute::class='p_bar']/ancestor::div[attribute::class='maintable']", obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var content = [];
			
			content[0] = xpath.snapshotItem(0).cloneNode(true);
			content[2] = xpath.snapshotItem(1).cloneNode(true);
			
			// Is there anyway to specify two OR child nodes in one statement?
			xpath = document.evaluate("self::node()/descendant-or-self::node()/child::div[attribute::class='maintable']/descendant-or-self::node()/child::tr[attribute::class='header']/ancestor::div[attribute::class='maintable']", obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			content[1] = xpath.snapshotItem(0).cloneNode(true);
			
			content.forEach(function(item){
				protected.insertPoint.parentNode.insertBefore(item, protected.insertPoint);
			});
			
			protected.url = protected.url.replace(/&page=\d+/, '&page=' + protected.nextPage);
		};
		
		return that;
	}();
	
	var vBulletin4_0 = function(){
		var protected = {};
		var that = AutoPagerComponent.getInstance(protected);
		
		that.init = function(){
			protected.infoBox.init();
			try {
				var xpath = document.evaluate(".//div[@class='pagination_top']//form[contains(concat(' ',normalize-space(@class),' '),' pagination ')]//span[1]//text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				if (xpath.snapshotLength == 1){
					var pages=xpath.snapshotItem(0).nodeValue.match(/(\d+)/g);
					protected.maxPage = pages[1];
				}
				else {
					throw new Error("Cannot get maximum page of this thread.("+xpath.snapshotLength+')');
				}
				
				var curpage = pages[0];
				if (curpage == protected.maxPage) {
					throw new Error("Already the last page of thread.");
				}
				
				protected.nextPage = parseInt(curpage) + 1;
				xpath = document.evaluate("./ancestor::div[@class='pagination_top']//a", xpath.snapshotItem(0), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				var a = xpath.snapshotItem(xpath.snapshotLength-1).href.toString();
				var result = null;
				if (a.match(/\/showthread\.php\?/)) {
					protected.url = a.toString().replace(/(&|\/)page=?\d+/, '&page=' + protected.nextPage);
				}
				else if ( (result = document.getElementsByName('t')).length > 0 )	{
					for (var i=0;i<result.length;i++)
					{
						if (result[i].tagName.toString().toUpperCase()==='INPUT') {
							result = result[0].value;
							break;
						}
					}
					protected.url = 'showthread.php?t=' + result + '&page=' + protected.nextPage;
				}
				else {
					throw new Error("Cannot get the next link of thread.");
				}
				
				protected.insertPoint = document.getElementsByClassName('navlinks');
				if ( protected.insertPoint.length > 0 ) {
					protected.insertPoint = protected.insertPoint[0];
				}
				else {
					protected.insertPoint = null;
					throw new Error("Cannot find position to insert next page content");
				}
			}
			catch (e) {
				protected.disabled = true;
				throw (e);
				return;
			}
		};
		that.ProcessResultData = function(data, obj){
			var docFragment = document.createDocumentFragment();
			var xpath = document.evaluate(".//div//div[@id='above_postlist']", obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var header = xpath.snapshotItem(0).cloneNode(true);
			header.removeAttribute('id');
			docFragment.appendChild(header);
			xpath = document.evaluate(".//div//div[@id='postlist']", obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var content = xpath.snapshotItem(0).cloneNode(true);
			content.removeAttribute('id');
			docFragment.appendChild(content);
			xpath = document.evaluate(".//div//div[@id='below_postlist']", obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var footer = xpath.snapshotItem(0).cloneNode(true);
			footer.removeAttribute('id');
			docFragment.appendChild(footer);
			var xpath2 = document.evaluate("./ancestor::table", xpath.snapshotItem(0), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

			protected.insertPoint.parentNode.insertBefore(docFragment, protected.insertPoint);
			docFragment = null;
			protected.url = protected.url.replace(/&page=\d+/, '&page=' + protected.nextPage);
		};
		
		return that;
	}();

	var vBulletin3_8 = function(){
		var protected = {};
		var that = AutoPagerComponent.getInstance(protected);
		
		that.init = function(){
			protected.infoBox.init();
			try {
				var xpath = document.evaluate(".//div[@class='pagenav']//td[@class='vbmenu_control'][1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				if (xpath.snapshotLength == 2) 
					protected.maxPage = xpath.snapshotItem(0).firstChild.nodeValue.match(/(\d+)/g)[1];
				else {
					throw new Error("Cannot get maximum page of this thread.("+xpath.snapshotLength+')');
				}
				
				var curpage = xpath.snapshotItem(0).firstChild.nodeValue.match(/(\d+)/g)[0];
				if (curpage == protected.maxPage) {
					throw new Error("Already the last page of thread.");
				}
				
				protected.nextPage = parseInt(curpage) + 1;
				var a = xpath.snapshotItem(0).parentNode.getElementsByTagName('a');
				a = a[a.length - 1].href.toString();
				var result = null;
				if (a.match(/\/showthread\.php\?/)) {
					protected.url = a.toString().replace(/&page=\d+/, '&page=' + protected.nextPage);
				}
				else if (result = a.match(/\/thread\/(\d+)\/(\d+)\//)) {
					protected.url = a.replace(/\/thread\/.*/, '/showthread.php?t=' + result[2] + '&page=' + protected.nextPage);
				}
				else if (result = a.match(/\/thread(\d+)-(\d+)\.html/)) {
					protected.url = a.replace(/\/thread.*?\.html/, '/showthread.php?t=' + result[1] + '&page=' + protected.nextPage);
				}
				else if ( (result = document.getElementsByName('threadadminform')).length > 0 )	{
					result = result[0].action.toString().match(/(.*?)postings.php\?t=(\d*)/);
					protected.url = result[1]+'showthread.php?t=' + result[2] + '&page=' + protected.nextPage;
				}
				else {
					throw new Error("Cannot get the next link of thread.");
				}
				
				xpath = document.evaluate("./ancestor::table", xpath.snapshotItem(1), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				var pageBar = xpath.snapshotItem(xpath.snapshotLength - 2);
				pageBar.style.cssText = "visibility: hidden"
				protected.insertPoint = document.getElementById('lastpost');
			} 
			catch (e) {
				protected.disabled = true;
				throw (e);
				return;
			}
		};
		that.ProcessResultData = function(data, obj){
			var xpath = document.evaluate(".//table//div[@class='pagenav']//td[@class='vbmenu_control'][1]", obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var docFragment = document.createDocumentFragment();
			var xpath2 = document.evaluate("./ancestor::table", xpath.snapshotItem(0), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			docFragment.appendChild(xpath2.snapshotItem(xpath2.snapshotLength - 2).cloneNode(true));
			xpath2 = document.evaluate("./ancestor::table", xpath.snapshotItem(1), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var footer = xpath2.snapshotItem(xpath2.snapshotLength - 2).cloneNode(true);
			docFragment.appendChild(footer);
			xpath = document.evaluate(".//div[@id='posts']/div", obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			for (var i = 0; i <= xpath.snapshotLength - 2; i++) {
				docFragment.insertBefore(xpath.snapshotItem(i).cloneNode(true), footer);
			}
			footer = null;
			protected.insertPoint.parentNode.insertBefore(docFragment, protected.insertPoint);
			docFragment = null;
			protected.url = protected.url.replace(/&page=\d+/, '&page=' + protected.nextPage);
		};
		
		return that;
	}();
	
	var vBulletin = function(){
		var protected = {};
		var that = AutoPagerComponent.getInstance(protected);
		
		that.init = function(){
			protected.infoBox.init();
			try {
				var xpath = document.evaluate("self::node()/descendant-or-self::node()/child::div[attribute::class='page']/descendant-or-self::node()/child::div[attribute::class='pagenav']/descendant-or-self::node()/td[attribute::class='vbmenu_control'][1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				console.log(xpath.snapshotLength);
				if (xpath.snapshotLength == 2) 
					protected.maxPage = xpath.snapshotItem(1).firstChild.nodeValue.match(/(\d+)/g)[1];
				else {
					throw new Error("Cannot get maximum page of this thread.");
				}
				
				var curpage = xpath.snapshotItem(1).firstChild.nodeValue.match(/(\d+)/g)[0];
				if (curpage == protected.maxPage) {
					throw new Error("Already the last page of thread.");
				}
				
				var pagebar = xpath.snapshotItem(1).parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
				protected.style = pagebar.parentNode.getAttribute('style');
				protected.insertPoint = pagebar.parentNode;
				// move page bar location
				var pagebar2 = pagebar.cloneNode(true);
				pagebar.parentNode.parentNode.insertBefore(pagebar2, pagebar.parentNode);
				pagebar2.setAttribute('style', protected.style);
				pagebar.parentNode.removeChild(pagebar);
				
				protected.nextPage = curpage;
				protected.nextPage++;
				var a = xpath.snapshotItem(0).parentNode.getElementsByTagName('a')[0].href.toString();
				var result = null;
				if (a.match(/\/showthread\.php\?/)) {
					protected.url = a.toString().replace(/&page=\d+/, '&page=' + protected.nextPage);
				}
				else if (result = a.match(/\/thread\/(\d+)\/(\d+)\//)) {
					protected.url = a.replace(/\/thread\/.*/, '/showthread.php?t=' + result[2] + '&page=' + protected.nextPage);
				}
				else {
					throw new Error("Cannot get the next link of thread.");
				}
			} 
			catch (e) {
				protected.disabled = true;
				throw (e);
				return;
			}
		};
		that.ProcessResultData = function(data, obj){
			var xpath = document.evaluate(".//table//div[@class='pagenav']//td[@class='vbmenu_control']/ancestor::table/ancestor::table", obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var content = [];
			content[0] = xpath.snapshotItem(0).cloneNode(true);
			content[3] = xpath.snapshotItem(1).cloneNode(true);
			xpath = document.evaluate(".//td[@id='threadtools']/ancestor::table[@class='tborder']", obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			content[1] = xpath.snapshotItem(0).cloneNode(true);
			content[1].setAttribute('style', 'background-color: none');
			content.forEach(function(item){
				item.setAttribute('style', protected.style);
			});
			xpath = document.evaluate(".//div[@id='posts']", obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			content[2] = xpath.snapshotItem(0).cloneNode(true);
			
			content.forEach(function(item){
				protected.insertPoint.parentNode.insertBefore(item, protected.insertPoint);
			});
			protected.url = protected.url.replace(/&page=\d+/, '&page=' + protected.nextPage);
		};
		
		return that;
	}();
	
	var IPB3 = function(){
		var protected = {};
		var that = AutoPagerComponent.getInstance(protected);
		
		that.init = function(){
			protected.infoBox.init();
			try{
				var max_page = -1;
				var xpath = document.evaluate(".//li[@class='total']/text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				if (xpath.snapshotLength === 2) {
					var regex_result = xpath.snapshotItem(0).nodeValue.match(/(\d+)/);
					if (regex_result.length === 2) 
						max_page = regex_result[1];
				}
				
				if (max_page > 0) {
					protected.maxPage = max_page;
				}
				else if (max_page === -1) {
					throw new Error("Cannot get maximum page of this thread.");
				}
				
				var cur_page = protected.maxPage;
				xpath = document.evaluate(".//li[@class='active']/text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				regex_result = xpath.snapshotItem(0).nodeValue.match(/(\d+)/);
				if (regex_result.length === 2) 
					cur_page = regex_result[1];
				
				if (cur_page == protected.maxPage) {
					throw new Error("Already the last page of thread.");
				}
				
				protected.nextPage = parseInt(cur_page) + 1;
				var a = xpath.snapshotItem(0).parentNode.parentNode.getElementsByTagName('a')[0].href.toString();
				protected.st = parseInt(a.match(/(&st=|page__st__)(\d+)/)[2]);
				protected.url = a.toString().replace(/(&st=|page__st__)\d+/, '$1' + ((protected.nextPage - 1) * protected.st));
				
				xpath = document.evaluate("./html/body//div[@id='content']/*[last()]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
				protected.insertPoint = xpath.snapshotItem(0);
			}catch(e){
				protected.disabled=true;
				throw (e);
				return;
			}
		};
		that.ProcessResultData = function(data, obj){
			var docFragment = document.createDocumentFragment();
			var xpath = document.evaluate(".//div[contains(concat(' ',normalize-space(@class),' '),' topic ')]", obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			
			var docFragment = document.createDocumentFragment();
			docFragment.appendChild(xpath.snapshotItem(0).cloneNode(true));
			
			protected.insertPoint.parentNode.insertBefore(docFragment, protected.insertPoint);
			protected.url = protected.url.replace(/(&st=|page__st__)\d+/, '$1' + ((protected.nextPage - 1) * protected.st));
		};
		
		return that;
	}();
	
	var IPB2 = function(){
		var protected = {};
		var that = AutoPagerComponent.getInstance(protected);
		
		that.init = function(){
			protected.infoBox.init();
			var max_page = -1;
			var xpath = document.evaluate(".//span[contains(concat(' ',normalize-space(@class),' '),' pagelink ')]/text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if (xpath.snapshotLength === 2) {
				var regex_result = xpath.snapshotItem(0).nodeValue.match(/(\d+)/);
				if (regex_result.length === 2) 
					max_page = regex_result[1];
			}
			
			if (max_page > 0) {
				protected.maxPage = max_page;
			}
			else if (max_page === -1) {
				protected.disabled = true;
				throw new Error("Cannot get maximum page of this thread.");
			}
			
			var cur_page = protected.maxPage;
			xpath = document.evaluate(".//span[contains(concat(' ',normalize-space(@class),' '),' pagecurrent ')]/text()", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if (xpath.snapshotLength > 0) {
				regex_result = xpath.snapshotItem(0).nodeValue.match(/(\d+)/);
				if (regex_result.length === 2) 
					cur_page = regex_result[1];
			}
			else 
				throw new Error("Cannot get current page of this thread.");
			
			if (cur_page == protected.maxPage) {
				protected.disabled = true;
				throw new Error("Already the last page");
			}
			
			protected.nextPage = parseInt(cur_page) + 1;
			var a = xpath.snapshotItem(0).parentNode.parentNode.getElementsByTagName('a')[0].href.toString();
			protected.st = parseInt(a.match(/&st=(\d+)/)[1]);
			
			protected.url = a.toString().replace(/&st=\d+/, '&st=' + ((protected.nextPage - 1) * protected.st));
			
			xpath = document.evaluate("./html/body//div[contains(concat(' ',normalize-space(@class),' '),' borderwrap ')]/div[contains(concat(' ',normalize-space(@class),' '),' maintitle ')]/table/../../following-sibling::*[1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if (xpath.snapshotLength === 1) 
				protected.insertPoint = xpath.snapshotItem(0);
			else 
				throw new Error("Cannot find insert point");
		};
		that.ProcessResultData = function(data, obj){
			var docFragment = document.createDocumentFragment();
			var xpath = document.evaluate(".//div[contains(concat(' ',normalize-space(@class),' '),' borderwrap ')]/div[contains(concat(' ',normalize-space(@class),' '),' maintitle ')]/table/../..", obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			if (xpath.snapshotLength === 1) 
				docFragment.appendChild(xpath.snapshotItem(0).cloneNode(true));
			else 
				throw new Error("Cannot find content");
			
			protected.insertPoint.parentNode.insertBefore(docFragment, protected.insertPoint);
			protected.url = protected.url.replace(/&st=\d+/, '&st=' + ((protected.nextPage - 1) * protected.st));
		};
		
		return that;
	}();
	
	var IPB1 = function(){
		var protected = {};
		var that = AutoPagerComponent.getInstance(protected);
		
		that.init = function(){
			protected.infoBox.init();
			var xpath = document.evaluate(".//a[@name='top']/following-sibling::table[1]/tbody/tr/td[1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var max_page = -1;
			if (xpath.snapshotLength === 1) {
				var regex_result = xpath.snapshotItem(0).innerHTML.match(/(\d+)/);
				if (regex_result.length === 2) 
					max_page = regex_result[1];
			}
			
			if (max_page > 0) {
				protected.maxPage = max_page;
			}
			else if (max_page === -1) {
				protected.disabled = true;
				return;
			}
			
			var cur_page = protected.maxPage;
			regex_result = xpath.snapshotItem(0).innerHTML.match(/\[(\d+)\]/);
			if (regex_result.length === 2) 
				cur_page = regex_result[1];
			
			if (cur_page == protected.maxPage) {
				protected.disabled = true;
				return;
			}
			
			protected.nextPage = parseInt(cur_page) + 1;
			var a = xpath.snapshotItem(0).parentNode.getElementsByTagName('a')[0].href.toString();
			protected.st = parseInt(a.match(/&st=(\d+)/)[1]);
			
			protected.url = a.toString().replace(/&st=\d+/, '&st=' + ((protected.nextPage - 1) * protected.st));
			
			xpath = document.evaluate("./html/body/table[last()-1]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			var page_bar = xpath.snapshotItem(0);
			page_bar.setAttribute('style', 'visibility: hidden');
			
			xpath = document.evaluate("./html/body/table[last()-2]/tbody/tr[last()]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			protected.insertPoint = xpath.snapshotItem(0);
		};
		that.ProcessResultData = function(data, obj){
			var docFragment = document.createDocumentFragment();
			var xpath = document.evaluate(".//a[@name='top']/following-sibling::table[1]/tbody/tr", obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			
			var table = document.createElement('table');
			docFragment.appendChild(table);
			table.appendChild(xpath.snapshotItem(0).cloneNode(true));
			
			xpath = document.evaluate(".//table[last()-2]/tbody/tr[last()-1]", obj, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
			docFragment.appendChild(xpath.snapshotItem(0).cloneNode(true));
			
			protected.insertPoint.parentNode.insertBefore(docFragment, protected.insertPoint);
			
			protected.url = protected.url.replace(/&st=\d+/, '&st=' + ((protected.nextPage - 1) * protected.st));
		};
		
		return that;
	}();
	
	
	var generator = document.evaluate("self::node()/descendant-or-self::node()/meta[attribute::name='generator']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
	if (generator != null) {
		generator = generator.content || "";
		if (generator.match("Discuz! 6")) {
			AutoPager.init(Discuz6);
		}
		else if (generator.match("Discuz! 5")) {
			AutoPager.init(Discuz5);
		}
		else if (generator.match("Discuz.*7\.")) {
			AutoPager.init(Discuz7);
		}
		else if (generator.match("vBulletin 3\.0")) {
			AutoPager.init(vBulletin);
		}
		else if (generator.match("vBulletin 3\.")) {
			AutoPager.init(vBulletin3_8);
		}
		else if (generator.match("vBulletin 4\.")) {
			AutoPager.init(vBulletin4_0);
		}
	}
	else if (document.location.href.toString().match('/index\.php')) {
		var copyright = document.getElementById('copyright') || document.getElementsByClassName('copyright')[0];
		var a_links = copyright ? copyright.getElementsByTagName('a') : document.getElementsByTagName('a');
		if (a_links[a_links.length - 1].href.toString().match('http://www.invisionpower.com')) {
			// should be IPS product
			var dom_copyright = a_links[a_links.length - 1].parentNode;
			var regxp_result = dom_copyright.innerHTML.match(/©.*?(\d+)/);
			if (regxp_result && regxp_result.length === 2) {
				if (regxp_result[1] === '2003') {
					AutoPager.init(IPB1);
				}
				else if (regxp_result[1] === '2009' || regxp_result[1] === '2010') {
					if (copyright.getAttribute('id') === 'copyright') 
						AutoPager.init(IPB3);
					else if (copyright.getAttribute('class').toString().match(/copyright/)) 
						AutoPager.init(IPB2);
				}
			}
		}
	}
	
})();
// -----------------------------------------------------------------------
// Fix for Google Chrome, use HTML5-LocalStorage instead of Greasemonkeys one.
// -----------------------------------------------------------------------
if (!this.GM_getValue || this.GM_getValue.toString().indexOf("not supported") > -1) {
	this.GM_getValue = function (key, def) {
		return localStorage[key] || def;
	};
	
	this.GM_setValue = function (key, value) {
		return localStorage[key] = value;
	};
}


