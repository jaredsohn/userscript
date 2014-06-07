// ==UserScript==
// @name       ProgramCP
// @version    1.0b
// @description Umożliwia korzystanie z rozkładówki programów na stronie Cyfry Plus
// @match      *//*cyfraplus.pl/program*
// @copyright  2012+, mlisik
// @require http://ajax.googleapis.com/ajax/libs/ext-core/3.1.0/ext-core.js
// ==/UserScript==

	Ext.getBody().setStyle('overflow', 'scroll');
        Ext.query('[class=mo_background]')[0].remove();
        Ext.query('[class=dialog]')[0].remove();
	Ext.query('[id=headerPlaceholder]')[0].remove();
	Ext.query('[id=ncplus]')[0].remove();
	Ext.query('[id=footer]')[0].remove();
