// ==UserScript==
// @name           TinyWall
// @namespace      http://userscripts.org/users/105016
// @description    自动展开短地址(免翻墙)。
// @include        http://*
// @include        https://*
// @exclude        http://bit.ly/*
// @exclude        http://j.mp/*
// @exclude        http://ff.im/*
// @exclude        http://htxt.it/*
// ==/UserScript==


var stamp = Number(new Date());

var GM = {

	_values: (function(){
		var lst = GM_listValues(), vs = {};
		for(var i = 0, l = lst.length; i < l; i++){
			vs[lst[i]] = GM_getValue(lst[i]);
		}
		return vs;
	})(),


	// Values
	getValue: function(n,d){
		return this._values[n] || d;
	},
	
	setValue: function(n,v){
		var that = this;
		window.setTimeout(function(){
			GM_setValue(n, v);
		},0);
		that._values[n] = v;
	},

	deleteValue: function(n){//#Bug: Can not call deleteValue() immediately after calling the setValue().
		GM_deleteValue(n);
		delete this._values[n];
	},
	
	listValues: function(){
		var lv = [];
		for(var n in this._values)
			lv.push(n);

		return lv;
	},
	
	// Resources
	getResourceURL: function(n){return GM_getResourceURL(n);},
	getResourceText: function(n){return GM_getResourceText(n);},

	// Programmatic
	log: function(m){GM_log(m);},
	
	// Common Task Helpers
	addStyle: function(style){GM_addStyle(style);},
	xmlhttpRequest: function(d){window.setTimeout(function(){GM_xmlhttpRequest(d);},0);},

	// Other
	registerMenuCommand: function( commandName, commandFunc, accelKey, accelModifiers, accessKey ){GM_registerMenuCommand( commandName, commandFunc, accelKey, accelModifiers, accessKey );},
	openInTab: function(url){GM_openInTab(url);}
};

var LongUrl = {
	
	api_endpoint: "http://api.longurl.org/v2/",
	
	headers: {"User-Agent":"TinyWall/0.1.2 (Greasemonkey)"},
	
	param: function(data){
		var t = [];
		data
		for(var name in data){
			t.push(name + '=' + encodeURIComponent(data[name]));
		}
		return t.join('&');
	},

	services: function(callback, format){
		format = format || 'xml';
		GM.xmlhttpRequest({
			method: 'GET',
			url: this.api_endpoint + "services?format=" + format,
			headers: this.headers,
			onload: function(response){
				if (!response.responseXML && opt.format == 'xml'){
					response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
				}else if(!response.jsonData && opt.format == 'json'){
					response.jsonData = eval('(' + response.responseText + ')');
				}
				callback(response);
			}
		});
	},
	
	expand: function(tiny_url, callback, opt){
		var api_url = this.api_endpoint + "expand?url=" + encodeURIComponent(tiny_url);
		
		opt = opt || {};
		opt.format = opt.format || 'xml';
		api_url += ( "&"+ this.param(opt) );
		
		GM.xmlhttpRequest({
			method: 'GET',
			url: api_url,
			headers: this.headers,
			onload: function(response){
				if (!response.responseXML && opt.format == 'xml'){
					response.responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
				}else if(!response.jsonData && opt.format == 'json'){
					response.jsonData = eval('(' + response.responseText + ')');
				}
				callback(response);
			}
		});

	}

};

