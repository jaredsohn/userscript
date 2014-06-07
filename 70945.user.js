// ==UserScript==
// @name           NoMoreLogout
// @namespace      http://userscripts.org/users/test
// @include        http://rocketmind.motiw.ru/*
// ==/UserScript==

if (location.pathname == "/user/reports/mytasks/") {
	console.log("found");
	setTimeout(function(){
		location.reload();
	}, 60000);
}
