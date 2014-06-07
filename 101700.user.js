// ==UserScript==
// @author      blablubbb
// @email		userscripts@yahoo.com
// @namespace	http://userscripts.org/
// @name		Travian T4 Auktionshaus Mindest-bieter
// @description	Das Script trägt den Mindestbetrag ein, den man bieten muss
// @include 	http://ts*.travian.*/hero_auction.php?page=*&filter=*&a=*&z=*
// @version     0.0.2
// ==/UserScript==
var form = document.getElementsByTagName('form')[0].childNodes[13].childNodes[3].innerHTML;
document.getElementsByClassName('maxBid')[0].value=form;