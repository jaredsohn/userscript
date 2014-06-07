(function() {

// ==UserScript==
// @name          Test4
// @namespace     http://localhost.localdomain
// @description   Test4
// @copyright     2007+, Marti Martz (http://userscripts.org/users/37004)
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       (CC); http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version       0.0.1
//
// @include   http://www.iana.org/domains/example/
//
// @updateURL  file:
// @installURL  file:
// @downloadURL file:
//
// @grant GM_addStyle
//
// ==/UserScript==

  GM_addStyle(".test4 { color: red; }");

  alert('Hello, World!');

})();