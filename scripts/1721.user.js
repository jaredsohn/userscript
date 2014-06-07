// ==UserScript==
// @name          MonsterCommerce Product Description Textarea Expander
// @namespace   http://www.ourkith.com
// @description	  Expands textarea for MonsterCommerce when adding or editing a product description and also makes the font size in the textarea smaller
// @include       https://*.monstercommerce.com/*/admin/producteditor.asp*
// ==/UserScript==

(function() {
	var ta = document.getElementById('Textarea1');
	ta.style.cssText="height: 500px; font-size: 11px; width: 740px;";
	ta.onfocus = function() {ta.style.cssText="height: 500px; font-size: 11px; width: 740px; background-color: #FFF; border: 1px solid #7F9DB9;";};
	var gen = document.getElementById('General');
	gen.style.height="1600px";
})();