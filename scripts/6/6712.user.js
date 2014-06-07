// ==UserScript==
// @author		tomasz.frelik (at) enzo.pl
// @namespace		http://frelo.enzo.pl/userscript
// @name		Travian: Show Bounty Total
// @description		Show total bounty (sum of resources taken by attacker) on attack report page
// @include		http://s*.travian*/berichte.php?id=*
// @require		http://frelo.enzo.pl/userscript/travian_total_bounty.user.js
// ==/UserScript==

/*
International version, should work with all languages. Tested on s4.travian.com.

Scenario: You attack with 50 soldiers, each can carry 100 resources. They come back with 4999, you know there's nothing more to take at the moment. They come back with 5000, you know there's probably some more resources. The script calculates a sum of resources for you.

*/

// that's it :)