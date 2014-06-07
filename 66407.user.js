// ==UserScript==
// @name			Ajaxian Remove Right Side Bar
// @author			Erik Vold
// @namespace		ajaxianRemoveRightNavigation
// @include			http://*.ajaxian.com*
// @include			http://ajaxian.com*
// @version			0.1
// @license			GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @datecreated		2010-01-13
// @lastupdated		2010-01-13
// @description		Removes the right side bar from Ajaxian.
// ==/UserScript==

(function(){
	var ele = document.getElementById('sidebar');
	if(!ele) return;
	ele.parentNode.removeChild(ele);
	GM_addStyle('#maincontent{width:700px;}');
})();