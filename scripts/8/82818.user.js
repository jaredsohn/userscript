// ==UserScript==
// @name           Reuters: Remove bottom toolbar
// @namespace      reutersRemoveBottomToolbar
// @description    Remove bottom toolbar from Reuters site
// @include        *reuters.com*
// @author         Manish Vij
// @version			   1.0
// @license			   GPL; http://www.gnu.org/copyleft/gpl.html
// @datecreated		 2010-08-02
// @lastupdated		 2010-08-02
// ==/UserScript==

GM_addStyle("#trackTabs, tabbuttons {display:none !important}");
