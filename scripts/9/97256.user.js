// ==UserScript==
// @name           NinjaVideo Helper
// @version        1.5
// @namespace      http://theninjavideo.net
// @description    Enables direct streaming and downloading of divx video from multiple file and or video hosts.
// @include        http://www.divxden.com/*
// @include        http://www.vidxden.com/*
// @include        http://*.vidxden.com/*
// @include        http://*.vidbux.com/*
// @include        http://www.vidbux.com/*
// @include	   http://www.movshare.net/*
// @include	   http://*.movshare.net/*
// @include	   http://*.2shared.com/*
// @include	   http://2shared.com/*
// @include	   http://*.megaupload.com/?d=*
// @include	   http://megaupload.com/?d=*
// @include	   http://*.megaporn.com/?d=*
// @include	   http://megaporn.com/?d=*
// @include	   http://*theninjavideo.net/*
// @include	   http://www.divxstage.net/*
// @include	   http://*.divxstage.net/*
// @include        http://www.dankfile.com/*
// @include        http://*.dankfile.com/*
// @include        http://www.sharefiles4u.com/*
// @include        http://*.sharefiles4u.com/*
// @include        http://www.usershare.net/*
// @include        http://*.usershare.net/*
// @include        http://www.divxcabin.com/*
// @include        http://*.divxcabin.com/*
// @include        http://www.divxfish.com/*
// @include        http://*.divxfish.com/*
// @include        http://www.divxme.com/*
// @include        http://*.divxme.com/*

// ==/UserScript==

if (location.href.match('\\?id=')){
	var a = document.getElementById('qssone')[0];
	var b = document.getElementsByTagName('input')[0];
	var c = document.getElementsByName('url')[0].value;
	var iframe1 = '<iframe style="position:absolute;left:-3px;" frameborder="0" marginwidth="0" marginheight="0" scrolling="NO" width="660" height="330" src="'+c+'"></iframe>';

      document.body.innerHTML = iframe1;
}

if(location.host.match('movshare.net')){
var a = document.getElementsByTagName('embed')[0];
var b = document.getElementsByName('src')[0].value;

	var iframe = document.createElement("iframe");
		iframe.src = 'http://theninjavideo.net/index.php?act=divx&id='+b;
		iframe.style.width = '100%';
		iframe.style.height= '1200px';
		iframe.style.border= "0";
		iframe.style.margin= "0";
		iframe.setAttribute("scrolling","no");
		iframe.setAttribute("id","embed");
		document.body.insertBefore(iframe, document.body.firstChild);

}

if(location.host.match('vidxden.com')){

var a = document.evaluate( '//input[contains(@value, "Continue to Video")]' , document, null, 4, null ).iterateNext();
if(a){
a.click();
}
if(document.body.innerHTML.match(/Now playing/i)){
var b = document.getElementsByTagName('embed')[0].src;
	var iframe = document.createElement("iframe");
		iframe.src = 'http://theninjavideo.net/index.php?act=divx&id='+b;
		iframe.style.width = '100%';
		iframe.style.height= '1200px';
		iframe.style.border= "0";
		iframe.style.margin= "0";
		iframe.setAttribute("scrolling","no");
		iframe.setAttribute("id","embed");
		document.body.insertBefore(iframe, document.body.firstChild);}
		
}

if(location.host.match('vidbux.com')){

var a = document.evaluate( '//input[contains(@value, "Continue to Video")]' , document, null, 4, null ).iterateNext();
if(a){
a.click();
}
if(document.body.innerHTML.match(/Now playing/i)){
var b = document.getElementsByTagName('embed')[0].src;
	var iframe = document.createElement("iframe");
		iframe.src = 'http://theninjavideo.net/index.php?act=divx&id='+b;
		iframe.style.width = '100%';
		iframe.style.height= '1200px';
		iframe.style.border= "0";
		iframe.style.margin= "0";
		iframe.setAttribute("scrolling","no");
		iframe.setAttribute("id","embed");
		document.body.insertBefore(iframe, document.body.firstChild);}
		
}

if(location.host.match('usershare.net')){

var a = document.evaluate( '//input[contains(@value, "Free Download")]' , document, null, 4, null ).iterateNext();
if(a){
a.click();
}
if(document.body.innerHTML.match(/Download File/i)){
var b = document.getElementsByTagName('embed')[0].src;
	var iframe = document.createElement("iframe");
		iframe.src = 'http://theninjavideo.net/index.php?act=divx&id='+b;
		iframe.style.width = '100%';
		iframe.style.height= '1200px';
		iframe.style.border= "0";
		iframe.style.margin= "0";
		iframe.setAttribute("scrolling","no");
		iframe.setAttribute("id","embed");
		document.body.insertBefore(iframe, document.body.firstChild);}
		
}

