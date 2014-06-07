// ==UserScript==
// @name		Neopets : Dice-A-Roo Opener
// @description	Opens up as many dice-a-roo games as you want 
// @include	https://tubutas.gotdns.com/neopetHACK/dicearoo.hax
// @include	http://www.neopets.com/games/arcade_more.phtml?search_game=Dice-A-Roo
// @author		Tubutas
// @homepage	https://tubutas.gotdns.com/t_blog/
// ==/UserScript==
var SCRIPT = {
	url: 'http://userscripts.org/scripts/source/54040.user.js',
	namespace:'https://tubutas.gotdns.com/neopetHACK/',
	version: '1.0',
	name: 'Neopets : Dice-A-Roo Opener',
};
if(window.location.href!="http://www.neopets.com/games/arcade_more.phtml?search_game=Dice-A-Roo"){
	var num=prompt("How many instances of dice-a-roo?(Don't get too crazy with it...)","5");
	for(var i=0;i<parseInt(num);i++){
		GM_openInTab("http://www.neopets.com/games/arcade_more.phtml?search_game=Dice-A-Roo");
	}
}else{
	window.setTimeout(function(){window.location.href="http://www.neopets.com/games/dicearoo.phtml";},Math.round(Math.random()*1000+500));
}