// ==UserScript==
// @name          Widen style description on userstyles.org
// @namespace     http://www.manuelseeger.de
// @description   Triples the number of rows in the style description
// @license       GPL version 2; http://www.gnu.org/licenses/gpl-2.0.html
// @include       http://userstyles.org*
// @version       1.0
// ==/UserScript==

document.getElementById('style_long_description').rows *= 3;
