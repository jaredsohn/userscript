// ==UserScript==
// @name           Link EIDB forum posts directly
// @namespace      http://www.enneagraminstitute.com/
// @include        http://www.enneagraminstitute.com/forum/topic.asp?*
// ==/UserScript==

var quotebuttons = document.querySelectorAll(
	'a[href^="post.asp?method=ReplyQuote&REPLY_ID="], a[href^="post.asp?method=TopicQuote&REPLY_ID="]'
);

for (var i = 0, l = quotebuttons.length; i < l; ++i) {
	var quotebutton = quotebuttons[i];
	var cell = quotebutton.parentNode;
	var reply_id = quotebutton.getAttribute( 'href' ).match( /[?&;]REPLY_ID=([0-9]+)/ )[1];

	['font','img[src="icon_posticon.gif"]'].forEach( function (sel) {
		var link = document.createElement('a');
		link.setAttribute( 'href', '#' + reply_id );
		link.appendChild(cell.replaceChild(link, cell.querySelector(sel)));
	} );
}
