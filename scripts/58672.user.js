// ==UserScript==
// @name           bigtextViewer
// @namespace      limboy.com
// @description    view all bigtext font in one page
// @include        http://bigtext.org/
// ==/UserScript==

(function(){
	if( window != top )
		return false;
		
	var TUI = {
		elm: function(selector) {
			try {
				return Array.prototype.slice.call( document.querySelectorAll(selector) );
			} catch(e){
				alert('Update your Firefox to 3.5+, please.');
				return [];
			}
		},
		isFunction: function(obj) {
			return Object.prototype.toString.call(obj) === "[object Function]";
		},
		each: function(obj, fn){
			if( obj.constructor == Array ) {
				for(var i=0, l=obj.length;i<l;i++){
					var re = fn.call(obj[i], i+1);
					if( re === false )
						break;		
				}
			} else {
				for(var i in obj){
					var re = fn.call(obj[i], obj[i], i);
					if( re === false )
						break;		
				}
			}
		},
		isCloseTag: function(tagName){
			return ({area:1,base:1,col:1,hr:1,img:1,br:1,input:1,link:1,meta:1,param:1})[tagName.toLowerCase()];
		},
		addElm: function(tag, attr, cb) {
			var temp = document.createElement("div");
			if( /</.test(tag) ){
				temp.innerHTML = tag;
				cb = attr;
			}else{
				var attrhtml = [''], elm = '<'+tag; 
				attr = attr || {}; 
				TUI.each(attr, function(n){
					if( n == "innerHTML" )
						return true;
					attrhtml.push( ( n == "className" && 'class="' || ( n + '="' ) ) + this + '"');
				});
				temp.innerHTML = '<' + tag + attrhtml.join(' ') 
								+ ( TUI.isCloseTag(tag) ? ' />' : ( '>' + ( attr.innerHTML || '' ) + '</' + tag + '>' ) );
			}
			var elm = temp.firstChild;
			if(cb) 
				cb.call(elm);
			delete temp;
			return elm;
		},
		insertStyle: function(css) {
			var styleElm = document.createElement("style");
			document.getElementsByTagName("head")[0].appendChild(styleElm)
			var cssText = document.createTextNode(css);
			styleElm.appendChild(cssText);
		},
		ajax: function(op) {
			var XHR = new XMLHttpRequest();
		    XHR.open( op.type || 'GET', op.url, true, op.username, op.password );
		    XHR.onreadystatechange = function() {
		        if (XHR.readyState == 4)
		            op.success(XHR.responseText);
		    };
		    XHR.send(op.data || '');
			return XHR;
		},
		httpParam: function(a) {
			var s = [];
		    if ( a.constructor == Array ) {
		        for ( var i = 0; i < a.length; i++ )
		            s.push( a[i].name + "=" + encodeURIComponent( a[i].value ) );
		    } else {
		        for ( var j in a )
		            s.push( j + "=" + encodeURIComponent( a[j] ) );
		    }
		    return s.join("&").replace(/%20/g, "+");
		},
		request: function(type, url, data, cb, dataType) {
			if( this.isFunction(data) ) {
				dataType = cb;
				cb = data;
				data = '';
			} else if( typeof data != "string" ) {
				data = this.httpParam(data);
			}
			var userAuth = userAuth || {}
			
			return this.ajax({
				url: url,
				type: type,
				data: data,
				success: cb,
				dataType: dataType,
				username: userAuth.username,
				password: userAuth.password
			});
		},
		get: function(url, data, cb, type) {
			if (data)
				url += '?' + ( typeof data === "string" && data || this.httpParam(data) );
			return this.request("GET", url, false, cb, type);
		},
		post: function(url, data, cb, type) {
			this.request("POST", url, data, cb, type);
		}
	};





	var box = TUI.addElm('div'),
		obox = TUI.elm("#bigtext")[0],
		text = TUI.elm("#text")[0],
		button = TUI.elm("input[type=submit]")[0],
		form = TUI.elm("form")[0],
		api = form.getAttribute('action');
	
	var bigtext = (function(){
		var fonts, 
			timer = false;
		
		var obj = {
			load: function(){
				if (!fonts[0])
					return false;
				var me = this;
				timer = setTimeout(function(){
					timer = false;
					me.load();
				}, 5000);
				var font = fonts.shift();
				TUI.get(api, { "text": encodeURIComponent(text.value), "font": font }, function(html){
					me.show(font, (html.match(/<pre.*?bigtext.*?>([^$]+)<\/pre>/) || ['',''])[1]);
					if (timer) {
						clearTimeout(timer);
						timer = setTimeout(function(){
							me.load();
						}, 200);
					}		
				});
			},
			stop: function(){
				if (timer)
					clearTimeout(timer);
				timer = false;
			},
			show: function(font, bigfont){
				TUI.addElm('<div style="float:left;margin:5px;padding:5px;border:1px dashed #333;"><p style="color:#ff6600;font-weight:bold;font-size:16px;padding:0;margin:0;">' + font + '</p><pre style="float:left;margin:0;padding:0;">' + bigfont + '</pre></div>', function(){
					box.appendChild(this);
				});
			}
		};
		
		return function(){
			obj.stop();
			fonts = TUI.elm("#font option").map(function(a){
				return a.value;
			});
			box.innerHTML = '';
			return obj;
		};
		
	})();
	
	
	button.value = "see it big (all fonts)";
	obox.parentNode.replaceChild(box, obox);

	form.addEventListener('submit', function(e){
		e.preventDefault();
		bigtext().load();
		return false;
	}, false);

})();
