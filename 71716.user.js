// ==UserScript==
// @name           Youtube - readable watch view count
// @namespace      http://userscripts.org/users/44573
// @include        http://www.youtube.com/watch?v=*
// ==/UserScript==

var exec = function () {
	elem = document.getElementById('watch-view-count');
	if ( ! elem) {
		return false;
	}
	i = parseInt(elem.innerHTML, 10);
	if(isNaN(i)) {
		return false;
	}
	s = i.toString();
	r = '';
	for(a = 0 ; a < s.length ; a++) {
		if (a > 0 && a % 3 == 0) {
			r = ',' + r;
		}
		r = s[s.length - 1 - a] + r;
	}
	elem.innerHTML = r;
}

exec();
