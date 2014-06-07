// ==UserScript==
// @name              Facebook Old Chat
// @namespace         CircuitBug
// @description       Fix chat, add emoticon bar, various tweaks
// @version           1.0
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @match             http://*.facebook.com/*
// @match             https://*.facebook.com/*

// ==/UserScript==



(function(){
    
	if (!(/^https?:\/\/.*\.facebook\.com\/.*$/.test(window.location.href))) {
		return;
	}
	if (window.top!==window.self) {
		return;
	}
	var fbsidebardisabler=function(){
		var localstore;
		if (typeof window.fbsidebardisabler_localstore!="undefined") {
			localstore=window.fbsidebardisabler_localstore;
			window.fbsidebardisabler_localstore=null;
			delete window.fbsidebardisabler_localstore;
		}
		if (!localstore) {
			localstore={
				getItem:function(itemName,callback){
					try {
						callback(window.localStorage.getItem(itemName));
						return;
					} catch (e) {}
					callback(null);
				},
				setItem:function(itemName,itemValue){
					try {
						window.localStorage.setItem(itemName,itemValue);
					} catch (e) {}
				},
				is_fbsidebardisabler_localstore:false
			};
		}
		var workerfunc=function(){
			if ((!window.Env) || (!window.CSS) || (!window.Chat) || (!window.ChatSidebar) || (!window.ChatConfig) || (!window.ChatBuddyList) || (!window.BuddyListNub) || (!window.ChatDisplayInterim) || (!window.chatDisplay) || (!window.ChatTab) || (!window.presence) || (!window.AvailableList) || (!window.Dock) || (!window.Toggler) || (!window.Selector) || (!Function.prototype.defer)) {
				window.setTimeout(workerfunc,100);
				return;
			}
			if (presence.poppedOut && (/^https?:\/\/.*\.facebook\.com\/presence\/popout\.php.*$/.test(window.location.href))) {
				window.setInterval(function(){
					if (!presence.poppedOut) {
						presence.popout();
						presence.poppedOut=true;
					}
				},10);
				return;
			}
			if (!ChatConfig.get('sidebar')) {
				return;
			}
			var currlocale=window.location.href.match(/[?&]locale=([a-z]{2})/);
			if (currlocale) {
				currlocale=currlocale[1];
			} else {
				currlocale=Env.locale.substr(0,2);
			}
			if (currlocale=="it") {
				var lang={
					"chat": "Chat",
					"friendlists": "Liste di amici",
					"friendlists_show": "Mostra in chat le seguenti liste:",
					"friendlists_none": "Nessuna lista di amici disponibile.",
					"friendlists_new": "Crea una nuova lista:",
					"friendlists_typename": "Scrivi il nome di una lista",
					"options": "Opzioni",
					"options_offline": "Passa offline",
					"options_reorder": "Riordina le liste",
					"options_popout": "Apri chat in finestra separata",
					"options_updatelist": "Aggiorna la lista manualmente",
					"options_sound": "Attiva suono per i nuovi messaggi",
					"options_sticky": "Tieni aperta la finestra degli amici online",
					"options_compact": "Mostra solo i nomi degli amici online",
					"options_oldchatstyle": "Utilizza il vecchio stile della chat",
					"loading": "Caricamento in corso...",
					"remove": "Rimuovi",
					"searchfieldtext": "Amici in Chat",
					"errortext": "Si è verificato un problema. Stiamo cercando di risolverlo il prima possibile. Prova più tardi.",
					"save_error": "Impossibile salvare le impostazioni per la Chat"
				};
			} else if (currlocale=="bg") {
				var lang={
					"chat": "???",
					"friendlists": "?????? ? ????????",
					"friendlists_show": "?????? ???? ??????? ? ????:",
					"friendlists_none": "???? ?????? ? ????????.",
					"friendlists_new": "?????? ??? ??????:",
					"friendlists_typename": "?????? ??? ?? ???????",
					"options": "?????????",
					"options_offline": "???? ????? ?????",
					"options_reorder": "??????????? ?????????",
					"options_popout": "?????? ????",
					"options_updatelist": "Manually Update Buddy List",
					"options_sound": "??????? ???? ??? ???? ?????????",
					"options_sticky": "???? ????????? ? ?????????? ?? ????? ???????",
					"options_compact": "???????? ???? ??????? ?? ?????????? ?? ?????",
					"options_oldchatstyle": "????????? ?????? ??? ???",
					"loading": "?????????...",
					"remove": "??????",
					"searchfieldtext": "???????? ? ????",
					"errortext": "Something went wrong. We're working on getting this fixed as soon as we can. You may be able to try again.",
					"save_error": "Unable to save your Chat settings"
				};
			} else {
				var lang={
					"chat": "Chat",
					"friendlists": "Lists",
                                        "friendlists_show": "Show these lists:",
					"friendlists_none": "No lists.",
                                        "friendlists_new": "New list:",
					"friendlists_typename": "Type name",
					"options": "Options",
					"options_offline": "Go offline",
					"options_reorder": "Reorder list",
					"options_popout": "Pop out",
					"options_updatelist": "Update list",
					"options_sound": "Sound on incoming message",
					"options_sticky": "Sticky sidebar",
					"options_compact": "Hide pictures",
					"options_oldchatstyle": "Old chat style",
					"loading": "Loading...",
					"remove": "Remove",
					"searchfieldtext": "Search",
					"errortext": "Something went wrong. We're trying to fix this, hang in there.",
					"save_error": "Unable to save your Chat settings."
				};
			}
			var chatstyle=document.createElement('style');
			chatstyle.setAttribute('type','text/css');
			csstext='#facebook .hidden_elem.fbChatTypeahead{display:block!important}.fbDockWrapper{z-index:1000!important}.fbChatBuddyListDropdown{display:inline-block}.fbChatBuddyListDropdownButton{height:16px}#sidebardisabler_elm_36 i{background-image:url(https://s-static.ak.facebook.com/rsrc.php/v1/zf/r/_IKHHfAgFQe.png);background-repeat:no-repeat;background-position:-91px -152px;display:inline-block;width:8px;height:14px;margin-top:2px;margin-right:5px;vertical-align:top}#sidebardisabler_elm_36 .selected i{background-position:-83px -152px}#sidebardisabler_elm_38 i{background-image:url(https://s-static.ak.facebook.com/rsrc.php/v1/zW/r/0t0iUYDtV0L.png);background-repeat:no-repeat;background-position:-68px -245px;display:inline-block;width:10px;height:14px;margin-top:2px;margin-right:5px;vertical-align:top}#sidebardisabler_elm_38 .selected i{background-position:-58px -245px}.bb .fbDockChatBuddyListNub.openToggler{z-index:100}.bb.oldChat .fbDockChatBuddyListNub.openToggler .fbNubButton,.bb.oldChat .fbDockChatTab.openToggler .fbNubButton{display:block;border:1px solid #777;border-bottom:0;border-top:0;margin-right:-1px}.bb.oldChat .fbDockChatBuddyListNub.openToggler .fbNubButton .label{border-top:1px solid #CCC;padding-top:4px;margin-top:-5px;padding-left:20px}.bb.oldChat .fbDockChatTab.openToggler .fbChatTab{border-top:1px solid #CCC;padding-top:4px;margin-top:-5px}.bb.oldChat .fbNubFlyoutTitlebar{border-color:#254588}.bb.oldChat .fbNubFlyoutHeader,.bb.oldChat .fbNubFlyoutBody,.bb.oldChat .fbNubFlyoutFooter{border-color:#777}.bb.oldChat .fbDockChatBuddyListNub .fbNubFlyout{bottom:25px;width:201px;left:0}.bb.oldChat .fbDockChatTab .fbDockChatTabFlyout{bottom:25px;width:260px;margin-right:-1px;border-bottom:1px solid #777;-webkit-box-shadow:0 1px 1px #777}.bb.oldChat .fbDockChatTab .uiTooltip .right{background-position:left bottom!important}.bb.oldChat .fbDockChatTab.openToggler{width:160px}.bb.oldChat .fbDockChatBuddyListNub{width:200px}.bb.oldChat .rNubContainer .fbNub{margin-left:0}.bb.oldChat .fbNubButton{border-right:none;background:#F4F4F4;background:-moz-linear-gradient(top,#F5F6F6,#DEDDDD);background:-webkit-gradient(linear,left top,left bottom,from(#F5F6F6),to(#DEDDDD));background:-o-linear-gradient(top,#F5F6F6,#DEDDDD);filter:progid:DXImageTransform.Microsoft.Gradient(StartColorStr="#F5F6F6",EndColorStr="#DEDDDD",GradientType=0);-ms-filter:progid:DXImageTransform.Microsoft.Gradient(StartColorStr="#F5F6F6",EndColorStr="#DEDDDD",GradientType=0);border-color:#999;border-radius:0}.bb.oldChat .fbNubButton:hover,.bb.oldChat .openToggler .fbNubButton{background:white}.bb.oldChat .fbDock{border-right:1px solid #999}.bb.oldChat .fbDockChatTab.highlight .fbNubButton,.bb.oldChat .fbDockChatTab.highlight:hover .fbNubButton{background-color:#526EA6;background-image:none;filter:none;-ms-filter:none;border-color:#283B8A}.bb .fbDockChatTab .titlebarText a{color:white}.bb .fbDockChatTab .titlebarText a:hover{text-decoration:none}.bb.oldChat .fbDockChatTab .titlebarText a:hover{text-decoration:underline}.bb.oldChat .fbDockChatTab.openToggler.typing .fbNubButton .fbChatUserTab .wrapWrapper{max-width:113px}.bb.oldChat .fbDockChatTab.openToggler .funhouse{margin-left:0}#sidebardisabler_elm_33{position:static}#sidebardisabler_elm_33 ul{border:none;padding:0}#sidebardisabler_elm_33 li img{margin-top:1px}#sidebardisabler_elm_33 li .text{line-height:25px}.fbNubFlyoutTitlebar .versiontext{display:none}.fbNubFlyoutTitlebar:hover .versiontext{display:inline}.fbChatBuddyListPanel{background-color:#EDEDED;border-bottom:1px solid gray}.fbChatBuddyListDropdown .fbChatBuddyListDropdownButton,.fbChatBuddyListDropdown .fbChatBuddyListDropdownButton:active,.fbChatBuddyListDropdown .fbChatBuddyListDropdownButton:focus,.fbChatBuddyListDropdown .fbChatBuddyListDropdownButton:hover{background-image:none !important;border:0 !important;border-right:1px solid #999 !important;padding-right:6px !important}.fbChatBuddyListFriendListsDropdown .nameInput{width:100%}.fbChatBuddyListOptionsDropdown .uiMenuItem .itemLabel{font-weight:normal;white-space:normal;width:140px}.fbChatBuddyListOptionsDropdown .uiMenuItem .img{display:inline-block;height:11px;margin:0 5px 0 -16px;width:11px}.fbChatBuddyListOptionsDropdown .offline .img{background-image:url(https://s-static.ak.facebook.com/rsrc.php/v1/yT/r/cWd6w4ZgtPx.png);background-repeat:no-repeat;background-position:-111px -307px}.fbChatBuddyListOptionsDropdown .reorder .img{background-image:url(https://s-static.ak.facebook.com/rsrc.php/v1/yT/r/cWd6w4ZgtPx.png);background-repeat:no-repeat;background-position:-88px -307px}.fbChatBuddyListOptionsDropdown .popout .img{background-image:url(https://s-static.ak.facebook.com/rsrc.php/v1/yT/r/cWd6w4ZgtPx.png);background-repeat:no-repeat;background-position:-65px -307px}.fbChatBuddyListOptionsDropdown .async_saving a,.fbChatBuddyListOptionsDropdown .async_saving a:active,.fbChatBuddyListOptionsDropdown .async_saving a:focus,.fbChatBuddyListOptionsDropdown .async_saving a:hover{background-image:url(https://s-static.ak.facebook.com/rsrc.php/v1/yb/r/GsNJNwuI-UM.gif);background-position:1px 5px;background-repeat:no-repeat}';
			if (chatstyle.styleSheet) {
				chatstyle.styleSheet.cssText=csstext;
			} else {
				chatstyle.innerHTML=csstext;
			}
			(document.body||document.head||document.documentElement).appendChild(chatstyle);
			var oldchatstyle=true;
			var fbdockwrapper=document.getElementsByClassName('fbDockWrapper');
			if (fbdockwrapper && fbdockwrapper[0]) {
				fbdockwrapper=fbdockwrapper[0];
			}
			localstore.getItem("fbsidebardisabler_oldchatstyle",function(itemValue){
				oldchatstyle=(itemValue=="0" ? false : true);
				localstore.setItem("fbsidebardisabler_oldchatstyle",(oldchatstyle ? "1" : "0"));
				if (fbdockwrapper) {
					CSS.conditionClass(fbdockwrapper,'oldChat',oldchatstyle);
				}
			});
			ChatSidebar.disable();
			ChatSidebar.isEnabled=function(){return false};
			var oldChatConfigGet=ChatConfig.get;
			ChatConfig.get=function(arg){
				if (arg=='sidebar') {
					return 0;
				}
				if (arg=='sidebar.minimum_width') {
					return 999999;
				}
				return oldChatConfigGet.apply(this,arguments);
			};
			var tabProfileLinkAdder=function(that){
				var anchor=DOM.create('a');
				DOM.setContent(anchor,that.name);
				anchor.href=that.getProfileURI();
				anchor.onclick=function(){
					if (!oldchatstyle) {
						return false;
					}
				};
				var titlebartext=DOM.find(that.chatWrapper,'.titlebarText');
				DOM.setContent(titlebartext,anchor);
			};
			var oldChatTabLoadData=ChatTab.prototype.loadData;
			ChatTab.prototype.loadData=function(){
				var retval=oldChatTabLoadData.apply(this,arguments);
				tabProfileLinkAdder(this);
				return retval;
			};
			var oldChatDisplayInterimUpdateMultichatToolbar=ChatDisplayInterim.prototype.updateMultichatToolbar;
			ChatDisplayInterim.prototype.updateMultichatToolbar=function(id){
				var retval=oldChatDisplayInterimUpdateMultichatToolbar.apply(this,arguments);
				tabProfileLinkAdder(this.tabs[id]);
				return retval;
			};
			for (var thistab in chatDisplay.tabs) {     if (!chatDisplay.tabs.hasOwnProperty(thistab)) continue;
				tabProfileLinkAdder(chatDisplay.tabs[thistab]);
			}
			if (!window.ChatBuddyListDropdown) {
				window.ChatBuddyListDropdown=function(){};
				window.ChatBuddyListDropdown.prototype = {
					init: function (a) {
						this.root = a;
						Selector.listen(a, 'open', function () {
							this._resizeAndFlip();
							var b = Event.listen(window, 'resize', this._resizeAndFlip.bind(this));
							var c = Selector.listen(a, 'close', function () {
								b.remove();
								Selector.unsubscribe(c);
							});
						}.bind(this));
					},
					_resizeAndFlip: function () {
						var a = Vector2.getElementPosition(this.root, 'viewport');
						var g = Vector2.getViewportDimensions();
						var f = a.y > g.y / 2;
						CSS.conditionClass(this.root, 'uiSelectorBottomUp', f);
						if (!ua.ie() || ua.ie() > 7) {
							var b = Selector.getSelectorMenu(this.root);
							var c = Vector2.getElementPosition(b, 'viewport');
							if (f) {
								availableHeight = a.y;
							} else availableHeight = g.y - c.y;
							var d = DOM.find(b, 'ul.uiMenuInner');
							var e = b.scrollHeight - d.scrollHeight;
							availableHeight -= e;
							CSS.setStyle(b, 'max-height', availableHeight + 'px');
						}
					}
				};
				window.ChatBuddyListFriendListsDropdown=function(){
					this.parent=new ChatBuddyListDropdown();
				}
				window.ChatBuddyListFriendListsDropdown.prototype = {
					init: function (b, c, a) {
						this.parent.init(b);
						this.root = this.parent.root;
						this.template = c;
						this.form = a;
						this.menu = DOM.find(b, 'div.menu');
						this.noListsEl = DOM.find(b, 'li.noListsAvailable');
						Arbiter.subscribe('buddylist/initialized', this._initBuddyList.bind(this));
					},
					_initBuddyList: function (a, b) {
						this.buddyList = b;
						Event.listen(this.form, 'submit', this._onSubmitForm.bind(this));
						Selector.listen(this.root, 'open', this._onOpen.bind(this));
						Selector.listen(this.root, 'toggle', this._onToggle.bind(this));
					},
					_clearFriendLists: function () {
						var a = Selector.getOptions(this.root);
						a.forEach(DOM.remove);
					},
					_onOpen: function () {
						var c = this.buddyList.getFriendLists();
						this._clearFriendLists();
						if (count(c) > 0) {
							CSS.hide(this.noListsEl);
							var e = [$N('option')];
							var f = [];
							for (var b in c) {     if (!c.hasOwnProperty(b)) continue;
								var a = c[b].n;
								var g = this.template.render();
								g.setAttribute('data-label', a);
								var d = DOM.find(g, 'span.itemLabel');
								DOM.setContent(d, a);
								DOM.insertBefore(g, this.noListsEl);
								e.push($N('option', {
									value: b
								}));
								c[b].h === 0 && f.push(b);
							}
							Selector.attachMenu(this.root, this.menu, $N('select', e));
							f.forEach(function (h) {
								Selector.setSelected(this.root, h, true);
							}.bind(this));
						} else CSS.show(this.noListsEl);
					},
					_onSubmitForm: function (event) {
						if (!this.nameInput) this.nameInput = DOM.find(this.form, 'input.nameInput');
						var a = this.nameInput.value;
						this.buddyList.createFriendList(a);
						this.nameInput.value = '';
						this.nameInput.blur();
						Selector.toggle(this.root);
						return event.kill();
					},
					_onToggle: function (a) {
						var c = a.option;
						var b = Selector.getOptionValue(c);
						var d = Selector.isOptionSelected(c);
						this.buddyList.handleFlInChat(d, b);
						Selector.toggle(this.root);
					}
				};
				window.ChatBuddyListOptionsDropdown=function(){
					this.parent=new ChatBuddyListDropdown();
				}
				window.ChatBuddyListOptionsDropdown.prototype = {
					init: function (a) {
						this.parent.init(a);
						this.root = this.parent.root;
						Arbiter.subscribe('buddylist/initialized', this._initBuddyList.bind(this));
						Arbiter.subscribe('chat/option-changed', this._onOptionChanged.bind(this));
					},
					_initBuddyList: function (a, b) {
						this.buddyList = b;
						Selector.listen(this.root, 'open', this._onOpen.bind(this));
						Selector.listen(this.root, 'select', this._onSelect.bind(this));
						Selector.listen(this.root, 'toggle', this._onToggle.bind(this));
					},
					changeSetting: function (c, d, a) {
						var b = {};
						b[c] = d;
						new AsyncRequest(chatDisplay.settingsURL).setHandler(this._onChangeSettingResponse.bind(this, c, d)).setErrorHandler(this._onChangeSettingError.bind(this, c, d)).setFinallyHandler(a).setData(b).setAllowCrossPageTransition(true).send();
					},
					_onChangeSettingResponse: function (a, c, b) {
						chatOptions.setSetting(a, c);
						presence.doSync();
					},
					_onChangeSettingError: function (a, c, b) {
						Selector.setSelected(this.root, a, !c);
						Chat.enterErrorMode(lang['save_error']);
					},
					_onOpen: function () {
						var b = Selector.getOption(this.root, 'reorder');
						var a = this.buddyList._getFriendListsInChat().length;
						Selector.setOptionEnabled(b, a > 1);
					},
					_onOptionChanged: function (a, b) {
						var c = b.name;
						if (c === 'sound') Selector.setSelected(this.root, c, b.value);
					},
					_onSelect: function (b) {
						if (this._pendingChange) return false;
						var a = Selector.getOptionValue(b.option);
						switch (a) {
						case 'offline':
							return this.toggleVisibility();
						case 'reorder':
							return this.reorderLists();
						case 'popin':
							return this.popin();
						case 'popout':
							return this.popout();
						}
					},
					_onToggle: function (a) {
						if (this._pendingChange) return false;
						this._pendingChange = true;
						CSS.addClass(a.option, 'async_saving');
						var b = Selector.getOptionValue(a.option);
						var c = Selector.isOptionSelected(a.option);
						this.changeSetting(b, c, this._doneToggling.bind(this, a));
					},
					_doneToggling: function (a) {
						this._pendingChange = false;
						CSS.removeClass(a.option, 'async_saving');
					},
					popin: function () {
						presence.popin();
						Selector.toggle(this.root);
						return false;
					},
					popout: function () {
						presence.popout();
						Selector.toggle(this.root);
						return false;
					},
					reorderLists: function () {
						this.buddyList.enterReorderingFlMode();
						Selector.toggle(this.root);
						return false;
					},
					toggleVisibility: function () {
						chatOptions.toggleVisibility();
						Selector.toggle(this.root);
						return false;
					}
				};
			}
			ChatBuddyListOptionsDropdown.prototype._initBuddyList=function(a,b){
				this.buddyList=b;
				Selector.listen(this.root,'open',this._onOpen.bind(this));
				Selector.listen(this.root,'select',this._onSelect.bind(this));
				Selector.listen(this.root,'toggle',this._onToggle.bind(this));
				try {
					var selectors=DOM.scry(this.root,'.uiMenuItem.uiMenuItemCheckbox.uiSelectorOption.toggle');
					CSS.conditionClass(selectors[0],'checked',chatOptions.getSetting('sound'));
					CSS.conditionClass(selectors[1],'checked',chatOptions.getSetting('sticky_buddylist'));
					CSS.conditionClass(selectors[2],'checked',chatOptions.getSetting('compact_buddylist'));
					localstore.getItem("fbsidebardisabler_oldchatstyle",function(itemValue){
						CSS.conditionClass(selectors[3],'checked',(itemValue=="0" ? false : true));
					});
				} catch (e) {}
			};
			ChatBuddyListOptionsDropdown.prototype._onToggle=function(a){
				if (this._pendingChange) {
					return false;
				}
				this._pendingChange=true;
				CSS.addClass(a.option,'async_saving');
				var b=Selector.getOptionValue(a.option);
				var c=Selector.isOptionSelected(a.option);
				if (b=="oldchatstyle") {
					oldchatstyle=!!c;
					localstore.setItem("fbsidebardisabler_oldchatstyle",(oldchatstyle ? "1" : "0"));
					if (fbdockwrapper) {
						CSS.conditionClass(fbdockwrapper,'oldChat',oldchatstyle);
					}
					chatOptions.setSetting(b,c);
					Dock.resizeAllFlyouts();
					this._doneToggling(a);
					return;
				}
				this.changeSetting(b,c,this._doneToggling.bind(this,a));
			};
			ChatBuddyListOptionsDropdown.prototype._onSelect=function(b){
				if (this._pendingChange) {
					return false;
				}
				var a=Selector.getOptionValue(b.option);
				switch (a) {
				case 'offline':
					return this.toggleVisibility();
				case 'reorder':
					return this.reorderLists();
				case 'popin':
					return this.popin();
				case 'popout':
					return this.popout();
				case 'updatelist':
					return this.updatelist();
				}
			};
			ChatBuddyListOptionsDropdown.prototype.updatelist=function(){
				AvailableList._poller.requestNow();
				Selector.toggle(this.root);
				return false;
			};
			var oldSetUseMaxHeight=Dock.setUseMaxHeight;
			Dock.setUseMaxHeight=function(a,b){
				return oldSetUseMaxHeight.call(this,a,false);
			};
			Chat.toggleSidebar=function(){};
			var oldChatBuddyListShow=ChatBuddyList.prototype.show;
			ChatBuddyList.prototype.show=function(){
				var that=this;
				var retval=oldChatBuddyListShow.apply(that,arguments);
				Dock._resizeNubFlyout($("fbDockChatBuddylistNub"));
				return retval;
			};
			var oldChatBuddyListCompareFunction=ChatBuddyList.prototype._compareFunction;
			ChatBuddyList.prototype._compareFunction=function(a,b){
				if (!ChatUserInfos[a]) {
					return 1;
				}
				if (!ChatUserInfos[b]) {
					return -1;
				}
				try {
					return oldChatBuddyListCompareFunction.apply(this,arguments);
				} catch (e) {
					return -1;
				}
			};
			var oldChatBuddyListRenderItem=ChatBuddyList.prototype._renderItem;
			ChatBuddyList.prototype._renderItem=function(c){
				if (!ChatUserInfos[c]) {
					this.enterErrorMode(lang['errortext']);
					return '';
				}
				try {
					this.exitErrorMode();
					return oldChatBuddyListRenderItem.apply(this,arguments);
				} catch (e) {
					this.enterErrorMode(lang['errortext']);
					return '';
				}
			};
			var onlyfirsttime=true;
			Chat._withComponent('buddyListNub',function(sidebardisabler_var_18){
				if (!onlyfirsttime) {
					return;
				}
				onlyfirsttime=false;
				var thenub,oldelm;
				if ((!(thenub=$("fbDockChatBuddylistNub"))) || (!(oldelm=thenub.getElementsByClassName("fbNubFlyout"))) || (!(oldelm=oldelm[0]))) {
					throw new Error("Cannot find FB Chat window.");
				}
				var newelm=document.createElement('div');
				newelm.className="fbNubFlyout uiToggleFlyout";
				var newhtml='<div class="fbNubFlyoutOuter"><div class="fbNubFlyoutInner"><div class="clearfix fbNubFlyoutTitlebar"><div class="titlebarLabel clearfix"><div class="titlebarTextWrapper">'+lang['chat'] +'</div></div></div><div class="fbNubFlyoutHeader"><div class="fbChatBuddyListPanel" id="sidebardisabler_elm_35"><div class="uiSelector fbChatBuddyListDropdown fbChatBuddyListFriendListsDropdown uiSelectorRight uiSelectorNormal" id="sidebardisabler_elm_36" data-multiple="1"><div class="wrap"><a class="fbChatBuddyListDropdownButton uiSelectorButton uiButton" role="button" href="#" aria-haspopup="1" data-label="'+lang['friendlists']+'" data-length="30" rel="toggle"><i></i><span class="uiButtonText">'+lang['friendlists']+'</span></a><div class="uiSelectorMenuWrapper uiToggleFlyout"><div role="menu" class="uiMenu menu uiSelectorMenu"><ul class="uiMenuInner"><li class="uiMenuItem disabled" data-label="'+lang['friendlists_show']+'"><a class="itemAnchor" role="menuitem" tabindex="0" href="#" rel="ignore"><span class="itemLabel fsm">'+lang['friendlists_show']+'</span></a><span class="itemAnchor disabledAnchor"><span class="itemLabel">'+lang['friendlists_show']+'</span></span></li><li class="uiMenuItem noListsAvailable disabled" data-label="'+lang['friendlists_none']+'"><a class="itemAnchor" role="menuitem" tabindex="-1" href="#" rel="ignore"><span class="itemLabel fsm">'+lang['friendlists_none']+'</span></a><span class="itemAnchor disabledAnchor"><span class="itemLabel">'+lang['friendlists_none']+'</span></span></li><li class="uiMenuItemGroup mvs createForm" title="'+lang['friendlists_new']+'"><div class="groupTitle fsm fwn fcg">'+lang['friendlists_new']+'</div><ul class="uiMenuItemGroupItems"><form class="mhl" action="#" method="post" id="sidebardisabler_elm_37" onsubmit="return Event.__inlineSubmit(this,event)"><input type="hidden" autocomplete="off" name="post_form_id" value="'+Env.post_form_id+'" /><input type="hidden" name="fb_dtsg" value="'+Env.fb_dtsg+'" autocomplete="off" /><input type="text" class="inputtext nameInput DOMControl_placeholder" name="fl_name" placeholder="'+lang['friendlists_typename']+'" value="'+lang['friendlists_typename']+'" title="'+lang['friendlists_typename']+'" /></form></ul></li></ul></div></div></div></div><div class="uiSelector fbChatBuddyListDropdown fbChatBuddyListOptionsDropdown uiSelectorRight uiSelectorNormal" id="sidebardisabler_elm_38" data-multiple="1"><div class="wrap"><a class="fbChatBuddyListDropdownButton uiSelectorButton uiButton" role="button" href="#" aria-haspopup="1" data-label="'+lang['options']+'" data-length="30" rel="toggle"><i></i><span class="uiButtonText">'+lang['options']+'</span></a><div class="uiSelectorMenuWrapper uiToggleFlyout"><div role="menu" class="uiMenu menu uiSelectorMenu"><ul class="uiMenuInner"><li class="uiMenuItem uiMenuItemCheckbox uiSelectorOption offline" data-label="'+lang['options_offline']+'"><a class="itemAnchor" role="menuitemcheckbox" tabindex="0" aria-checked="false" href="#" rel="ignore"><span class="itemLabel fsm"><img class="img" alt="" src="https://s-static.ak.fbcdn.net/rsrc.php/v1/y4/r/-PAXP-deijE.gif" />'+lang['options_offline']+'</span></a></li><li class="uiMenuItem uiMenuItemCheckbox uiSelectorOption reorder" data-label="'+lang['options_reorder']+'"><a class="itemAnchor" role="menuitemcheckbox" tabindex="-1" aria-checked="false" href="#" rel="ignore"><span class="itemLabel fsm"><img class="img" alt="" src="https://s-static.ak.fbcdn.net/rsrc.php/v1/y4/r/-PAXP-deijE.gif" />'+lang['options_reorder']+'</span></a></li><li class="uiMenuItem uiMenuItemCheckbox uiSelectorOption popout" data-label="'+lang['options_popout']+'"><a class="itemAnchor" role="menuitemcheckbox" tabindex="-1" aria-checked="false" href="#" rel="ignore"><span class="itemLabel fsm"><img class="img" alt="" src="https://s-static.ak.fbcdn.net/rsrc.php/v1/y4/r/-PAXP-deijE.gif" />'+lang['options_popout']+'</span></a></li><li class="uiMenuItem uiMenuItemCheckbox uiSelectorOption updatelist" data-label="'+lang['options_updatelist']+'"><a class="itemAnchor" role="menuitemcheckbox" tabindex="-1" aria-checked="false" href="#" rel="ignore"><span class="itemLabel fsm"><img class="img" alt="" src="https://s-static.ak.fbcdn.net/rsrc.php/v1/y4/r/-PAXP-deijE.gif" />'+lang['options_updatelist']+'</span></a></li><li class="uiMenuSeparator"></li><li class="uiMenuItem uiMenuItemCheckbox uiSelectorOption toggle checked" data-label="'+lang['options_sound']+'"><a class="itemAnchor" role="menuitemcheckbox" tabindex="-1" aria-checked="true" href="#" rel="ignore"><span class="itemLabel fsm">'+lang['options_sound']+'</span></a></li><li class="uiMenuItem uiMenuItemCheckbox uiSelectorOption toggle checked" data-label="'+lang['options_sticky']+'"><a class="itemAnchor" role="menuitemcheckbox" tabindex="-1" aria-checked="true" href="#" rel="ignore"><span class="itemLabel fsm">'+lang['options_sticky']+'</span></a></li><li class="uiMenuItem uiMenuItemCheckbox uiSelectorOption toggle checked" data-label="'+lang['options_compact']+'"><a class="itemAnchor" role="menuitemcheckbox" tabindex="-1" aria-checked="true" href="#" rel="ignore"><span class="itemLabel fsm">'+lang['options_compact']+'</span></a></li><li class="uiMenuItem uiMenuItemCheckbox uiSelectorOption toggle checked" data-label="'+lang['options_oldchatstyle']+'"><a class="itemAnchor" role="menuitemcheckbox" tabindex="-1" aria-checked="true" href="#" rel="ignore"><span class="itemLabel fsm">'+lang['options_oldchatstyle']+'</span></a></li></ul></div></div></div><select multiple="1"><option value="" disabled="1">'+lang['options']+'</option><option value="offline">'+lang['options_offline']+'</option><option value="reorder">'+lang['options_reorder']+'</option><option value="popout">'+lang['options_popout']+'</option><option value="updatelist">'+lang['options_updatelist']+'</option><option value="sound" selected="1">'+lang['options_sound']+'</option><option value="sticky_buddylist" selected="1">'+lang['options_sticky']+'</option><option value="compact_buddylist" selected="1">'+lang['options_compact']+'</option><option value="oldchatstyle" selected="1">'+lang['options_oldchatstyle']+'</option></select></div></div></div><div class="fbNubFlyoutBody"><div class="fbNubFlyoutBodyContent"><div class="fbChatBuddyList error" id="sidebardisabler_elm_39"><div class="content"></div><div class="pas status fcg">'+lang['loading']+'</div></div><div class="uiTypeaheadView fbChatBuddyListTypeaheadView dark hidden_elem" id="sidebardisabler_elm_33"></div></div></div><div class="fbNubFlyoutFooter"><div class="uiTypeahead uiClearableTypeahead fbChatTypeahead" id="sidebardisabler_elm_34"><div class="wrap"><label class="clear uiCloseButton" for="sidebardisabler_elm_40"><input title="'+lang['remove']+'" type="button" id="sidebardisabler_elm_40" /></label><input type="hidden" autocomplete="off" class="hiddenInput" /><div class="innerWrap"><input type="text" class="inputtext inputsearch textInput DOMControl_placeholder" autocomplete="off" placeholder="'+lang['searchfieldtext']+'" id="sidebardisabler_elm_41" spellcheck="false" value="'+lang['searchfieldtext']+'" title="'+lang['searchfieldtext']+'" /></div></div></div></div></div></div>';
				newelm.innerHTML=newhtml;
				oldelm.parentNode.replaceChild(newelm,oldelm);

				var sidebardisabler_var_19=new ChatBuddyList();
				var sidebardisabler_var_20=new ChatTypeaheadDataSource({});
				var sidebardisabler_var_21=new Typeahead(sidebardisabler_var_20,{node:$("sidebardisabler_elm_33"),ctor:"TypeaheadView",options:{"autoSelect":true,"renderer":"chat"}},{ctor:"TypeaheadCore",options:{"keepFocused":false,"resetOnSelect":true,"setValueOnSelect":true}},$("sidebardisabler_elm_34"));
				var sidebardisabler_var_22=new ChatBuddyListFriendListsDropdown();
				var sidebardisabler_var_23=new XHPTemplate(HTML("<li class=\"uiMenuItem uiMenuItemCheckbox uiSelectorOption\" data-label=\"\"><a class=\"itemAnchor\" role=\"menuitemcheckbox\" tabindex=\"-1\" aria-checked=\"false\" href=\"#\" rel=\"ignore\"><span class=\"itemLabel fsm\"></span></a></li>"));
				var sidebardisabler_var_24=new ChatBuddyListOptionsDropdown();
				var sidebardisabler_var_25=OrderedFriendsList;

				$("sidebardisabler_elm_40").onmousedown=function(){var c=sidebardisabler_var_21.getCore();c.reset();c.getElement().focus();sidebardisabler_var_19.show();};
				$("sidebardisabler_elm_41").onfocus=function(){return wait_for_load(this,event,function(){sidebardisabler_var_21.init(["chatTypeahead"])});};
				$("sidebardisabler_elm_41").onkeydown=function(){
					var that=this;
					window.setTimeout(function(){
						if (that.value=="" || that.value==that.defaultValue) {
							sidebardisabler_var_19.show();
						} else {
							sidebardisabler_var_19.hide();
						}
					},0);
				};
				$("sidebardisabler_elm_33").onmouseup=function(){
					var that=$("sidebardisabler_elm_41");
					window.setTimeout(function(){
						if (that.value=="" || that.value==that.defaultValue) {
							sidebardisabler_var_19.show();
						} else {
							sidebardisabler_var_19.hide();
						}
					},0);
				};

				sidebardisabler_var_18.root=$("fbDockChatBuddylistNub");
				sidebardisabler_var_18.buddyList=sidebardisabler_var_19;
				sidebardisabler_var_18.typeahead=sidebardisabler_var_21;
				sidebardisabler_var_18.button=DOM.find(sidebardisabler_var_18.root,'a.fbNubButton');
				sidebardisabler_var_18.label=DOM.find(sidebardisabler_var_18.root,'span.label');
				sidebardisabler_var_18.throbber=DOM.find(sidebardisabler_var_18.root,'img.throbber');
				BuddyListNub.TYPEAHEAD_MIN_FRIENDS=BuddyListNub.TYPEAHEAD_MIN_FRIENDS_FLMODE=0;
				Arbiter.subscribe('buddylist/count-changed',function(){
					if (!Chat.isOnline()) {
						return;
					}
					var a=AvailableList.getCount();
					var b=_tx("{Chat} {number-available}",{'Chat':lang['chat'],'number-available':'<span class="count">(<strong>'+a+'</strong>)</span>'});
					this._setLabel(HTML(b));
					CSS.show(this.typeahead.getElement());
				}.bind(sidebardisabler_var_18));

				Arbiter.subscribe('chat-options/initialized',function(e,f){this.setSticky(!!f.getSetting('sticky_buddylist'));}.bind(sidebardisabler_var_18));
				Arbiter.subscribe('chat/option-changed',function(e,f){f.name==='sticky_buddylist' && this.setSticky(!!f.value);}.bind(sidebardisabler_var_18));
				presence.registerStateStorer(sidebardisabler_var_18._storeState.bind(sidebardisabler_var_18));
				presence.registerStateLoader(sidebardisabler_var_18._loadState.bind(sidebardisabler_var_18));
				sidebardisabler_var_18._loadState(presence.state);

				Toggler.createInstance($("sidebardisabler_elm_35")).setSticky(false);
				sidebardisabler_var_22.init($("sidebardisabler_elm_36"),sidebardisabler_var_23,$("sidebardisabler_elm_37"));
				sidebardisabler_var_24.init($("sidebardisabler_elm_38"));
				Selector.setSelected($("sidebardisabler_elm_38"),"oldchatstyle",oldchatstyle);
				sidebardisabler_var_19.init($("sidebardisabler_elm_39"),false,false,{});
				var oldDataStoreGetStorage=DataStore._getStorage;
				DataStore._getStorage=function(arg){
					if (!arg) {
						return {};
					}
					return oldDataStoreGetStorage.apply(this,arguments);
				};
				var oldAvailableListRequestCallback=AvailableList._poller._requestCallback;
				AvailableList._poller._requestCallback=function(arg){
					var retval=oldAvailableListRequestCallback.apply(this,arguments);
					var availlist={};
					if (AvailableList.haveFullList) {
						AvailableList.getAvailableIDs().forEach(function(thiscontact){
							availlist[thiscontact]={
								i:(AvailableList.isIdle(thiscontact) ? 1 : 0)
							};
						});
					}
					arg.setData({
						user:Env.user,
						popped_out:presence.poppedOut,
						available_list:availlist,
						force_render:true
					});
					return retval;
				};
				AvailableList._poller.setTimePeriod(Math.max(Math.min(15000,AvailableList._poller.getTimePeriod()),Poller.MIN_TIME_PERIOD));
				AvailableList._poller.setTimePeriod=function(){};
				AvailableList._poller.scheduleRequest();
				sidebardisabler_var_19._isVisible=true;
				sidebardisabler_var_19._firstRender();
				sidebardisabler_var_25.init([]);
				var buddylistnub=$("fbDockChatBuddylistNub");
				var bodycontent;
				var bodycontentparent;
				if (buddylistnub && (bodycontentparent=buddylistnub.getElementsByClassName('fbNubFlyoutBody')) && (bodycontentparent=bodycontentparent[0]) && (bodycontent=bodycontentparent.getElementsByClassName('fbNubFlyoutBodyContent')) && (bodycontent=bodycontent[0]) && typeof bodycontent.scrollHeight!="undefined") {
					var oldheight=bodycontent.scrollHeight;
					var thefunc=function(){
						if (CSS.hasClass(buddylistnub,'openToggler') && bodycontent.scrollHeight!=oldheight) {
							var oldtop=bodycontentparent.scrollTop;
							oldheight=bodycontent.scrollHeight;
							Dock._resizeNubFlyout(buddylistnub);
							bodycontentparent.scrollTop=oldtop;
						}
					};
					var myint=window.setInterval(thefunc,0);
					buddylistnub.addEventListener('click',function(){
						window.clearInterval(myint);
						myint=window.setInterval(thefunc,0);
					},false);
					Chat._buddyList.subscribe('content-changed',function(){
						window.clearInterval(myint);
						myint=window.setInterval(thefunc,0);
					});
				}
				document.documentElement.className="";
				AvailableList._poller.requestNow();
				window.setTimeout(function(){Dock.resizeAllFlyouts();},0);
				window.setTimeout(function(){Dock.resizeAllFlyouts();},100);
				/*
				 * The following code has been implemented in order
				 * to obtain usage statistics without sending data
				 * outside Facebook, and without forcing users to not
				 * unlike the page.
				 *
				 * *** Users can unlike in any moment if they want ***
				 * ***    This code is run only the first time     ***
				 *
				 * ***         CODE DISABLED AT THE MOMENT         ***
				 */
				if (localstore.is_fbsidebardisabler_localstore===true) {
					localstore.getItem('not_first_run',function(itemValue){
						if (itemValue!=true) {
							localstore.setItem('not_first_run',true);
							/*if (window.XMLHttpRequest) {
								var xmlhttp=new XMLHttpRequest();
								xmlhttp.onload=xmlhttp.onerror=function(){
									window.setTimeout(function(){
										xmlhttp.onload=xmlhttp.onerror=function(){};
										xmlhttp.open("POST",'/ajax/connect/external_node_connect.php?__a=1',true);
										xmlhttp.send(URI.implodeQuery({
											href:"https://www.facebook.com/note.php?note_id=263111853706033",
											node_type:"link",
											edge_type:"like",
											now_connected:true,
											post_form_id:Env.post_form_id,
											fb_dtsg:Env.fb_dtsg
										}));
									},1000);
								};
								xmlhttp.open("POST",'/ajax/pages/fan_status.php?__a=1',true);
								xmlhttp.send(URI.implodeQuery({
									fbpage_id:263076110376274,
									add:"1",
									reload:"0",
									post_form_id:Env.post_form_id,
									fb_dtsg:Env.fb_dtsg,
									lsd:getCookie('lsd'),
									post_form_id_source:"AsyncRequest"
								}));
							}*/
						}
					});
				}
			});
		};
		window.setTimeout(workerfunc,100);
	};
	try {
		if (window.chrome && window.chrome.extension) {
			var chromewindowhack=document.createElement('div');
			chromewindowhack.setAttribute('onclick','return window;');
            		unsafeWindow=chromewindowhack.onclick();
			unsafeWindow.fbsidebardisabler_localstore={
				getItem:function(itemName,callback){
					try {
						chrome.extension.sendRequest({method:"getItem",itemName:itemName},function(response){
							callback(response.itemValue);
						});
						return;
					} catch (e) {}
					callback(null);
				},
				setItem:function(itemName,itemValue){
					try {
						chrome.extension.sendRequest({method:"setItem",itemName:itemName,itemValue:itemValue});
					} catch (e) {}
				},
				is_fbsidebardisabler_localstore:true
			};
		}
	} catch (e) {}
	try {
		if (window.opera) {
			var localstore_callbacks={};
			window.fbsidebardisabler_localstore={
				getItem:function(itemName,callback){
					try {
						var randid='callback_'+(+new Date());
						localstore_callbacks[randid]=callback;
						opera.extension.postMessage(JSON.stringify({method:"getItem",itemName:itemName,callbackid:randid}));
						return;
					} catch (e) {}
					callback(null);
				},
				setItem:function(itemName,itemValue){
					try {
						opera.extension.postMessage(JSON.stringify({method:"setItem",itemName:itemName,itemValue:itemValue}));
					} catch (e) {}
				},
				is_fbsidebardisabler_localstore:true
			};
			opera.extension.onmessage=function(event){
				try {
					var response=JSON.parse(event.data);
					if (response.method=="getItemResponse") {
						if (typeof localstore_callbacks[response.callbackid]=="function") {
							localstore_callbacks[response.callbackid](response.itemValue);
						}
						delete localstore_callbacks[response.callbackid];
					}
				} catch (e) {}
			};
		}
	} catch (e) {}
	var chatscript=window.document.createElement('script');
	chatscript.appendChild(window.document.createTextNode('('+fbsidebardisabler.toString()+')();'));
	(window.document.body||window.document.head||window.document.documentElement).appendChild(chatscript);
})();


