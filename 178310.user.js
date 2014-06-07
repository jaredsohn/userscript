// ==UserScript==
// @name         Unsafe BBCode for MAL
// @namespace    http://userscripts.org/users/92143
// @version      0.6
// @description  Converts potentially unsafe BBCode (e.g. url, img, etc) to HTML at forums, clubs, etc on myanimelist.net. USE AT YOUR OWN RISK. 
// @include      /^http\:\/\/myanimelist\.net/
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

var bbcode = {};

bbcode.VERSION = '0.1';

_render = function (input) {
	
	// bbcode_table will contain objects with two
	// properties -- re and sub -- which contain
	// a regex literal and function to substitute the
	// match with, respectively
	var bbcode_table = {};
	
	if (!input) { return ''; }
	
	// relace [color=red]...[/color] with <span style="color:red;">...</span>
	bbcode_table.color = {
		re: /\[color=([#a-z0-9]+)\]([\s\S]*?)\[\/color\]/ig,
		sub: function (match, p1, p2) { return '<span style="color:' + p1 + ';">' + p2 + '</span>'; }
	};
	
	// replace [url]...[/url] with <a href="...">...</a>
	bbcode_table.url = {
		re: /\[url\]([\s\S]*?)\[\/url\]/ig,
		sub: function (match, p1) { return '<a href="' + p1 + '">' + p1 + '</a>'; }
	};
	
	// replace [url=someurl]some text[/url] with <a href="someurl">some text</a>
	bbcode_table.urlcustom = {
		re: /\[url=(.*?)\]([\s\S]*?)\[\/url\]/ig,
		sub: function (match, p1, p2) { return '<a href="' + p1 + '">' + p2 + '</a>'; }
	};    
	
	// replace [img]...[/img] with <img src="..."/>
	bbcode_table.img = {
		re: /\[img\]([\s\S]*?)\[\/img\]/ig,
		sub: function (match, p1, p2) { return '<img src="' + p1 + '" style="max-width:100%;" />'; }
	};
		
	// replace [youtube]...[/youtube] with <iframe src="..."></iframe>
	bbcode_table.youtube = {
		re: /\[youtube\](?:https?:\/\/)?(?:www\.)?(?:youtu(?:\.be\/|be\.com\/watch\?v=))?([A-Z0-9\-_]+)(?:&(.*?))?\[\/youtube\]/ig,
		sub: function (match, p1) { return '<iframe class="youtube-player" type="text/html" width="640" height="385" src="http://www.youtube.com/embed/' + p1 + '" frameborder="0"></iframe>'; }
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

//forum post and signature
$('td.forum_boardrow1 > div[id^="message"], td.forum_boardrow1 > div.sig, ' + 
//club comment
'div[id^="comment"] td.borderClass, ' + 
//user profile about-me
//'div[style="width: 690px; overflow: hidden; margin: 0 auto;"]:first, ' + 
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
