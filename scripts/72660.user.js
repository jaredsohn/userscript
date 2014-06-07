// ==UserScript==
// @name           Wide style for mediawiki
// @description    mediawiki features give it a default style opening and closing the sidebar. mediawikiのデフォルトスタイルのサイドバーに開閉機能を付けます。
// @version        0.2.0
// @namespace      http://www.sharkpp.net/
// @author         Shark++ / sharkpp
// @include        http://*.wikipedia.org/*
// @include        http://*.wikibooks.org/*
// @include        http://*.wikimedia.org/*
// @include        http://*.wikinews.org/*
// @include        http://*.wikiquote.org/*
// @include        http://*.wikisource.org/*
// @include        http://*.wikiversity.org/*
// @include        http://*.wiktionary.org/*
// @include        http://*.uncyclopedia.info/*
// ==/UserScript==

(function (){
	var bind = function() {
			var args     = Array.prototype.slice.call(arguments);
			var __method = args.shift();
			var object   = args.shift();
			return function() {
					return __method.apply(object, args.concat(Array.prototype.slice.call(arguments)));
				}
		};
	var getStyle = function(element) {
			return element.currentStyle || document.defaultView.getComputedStyle(element, '');
		};
	var offsetOf = function(elm) {
			var pos = { x: 0, y: 0 };
			while( elm ) {
				pos.x += elm.offsetLeft || 0;
				pos.y += elm.offsetTop  || 0;
				elm = elm.parentNode;
			}
			return pos;
		};
	var keyState = { shift: false, ctrl: false, alt: false };

	var items = document.evaluate(
					'//*[@id="content"]',
					document,
					null,
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
					null);

	if( items.snapshotLength ) {
		var item = items.snapshotItem(0);
		var panelWidth = getStyle(item).marginLeft || "";
		item.setAttribute("style", "margin-left: 0; z-index: 99; position: relative;");
		var swbar		= item.appendChild(document.createElement('div'));
		var swbarBar	= swbar.appendChild(document.createElement('div'));
		var swbarButton	= swbar.appendChild(document.createElement('div'));
		swbar.style.position		= "absolute";
		swbar.style.left			= "0";
		swbar.style.top				= "0";
		swbar.style.width			= "31px";
		swbar.style.height			= "100%";
		swbar.style.overflow		= "hidden";
	//	swbar.style.borderRight		= "1px solid gray";
	//	swbar.style.opacity			= 0.01;
	//	swbar.style.backgroundColor	= "#C1D2EE";
		swbarBar.style.position			= "absolute";
		swbarBar.style.left				= "-1px";
		swbarBar.style.top				= "0";
		swbarBar.style.width			= "10px";
		swbarBar.style.height			= "100%";
		swbarBar.style.borderRight		= "1px solid gray";
		swbarBar.style.backgroundColor	= "#C1D2EE";
		swbarButton.style.position			= "absolute";
		swbarButton.style.left				= "10px";
		swbarButton.style.top				= "0";
		swbarButton.style.backgroundColor	= swbarBar.style.backgroundColor;
		swbarButton.style.borderTop			= "1px solid gray";
		swbarButton.style.borderRight		= "1px solid gray";
		swbarButton.style.borderBottom		= "1px solid gray";
		swbarButton.style.width				= (parseInt(swbar.style.width) - parseInt(swbarBar.style.width) - 2) + "px";
		swbarButton.style.height			= "50px";
		swbarButton.style.MozBorderRadius	= "0 10px 10px 0";
		swbarButton.style.borderRadius		= "0 10px 10px 0";
		swbarButton.style.lineHeight 		= "50px";
		swbarButton.style.textAlign 		= "center";
		swbar.panelWidth = panelWidth;
		swbar.scrollIn = { id: null, fn: function(){
				var pos = this.getPaddlePos();
				pos += 5;
				if( null != this.scrollIn.id ) {
					if( 30 < pos ) {
						pos = 30;
						this.scrollIn.id = null;
					} else {
						setTimeout(bind(this.scrollIn.fn, this));
					}
					this.setPaddlePos(pos);
				}
			} };
		swbar.scrollOut= { id: null, fn: function(){
				var pos = this.getPaddlePos();
				pos -= 10;
				if( null != this.scrollOut.id ) {
					if( pos <= 0 ) {
						pos = 0;
						this.scrollOut.id = null;
					} else {
						setTimeout(bind(this.scrollOut.fn, this));
					}
					this.setPaddlePos(pos);
				}
			} };
		swbar.isExpanded = function() {
				return this.panelWidth == this.parentNode.style.marginLeft;
			};
		swbar.setPaddlePos = function(pos) {
				pos -= parseInt(this.lastChild.style.width);
				this.firstChild.style.width = (pos < 0 ? 0 : pos) + "px";
				this.lastChild.style.left   = (pos - 1) + "px";
			};
		swbar.getPaddlePos = function() {
				return parseInt(this.lastChild.style.left) + parseInt(this.lastChild.style.width) + 1;
			};
		swbar.setLogoPos = function(expand) {
				var items = document.evaluate(
								'//*[@id="p-logo"]',
								document,
								null,
								XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
								null);
				if( items.snapshotLength ) {
					var item = items.snapshotItem(0);
					item.style.top = expand ? null : -105 + "px";
				//	item.style.top = expand ? null : ((-item.clientHeight + 35) + "px");
				}
			};
		swbar.setPanelVisible = function(visible) {
				var condition = [ '//*[@id="panel"]',
				                  '//*[@id="p-search"]', '//*[@id="p-navigation"]', '//*[@id="p-help"]', '//*[@id="p-tb"]',
				                  '//*[@id="p-lang"]'
								];
				var is_new_style = false;
				for(i in condition) {
					var items = document.evaluate(
									condition[i],
									document,
									null,
									XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
									null);
					if( items.snapshotLength ) {
						if( 0 == i )
							is_new_style = true;
						if( 1 == i && is_new_style )
							continue;
						var item = items.snapshotItem(0);
						item.style.display = visible ? null : "none";
					}
				}
			};
		swbar.addEventListener('click', bind(function(){
				if( this.isExpanded() ) {
					this.parentNode.style.marginLeft = "0";
					this.setLogoPos(false);
					this.setPanelVisible(false);
				} else {
					this.parentNode.style.marginLeft = this.panelWidth;
					this.setLogoPos(true);
					this.setPanelVisible(true);
				}
				this.setPaddlePos(0);
			}, swbar), false);
		swbar.addEventListener('mouseover', bind(function(e){
				this.lastChild.innerHTML = this.isExpanded() ? "&#171;" : "&#187;";
				if( !this.getPaddlePos() ) {
					var pos = e.pageY - offsetOf(this).y - parseInt(parseInt(this.lastChild.style.height) / 2);
					    pos = pos < 0 ? 0 : pos;
					this.lastChild.style.top = pos + "px";
				}
				if( null != this.scrollOut.id )
					clearTimeout(this.scrollOut.id);
				this.scrollIn.id = setTimeout(bind(this.scrollIn.fn, this), 50);
			}, swbar), true);
		swbar.addEventListener('mouseout', bind(function(e){
				if( null != this.scrollIn.id )
					clearTimeout(this.scrollIn.id);
				this.scrollOut.id = setTimeout(bind(this.scrollOut.fn, this), 50);
			}, swbar), true);
		swbar.setLogoPos(false);
		swbar.setPaddlePos(0);
		swbar.setPanelVisible(false);
	}
	document.addEventListener('keydown', function(e){
			keyState.shift= e.shiftKey;
			keyState.ctrl = e.ctrlKey;
			keyState.alt  = e.altKey;
			if( keyState.alt )
				swbar.style.display = "none";
			if( null != keyState.timeoutFnId )
				clearTimeout(keyState.timeoutFnId);
				keyState.timeoutFnId = setTimeout(function(){
						keyState.shift = keyState.ctrl = keyState.alt = false;
						swbar.style.display = null;
					}, 5000);
		}, true);
	document.addEventListener('keyup', function(e){
			keyState.shift= e.shiftKey;
			keyState.ctrl = e.ctrlKey;
			keyState.alt  = e.altKey;
			if( !keyState.alt )
				swbar.style.display = null;
			if( null != keyState.timeoutFnId )
				clearTimeout(keyState.timeoutFnId);
			keyState.timeoutFnId = null;
		}, true);
})();
