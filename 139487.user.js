// ==UserScript==
// @name           Cooldown by hesar
// @version        0.1beta
// @author         hesar
// @namespace      hesar
// @description    http://userscripts.org/scripts/show/118625
// @description    last change: red color for clicked links (all money and tanks)
// @include        http://www.reddragon.pl/fast-dragon/*
// ==/UserScript==


	 var  newscript = document.createElement('script');
     newscript.type = 'text/javascript';
     newscript.async = true;
     newscript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js';
	 (document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(newscript);
     
function wait() {
if(typeof jQuery == 'undefined') {  window.setTimeout(wait, 100);}
else { $j = jQuery; cooldown();}

}
function cooldown() {
	$j('body').attr("background-color","black");
	disabledHtml = '<a target="mainFrame" href="#"><img width="58" border="0" height="77" alt="Nastepna tura"  src="http://www.pozycjonowanie.se/images/cas_disabled.gif"></a>';
	enabledHtml = '<a target="mainFrame" href="/fast-dragon/dragon.cgi?b=nextday"><img width="58" border="0" height="77" alt="Nastepna tura" onclick="Klik(1)" src="http://www.pozycjonowanie.se/images/cas.gif"></a>';
	$j('a:last',top.leftFrame.document).replaceWith(disabledHtml);
	$j('a:last',top.leftFrame.document).mouseover( function() { $j('a:last',top.leftFrame.document).replaceWith(enabledHtml); });
	//setTimeout(function() { $j('img:last',window.parent.frames[1].document).replaceWith(enabledHtml)},1000);
}
wait();


function log(text) {
	unsafeWindow.console.log(text);
	}