// ==UserScript==
// @name        DobrochanGopher
// @namespace   angelforest
// @description Add "Go" mascot on every page
// @include     http://dobrochan.com/*
// @version     1
// @grant       unsafeWindow
// ==/UserScript==

$ = unsafeWindow.jQuery

$('body').append('<div id="gopher" style="position:fixed; right:0; bottom:0;">' +
                 '<img src="http://tour.golang.org/static/gopher.png"></img>' +
				 '</div>');