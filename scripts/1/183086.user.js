// ==UserScript==
// @name           Google SSL Privacy Real Link
// @namespace      http://userscripts.org/scripts/show/145014
// @description   Mandatory use encryption connection https. Gets rid of almost every google tracking device. Disable the Google search rewrite, always showing and using the real, original, direct link URLs, also to prevent from using redirected pages that might be temporarily unavailable in some area.
// @include        http://images.google.*/images*
// @include        http://www.google.*/images*
// @include        http://www.google.*/webhp*
// @include        http://www.google.*/search?*
// @include        http://www.google.*/imgres*
// @include        http://images.google.*/search?*
// @include        https://images.google.*/images*
// @include        https://www.google.*/images*
// @include        https://images.google.*/search?*
// @include        http://*.google.*/*
// @include        https://*.google.*/*
// @include        https://*.google.*/webhp*
// @include        http://*.google.com/search?*
// @include        https://*.google.com/search?*
// @include    /^https:\/\/www\.google\.com(\.hk)?\/(#|webhp|search\?)/
// @updateURL      http://userscripts.org/scripts/show/145014
// @downloadURL    http://hi.baidu.com/new/strikewelkin
// @copyright  2012~2022
// @version        1.2
// @author         Strike Welkin
// @run-at         document-start
// @license        MIT license
// ==/UserScript==

document.addEventListener('DOMNodeInserted',checksearch,false);
//var count2=0;
////////////////////
	function checksearch(){
		var list = document.getElementById('ires');
		if(list){
    		document.removeEventListener('DOMNodeInserted',checksearch,false);
			document.addEventListener('DOMNodeInserted',clear,false)
		};
	}

	function clear(){
		//console.log('remove action:',++count2);
		var items = document.querySelectorAll('a[onmousedown]');
		for(var i =0;i<items.length;i++){
    		items[i].removeAttribute('onmousedown');
    	}
	}


;(function() {
    var re = /^http:\/\/www\.google\.com(?:\.hk)?(\/url\?)/;
    document.addEventListener('click', function(e){
        var a = e.target;
        a.href && (a.href = a.href.replace(re, '$1'));
    });
})();


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

function addEventCompatible(obj, evt, fn){
	if (obj.addEventListener) {//W3C
		obj.addEventListener(evt, fn, false);
	} else if (obj.attachEvent) {//IE
		obj.attachEvent("on" + evt, fn);
	}
}
function getWindow(windowObjName) {//works after window[windowObjName] loaded
	if (typeof(unsafeWindow) !== "undefined" && typeof(unsafeWindow[windowObjName]) !== "undefined") {//Greasemonkey
		return unsafeWindow;
	} else if (typeof(window[windowObjName]) !== "undefined") {//Opera, etc.
		return window;
	} else {
		try {//Google Chrome
			var div = document.createElement("div");
			div.setAttribute("onclick", "return window;");
			var windowCompatible = div.onclick();
			if (typeof(windowCompatible[windowObjName]) === "undefined") {
				return false;
			} else {
				return windowCompatible;
			}
		} catch (e) {
			return false;
		}
	}
}
addEventCompatible(window, "load", function() {
	if (getWindow("rwt")) {
		getWindow("rwt").rwt = function () {}
	}
})






var parseUrl = function (url) {
  var qstr = url.split('?')[1];
  var rawparams = qstr.split('&');
  var par = new Array();
  var i;
  for (i=0 ; i<rawparams.length ; i++){
    var p = rawparams[i].split("=");
    par[p[0]] = p[1];
  }
  return par;
}

if (parseUrl(window.location.href)["directLink"]){
  var imglnk = document.getElementsByTagName('a')[2];
  if (imglnk){
    window.location.replace(imglnk.href)
  }
}

var getImageLinks = function (url){
  var param = parseUrl(url);
  var links = new Object();
  links.toImgHref = decodeURIComponent(param["imgurl"]);
  if (param["imgurl"] == undefined){
     links.toImgHref = url+'&directLink=true';
  }
  links.toPageHref = decodeURIComponent(param["imgrefurl"]);
  return links;  
}

String.prototype.endsWith = function(str){
  return ( this.lastIndexOf(str) + str.length ) == this.length;
}

var firstOrNull = function(sequence){
  if(sequence.length > 0)
    return sequence[0];
  else
    return null;
}

var imgTable = firstOrNull(document.getElementsByClassName('images_table'));

if (imgTable) { // for basic version
  var imgCell = imgTable.getElementsByTagName('td');
  for( j=0 ; j<imgCell.length ; j++ ) {
    var imageAnchor = imgCell[j].getElementsByTagName('a')[0];
    var domainText =  imgCell[j].getElementsByTagName('cite')[0];
    
    var links = getImageLinks(imageAnchor.href);

    domainText.innerHTML = '<a href="' + links.toPageHref + '">' + domainText.innerHTML + '/&hellip;<\a>';
    imageAnchor.href = links.toImgHref;
  }
}
else { // standard version

  var stopEvent = function(event){
	  event.stopPropagation()
  }
  
  var nodeHandler = function (event) {
    if(event.target.id!='rg_h') return;
    var domain = document.getElementById('rg_hr');
    var imageAnchor = document.getElementById('rg_hl');
    var links = getImageLinks(imageAnchor.href);

    imageAnchor.href = links.toImgHref;
    imageAnchor.addEventListener("mousedown", stopEvent, false);
    
    if (domain.getElementsByTagName('a').length == 0)
    domain.innerHTML = '<a onmousedown="event.stopPropagation();" ' +
							'style="color:green;" ' + 
							'href="' + links.toPageHref + '">' + domain.innerHTML + '/&hellip;</a>';
  }
  if(navigator.userAgent.indexOf("Firefox")!=-1) {//if firefox
    document.addEventListener("DOMSubtreeModified", nodeHandler, false);
  }
  else{//opera or chrome
    document.addEventListener( 'DOMNodeInserted', nodeHandler, false );
    document.addEventListener( 'DOMNodeRemoved',  nodeHandler, false );
  }
}
