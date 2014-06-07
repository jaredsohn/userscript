// ==UserScript==
// @name        xiami
// @namespace   58
// @include     http://www.xiami.com/
// @include     http://www.xiami.com/?spm=*
// @version     1
// ==/UserScript==

$(function(){
	$('#search').find('input[name=key]').trigger('click').trigger('focus');
	$('head').append('<style>div.action>a.more{display: none!important;}</style>');
	$('head>style:last').append('.athena-main-panel{display: none!important;}');
	$('.btn-close').click();
})();