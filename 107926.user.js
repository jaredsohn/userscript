// ==UserScript==
// @name          Google Bar Link Change
// @version       1.0
// @namespace     http://www.designfox.org
// @description	  Adds new links to the Google Toolbar
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @require       https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// @include       https://plus.google.com/*
// @include       http://plus.google.com/*
// @include       https://mail.google.com/*
// @include       http://mail.google.com/*
// @include       https://docs.google.com/*
// @include       http://docs.google.com/*
// @include       https://picasaweb.google.com/*
// @include       http://picasaweb.google.com/*
// @include       https://www.google.com/reader/*
// @include       http://www.google.com/reader/*
// @include       http://www.google.com/calendar/*
// @include       https://www.google.com/calendar/*
// ==/UserScript==

	gbz = document.getElementById('gbz').getElementsByTagName('ol');
	gbz[0].innerHTML += '<li class="gbt"><a href="https://www.google.com/analytics" class="gbzt" target="_blank" onclick="gbar.logger.il(1,{t:25})"><span class="gbtb2"></span><span class="gbts">Analytics</span></a></li>';
	gbz[0].innerHTML += '<li class="gbt"><a href="https://www.google.com/adsense" class="gbzt" target="_blank" onclick="gbar.logger.il(1,{t:25})"><span class="gbtb2"></span><span class="gbts">Adsense</span></a></li>';
	gbz[0].innerHTML += '<li class="gbt"><a href="https://www.google.com/webmasters/tools" class="gbzt" target="_blank" onclick="gbar.logger.il(1,{t:25})"><span class="gbtb2"></span><span class="gbts">Webmaster Tools</span></a></li>';
