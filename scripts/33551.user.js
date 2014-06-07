// ==UserScript==
// @name           Youtube Persist Worldwide
// @namespace      http://userscripts.org/scripts/show/33551
// @description    Force youtube to search for worldwide contents
// @include        http://*.youtube.com/*
// @include        https://*.youtube.com/*
// @exclude        http://*.youtube.com/user/*
// @exclude        https://*.youtube.com/user/*
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_log
// @grant          GM_xmlhttpRequest
// @grant          GM_deleteValue
// @version        0.7.1
// @author         Burn
// ==/UserScript==

(function(){

	/* avoid starting the script when embedded */
	if(window.self!=window.top)return;

	/* annoying gplus link */
	var wLoc = window.location.toString();
	if(wLoc.indexOf("link_gplus") != -1) {
		window.location = "https://www.youtube.com/";
	}
        /*
	if(wLoc.indexOf("https://") == -1){
		var tmp = wLoc.replace(/http:\/\//,"https://");
		window.location = tmp;
	}
	*/
	const DBG = false; // set to true to enable messages in your JS console
	var cversion = '0.7.1';
	var time = new Date().getTime()+'';
	var getName = window.location.host+'.lastCheck';
	var last_check = GM_getValue(getName);
	if(!last_check) { GM_setValue(getName,time); }

	// check for updates here... code adapted from http://userscripts.org/scripts/show/52398
	var ypwspy = GM_getValue("ypw");
	if (ypwspy == "ok" && (time - last_check > 86400000)) {
		GM_deleteValue("ypw");
		GM_setValue(getName, time);
		GM_xmlhttpRequest({
			method:				"GET",
			url:				"http://userscripts.org/scripts/source/33551.meta.js?sinc="+time,
			headers:			{ Accept:"text/javascript; charset=UTF-8" },
			overrideMimeType:	"application/javascript; charset=UTF-8",
			onload:				function(response) { checkversion(response); }	
		});
	}
	// end updates check

	function ForceWorldwideContents() {
		var lang = document.getElementsByTagName("html")[0].getAttribute("lang");
		lang=(typeof(lang)=='object')?"en":lang.toString();
		if(DBG){GM_log("attribute lang found in tag <html>: !"+lang+"!");}
		var stri = "";
		switch (lang) {case "it": stri = "a livello mondiale";break;case "de":stri = "weltweit";break;case "en":stri = "worldwide";break;case "es":stri = "mundial|en todo el mundo";break;case "fr":stri = "dans le monde entier";break;case "nl":stri = "wereldwijd";break;case "pl":stri = "cały świat";break;case "he":stri = "כלל עולמי (כולם)";break;case "ru":stri = "По всему миру";break;case "bg":stri = "от цял свят";break;case "":default:GM_log('Language not found: ->'+lang+'<-');return false;}
		if(DBG){GM_log("stri: ["+stri+"]");}
	
		//var lis = document.evaluate("//ul[@class='pickers yt-uix-button-group']/li/button/span",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		var lis = document.evaluate("//button[@id='yt-picker-country-button']/span",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
		if(DBG){GM_log("found "+lis.snapshotLength + " nodes");}

		if (lis.snapshotLength == 1) {
			var l = lis.snapshotItem(0);
		} else {
			if(DBG){GM_log("evaluate: node not found");}
			return;
		};
	
	
		var REstri = new RegExp(stri, "gi");
		if(!REstri.test(l.textContent.toLowerCase())) {
			if (DBG){GM_log('REstri ok, textContent found: -' +  l.textContent + '-');} 
			ypwspy = GM_getValue("ypw");
			if(!ypwspy) { GM_setValue("ypw","ok"); }
			redirectWithNewParam('US', 'gl');
		}  else {
			ypwspy = GM_getValue("ypw");
			if(!ypwspy) { GM_setValue("ypw","ok"); }
			if(DBG){GM_log('nothing to do: -' + l.textContent+'-');}
			return;
		}
	}

	// the following functions are taken from youtube.com using Firebug
	function redirectWithNewParam(a,b) {
		var c,d;
		c=window.location.href;
		c=c.split("#");
		d=c.length==2?"#"+c[1]:"";
		c=c[0];
		var e=c.match(/[\?&]\w+=[^&#]*/g), f={};
		if(e) for(var g=0;g<e.length;++g){
			e[g]=e[g].split("=");
			f[e[g][0].substring(1)]=decodeURIComponent(e[g][1].replace(/\+/g,"%20"))
		}
		f[b]=a;
		f["persist_"+b]="1";
		c=c.split("?");
		c=c[0];
		oj(c,f,d);
	}
	var i = null;
	var gd = function (a, b) {
		for (var c in b) {
			var d = c,
				e = b[c],
				f = a;
			if (ea(e)) for (var g = 0; g < e.length; g++) {
				f.push("&", d);
				e[g] !== "" && f.push("=", sa(e[g]))
			} else if (e != i) {
				f.push("&", d);
				e !== "" && f.push("=", sa(e))
			}
		}
		return a
	}, hd = function (a) {
		a = gd([], a);
		a[0] = "";
		return a.join("")
	};
	var id = function (a, b) {
		var c = gd([a], b);
		if (c[1]) {
			var d = c[0],
				e = d.indexOf("#");
			if (e >= 0) {
				c.push(d.substr(e));
				c[0] = d = d.substr(0, e)
			}
			e = d.indexOf("?");
			if (e < 0) c[1] = "?";
			else if (e == d.length - 1) c[1] = undefined
		}
		return c.join("")
	};
	var oj=function(a,b,c) {
		c=c||"";
		/* following code written by Burn */
		var tmp = id(a,b||{})+c;
		xhrRedirect(tmp);
		/* end. */
	};
	var ea=function(a){return da(a)=="array"};
	var sa=function(a){
		a=String(a);
		if(!ra.test(a))return encodeURIComponent(a);
		return a
	};
	var ra=/^[a-zA-Z0-9\-_.!~*'()]*$/;
	var da = function (a) {
		var b = typeof a;
		if (b == "object") if (a) {
			if (a instanceof Array || !(a instanceof Object) && Object.prototype.toString.call(a) == "[object Array]" || typeof a.length == "number" && typeof a.splice != "undefined" && typeof a.propertyIsEnumerable != "undefined" && !a.propertyIsEnumerable("splice")) return "array";
			if (!(a instanceof Object) && (Object.prototype.toString.call(a) == "[object Function]" || typeof a.call != "undefined" && typeof a.propertyIsEnumerable != "undefined" && !a.propertyIsEnumerable("call"))) return "function"
		} else return "null";
		else if (b == "function" && typeof a.call == "undefined") return "object";
		return b
	}

	function xhrRedirect(u) {	
		GM_xmlhttpRequest({
			method:				"GET",
			url:				u,
			headers:			{ Accept:"text/html; charset=UTF-8" },
			overrideMimeType:	"text/html; charset=UTF-8",
			onload:				function(response) {
				var t = response.finalUrl;
				if(DBG){
					GM_log(response.status + " " + response.statusText);
					GM_log(response.responseHeaders);
				}
				response=null;
				if (t && t.toString().indexOf("http://") != -1) {
					t= t.replace(/http:\/\//,"https://");
					if(DBG) {GM_log("new: " + t);}
					window.location = t;
				}
				else {
					u = u.replace("http://","https://");
					u = u.replace(/[\?&]+persist_gl=1/i,"");
					if(DBG) {GM_log("old: " + u);}
					window.location = u;
				}
			}	
		});
	}
	// end youtube functions

	// the following function is taken from http://userscripts.org/scripts/show/52398
	function checkversion(response) {
		var availableVersion = "";
		var TmpStr = "";
		if (response.status == 200) {
		
			var resReg = /\/\/ @version\s+(\d+\.\d+\.\d+)/.exec(response.responseText);
			if (resReg != null) {
			if(DBG) GM_log(typeof(resReg));
				availableVersion = resReg[1];
				if(DBG) GM_log(availableVersion);
			}
		} else {
			if(DBG) GM_log("XHR error: "+response.status + " :end XHR");
			availableVersion = cversion;
			TmpStr += "Updates check failed.";
		}
		if (availableVersion!=cversion) {
			TmpStr += "<a style='display:block' title='Click here to update Youtube Persist Worldwide now!' href='http://userscripts.org/scripts/source/33551.user.js'>YOUTUBE PERSIST WORLDWIDE<br /><b>CLICK TO INSTALL THE NEW VERSION NOW</b></a>";
			if(DBG) {GM_log(response.responseText);GM_log("New version found: " +availableVersion);}
			if(DBG) GM_log('innerHTML: ' + TmpStr);
			var sp = document.createElement('div');
			sp.setAttribute("id","YPWpopup");
			sp.setAttribute('style','background-color: #FFEEBF;color: #333333;display: block !important;font-size: 8px;left: 17px;padding: 2px 8px;position: absolute;text-align: center;top: 44px;z-index: 1001;');
			sp.innerHTML = TmpStr;
			top.document.body.appendChild(sp);
		}
	}

	function gId(el) {
		return document.getElementById(el) || false;
	}

	if (document.addEventListener) {window.addEventListener("load", ForceWorldwideContents, false);}
	else {window.document.onLoad = ForceWorldwideContents();}

})();
