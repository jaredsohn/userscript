// ==UserScript==
// @name          Google Reader Favicon ++
// @description   Adds favicons to feeds and entries
// @namespace     Yamamaya
// @version       5.2.0
// @include       http://*google.tld/reader/view*
// @include       https://*google.tld/reader/view*
// ==/UserScript==

/*************************************************
 This script is based on 
  Ultimate GReader favicons
   http://userscripts.org/scripts/show/27739
  Google Reader - Colorful List View
   http://userscripts.org/scripts/show/8782
***************************************************/

	var GOOGLE_READER_INFO = {
		favicon: {},
		customizeFavicon: {},
		rssNumber: null,
		folderNumber: null,
		option: {
			sidebar: true,
			colorfulView: false
		}
	};
	
	try{
		GOOGLE_READER_INFO = JSON.parse(GM_getValue('googleReaderInformation'));
	}
	catch(ex){
	}
	
	var FAVICON = GOOGLE_READER_INFO['favicon'];
	var CUSTOMIZE_FAVICON = GOOGLE_READER_INFO['customizeFavicon'];
	
	var RSS = $X('id("sub-tree-item-0-main")/ul/li/ul/li').length;
	var FOLDER = $X('id("sub-tree-item-0-main")/ul/li').length;
	var RSS_NUMBERS = GOOGLE_READER_INFO['rssNumber'];
	var FOLDER_NUMBERS = GOOGLE_READER_INFO['folderNumber'];
 
	var FAVICON_URL = ['http://s2.googleusercontent.com/s2/favicons?domain=', '&alt=feed'];
	var FAVICON_DEFAULT_IMG = 'data:image/gif;base64,R0lGODlhEAAQAMQTALi9+ouS4MPH+q2z+J+m9+vs/6as9fP0/7O4+JKa9nyMy////9LX8v7//9zg6ZCX3uns9au05PH0+P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAABMALAAAAAAQABAAAAVr4CSOZGmeaGoKCAIYg2EgK1AcBcO+TzkAAkZhcRDEAiXEgED4HRoAgsJHGB6iB4lhSkIQgAUoYAFAkgaDRKJ6qDrMo4EAlxAsEgwIXCRf3G0GAm8lBgQsBAEJDwkReyIBAQoKkZBcKpeYEyEAOw==';
	var LOADING_IMG = 'data:image/gif;base64,R0lGODlhEAAQAOMIAAAAABoaGjMzM0xMTGZmZoCAgJmZmbKysv///////////////////////////////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQBCgAIACwAAAAAEAAQAAAESBDJiQCgmFqbZwjVhhwH9n3hSJbeSa1sm5GUIHSTYSC2jeu63q0D3PlwCB1lMMgUChgmk/J8LqUIAgFRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+UKgmFqbpxDV9gAA9n3hSJbeSa1sm5HUMHTTcTy2jeu63q0D3PlwDx2FQMgYDBgmk/J8LqWPQuFRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+YSgmFqb5xjV9gQB9n3hSJbeSa1sm5EUQXQTADy2jeu63q0D3PlwDx2lUMgcDhgmk/J8LqUPg+FRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+cagmFqbJyHV9ggC9n3hSJbeSa1sm5FUUXRTEDy2jeu63q0D3PlwDx3FYMgAABgmk/J8LqWPw+FRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+QihmFqbZynV9gwD9n3hSJbeSa1sm5GUYXSTIDy2jeu63q0D3PlwDx3lcMgEAhgmk/J8LqUPAOBRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+UqhmFqbpzHV9hAE9n3hSJbeSa1sm5HUcXTTMDy2jeu63q0D3PlwDx0FAMgIBBgmk/J8LqWPQOBRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+YyhmFqb5znV9hQF9n3hSJbeSa1sm5EUAHQTQTy2jeu63q0D3PlwDx0lEMgMBhgmk/J8LqUPgeBRhV6z2q0VF94iJ9pOBAAh+QQBCgAPACwAAAAAEAAQAAAESPDJ+c6hmFqbJwDV9hgG9n3hSJbeSa1sm5FUEHRTUTy2jeu63q0D3PlwDx1FIMgQCBgmk/J8LqWPweBRhV6z2q0VF94iJ9pOBAA7';

	var OPTION = GOOGLE_READER_INFO['option'];

	var SIDEBAR_FAVICON_FLAG = OPTION['sidebar'];
	var COLORFUL_ITEM_FLAG = OPTION['colorfulView'];
	var COLORFUL_ITEM_LIGHTNESS = 87;
	var HOVER_LIGHTNESS   = COLORFUL_ITEM_LIGHTNESS - 5;
	var READ_LIGHTNESS    = COLORFUL_ITEM_LIGHTNESS + 5;
	var C_LIGHTNESS       = COLORFUL_ITEM_LIGHTNESS + 5;
	var C_HOVER_LIGHTNESS = C_LIGHTNESS - 5;
	var C_READ_LIGHTNESS  = C_LIGHTNESS + 5;		
	
	
	var GoogleReader = {
		init: function(){ 	
			GM_registerMenuCommand('Google Reader Favicon ++ clear cache',this.clearCache);
		
			this.setBaseCSS();	
			this.createPopup();
			this.createButton();
			
			window.addEventListener('unload',this,false);
			document.addEventListener('click',this,true);
			document.addEventListener('contextmenu',this,false);
			document.body.addEventListener('DOMNodeInserted',this,false);
			
			this.popup.addEventListener('DOMAttrModified',this,false);
			this.popup.addEventListener('mouseover',this,false);
			this.popup.addEventListener('mouseout',this,false);
			
			(!RSS_NUMBERS || !FOLDER_NUMBERS || RSS !== RSS_NUMBERS || FOLDER !== FOLDER_NUMBERS) ?
				this.requestAddFaviconSetColor(): this.addFaviconSetColor();
		 
			GOOGLE_READER_INFO.rssNumber = RSS;
			GOOGLE_READER_INFO.folderNumber = FOLDER;
		},
		handleEvent: function(evt){
			var target = evt.target;
			switch(evt.type){
				case 'unload':
					this.setValue();
				break;
				
				case 'DOMNodeInserted':
					if(/^entry\s/i.test(target.className)){
						this.entryFavicon(target);	
					}
					else
					if(target.tagName === 'LI' && /^folder/.test(target.className)){
						if(SIDEBAR_FAVICON_FLAG){ 
							this.sideBarFavicon();
						}	
					}
					else // home, trends, browser for stuff, shareing setting
					if(target.className === 'viewer-page'){
						this.recommendations();
					}
				break;
				
				case 'click':
					if(!evt.button){
						var popupButton = $X('ancestor-or-self::*[starts-with(@id,"GR-options-button-")][1]',target)[0];
						if(popupButton){
							this.popupClick(target);
							return;
						}
						var button = $X('ancestor-or-self::*[@id="GR-options-button"][1]',target)[0];	
						if(button){
							this.showPopup(evt);
						}
						else{
							this.hidePopup();
						}
					}
					else{
						this.hidePopup();
					}
					
					this.customizeFavicon(evt);
				break;
				
				case 'contextmenu':
					this.customizeFavicon(evt);
				break;
				
				case 'DOMAttrModified':
					var attrName = evt.attrName;
					if(attrName === 'style'){
						var newValue = evt.newValue;
						if(/visibility:\s+visible;?/.test(newValue)){
							this.upDatePopup(target);
						}
					}
				break;
				
				case 'mouseover':
					this.popupHover(evt,target);
				break;
				
				case 'mouseout':
					this.popupHover(evt,target);
				break;
			}
		},
		requestAddFaviconSetColor: function(){
			var self = this;
			var xhr = new XMLHttpRequest();
			xhr.open('GET', '/reader/subscriptions/export', true);
			xhr.onload = function(){
				var responseXML = xhr.responseXML;
				Array.forEach(responseXML.getElementsByTagName('outline'), function(outline){
					if(!outline.hasAttribute('htmlUrl'))
						return;
					var title = outline.getAttribute('title');
					var url = outline.getAttribute('htmlUrl') || outline.getAttribute('xmlUrl');
					if(/^http:\/\/www\.google\.[^\/]*\/reader\/view\/feed/.test(url)){
						url = decodeURIComponent(url).replace(/^(http:\/\/www\.google\.[^\/]*\/reader\/view\/feed\/)|(\?(title|feed)[^\/]*)$/g,'');
					}
					var favicon = url.split(/\/|\?/)[2];
					favicon = FAVICON_URL.join(favicon);
					var r = [favicon,url];
					(title.length > 24) ? 
						FAVICON[title.substr(0, 21) + '...'] = r:
						FAVICON[title] = r;
				});	
				self.addFaviconSetColor();
			};
			xhr.send(null);		
		},
		addFaviconSetColor: function(){
			if(COLORFUL_ITEM_FLAG){
				this.setColorfulItem();
			}
					
			this.entryFaviconNoHandler();
			
			if(SIDEBAR_FAVICON_FLAG){
				this.sideBarFavicon();
			}
		},
		entryFaviconNoHandler: function(){
			var self = this;
			$X('id("entries")/div[contains(@class,"entry")]').forEach(function(entry){
				var title = $X('.//span[@class="entry-source-title"] | .//a[@class="entry-source-title"]',entry)[0];
				if(!title)
					return;
				var match = title.textContent;
				if(match.length > 24) 
					match = match.substr(0,21) + '...';	
					
				if(COLORFUL_ITEM_FLAG){	
					if(entry.getAttribute('color') === null)
						entry.setAttribute('color',match.replace(/"/g,''));
				}				
				
				if(entry.getElementsByClassName('entry-favicon')[0])
					return;	
					
				var favicon = document.createElement('img');
				favicon.className = 'entry-favicon';
					
				if(CUSTOMIZE_FAVICON.hasOwnProperty(match)){
					favicon.src = CUSTOMIZE_FAVICON[match];
				}
				else
				if(FAVICON.hasOwnProperty(match)){
					favicon.src = FAVICON[match][0];
				}
				else{
					favicon.src = FAVICON_DEFAULT_IMG;
				}
				
				if(title.tagName !== 'SPAN'){// not list view
					title = entry.getElementsByClassName('entry-title-link')[0] || // expanded view
							entry.getElementsByClassName('comment-entry-title')[0];// comment view
				}
				
				title.parentNode.insertBefore(favicon,title);
				favicon.removeEventListener('error',revertFavicon,false);
				favicon.addEventListener('error',revertFavicon,false);	
			});			
		},
		entryFavicon: function(target){
			var point, title;
			var favicon = document.createElement('img');
			favicon.className = 'entry-favicon';
						
			if(target.firstChild.className === 'collapsed'){ // リスト表示 .//span[contains(@class,'entry-source-title')]
				point = target.getElementsByTagName('span')[0];
				title = point;
			}
			else{// 前文表示 .//span[@class='entry-source-title-parent'], 検索, コメント共有
				point = target.getElementsByClassName('entry-title-link')[0] ||
						target.getElementsByClassName('comment-entry-title')[0];
				title = target.getElementsByClassName('entry-source-title')[0]; 
			}						
			
			if(/\s+?entry-source-friends/.test(point.className))
				return;
			
			var match = title.textContent; 
			if(match.length > 24)
				match = match.substr(0,21) + '...';			
					
			if(COLORFUL_ITEM_FLAG){
				target.setAttribute('color',match.replace(/"/g,''));
			}
						
			if(CUSTOMIZE_FAVICON.hasOwnProperty(match)){
				favicon.src = CUSTOMIZE_FAVICON[match];
			}
			else
			if(FAVICON.hasOwnProperty(match)){
				favicon.src = FAVICON[match][0];
			}
			else{
				var fs = target.getElementsByClassName('entry-original')[0] ||
						target.getElementsByClassName('entry-title-link')[0];
				if(fs){
					favicon.src = FAVICON_URL.join(fs.href.split(/\/|\?/)[2]);
				}
				else{
					favicon.src = FAVICON_DEFAULT_IMG;
				}					
				// friends以外
				if(!/\s+entry-source-friends/.test(title.className))
					FAVICON[match] = [favicon.src,fs.href];
					
				// 登録されていないフィード
				if(COLORFUL_ITEM_FLAG){
					var css = this.setColorfulCSS(match);
					GM_addStyle(css);
				}
			}
			
			point.parentNode.insertBefore(favicon, point);
			favicon.removeEventListener('error', revertFavicon, false);
			favicon.addEventListener('error', revertFavicon, false);		
		},
		sideBarFavicon: function(){
			$X('id("sub-tree")//div[contains(concat(" ",@class," ")," sub-icon ") and starts-with(@id,"sub-tree-item-")]').forEach(function(node){
				var titleNode = node.nextElementSibling;
				var title = titleNode.textContent;
				if(title.length > 24) 
					title = title.substr(0,21) + '...';	
				var url = FAVICON_DEFAULT_IMG;	
				(CUSTOMIZE_FAVICON.hasOwnProperty(title)) ? url = CUSTOMIZE_FAVICON[title]: 
					(FAVICON.hasOwnProperty(title)) ? url = FAVICON[title][0]: url = FAVICON_DEFAULT_IMG;
					
				var favicon = document.createElement('img');
				favicon.className = ['sidebar-favicon','icon','sub-icon'].join(' ');
				favicon.src = url;
				node.parentNode.insertBefore(favicon,node);			
				favicon.removeEventListener('error',revertFavicon,false);
				favicon.addEventListener('error',revertFavicon,false);
			});
		},
		recommendations: function(){
			/* recommendations */
			var nodes = $X('.//div[@class="feed-result-row"]//div[@class="feed-info"]');
			nodes.forEach(function(node){
				var host = node.textContent.split('/')[2];
				var favicon = document.createElement('img');
				favicon.src = FAVICON_URL.join(host);
				favicon.className = 'entry-favicon';
				var nodeParent = node.parentNode;
				nodeParent.insertBefore(favicon,nodeParent.firstChild);
				favicon.removeEventListener('error',revertFavicon,false);
				favicon.addEventListener('error',revertFavicon,false);
			});
			/* home */
			nodes = $X('id("overview")//div[@class="overview-header"]//a[@class="sub-link"]');
			nodes.forEach(function(node){
				var title = node.textContent.split('\n')[0];
				if(title.length > 24) 
					title = title.substr(0,21) + '...';
				var favicon = document.createElement('img');
				favicon.className = 'entry-favicon';	
				if(CUSTOMIZE_FAVICON.hasOwnProperty(title)){
					favicon.src = CUSTOMIZE_FAVICON[title];
				}
				else
				if(FAVICON.hasOwnProperty(title)){
					favicon.src = FAVICON[title][0];
				}
				else{
					favicon.src = FAVICON_DEFAULT_IMG;
				}
				node.parentNode.insertBefore(favicon,node);
				favicon.removeEventListener('error',revertFavicon,false);
				favicon.addEventListener('error',revertFavicon,false);
			});
		},
		customizeFavicon: function(evt){
			var self = this;
			var target = evt.target;
			if(target.nodeName === 'IMG' && /-favicon$/.test(target.className)){
				if(evt.altKey && evt.ctrlKey && evt.button === 0){
					evt.cancelBubble = true;
					var title = (target.className === 'entry-favicon') && target.nextSibling.textContent || 
								(target.className === 'sidebar-favicon') && target.nextSibling.firstChild.textContent;
					if(title.length > 24) 
						title = title.substr(0,21) + '...';			
						
					var favicon;
					(GOOGLE_READER_INFO.customizeFavicon.hasOwnProperty(title)) ? 
						favicon = GOOGLE_READER_INFO.customizeFavicon[title]: favicon = FAVICON[title][0];		  
						
					var customizeFavicon = prompt('Customize favicon' + '\n' + '\n' + title, favicon);
					if(customizeFavicon === null){
						target.src = target.src;
					}
					else{
						target.src = customizeFavicon;
						GOOGLE_READER_INFO.customizeFavicon[title] = customizeFavicon;
					}		
					evt.preventDefault();
				}
				else
				if(evt.altKey && evt.ctrlKey && evt.button === 2){
					evt.cancelBubble = true;
					var title = (target.className === 'entry-favicon') && target.nextSibling.textContent || 
								(target.className === 'sidebar-favicon') && target.nextSibling.firstChild.textContent;
					if(title.length > 24) 
						title = title.substr(0,21) + '...';			
						
					if(!FAVICON.hasOwnProperty(title) || !FAVICON[title][1]){
						return;
					}
						
					var dF = CUSTOMIZE_FAVICON[title] || FAVICON[title][0]; 
					var url = FAVICON[title][1];
						url = url.replace(/\/rss(\s+)?$/,'/');
					target.src = LOADING_IMG;
					
					GM_xmlhttpRequest({
						method: 'GET', 
						url: url,
						onload:function(req){
							var status = req.status;
							if(status === 200){
								var responseText = req.responseText;
								var shortcutIcon = responseText.match(/<link\s([^>]*)?rel=("|')(shortcut\s)?icon("|')[^>]*/ig);
								if(!shortcutIcon){// no match
									target.src = dF;
									return;
								}
									
								var favicon;
								shortcutIcon.forEach(function(f){
									f = f.match(/href=("|')[^("|')]*/i);
									if(!f){
										target.src = dF;
										return;	
									}
									favicon = f[0].replace(/^href=(?:"|')|(?:"|')$/g,'');
									if(!/^https?:\/\//.test(favicon)){
										if(!/^\//.test(favicon)) 
											favicon = '/' + favicon;
										favicon = 'http://'+ url.split(/\/|\?/)[2] + favicon;
									}
								});
								if(!favicon)
									return;
								target.src = favicon;
								if(favicon === dF)// ファビコンがデフォルトと同じとき	
									return;
								var text = 'Change favicon ?';
								var flag = confirm(text);
								if(flag){
									CUSTOMIZE_FAVICON[title] = favicon;
								}
								else{
									target.src = dF;
								}
							}
							else{
								target.src = dF;
							}
						}
					});
						
					evt.preventDefault();
				}
			}
		},		
		createButton: function(){
			var text = 'GR++';
			var point = document.getElementById('viewer-view-options');
			if(!point)
				return;
			var div = document.createElement('div');
				div.id = 'GR-options-button';
				div.className = 'goog-button goog-button-base unselectable goog-inline-block goog-button-float-left goog-menu-button goog-button-tight scour-disabled';
				div.setAttribute('tabindex','0');
				div.setAttribute('role','wairole:button');
				div.innerHTML = ''+
									'<div class="goog-button-base-outer-box goog-inline-block">'+
										'<div class="goog-button-base-inner-box goog-inline-block">'+
											'<div class="goog-button-base-pos">'+
												'<div class="goog-button-base-top-shadow"> </div>'+
												'<div class="goog-button-base-content">'+
													'<div class="goog-button-body">'+ text + '</div>'+
													'<div class="goog-menu-button-dropdown"> </div>'+
												'</div>'+
											'</div>'+
										'</div>'+
									'</div>';
			point.parentNode.insertBefore(div,point);			
		},	
		createPopup: function(){
			var div = document.createElement('div');
				div.id = 'GR-options-popup';
				div.className = 'goog-menu goog-menu-vertical';
				div.setAttribute('role','menu');
				div.setAttribute('aria-haspopup','true');
				div.setAttribute('style','visibility: hidden;');
			var node = '';
			
			for(var i in OPTION){
				var flag = OPTION[i];
				var id = 'GR-options-button-' + i;
				node += ''+
					'<div id="'+id+'" pref="'+i+'" class="goog-menuitem goog-option-selected goog-option" role="menuitem" style="-moz-user-select: none;">'+
						'<div pref="'+i+'" class="goog-menuitem-content">'+
							'<div pref="'+i+'" class="goog-menuitem-checkbox"> </div>'+
							i +
						'</div>'+
					'</div>';
			};
			div.innerHTML = node;
			document.body.appendChild(div);					 
		},	
		showPopup: function(evt){
			var button = document.getElementById('GR-options-button');
			var popup = this.popup;
			var x = evt.screenX;
			var l = button.offsetWidth - button.offsetWidth;
			var t = button.offsetTop - button.offsetHeight + 3;
			var parent = button;
			while(parent.tagName !== 'BODY'){
				t += parent.offsetTop;
				l += parent.offsetLeft;
				parent = parent.offsetParent;
			};
			var css = ''+
				'top: '+t+'px;'+
				'left: '+l+'px;'+
				'visibility: visible;'+
			'';
			popup.setAttribute('style',css);
		},
		hidePopup: function(){
			var css = 'visibility: hidden;';
			this.popup.setAttribute('style',css);
		},
		upDatePopup: function(target){
			for(var i in OPTION){
				var flag = OPTION[i];
				var id = 'GR-options-button-' + i;
				var node = document.getElementById(id);
				if(flag){
					node.className = 'goog-menuitem goog-option-selected goog-option';
				}
				else{
					node.className = 'goog-menuitem goog-option';
				}
			};
		},
		popupClick: function(target){
			if(target.hasAttribute('pref')){
				var name = target.getAttribute('pref');
				var flag = OPTION[name];
				var node = document.getElementById('GR-options-button-' + name);
				if(flag){
					node.className = 'goog-menuitem goog-option goog-menuitem-highlight';
				}
				else{
					node.className = 'goog-menuitem goog-option-selected goog-option goog-menuitem-highlight';
				}
				OPTION[name] = !flag;
			}
		},
		popupHover: function(evt,target){
			if(!target.hasAttribute('pref'))
				return;
			var name = target.getAttribute('pref');
			var node = document.getElementById('GR-options-button-' + name);
			if(evt.type === 'mouseover'){
				if(/\s+goog-option-selected/.test(node.className)){
					node.className = 'goog-menuitem goog-option-selected goog-option goog-menuitem-highlight';
				}
				else{
					node.className = 'goog-menuitem goog-option goog-menuitem-highlight';
				}
			}
			else{
				if(/\s+goog-option-selected/.test(node.className)){
					node.className = 'goog-menuitem goog-option-selected';
				}
				else{
					node.className = 'goog-menuitem goog-option';
				}
			}
		},
		get popup(){
			return document.getElementById('GR-options-popup');
		},		
		setBaseCSS: function(){
			GM_addStyle(''+  
				'img.entry-favicon {'+
					'width: 16px !important;'+
					'height: 16px !important;'+					
					'border: none !important;'+
					'margin-right: 5px;'+
					'float: none !important;'+
				'}'+
				'.collapsed img.entry-favicon {'+
					'position: absolute !important;	'+
					'top: 25% !important;'+
					'left: 1.6em !important;'+
					'margin-right: 0px !important;'+
					'vertical-align: baseline !important;'+			
				'}'+
				'#entries.list .collapsed .entry-main .entry-source-title:not([class$="entry-source-friends"]) {'+
					'left: 3.25em !important; width: 9em !important;'+
				'}'+
				'#entries.list .collapsed .entry-secondary,'+
				'.samedir #entries.single-source .collapsed .entry-secondary {'+
					'margin: 0 8.5em 0 14em !important;'+
				'}'+
				'#entries.single-source .collapsed .entry-source-title {'+
					'display: block !important;'+
				'}'+
				'#entries.list .read .collapsed {'+
					'opacity:0.6;'+
				'}'+
				'#entries.list .entry .collapsed:hover {'+
					'background:#C2CFF1;'+
				'}'+
				'#entries.list .read .collapsed:hover {'+
					'opacity: 1.0; background: #C2CFF1;'+
				'}'+
				
				'#GR-options-popup {'+
					'position: absolute;'+
					'z-index: 999999;'+
					'overflow-x: hidden;'+
					'overflow-y: auto;'+
				'}'+
				'#GR-options-popup:hover * {'+
					'cursor: pointer !important;'+
				'}'+
				'#GR-options-popup .goog-menuitem {'+
					'padding-right: 16px;'+
				'}');
			
			if(SIDEBAR_FAVICON_FLAG){
				GM_addStyle(''+
					'#lhn-subscriptions .scroll-tree .sub-icon:not([class^="sidebar-favicon"]) {'+
						'display: none;'+
					'}'+
					'#sub-tree a img.sidebar-favicon {'+
						'width: 16px;'+
						'height: 16px;'+ 
						'border: none;'+
						'margin-top: 3px;'+ 
						'margin-right: 5px;'+
						'padding-left: 2px;'+
						'vertical-align: top;'+
						'background: none !important;'+
						'opacity: 1 !important;'+
					'}');
			}	
		},
		setColorfulItem: function(){
			var css = ''+
				'.card { '+
					'background-color: transparent !important;'+
				'}'+
				'.collapsed { '+
					'border-color: transparent !important;'+
				'}'+
				'#entries.list #current-entry .collapsed {'+
					'border: 2px solid #8181DC !important;'+
				'}'+
				'#entries.list #current-entry.expanded .collapsed {'+
					'border-bottom-color: transparent !important;'+
					'border-width: 2px 0 !important;'+
				'}'+
				'.entry-source-title, '+
				'#entries.list .collapsed .entry-secondary, '+
				'.entry .entry-date {'+
					'color: #000000 !important;'+
				'}'+
				'.entry.read[color] .collapsed .entry-title,'+
				'.entry.read[color] .collapsed .entry-source-title,'+
				'.entry.read[color] .collapsed .entry-secondary, '+
				'.entry.read[color] .collapsed .entry-secondary .snippet, '+
				'.entry.read[color] .collapsed .entry-date {'+
					'color: #000000 !important;'+
				'}'+
				'.entry.read[color]:hover .collapsed .entry-title {'+
					'color: #000000 !important;'+
				'}'+
				'.entry.read[color]:hover .collapsed .entry-source-title,'+
				'.entry.read[color]:hover .collapsed .entry-secondary, '+
				'.entry.read[color]:hover .collapsed .entry-secondary .snippet,'+
				'.entry.read[color]:hover .collapsed .entry-date {'+
					'color: #000000 !important;'+
				'}';
			
			if(COLORFUL_ITEM_LIGHTNESS <= 45){
				css += ''+
					'.entry-source-title,'+
					'#entries .collapsed .entry-title,'+
					'#entries.list .collapsed .entry-secondary, '+
					'.entry .entry-date,'+
					'.entry .entry-author,'+
					'.entry-comments .comment-time,'+
					'.entry .entry-date,'+
					'.card .entry-main{'+
						'color: #D1D7E2 !important;'+
					'}'+
					'.entry.read[color] .collapsed .entry-title,'+
					'.entry.read[color] .collapsed .entry-source-title,'+
					'.entry.read[color] .collapsed .entry-secondary, '+
					'.entry.read[color] .collapsed .entry-secondary .snippet, '+
					'.entry.read[color] .collapsed .entry-date,'+
					'.entry.read[color] .card .entry-container .entry-body {'+
						'color: #D1D7E2 !important;'+
					'}'+
					'.entry.read[color]:hover .collapsed .entry-title {'+
						'color: #D1D7E2 !important;'+
					'}'+
					'.entry.read[color]:hover .collapsed .entry-source-title,'+
					'.entry.read[color]:hover .collapsed .entry-secondary, '+
					'.entry.read[color]:hover .collapsed .entry-secondary .snippet,'+
					'.entry.read[color]:hover .collapsed .entry-date {'+
						'color: #D1D7E2 !important;'+
					'}';
			}
			
			for(var i in FAVICON){
				css += this.setColorfulCSS(i);
			};
			// set color is error
			css += '#entries.list .collapsed, #entries.list .entry .collapsed{\
							background: hsl(180, 80%, '+COLORFUL_ITEM_LIGHTNESS+'%);\
					 }\
					 div.collapsed:hover{\
							background: hsl(180, 90%, '+HOVER_LIGHTNESS+'%) !important;\
					 }\
					 #entries.list .read .collapsed{\
							background: hsla(180, 90%, '+READ_LIGHTNESS+'%, 0.6); !important;\
					 }\
					 #entries.list .read .collapsed:hover{\
							background: hsla(180, 80%, '+HOVER_LIGHTNESS+'%, 1.0);\
					 }\
					 .card{\
							background: hsl(180, 80%, '+C_LIGHTNESS+'%) !important;\
					 }\
					 .card:hover{\
							background: hsl(180, 90%, '+C_HOVER_LIGHTNESS+'%) !important;\
					 }\
					 .read .card{\
							background: hsl(180, 90%, '+C_READ_LIGHTNESS+'%) !important;\
					 }\
					 .read .card:hover{\
							background: hsl(180, 80%, '+C_HOVER_LIGHTNESS+'%) !important;\
					 }';
				  
			GM_addStyle(css);	
		},
		setColorfulCSS: function(title){
			title = title.replace(/"/g,'');
			var c = 0;
			Array.forEach(title,function(t){
				c+= t.charCodeAt(0);
			});
			c = Math.floor(c%360);
			/*
			var l = parseInt(title.length);
			var c = Math.floor((title.charCodeAt(0) % title.charCodeAt(l-1) * l) % 360);
			*/
			if(c > 230 && c < 310)
				c %= 230;
			return '.entry[color="'+title+'"] .collapsed {\
						background: hsl('+c+', 80%, '+COLORFUL_ITEM_LIGHTNESS+'%) !important;\
					}\
					.entry[color="'+title+'"]:hover .collapsed {\
						background: hsl('+c+', 90%, '+HOVER_LIGHTNESS+'%) !important;\
					}\
					.entry.read[color="'+title+'"] .collapsed {\
						background: hsla('+c+', 80%, '+READ_LIGHTNESS+'%, 0.6) !important;\
						opacity:1.0 !important;\
					}\
					.entry.read[color="'+title+'"]:hover .collapsed {\
						background: hsla('+c+', 80%, '+HOVER_LIGHTNESS+'%, 1.0) !important;\
					}\
					.entry[color="'+title+'"] .card, .entry[color="'+title+'"] .comment-entry{\
						background: hsl('+c+', 80%, '+C_LIGHTNESS+'%) !important;\
					}\
					.entry[color="'+title+'"]:hover .card, .entry[color="'+title+'"]:hover .comment-entry{\
						background: hsl('+c+', 90%, '+C_HOVER_LIGHTNESS+'%) !important;\
					}\
					.entry.read[color="'+title+'"] .card,.entry.read[color="'+title+'"] .comment-entry{\
						background: hsl('+c+', 80%, '+C_READ_LIGHTNESS+'%) !important;\
					}\
					.entry.read[color="'+title+'"]:hover .card, .entry.read[color="'+title+'"]:hover .comment-entry{\
						background: hsl('+c+', 80%, '+C_HOVER_LIGHTNESS+'%) !important;\
					}';			
		},
		setValue: function(){
			GM_setValue('googleReaderInformation',JSON.stringify(GOOGLE_READER_INFO));
		},
		clearValue: function(){
			GM_setValue('googleReaderInformation','');
		},
		clearCache: function(){
			GOOGLE_READER_INFO['favicon'] = {};
			GOOGLE_READER_INFO['rssNumber'] = null;
			GOOGLE_READER_INFO['folderNumber'] = null;
			this.setValue();
		},
		clearCustomizeFavicon: function(){
			GOOGLE_READER_INFO['customizeFavicon'] = {};
			this.setValue();
		}
	};
 
	GoogleReader.init();
	
	function revertFavicon(event){
		this.src = FAVICON_DEFAULT_IMG;
	};
		
	function $X(exp, ctx){
		var xp = (ctx && ctx.ownerDocument || document).evaluate(exp, ctx || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null),
		r = [];
		for (var i = 0;i < xp.snapshotLength;++i) r.push(xp.snapshotItem(i));
		return r;
	};