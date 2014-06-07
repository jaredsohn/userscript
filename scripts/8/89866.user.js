(function() {

// ==UserScript==
// @name          Battle.net WoW Forums - Alternate CSS
// @namespace     http://userscripts.org/users/246068
// @description   Change new WoW forum text for higher contrast and slightly larger font size
// @copyright     2010
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @license       (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @version       1.0
//
// @include  http://us.battle.net/wow/en/forum/*
// ==/UserScript==

  GM_addStyle("" + <><![CDATA[

    /* My eyes! The forums do nothing! */
    body {
      color: white;
      font-size:14px;
    }

  ]]></>);

})();