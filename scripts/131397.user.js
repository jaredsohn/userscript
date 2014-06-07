// ==UserScript==
// @name                block webqq
// @description webqq's class sucks...
// @version             0.1
// @include     http://*.qq.com/*
// ==/UserScript==

if (document.location.href.indexOf('qq.com') != 0) {
	// 1\ strip class on main
	if (document.getElementById('QM_Main_Container')) {
		document.getElementById('QM_Main_Container').className = 'lay_grid clearfix lay_grid_131';
	}
	// 2\ strip class on certain-blog
	if (document.getElementById('LayPageContainer')) {
		document.getElementById('LayPageContainer').className = '';
	}
}
