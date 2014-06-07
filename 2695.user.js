// ==UserScript==
// @name	Helgon - main_old to main
// @description	Replace main_old.asp with main.asp
// @include	http://*.helgon.net/main_old.asp*
// ==/UserScript==
(function(){
  location.href = location.href.replace(/main_old/, 'main');
})();

