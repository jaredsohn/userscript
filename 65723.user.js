// ==UserScript==
// @name           Better YouPorn
// @namespace      dirtyoldman
// @description    Hides all ads and cleans up pages. Enlarges the player.
// @include        http://www.youporn.com/*
// @include        http://youporn.com/*
// ==/UserScript==

function setCookie(c_name,value)
{
var exdate=new Date();
exdate.setDate(exdate.getDate()+365);
document.cookie=c_name+ "=" +escape(value)+";expires="+exdate.toGMTString();
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function id(what) {
  return document.getElementById(what);
}
if (typeof unsafeWindow == "undefined") unsafeWindow = window;
function resizePlayer() {
  var height = window.innerHeight;
  var percent = height/unsafeWindow.so.getVariable('height');
  var width = Math.round(percent*unsafeWindow.so.getVariable('width'));
  id('player').width=width;
  id('player').height=height;
  unsafeWindow.so.addVariable('height', height);
  unsafeWindow.so.addVariable('width', width);
  unsafeWindow.so.addVariable('autostart', 'false');
  unsafeWindow.so.write('player');
  id('mpl').width=width;
  id('mpl').height=height;
  id('player').scrollIntoView(true);
  id('player').setAttribute('style', 'margin-right: auto; margin-left: auto; margin-bottom: '+Math.round(height/4)+'px; width: 90% !important;');
  return true;
}

if (!readCookie('age_check')) setCookie('age_check', '1');
GM_addStyle('#notice, #producer, #primaryAdTop, #primaryAdBottom, #moreVideosTabview3, #footerAdContainer, #toolbar-nav, #main-ad, #ft-ad-container { display: none !important; } #hd, #bd, #toolbar-container { width: 100% !important; }');
document.body.style.margin='2px';
if (id('player')) resizePlayer();