// ==UserScript==
// @name           Google Reader Auto Scroll
// @namespace      Yamamaya
// @include        http://*google.tld/reader/view*
// @include        https://*google.tld/reader/view*
// @version        0.0.1
// ==/UserScript==

/***********************************************************
 Reference
	http://d.hatena.ne.jp/javascripter/20080503/1209800667
************************************************************/
(function(){
	var DOWN_TID   = null;
	var UP_TID     = null;
	var EFFECT_TID = null;
	
	var CONFIG = {
		SCROLL: Number(GM_getValue('GoogleReaderScroll') || 2),
		SCROLL_INTERVAL: 30
	};
	
	var GoogleReader = {
		init: function(){
			this.autoScrollSpeedEle();
		
			document.addEventListener('click',function(e){
				if(e.target.id === 'viewer-footer'){
					GoogleReader.autoScrollDown(); 
				}
			},false);
			
			document.addEventListener('contextmenu',function(e){
				if(e.target.id === 'viewer-footer'){
					GoogleReader.autoScrollUp();
					e.preventDefault();
				}
			},false);
		
			var notScroll=['TEXTAREA','INPUT'];
			document.addEventListener('keydown',function(e){
				if(notScroll.indexOf(e.target.tagName) === -1){
					e.keyCode === 68 && GoogleReader.autoScrollDown();  //d
					e.keyCode === 70 && GoogleReader.autoScrollUp();    //f
				}
			},true);
			
			var mouseScroll = (navigator.userAgent.toLowerCase().indexOf('firefox') !== -1) && 'DOMMouseScroll' || 
																							   'mousewheel';
			document.addEventListener(mouseScroll,function(e){
				if(e.target.id === 'viewer-footer'){
					GoogleReader.autoScrollSpeedControl(e);
				}
			},true);
		},
		autoScrollDown: function(){
			if(DOWN_TID === null){
				if(UP_TID !== null){
					clearInterval(UP_TID);
					UP_TID = null;
				}				
				DOWN_TID = setInterval((function(){
					return function(){
							GoogleReader.entries().scrollTop += CONFIG.SCROLL;
							if(document.getElementsByTagName('body')[0].className.match(/loading$/)){
								clearInterval(DOWN_TID);
								DOWN_TID = null;
							}
					}
				})(),CONFIG.SCROLL_INTERVAL);
			}
			else{
				clearInterval(DOWN_TID);
				DOWN_TID = null;
			}
		},
		autoScrollUp: function(){
			if(UP_TID === null){
				if(DOWN_TID !== null){
					clearInterval(DOWN_TID);
					DOWN_TID = null;
				}			
				UP_TID = setInterval((function(){
					return function(){
							GoogleReader.entries().scrollTop -= CONFIG.SCROLL;
							if(document.getElementsByTagName('body')[0].className.match(/loading$/)){
								clearInterval(UP_TID);
								UP_TID = null;
							}							
					}
				})(),CONFIG.SCROLL_INTERVAL);
			}
			else{
				clearInterval(UP_TID);
				UP_TID = null;
			}		
		},
		autoScrollSpeedControl: function(e){
			(e.detail > 0) ? CONFIG.SCROLL++:
							(CONFIG.SCROLL > 1) ? CONFIG.SCROLL--: CONFIG.SCROLL;	
			GoogleReader.setScroll();
			GoogleReader.updateAutoScrollSpeedEle();
		},
		autoScrollSpeedEle: function(){
			var div = document.createElement('div');
			div.id = 'auto-scroll-speed-container';
			div.innerHTML = '<span>Scroll Speed</span>'
						  + '<br/>'
						  + '<strong style="font-size:50px;">'+CONFIG.SCROLL+'</strong>';
			var dStyle = div.style;
			dStyle.color = '#FFFFFF';
			dStyle.fontSize = '15px';
			dStyle.textAlign = 'center';
			dStyle.position = 'absolute';
			dStyle.left = (window.innerWidth/2) + 'px';
			dStyle.bottom = (window.innerHeight/2) + 'px';
			dStyle.padding = '20px 50px';
			dStyle.backgroundColor = '#C2CFF1';
			dStyle.zIndex = '99999';
			dStyle.opacity = '0.9';
			dStyle.display = 'none';
			document.body.appendChild(div);
		},
		updateAutoScrollSpeedEle: function(){
			var node = document.getElementById('auto-scroll-speed-container');
			var nodeStyle = node.style;
			if(nodeStyle.display === 'none'){ 
				nodeStyle.display = 'block';
			}			
			if(EFFECT_TID !== null){
				clearInterval(EFFECT_TID);
				EFFECT_TID = null;
			}
			EFFECT_TID = effect();
			node.innerHTML = '<span>Scroll Speed</span>'
						   + '<br/>'
						   + '<strong style="font-size:50px;">'+CONFIG.SCROLL+'</strong>';
			
			function effect(){
				if(EFFECT_TID === null){
					nodeStyle.opacity = '0.9';
					EFFECT_TID = setTimeout(function(){
						EFFECT_TID = setInterval((function(){
							return function(){
								nodeStyle.opacity = (nodeStyle.opacity - 0.1);
								if(nodeStyle.opacity < 0.1){
									nodeStyle.display = 'none';
									clearInterval(EFFECT_TID);
									EFFECT_TID = null;
								}
							};
						})(),100);
					},1000);
				}
				return EFFECT_TID;
			};
		},
		entries: function(){
			var googleReaderEntries = document.getElementById('entries');
			return googleReaderEntries;
		},
		setScroll: function(){
			GM_setValue('GoogleReaderScroll',CONFIG.SCROLL);
		}
	};
	
	GoogleReader.init();
	
	
	if(typeof GM_setValue === undefined){
		function GM_setValue(name,value){
			var date = new Date();
			date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
			var domain = ';domain= ' + location.hostname.replace('www.','.');
			var expire = ';expires= ' + date.toGMTString() + ';';
			document.cookie = name + '=' + escape(value) + domain + expire;	
		};
	}
	
	if(typeof GM_getValue === undefined){
		function GM_getValue(name){
			var regexp = new RegExp('; ' + name + '=(.*?);');
			var match  = ('; ' + document.cookie + ';').match(regexp);
			return match ? decodeURIComponent(match[1]) : null;
		}; 
	}	
})();