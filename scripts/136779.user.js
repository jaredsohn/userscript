// ==UserScript==
// @name           Facebook Auto +++
// @namespace      AutoLike
// @description    Automaticly like facebook statuses and commentsAuto Like terbaru Dari Zeprut, dijamin seru buat para sahabat jempolers!
// @include        http://www.facebook.com/*
// @include        https://www.facebook.com/*
// ==/UserScript==

// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+122px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#23C0D9";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"https://www.facebook.com/groups/355493827819624//\">Join Grup</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoExpand = function() {
	
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("name") == "view_all")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Expand Older Posts==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+102px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.twitter.com/nurdinzeprut\">Follow my twitter @nurdinzeprut</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoExpandPosts = function() {
	
		buttons = document.getElementsByTagName("a");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("lfloat") >= 0)
				if(buttons[i].getAttribute("onclick") == "ProfileStream.getInstance().showMore();return false;")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+72px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoLike()\">Like Smua Kiriman</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "like")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Unlike Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+52px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoUnLike()\">UnLike Smua Kiriman</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoUnLike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "unlike")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Comments==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+22px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#30E80C";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://http://http://www.zeprut-666.blogspot.com/\">Blogger</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLikeComments = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("title") == "Like this comment")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Unlike Comments==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+2px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"http://www.facebook.com/zeprut666\">Zeprut Road</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoUnLikeComments = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("title") == "Unlike this comment")
					buttons[i].click();
		}
		
	};
}
// ==============

