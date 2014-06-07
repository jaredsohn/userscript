// ==UserScript==
// @name                进入新版豆瓣 Get New Douban
// @namespace           Get New Douban
// @description         可以让任何人（包括没收到邀请的）进入新版豆瓣
// @require             http://js-addon.googlecode.com/files/autoupdatehelper.js
// @include             http://*.douban.com/*
// @version             1.0
/* @reason
@end*/
// ==/UserScript==


try{new Updater({name: '进入新版豆瓣 Get New Douban',id: '68927',version: '1.0'}).check();}finally{
	(function(){
		var theStatus = document.getElementById('status');
		if(location.href == 'http://www.douban.com/' && theStatus){
			function setCookie(c_name, value, expiredays, domain){
				var exdate = new Date();
				exdate.setDate(exdate.getDate() + expiredays);
				document.cookie = c_name + '=' + escape(value) + (expiredays ? '': ';expires=' + exdate.toGMTString()) + (domain ? ';domain=' + domain: '');
			}
			var getNewDouban = document.createElement('a');
			getNewDouban.innerHTML = '进新版';
			getNewDouban.id = 'getNewDouban';
			theStatus.lastChild.innerHTML ? theStatus.appendChild(getNewDouban) :theStatus.insertBefore(getNewDouban, theStatus.lastChild.previousSibling);
			document.getElementById('getNewDouban').addEventListener('click', function(){
				setCookie('try_sep_nav', '"yes"', 360, '.douban.com');
				location.reload();
			}, false); 
		}
	})();
}








