// FixedHider
// v1.0.4 (26.11.11)
// by Yuriy Babak aka Inversion (http://inversion.habrahabr.ru/), mailto: yura.des@gmail.com

// ==UserScript==
// @name		FixedHider
// @version		1.0.4
// @namespace		http://userscripts.org/users/94601
// @description		При скроллинге прячет боковую панельку с position:fixed
// @include		http://*habrahabr.ru/*
// ==/UserScript==

/*
	v1.0.4 (26.11.11)
	- поддержка старой верстки
	
*/

window.addEventListener("load", function() {
	
	// поддержка старой верстки
	var elName = document.getElementById('main-page') ? 'xsidebar' : 'xpanel' 
	
	var t_waitFor_xpanel = setInterval(function () {
		if (document.getElementById(elName)) {
		
			var t_show = null
			var g_btnStyle = document.getElementById(elName).style
			window.addEventListener("scroll", function () {
				g_btnStyle.visibility = "hidden"
				clearInterval(t_show)
				t_show = setInterval(function () {
					g_btnStyle.visibility = "visible"
					clearInterval(t_show)
				}, 300)
			}, false)
		
			clearInterval(t_waitFor_xpanel)
		}
	}, 300)
	
}, false)

