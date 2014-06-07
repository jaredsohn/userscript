// ==UserScript==
// @name         BBCode for MAL
// @namespace    http://userscripts.org/users/92143
// @version      0.3
// @description  Converts disabled BBCode (e.g. img, yt, etc) to HTML at forums, clubs, blogs, etc on myanimelist.net as per built-in whitelist. 
// @include      /^http\:\/\/myanimelist\.net\//
// @require      http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant        GM_log
// ==/UserScript==

/* 
 * Copyright (c) 2011 Kai Mallea (kmallea@gmail.com)
 * 
 * Permission is hereby granted, free of charge, to any person obtaining 
 * a copy of this software and associated documentation files (the "Software"), 
 * to deal in the Software without restriction, including without limitation the 
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
 * copies of the Software, and to permit persons to whom the Software is furnished 
 * to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all 
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, 
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A 
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT 
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE 
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var WHITELIST = [
	/^\s*http\:\/\/([^\.\/]+\.)*myanimelist\.net\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*cute\-factor\.com\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*deviantart\.com\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*danbooru\.donmai\.us\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*dropbox\.com\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*dropcanvas\.com\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*e\-shuushuu\.net\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*emoticonswallpapers\.com\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*fbcdn\.net\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*fjcdn\.com\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*flagcounter\.com\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*flickr\.com\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*forgifs\.com\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*gelbooru\.com\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*glitter-graphics\.net\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*googleusercontent\.com\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*gyazo\.com\//i,
	/^\s*http\:\/\/([^\.\/]+\.)*hinata\.taigaforum\.com\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*hostpic\.org\//i,
	/^\s*http\:\/\/([^\.\/]+\.)*imageshack\.com\//i,
	/^\s*http\:\/\/([^\.\/]+\.)*imageshack\.us\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*imgbox\.com\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*imgbox\.de\//i,
	/^\s*http\:\/\/([^\.\/]+\.)*imgur\.com\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*instagram\.com\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*konachan\.com\//i,
	/^\s*http\:\/\/([^\.\/]+\.)*mal\.oko\.im\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*minitokyo\.net\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*minus\.com\//i,
	/^\s*http\:\/\/([^\.\/]+\.)*noelshack\.com\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*photobucket\.com\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*picasa\.com\//i,
	/^\s*http\:\/\/([^\.\/]+\.)*pinimg\.com\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*postimg\.org\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*puu\.sh\//i,
	/^\s*http\:\/\/([^\.\/]+\.)*sadpanda\.us\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*safebooru\.org\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*sankakucomplex\.com\//i,
	/^\s*http\:\/\/([^\.\/]+\.)*signature\.i906\.com\.my\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*signavatar\.com\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*tinypic\.com\//i,
	/^\s*http\:\/\/([^\.\/]+\.)*tumblr\.com\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*twimg\.com\//i,
	/^\s*http\:\/\/([^\.\/]+\.)*twitpic\.com\//i,
	/^\s*http\:\/\/([^\.\/]+\.)*whicdn\.com\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*wikimedia\.org\//i,
	/^\s*http\:\/\/([^\.\/]+\.)*uppix\.com\//i,
	/^\s*http\:\/\/([^\.\/]+\.)*yande\.re\//i, 
	/^\s*http\:\/\/([^\.\/]+\.)*zerochan\.net\//i
]

var bbcode = {};

bbcode.VERSION = '0.1';

_render = function (input) {
	
	// bbcode_table will contain objects with two
	// properties -- re and sub -- which contain
	// a regex literal and function to substitute the
	// match with, respectively
	var bbcode_table = {};
	
	if (!input) { return ''; }
	
	// replace [img]...[/img] with <img src="..."/>
	bbcode_table.img = {
		re: /\[img\]([\s\S]*?)\[\/img\]/ig,
		sub: function (match, p1) {
			if(isWhitelisted(p1)) {
				return '<img src="' + p1 + '" style="max-width:100%;" />'; 
			}
			return match;
		}
	};
	
	// replace [yt]...[/yt] with <iframe src="..."></iframe>
	bbcode_table.yt = {
		re: /\[yt\](?:https?:\/\/)?(?:www\.)?(?:youtu(?:\.be\/|be\.com\/watch\?v=))?([A-Z0-9\-_]+)(?:&(.*?))?\[\/yt\]/ig,
		sub: function (match, p1) { return '<iframe class="youtube-player" type="text/html" width="640" height="385" src="http://www.youtube.com/embed/' + p1 + '" frameborder="0"></iframe>'; }
	};
	
	//restore "<", ">", "&", etc
	input = encodeHtml(input);
	
	// process input against everything in bbcode_table
	for (var k in bbcode_table) {
		if (bbcode_table.hasOwnProperty(k)) {
			input = input.replace(bbcode_table[k].re, bbcode_table[k].sub);
		}
	}
	
	return input;        
};

bbcode.render = _render;

//"&lt;", "&gt;", "&amp;" and so on
function encodeHtml(t) {
	var container = document.createElement('div')
	//internet explorer v8-
	container.innerText = t
	//other browsers
	container.textContent = t
	return container.innerHTML
}

function isWhitelisted(string, whitelist) {
	whitelist = whitelist || WHITELIST
	var i = 0, l = whitelist.length
	while (l > i) {
		if (whitelist[i++].test(string)) {
			return true
		}
	}
	return false
}

//forum post and signature
$('td.forum_boardrow1 > div[id^="message"], td.forum_boardrow1 > div.sig, ' + 
//club comment
//'div[id^="comment"] td.borderClass, ' + 
//left part of club page
'div[style="width: 630px; padding-right: 7px; overflow: hidden;"]:first, ' + 
//user profile about-me
'div[style="width: 690px; overflow: hidden; margin: 0 auto;"]:first, ' + 
//user profile comment
'div[id^="com"] > div[id^="comtext"], ' + 
//people comment
'a[name^="com"] + table, ' + 
//blog
'#content > div[style="padding: 0 0 13px 13px;"]')
.find('*').addBack().contents().filter(function() {
	//text node
	return 3 === this.nodeType
}).each(function() {
	$(this).before(bbcode.render(this.nodeValue)).remove()
})

//missing images, especially those on profile pages
$('#content').find('*').contents().filter(function() {
	return this.nodeType === 8 && /\<img\ class\=\"userimg\"/.exec(this.nodeValue)
}).each(function() {
	$(this).replaceWith(this.nodeValue)
})
$('#content .userimg[data-src]').attr('src', function() {
	return $(this).attr('data-src')
})