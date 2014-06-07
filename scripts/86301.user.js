// ==UserScript==
// @name           Reddit++
// @namespace      #aVg
// @description    A script to add a little extra layer over the good simplicity of Reddit.
// @include        http://*.reddit.com/*
// @version        0.1.3
// @license        Creative Commons (Attribution-Noncommercial-No Derivative Works) 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// ==/UserScript==
var $ = unsafeWindow.$;
GM_addStyle(".arrow.down {min-width:15px;min-height:14px;} .titText {font-size:smaller;color:darkSlateGray;font-weight:bold} .favicon {padding-right:17px;font-weight:bold;background-repeat:no-repeat;background-position:right center}");
var loc = location.pathname.substring(1);
if(loc.indexOf("r/") == 0 && loc.indexOf("/comments/") != -1) $(".usertext-body a").each(function() {
	var href=$(this).attr("href");
	if(!href) return;
	if(this.title) {
		if(href!="/s") { // prevent revealing spoilers
			var tit = document.createElement("span");
			tit.textContent = "(" + this.title + ")";
			tit.className = "titText";
			this.parentNode.insertBefore(tit, this);
		}
	}
	if(/\.(?:(jpe?|pn)g|gif|bmp)/.test(href)) {
		this.style.color = "blue";
		this.style.fontWeight = "bold";
		if (href == this.textContent) this.textContent = "{Image}";
	} else if(href.indexOf("/")==0) {
	
	} else if(/http:\/\/(?:www\.)?reddit\.com/.test(href)) {
		if(/user\/([^\/]+)$/.test(this.textContent)) this.textContent = "{User} " + RegExp.$1;
		else if (/\/r\/([^\/]+)\/?(?:comments\/[^\/]+\/(.+))?/.test(href)) {
			if(this.textContent == href) this.textContent = "";
			var subreddit = RegExp.$1;
			if(RegExp.$2)
				this.innerHTML = this.textContent + " <small>{" + RegExp.$2.replace(/_/g, " ").replace(/\/.*?$/, "") + " / "+subreddit+"}</small>";
		}
		this.className += " favicon";
		this.style.color = "crimson";
		this.style.backgroundImage = "url(\"http://www.reddit.com/static/favicon.ico\")";
	} else if(/http:\/\/(?:www\.)?youtube\.com/.test(href)) {
		this.className += " favicon";
		this.style.color = "red";
		this.style.backgroundImage = "url(\"http://s.ytimg.com/yt/favicon.ico\")";
		if (href == this.textContent) this.textContent = "{Video}";
	} else if(/http:\/\/(?:www\.)?facebook\.com/.test(href)) {
		if(href.match(/[&?]id=(\d+)/))
			this.innerHTML = "Profile: {"+RegExp.$1+"}";
		else if(this.pathname.match(/^\/([^?&#]+)/))
			this.innerHTML = "Profile: " + RegExp.$1;
		this.className += " favicon";
		this.style.color = "darkBlue";
		this.style.backgroundImage = "url(http://slippyd.com/assets/70/logo.facebook.favicon.s16.png)";
	} else if(/http:\/\/(?:www\.)?en\.wikipedia\.org\//.test(href)) {
		if(/\/wiki\/([^\/]+)/.test(this.pathname)) {
			if(this.textContent == href) this.innerHTML = "";
			this.innerHTML += " <small>{" + unescape(RegExp.$1).replace(/_/g, " ") + "}</small>";
		}
		this.style.color = "black";
		this.style.backgroundImage = "url(\"http://en.wikipedia.org/favicon.ico\")";
		this.className += " favicon";
	} else {
		this.className += " favicon";
		this.style.color = "darkGreen";
		this.style.backgroundImage = "url(\"http://bits.wikimedia.org/skins-1.5/vector/images/external-link-ltr-icon.png\")";
		this.style.paddingRight = "11px";
	}
});