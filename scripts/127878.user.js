// ==UserScript==
// @name           vk.com (vkontakte) music download
// @version        0.4
// @updateURL      http://userscripts.org/scripts/source/127878.meta.js
// @namespace      schreque-uso
// @author         Anton Nazarov, userscripts.org/users/40363
// @author         schreque, userscripts.org/users/413415
// @description    Music download for vk.com (vkontakte.ru)
// @include        http://vkontakte.ru/*
// @include        http://vk.com/*
// ==/UserScript==

// This is fork of the userscript
// http://userscripts.org/scripts/show/16985

(function()
{

function addbutton(node, link)
{
	if ( node.getElementsByClassName('addon').length > 0 ) {
		return;
	}

	var tr = node;

	var title_a = tr.getElementsByTagName('td')[1].getElementsByTagName('b')[0].getElementsByTagName('a')[0].innerHTML;
	var title_t = tr.getElementsByTagName('td')[1].getElementsByTagName('span')[0].innerHTML;

	var songtitle = (title_a + ' - ' + title_t).replace(/\"/g, '');

	// mp3 link
	var addon = document.createElement('a');
	addon.setAttribute('title', songtitle);
	addon.setAttribute('alt', songtitle);
	addon.setAttribute('href', link);
	addon.innerHTML = '\u0441\u043A\u0430\u0447\u0430\u0442\u044C';

	// lyrics link
	var addon1 = document.createElement('a');
	addon1.setAttribute('href', 'http://lyrics.wikia.com/' + encodeURIComponent(title_a) + ':' + encodeURIComponent(title_t));
	addon1.setAttribute('target', '_blank');
	addon1.innerHTML = '\u0442\u0435\u043A\u0441\u0442';

	// container for downloaders
	var newdiv = document.createElement('div');
	newdiv.className = 'addon';
	newdiv.style.fontSize = 'x-small';

	newdiv.appendChild(addon);
	newdiv.innerHTML += ' | ';
	newdiv.appendChild(addon1);

	tr.getElementsByTagName('td')[1].appendChild(newdiv);
	//node.insertBefore(newdiv);
};


function findAudio()
{
	var btns = document.getElementsByClassName('play_new');
	//alert(btns.length);
	for (var i = 0; i < btns.length; i++) {
		var rawurl = btns[i].parentNode.parentNode.getElementsByTagName('input')[0].value;
		var url = rawurl.substring(0,rawurl.indexOf(','));
		addbutton(btns[i].parentNode.parentNode.parentNode, url);
		//alert(url);
	}
};

findAudio();

window.addEventListener('scroll', findAudio, false);

})();

