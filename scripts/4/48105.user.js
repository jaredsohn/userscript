// ==UserScript==
// @name           YAAS
// @namespace      limboy.com
// @description    Yet Another All-in-one Spider
// @include        *
// ==/UserScript==


(function(){
	if( window != top )
		return false;
		
	var TUI = {
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
		elm: function(did) {
			return document.getElementById(did);
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
			return this.request("GET", url, data, cb, type);
		},
		post: function(url, data, cb, type) {
			this.request("POST", url, data, cb, type);
		}
	};
	
	TUI.pageSpider = function(op){
		var loading = op.loading || function(){};
		var error = op.error || function(){};
		
		return {
			getSimilarLink: function(rule, callback){
				var me = this;
				var pause = [];
				var step = [(new Date()).getTime()];
				var history = { length: 0 };
				var requestPool = { length: 0 };
				
				this.pause = function(fn){
					pause[0] = true;
					if(fn)
						fn( getList(history) );
				};
				
				this.go = function(){
					delete requestPool.length;
					var links = [];
					TUI.each(requestPool, function(){
						links.push(this);
					});
					step[0] = (new Date()).getTime();
					requestPool = { length: 0 };
					pause[0] = false;
					spider(links);
				};
				
				var getList = function(data){
					var links = [];
					TUI.each(data, function(v,n){
						if( n != "length" )
							links.push(n);
					});
					return links;
				};
				
				var spider = function(html) {
					try{
						var a = html;
						if(typeof html == "string")
							a = html.replace(/&amp;/g, "&").match(new RegExp(rule, "g"));
						if (!a)
							return false;
						TUI.each(a, function(){try{
							var v = this;
							var uuid = (new Date()).getTime();
							var visited = history[v];
							if( !visited ) {
								history[v] = true;
								history.length++;
								requestPool[uuid] = v;
								requestPool.length++;
							}
							//console.log(requestPool.length)
							if( history.length != 0 && requestPool.length <= 0 ) {
								callback( getList(history) );
							} else if( !visited ) {
								TUI.get(v, function(html){
									if( uuid < step[0] )
										return false;

									if( !pause[0] ) {
										if( requestPool[uuid] ){
											delete requestPool[uuid];
											requestPool.length--;
										}
										spider(html);
									} else {
										history[v] = false;
										history.length--;
									}
								});
								loading();
							}
						}catch(e){}});
					
					}catch(e){
						me.pause();
						error(e);
					}
					return true;
				};
				
				return spider(document.body.innerHTML);
			}
		}
		
	};
	
	var YYbox = {
		getHTML: function(){
			return <div id="TUI_box">
				<h4><strong style="color:#ff6600">YAAS</strong> - YY的网页爬虫<span><input type="button" id="TUI_boxClose" class="TUI_btn" value="X" /></span></h4>
				<div class="TUI_method">
					<h5>#1: 抓取当前网站中相似的链接地址</h5>
					<p><label for="TUI_linkrule">链接地址：</label><input type="text" value="" id="TUI_linkrule"  /></p>
					<p><em>tips: 可变部分用*代替</em><input type="button" class="TUI_btn" id="TUI_getSimilarLink" value="开始抓取" /></p>
				</div>
				<div id="TUI_result">Loading, please waiting</div>
			</div>;
		},
		addCSS: function() {
			var style = '#TUI_box{text-align:center;font-size:14px;padding:0;width:360px;overflow:hidden;background:#fff;border:2px solid #999;position:fixed;top:10px;left:10px;z-index:19999;-moz-border-radius-topleft:8px;-moz-border-radius-topright:8px;}'
						+ '#TUI_box .TUI_btn{padding:0;width:22px;font-size:14px;line-height:14px;background:none;color:#fff;border:0;cursor:pointer}'
						+ '#TUI_box .TUI_btn:hover{background:#000;color:#fff;}'
						+ '#TUI_box h4{text-align:left;font-weight:500;padding:0 0 0 20px;margin:0;font-size:16px;height:40px;line-height:40px;background:#333;color:#fff;-moz-border-radius-topleft:5px;-moz-border-radius-topright:5px;}'
						+ '#TUI_box h4 span{float:right;margin:-40px 0 0 0;}'
						+ '#TUI_box h4 span .TUI_btn{float:right;margin:10px 8px 0 0;}'
						+ '#TUI_box .TUI_method{margin:10px 20px;text-align:center;}'
						+ '#TUI_box	p{clear:both;line-height:30px;padding:0;margin:0;text-align:left;}'
						+ '#TUI_box	p em{line-height:20px;font-size:12px;float:left;margin:10px 0 10px 0;color:#666}'
						+ '#TUI_box .TUI_method p label{width:80px;height:30px;display:block;float:left;}'
						+ '#TUI_box .TUI_method p input{font-size:14px;width:228px;padding:3px;}'
						+ '#TUI_box .TUI_method h5{font-size:12px;padding:4px 6px;margin:10px 0;background:#eee;}'
						+ '#TUI_box .TUI_method .TUI_btn{background:#333;width:100px;margin:10px 0 10px 5px;float:right;}'
						+ '#TUI_box .TUI_method .TUI_btn:hover{background:#000}'
						+ '#TUI_result{display:none;clear:both;background:#ffffcc;padding:10px;background:#333;color:#fff;text-align:left;}'
						+ '#TUI_result textarea{border:1px solid #666;width:320px;background:#ffffcc;height:200px;padding:5px;background:#}';
			TUI.insertStyle(style);
		},
		show: function(init) {
			var that = this;
			this.addCSS();
			this.box = TUI.addElm(this.getHTML(), function(){ document.body.appendChild(this); });
			TUI.elm("TUI_boxClose").addEventListener('click', function(){
				that.close();
			}, false);
			init.call(this.box);
		},
		close: function(){
			document.body.removeChild(this.box);
		}
	}
	
	var spider = TUI.pageSpider({
		loading: function(){
			TUI.elm("TUI_result").innerHTML += " .";
		},
		error: function(e){
			TUI.elm("TUI_result").innerHTML = '<span style="color:#f00">抓取过程出错，注意匹配规则应该跟页面里的链接地址写法保持一致，尽可能写相对地址（"/"开头）</span>';
			TUI.elm("TUI_getSimilarLink").value = "重新抓取";
		}
	});
	
	YYbox.show(function(){
		TUI.elm("TUI_getSimilarLink").addEventListener('click', function(){
			if( this.value == "暂停" ) {
				this.value = "继续抓取";
				clickBtn(1);
			} else if( this.value == "继续抓取" ){
				this.value = "暂停";
				clickBtn(2);
			} else {
				this.value = "暂停";
				clickBtn(0);
			}
		}, false);
	});
	
	function showResult(links) {
		var r = TUI.elm("TUI_result");
		r.innerHTML = '<p>结果：</p><textarea>' + links.join("\n") + '</textarea>'; //console.log(links.length)
		/*
		var text = r.getElementsByTagName("TEXTAREA")[0];
		text.value = links.join("\n");
		text.addEventListener('click', function(){
			this.select();
		}, false);
		*/
	};
	
	function clickBtn(action) {
		var rule = TUI.elm("TUI_linkrule").value;
		if(action == 0) {
			TUI.elm("TUI_result").innerHTML = "Loading, please waiting";
			rule = rule.replace(/[\^\$\.\+\?\=\!\:\|\\\/\(\)\[\]\{\}]/g, "\\$&").replace(/\*/g, "[^&\\/\"'<>]+");
			TUI.elm("TUI_result").style.display = "block";
			result = spider.getSimilarLink(rule, function(data){
				showResult(data);
				TUI.elm("TUI_getSimilarLink").value = "重新抓取";
			});
			if (!result) {
				TUI.elm("TUI_result").innerHTML = '<span style="color:#fff">无结果，试试改一下匹配规则，尽可能用相对地址（"/"开头）</span>';
				TUI.elm("TUI_getSimilarLink").value = "重新抓取";
			}
		} else if(action == 1) {
			spider.pause(function(data){
				showResult(data);
			});
		} else if(action == 2) {
			TUI.elm("TUI_result").innerHTML = "Loading, please waiting";
			spider.go();
		}
	};
	
})();