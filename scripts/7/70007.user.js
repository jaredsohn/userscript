// ==UserScript==
// @name Drupalmodules.com expand teaser
// @author Sp.Shut
// @version 27.02.2010
// @description Expand teasers on drupalmodules.com
// @include        http://drupalmodules.com/module/* 
// ==/UserScript==

(function(){

window.addEventListener(
  'DOMContentLoaded',
  function () {
	$("#excerpt_more").trigger('click');
	},
	false)
})();