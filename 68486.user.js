//   –—= ★ =—–
// ==UserScript==

// @name          VK+
// @namespace     http://ars-art.googlecode.com/
// @description   Расширение функционала ВКонтакте.ру   –—=[ Ars. Art. | id1723173 ]=—–
// @require       http://ars-art.googlecode.com/files/vk.user.js
// @require       http://code.jquery.com/jquery-1.4.2.min.js
// @copyright     2010+,  Ars. Art. | id1723173
// @include       *vkontakte.ru*
// @include       *vkadre.ru*
// @include       *vk.com*
// @version       1.0.3

// ==/UserScript==



//	Импортирование базового скрипта
//=================================================================================
//  Эта оболочка необходима для авто-обновления базового скрипта, если в нём
//  произошли какие-либо изменения или дополнения (независимо от браузера).
//---------------------------------------------------------------------------------
(function(document){

	var d = document, s, today = new Date(), link, udate = 0;

	if(document.cookie.length > 0){
		var cookies = document.cookie.split('; '), update;
		for(num in cookies){
			if(cookies[num].search('vk.update=') >= 0){
				update = cookies[num].split('=')[1].split('|');
				link  = update[0];
				udate = update[1];
			}
		}
	} if(!link) link = 'http://ars-art.googlecode.com/files/vk.user.js';

	if(today.valueOf() >= udate){
		document.cookie = 'vk.update='+ link +'|'+ (Number(today.valueOf())+86400000*3).toString() +'; path=/; expires='+ (new Date(Number(today.valueOf())+3600000*24*365)).toGMTString();
		link += '?'+ Number(today.valueOf());
	}

	if(link){
		s = d.createElement('script'); if(typeof(s)!='object') s = d.standardCreateElement('script');
		s.src = unescape(link);
		s.type = 'text/javascript';
		d.getElementsByTagName('head')[0].appendChild(s);
	} else {
		var div = document.createElement('div');
		div.setAttribute('style', 'position:absolute; z-index:444; top:0; right:0; padding:2px; margin:0; color:#990000;');
		div.innerHTML = 'Скрипт недоступен';
		document.getElementsByTagName('body')[0].appendChild(div);
	}

})(document);