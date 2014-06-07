// ==UserScript==
// @name	hide-author Forever
// @author	googleGuard
// @downloadURL    https://userscripts.org/scripts/source/169086.user.js
// @updateURL      https://userscripts.org/scripts/source/169086.meta.js
// @version	1.0
// @include	http://tieba.baidu.com/p/*
// @run-at	document-end
// @grant	none
// ==/UserScript==

var inject = function(f) {
	var s = document.documentElement.appendChild(document.createElement('script'));
	s.textContent = '(' + f + ')()'
};

inject(function() {
	if ( !window.PageData || !PageData.user || !PageData.user.portrait )
		return;

	window.HAFE = {
		name: 'HAFE_' + PageData.user.portrait,
		init: function() {
			var i, j = parseInt(new Date().getTime() / 6e4), t = this;
			t.data = localStorage[t.name] ? JSON.parse(localStorage[t.name]) : {};
			for (i in t.data) {
				if ( j - t.data[i] >= 4e3 )
					(function(a){t.hideAuthor(a,function(o){t.addAuthor(a)})})(i)
			}
		},
		addAuthor: function(e) {
			this.data[e] = parseInt(new Date().getTime() / 6e4);
			localStorage[this.name] = JSON.stringify(this.data);
		},
		hideAuthor: function(e, a) {
			$.ajax({
				url: '/tphide/add',
				data: {
					type: 1,
					hide_un: e,
					ie: 'utf-8'
				},
				type: 'post',
				dataType: 'json',
				success: a
			})
		}
	};
	HAFE.init();

	document.addEventListener('DOMSubtreeModified', function(e){
		e = e.target;
		var a = e.className, m, n;
		if ( a.indexOf('p_content') != -1 )
			a = JSON.parse(e.parentNode.parentNode.getAttribute('data-field')).author.name;
		else if ( a.indexOf('lzl_single_post') != -1 )
			a = JSON.parse(e.getAttribute('data-field')).user_name;
		else
			return;
		if ( !(m = e.querySelector('.hide-post')) )
			return;
		n = e.querySelector('.hide-post.forever') || m.parentNode.appendChild(m.cloneNode(true));
		n.className = n.className.replace(/( forever|$)/, ' forever');
		n.textContent = '\u5BF9\u6211\u6C38\u4E45\u9690\u85CF' + a + '\u7684\u6240\u6709\u8D34\u5B50';
		n.href = 'javascript:HAFE.hideAuthor("' + a + '", function(o){HAFE.addAuthor("' + a + '");window.location.reload()});void(0)'
	}, false)
});
