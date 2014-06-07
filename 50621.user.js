// ==UserScript==
// @name        LDR open in background tab
// @namespace   http://ss-o.net/
// @include     http://reader.livedoor.com/reader/
// @include     http://reader.livedoor.com/public/*
// @include     http://fastladder.com/reader/
// @include     http://fastladder.com/public/*
// @version     1.0.3
// ==/UserScript==

(function(window, load){
	if (this.chrome && !load){
		var fn = '(' + arguments.callee.toString() + ')(this, true);';
		var script = document.createElement('script');
		script.appendChild(document.createTextNode(fn));
		document.body.appendChild(script);
		return;
	}
	var native_open = window.native_open = window.open;
	window.open = this.chrome ? function(url,name){
		if (url === void 0) return native_open(url,name);
		var a = document.createElement('a');
		a.href = url;
		if (name) a.target = name;
		var event = document.createEvent('MouseEvents');
		event.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 1, null);
		a.dispatchEvent(event);
		return true;
	} : function(url,name){
		if (url === void 0) return native_open(url,name);
		setTimeout(function(){
			GM_openInTab(url);
		});
		return true;
	};
	document.addEventListener('click',function(evt){
		if (evt.target.href && evt.target.target === '_blank'){
			evt.preventDefault();
			window.open(evt.target.href, '_blank');
		}
	},false);
	var _onload = window.onload;
	window.onload = function(){
		_onload();
		var p = window.Control.pin;
		var v = window.Control.view_original;
		var force_next_item = function(){
			var i = window.get_active_item();
			window.Control.scroll_next_item();
			if(i == window.get_active_item()){
				window.Control.scroll_next_item();
			}
		};
		var pin = function(){
			var res = p.apply(this, arguments);
			force_next_item();
			return res;
		};
		var view_original = function(){
			var res = v.apply(this, arguments);
			force_next_item();
			return res;
		};
		window.Keybind.add("p", pin);
		window.Keybind.add("v", view_original);
	};
})(this.unsafeWindow);
