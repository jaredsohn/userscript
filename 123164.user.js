// ==UserScript==
// @name			Facebook Old Chat Sidebar
// @namespace			lenni
// @description			Replaces new Facebook sidebar with one like the original.
// @version			2.5.1
// @updateURL			https://userscripts.org/scripts/source/123164.meta.js
// @grant			none
// @include			http://*.facebook.com/*
// @include			https://*.facebook.com/*
// @match			http://*.facebook.com/*
// @match			https://*.facebook.com/*
// @exclude			http://*.facebook.com/ajax/*
// @exclude			https://*.facebook.com/ajax/*
// ==/UserScript==

// Author: www.lennart-glauer.de
// Date: 18.04.2014
// License: GNU General Public License v3 (GPL)
// Url: http://userscripts.org/scripts/show/123164

// contentEval (http://wiki.greasespot.net/Content_Script_Injection)
(function(source) {
	// Check for function input.
	if ('function' == typeof source) {
		// Execute this function with no arguments, by adding parentheses.
		// One set around the function, required for valid syntax, and a
		// second empty set calls the surrounded function.
		source = '(' + source + ')();'
	}

	// Create a script node holding this  source code.
	var script = document.createElement('script');
	script.setAttribute("type", "application/javascript");
	script.textContent = source;

	// Insert the script node into the page, so it will run, and immediately
	// remove it to clean up.
	document.body.appendChild(script);
	document.body.removeChild(script);
})

