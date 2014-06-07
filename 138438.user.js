// ==UserScript==
// @name        Viper = Faggot
// @namespace   Abex
// @include     http://boards.4chan.org/*/res/*
// @version     1
// ==/UserScript==
window.onload = function() {
    var list, index, element;
    list = document.getElementsByClassName('postertrip');
    for (index = 0; index < list.length; ++index) {
        element = list[index];
		if (element.innerHTML=='!!Tfo0gfwMeVU'){
			element.innerHTML=' Literally the biggest faggot on this board. ';
		}
    }
}