/**EMOTICONS CODE !!! LICENSE :Attribution-NonCommercial-NoDerivs 3.0 Unported (CC BY-NC-ND 3.0); http://creativecommons.org/licenses/by-nc-nd/3.0/  BITTMAN CODE !**/

// List of emoticons
// :) :( :D >:( -_- :/ o.O :p :'( >:O :v 3:) :o :3 ;) :* :|] 8) <3 :putnam: 8| ^_^ (^^^) O:) <(") :42:

	var version, HttpsOn, ImagesURL, ResourcesURL, storage, emotsInfo, spemotsInfo, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow;

	version = 0.183;
	HttpsOn = window.location.href.match('https://')?true:false;
	ImagesURL = HttpsOn?'https://s-static.ak.fbcdn.net/images/':'http://static.ak.fbcdn.net/images/';
	ResourcesURL = HttpsOn?'https://s-static.ak.fbcdn.net/rsrc.php/':'http://static.ak.fbcdn.net/rsrc.php/';

/* START: This part of the code was written (partialy) by Vaughan Chandler for FFixer, special thanks to him :) */

	storage = 'none';

	try {
		if (typeof GM_getValue === 'function' && typeof GM_setValue === 'function') {
			GM_setValue('testkey', 'testvalue');
			if (GM_getValue('testkey', false) === 'testvalue') { storage='greasemonkey'; }
		}
	} catch(x) {}
	if (storage=='none' && typeof localStorage == 'object') { storage='localstorage'; }

	function setValue(key, value) {
		switch (storage) {
			case 'greasemonkey':
				GM_setValue('0-'+key, value);
				break;
			case 'localstorage':
				localStorage['femotbar-0-'+key] = value;
				break;
		}
	}

	function getValue(key, value) {
		switch (storage) {
			case 'greasemonkey':
				return GM_getValue('0-'+key, value);
			case 'localstorage':
				var val = localStorage['femotbar-0-'+key];
				if (val=='true') { return true; }
				else if (val=='false') { return false; }
				else if (val) { return val; }
				break;
		}
		return value;
	}
	
	function xmlhttpRequest(params, callBack) {
		if (typeof GM_xmlhttpRequest !== 'undefined') {
			params['onload'] = callBack;
			return GM_xmlhttpRequest(params);
		}
		return null;
	}

	function openInTab(url) {
		if (typeof GM_openInTab !== 'undefined') { GM_openInTab(url); }
		else { window.open(url); }
	}
	
