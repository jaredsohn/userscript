// ==UserScript==
// @name        xiami focus search
// @namespace   58
// @include     http://www.xiami.com/
// @version     1
// ==/UserScript==

$(function(){
	$('#search_query').trigger('click').trigger('focus');
})();