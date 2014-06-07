/*

Fark Defilterizer v1.01
Written by cgod
Created 11-22-2005

What is this?
This function reverses the Fark comment filter, allowing you to
see posts in their fully profane glory. It requires greasemonkey,
a great Firefox extension that allows script authors to customize
websites in all manner of ways. See the greasemonkey site for
more information:

	http://greasemonkey.mozdev.org/

Why would you want that?
Because I enjoy the more colorful aspects of the English language,
and if you're here, I suspect you might as well. While I appreciate
what Mr. Curtis is trying to do, I think whether or not content is
filtered should ultimately be left up to the end user. Yes, even
when it comes to the dreaded N word.

Hey, but what about...
As long as they capitalize Fark, it should be okay. My replaces are
case sensitive, so only "fark" will be matched. Chances are, though,
that sooner or later someone will say "welcome to fark" and it'll be
replaced with "welcome to fuck". Not much I can do there. 

What's filtered?
The filtered word list is courtesy of wikipedia:

	http://en.wikipedia.org/wiki/Fark.com_filters

It's definitely not all-inclusive, as I remember at least one
(something about attractive african americans?) that's not here,
but it should handle the most common filters.

Also, due to the extreme flexibility of the word "fuck", I've tried
to cover a few common scenarios in which "Fark" should probably
read "Fuck". Again, I can't handle every case, but this should
help to catch at least some of them.

Updates
12-04-2005 v1.01
- Updated how the regular expressions are created. Should be faster now.
- Modified regexp for "fark", making it exclude any occurrence that has
  a dot or slash preceding it. This should catch most URLs.


*/

// ==UserScript==
// @name           Fark Defilterizer
// @description    Reverses comment filter at fark.com
// @include        http://forums.fark.com/cgi/fark/comments.pl?*
// ==/UserScript==

(function() {

	var words = new Array(
		new RegExp('shiat', 'g'),     'shit',
		new RegExp('biatch', 'g'),    'bitch',
		new RegExp('coont', 'g'),     'cunt',
		new RegExp('nubian', 'g'),    'nigger',
		new RegExp('Boobies', 'g'),   'first post',

		new RegExp('Fark you', 'g'),  'Fuck you',
		new RegExp('fark YOU', 'g'),  'FUCK YOU',
		new RegExp('Fark that', 'g'), 'Fuck that',
		new RegExp('THE fark', 'g'),  'THE FUCK',
		new RegExp('HOLY fark', 'g'), 'HOLY FUCK',

		new RegExp('([^\.\/l])fark', 'g'), '$1fuck',

		new RegExp('fcuk', 'g'),      'fuck',
		new RegExp('fukc', 'g'),      'fuck'
	);

	var tags = document.getElementsByTagName('div');
	for(var i = 0; i < tags.length; i++) {
		if(tags.item(i).className == 'ctext') {
			var post = " " + tags.item(i).innerHTML;
			for(var w = 0; w < words.length; w += 2) {
				post = post.replace(words[w], words[w + 1]);
			}
			tags.item(i).innerHTML = post;
		}
	}

})();
