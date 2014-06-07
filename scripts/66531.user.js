// ==UserScript==
// @name          usoCheckup - English Translation Fudd Theme
// @namespace     http://userscripts.org/users/37004
// @description   Defines a custom Engwish wanguage twanswation in the diawect of Fudd, Ewmew J fow usoCheckup
// @copyright     2010+, Marti Martz (http://userscripts.org/users/37004)
// @version       0.0.6
// @license  GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @exclude *
// ==/UserScript==

/* 

CHANGEWOG
=========

http://userscripts.org/topics/43543

*/

if (typeof usoCheckup != "undefined") {
  switch (usoCheckup.strings("lang")) {
    case "en":
      usoCheckup.strings({
        "updateAvailable": "An update is avaiwabwe.",
        "updateUnavailable": "No update avaiwabwe.",
        "updateMismatched": "WAWNING: Metadata does not match!",
        "updateUnlisted": "WAWNING: Scwipt is not wisted!",
        "queryWidget": "Check fow an update.",
        "toggleWidget": "Toggwe automatic update.",
        "updaterOff": "Automatic update is disabwed.",
        "updaterOn": "Automatic update is enabwed.",
        "showConfirm": "Show the scwipt homepage?",
        "installConfirm": "Instaww the scwipt?",
        "topicConfirm": "View the scwipt topic?",
        "closeMessage": "Cwose this message?",
        "closeAllMessages": "Cwose aww messages?"
      });
      break;
    }
}
