// ==UserScript==
// @name          Next/Previous Navigation
// @namespace     http://www.tobez.org/download/greasemonkey/
// @description   Next/Previous links one keypress away!
// @include       *
// ==/UserScript==

/**
 ** $Id: next-prev-navigation.user.js,v 1.38 2006/05/11 19:28:29 tobez Exp $
 **
 ** next-prev-navigation.user.js $Revision: 1.38 $
 **
 ** ----------------------------------------------------------------------------
 ** "THE BEER-WARE LICENSE" (Revision 42)
 ** <tobez@tobez.org> wrote this file.  As long as you retain this notice you
 ** can do whatever you want with this stuff. If we meet some day, and you think
 ** this stuff is worth it, you can buy me a beer in return.   Anton Berezin
 ** ----------------------------------------------------------------------------
 **
 ** The Next/Previous navigation script adds keyboard shortcuts for
 ** jumping around various paginated screens.  Newspapers articles,
 ** search results and stuff like that come to mind.
 ** Just press right arrow to go to the next page, left
 ** arrow to go to the previous page.
 **
 ** The ultimate goal is to support as many variants of "next" and
 ** "previous" buttons as possible, so if you encounter a page for
 ** which it does not work, please drop me a mail with the link.
 **
 ** I would like to thank Flemming Jacobsen for the idea of the script.
 ** 
 ** This is a greasemonkey script, intended for use with the Firefox extension
 ** Greasemonkey.
 ** More info about Greasemonkey: http://greasemonkey.mozdev.org/
 **
 ** More info about my Greasemonkey scripts:
 **    http://www.tobez.org/download/greasemonkey/
 **
 **/

