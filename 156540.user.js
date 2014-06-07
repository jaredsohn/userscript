// ==UserScript==
// @name        Google Images - Easy "Exact Resolution"
// @namespace   http://userscripts.org/users/23652
// @description Adds a button ("Exact") where you can search for your favorite exact resolution in two clicks
// @include     http://*.google.*/search?*&tbm=isch*
// @include     https://*.google.*/search?*&tbm=isch*
// @include     https://google.*/search?*&tbm=isch*
// @version     1.0.2
// @copyright   JoeSimmons
// @license     http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require     http://usocheckup.dune.net/156540.js
// @grant       GM_getValue
// @grant       GM_log
// @grant       GM_openInTab
// @grant       GM_registerMenuCommand
// @grant       GM_setValue
// @grant       GM_xmlhttpRequest
// @grant       GM_addStyle
// ==/UserScript==

(function easy_exact_res() {

// Get ID
function $(ID,root) {return (root||document).getElementById(ID);}

function getWidth() {
	if(window.outerWidth) {
		return window.outerWidth;
	} else if(window.innerWidth) {
       return window.innerWidth;
    } else if(document.documentElement && document.documentElement.clientWidth) {
        return document.documentElement.clientWidth;
    } else if(document.body) {
        return document.body.clientWidth;
    }
    return 0;
}

function getHeight() {
	if(window.outerHeight) {
		return window.outerHeight;
	} else if(window.innerHeight) {
       return window.innerHeight;
    } else if(document.documentElement && document.documentElement.clientHeight) {
        return document.documentElement.clientHeight;
    } else if(document.body) {
        return document.body.clientHeight;
    }
    return 0;
}

// Created by avg, modified by JoeSimmons
function create(a,b,c) {
	if(a=="text") {return document.createTextNode(b);}
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href,type,target".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
	if(c) for(var i=0,l=c.length; i<l; i++) ret.appendChild(c[i]);
	return ret;
}



function main() {
	var tools = $("hdtb_tls"),
		button = create("a", {href:"javascript:void(0);", id:"hdtb_exact", onclick:exact}, [create("text", "Exact")]);
	
	tools.parentNode.insertBefore(button, tools.nextSibling);
}

function exact(e) {

	// Try to Determine screen size
	var w = parseInt(getWidth(), 10), h = (parseInt(getHeight(), 10) + 80), height,
		si, wi, href, size;

	switch(w) {
		case 2560: height = (h > 1080) ? ((h > 1440) ? ((h > 1600) ? ((h > 1920) ? 2048 : 1920) : 1600) : 1440) : 1080; break;
		case 1920: height = (h > 1080) ? 1200 : 1080; break;
		case 1680: height = 1050; break;
		case 1600: height = (h > 900) ? 1024 : 900; break;
		case 1440: height = 900; break;
		case 1280: height = (h > 720) ? ((h > 768) ? ((h > 800) ? ((h > 960) ? 1024 : 960) : 800) : 768) : 720; break;
		case 1268: height = 992; break;
		case 1176: height = 664; break;
		case 1024: height = 768; break;
		case 800: height = 600; break;
		case 720: height = (h > 480) ? 576 : 480; break;
		case 640: height = 480; break;
		default: w = 1920; height = 1080;
	}

	size = prompt("Resolution (form of WIDTHxHEIGHT): ", GM_getValue("size", (w + "x" + height)));
	
	if(typeof size === "string" && /^\d+x\d+$/.test(size)) {
		GM_setValue("size", size);
		si = size.split("x");
		wi = si[0], he = si[1];
		href = window.location.href.toString().replace(/[?&]tbs=[^&]*/i, "");
		
		// Remove hashtag from url
		href = href.replace(/#.+$/, "");
		
		href += "&tbs=isz:ex,iszw:" + wi + ",iszh:" + he;
		window.location.href = href;
	}
}



window.addEventListener("load", main, false);

})();