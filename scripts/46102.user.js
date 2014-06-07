// ==UserScript==
// @name           HWM_Arena_In_Confirm
// @namespace      http://amse.ru
// @include        http://www.heroeswm.ru/group_wars.php*
// ==/UserScript==

var a_arr = document.getElementsByTagName('a');
for (var i = 0; i < a_arr.length; i++) {
	var a = a_arr[i];
	if (a.href == 'http://www.heroeswm.ru/arena_in.php') {
		a.addEventListener('click', myConfirm, false);
		a.id = a.href;
		a.href = 'javascript: void(0)';
	}
}

function myConfirm() {
	if (confirm('\u0412\u044b \u0443\u0432\u0435\u0440\u0435\u043d\u044b?')) {
		location.href = this.id;
	}
}