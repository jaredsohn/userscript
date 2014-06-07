// ==UserScript==
// @name        9GAG Always Display Top Comments
// @namespace   9gag
// @description It automatically sorts the 9GAG post comments order as most-liked first, like it always used to be !
// @include     http://9gag.com/gag/*
// @version     1
// ==/UserScript==

document.getElementsByTagName("fb:comments")[0].setAttribute('order_by', 'social');