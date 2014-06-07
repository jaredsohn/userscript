// ==UserScript==
// @name              JustinTV live check 
// @namespace         Yamamaya
// @include           *
// @version           0.0.2
// ==/UserScript==
 
(function(){
	var LIVE_CHECK = 10;
	var DEFAULT_EXPIRE_HOUR = 12;
	var INFO = eval(GM_getValue('justinTV')) || {};
	var CHANNEL = INFO.CHANNEL = INFO.CHANNEL || {};
	var JUSTIN_TV_REG_EXP = /^http:\/\/(?:www|[a-z]{2}).justin.tv\/[^\/]*/;	
	var LOADING_IMG = 'data:image/gif;base64,R0lGODlhEAAQAKIHADZmvyRl1FZ5upOjxHWOv7G5yb2/w////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQFAAAHACwAAAAAEAAQAAADQ3i6B8CQORdXCG0eIeC92cZ11seMZBlxjGFUC0EcrgvLcv1W+GzDB1lrxxgMILqi8bhIFgqHJbP5ej6j04gVClxcIwkAIfkEBQAABwAsAAAAABAAEAAAAz94uifCkDkXFwBtHkLgvdnGddbHjGQZcUwQVMswHK4Ly3L9VvhswwcZcFEoDIlFI8xgOCSVESbTCY1Kj4ppJAEAIfkEBQAABwAsAAAAABAADgAAAzt4ukfEkDkXlxBtnjHgvdnGddbHjGQZcQwAVEtRHK4Ly3L9VvhswwcZIxCIGAwQIpFxPA6VzGayCHEqEgAh+QQFAAAHACwAAAAAEAAQAAADPni6N8OQORcXIW2eUuC92cZ11seMZBlxjCBUi2EcrgvLcv1W+GzDBxkDAAAOiUXjAVkMBIzEg9OplE6r1koCACH5BAUAAAcALAAAAAAOABAAAAM8eLpXxVA5F88YbR5j1r3ZxnXWx4xkGXEKQVSM68KtTNc3IwhRECy7HcPnUwR5AMCB+DMik8piBKq8JSEJACH5BAUAAAcALAAAAAAQABAAAAM+eLpnxpA5F1cpbdZzb95cBzLeeAzDGAQnmlbr6r5RzKIquxBEBAAQHo/x+zGEPYHgUAQek8qlcRNdmg7KSgIAIfkEBQAABwAsAAACABAADgAAAz54aqZ+IbzD2Ivx1eaw1Nz1KUUxTQBwlOWppClrurDauq/qDMMpCBMe7/H7PYQ9AuFQBB6TyqURF13iHkpXAgAh+QQFAAAHACwAAAAAEAAQAAADPni6F8GQORfjfADURXPejKeBy7cYBikIB4pu6+qmVcy+4MoURUQQEB6P8fvthIfB4FAEHpPKpXETXZIUykoCADs=';	
	var DELETE_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABGdBTUEAAK/INwWK6QAAAAZiS0dEAP8A/wD/oL2nkwAABDdJREFUeNqt1XtMU1ccB/DLo0ABASsF6gpCNxXcMjNWXuIoypDyqk5eAmVgxsMNxnhPNHtIHJBtSFjcEBjIQx1jKK4rKcUpJSgbFBAFZIsCIVCoG5gIDgZ037tbWBYMg6HxJN/7x8nJ5+b8Ts7vECRJEkqlkqirq1uZyz8QdU1DTCrb/8mWuvpm2n+upSIWiwm1p87iRyKREP8OTT0twtzTS2tH5jkbQeWoa5xojp/WOO/9/pV55zjR/PMB56f0XM40EZahiYSOKYNYNoyNjVeBDWwsDZzzG0OyWhbypEpkiiYRUTYO//xB8HP74ZPTg7AvepBQ1oOAk80w8yobISz4gYSm7hqwLtOIuaewI1ukwFvfTmPnSQVs0u+CnXAbFtHtMA1vhkmAFAY+l2G4rwa2b4oQdbodOyJqZ6gd+q4OswOjjpzuQVDFNLZ9RKEZ92CZ2AtWjBzMiBaYBF2BoZ8Ieq/XQNu1AgS3GMZ7yyEsaAXd8dPrq8NWYSfSzg3DNe8+OEcHYZV0B5vjOsGMvIGNwT9ig0AMuud3oL1WBQ2HEhCvFi3mYHYTGLxTQ2vCOZeGcVz8AHZHf8Xmt2/CLKoVjEPXYLS/HvpeF0HjnYeG49eLoAa3SF0GBBS0Q8shb224SDKC2p455Eh/x4G8frwQdwPMYCkMfeqg434BOq5nQd9dCk5gNfZnXUNQYTc2JXdTP1obTiluGIFcQaJToULLwCNUtv2GDy4O4EhpLyK/7EJ0URfiKu8gtHwIjqdGwDw2BN34W/8Lx6vhtlESymkS1DwAEu2jQOQlFd74RgXPChWcSoAXC2ZhnT2BTZlPAP88QmJyZgl+NEciXUoirJaE4AIJjwry6eEOqhQP/1yCZUMkYkXPCO4aW4LVZSiUPxs4bjk8u0AiS0Yi5nsguHoBvlUL2HP2r6eCg5bDE9Pz2JvbCduM67BJ+wmW6R1gZdwG6/gAnjsxRmV8/XCpdATi7kmMPZjB6MQf2Joogc17V2GZ1AJWchuYKV3YmNoHo9RfoE/dTIPk/vXBJZJhfFXfh8Hxh+uCdagGRXuHuiAOi1daYwXc0NBA0Cz9IjPO3HpymGpSmjs/7qXT6W4MBkPvMVgmkxlaceyiLNzz735Y1Yd+xRQUVDlskxpWhdVl0H+3B9qe1bPm2/m51tbW4XZ2dg6PwU1NTTpcLtf/Fed9CWa7s+Wx2S0q2U0l9nwiXzw869RWsFPli4dncewezKnuZ0w1KDqv5P425/DPnJycwqmE2dvbb11RY2obdDc3Nyc/f0HILu/YLCte1lUzfvm4VYh4fktEo4oVKlWZh0gXTHxqpphun3e97JlS7O0fFC0QCML4fL43h8OxMjU1Xf3Now5Am1rE4vF4L3l4eOwSHo73PShMPnwgPDUmJDLxUExMDF8oFLpTg+vi4sJhs9kbaDTaiqfpb/HsHe1l2lsyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAABJRU5ErkJggg==';
	
	var JustinTV = {
		init: function(){
			this.addStyle();
			this.setting();
			this.liveCheck();
			GM_registerMenuCommand('JustinTV live check - show setting',JustinTV.addKeyEventAddSettingBox);
		},
		liveCheck: function(){
			if(CHANNEL.toSource().length > 4){
				for(var i in CHANNEL){
					var channel = CHANNEL[i];
					JustinTV.request(channel);
				};
			}
			else{
				setTimeout(function(){
					CHANNEL.firstSetting = true;
					setValue();
					JustinTV.addKeyEventAddSettingBox();
				},500);
				/*
				alert(CHANNEL.toSource());
				*/
			}
		},
		request: function(channel){
			var url = channel.url;
			var liveEvent = channel.liveEventType || 0;
			if(!url) return;
			if(!channel.expire || channel.hasOwnProperty('expire') && (channel.expire < new Date()))
				channel.visited = undefined;
			channel.visited = channel.visited || false;
			if(channel.visited === true || location.href === url || !JUSTIN_TV_REG_EXP.test(url)) return;		

			GM_xmlhttpRequest({
				method: 'GET',
				url: url,
				headers: {'User-Agent': 'Mozilla/5.0 Greasemonkey',
						  'Accept': 'application/atom+xml,application/xml,text/xml'},
				onload: function(req){
					if(req.status === 200){
						var responseText = req.responseText;
						var live = responseText.match(/PP\[(?:'|")channel_live(?:'|")\][^;]*/).toString();
						live = live.replace('PP[\'channel_live\'] = ','');
						if(live.match(/true/i)){
							JustinTV.setInfo(channel);
							switch(liveEvent){
								case 0:
									GM_openInTab(url);
									break;
								case 1:
									JustinTV.addKeyEventAddSettingBox();
									break;
								case 2:
									break;
							}
						}
						if(/Content from this channel removed/.test(responseText)){
							/*
							if(document.getElementById('justinTV-live-check-setting-container') === null)
								JustinTV.deleteUrlEvent();
							*/	
						}
					}
					else{
						/*
						alert(req.status);
						*/
					}
				},
				onerror: function(req){
			
				}
			});			
		},
		setInfo: function(channel){
			channel.timer = channel.timer || DEFAULT_EXPIRE_HOUR;
			var expire = Number(channel.timer) * 60 * 60 * 1000;
			channel.visited = true;
			channel.expire = new Date(new Date().getTime() + expire);
			setValue();				
		},
		deleteUrlEvent: function(){
			var div = document.createElement('div');
			var style = div.style;
			div.innerHTML = '削除されているチャンネルがあります。';
			document.body.appendChild(div);
			div.setAttribute('style','-moz-border-radius: 10px !important;');
			style.fontSize = '40px';
			style.color = '#FFFFFF';
			style.backgroundColor = '#4682D6';
			style.padding = '20px 30px';
			style.opacity = '0.7';
			style.zIndex = '999999';
			style.position = 'fixed';
			style.left = (window.innerWidth/2) - (div.offsetWidth/2) + 'px';
			style.top = (window.innerHeight/2) - (div.offsetHeight) + 'px';
			setTimeout(function(){
				var tid = setInterval((function(){
					return function(){
						style.opacity = style.opacity - 0.1;
						if(style.opacity < 0.1){
							clearInterval(tid);
							div.parentNode.removeChild(div);
							JustinTV.addKeyEventAddSettingBox();
						}
					};
				})(),50);
			},1500);	
		},
		setting: function(){
			var div = document.createElement('div');
			div.id = 'justinTV-live-check-setting-container';
			var ele = '<div style="margin:0px 0px 10px 60px !important; font-size:19px !important; font-weight:bold !important; color:#FFFFFF !important;">JustinTV Live Check</div>';
			ele += '<div id="justinTV-live-check-setting-container-button-container">'
				+  '<span id="justinTV-live-check-setting-container-clear-timer-button">Clear Timer Cache</span>'
				+  '<span id="justinTV-live-check-setting-container-close-button">Close</span>'
				+  '</div>';
			ele += '<div>'
				+  '<table>'
				+  '<tbody>'
				+  '<tr>'
					+  '<th style="background-color:inherit !important;"> </th>'
					+  '<th>Enter Live Url</th>'
					+  '<th>Name</th>'
					+  '<th>Title</th>'
					+  '<th>Live</th>'
					+  '<th title="Hour">Timer (h)</th>'
					+  '<th>Event</th>'
					+  '<th>Del</th>'
				+  '</tr>'
			for(var i=0;i<LIVE_CHECK;i++){
				var id = 'channel-' + (i + 1);
				var value = (CHANNEL.hasOwnProperty(id)) && CHANNEL[id] && CHANNEL[id].url || '';
				var url = (CHANNEL.hasOwnProperty(id)) && CHANNEL[id] && CHANNEL[id].url || 'http://www.justin.tv/';
				var channelName = (CHANNEL.hasOwnProperty(id)) && CHANNEL[id] && CHANNEL[id].url;
				channelName = (channelName) && CHANNEL[id].url.split('/')[3] || 'JustinTV';
				var titleAndLive = (CHANNEL.hasOwnProperty(id)) && CHANNEL[id] && CHANNEL[id].url && '<img src="'+LOADING_IMG+'" alt=" " />' || '';
				var timerValue = (CHANNEL.hasOwnProperty(id)) && CHANNEL[id] && CHANNEL[id].timer || DEFAULT_EXPIRE_HOUR;
				var eventType = (CHANNEL.hasOwnProperty(id)) && CHANNEL[id] && CHANNEL[id].liveEventType || 0;
				ele += '<tr>'
						+ '<td style="text-align:right !important;">'
							+ '<span style="text-align:right !important;">' + (i + 1)+ '</span>'
						+ '</td>'
						+ '<td>'
							+ '<input type="text" value="'+value+'" />'
						+ '</td>'
						+ '<td style="text-align:center !important;">'
							+ '<a href="'+url+'" target="_blank">' + channelName + '</a>'
						+ '</td>'
						+ '<td style="min-width:150px !important; max-width:450px !important;">'
							+ '<span style="font-weight:bold !important; margin:0px 5px ! important; display:block !important;">'
								+ titleAndLive
							+ '</span>'
						+ '</td>'
						+ '<td style="min-width:130px !important;">'
							+ '<span>'
								+ titleAndLive
							+ '</span>'
						+ '</td>'
						+ '<td style="text-align: center !important;">'
							+ '<input type="text" value="'+timerValue+'" name="JustinTV-save-expire" style="width:50px !important;"/>'
						+ '</td>'
						+ '<td>'					
							+ '<select>'
								+ '<option '+(eventType === 0 && 'selected=""' || '')+'>Open in tab</option>'
								+ '<option '+(eventType === 1 && 'selected=""' || '')+'>Open setting box</opation>'
								+ '<option '+(eventType === 2 && 'selected=""' || '')+'>Do nothing</option>'
							+ '</select>'
						+ '</td>'
						+ '<td>'
							+ '<span>'
								+ '<img id="justinTV-live-check-setting-container-delete-url-button" src="'+DELETE_IMG+'" alt=" " title="Clear Channel"/>'
							+ '</span>'
						+ '</td>'
 					 + '</tr>';
			};						
			ele += '</tbody>'
				 + '</table>'
				 + '</div>';
			div.innerHTML = ele;
			this.toggleSetting(div);
			this.settingEvent();
		},
		toggleSetting: function(div){
			document.addEventListener('keydown',function(e){
				if(e.altKey && e.keyCode === 74){
					var ele = document.getElementById('justinTV-live-check-setting-container');
					if(ele === null){
						JustinTV.settingInsert(div);
						document.body.appendChild(div);
					}
					else{
						ele.parentNode.removeChild(ele);
					}
				}
			},true);
		},
		settingInsert: function(div){
			var inputs = div.getElementsByTagName('input');
			for(var i=0,l=inputs.length;i<l;i++){
				var input = inputs[i];
				if(input.type === 'text' && input.value && JUSTIN_TV_REG_EXP.test(input.value)){
					var channelTitleNode = input.parentNode.nextSibling.nextSibling.firstChild;
					var liveNode = input.parentNode.nextSibling.nextSibling.nextSibling.firstChild;
					JustinTV.liveCheckRequest(input.value,liveNode,channelTitleNode);
				}
			}		
		},
		settingEvent: function(){
			var tid = null;
			var notUrlTid = null;
			document.addEventListener('keyup',function(e){
				var target = e.target;
				if(target.tagName === 'INPUT' && target.type === 'text' && target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id === 'justinTV-live-check-setting-container'){
					if(target.name === 'JustinTV-save-expire'){ // enter hour
						if(!/^[\d]/.test(target.value)){
							target.value = '';
						}
						if(target.value.length > 1 && /[^\d\.]/.test(target.value)){	
							target.value = '';
						}						
						if(e.keyCode === 13 && target.value.length > 0){	
							var number = target.parentNode.parentNode.getElementsByTagName('span')[0].textContent;
							JustinTV.saveExpire(target.value,number);
							if(tid !== null){
								clearTimeout(tid);
								tid = null;
							}
							tid = effect(target);
						}
					}
					else{
						if(e.keyCode === 13){
							var value = target.value;
							var number = target.parentNode.parentNode.getElementsByTagName('span')[0].textContent;
							var url = value.replace(/\/$/,'');
							if(JUSTIN_TV_REG_EXP.test(url)){
								var liveTitleEle = target.parentNode.nextSibling.nextSibling.firstChild;
								var liveCheckEle = target.parentNode.nextSibling.nextSibling.nextSibling.firstChild;
								var liveUrlEle = target.parentNode.nextSibling;
								if(url.split('/').length > 4){
									liveCheckEle.innerHTML = 'This is not channel url.';
								}
								else{
									liveCheckEle.innerHTML = '<img src="'+LOADING_IMG+'" alt=" " />';
									liveTitleEle.innerHTML = '<img src="'+LOADING_IMG+'" alt=" " />';
									if(tid !== null){
										clearTimeout(tid);
										tid = null;
									}
									tid = effect(target);
									JustinTV.liveCheckRequest(url,liveCheckEle,liveTitleEle,liveUrlEle);
								}
								JustinTV.saveUrl(url,number);
							}
							else{	
								if(notUrlTid === null){
									var saveValue = target.value;
									target.value = 'This is not JustinTV channel url.';
									target.style.backgroundColor = 'red';
									notUrlTid = setTimeout(function(){
										target.value = saveValue;
										target.style.backgroundColor = '';
										notUrlTid = null;
									},1500);
								}	
							}						
						}
					}
				}
			},false);
			
			document.addEventListener('change',function(e){
				var target = e.target;
				if(target.tagName === 'SELECT' && target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.id === 'justinTV-live-check-setting-container'){
					JustinTV.saveEventType(target);
				}
			},false);			
			
			document.addEventListener('click',function(e){
				var target =e.target;
				if(!e.button){
					if(target.id === 'justinTV-live-check-setting-container-clear-timer-button'){
						clearTimer();
					}
					if(target.id === 'justinTV-live-check-setting-container-close-button'){
						var node = document.getElementById('justinTV-live-check-setting-container');
						node.parentNode.removeChild(node);
					}
					if(target.id === 'justinTV-live-check-setting-container-delete-url-button' && target.tagName === 'IMG'){
						deleteChannel(target);
					}
				}
			},false);
			
			function deleteChannel(target){
				var node = target.parentNode.parentNode.parentNode;
				var number = node.getElementsByTagName('span')[0];
				var input = node.getElementsByTagName('input')[0];
				var url = node.getElementsByTagName('a')[0];
				var title = target.parentNode.parentNode.previousSibling.previousSibling.previousSibling.previousSibling.firstChild;
				var live = target.parentNode.parentNode.previousSibling.previousSibling.previousSibling.firstChild;
				var timer = node.getElementsByTagName('input')[1];
				var eventType = node.getElementsByTagName('select')[0];
				var id = 'channel-' + number.textContent;
				if(input.value.length > 0){
					input.value = '';
					[live,title].forEach(function(ele){
						ele.innerHTML = '';
					});
					url.href = 'http://www.justin.tv/';
					url.textContent = 'JustinTV';
				}
				timer.value = DEFAULT_EXPIRE_HOUR;
				eventType.selectedIndex = 0;
				CHANNEL[id] = undefined;
				setValue();
			};
			
			function effect(target){
				var n = 0;
 				var style = target.style;
				style.backgroundColor = 'rgb(0,255,255)';
				if(tid === null){
					tid = setTimeout(function(){
						tid = (function(){
							n = n + 10;
							style.backgroundColor = 'rgb('+n+',255,255)';
							if(n > 0 && n < 255){
								return  tid = setTimeout(arguments.callee,50);
							}
							else{
								style.backgroundColor = '';							
								tid = null;
							}
						})();						
					},1000);	
				}
				setTimeout(function(){
					if(style.backgroundColor !== ''){
						var s =style.backgroundColor.split(',')[0].replace(/rgb\(/i,'');
						s = Number(s);
						var t = setInterval((function(){
							return function(){
								s = s + 15;
								style.backgroundColor = 'rgb('+s+',255,255)';
								if(s > 255){
									style.backgroundColor = '';
									clearInterval(t);
								}
							};
						})(),50);
					}
				},3800);
				return tid;
			};						
		},
		saveUrl: function(url,number){
			var id = 'channel-' + number;
			CHANNEL[id] = CHANNEL[id] || (CHANNEL[id] = {});
			CHANNEL[id].url = url;
			setValue();
		},
		saveExpire: function(value,number){
			var id = 'channel-' + number;
			CHANNEL[id] = CHANNEL[id] || (CHANNEL[id] = {});
			CHANNEL[id].timer = Number(value);
			if(CHANNEL[id].expire)
				this.setInfo(CHANNEL[id]);
			else
				setValue();
		},
		saveEventType: function(target,number){
			number = number || target.parentNode.parentNode.getElementsByTagName('span')[0].textContent;
			var id = 'channel-' + number;		
			CHANNEL[id] = CHANNEL[id] || (CHANNEL[id] = {});
			CHANNEL[id].liveEventType = target.selectedIndex; 
			setValue();
		},
		liveCheckRequest: function(url,node,channelStatus,channelName){
			GM_xmlhttpRequest({
				method: 'GET',
				url: url,
				headers: {'User-Agent': 'Mozilla/5.0 Greasemonkey',
						  'Accept': 'application/atom+xml,application/xml,text/xml'},
				onload: function(req){
					if(req.status === 200){
						var responseText = req.responseText;
						if(/Content from this channel removed/.test(responseText)){
							node.setAttribute('style','color: red !important; font-weight: bold !important;  font-size:18px !important;');
							node.innerHTML = 'Channel Removed';
						}
						else{
							if(/PP\[(?:'|")channel_live(?:'|")\][^;]*/.test(responseText)){
								var live = responseText.match(/PP\[(?:'|")channel_live(?:'|")\][^;]*/).toString();
								live = live.replace('PP[\'channel_live\'] = ','');
								if(live.match(/true/i)){
									node.setAttribute('style','font-weight: bold !important;  font-size:18px !important;');
									node.innerHTML = 'Live';
								}
								else{
									node.setAttribute('style','font-weight: normal !important;');
									node.innerHTML = 'Not broadcasting';
								}
								var channelTitle;
								if(/id\=\"status_message\"[^<]*/gm.test(responseText)){
									channelTitle = responseText.match(/id\=\"status_message\"[^<]*/gm).toString();
									channelTitle = channelTitle.replace(/^id\=.*>/gm,'');
									channelTitle = (channelTitle === 'null') && 'No Title' || channelTitle;
									channelTitle = channelTitle.replace(/(?:^"|"$)/g,'');
								}
								else{
									channelTitle = responseText.match(/PP\[(?:'|")channel_status(?:'|")\][^;]*/).toString();
									channelTitle = channelTitle.replace('PP[\'channel_status\'] = ','');
									channelTitle = (channelTitle === 'null') && 'No Title' || channelTitle;
									channelTitle = channelTitle.replace(/(?:^"|"$)/g,'');							
								}
								channelStatus.innerHTML = channelTitle;
								
								if(channelName){
									var name = url.split('/')[3];
									channelName.innerHTML = '<a href="'+url+'" target="_blank" style="">'+name+'</a>';
								}
							}
							else{
								node.innerHTML = 'This is not channel url.';
							}
						}
					}
					else
					if(req.status === 404){
						node.innerHTML = 'This is not channel url.';
					}
					else{
						node.innerHTML = 'Error ' + req.status;
					}
				},
				onerror: function(req){
			
				}
			});			
		},
		addKeyEventAddSettingBox: function(){
			if(document.getElementById('justinTV-live-check-setting-container') === null)
				addKeyEvent('keydown',74,false,true,false);		
		},
		addStyle: function(){
			GM_addStyle(<><![CDATA[
				div#justinTV-live-check-setting-container {
					position: fixed !important;
					left: 20px !important;
					top: 25px !important;
					margin: 0px 20px 0px 0px !important;
					padding: 10px 15px 20px 15px !important; 
					background: #3274D1 !important;
					z-index: 100000 !important;
					opacity: 0.9 !important;
					-moz-border-radius: 10px !important;
					border: 0 none !important;
					font-family: Tahoma !important;
					max-height: 550px !important;
					max-width: 90% !important;
					overflow-x: auto;
					overflow-y: auto;
				}
				div#justinTV-live-check-setting-container div {
					-moz-background-clip: inherit !important;
					-moz-background-inline-policy: inherit !important;
					-moz-background-origin: inherit;
					background-color: inherit !important;
					border: 0 none !important;
					color: inherit !important;
					font-family: Tahoma !important;
					font-size: 17px !important;
					font-size-adjust: inherit !important;
					font-stretch: inherit !important;
					font-style: inherit !important;
					font-variant: inherit !important;
					font-weight: normal !important;
					letter-spacing: inherit !important;
					line-height: inherit !important;
					margin: 0px !important;
					padding: 0px !important;
					text-align: left !important;
					text-decoration: inherit !important;
					vertical-align: inherit !important;		
				}
				div#justinTV-live-check-setting-container div#justinTV-live-check-setting-container-button-container {
					position: absolute; 
					right: 15px;
					top: 15px;				
				}
				div#justinTV-live-check-setting-container span#justinTV-live-check-setting-container-close-button,
				div#justinTV-live-check-setting-container span#justinTV-live-check-setting-container-clear-timer-button {
					border: 1px solid #FFFFFF !important;
					-moz-border-radius: 5px !important;
					padding: 1px 3px !important; 
					margin-left: 10px !important;
					color: #FFFFFF !important;
					background: #474747 !important;
					font-size: 15px !important;
					font-weight: bold !important;
					opacity:0.5 !important;				
				}
				div#justinTV-live-check-setting-container span#justinTV-live-check-setting-container-close-button:hover,
				div#justinTV-live-check-setting-container span#justinTV-live-check-setting-container-clear-timer-button:hover {
					background-color: #474747 !important;
					opacity: 1 !important;
					cursor: pointer !important;
				}
				div#justinTV-live-check-setting-container table {
					border-collapse: separate !important;
					border-spacing: 2px 3px !important;
					-moz-background-clip: inherit !important;
					-moz-background-inline-policy: inherit !important;
					-moz-background-origin: inherit;
					background-color: none !important;
					border: 0 none !important;
					color: inherit !important;
					line-height: inherit !important;
					margin: 0px !important;
					padding: 0px !important;
					text-align: inherit !important;
					text-decoration: inherit !important;
					vertical-align: inherit !important;		
					font-family: Tahoma !important;
				}
				div#justinTV-live-check-setting-container tbody {
					-moz-background-clip: inherit !important;
					-moz-background-inline-policy: inherit !important;
					-moz-background-origin: inherit;
					background-color: none !important;
					border: 0 none !important;
					color: inherit !important;
					line-height: inherit !important;
					margin: 0px !important;
					padding: 0px !important;
					text-align: inherit !important;
					text-decoration: inherit !important;
					vertical-align: inherit !important;		
					font-family: Tahoma !important;			
				}
				div#justinTV-live-check-setting-container tr {
					-moz-background-clip: inherit !important;
					-moz-background-inline-policy: inherit !important;
					-moz-background-origin: inherit;
					background-color: none !important;
					border: 0 none !important;
					color: inherit !important;
					line-height: inherit !important;
					margin: 0px !important;
					padding: 0px !important;
					text-align: inherit !important;
					text-decoration: inherit !important;
					vertical-align: inherit !important;		
					font-family: Tahoma !important;
				}
				div#justinTV-live-check-setting-container th {
					-moz-border-radius: 5px !important;
					-moz-background-clip: inherit !important;
					-moz-background-inline-policy: inherit !important;
					-moz-background-origin: inherit;
					background-color: #FF5555 !important;
					border: 0 none !important;
					color: #FFFFFF !important;
					font-family: Tahoma !important;
					font-size: 15px !important;
					font-size-adjust: inherit !important;
					font-stretch: inherit !important;
					font-style: inherit !important;
					font-variant: inherit !important;
					font-weight: normal !important;
					letter-spacing: inherit !important;
					line-height: inherit !important;
					margin: inherit !important;
					padding: 5px 3px !important;
					text-align: center !important;
					text-decoration: inherit !important;
					vertical-align: inherit !important;		
				}
				div#justinTV-live-check-setting-container td {
					-moz-border-radius: 5px !important;
					-moz-background-clip: inherit !important;
					-moz-background-inline-policy: inherit !important;
					-moz-background-origin: inherit;
					background-color: #333333 !important;
					text-align: left !important;
					padding: 0px !important;
					margin: 0px 5px !important;
					font-family: Tahoma !important;
					vertical-align: middle !important;
				}
				div#justinTV-live-check-setting-container input[type='text'] {
					-moz-border-radius: 3px !important;
					-moz-background-clip: inherit !important;
					-moz-background-inline-policy: inherit !important;
					-moz-background-origin: inherit;
					background: #000000 inherit inherit inherit inherit !important;
					border: 0 none !important;
					color: #000000 !important;
					font-family: Tahoma !important;
					font-size: 16px !important;
					font-size-adjust: inherit !important;
					font-stretch: inherit !important;
					font-style: inherit !important;
					font-variant: inherit !important;
					font-weight: inherit !important;
					letter-spacing: inherit !important;
					line-height: inherit !important;
					margin: 1px 3px !important;
					padding: 1px 10px 0px 10px !important;
					text-align: inherit !important;
					text-decoration: inherit !important;
					vertical-align: inherit !important;
					width: 230px !important;
					height: 23px !important;
					ime-mode: disabled !important;
				}
				div#justinTV-live-check-setting-container input[type='text']:focus {
					outline-color: #663096 !important;
					outline-offset: 1px;
					outline-style: solid;
					outline-width: 2px;
					margin: 1px 3px !important;
					padding: 1px 10px 0px 10px !important;
					ime-mode: disabled !important;
				}
				div#justinTV-live-check-setting-container input[type='text']:hover {
					-moz-border-radius: 3px !important;
					-moz-background-clip: inherit !important;
					-moz-background-inline-policy: inherit !important;
					-moz-background-origin: inherit;
					background: #000000 inherit inherit inherit inherit !important;
					border: 0 none !important;
					color: #000000 !important;
					font-family: Tahoma !important;
					font-size: 16px !important;
					font-size-adjust: inherit !important;
					font-stretch: inherit !important;
					font-style: inherit !important;
					font-variant: inherit !important;
					font-weight: inherit !important;
					letter-spacing: inherit !important;
					line-height: inherit !important;
					margin: 1px 3px !important;
					padding: 1px 10px 0px 10px !important;
					text-align: inherit !important;
					text-decoration: inherit !important;
					vertical-align: inherit !important;
					width: 230px !important;
					height: 23px !important;
					ime-mode: disabled !important;
				}
				div#justinTV-live-check-setting-container select {
					-moz-border-radius: 3px !important;
					-moz-background-clip: inherit !important;
					-moz-background-inline-policy: inherit !important;
					-moz-background-origin: inherit;
					background: #FFFFFF none !important;
					border: none !important;
					color: #000000 !important;
					font-family: Tahoma !important;
					font-size: 12px !important;
					font-size-adjust: inherit !important;
					font-stretch: inherit !important;
					font-style: inherit !important;
					font-variant: inherit !important;
					font-weight: inherit !important;
					letter-spacing: inherit !important;
					line-height: inherit !important;
					margin: 0px 0px !important;
					padding: 1px !important;
					text-align: inherit !important;
					text-decoration: inherit !important;
					vertical-align: inherit !important;
				}				
				div#justinTV-live-check-setting-container option {
					-moz-background-clip: inherit !important;
					-moz-background-inline-policy: inherit !important;
					-moz-background-origin: inherit;
					background: #000000 inherit inherit inherit inherit !important;
					border: 0 none !important;
					color: #000000 !important;
					font-family: Tahoma !important;
					font-size: 12px !important;
					font-size-adjust: inherit !important;
					font-stretch: inherit !important;
					font-style: inherit !important;
					font-variant: inherit !important;
					font-weight: inherit !important;
					letter-spacing: inherit !important;
					line-height: inherit !important;
					margin: 0px !important;
					padding: 0px 5px !important;
					text-align: inherit !important;
					text-decoration: inherit !important;
					vertical-align: inherit !important;
				}				
				div#justinTV-live-check-setting-container span {
					-moz-border-radius: 5px !important;
					color: #FFFFFF !important;
					font-size: 15px !important;
					font-family: Tahoma !important;
					font-size-adjust: inherit !important;
					font-stretch: inherit !important;
					font-style: inherit !important;
					font-variant: inherit !important;
					font-weight: inherit !important;
					letter-spacing: inherit !important;
					line-height: inherit !important;
					text-decoration: none !important;
					text-align: left !important;
					margin: 0px !important;
					padding: 1px 10px 0px 10px !important;
					border: none !important;
					background-color: #333333 !important;
					opacity: 1 !important;
				}
				div#justinTV-live-check-setting-container td span {
					display: block !important;
				}
				div#justinTV-live-check-setting-container a {
					color: #01B7FF !important;
					font-size: 16px !important;
					font-family: Tahoma !important;
					font-size-adjust: inherit !important;
					font-stretch: inherit !important;
					font-style: inherit !important;
					font-variant: inherit !important;
					font-weight: bold !important;
					letter-spacing: inherit !important;
					line-height: inherit !important;
					text-decoration: underline !important;
					text-align: center !important;
					margin: 0px !important;
					padding: 1px 3px !important;
					border: none !important;
					background: #FFFFFF !important;
					background-color: inherit !important;
					opacity: 1 !important;
				}
				div#justinTV-live-check-setting-container a:visited {
					color: #01B7FF !important;
					font-size: 16px !important;
					font-family: Tahoma !important;
					font-size-adjust: inherit !important;
					font-stretch: inherit !important;
					font-style: inherit !important;
					font-variant: inherit !important;
					font-weight: bold !important;
					letter-spacing: inherit !important;
					line-height: inherit !important;
					text-decoration: underline !important;
					text-align: center !important;
					margin: 0px !important;
					padding: 1px 3px !important;
					border: none !important;
					background: #FFFFFF !important;
					background-color: inherit !important;
					opacity: 1 !important;
				}				
				div#justinTV-live-check-setting-container a:hover {
					color: #FFFFFF !important;
					font-size: 16px !important;
					font-family: Tahoma !important;
					font-size-adjust: inherit !important;
					font-stretch: inherit !important;
					font-style: inherit !important;
					font-variant: inherit !important;
					font-weight: bold !important;
					letter-spacing: inherit !important;
					line-height: bold !important;
					text-decoration: underline !important;
					text-align: center !important;
					margin: 0px !important;
					padding: 1px 3px !important;
					border: none !important;
					background: #FFFFFF !important;
					background-color: inherit !important;
					opacity: 1 !important;
				}				
				div#justinTV-live-check-setting-container img {
					margin: 0px !important;
					padding: 0px !important;
					border: none !important;
					background: none !important;
					text-align: left !important;
					border: none !important;
					background-color: inherit !important;
					opacity: 1 !important;					
				}
				div#justinTV-live-check-setting-container img#justinTV-live-check-setting-container-delete-url-button {
					opacity: 0.5 !important;
				}
				div#justinTV-live-check-setting-container img#justinTV-live-check-setting-container-delete-url-button:hover {
					opacity: 1 !important;
					cursor: pointer !important;
				}
			]]></>);
		}
	};

	JustinTV.init();

	function addKeyEvent(keyEvent,key,ctrl,alt,shift,target){
		target = target || document;
		var event = document.createEvent('KeyboardEvent');
		event.initKeyEvent(keyEvent,true,true,null,ctrl,alt,shift,false,key,0);            
		target.dispatchEvent(event);
	};		

	function setValue(){
		GM_setValue('justinTV',INFO.toSource());
	};
	
	function clearTimer(){
		for(var i in CHANNEL){
			var channel = CHANNEL[i];
			channel.expire = undefined;
		};
		setValue();
	};
	
	function defaultSetting(){
		GM_deleteValue('justinTV');
	};
})(); 