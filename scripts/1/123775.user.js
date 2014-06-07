// ==UserScript==
// @name           Kaki Like v1.1
// @namespace      KakiLike
// @description    Automaticly like facebook statuses and comments
// @include	   http://www.facebook.com/*
// @include	   https://www.facebook.com/*
// @exclude	   http://developers.facebook.com/*
// @exclude        htt*://*static*.facebook.com*
// @exclude        htt*://*channel*.facebook.com*
// @exclude        htt*://developers.facebook.com/*
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://www.facebook.com/common/blank.html
// @exclude        htt*://*onnect.facebook.com/*
// @exclude        htt*://*acebook.com/connect*
// @exclude        htt*://www.facebook.com/plugins/*
// @exclude        htt*://www.facebook.com/l.php*
// @exclude        htt*://www.facebook.com/ai.php*
// @exclude        htt*://www.facebook.com/extern/*
// @exclude        htt*://www.facebook.com/pagelet/*
// @exclude        htt*://api.facebook.com/static/*
// @exclude        htt*://www.facebook.com/contact_importer/*
// @exclude        htt*://www.facebook.com/ajax/*
// @exclude        htt*://apps.facebook.com/ajax/*
// @exclude	   htt*://www.facebook.com/advertising/*
// @exclude	   htt*://www.facebook.com/ads/*
// @exclude	   htt*://www.facebook.com/sharer/*

//
// copyright amerwafiy
// www.fb.me/amerwafiy
//
//
// ==/UserScript==













// ==============
// ==Statuses==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','kaki4');
	div.style.position = "fixed";
	div.style.bottom = "+124px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoLike()\">Like all statuses</a>"
	
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
// 
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','kaki5');
	div.style.position = "fixed";
	div.style.bottom = "+104px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoUnLike()\">Unlike all Status</a>"
	
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
// ==Expand==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','kaki3');
	div.style.position = "fixed";
	div.style.bottom = "+70px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoExpand()\">Expand comments</a>"
	
	body.appendChild(div);
	
	unsafeWindow.AutoExpand = function() {
	
		buttons = document.getElementsByTagName("input");
		for(i = 0; i < buttons.length; i++) {
			myClass = buttons[i].getAttribute("class");
			if(myClass != null && myClass.indexOf("") >= 0)
				if(buttons[i].getAttribute("name") == "view_all[1]")
					buttons[i].click();
		}
		
	};
}
		
//
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','kaki6');
	div.style.position = "fixed";
	div.style.bottom = "+50px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=\"JavaScript:AutoLikeComments()\">Like all comment    </a>"
	
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
//
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','kaki7');
	div.style.position = "fixed";
	div.style.bottom = "+30px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";
	div.innerHTML = "<a style=\"font-weight:bold;color:#333333;\" href=\"JavaScript:AutoUnLikeComments()\">Unlike all comment</a>"
	
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

// ==Credits==
body = document.body;
if(body != null) {
	div = document.createElement("div");
	div.setAttribute('id','kaki2');
	div.style.position = "fixed";
	div.style.bottom = "+0px";
	div.style.left = "+6px";
	div.style.backgroundColor = "#eceff5";
	div.style.border = "2px solid #94a3c4";
	div.style.padding = "2px";	div.innerHTML = "<a style=\"font-weight:bold;color:#333333\" href=http://www.facebook.com/amerwafiy \"/ copyright amerwafiy © \">copyright amerwafiy</a>"
	
	body.appendChild(div);
}


if(window.opera){
	unsafeWindow = window;
}else if(window.navigator.vendor.match(/Google/)){
	var div = document.createElement('div');
	div.setAttribute('onclick','return window;');
	unsafeWindow = div.onclick();
}

(function(w){
	var d = w.document;

	var util = {
		insertRule:function(rule){
			if(!this.css){
				this.css = d.createElement('style');
				d.querySelector('head').appendChild(this.css);
			}

			return this.css.appendChild(d.createTextNode(rule));
		}
	};

	var rocki = {
		// subscribe internal callbacks
		DOMContentLoaded:function(){
			w.Arbiter.subscribe('chat-options/initialized',function(a,c){
				w.ChatSidebar.isViewportCapable = function(){ return false; };
			});

			w.Arbiter.subscribe('buddylist-nub/initialized',function(a,c){
				w.Toggler.createInstance(c.root).setSticky(true);

				c.buddyList.getSortedList = function(){ return []; };

				c.buddyList._getAvailableList = function(){
					return this._availableList.getAvailableIDs().filter(function(r){
						return this.get(r) !== this.MOBILE;
					}.bind(this._availableList));
				};

				c.buddyList.subscribe('render',function(){
					this.label.innerHTML =
						this.root.querySelector('.titlebarTextWrapper').innerHTML =
							'Chat (<strong>' + this.buddyList._getAvailableList().length + '</strong>)';
				}.bind(c));

				if(c.chatVisibility.isOnline()) c.show();
			});
		}
	};

	if(w && w.Arbiter){
		util.insertRule('.fbDock{margin:0 10px!important;} #fbDockChatBuddylistNub{width:200px!important;} .fbNubFlyout{min-height:0!important;} .item.idle .status{background:url("https://s-static.ak.facebook.com/rsrc.php/v1/y_/r/9YK1jWBK-cC.png") no-repeat -493px -393px!important;}');

		rocki.DOMContentLoaded();
	}

})(unsafeWindow);