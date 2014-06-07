// ==UserScript==
// @name           DailyDivX V1.5
// @version        April 18, 2012
// @namespace      http://mrbrownee70.com
// @description    Enables direct streaming of videos from multiple file hosts.
// @include        http://*mrbrownee70.com/*
// @include        http://*.dailydivx.es/*
// @include        http://dailydivx.es/*
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
// @include        http://megashares.com/*
// @include        http://*.megashares.com/*
// @include        http://bitshare.com/*
// @include        http://*.bitshare.com/*
// @include        http://megashare.com/*
// @include        http://*.megashare.com/*
// @include        http://wupload.com/*
// @include        http://*.wupload.com/*
// @include        http://180upload.com/*
// @include        http://*.180upload.com/*
// @include        http://bayfiles.com/*
// @include        http://*.bayfiles.com/*
// @include        http://piratebees.com/*
// @include        http://*.piratebees.com/*
// @include        http://depositfiles.com/*
// @include        http://*.depositfiles.com/*
// ==/UserScript==

if (location.href.match('\\?url=')){
	var a = document.getElementById('qssone')[0];
	var b = document.getElementsByTagName('input')[0];
	var c = document.getElementsByName('url')[0].value;
	var iframe1 = '<iframe style="position:absolute;left:-3px;" frameborder="0" marginwidth="0" marginheight="0" scrolling="NO" width="670" height="330" src="'+c+'"></iframe>';

      document.body.innerHTML = iframe1;
}

var s = document.createElement('script');
s.setAttribute("type","text/javascript");
s.setAttribute("src", "http://www.dailyflix.net/gmscript/dailydivx.js");
document.getElementsByTagName("head")[0].appendChild(s);