var TinyWall = {
	
	tinyClass: "tiny-" + stamp,
	tinyLoadingClass: "tiny-" + stamp + "-loading",
	tinyLoadedClass: "tiny-" + stamp + "-loaded",
	
	tinyCache:{},

	style: function(){
		GM.addStyle( <><![CDATA[
			
			.]]>{this.tinyClass}<![CDATA[{
				display: inline-block;
				border: 1px dashed;
				min-height: 16px;
				padding-left: 33px;
				background: url(data:image/gif;base64,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) no-repeat !important;
			}
			
			.]]>{this.tinyClass}<![CDATA[:hover{
				background-color: #ddeef6 !important;
			}

			.]]>{this.tinyLoadingClass}<![CDATA[{
				padding-left: 16px;
				background: url(data:image/gif;base64,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) no-repeat !important;
			}

			.]]>{this.tinyLoadedClass}<![CDATA[{
				background: url(data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAACdUlEQVQ4jaWTS2hTQRSGv3uT3OQmjbSWGtFKLVLxUSiIoFJUcCGCuCo+cGNdSKFKEVo3LsSVIgiCm4Lgyp1v0Y07xU19VgXFKq2p0drYNE2ax33M3DsucptWXTqrYZj/O2f++Y+mlOJ/lv5faiC8sNlyeBiAgSsXDSFFnyudg54S26SncFz9pW0Z9z882Xtt4tXOMuD/AwDov3S51ZPyUVt8d1c8EkKRpSrnmLWL3blIqXv9rofHzebMoQ+Pj34GJKC0BQ+uf19l+J7/uiN5oLPZTDDrPqfgfsQSNvgpPC/OVLHAj3z5y9u7p/aUsm1ZQNQ9cKXTt9rc0dlkRvhpPyDvvKciKlRdwZyVIWd9ZfvKfhJmtKOt+9ZJIAnoiwAhj5gRRUg1UhJZqq6N5XjYQmEJOL3BYdeKc4RDJnostx9oBIw6QPreVo8cnfEL9KyoYgkfW4AlYHBT7ZlnXoSIhKMovbox6GARIKSPLea58d0A4ER7rfJQIB4a0VAqjFRRhNQkEAPCdYDtht7NWmWU18LVMa1WcXNNPDii4REiGmkFz0RYZhpQsCRIVjVy51epjPQTuNLg/KhWF/uECWnLaYy2UanYWPnVTwEXkHXAp2f7hqfylbGpQhFdX4Oupxgc0fEJEzfaSSW7yBeLjH9Lp7Mvem8D84BbD1JmdGfZbMr0WGvf3GtoEB1RI8Yycx0aDfjSIDszzfjkRHrm9bGznpOcAQqAWw9SEOVIomUy1brt5oAey+9V4XKX7yucavKjM7fq2cyr3tuBeBrIA+JvgBbEOxn88zIgGpzbQdsFoLQQ5T9mIXBWBJeqQI7FeZGBcS5Lhuk3jPAwTgV/38sAAAAASUVORK5CYII=) no-repeat !important;
			}

		]]></>.toString());

	},

	// 这个尚未完成，就是个样子。
	install: function(){
		LongUrl.services(function(response){
			//response.jsonData
			location.reload(true);
		},'json');
	},
	
	process: function(elem){

		elem = elem || document;

		// 除 ElementNode 和 DocumentNode 外，其他 Node 都没有getElementsByTagName方法。
		// 2009.11.02
		if(!elem.getElementsByTagName)
			return;

		var a = elem.getElementsByTagName('a');
		var cache = TinyWall.tinyCache;
		
		for(var i = 0; i < a.length; i++){
		
			if(a[i].href.match(/^(http:\/\/|https:\/\/)(bit\.ly|j\.mp|ff\.im|htxt\.it)(\/)/i)){// 暂时这么着。

				a[i].className += (" " +TinyWall.tinyClass);

				a[i].addEventListener("click", function(e){

					var anchor = e.target;
					anchor.className 
						+= ((anchor.className.indexOf(TinyWall.tinyLoadingClass) != -1)?"":(" " +TinyWall.tinyLoadingClass));

					if(cache[anchor.href]){
						GM.openInTab(cache[anchor.href]);
						//GM.log('Tiny hit: ' + cache[anchor.href]);
						anchor.className 
								+= ((anchor.className.indexOf(TinyWall.tinyLoadedClass) != -1)?"":(" " +TinyWall.tinyLoadedClass));
					}else{
						LongUrl.expand(anchor.href, function(response){
							cache[anchor.href] = response.jsonData['long-url'];
							GM.openInTab(response.jsonData['long-url']);
							anchor.className 
								+= ((anchor.className.indexOf(TinyWall.tinyLoadedClass) != -1)?"":(" " +TinyWall.tinyLoadedClass));
						}, {format: 'json'});
					}

					e.preventDefault();

				}, true); //addEventListener

			}// if

		}// for

	},
	
	run: function(){
		var p = this.process;
		this.style();
		p();
		document.addEventListener('DOMNodeInserted', function(e){
			p(e.target);
		}, true);
	}
	
};

TinyWall.run();

