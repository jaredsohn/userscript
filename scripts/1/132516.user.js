// ==UserScript==
// @name           vk.com dialogs_del remover
// @namespace      azdi
// @include        http://vk.com/
// @include        http://vk.com/*
// @include        http://vk.com/im
// @include        http://vk.com/im*
// ==/UserScript==

function remdel() {
var a = document.getElementsByClassName('dialogs_del');
while(a[0] != undefined) {
a[0].parentNode.removeChild(a[0]);
}}

(function() {
	var id;
	function replace(){
		var a = document.getElementsByClassName('dialogs_del');
		while(a[0] != undefined) {
			a[0].parentNode.removeChild(a[0]);
		}
	}
	id = setInterval(replace, 1000);
	//replace();
})();
