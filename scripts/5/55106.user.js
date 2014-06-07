// ==UserScript==
// @name           Banner
// @namespace      erepstats.com
// @include        http://www.erepublik.com/en/citizen/profile
// ==/UserScript==

var reasons = new Array(
	"just for FUN :)",
	"because he is soo ugly",
	"because he ate 3 times today",
	"because I'm your GOD!",
	"because he don't likes me :p",
	"because he is lazy",
	"based on the 124.56.972 rule",
	"because we don't like him!",
	"because I wanted to BAN someone.",
	"and U are the next!",
	"because banning is funy!",
	"because he wanna rule the eWorld!",
	"because he isn't eRomanian."		
);

var shoutbox, bann;
shoutbox = document.getElementById('shoutbox');
if(shoutbox) {
	bann = document.createElement('div');
	bann.innerHTML = '<div class="is banned">Citizen permanently suspended '+
	reasons[Math.floor(Math.random()*reasons.length)]+	
	'</div>';
	shoutbox.parentNode.insertBefore(bann, shoutbox);
}