//Chat Emoticons Bar

	var Pics, ProfImagesURL, HttpsOn, ImagesURL, ResourcesURL, storage, emotsInfo, spemotsInfo, cusemotsInfo, headTag, styleTag, ArrowStyleUp, ArrowStyleDown, fEmotBarDom, fEmotsListDom, fArrow;

	HttpsOn = window.location.href.match('https://')?true:false;
	ImagesURL = HttpsOn?'https://s-static.ak.fbcdn.net/images/':'http://s-static.ak.fbcdn.net/images/';
	ProfImagesURL = HttpsOn?'https://graph.facebook.com/':'http://graph.facebook.com/';
	Pics = HttpsOn?'/picture':'/picture';
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
	
	emotsInfo = [':)', ':(', ':p', ':D', ':o', ';)', '8)', '8|', '>:(', ':/', ':\'(', '3:)', 'O:)', ':*', '<3', '^_^', '-_-', 'o.O', '>:O', ':v', ':3', '(Y)'];
	spemotsInfo = [':|]', 'emote/robot.gif', '(^^^)', 'emote/shark.gif', ':putnam:', 'emote/putnam.gif', '<(")', 'emote/penguin.gif', ':42:', 'emote/42.gif'];
	cusemotsInfo = ['[[chatmaho]]', 'chatmaho', '[[261896703869655]]', '261896703869655', '[[208810792536042]]', '208810792536042', '[[guengakak]]', 'guengakak', '[[263966766998038]]', '263966766998038', '[[xated]]', 'xated', '[[xatwary]]', 'xatwary', '[[xatmaniac]]', 'xatmaniac', '[[xatrage]]', 'xatrage', '[[xatecool]]', 'xatecool', '[[xathello]]', 'xathello', '[[xatshock]]', 'xatshock', '[[xatpty]]', 'xatpty', '[[xatsmirk]]', 'xatsmirk', '[[xatawe]]', 'xatawe', '[[xatanime]]', 'xatanime', '[[xatredface]]', 'xatredface', '[[xatcomeon]]', 'xatcomeon', '[[xatgoo]]', 'xatgoo', '[[f9.wine]]', 'f9.wine', '[[xatxD]]', 'xatxD', '[[xathehe]]', 'xathehe','[[yahoo]]', 'yahoo', '[[google]]', 'google', '[[facebook]]', 'facebook', '[[kaskus]]', 'kaskus', '[[amazon]]', 'amazon', '[[youtube]]', 'youtube', '[[googlechrome]]', 'googlechrome', '[[opera]]', 'opera', '[[internetexplorer]]', 'internetexplorer', '[[flock]]', 'flock', '[[microsoft]]', 'microsoft', '[[microsoftword]]', 'microsoftword', '[[microsoftpowerpoint]]', 'microsoftpowerpoint', '[[megaxus]]', 'megaxus', '[[grandchase]]', 'grandchase', '[[indovision]]', 'indovision', '[[history]]', 'history', '[[sony]]', 'sony', '[[nokia]]', 'nokia', '[[telkomsel]]', 'telkomsel', '[[windows]]', 'windows', '[[transformer]]', 'transformer', '[[itones]]', 'itones', '[[photosop]]', 'photoshop', '[[334954663181745]]', 'Spongebob', '[[332936966718584]]', 'HelloKitty', '[[326134990738733]]', 'Pikachu', '[[297354436976262]]', 'SantaClaus', '[[269153023141273]]', 'Poring', '[[252497564817075]]', 'Kerokeroppi', '[[144685078974802]]', 'Mojacko', '[[abiehassanudin]]', 'abiehassanudin'];
	
    headTag = document.getElementsByTagName('head')[0];
    if (headTag) {
		styleTag = document.createElement('style');
		styleTag.type = 'text/css';
		styleTag.innerHTML =
			'.chat_tab_emot_bar {padding-top: 2px; padding-bottom: 6px; line-height: 13px; padding-left: 2px; background:#EEEEEE none repeat scroll 0 0; border-style: solid; border-width: 0px 0px 1px 0px; border-color: #C9D0DA; position: static; }'+
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
	for(i=0;i<cusemotsInfo.length;i+=2) {
		var fEmotsDom = document.createElement('img');
		fEmotsDom.setAttribute('alt',cusemotsInfo[i]);
		fEmotsDom.setAttribute('src',ProfImagesURL + cusemotsInfo[i+1] + Pics);
		fEmotsDom.setAttribute('style','cursor: pointer;');
		fEmotsDom.setAttribute('class','emote_custom');
		fEmotsListDom.appendChild(fEmotsDom);
	}
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
		for(i=0;i<fNewEmotBar.firstChild.childNodes.length;i++) fNewEmotBar.firstChild.childNodes[i].addEventListener('click', fEmotClickHandler , false);
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
	
	function fHideShowEmotBar(event){
		fChatBar = document.getElementsByName('EmotsList');
		if(fChatBar[0].getAttribute('style') == 'display: none;') {
			for(i=0;i<fChatBar.length;i++) {
				fChatBar[i].setAttribute('style','display: block;');
				fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleUp);
				fixHeightAndScroll(fChatBar[i]);
			}
		}
		else {
			for(i=0;i<fChatBar.length;i++) {
				fChatBar[i].setAttribute('style','display: none;');
				fChatBar[i].parentNode.childNodes[1].setAttribute('style',ArrowStyleDown);
				fixHeightAndScroll(fChatBar[i]);
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
	
	function fixHeightAndScroll(bar) {
		fChatContainer = bar.parentNode.parentNode.parentNode;
		var oldheight = parseInt(fChatContainer.children[2].style.height.replace("px",""));
		var newheight = 285 - (fChatContainer.children[0].clientHeight + fChatContainer.children[1].clientHeight + fChatContainer.children[3].clientHeight + 1);
		fChatContainer.children[2].style.height = newheight + "px";
		fChatContainer.children[2].scrollTop += oldheight - newheight;
	}

// ==============
// ==Confirm All dan UnConfirm All==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','like7');
	div.style.position = "fixed";
	div.style.display = "block"; 
	div.style.opacity= 0.90;
	div.style.bottom = "+2px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "1px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "&#8226;&nbsp;<a onclick='OtomatisConfirm();' >Confirm All</a>&nbsp; &#8226;&nbsp;<a onclick='OtomatisAbaikan();' >Unconfirm All</a>"
	
	body.appendChild(div);
	//suspend function
	function suspend(milliSeconds){
	var startTime = new Date().getTime(); 
	while (new Date().getTime() < startTime + milliSeconds); 
}
	
	unsafeWindow.OtomatisConfirm = function() {
		var x=document.getElementsByName("actions[accept]"); for (i=0;i<x.length;i++) { x[i].click();}
		};
	
	
	unsafeWindow.OtomatisAbaikan = function() {
			var x=document.getElementsByName("actions[hide]"); for (i=0;i<x.length;i++) { x[i].click();}
			};
}

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
		Mobile:		false,

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
				this.XMLHttpRequest.send(data);
				this.XMLHttpRequest.onreadystatechange = this.stdcallback.bind(this);
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
				var id = 'toggle' + r;
				if(!!w.localStorage.getItem(id)){
					w.localStorage.removeItem(id);
				}else{
					w.localStorage.setItem(id,true);
				}
				w.render_chat();
			};

			w.change_order = function(r){
				var f = d.querySelectorAll('ul.fbChatOrderedList li.separator');
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
				w.Toggler.createInstance(c.root).setSticky(settings.Sticky);

				var av = w.require('AvailableList');

				var getAvailableList = function(){
					return av.getAvailableIDs().filter(function(r){
						switch(av.get(r)){
							case av.ACTIVE: return settings.Online;
							case av.IDLE: return settings.Idle;
							case av.MOBILE: return settings.Mobile;
						}
					});
				};

				var sortLists = function(x,y){
					if(!x.member || !y.member) return 0;
					var r = Number(w.localStorage.getItem('order' + x.uid)),
						s = Number(w.localStorage.getItem('order' + y.uid));
					if(r === s) return 0;
					return r < s ? -1 : 1;
				};

				w.render_chat = c.orderedList.render = function(){
					this.render = w.debounce(function(){
						if(!rocki.lists) return setTimeout(this.render.bind(this),300);
						var a = getAvailableList(), b = [], c, d, e = {};
						rocki.lists.sort(sortLists);
						if(a.length > 0){
							a.sort(this._sortMobile.bind(this));
							for(var f = 0, g = rocki.lists.length; f < g; f++){
								if(!rocki.lists[f].member) return setTimeout(this.render.bind(this),300);
								c = a.filter(function(r){ return rocki.lists[f].member.hasOwnProperty(r); });
								if(c.length > 0){
									b.push('<li class="separator" id="' + rocki.lists[f].uid + '" onclick="toggle_list(\'' + rocki.lists[f].uid + '\');"><div class="outer"><div class="inner"><span class="text">' +
										rocki.lists[f].text + ' (' + c.length + ') <a href="#" onclick="change_order(\'' + rocki.lists[f].uid + '\');return false;">+</a> <a href="#" onclick="requireLazy([\'Dialog\'],function(a){new a().setAsyncURL(\'/ajax/choose/?type=friendlist&flid=' + rocki.lists[f].uid + '\').show();});return false;">~</a></span><div class="dive"><span class="bar"></span></div></div></div></li>');

									if(!!w.localStorage.getItem('toggle' + rocki.lists[f].uid)) continue;

									for(var k = 0, l = c.length; k < l; k++){
										if(d = this._getListItem(c[k])){
											d.setAttribute('onclick','Chat.openTab(' + c[k] + ');');
											w.requireLazy(['ShortProfiles','XHPTemplate'],function(s,t){
												var x = s.getNow(c[k]);
												var y = t.getNode(this._items[c[k]],'timeline_icon');
												if(!!x && !!y){
													y.setAttribute('title','Go to ' + x.firstName + '\'s timeline');
													y.setAttribute('onclick','PageTransitions.go("' + x.uri + '");return false;');
												}
											}.bind(this));
											b.push(d); e[c[k]] = 1;
										}else{
											this._renderListItem(c[k],this.render.bind(this));
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

				c.orderedList.subscribe('render',function(){
					c.label.innerHTML =
						c.root.querySelector('div.titlebarTextWrapper').innerHTML =
							'Chat (<strong>' + c.orderedList._getAvailableList().length + '</strong>)';
				});

				if(w.ChatVisibility.isOnline() && settings.Onload) c.show();

				var menu = d.querySelector('div.fbNubFlyoutTitlebar div.fbChatSidebarDropdown ul.uiMenuInner');
				menu.innerHTML = '<li data-label="Manage Lists" class="uiMenuItem"><a aria-checked="false" href="/bookmarks/lists" tabindex="-1" class="itemAnchor"><span class="itemLabel fsm">Manage Lists</span></a></li>' + menu.innerHTML;

			});
		},

		'getflid':function(){
			if(!w.Env) return setTimeout(this.getflid.bind(this),30);
			var a = new ajax('/ajax/typeahead/first_degree.php?__a=1&filter[0]=friendlist&lazy=0&viewer=' + w.Env.user + '&__user=' + w.Env.user);
			a.send('GET',null,function(b){
				var typeahead = eval('(' + b.responseText.substr(9) + ')');
				if(typeahead.payload){
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


// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+72px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoLike()\">Like AllPost</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoLike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "like")
					buttons[i].click();
		}
		
	};
}
// ==============
// ==Unlike Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.style.position = "fixed";
	div.style.bottom = "+52px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoUnLike()\">UnlikeAll Post</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoUnLike = function() {
	
		buttons = document.getElementsByTagName("button");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("like_link") >= 0)
				if(buttons[i].getAttribute("name") == "unlike")
					buttons[i].click();
		}
		
	};
}
// ==============

