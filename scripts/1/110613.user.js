// ==UserScript==

// @name        Peoplesfood selection restore

// @author      Vladimir, Nikita

// @version    	0.1

// @namespace   http://dev.maizy.ru

// @description Disable selection protection.

// @include		http://peoplesfood.ru/*

// @include		http://www.peoplesfood.ru/*

// ==/UserScript==

unsafeWindow.addEventListener('load',function() {
    setTimeout(function() {
        unsafeWindow.getSelection = function() { return {removeAllRanges: function(){}} };
    }, 0);
});