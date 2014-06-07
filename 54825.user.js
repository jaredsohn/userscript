// ==UserScript==
// @name           Travian Any Page Login
// @namespace      http://userscripts.org/scripts/show/54825
// @description    Forget about dorf1. Travian will directly login to any page.
// @include        http://s*.travian*.*/*.php*
// @include        http://x*.travian*.*/*.php*
// @include        http://vip*.travian*.*/*.php*
// @include        http://welt*.travian*.*/*.php*
// @exclude        http://*.travian*.*/log*.php*
// @exclude        http://*.travian*.*/*x.php*
// @exclude        http://*.travian*.*/admin.php*
// @author         Gabraham
// @version        1.0.5
// @copyright      Gabraham
// @license        Creative Commons Attribution-NonCommercial-ShareAlike 2.5 Argentina
// ==/UserScript==

/*
 * This script is licensed under the
 * Creative Commons Attribution-NonCommercial-ShareAlike 2.5 Argentina License.
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.5/ar/
 */

window.addEventListener('load', function() {
    if (!!((document.evaluate( ".//input[@value='login']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)).snapshotLength)) {
        (document.getElementsByTagName('FORM'))[0].action = (location.href).split("/")[3];
        (document.getElementsByTagName('input'))[0].style.borderColor = 'lightblue';
        (document.getElementsByTagName('input'))[1].style.borderColor = 'lightblue';
    }
},true);