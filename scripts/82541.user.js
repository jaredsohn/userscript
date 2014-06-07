// ==UserScript==
// @name           Automatischer Bedankomat
// @namespace      funnyxXD
// @description    Der Bedankomat wird bei jedem neuen Thread in der Download Sektion autom. angefuegt.
// @include        http://board.wusa.me/index.php?form=ThreadAdd&boardID=46
// @include        http://board.wusa.me/index.php?form=ThreadAdd&boardID=47
// @include        http://board.wusa.me/index.php?form=ThreadAdd&boardID=48
// @include        http://board.wusa.me/index.php?form=ThreadAdd&boardID=49
// @include        http://board.wusa.me/index.php?form=ThreadAdd&boardID=50
// @include        http://board.wusa.me/index.php?form=ThreadAdd&boardID=51
// @include        http://board.wusa.me/index.php?form=ThreadAdd&boardID=52
// @include        http://board.wusa.me/index.php?form=ThreadAdd&boardID=53
// @include        http://board.wusa.me/index.php?form=ThreadAdd&boardID=54
// @include        http://board.wusa.me/index.php?form=ThreadAdd&boardID=55
// @include        http://board.wusa.me/index.php?form=ThreadAdd&boardID=56
// @include        http://board.wusa.me/index.php?form=ThreadAdd&boardID=57
// @include        http://board.wusa.me/index.php?form=ThreadAdd&boardID=58
// @include        http://board.wusa.me/index.php?form=ThreadAdd&boardID=59
// @include        http://board.wusa.me/index.php?form=ThreadAdd&boardID=79
// @include        http://board.wusa.me/index.php?form=ThreadAdd&boardID=80
// ==/UserScript==

window.addEventListener("load",
	function checkThankomat(){
		document.getElementsByName('hasThank')[0].checked = true;
	},
	null
);