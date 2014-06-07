// ==UserScript==
// @name        Armor games rating
// @namespace   Arrvi
// @include     http://armorgames.com/*
// @include     http://www.armorgames.com/*
// @version     1
// @grant none
// ==/UserScript==

(function(w,d){
w.addEventListener('load',function(){
	var e = d.querySelectorAll('.game .stats .rating');
	for ( var i=0; i<e.length; i++ )
	{
		e[i].textContent = (parseInt(e[i].textContent)/10).toFixed(1);
	}
});
})(unsafeWindow, unsafeWindow.document);
