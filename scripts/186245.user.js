// ==UserScript==
// @name        Fight & Work
// @namespace   mgFightWork
// @include     http://*.marketglory.com/*
// @version     1
// @grant       none
// ==/UserScript==

/* Set InfoBox default value */
info_default();

/* Cookie List */
var cookieAssets = [
	'IdrLog',
	'FightLog',
	'WorkLog',
	'fightStatus',
	'attackUser',
	'waitFight'
];

var pageAssets = {
	userLists: '/account/fight',
	fightCompare: 'view_user',
	fightHistory: '/account/fight/history'
}

/* GET & SAVE LAST IDR
================================================================================== */
$('.btnFight').click(function(e) {
	e.preventDefault();
	setCookie('fightStatus', 1);
	bot_start();
});
$('.btnClearCookie').click(function(e) {
	e.preventDefault();
	clear_cookie(cookieAssets);
});

if (checkCookie('fightStatus')) {
	deleteCookie('fightStatus');

	setCookie('attackUser', 1);
	var attackBtn = $('a[title~="Attack"]');
	window.location.assign(attackBtn.attr('href'));
}
if (checkCookie('attackUser') && checkCookie('attackUser') == 1) {
	deleteCookie('attackUser');
	
	$('td > form').submit(function(e) {
		setCookie('waitFight', 1);
	});
}
if (checkCookie('waitFight')) {
	deleteCookie('waitFight');
	window.location.assign('http://www.marketglory.com/account');
}
if (location.pathname == pageAssets.fightHistory) {
	deleteCookie('IdrLog');
	var newIdr = $('.ms_x .right b').text();
	setCookie('IdrLog', newIdr);
	var oldIdr = getCookie('IdrLog');

	if (newIdr == oldIdr) {
		var waitIdr = setInterval(function() {
			return window.location.assign(location.href)
		}, 10000);
	} else {
		deleteCookie('IdrLog');
		setCookie('IdrLog', newIdr);
		setCookie('FightLog', getCookie('FightLog') + 1);

		setCookie('fightStatus', 1);
		window.location.assign('http://www.marketglory.com' + pageAssets.userLists);
	}
}