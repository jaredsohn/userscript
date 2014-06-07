// ==UserScript==
// @name          Seumka — report limit extender
// @namespace     http://userscripts.org/users/sharkman
// @description   Adds option to load more phrases in Seumka report
// @copyright     2010+, Sharkman (http://userscripts.org/users/sharkman)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       Creative Commons; http://creativecommons.org/licenses/by-nc-nd/3.0/
// @version       0.0.7
// @include http://seumka.ru/personal/report/show/*
// @include http://seumka.ru/personal/report/show/*/*
// @include http://seumka.ru/personal/report/default.html
// @include http://seumka.ru/personal/report/quick/*
// @require  http://userscripts.org/scripts/source/44063.user.js
// ==/UserScript==

window.addEvent('domready', function() {
  $$('#limit').adopt(
    [100, 150, 200, 250, 300, 350, 400, 450, 500].map(function(el, idx) {
      return new Element('option', {
        value: el,
        html: el.toString()
      });
    })
  );
});
