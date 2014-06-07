// ==UserScript==
// @name          YaDirectCutter
// @description   режет Яндекс.Директ на сайтах
// @author		  Vizzy
// @include       *
// ==/UserScript==

var yaDirectOne;
var yaDirectTwo;

var yaParentOne;
var yaParentTwo;

try {
	yaDirectOne = document.getElementById('y5_direct1');
	yaParentOne = yaDirectOne.parentNode;
	yaParentOne.removeChild(yaDirectOne);
} catch (e) {}

try {
	yaDirectTwo = document.getElementById('y5_direct2');
	yaParentTwo = yaDirectTwo.parentNode;
	yaParentTwo.removeChild(yaDirectTwo);
} catch (e) {}