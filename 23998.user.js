// ==UserScript==
// @name           xin::keys 
// @namespace      xin
// @include        http://www.xin.ru/*
// @exclude        http://www.xin.ru/forum/*
// @exclude        http://www.xin.ru/index.php
// @exclude        http://www.xin.ru/charla.php
// @include        http://xin.ru/*
// @exclude        http://xin.ru/forum/*
// @exclude        http://xin.ru/index.php
// @exclude        http://xin.ru/charla.php
// ==/UserScript==

scr = document.getElementsByTagName("script")[0].text;
scr = scr.replace(/_onkeydown\(/, "_onkeydown(event");
eval(scr);

document.addEventListener("keydown", function(event) {
		if( !event.target.type || event.target.type != "text" ) 
			_onkeydown(event);
	}, true);
