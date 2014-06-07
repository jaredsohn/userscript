// ==UserScript==
// @name           lenta on lwgame.net
// @namespace      lwgame.net
// @description    Ленточка на сайт lwgame.net
// @include        http://*lwgame.net/*
// ==/UserScript==

var a=document.getElementsByTagName('p');

for(var i=0;i<a.length;i++)
	{
	 if(a[i].className=='welcome')
		{
		 lenta=document.createElement('div');
		 lenta.setAttribute("style","position:absolute; top:20; center:0;");
		 lenta.innerHTML='<script type="text/javascript" src=\'http://dl.dropbox.com/u/3053245/area.js\'></script><a href="#" onclick="lenta(\'\'); return false;"><img border="0" src="http://games.preft.ru/images/lenta.gif"></a>';
          	 a[i].parentNode.insertBefore(lenta,a[i].nextSibling);
		}

	}
