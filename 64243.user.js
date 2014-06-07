// ==UserScript==
// @name           Ogame Redesign: Remove CSS
// @namespace      antikiller
// @description    Remove main CSS file on Messages page
// @include        http://*.ogame.*/game/index.php?page=messages*
// @version 0.2
// ==/UserScript==

(function(){
	if ( !unsafeWindow.$ ) return;
	
	
	var links = document.getElementsByTagName('link');
	for (var i=0; i<links.length; i++) {
		if (links[i].getAttribute('type').toLowerCase() == 'text/css' && links[i].getAttribute('href').toLowerCase().indexOf('01style.css') > -1) {
			links[i].parentNode.removeChild(links[i]);
		}
	}
	
	var msg = document.getElementById('message_alert_box');
	var planet = document.getElementById('planet');
	planet.className = 'shortHeader';
	if (msg && planet) {
		planet.insertBefore(msg, planet.firstChild);
		
		GM_addStyle('#message_alert_box {display:block;float:left;background-image:url(img/layout/post_an.gif); height:42px; width:71px;}');
		GM_addStyle('#message_alert_box span {display:block;width:59px;position:absolute;left:7px;top:20px;margin-top:4px;text-align:center;font-size:10px;text-decoration:none;color:#FFF;}');
	}
	
	
	GM_addStyle('#info, #ie_message, #rechts, #siteFooter, #antires_cont {display:none}');
	GM_addStyle('#links {float:left}');
	GM_addStyle('#netz div.msg_content {width:640px}');
	GM_addStyle('#netz {position:absolute; left:200px}');
	GM_addStyle('* {font-family:Verdana}');
	GM_addStyle('#mailz tr.new {font-weight:700}');
})()