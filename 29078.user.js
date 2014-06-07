// ==UserScript==
// @name           googlePrivacy
// @namespace      download
// @description    Gets rid of almost every google tracking device I could find.
// @include        http://*.google.com/search?*
// @include        https://*.google.com/search?*
// @include        http://www.google.*
// @include        https://www.google.*
// @include        http://images.google.*
// @include        http://news.google.*
// @include        https://encrypted.google.*
// ==/UserScript==

String.prototype.toObj = function(s) {
	var r = {}, c = this.split('&'), t;
	for(var i = 0; i < c.length; i++) {
		t = c[i].split('=');
		r[decodeURIComponent(t[0])] = decodeURIComponent(t[1]);
	}
	return r;
}
function anchorMatch(a) {
	for(; a; a = a.parentNode) if(a.localName == 'a') return a;
	return null;
}

if(document.title.indexOf("Google News") != -1 || location.pathname.indexOf("/news") == 0) {
	var a=document.querySelectorAll(".title a, .sources a, .source-link a, .additional-article a, .thumbnail a");
	addEventListener("mousedown", function(e) {
		var c = anchorMatch(e.target);
		for(var i = 0; i < a.length; i++) {
			if(c == a[i]) return e.stopPropagation();
		}
	}, true);
} else {
	addEventListener("mousedown", function(e) {
		var a = anchorMatch(e.target);
		if(a && a.localName == "a") {
			var m = a.getAttribute("onmousedown");
			var h = a.getAttribute("href");
			
			if(m && m.indexOf("return") == 0) {
				a.removeAttribute("onmousedown");
			} else if(h) {
				if(h.indexOf("http://") == 0) h = h.substr(h.indexOf("/", 7));
				if(h.indexOf("/url?") == 0) {
					h = h.substr(5).toObj();
					a.setAttribute('href', decodeURIComponent(h.url || h.q));
					a.setAttribute('rel', 'noreferrer');
				}
			}
		}
	}, true);
}

function makeButton(c) {
	var a=document.createElement("div");
	a.textContent=c||"×";
	a.style.height="16px"
	if(!c) {
		a.style.width="16px";
		a.style.font="28px/16px Arial,sans-serif";
	}
	else a.style.font="bold 12px/16px Arial,sans-serif";
	a.style.border="1px solid #a1b9ed";
	a.style.color="#a1b9ed";
	a.style.borderRadius=a.style.MozBorderRadius="2px";
	a.style.cursor="pointer";
	a.style.cssFloat="right";
	a.style.display="inline";
	a.style.marginLeft="10px";
	return a;
}
function AdManager(d,s) {
	var self=this, k;
	this.n="hide"+d;
	this.ad=document.getElementById(d);
	this.sb=makeButton("Show Ads");
	this.sb.style.display="none";
	this.sb.style.zIndex=1001;
	this.sb.addEventListener("click", function() {
		self.show();
	},false);
	this.hb=makeButton();
	this.hb.style.zIndex=1001;
	this.hb.addEventListener("click", function() {
		self.hide();
	},false);
	this.h=document.createElement("div");
	this.h.addEventListener("DOMNodeInserted", function() {
		var a;
		for(var i in s) {
			if(i=="holder") a=self.h;
			else a=self.h.querySelector(i);
			if(!a) continue;
			for(k in s[i]) a.style[k]=s[i][k];
		}
		self.setDisplayed();
	}, false);
	this.h.addEventListener("DOMNodeRemoved", function() {
		self.setDisplayed();
	}, false);
	this.ad.parentNode.replaceChild(this.h, this.ad);
	this.h.appendChild(this.sb);
	this.h.appendChild(this.hb);
	this.h.appendChild(this.ad);
	self.setDisplayed();
}
AdManager.prototype.hide = function() {
	this.sb.style.display="inline";
	this.hb.style.display="none";
	this.ad.style.display="none";
	options[this.n]=true;
}
AdManager.prototype.show = function() {
	this.sb.style.display="none";
	this.hb.style.display="inline";
	this.ad.style.display="inline";
	options[this.n]=false;
}
AdManager.prototype.setDisplayed = function() {
	if(this.ad.children.length == 0) {
		this.sb.style.display="none";
		this.hb.style.display="none";
		this.ad.style.display="none";
	} else {
		if(options[this.n]) this.hide();
		else this.show();
	}
}

var managers = [], options;
try {
	options = JSON.parse(unsafeWindow.localStorage.gpoptions) || {};
} catch(e) {
	options = {};
}
addEventListener('load', function() {
	var a = new AdManager("taw");
	if(options.hidetaw) a.hide();
	managers.push(a);
	a=new AdManager("rhscol",{"holder":{display:"block",position:"absolute",top:"0px",right:"0px"},"#rhs":{width:null,top:"18px"}});
	if(options.hiderhscol) a.hide();
	managers.push(a);
	
	addEventListener("beforeunload", function() {
		unsafeWindow.localStorage.gpoptions=JSON.stringify(options);
	}, false)
}, false);

//Chrome doesn't let us see load event, simulate it.
if(navigator.userAgent.indexOf('Chrome') != -1) {
	var e = document.createEvent('Event');
	e.initEvent('load', false, false);
	dispatchEvent(e);
}