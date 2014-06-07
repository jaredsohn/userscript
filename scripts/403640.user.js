// ==UserScript==
// @name        xiami-player
// @namespace   xiami
// @include     http://www.xiami.com/play*
// @version     1
// @grant       none
// ==/UserScript==

$(function(){
	$('head').append('<style></style>');
	$('head style:last').append('#player-main{width: 80%;margin: 0px auto;}');
	$('head style:last').append('.main-nav .list-button,.ui-roam-wrap,.collect-list,.collect-outer{display: none!important;}');
});