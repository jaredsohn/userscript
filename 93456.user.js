// ==UserScript==
// @name           Add Favorites Tab on Haiku
// @namespace      http://www.hatena.ne.jp/Nikola/
// @description    Add favorites tab of other users on Haiku
// @version        1.0.0
// @include        http://h.hatena.ne.jp/*/*
// @include        http://h1beta.hatena.ne.jp/*/*
// ==/UserScript==
(function (){
	if (!location.pathname.match(/\/(((?!keyword).)+?)\/.*/))
		return
	if (document.querySelector('#tab-menu > li > a[href$=following]'))
		return;
	var toAddNode = document.querySelector('#tab-menu > li:last-child').cloneNode(true);
	toAddNode.querySelector('a').href += 'following';
	toAddNode.querySelector('a').textContent = 'Favorites';
	toAddNode.className = toAddNode.querySelector('a').href === location.href ? 'selected' : '';
	var target = document.getElementById('tab-menu');
	target.insertBefore(toAddNode, target.lastChild);
})();
