// ==UserScript==
// @name           VK.com no politic feed
// @namespace      lmrvsk
// @description    Hide politic posts from vk.com feed. Скрывает в ленте VK политические посты.
// @include        http://vk.com/feed*
// @include        http://vkontakte.ru/feed*
// ==/UserScript==

function vanillafeed() {
	var li = document.getElementsByClassName("wall_text");
	var patt = new RegExp('(медведев|путин|навальн|гитлер|ленин|сталин|ельцин|митинг|фальсификац|выборов|выборах|парламент|триумфальн|избирательн|оппозиц|госдум|единая\sросс|единую\sросс|голосовал|нашист|омон|национализм|\sедро|партии|партия|арест)',
	'mi');
			
	for (var i = 0; i < li.length; i++) {
		if (li[i].getAttribute('vfx') != 'true') {
			li[i].setAttribute('vfx', 'true');	
            if ( patt.test(li[i].innerHTML) == true ) {
				li[i].parentNode.parentNode.setAttribute('style','display: none;');
			}
		}
	}
}
setInterval(vanillafeed, 1000);