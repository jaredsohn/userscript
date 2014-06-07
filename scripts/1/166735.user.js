// ==UserScript==
// @name       Redlist favoris enhancement
// @version    0.1
// @description  Ajouts de fonctionnalités sur la page des favoris de Redlist
// @match      http://www.redlist-ultimate.be/panelmembre/favoris*
// @copyright  2012+, Micht69
// @require     http://www.redlist-ultimate.be/js/jquery_1_4_2.js?ver=100
// ==/UserScript==

$(document).ready(function() {
	$('<input type="button" class="submit85" value="Cocher tout" onclick="$(\'input[type=checkbox]\').click()"/><span>&nbsp;</span>').insertBefore('input[name=vu]');
});