(function() 
{
	var NODE_TEXT = 3;
	var NODE_ELEMENT = 1;
	var kb_arrow_left = 37;
	var kb_arrow_right = 39;
	var img_attrs = { src: 1, alt: 1, title: 1 };
	var input_focus = 0;

	/*
       Urls that don't work but should:
         http://www.jesusandmo.net/2005/12/07/xmas/
       Urls that work and should stay working (for the forthcoming test suit):
         http://www.metku.net/index.html?sect=view&n=0&path=mods/spire2/index_eng
         http://foto.signout.dk/20051226/IMG_4034.JPG?width=640
         http://www.markfiore.com/animation/flamey.html
     */

	function empty(t)
	{
		return t == null || t == "" || t.match(/^\s*$/);
	}

	function get_text_content(n)
	{
		var s = "";
		var children = n.childNodes;
		for(var i = 0; i < children.length; i++) {
			var c = children[i];
			if (c.nodeType == NODE_TEXT)
				s += c.data;
			else
				s += get_text_content(c);
		}
		return s;
	}

	function get_image_info(n)
	{
		var children = n.childNodes;
		var t = new Array();
		for(var i = 0; i < children.length; i++) {
			var c = children[i];
			if (c.nodeType == NODE_ELEMENT && /img/i.test(c.nodeName)) {
				for (var attr in img_attrs) {
					var txt = c.getAttribute(attr) || "";
					if (!empty(txt))	t.push(txt);
				}
			}
		}
		return t;
	}

	function go_to_link(a)
	{
		try {
			var click = a.getAttribute("onclick");
			if (click)
				eval(click);  // XXX dangerous? yes/no
		} finally {
			window.location.href = a.getAttribute("href");
		}
	}

	function get_link_info(a)
	{
		var t = new Array();
		var txt = get_text_content(a);
		if (!empty(txt))	t.push(txt);
		txt = a.getAttribute("title") || "";
		if (!empty(txt))	t.push(txt);
		t = t.concat(get_image_info(a));
		txt = a.getAttribute("class") || "";
		if (!empty(txt))	t.push(txt);
		return t;
	}

	function try_by_url(increment)
	{
		var loc = window.location.href;

		/* Handle likes of "page007.html" */
		var m = loc.match(/(0*)(\d+)(\.html?)\b/);
		if (m && m.length) {
			window.location.href = loc.replace(/(0*)(\d+)\.html?\b/, m[1]+(parseInt(m[2])+increment)+m[3]);
			return;
		}

		/* Handle likes of something/2006/02/10/index.html */
		m = loc.match(/\/(\d{2,4})\/(\d\d)\/(\d\d)\//);
		if (m && m.length) {
			var year = parseInt(m[1],10);
			var full_year = year;
			if (full_year < 100) {
				full_year += 1900;
				if (full_year < 1970)
					full_year += 100;
			}
			var month = parseInt(m[2],10);
			var day = parseInt(m[3],10);
			if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
				var d = new Date();
				d.setFullYear(year, month-1, day);
				d.setDate(d.getDate()+increment);
				full_year = d.getFullYear();
				if (year < 100) {
					full_year = full_year - 1900;
					if (full_year >= 100)
						full_year -= 100;
					if (full_year < 10)
						full_year = "0" + full_year;
				}
				month = d.getMonth() + 1;
				if (month < 10)
					month = "0" + month;
				day = d.getDate();
				if (day < 10)
					day = "0" + day;
				window.location.href = loc.replace(/\/(\d{2,4})\/(\d\d)\/(\d\d)\//, "/" + full_year + "/" + month + "/" + day + "/");
				return;
			}
		}

	}

	function try_previous()
	{
		try_something(
			"prev",
			[/^\s*\[?(\S+\s+)?(prev(ious)?|vorige|zurück|zurÃ¼ck|forrige)(\s+page(\s+-.*)|\s+\d+\s+\w+|:\s+.*)?(\s+\S+)?\]?\s*$/i,
			/\/?\S*prev(ious)?(-\w+)?\d*(button)?\.(gif|png|jpg)\s*$/i,
			/older\s+(version|revision)$/i,
			/^\s*(&laquo;|&lt;&lt;|<<|«|Â«|<+-+)(\s*\S+)?((\s+-)?\s+(prev|image).*)?\s*$/i,
			/\/?\S*(back|left)([-_]\w*)?\d*(button)?\.(gif|png|jpg)\s*$/i,
			/^\s*back\s*$/i,
			], -1);
	}

	function try_next()
	{
		try_something(
			"next",
			[/^\s*\[?(next|vorwärts|vorwÃ¤rts|nächste|nÃ¤chste|næste|nÃ¦ste|more results)(\s+page(\s+-.*)|\s+\d+\s+\w+|:\s+.*)?(\s+\S+)?(\]|\s*(&gt;|>))?\s*$/i,
			/\/?\S*next(-\w+)?\d*(button)?\.(gif|png|jpg)\s*$/i,
			/^newer\s+(version|revision)/i,
			/^\s*(\S+(\s+\S+)?\s*)?(&raquo;|&gt;&gt;|>>|»|Â»|-+>+)((\s+-)?\s+(image|img).*)?\s*$/i,
			/\/?\S*(forth|right)([-_]\w*)?\d*(button)?\.(gif|png|jpg)\s*$/i,
			], 1);
	}

	function try_rel_link(rel_type)
	{
		var l = document.getElementsByTagName("link");
		for (var i = 0; i < l.length; i++) {
			if (l[i].getAttribute("rel") == rel_type && l[i].getAttribute("href")) {
				go_to_link(l[i]);
				return true;
			}
		}
		return false;
	}

	function try_something(rel_type, re, incr)
	{
		if (try_rel_link(rel_type))
			return;
		var anchors = document.getElementsByTagName("a");
		var links = new Array();
		for (var i = 0; i < anchors.length; i++) {
			var a = anchors[i];
			var t = get_link_info(a);
			// if (window.location.href.match(/testsite/)) {
			// 	for (var j = 0; j < t.length; j++) {
			// 		alert(t[j]);
			// 	}
			// }
			for (var j = 0; j < t.length; j++) {
				for (var k = 0; k < re.length; k++) {
					if (t[j].match(re[k])) {
						// alert("match: " + t[j] + " with " + re[k].toString());
						links.push({rank: k, link: a});
					}
				}
			}
		}
		var rank = 9999;
		var link;
		for (var i = 0; i < links.length; i++) {
			if (links[i].rank < rank) {
				rank = links[i].rank;
				link = links[i].link;
			}
		}
		if (link)
			go_to_link(link);
		else
			try_by_url(incr);
	}

	function key_handler(e)
	{
		if (input_focus == 0) {
			if (e.keyCode == kb_arrow_left) {
				try_previous();
			} else if (e.keyCode == kb_arrow_right) {
				try_next();
			}
		}
	}

	function attach()
	{
		document.addEventListener("keydown", key_handler, false);
		["input","select","textarea"].forEach(function (type) {
			var els = document.getElementsByTagName(type);
			for (var i = 0; i < els.length; i++) {
				els[i].addEventListener("focus", function () { input_focus = 1; }, false);
				els[i].addEventListener("blur", function () { input_focus = 0; }, false);
			};
		});
	}
	
	attach();
})();
