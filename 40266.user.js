// ==UserScript==
// @name      hatebu_nocomment_cleaner
// @namespace http://d.hatena.ne.jp/y-kawaz/20081202/1228206063
// @version   1.0
// @author    y-kawaz
// @description	はてブのコメント無しブクマを下げる
// @include http://b.hatena.ne.jp/entry*
// @include http://b.hatena.ne.jp/asin/*
// ==/UserScript==
(function(){
var b1 = document.getElementById('bookmarked_user');
if(b1) {
	var b2 = document.createElement('ul');
	b2.className = 'userlist bookmark-list';
	b2.id = 'nocomment_bookmarks';
	b2.style.display = 'none';
	b2.appendChild(document.createTextNode(' '));
	b1.parentNode.appendChild(b2);
	var li = b1.getElementsByClassName('nocomment');
	for(var i = li.length - 1; 0 <= i; i--) {
		b2.insertBefore(li[i], b2.firstChild);
	}
	var open = document.createElement('a');
	open.appendChild(document.createTextNode('[Show hidden bookmarks]'));
	open.href = 'javascript:void(0)';
	open.addEventListener('click',
		function(e){
			e.target.style.display = 'none';
			document.getElementById('nocomment_bookmarks').style.display = '';
		}, true
	);
	b1.parentNode.appendChild(open);
}
})();
