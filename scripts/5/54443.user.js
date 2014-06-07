// ==UserScript==
// @author        Nedko Ivanov http://nednet.us
// @name           Travian Resource Upgrade
// @namespace      http://userscripts.org/
// @description    this script mails you when a resource quantity is available
// @include        http://*.travian.*dorf1*
// @include        http://*.travian.*build*
// @exclude        http://*.travian.*/login.php*
// @exclude        http://*.travian.*/logout.php*
// @exclude        http://*.travian.*/chat.php*
// @exclude        http://forum.travian.*
// @exclude        http://*.travian.*/index.php*
// @exclude        http://*.travian.*/manual.php*
// ==/UserScript==

/* 
 * This script is granted to the public domain.
 */

var sentmailfor = new Object();

v