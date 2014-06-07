// ==UserScript==
// @name xl
// @author Outku
// @description
// @create
// @lastmodified
// @namespace http://userscripts.org/users/Rabbit
// @updateURL
// @version
// @include
// ==/UserScript==
(function(){
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