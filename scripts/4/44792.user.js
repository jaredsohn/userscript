// ==UserScript==
// @name           Facebook Auto-Refresh
// @namespace      http://userscripts.org/users/7358
// @description    The new homepage does not push the News automatically, so I made this hompage auto-refresh
// @include        http://www.facebook.com/*home.php*
// @author	   Nightmare a.k.a. Nigh7mar3
// ==/UserScript==

minutes=5
delay=minutes*60;

function appendElement(node,tag,id,class,htm) {
	var ne = document.createElement(tag);
	if(id) ne.id = id;
	if(class) ne.className = class;
	if(htm) ne.innerHTML = htm;
	node.appendChild(ne);
}

window.addEventListener("load", function(){
	timer=null;
	startTimer=function(){
		appendElement(document.getElementsByClassName('fb_menu_list')[0],'li','','fb_menu','<div class="fb_menu_title"><a  onclick="window.location.reload();" id="js_refresh">Refresh in <span id="js_count">'+delay+'</span> second(s)</a></div>');
		timer=window.setTimeout(function(){window.clearInterval(interval);document.getElementById('js_refresh').innerHTML="Refreshing...";window.location.reload();},delay*1000);
		interval=window.setInterval(function(){;t=parseInt(document.getElementById('js_count').innerHTML)-1;document.getElementById ('js_count').innerHTML=t}, 1000);
	};

	stopTimer=function(){document.getElementById('js_refresh').innerHTML="Refreshing...";window.clearTimeout(timer);window.clearInterval(interval);};
	restartTimer=function(){stopTimer(); startTimer();};
	startTimer();
},false);