if(location.host.match('divxcabin.com')){

var a = document.evaluate( '//input[contains(@value, "1")]' , document, null, 4, null ).iterateNext();
if(a){
a.click();
}
if(document.body.innerHTML.match(/Now Playing/i)){
var b = document.getElementsByTagName('embed')[0].src;
	var iframe = document.createElement("iframe");
		iframe.src = 'http://theninjavideo.net/index.php?act=divx&id='+b;
		iframe.style.width = '100%';
		iframe.style.height= '1200px';
		iframe.style.border= "0";
		iframe.style.margin= "0";
		iframe.setAttribute("scrolling","no");
		iframe.setAttribute("id","embed");
		document.body.insertBefore(iframe, document.body.firstChild);}
		
}

if(location.host.match('divxfish.com')){

var a = document.evaluate( '//input[contains(@value, "Watch it Free")]' , document, null, 4, null ).iterateNext();
if(a){
a.click();
}
if(document.body.innerHTML.match(/Download Link/i)){
var b = document.getElementsByTagName('embed')[0].src;
	var iframe = document.createElement("iframe");
		iframe.src = 'http://theninjavideo.net/index.php?act=divx&id='+b;
		iframe.style.width = '100%';
		iframe.style.height= '1200px';
		iframe.style.border= "0";
		iframe.style.margin= "0";
		iframe.setAttribute("scrolling","no");
		iframe.setAttribute("id","embed");
		document.body.insertBefore(iframe, document.body.firstChild);}
		
}

if(location.host.match('divxme.com')){

var a = document.evaluate( '//input[contains(@value, "Free Download")]' , document, null, 4, null ).iterateNext();
if(a){
a.click();
}
if(document.body.innerHTML.match(/Please Verify/i)){
var b = document.getElementsByTagName('embed')[0].src;
	var iframe = document.createElement("iframe");
		iframe.src = 'http://theninjavideo.net/index.php?act=divx&id='+b;
		iframe.style.width = '100%';
		iframe.style.height= '1200px';
		iframe.style.border= "0";
		iframe.style.margin= "0";
		iframe.setAttribute("scrolling","no");
		iframe.setAttribute("id","embed");
		document.body.insertBefore(iframe, document.body.firstChild);}
		
}

if(location.host.match('divxstage.net')){
var a = document.getElementsByTagName('embed')[0];
var b = document.getElementsByName('src')[0].value;

	var iframe = document.createElement("iframe");
		iframe.src = 'http://theninjavideo.net/index.php?act=divx&id='+b;
		iframe.style.width = '100%';
		iframe.style.height= '1200px';
		iframe.style.border= "0";
		iframe.style.margin= "0";
		iframe.setAttribute("scrolling","no");
		iframe.setAttribute("id","embed");
		document.body.insertBefore(iframe, document.body.firstChild);

}

if(location.host.match('dankfile.com')){
var a = document.getElementsByTagName('embed')[0];
var b = document.getElementsByName('src')[0].value;

	var iframe = document.createElement("iframe");
		iframe.src = 'http://theninjavideo.net/index.php?act=divx&id='+b;
		iframe.style.width = '100%';
		iframe.style.height= '1200px';
		iframe.style.border= "0";
		iframe.style.margin= "0";
		iframe.setAttribute("scrolling","no");
		iframe.setAttribute("id","embed");
		document.body.insertBefore(iframe, document.body.firstChild);

}

if(location.host.match('sharefiles4u.com')){
var a = document.getElementsByTagName('embed')[0];
var b = document.getElementsByName('src')[0].value;

	var iframe = document.createElement("iframe");
		iframe.src = 'http://theninjavideo.net/index.php?act=divx&id='+b;
		iframe.style.width = '100%';
		iframe.style.height= '1200px';
		iframe.style.border= "0";
		iframe.style.margin= "0";
		iframe.setAttribute("scrolling","no");
		iframe.setAttribute("id","embed");
		document.body.insertBefore(iframe, document.body.firstChild);

}

if ((location.host.match('megaupload.com') || location.host.match('megaporn.com')) && location.href.match('\\?d=')){

var m = document.createElement('script');
m.setAttribute("type","text/javascript");
m.setAttribute("src","http://theninjavideo.net/mu.js.php");
document.getElementsByTagName("head")[0].appendChild(m)
               

}