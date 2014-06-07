// ==UserScript==
// @name		Neopets : Scorchy Slots Opener
// @description	Opens up as many scorchy slots games as you want 
// @include	https://tubutas.gotdns.com/neopetHACK/scorchyslots.hax
// @author		Tubutas
// @homepage	https://tubutas.gotdns.com/t_blog/
// ==/UserScript==
var SCRIPT = {
	url: 'http://userscripts.org/scripts/show/54046',
	namespace:'https://tubutas.gotdns.com/neopetHACK/',
	version: '1.0',
	name: 'Neopets : Scorchy Slots Opener',
};
var num=prompt("How many instances of Scorchy Slots?(Don't get too crazy with it...)","5");
for(var i=0;i<parseInt(num);i++){
	GM_openInTab("http://www.neopets.com/games/slots.phtml");
}