(function(){
	var w = window;
	var d = w.document;

	var settings = {
		// open buddylist on load
		Onload:		true,

		// set buddylist sticky ( stay opened )
		Sticky:		true,

		// show online friends
		Online:		true,

		// show idle friends
		Idle:		true,

		// show mobile friends
		Mobile:		true,

		// buddylist style
		Margin:		'0px 10px',
		MinHeight:	'140px',
		Width:		'200px'
	};

	function ajax(url){
		this.Url = url;
		this.XMLHttpRequest = new w.XMLHttpRequest();
	}

	ajax.prototype = {
		'send':function(type,data,callback){
			try{
				this.Callback = callback;
				this.XMLHttpRequest.open(type,this.Url,true);
				this.XMLHttpRequest.onreadystatechange = this.stdcallback.bind(this);
				this.XMLHttpRequest.send(data);
				return true;
			}catch(e){
				return false;
			}
		},

		'stdcallback':function(){
			if(this.XMLHttpRequest.readyState === 4 && this.XMLHttpRequest.status === 200){
				if(typeof this.Callback === 'function') this.Callback(this.XMLHttpRequest);
			}
		}
	};

	var util = {
		'insertRule':function(rule){
			if(!this.css){
				this.css = d.createElement('style');
				d.querySelector('head').appendChild(this.css);
			}

			return this.css.appendChild(d.createTextNode(rule));
		},

		'getItem':function(key){
			return unescape(d.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + escape(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
		},

		'setItem':function(key,value){
			d.cookie = escape(key) + '=' + escape(value) + '; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/';
		},

		'removeItem':function(key){
			d.cookie = escape(key) + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
		}
	};

	var rocki = {
		'DOMContentLoaded':function(){
			w.toggle_list = function(r){
				if(util.getItem('toggle' + r) === 'true'){
					util.setItem('toggle' + r,'false');
				}else{
					util.setItem('toggle' + r,'true');
				}
				w.render_chat();
			};

			w.change_order = function(r){
				var f = d.querySelectorAll('ul.fbChatOrderedList li.separator[id]');
				for(var i = 1, j = f.length; i < j; i++){
					if(f.item(i).id === r){
						util.setItem('order' + f.item(i).id,i-1);
						util.setItem('order' + f.item(i-1).id,i);
					}else{
						util.setItem('order' + f.item(i).id,i);
					}
				}
				w.render_chat();
			};

			w.Arbiter.subscribe('sidebar/initialized',function(a,d){
				d.isViewportCapable = function(){ return false; };
				d.disable();
			});

			w.Env = w.require('Env');
			w.Env.user = w.require("CurrentUserInitialData").id;

			w.Arbiter.subscribe('buddylist-nub/initialized',function(a,c){
				var av = w.require('AvailableList'),
					sp = w.require('ShortProfiles'),
					tl = w.require('Toggler'),
					oa = w.require('debounceAcrossTransitions'),
					ps = w.require('PresenceStatus'),
					at = w.require('LastMobileActiveTimes');

				w.ChatOpenTab = w.require('ChatOpenTab');

				var getAvailableList = function(){
					return av.getAvailableIDs().filter(function(r){
						switch(av.get(r)){
							case av.ACTIVE: return settings.Online;
							case av.IDLE: return settings.Idle;
							default: return false;
						}
					});
				};

				var sortAlpha = function(x,y){
					var r = sp.getNow(x), s = sp.getNow(y);
					if(!r || !s) return 0;
					var t = r.name.toLowerCase(),
						u = s.name.toLowerCase();
					return t < u ? -1 : 1;
				};

				var sortLists = function(x,y){
					if(!x.member || !y.member) return 0;
					var r = Number(util.getItem('order' + x.uid)),
						s = Number(util.getItem('order' + y.uid));
					if(r === s) return 0;
					return r < s ? -1 : 1;
				};

				c.orderedList._getListItem = function(id){
					this.itemCache = this.itemCache || {};
					if(!this.itemCache.hasOwnProperty(id)){
						var usr = sp.getNow(id);
						this.itemCache[id] = d.createElement('li');
						this.itemCache[id].setAttribute('onclick', 'ChatOpenTab.openUserTab(' + usr.id + ');');
						this.itemCache[id].className = '__42fz';
						this.itemCache[id].innerHTML =
							'<a class="_55ln" rel="ignore" tabindex="0">\
							<div class="__55lp">\
								<div class="__56p9">\
									<div size="28" style="width:28px;height:28px;">\
										<img width="28" height="28" src="' + usr.thumbSrc +'">\
									</div>\
								</div>\
								<div class="__5bon">\
									<div class="__568z">\
										<div class="__5t35"></div>\
										<i class="_sp_9ot619 _sx_1b221c"></i>\
									</div>\
								</div>\
								<div class="__55lr">' + usr.name + '</div>\
							</div></a>';
						var status = this.itemCache[id].querySelector('.__568z');
						this.itemCache[id]._text = status.querySelector(':first-child');
						this.itemCache[id]._img = status.querySelector(':last-child');
					}
					if(av.get(id) === av.MOBILE){
						this.itemCache[id]._text.innerHTML = at.getShortDisplay(id);
						this.itemCache[id]._img.className = ' _sp_axfrm8';
						this.itemCache[id]._text.style.color = '#898F9C';
					}else{
						this.itemCache[id]._text.innerHTML = ps.getDetailedActivePresence(id);
						this.itemCache[id]._img.className = ' _sp_9ot619 _sx_1b221c';
						this.itemCache[id]._text.style.color = '#63A924';
					}
					return this.itemCache[id];
				};

				w.render_chat = /*c.orderedList.render =*/ c.orderedList._renderOrderedList = function(){
					this.render = oa(function(){
						if(!rocki.lists) return setTimeout(this.render.bind(this),300);
						var a = getAvailableList(), b = [], c, d, e = {};
						
						//var rc = w.require('React'), ol = w.require('ChatSidebarOrderedList.react'), tp = this.getSortedList({}, this._numTopFriends);
						//rc.renderComponent(ol({availableUsers:av,isSidebar:this._isSidebar,scrollContainer:this._scrollContainer,topUsers:tp}),this._orderedList);
						
						rocki.lists.sort(sortLists);
						if(a.length > 0){
							a.sort(sortAlpha);
							for(var f = 0, g = rocki.lists.length; f < g; f++){
								if(!rocki.lists[f].member) return setTimeout(this.render.bind(this),300);
								c = a.filter(function(r){ return rocki.lists[f].member.hasOwnProperty(r); });
								if(c.length > 0){
									b.push('<li class="separator" id="' + rocki.lists[f].uid + '" onclick="toggle_list(\'' + rocki.lists[f].uid + '\');"><div class="outer"><div class="inner"><span class="text">' +
										rocki.lists[f].text + ' (' + c.length + ') <a href="#" onclick="change_order(\'' + rocki.lists[f].uid + '\');return false;">+</a> <a href="#" onclick="requireLazy([\'Dialog\'],function(a){new a().setAsyncURL(\'/ajax/choose/?type=friendlist&flid=' + rocki.lists[f].uid + '\').setAutohide(true).show();});return false;">~</a></span><div class="dive"><span class="bar"></span></div></div></div></li>');

									if(util.getItem('toggle' + rocki.lists[f].uid) !== 'true'){
										for(var k = 0, l = c.length; k < l; k++){
											b.push(this._getListItem(c[k]));
											e[c[k]] = 1;
										}
									}
								}
							}
							c = a.filter(function(r){ return !e.hasOwnProperty(r); });
							if(c.length > 0){
								b.push('<li class="separator" onclick="toggle_list(\'other\');"><div class="outer"><div class="inner"><span class="text">' +
									'Other (' + c.length + ')</span><div class="dive"><span class="bar"></span></div></div></div></li>');

								if(util.getItem('toggleother') !== 'true'){
									for(var k = 0, l = c.length; k < l; k++){
										b.push(this._getListItem(c[k]));
									}
								}
							}
							if(settings.Mobile){
								c = av.getAvailableIDs().filter(function(r){ return av.get(r) === av.MOBILE && w.PresencePrivacy.getFriendVisibility(r) !== w.PresencePrivacy.BLACKLISTED; });
								if(c.length > 0){
									b.push('<li class="separator" onclick="toggle_list(\'mobile\');"><div class="outer"><div class="inner"><span class="text">' +
										'Mobile (' + c.length + ')</span><div class="dive"><span class="bar"></span></div></div></div></li>');
	
									if(util.getItem('togglemobile') !== 'true'){
										c.sort(sortAlpha);
										for(var k = 0, l = c.length; k < l; k++){
											b.push(this._getListItem(c[k]));
										}
									}
								}
							}
						}else{
							b.push('<div style="padding:10px;">No friends online.</div>');
						}
						if(b.length > 0){
							var ul = this._root.firstChild;
							ul.innerHTML = '';
							for(var s = 0, t = b.length; s < t; s++){
								if(typeof b[s] === 'string'){
									ul.innerHTML += b[s];
								}else{
									ul.appendChild(b[s]);
								}
							}
							this.inform('render',{},this.BEHAVIOR_PERSISTENT);
							console.log('Chat rendered');
						}
					}.bind(this),300,false);
					this.render();
				}.bind(c.orderedList);

				w.Arbiter.subscribe('sidebar/show',function(a,d){
					d.hide();
					c.show();
				});

				tl.createInstance(c.root).setSticky(settings.Sticky);

				c.orderedList.scrollTo = function(){ return false; };

				c.orderedList._arbiter.subscribe('render',function(){
					c.label.innerHTML =
						c.root.querySelector('div.titlebarTextWrapper').innerHTML =
							'Chat (' + getAvailableList().length + ')';
				});		

				sp.fetchAll();

				//var menu = d.querySelector('div.fbNubFlyout div.fbNubFlyoutTitlebar ul.uiMenuInner');
				//menu.innerHTML = '<li data-label="Manage Lists" class="uiMenuItem"><a aria-checked="false" href="/bookmarks/lists" tabindex="-1" class="itemAnchor"><span class="itemLabel fsm">Manage Lists</span></a></li>' + menu.innerHTML;

				util.setItem('togglemobile',true);

				if(w.ChatVisibility.isOnline() && settings.Onload) c.show();
			});
		},

		'getflid':function(){
			var a = new ajax('/ajax/typeahead/first_degree.php?__a=1&filter[0]=friendlist&lazy=0&viewer=' + w.Env.user + '&__user=' + w.Env.user);
			a.send('GET',null,function(b){
				var typeahead = eval('(' + b.responseText.substr(9) + ')');
				if(!!typeahead.payload){
					this.lists = typeahead.payload.entries;
					this.getmember();
				}
			}.bind(this));
		},

		'getmember':function(){
			var regex = /\\?"(\d+)\\?":1/g, a;
			for(var i = 0, j = this.lists.length; i < j; i++){
				a = new ajax('/ajax/choose/?type=friendlist&flid=' + this.lists[i].uid + '&view=all&__a=1&__d=1&__user=' + w.Env.user);
				a.send('GET',null,function(b,c){
					var d; this.lists[c].member = {};
					while(d = regex.exec(b.responseText)){
						this.lists[c].member[d[1]] = 1;
					}
				}.bind(this,a.XMLHttpRequest,i));
			}
		}
	};

	if(w && w.Arbiter){
		util.insertRule('\
		.fbDock {\
		margin:' + settings.Margin + '!important;\
		}\
		#fbDockChatBuddylistNub {\
		width:' + settings.Width + '!important;\
		}\
		.fbNubFlyout {\
		min-height:' + settings.MinHeight + '!important;\
		}\
		.fbChatOrderedList .separator {\
			float: left;\
			width: 100%;\
		}\
		.fbChatOrderedList .separator {\
			-moz-user-select: none;\
			display: table;\
			height: 32px;\
		}\
		.fbChatOrderedList .separator .outer {\
			display: table-cell;\
			vertical-align: middle;\
		}\
		.fbChatOrderedList .separator .outer .inner {\
			cursor: pointer;\
			position: relative;\
			text-align: center;\
			top: -50%;\
			z-index: 1;\
		}\
		.fbChatOrderedList .separator .text {\
			background-color: #FFFFFF;\
			color: #989DB3;\
			display: inline-block;\
			font-size: 10px;\
			font-weight: bold;\
			padding: 0 5px;\
			text-transform: uppercase;\
		}\
		.fbChatOrderedList .separator .dive {\
			left: 0;\
			position: absolute;\
			top: 50%;\
			width: 100%;\
			z-index: -1;\
		}\
		.fbChatOrderedList .separator .dive .bar {\
			border-bottom: 2px solid #CCD0DA;\
			display: block;\
			margin: 0 5px;\
		}\
		.__42fz {\
			float: left;\
			width: 100%;\
		}\
		.__55ln {\
			color: #333333;\
			display: block;\
			height: 28px;\
			line-height: 28px;\
			padding: 2px 8px 2px 5px;\
			position: relative;\
		}\
		.__55lp {\
			position: relative;\
		}\
		.__56p9 {\
			float: left;\
			height: 28px;\
			position: relative;\
			width: 28px;\
		}\
		.__5bon {\
			float: right;\
			line-height: 24px;\
			margin: 0 4px;\
			text-align: right;\
		}\
		.__568z {\
			display: inline-block;\
		}\
		.__5t35 {\
			color: #A8A8A8;\
			display: inline-block;\
			font-size: 9px;\
			font-weight: bold;\
			line-height: 12px;\
			text-shadow: none;\
			vertical-align: middle;\
		}\
		.__5t35 {\
			color: #63A924;\
			font-weight: 500;\
		}\
		._sp_9ot619 {\
			background-image: url("/rsrc.php/v2/ye/r/hKjn1vT0PpA.png");\
			background-repeat: no-repeat;\
			background-size: auto auto;\
			display: inline-block;\
			height: 16px;\
			width: 16px;\
		}\
		._sx_1b221c {\
			background-position: -210px -367px;\
			height: 7px;\
			width: 7px;\
		}\
		.__55lr {\
			overflow: hidden;\
			padding-left: 8px;\
			text-overflow: ellipsis;\
			white-space: nowrap;\
		}\
		._sp_axfrm8 {\
			background-position: -213px -384px;\
			background-image: url("/rsrc.php/v2/yQ/r/5Hl1VnbYk4m.png");\
			background-repeat: no-repeat;\
			background-size: auto auto;\
			display: inline-block;\
			height: 11px;\
			width: 7px;\
		}\
		');

		rocki.DOMContentLoaded();
		rocki.getflid();
	}
});