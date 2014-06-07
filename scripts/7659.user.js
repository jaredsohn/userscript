
// UD 2 AtBC
// version 0.5
// 2007-02-22
//
// --------------------------------------------------------------------
//
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          UD2AtBC
// @namespace     http://wmute.livejournal.com
// @description   Reformat comments on Uncommon Descent to make it easy to post them on antievolution.org
// @include       http://www.uncommondescent.com*
// ==/UserScript==
//
// --------------------------------------------------------------------
//
// Inspired by SteveStory
//

/* BEGIN LICENSE BLOCK
Copyright (C) 2005 Mark Pilgrim

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You can download a copy of the GNU General Public License at
http://diveintomark.org/projects/greasemonkey/COPYING
or get a free printed copy by writing to the Free Software Foundation,
Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301, USA.
END LICENSE BLOCK */

var link_text = "Tard Alert!";
var tooltip = "Send this tarditude to AtBC";
var post_window = "http://www.antievolution.org/cgi-bin/ikonboard/ikonboard.cgi?;act=Post;CODE=02;f=14;t=1274";

function stripHTML(string)
{
	var re = /<\S[^><]*>/g;
	var quot_re = /"/g;
	var apos_re = /'/g;
	newstring = string.replace(re, "");
	newstring = newstring.replace(quot_re, "”");
	newstring = newstring.replace(apos_re, "’");
	return newstring;
}

function tweakHTML(string)
{
	var newline_re = /(\n|(<br[^><]*>))\s*/g;
	var para_re = /<\/?p[^><]*>/gi;
	var tab_re = /\t/g;
	var img_re = /<img[^><]*src="(\S*)"[^><]*>/gi;
	var quote_o_re = /<blockquote[^><]*>\s*/gi;
	var quote_c_re = /\s*<\/blockquote[^><]*>/gi;
	var italic_o_re = /<(i|(em))[^><]*>\s*/gi;
	var italic_c_re = /\s*<\/(i|(em))[^><]*>/gi;
	var bold_o_re = /<(b|(strong))>\s*/gi;
	var bold_c_re = /\s*<\/(b|(strong))[^><]*>/gi;
	var url_o_re = /<a[^><]*href="(\S*)"[^><]*>\s*/gi;
	var url_c_re = /\s*<\/a[^><]*>/gi;
	newstring = string.replace(newline_re, "<br />");
	newstring = newstring.replace(para_re, "");
	newstring = newstring.replace(tab_re, "");
	newstring = newstring.replace(img_re, "[img]$1[/img]");
	newstring = newstring.replace(quote_o_re, "[quote]");
	newstring = newstring.replace(quote_c_re, "[/quote]");
	newstring = newstring.replace(italic_o_re, "[i]");
	newstring = newstring.replace(italic_c_re, "[/i]");
	newstring = newstring.replace(bold_o_re, "[b]");
	newstring = newstring.replace(bold_c_re, "[/b]");
	newstring = newstring.replace(url_o_re, "[url=$1]");
	newstring = newstring.replace(url_c_re, "[/url]");
	return newstring;
}

comment_area = document.getElementById("comments");

all_comments = document.evaluate("./div[@class='comment'] | ./div[@class='comment author'] | //div[@class='comment moderator'] | //div[@class='comment last'] | //div[@class='comment author last'] | //div[@class='comment moderator last']", comment_area, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = 0; i < all_comments.snapshotLength; i++)
{
	comment = all_comments.snapshotItem(i);
	info_block = document.evaluate("div[@class='info']", comment, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	info_block = info_block.snapshotItem(0);
	comment_poster = document.evaluate("./p[@class='name']", info_block, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	comment_poster = stripHTML(comment_poster.snapshotItem(0).innerHTML);
	comment_url = document.evaluate("./p[@class='number']/a", info_block, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	comment_number = comment_url.snapshotItem(0).innerHTML;
	comment_url = comment_url.snapshotItem(0).href;
	comment_backlink = "[url=" + comment_url + "]" + comment_poster + " is a tard[/url]";
	comment_body_holder = document.evaluate("div[@class='body']", comment, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	comment_body_holder = comment_body_holder.snapshotItem(0);
	comment_body = "[quote]" + tweakHTML(comment_body_holder.innerHTML) + "[/quote]";
	comment_body_holder.id = "tard_" + comment_number;
	
	post = comment_backlink + comment_body;
	link_action = "document.getElementById(\'tard_" + comment_number + "\').innerHTML='" + post + "'; window.open('" + post_window + "', 'atbc'); return(false);"
	
	new_link = document.createElement('p');
	new_link.innerHTML = '<a href="#" onClick="' + link_action + '" title="' + tooltip + '" target="_blank">' + link_text + '</a>';
//	new_link.innerHTML = '<a href="#" onClick="document.tard_' + comment_number + '.submit();" title="' + tooltip + '">' + link_text + '</a>';
//	new_form = '<form name="tard_' + comment_number + '" method="post" action="http://www.antievolution.org/cgi-bin/ikonboard/ikonboard.cgi">';
//	new_form += '<input type="hidden" name="Post" value="' + post + '" />';
//	new_form += '<input type="hidden" name="act" value="Post" />';
//	new_form += '<input type="hidden" name="CODE" value="02" />';
//	new_form += '<input type="hidden" name="st" value="" />';
//	new_form += '<input type="hidden" name="f" value="14" />';
//	new_form += '<input type="hidden" name="t" value="1247" />';
//	new_form += '<input type="hidden" name="enablesig" value="yes" />';
//	new_form += '<input type="hidden" name="preview" value="Preview Post" />';
//	new_form += '</form>';
//	new_link.innerHTML += new_form;
	info_block.insertBefore(new_link, null);
}

