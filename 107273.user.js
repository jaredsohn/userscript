// ==UserScript==
// @name           iine_changer
// @namespace      iine_changer
// @description    いいね！ボタンをよくない？に変えます。
// @include        http://www.facebook.com/plugins/like.php*
// ==/UserScript==
(function(){
	var IINE = 'よくない？';
	
	function g(name){
		return document.getElementsByClassName(name);
	}
    g('liketext')[0].textContent = IINE;
	var el = g('connect_widget_not_connected_text')[0];
	if(el)
		el.textContent = el.textContent.replace(/いいね！/g, IINE);

})();