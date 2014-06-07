// ==UserScript==
// @name           RateMyBody Enlarge Thumbnails
// @namespace      http://userscripts.org/users/23652
// @description    Shows large pics on hover. Also preloads extra pics so no delay exists when you view them
// @include        http://*.ratemybody.com/*
// @copyright      JoeSimmons
// @version        1.0.3
// @license        http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// @require        http://usocheckup.redirectme.net/64646.js
// @grant          GM_getValue
// @grant          GM_log
// @grant          GM_openInTab
// @grant          GM_registerMenuCommand
// @grant          GM_setValue
// @grant          GM_xmlhttpRequest
// ==/UserScript==

var unsafeWindow = unsafeWindow || window.wrappedJSObject || window;

if(unsafeWindow.frameElement != null) return;

// Get ID
function $(ID,root) {return (root||document).getElementById(ID);}

// Define GM_addStyle if it's not Firefox
var GM_addStyle = function(css) {
        var head = document.getElementsByTagName('head')[0], style = document.createElement('style');
        if(head) {
        style.type = 'text/css';
        try {style.innerHTML = css} catch(x) {style.innerText = css}
        head.appendChild(style);
		}
    };

// Created by avg, modified by JoeSimmons
function create(a,b,c) {
	var ret=document.createElement(a.toLowerCase());
	if(b) for(var prop in b) if(prop.indexOf("on")==0) ret.addEventListener(prop.substring(2),b[prop],false);
		else if(",style,accesskey,id,name,src,href".indexOf(","+prop.toLowerCase())!=-1) ret.setAttribute(prop.toLowerCase(), b[prop]);
		else ret[prop]=b[prop];
	if(c) for(var i=0,l=c.length; i<l; i++) ret.appendChild(c[i]);
	return ret;
}

// Hide by JoeSimmons
// Syntax: hide('gbar');
function hide(e) {
	var node=(typeof e=='string')?$(e):((typeof e=='object')?e:false);
	if(node) node.style.display='none';
}

function show(e, x, tag) {
	var pop=$("picPop"), img=$("picPopImg"),
		top = getPosition(e)[0]<(window.innerHeight/2),
		left = getPosition(e)[1]<(window.innerWidth/2);
	if(left) x=window.innerWidth-(x+10);
	img.style.maxHeight = (window.innerHeight-8)+"px";
	img.style.maxWidth = (x-20)+"px";
	img.src = tag=="img"?(size.test(e.src)?hq(e, tag):e):hq(e, tag);
	//info((!top?"Top":"Bottom")+" "+(!left?"Left":"Right")+"<br>Image: "+getPosition(e)[1]+"x"+getPosition(e)[0]+"<br>Window: "+window.innerWidth+"x"+window.innerHeight);
	pop.style.top = top?"":"0";
	pop.style.bottom = top?"0":"";
	pop.style.right = left?"0":"";
	pop.style.left = left?"":"0";
	pop.style.display="";
}

// getPosition by JoeSimmons
function getPosition(e) {
	var top=0, left=0;
	do {
		top += e.offsetTop;
		left += e.offsetLeft;
	} while(e=e.offsetParent);
	return new Array(top, left);
}

function hq(e, tag) {
	var r="";
	switch(tag) {
		case "div": r=e.getAttribute("style").match(ispic)[0].replace(size,""); break;
		case "img": r=e.src.replace(size,""); break;
	}
	return r;
}

function info(i) {
	var info=$("infoBox");
	info.style.display="inline";
	info.innerHTML = i;
}

GM_addStyle("#picPop {border: 3px double #666666; z-index: 9999; position: fixed; background: #FFFFFF; overflow: hidden;}");

var delay=250, size=/_thumb/, ispic=/https?:\/\/(www\.)?ratemybody\.com\/(mainPics|extraPics)\/\w+\/\w+\/.+_thumb\.(jpe?g|[tg]iff?|bmp|png)/, show_d;

document.body.appendChild(create("span", {style:"border:1px solid #666666;position:fixed;top:0;left:45%;font:11px arial;background:#fff;color:#000;padding:2px;width:100px;z-index:9999999;display:none;",id:"infoBox"}));

document.body.appendChild(create("div", {id:"picPop",style:"display: none;"}, new Array(
create("img", {id:"picPopImg"})
)));

window.addEventListener("mouseover", function(e) {
	var t=e.target, tag=t.tagName.toLowerCase(), src=tag=="img"?unescape(t.src):(tag=="div"?t.getAttribute("style"):"");
	if((tag=="img" || tag=="div") && ispic.test(src)) {
		new Image().src = hq(t, tag);
		show(t, Math.round(e.clientX), tag);
		//show_d=window.setTimeout(show, delay, t, Math.round(e.clientX), tag);
	}
}, false);

window.addEventListener("mouseout", function(e) {
	//window.clearTimeout(show_d);
	hide("picPop");
	$("picPopImg").src="";
}, false);

window.addEventListener("click", function(){
	hide("picPop");
	$("picPopImg").src="";
}, false);

// preload extra pics
var extraPics=document.evaluate(".//img[contains(@src, '_thumb.')]", $("dlExtraPhotos"), null, 6, null);
for(var i=0,item1; (item1=extraPics.snapshotItem(i)); i++) new Image().src = item1.src.replace(size,"");

// preload latest members banner
var banner=document.evaluate(".//img[contains(@src, '_thumb.')]", $("banner_wrapper"), null, 6, null);
for(var x=0,item2; (item2=banner.snapshotItem(x)); x++) new Image().src = item2.src.replace(size,"");