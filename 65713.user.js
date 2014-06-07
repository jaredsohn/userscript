// ==UserScript==
// @name           alfalfa comment
// @namespace      http://efcl.info/
// @include        http://alfalfalfa.com/archives/*
// ==/UserScript==
(function() {
	var menu = document.getElementById('comment');
	var top = document.getElementById('formbody');
	top.parentNode.insertBefore( menu, top );
})();