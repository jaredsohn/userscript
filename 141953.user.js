// ==UserScript==
// @name			Dashboard Plus for Envato Marketplaces
// @creator			userscripts@revaxarts.com
// @namespace		revaxarts.com
// @description		Dashboard Plus for the Marketplaces.
// @date			2014-01-09
// @version			1.2.0
// @include			http://activeden.net*
// @include			http://audiojungle.net*
// @include			http://themeforest.net*
// @include			http://videohive.net*
// @include			http://graphicriver.net*
// @include			http://3docean.net*
// @include			http://codecanyon.net*
// @include			http://photodune.net*
// ==/UserScript==

(function () {

	/*
	insert the the bootstrap of dbp
	to get an uncompress version append compress=0 like http://dbp.revaxarts.com/js/bootstrap.js?compress=0
	*/
	
	var inject = document.createElement("script");
	inject.setAttribute("type", "text/javascript");
	inject.setAttribute("src", '//dbp.revaxarts.com/js/bootstrap.js');

	(document.body || document.documentElement).appendChild(inject);
	

})();