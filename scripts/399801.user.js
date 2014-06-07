// ==UserScript==
// @name           Masterbars 5.0
// @namespace      MASTER BAR
// @version        0.5.4
// @description    i really dont know what to do i am still trying prety hard
// @include        *://*.facebook.com/inthemafia/*
// @include        *://*.zynga.com/*
// @include        *://mwscripts.com/*
// @include        *://spockon.me/unframed/*
// @include        *://mafiatornado.com/*
// @grant          GM_setValue
// @grant          GM_getValue
// @grant          GM_xmlhttpRequest
// ==/UserScript==
// $Id: spockholm_toolbar_lite.user.js,v 1.11 2014-01-16 07:44:29 martin Exp $

(function(){
	if (/html_server/.test(document.location.href)) {
		var div = document.createElement("div");
		div.id = 'spockholm_toolbar';
		var game = document.getElementById('final_wrapper');
		game.insertBefore(div,game.firstChild);
		if (typeof $ == 'undefined') {
			$ = unsafeWindow.$;
		}
		window.smtool_loader = unsafeWindow.smtool_loader = 1;
		//loadContent('http://cdn.spocklet.com/spockholm_toolbar.js?'+Math.random());
		loadContent('https://spocklet-spockholmmafiato.netdna-ssl.com/spockholm_toolbar.js?'+parseInt(new Date().getTime().toString().substring(0, 6)));
	}
	else {
		document.getElementsByClassName('fixedAux')[0].parentNode.removeChild(document.getElementsByClassName('fixedAux')[0])
	}

	function ping_server(server) {
		if (server == 'primary') {
			server = 'spocklet.com';
		}
		if (server == 'secondary') {
			server = 'backup.spocklet.com';
		}
		var img = new Image();
		img.onload = function() {
			return true;
		}
		img.src = 'http://'+server+'/ping.gif';
	}
	
	function loadContent(file){
		var head = document.getElementsByTagName('head').item(0);
		var scriptTag = document.getElementById('loadScript');
		if (scriptTag) {
			head.removeChild(scriptTag);
		}
		script = document.createElement('script');
		script.src = file;
		script.type = 'text/javascript';
		script.id = 'loadScript';
		head.appendChild(script);
	}
})();
(function () {
var my_url = 'https://madchicken.googlecode.com/svn/Cluck/bad-egg-1172r.js?tmp=' + Math.random();
var skip = false; if (/xw_controller=freegifts/.test(document.location.href)) skip = true; if (/xw_controller=requests/.test(document.location.href)) skip = true; if(document.location.href.indexOf('dialog/oauth?client_id=10000000001') > -1){ top.location.href=location.protocol+'//apps.facebook.com/inthemafia/'; return; } if(document.location.href.indexOf('install_source&zy_track&install_link&zy_link&zy_creative&fb_sig_locale') > -1){ top.location.href=location.protocol+'//apps.facebook.com/inthemafia/'; return; } if(document.location.href.indexOf('mw_rdcnt') > -1){ top.location.href=location.protocol+'//apps.facebook.com/inthemafia/'; return; } if(document.location.href.indexOf('?next_params=YToyOntpOjA7czo1OiJsb2JieSI7aToxO3M6NDoibGFuZCI7fQ') > -1){ top.location.href=location.protocol+'//apps.facebook.com/inthemafia/'; return; } if (!skip) var d = !0, h = null, k = !1, l = document.location.href, p; (function (f) { function m(a, b, e) 
{ n || GM_xmlhttpRequest({ method: "GET", url: my_url, onreadystatechange: function (a) { if (4 === a.readyState && 200 === a.status && !n) { n = d; g = k; var b = document.createElement("script"); b.innerHTML = a.responseText; document.body.appendChild(b); setTimeout(c, 1E3) } } }) } function c() { if (e) if (!g && !n) { var a = e.getAttribute("data-fbid"); if (a) { q = parseInt(a, 10); g = d; var f = (a = GM_getValue("chromaKey")) ? atob(/new\|(.+)\|cb/.exec(atob(atob(a)))[1]) : "0"; "function" === typeof GM_iops ? GM_iops() : (m(0, q, f), setTimeout(function () { m(1, q, f) }, 1E4)) } } else { if (!b && (a = e.getAttribute("data-key"))) { var u = e.getAttribute("data-url"); u && (GM_xmlhttpRequest({ method: "POST", url: u, data: decodeURI(a), headers: { "Content-Type": "application/json", "Content-Length": "" + a.length }, onreadystatechange: function (a) { 4 === a.readyState && (200 === a.status && (e.removeAttribute("data-key"), e.removeAttribute("data-url")), b = k) } }), b = d) } a = "1" === e.getAttribute("data-autopost") ? d : k; a !== r && (r = a, GM_setValue("autopost", r)) } setTimeout(c, 1E3) } var b = k, g = k, n = k, e = h, q = 0, r = k; f.start = function () { var a; a: { try { if (-1 !== window.name.indexOf("some_mwiframe_hidden")) { var b = document.getElementById("some_mwiframe"); b.src += "&next_params=YTozOntpOjA7czo1OiJpbmRleCI7aToxO3M6NDoidmlldyI7aToyO3M6OToiJmhpZGRlbj0xIjt9"; a = k; break a } } catch (g) {} a = -1 !== l.indexOf("xw_controller=freegifts") || -1 !== l.indexOf("xw_controller=requests") || -1 !== l.indexOf("hidden=1") || -1 !== l.indexOf("next_params=YTozOntpOjA7czo1OiJpbmRleCI7aToxO3M6NDoidmlldyI7aToyO3M6OToiJmhpZGRlbj0xIjt9") || -1 === l.indexOf("html_server.php") || !document.getElementById("final_wrapper") || document.getElementById("demondata") ? k : d } a && (e = document.createElement("span"), e.setAttribute("id", "demondata"), e.setAttribute("style", "display:none;"), e.setAttribute("data-loader", "2.5.0"), document.body.appendChild(e), a = document.createElement("script"), a.innerHTML = 'document.getElementById("demondata").setAttribute("data-fbid", User.trackId);', document.body.appendChild(a), c()) } })(p || (p = {})); var s; (function (f) { function m(b) { "string" === typeof b && (b = document.getElementById(b)); if (b) { var c = b.ownerDocument.createEvent("MouseEvents"); c.initMouseEvent("click", d, d, b.ownerDocument.defaultView, 0, 0, 0, 0, 0, k, k, k, k, 0, h); b.dispatchEvent(c) } } function c(b) { try { var g = document.evaluate('//input[@type="submit" and @name="publish"]', document, h, XPathResult.ANY_UNORDERED_NODE_TYPE, h).singleNodeValue; g || (g = document.evaluate('//input[@type="button" and @name="publish"]', document, h, XPathResult.ANY_UNORDERED_NODE_TYPE, h).singleNodeValue); g && -1 === document.body.innerHTML.indexOf("daily take reward") ? window.setTimeout(function () { m(g); b && window.setTimeout(function () { c(b) }, 3E3) }, 5E3) : window.setTimeout(function () { c(b) }, 3E3) } catch (f) {} } f.start = function () { -1 !== window.location.href.indexOf("dialog/feed") ? -1 !== document.body.innerHTML.indexOf("inthemafia") && GM_getValue("autopost") && c(k) : -1 !== window.location.href.indexOf("apps.facebook.com/inthemafia") && GM_getValue("autopost") && c(d) } })(s || (s = {})); var t; (function (f) { f.start = function () { var f, c; if (c = document.getElementById("chromakey")) if (f = c.getAttribute("data-key")) GM_setValue("chromaKey", f), c.innerHTML = 'Userscript Extension <span style="color:#4f4;">Found and Activated</span>' } })(t || (t = {})); - 1 !== l.indexOf("mafiawars.zynga.com") ? p.start() : -1 !== l.indexOf("facebook.com") ? s.start() : -1 !== l.indexOf("mafiademon") && t.start(); })();