// ==UserScript==
// @name           Netvibes Blue Unread
// @namespace      http://elictruotne.free.fr
// @include        http://www.netvibes.com/*
// ==/UserScript==

function showUnread(){
	'qwgrewgqerwg';
	var unread = $$('div.moduleHeader span.title span.unread');
	for(i=0;i<unread.length;i++){
		if (unread[i].getParent().getStyle('display') == 'none'){
			var rss = unread[i].getParent().getParent().getParent();
			rss.setProperty('style','background: #5D5D5D url(/themes/exposition-blueberry/img/m/moduleheader.png) repeat-x scroll center top;');
		} else {
			var rss = unread[i].getParent().getParent().getParent();
			rss.setProperty('style','background: #3399FF;');
		}
	}
}

function easyUnread(event){
	window.addEvent('domready', 
		function(){
			showUnread.periodical(2000);
		}
	);
};

// We have to inject and execute the betterNetvibes function in a script tag in the page so it can acces the mootols lib'
document.body.appendChild(document.createElement('script')).innerHTML = showUnread.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/, '$2')+'showUnread();';
document.body.appendChild(document.createElement('script')).innerHTML = easyUnread.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/, '$2')+'easyUnread();';
