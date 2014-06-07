// ==UserScript==
// @name        Neopets - No more invisible boards
// @namespace   NPinvisiboards
// @include     *neopets.com/neoboards*
// @version     1
// @grant       none
// @require	http://www.zoidberg25.com/jquery-1.11.0.min.js
// ==/UserScript==

topicname = $(".blistTopic > span");

topicname.each(function() {
	tnlength = $(this).text().length;
	if (tnlength == 0) {
		$(this).html("<img border=\"0\" src=\"http://images.neopets.com/neoboards/smilies/ghost.gif\"> <span style=\"font-style: italic;\">Invisible topic - woo!</span> <img border=\"0\" src=\"http://images.neopets.com/neoboards/smilies/ghost.gif\">");
	}
});

/*
if (topicname.text().length <= 1) {
	topicname.hide();
}
*/