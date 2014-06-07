// ==UserScript==
// @name          usoCheckup - Null Translation Theme
// @namespace     http://userscripts.org/users/37004
// @description   Flush any missed trimmed strings that weren't defined for usoCheckup
// @copyright     2010+, Marti Martz (http://userscripts.org/users/37004)
// @version       0.0.2
// @license  GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @exclude *
// ==/UserScript==

if (typeof usoCheckup != "undefined")
  usoCheckup.strings();
