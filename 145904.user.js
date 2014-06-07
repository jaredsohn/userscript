// ==UserScript==
// @name           Xunlei.Any.Player
// @namespace      Xunlei.Any.Player
// @description    Xunlei.Any.Player, should be working on xlpan.com and can play any url as you wish.
// @match          http://vod.xunlei.com/*
// @match          http://vod.lixian.xunlei.com/*
// @match          http://61.147.76.6/*
// @match          http://222.141.53.5/*
// @version        1.0
// ==/UserScript==

(function(){
	'use strict';
	var CONSTANTS = {
		tips: '<div class="tips_container"><div class="tips_close">X</div>Xunlei.Any.Player \u5DF2\u542F\u7528&emsp;<a href="http://opengg.me/821/xunlei-any-player/" style="color:blue" target="_blank">\u53CD\u9988</a><div class="tips_browser">\u68c0\u6d4b\u5230\u60a8\u6b63\u5728\u4f7f\u7528<span style="color:red" class="tips_browserType">Chrome</span>\u6d4f\u89c8\u5668, \u5982\u679c\u9047\u5230\u95ee\u9898, \u8bf7\u67e5\u770b<a class="tips_usage" href="#" style="color:blue" target="_blank">\u4f7f\u7528\u8bf4\u660e</a></div></div>',
		css: '.tips_container{padding:7px 15px;color:green;opacity:0.4;background:#ccc;z-index:99999}.tips_container .tips_close{position:absolute;right:5px;top:0;color:red;cursor:pointer}.tips_index{height:100%;position:absolute;left:20em;}.tips_inner{position:fixed;right:0;bottom:0}.tips_container:hover{opacity:0.9}.tips_browser{display:none}',
		usage:'http://code.google.com/p/opengg-clean-player/wiki/Usage#',
		browsers:[{
			name:'Chrome',
			match:/Chrome/,
			usage:'Chrome_20-'
		},{
			name:'\u591a\u6838\u6d4f\u89c8\u5668',
			match:/Maxthon|360EE|MetaSr|QQBrowser/ig,
			usage:'\u5176\u4ed6\u57fa\u4e8eChrome_\u6216Chromium_\u7684\u6d4f\u89c8\u5668(\u730e\u8c79,_360\u6781\u901f\u6d4f'
		}]
	};
	var UTILS = {
		addCss: function(str){
			var style = document.createElement('style');
			style.textContent = str;
			document.head.appendChild(style);
		},
		addDom: function(html, parentSelector, callback){
			var div = document.createElement('div');
			div.innerHTML = html;
			var childNodes = div.childNodes;
			var parent = (parentSelector&&document.querySelector(parentSelector))||document.body;
			for(var i = 0; i<childNodes.length;++i){
				if((typeof callback === 'function')&&(childNodes[i].nodeType === 1)){
					callback.call(childNodes[i],childNodes[i]);	
				}
				parent.appendChild(childNodes[i]);
			}
		},
		proxy: function(fn){
			var script = document.createElement('script');
			script.textContent = '(' + fn.toString() + ')();';
			document.body.appendChild(script);
		}
	};
	function tips(fn){
		UTILS.addCss(CONSTANTS.css);
		UTILS.addDom(CONSTANTS.tips, '.top_bar,.pla_bg', function(parent){
			var close = parent.querySelector('.tips_close');
			if(close){
				close.addEventListener('click', function(){
					parent.parentNode.removeChild(parent);
				});
			}
			fn(parent);
		});
	}
	var ROUTER = [{
			pathnames: ['/iplay.html','/player.html'],
			fn: function(){
				UTILS.proxy(function(){
					function hack(){
						var XL_CLOUD_FX_INSTANCE = window.XL_CLOUD_FX_INSTANCE;
						if(XL_CLOUD_FX_INSTANCE){
							var setFeeParam = XL_CLOUD_FX_INSTANCE.setFeeParam;
							if(setFeeParam&&(setFeeParam.toString().indexOf('arguments')===-1)){
								XL_CLOUD_FX_INSTANCE.setFeeParam=function(){
									//console.log(arguments);
									XL_CLOUD_FX_INSTANCE.userType=1;
									setFeeParam.apply(XL_CLOUD_FX_INSTANCE,arguments);
								};
								clearInterval(inter);
							}
						}
					}
					var inter = setInterval(hack,100);
				});
				tips(function(node){
					if(!node){
						return;
					}
					node.className += ' tips_inner';
				});
			}
		},{
			pathnames: ['/mini.html'],
			fn: function(){
				UTILS.proxy(function(){
					function hack(){
						var XL_CLOUD_FX_INSTANCE = window.XL_CLOUD_FX_INSTANCE;
						if(XL_CLOUD_FX_INSTANCE){
							var setFeeParam = XL_CLOUD_FX_INSTANCE.setFeeParam;
							if(setFeeParam&&(setFeeParam.toString().indexOf('arguments')===-1)){
								XL_CLOUD_FX_INSTANCE.setFeeParam=function(){
									//console.log(arguments);
									XL_CLOUD_FX_INSTANCE.userType=1;
									setFeeParam.apply(XL_CLOUD_FX_INSTANCE,arguments);
								};
								clearInterval(inter);
							}
						}
					}
					var inter = setInterval(hack,100);
				});
			}
		},{
			pathnames: ['/list.html'],
			fn: function(){
				UTILS.proxy(function(){
					function hack(){
						var Login = window.Login;
						if(Login){
							var getuserinfo = Login.getuserinfo;
							if(getuserinfo&&(getuserinfo.toString().indexOf('arguments')===-1)){
								Login.getuserinfo=function(){
									var opts = getuserinfo.apply(Login,arguments);
									opts.type = 'vodVipUser';
									return opts;
								};
								clearInterval(inter);
							}
						}
					}
					var inter = setInterval(hack,100);
				});
				tips(function(node){
					if(!node){
						return;
					}
					node.className += ' tips_index';
					for(var i=0;i<CONSTANTS.browsers.length;++i){
						var browser=CONSTANTS.browsers[i];
						if(browser.match.test(navigator.userAgent)){
							if(node.querySelector('.tips_browser')){
								node.querySelector('.tips_browser').className='';
							}
							if(node.querySelector('.tips_browserType')){
								node.querySelector('.tips_browserType').textContent=browser.name;
							}
							if(node.querySelector('.tips_usage')){
								node.querySelector('.tips_usage').href=CONSTANTS.usage+browser.usage;
							}
						}
					}
				});
			}
		}
	];
	var pathname = location.pathname;
	for(var i=0;i<ROUTER.length;++i){
		var item=ROUTER[i];
		if(item.pathnames.indexOf(pathname)!==-1){
			item.fn();
		}
	}
})();