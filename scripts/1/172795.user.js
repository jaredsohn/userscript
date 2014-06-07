// ==UserScript==
// @name           YouTube Default Account
// @author         Bouvere
// @version        1.0.00
// @license        GPL version 3 or any later version 

(http://www.gnu.org/copyleft/gpl.html)
// @include        https://*.youtube.com
// @description    Dieses Skript loggt euch automatisch in euren 

Primäraccount ein, wenn ihr die Website youtube.com aufruft.
// ==/UserScript==

window.location.href = "https://www.youtube.com/signin?authuser=0";