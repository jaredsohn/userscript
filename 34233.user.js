// ==UserScript==
// @name         Simple YourFileHost
// @namespace    Yamamaya
// @include      http://www.yourfilehost.com/media.php?cat=*
// @version      2.3.3
// ==/UserScript==

(function(){
	var IS_WEBKIT = (typeof window.webkitNotifications === 'object');
	var LOCATION = window.location.href;
	var HTML = document.documentElement;
	var PLAYER = document.querySelector('#mediadiv object');
	var CONFIG = PLAYER.querySelector('param[value^="config="]');	
		CONFIG = JSON.parse(CONFIG.value.replace(/^config=/i,'').replace(/'/g,'"'));
	var AUTO_PLAY = GM_getValue('auto_play',true);
	if(AUTO_PLAY === 'false' || AUTO_PLAY === false){
		AUTO_PLAY = false;
	}
	else{
		AUTO_PLAY = true;
	}
	var PLAYER_WIDTH  = GM_getValue('player_width', 640);
	var PLAYER_HEIGHT = GM_getValue('player_height',480);
		
	var YourFileHost = {
		init: function(){
			this.deleteCookie();
			this.setConfig();
			this.removeEle();
			this.addCSS();
			this.createNewBody();
			document.addEventListener('click',this,false);
		},
		setConfig: function(){
			CONFIG.plugins.openAdStreamer.ads.servers = [
                {
                    'type': 'OpenX',
                    'apiAddress': ''
                }
            ];
			CONFIG.plugins.openAdStreamer.playOnce = false;
			CONFIG.plugins.openAdStreamer.autoPlay = AUTO_PLAY;
		},
		removeEle: function(){
			[].forEach.call(document.querySelectorAll('script'),function(s){
				s.parentNode.removeChild(s);
			});
			HTML.removeChild(document.body);
		},
		createNewBody: function(){
			var body = document.createElement('body');
			body.innerHTML = ['<table align="center">',
									'<tbody>',
										'<tr>',
											'<td width="754" valign="middle">',
												'<div id="mediadiv"></div>',
											'</td>',
										'</tr>',
									'</tbody>',
								'</table>'].join('');
			HTML.appendChild(body);
			
			var videoDiv = document.getElementById('mediadiv');
			var player   = this.createPlayer();
			var buttons  = this.createButton();
			var links    = this.createRelatedLink();
			var dlLink   = this.createDownloadLink();
			[player,buttons,links,dlLink].forEach(function(ele){
				videoDiv.appendChild(ele);
			});
			
			player.width  = PLAYER_WIDTH;
			player.height = PLAYER_HEIGHT;
		},
		createPlayer: function(){
			var d = PLAYER.getAttribute('data');
			var p = document.createElement('object');
			p.id = PLAYER.id;
			p.setAttribute('type','application/x-shockwave-flash');
			p.setAttribute('data',d);
			
			var paramData = {
				'allowfullscreen': 'true',
				'allowscriptaccess': 'always',
				'quality': 'high',
				'cachebusting': 'true',
				'movie': d,
				'flashvars': ('config=' + JSON.stringify(CONFIG))
			}; 
			
			for(var i in paramData){
				var param = document.createElement('param');
				param.name  = i;
				param.value = paramData[i];
				p.appendChild(param);
			};
			
			PLAYER = p;
			return p;
		},
		createButton: function(){
			var div = document.createElement('div');
			var r = ['400x300','640x480','800x600','1024x768'];
			var b = '<input id="autoPlayButton" type="button" selected="'+AUTO_PLAY+'" value="Auto play">';
			r.forEach(function(e){
				var boxObj = e.match(/\d+/g);
				var w = boxObj[0];
				var h = boxObj[1];
				var isSame = (PLAYER_WIDTH == w && PLAYER_HEIGHT == h);
				b += '<input type="button" class="resizeButton" value="'+e+'" '+(isSame && 'selected="true"' || '')+'/>';
			});
			div.innerHTML = b;
			return div;
		},
		createRelatedLink: function(){
			var div = document.createElement('div');
			var reg = /.\.\w{1,3}$/;
			var b = LOCATION.match(reg);
			var r = [];
			if(b){
				b = b[0];
				var l = [].map.call(0+Array(10),function(_,i){return i;});
				if(/^[a-z]/.test(b)){
					l = [].map.call(0+Array(26),function(_,i){
							return String.fromCharCode(i+65).toLowerCase();
						});
				}
				else
				if(/^[A-Z]/.test(b)){
					l = [].map.call(0+Array(26),function(_,i){
							return String.fromCharCode(i+65);
						});
				}
				
				for(var i=0;i<l.length;++i){
					var o = l[i];
					var reqUrl = LOCATION.replace(reg,function(a,b){
						return a.replace(/^\w/,o);
					});
					if(reqUrl === LOCATION){
						r.push('<a href="'+reqUrl+'" class="current">'+o+'</a>');
						div.innerHTML = r.sort().join('');
						continue;
					}	
					(function(reqUrl,o){
						createRequest(reqUrl,function(xhr){
							var responseText = xhr.responseText;
							if(!responseText || /Error/.test(responseText))
								return;
							r.push('<a href="'+reqUrl+'">'+o+'</a>');
							div.innerHTML = r.sort().join('');
						});
					})(reqUrl,o);	
				};
			}
			return div;
		},
		createDownloadLink: function(){
			var url = 'http://yourfilehostwmv.com/video?url=' + encodeURIComponent(LOCATION);
			var div = document.createElement('div');
			div.innerHTML = '<a title="Get flv file" href="'+CONFIG.clip.url+'">DownLoad <b>FLV</b></a>';
			//div.innerHTML += '<a target="_blank" title="Get wmv file" href="'+url+'">DownLoad <b>WMV</b></a>';
			return div;
		},
		updateSizeButton: function(target){
			var self = this;
			[].forEach.call(document.querySelectorAll('input.resizeButton'),function(node){
				node.removeAttribute('selected');
				if(target == node){
					node.setAttribute('selected','true');
					var boxObj = target.value.match(/\d+/g);
					var width  = boxObj[0];
					var height = boxObj[1];
					var p = self.player;
					p.width  = width;
					p.height = height;
					self.saveSize(p);
				}
			});
		},
		buttonHandler: function(target){
			if(target.id === 'autoPlayButton'){
				var autoPlay = target.getAttribute('selected');
				if(autoPlay == 'true')
					autoPlay = false;
				else
					autoPlay = true;
				target.setAttribute('selected',autoPlay);
				this.saveAutoPlay(autoPlay);
			}
			else
			if(target.className === 'resizeButton'){
				this.updateSizeButton(target);
			}
		},
		handleEvent: function(evt){
			var target = evt.target;
			switch(evt.type){
				case 'click':
					if(!evt.button){
						this.buttonHandler(target);
					}
				break;
			}
		},
		deleteCookie: function(){
			var domain = 'domain=.yourfilehost.com';
			var expire = 'max-age=0';
			document.cookie.split(';').filter(function(c){
				return !/session/ig.test(c);
			}).forEach(function(c){
				document.cookie = [c,domain,expire].join(';');
			});
		},
		addCSS: function(){
			var css = 'a {color: #3472D0;font-size: 17px;text-decoration: none;padding: 2px;background: #D5EAFF;}a.current {color: #FFFFFF;background: #595959;}a:visited {color: #CCCCCC;}a:hover {color: #FFFFFF;background: #3472D0;}table {background-color: #FFFFFF;margin-top: 30px;}td {border: 1px solid #CCCCCC;}input {margin: 0px 5px;}#mediadiv {text-align: center;margin: 40px 30px;}#mediadiv >  div {margin-top: 20px;}#mediadiv a {margin-right: 5px;padding: 5px;}[selected="true"] {background-color:#595959; color:#FFFFFF;}';
			addStyle(css);
		},
		saveAutoPlay: function(flag){
			GM_setValue('auto_play', flag);
		},
		saveSize: function(video){
			GM_setValue('player_width', video.width);
			GM_setValue('player_height',video.height);
		},
		get player(){
			return document.querySelector('#mediadiv object');
		}
	};
	
	if(IS_WEBKIT)
		window.addEventListener('load',function(){
			YourFileHost.init();
		},false);
	else	
		YourFileHost.init();
 
 
	function getCookie(name){
		var reg = new RegExp('^(\\s+)?'+ name + '=');
		var value = null;
		document.cookie.split(';').filter(function(c){
			return reg.test(c);
		}).forEach(function(n){
			value = n.replace(reg,'');
		});
		return value;
	};
  
	function createRequest(url,callBack){
		try{
			GM_xmlhttpRequest({
				method: 'GET',
				url: url,
				onload: function(req){
					callBack(req);
				}
			});	
		}
		catch(ex){
			var xhr = new XMLHttpRequest();
			xhr.open('GET',url,true);
			xhr.onload = function(){
				callBack(xhr);
			};
			xhr.send(null);
		}
	};
 
	function addStyle(css){
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = 'data:text/css,' + encodeURIComponent(css);
		HTML.childNodes[0].appendChild(link);
	};		
	
	// @copyright 2009, James Campos
	// @license   cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
	if((typeof GM_getValue == 'undefined') || (GM_getValue('a','b') == undefined)){
		function GM_getValue(name,def){
			return (localStorage.hasOwnProperty(name)) && localStorage.getItem(name) || def;
		};
		function GM_setValue(name,value){
			localStorage.setItem(name,value);
		};
	} 
	
})();