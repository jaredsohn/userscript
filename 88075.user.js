// ==UserScript==
// @name			Armor Games Skip to Game
// @namespace		armorgames - skip payroll
// @description		Armorgames now requires you to register to play games without ads...
// @include			https://armorgames.com/play/*
// @include			http://armorgames.com/play/*
// ==/UserScript==

// version 0.03 - More reliable game info

// Example: From <https://armorgames.com/play/7032/deliveryman>
//			to <https://cache.armorgames.com/files/games/deliveryman-7032.swf>

gameinfo = gameinfo = document.getElementsByTagName('link')[0].href.match(/\/([^\/]*)\.[A-Za-z]*$/i)
base = [ 'http://cache.armorgames.com/files/games/', '.swf' ]
window.location = base[0] + gameinfo[1] + base[1]