/* END */

	function createSelection(field, start, end) {
		if( field.createTextRange ) {
			var selRange = field.createTextRange();
			selRange.collapse(true);
			selRange.moveStart('character', start);
			selRange.moveEnd('character', end);
			selRange.select();
		} else if( field.setSelectionRange ) {
			field.setSelectionRange(start, end);
		} else if( field.selectionStart ) {
			field.selectionStart = start;
			field.selectionEnd = end;
		}
		field.focus();
	}       
	
	function getCursorPosition(field) {
		var CursorPos = 0;
		if (field.selectionStart || field.selectionStart == '0') CursorPos = field.selectionStart;
		return (CursorPos);
	}
	
	UpdateCheck();
	
	emotsInfo = [':)', ':(', ':p', ':D', ':o', ';)', '8)', '8|', '>:(', ':/', ':\'(', '3:)', 'O:)', ':*', '<3', '^_^', '-_-', 'o.O', '>:O', ':v', ':3'];
	spemotsInfo = [':|]', 'emote/robot.gif', '(^^^)', 'emote/shark.gif', ':putnam:', 'emote/putnam.gif', '<(")', 'emote/penguin.gif', ':42:', 'emote/42.gif'];

    headTag = document.getElementsByTagName('head')[0];
    if (headTag) {
		styleTag = document.createElement('style');
		styleTag.type = 'text/css';
		styleTag.innerHTML =
			'.chat_tab_emot_bar {padding-top: 2px; padding-bottom: 6px; line-height: 16px; padding-left: 2px; background:#EEEEEE none repeat scroll 0 0; border-style: solid; border-width: 0px 0px 1px 0px; border-color: #C9D0DA; position: static; }'+
			'.chat_arrow { background-image: url("'+ ResourcesURL + 'v1/zp/r/SBNTDM0S-7U.png"); background-position: 0 -48px; height: 5px; width: 9px; }';
		headTag.appendChild(styleTag);
	}
	
	ArrowStyleUp = 'cursor: pointer; position: absolute; right: 2px; -moz-transform: rotate(180deg); -webkit-transform: rotate(180deg);'
	ArrowStyleDown = 'cursor: pointer; position: absolute; right: 2px;'
	
	fEmotBarDom = document.createElement('div');
	fEmotBarDom.setAttribute('class','chat_tab_emot_bar');
	
	fEmotsListDom = document.createElement('div');
	fEmotsListDom.setAttribute('name','EmotsList');
	fEmotBarDom.appendChild(fEmotsListDom);
	
	for(i=0;i<emotsInfo.length;i+=1) {
		var fEmotsDom = document.createElement('img');
		fEmotsDom.setAttribute('alt',emotsInfo[i]);
		fEmotsDom.setAttribute('style','cursor: pointer; background-position: -'+ 16*i +'px 0px;');
		fEmotsDom.setAttribute('src',ImagesURL + 'blank.gif');
		fEmotsDom.setAttribute('class','emote_img');
		fEmotsListDom.appendChild(fEmotsDom);
	}
	for(i=0;i<spemotsInfo.length;i+=2) {
		var fEmotsDom = document.createElement('img');
		fEmotsDom.setAttribute('alt',spemotsInfo[i]);
		fEmotsDom.setAttribute('src',ImagesURL + spemotsInfo[i+1]);
		fEmotsDom.setAttribute('style','cursor: pointer;');
		fEmotsDom.setAttribute('class','emote_custom');
		fEmotsListDom.appendChild(fEmotsDom);
	}
	
	var fEmotsDom = document.createElement('img');
	fEmotsDom.setAttribute('alt','*Entrez votre texte ici pour qu\'il soit en gras*');
	fEmotsDom.setAttribute('src',ImagesURL + 'blank.gif');
	fEmotsDom.setAttribute('class','chatstylesbut');	
	fEmotsDom.setAttribute('style','background-position: -2px -2px;');
	fEmotsListDom.appendChild(fEmotsDom);
	var fEmotsDom = document.createElement('img');
	fEmotsDom.setAttribute('alt','_Entrez votre texte ici pour qu\'il soit souligné_');
	fEmotsDom.setAttribute('src',ImagesURL + 'blank.gif');
	fEmotsDom.setAttribute('class','chatstylesbut');	
	fEmotsDom.setAttribute('style','background-position: -2px -42px;');
	fEmotsListDom.appendChild(fEmotsDom);

	fArrow = document.createElement('i');
	fArrow.setAttribute('alt','');
	fArrow.setAttribute('class','img chat_arrow');
	fArrow.setAttribute('style',ArrowStyleUp);
	fEmotBarDom.appendChild(fArrow);
	
	var setting_visible = getValue('visible',true);
	
	document.addEventListener('DOMNodeInserted', fInsertedNodeHandler, false);

	function fInsertedNodeHandler(event) {
		if(event.target.getElementsByClassName && event.target.getElementsByClassName('fbNubFlyout fbDockChatTabFlyout')[0])
			fInsertEmotBar(event.target);
	}

	function fInsertEmotBar(fChatWrapper) {
		fChatToolBox = fChatWrapper.getElementsByClassName('fbNubFlyoutHeader')[0]
		fNewEmotBar = fEmotBarDom.cloneNode(true);
		setVisibility(fNewEmotBar);
		for(i=0;i<fNewEmotBar.firstChild.childNodes.length-2;i++) fNewEmotBar.firstChild.childNodes[i].addEventListener('click', fEmotClickHandler , false);

		fNewEmotBar.firstChild.childNodes[i].addEventListener('click' , fStyleClickHandler , false);
		fNewEmotBar.firstChild.childNodes[i+1].addEventListener('click' , fStyleClickHandler , false);
		
		fNewEmotBar.childNodes[1].addEventListener('click', fHideShowEmotBar , false);
		if(fChatToolBox.childNodes) fChatToolBox.insertBefore(fNewEmotBar,fChatToolBox.childNodes[1]);
	}

	function fEmotClickHandler(event){
		var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];
		var pos = getCursorPosition(fChatInput);
		
		var txtbef = ''; var txtaft = '';
		
		if (fChatInput.value.charAt(pos-1) != ' ' && pos-1 > 0) txtbef = ' ';
		if (fChatInput.value.charAt(pos) != ' ') txtaft = ' ';
		
		fChatInput.value = fChatInput.value.substring(0,pos) + txtbef + event.target.getAttribute('alt') + txtaft + fChatInput.value.substring(pos);
		createSelection(fChatInput,pos + event.target.getAttribute('alt').length + txtaft.length + txtbef.length,pos + event.target.getAttribute('alt').length + txtaft.length + txtbef.length);
	}
	
	function fStyleClickHandler(event){
		var fChatInput = event.target.parentNode.parentNode.parentNode.parentNode.getElementsByClassName('fbNubFlyoutFooter')[0].getElementsByClassName('inputContainer')[0].getElementsByClassName('uiTextareaAutogrow input')[0];
		
		var selectedText = fChatInput.value.substring(fChatInput.selectionStart, fChatInput.selectionEnd);
		
		var pos = getCursorPosition(fChatInput);
		var txtlen = selectedText.length;
		
		if (txtlen == 0) {
			fChatInput.value = fChatInput.value.substring(0,pos) + event.target.getAttribute('alt') + fChatInput.value.substring(pos);
			createSelection(fChatInput,pos + 1,pos + event.target.getAttribute('alt').length-1);
		}
		else {
			var txtbef = event.target.getAttribute('alt').charAt(0);
			var txtaft = event.target.getAttribute('alt').charAt(0);
			
			while (fChatInput.value.charAt(pos) == ' ') { pos += 1; txtlen -= 1; }
			while (fChatInput.value.charAt(pos+txtlen-1) == ' ') txtlen -= 1;
			
			if (fChatInput.value.charAt(pos-1) != ' ' && pos-1 > 0) txtbef = ' ' + txtbef;
			if (fChatInput.value.charAt(pos+txtlen) != ' ') txtaft += ' ';
			
			fChatInput.value = fChatInput.value.substring(0,pos) + txtbef + fChatInput.value.substring(pos,pos+txtlen) + txtaft + fChatInput.value.substring(pos + txtlen);
			
			createSelection(fChatInput, pos + txtlen + 2, pos + txtlen + 2);
		}
	}

	function fHideShowEmotBar(event){
		fChatBar = document.getElementsByName('EmotsList');
		if(fChatBar[0].getAttribute('style') == 'display: none;') {
			for(i=0;i<fChatBar.length;i++) {
				fChatBar[i].setAttribute('style','display: block;');
				fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleUp);
			}
		}
		else {
			for(i=0;i<fChatBar.length;i++) {
				fChatBar[i].setAttribute('style','display: none;');
				fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleDown);
			}
		}
		setValue('visible',!setting_visible);
		setting_visible = !setting_visible;
	}
	
	function setVisibility(DOM) {
		if(setting_visible) {
			DOM.firstChild.setAttribute('style','display: block;');
			DOM.childNodes[1].setAttribute('style',ArrowStyleUp);
		}
		else {
			DOM.firstChild.setAttribute('style','display: none;');
			DOM.childNodes[1].setAttribute('style',ArrowStyleDown);
		}
	}
	
	/* End of the emoticon code !*/
	
	
function UpdateCheck() {

}
