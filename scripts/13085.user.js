/* -*-mode:JavaScript;coding:latin-1;-*-
##### This is a Greasemonkey user script.
##### To use it, you need Greasemonkey first: http://greasemonkey.mozdev.org/
*/
// ==UserScript==
// @name	  Multiply Message Mark Read
// @namespace	  http://kailasa.net/prakash/greasemonkey/
// @description	  Add a checkmark for new messages to mark them as Read
// @version	  0.4
// @include	  http://multiply.com/*
// @author	  pk-moz@kailasa.net
// ==/UserScript==

const DEBUG = false;
var debug = DEBUG ? function(str) {GM_log(str);} : function(s) {};

if (!document.getElementById('item_table')) {
    debug('not on message board.');
    return;
}

debug('On Message Board!!!');

var gray_icon = 'data:image/gif;base64,R0lGODlhDAAMAOdqAAAAAAEBAQICAgMDAwQEBAUFBQYGBgcHBwgICAkJCQoKCgsLCwwMDA0NDQ4ODg8PDxAQEBERERISEhMTExQUFBUVFRYWFhcXFxgYGBkZGRoaGhsbGxwcHB0dHR4eHh8fHyAgICEhISIiIiMjIyQkJCUlJSYmJicnJygoKCkpKSoqKisrKywsLC0tLS4uLi8vLzAwMDExMTIyMjMzMzQ0NDU1NTY2Njc3Nzg4ODk5OTo6Ojs7Ozw8PD09PT4+Pj8/P0BAQEFBQUJCQkNDQ0REREVFRUZGRkdHR0hISElJSUpKSktLS0xMTE1NTU5OTk9PT1BQUFFRUVJSUlNTU1RUVFVVVVZWVldXV1hYWFlZWVpaWltbW1xcXF1dXV5eXl9fX2BgYGFhYWJiYmNjY2RkZGVlZWZmZmdnZ2hoaGlpaWpqamtra2xsbG1tbW5ubm9vb3BwcHFxcXJycnNzc3R0dHV1dXZ2dnd3d3h4eHl5eXp6ent7e3x8fH19fX5+fn9/f4CAgIGBgYKCgoODg4SEhIWFhYaGhoeHh4iIiImJiYqKiouLi4yMjI2NjY6Ojo+Pj5CQkJGRkZKSkpOTk5SUlJWVlZaWlpeXl5iYmJmZmZqampubm5ycnJ2dnZ6enp+fn6CgoKGhoaKioqOjo6SkpKWlpaampqenp6ioqKmpqaqqqqurq6ysrK2tra6urq+vr7CwsLGxsbKysrOzs7S0tLW1tba2tre3t7i4uLm5ubq6uru7u7y8vL29vb6+vr+/v8DAwMHBwcLCwsPDw8TExMXFxcbGxsfHx8jIyMnJycrKysvLy8zMzM3Nzc7Ozs/Pz9DQ0NHR0dLS0tPT09TU1NXV1dbW1tfX19jY2NnZ2dra2tvb29zc3N3d3d7e3t/f3+Dg4OHh4eLi4uPj4+Tk5OXl5ebm5ufn5+jo6Onp6erq6uvr6+zs7O3t7e7u7u/v7/Dw8PHx8fLy8vPz8/T09PX19fb29vf39/j4+Pn5+fr6+vv7+/z8/P39/f7+/v///yH5BAEUAPwALAAAAAAMAAwAAAhjAP8JHEiwYEF//gwSLBcsnsJ/7DgNYkXvX758A9N9MgSGELl7xXzd+5cuVKEterr5q1boEK5xoQx5ycMtIT1XdxRBKsQlz7eEAvOZukPIix5vBvGh2pJHpUJ8vLIBVeivn8GAADs=';

var green_icon = 'data:image/gif;base64,R0lGODlhDAAMAPUAACx8LHp4enp5ent4e3t6e3x4fBuIGxuJGxuNGxqRGhO9ExS8FADfAATfBBHSERPXExHeEQPgAwLiAgTgBDDAMDjOOHyKfFDQUFbRVlnTWVjUWJG0kZW2lb+6v4TIhI7WjpPBk5jYmKLWoqDeoMndydrY2t7b3t/c39rp2trs2uDc4ODf4OPk4+Hv4eTx5Ov16/P08/L28vT59Pf49/n4+fj6+Pr5+vz9/P7+/v/+/////8zMzAAAAAAAAAAAAAAAACH5BAUUADsALAAAAAAMAAwAAAZRQJ1wSCwWczkjMSV6KXWui8MD09VqwxZGkrCwZKOQTNfSNAyEE45EeXxQmQliYMLpYqAFpBI5BFZ2QjYbCgwIBSpGMxwAAmpKNB0lgUo4N0ZBADs='

GM_addStyle('.mark_msg_read_btn {color: gray; padding-left: 2px; } .mark_msg_read_btn:hover {color: #0B5EB4; cursor: pointer; } .marking_read { color: red; } ');

function add_mark_read_icon(msg) {
    var mark_read = document.createElement('span');
    mark_read.className = 'mark_msg_read_btn';
    mark_read.setAttribute('title', 'Click to mark message as read');
    mark_read.addEventListener('click', message_mark_read, false);
//     mark_read.appendChild(document.createTextNode('R'));
    var btn_img = document.createElement('img');
    btn_img.id = 'mark_read_btn_img';
    btn_img.src = gray_icon;
    mark_read.appendChild(btn_img);
    msg.appendChild(mark_read);
    mark_read.addEventListener('mouseover', function() { btn_img.src = green_icon; }, false);
    mark_read.addEventListener('mouseout', function() { btn_img.src = gray_icon; }, false);
    debug('added mark-read icon.');
}

function message_mark_read(e) {
    var target = e.target;
    debug('message_mark_read: target = |' + target + '|');
    debug('message_mark_read: target.id = |' + target.id + '|');
    if (target.id = 'mark_read_btn_img')
	target = target.parentNode;
    debug('message_mark_read: target = |' + target + '|');
    
    var mrow = target.parentNode.parentNode;
//     var item_url = get_item_url(mrow);
    var item = get_item_subject(mrow);

    if (!item) {
	debug('message_mark_read: item subject not found!');
	return;
    }

    debug('message_mark_read: item_url = |' + item.href + '|');
    get_message_and_mark_read(item, target);
}

function get_message_and_mark_read(item, trigger)
{
    debug('get_message_and_mark_read: item |' + item + '|');
    // GET item contents and extract mark-read url
    GM_xmlhttpRequest({
		method: 'GET',
		url: get_full_url(item.href),
		onload: function(resp) { send_message_mark_read_req(resp, item, trigger); }
	});
    debug('get_message_and_mark_read: item request sent.');

    if (trigger)
	trigger.className += ' marking_read';
}

function send_message_mark_read_req(resp, item, trigger) {
    debug('send_message_mark_read_req: received item text - ' + resp.responseText.length + ' bytes');

    var mark_read_url;
    var m = resp.responseText.match(/<img.*?src="?(http:\/\/images\.\w+\.multiply\.com\/fmr\/.*?)[>" ]/);
    if (m) {
	mark_read_url = m[1];
	debug('send_message_mark_read_req: mark_read_url = |' + mark_read_url + '|');
    } else {
	debug('send_message_mark_read_req: mark_read url not found');
	return;
    }

    // send mark-read url request
    GM_xmlhttpRequest({
    	    method: 'GET',
	    url : mark_read_url,
	    onload: function(resp) { clear_mark_read_button(item, trigger); }
	});
    debug('send_message_mark_read_req: mark-read request sent.');
}

function clear_mark_read_button(item, mark_read_btn) {
    if (mark_read_btn)
	mark_read_btn.style.display = 'none';

//     var mrow = mark_read_btn.parentNode.parentNode;
    var mrow = item.parentNode;
    debug('changing mrow.className from ' + mrow.className + ' to uptodate');
    mrow.className = mrow.className.replace(/mrow .*/, 'mrow uptodate');
}

function mark_read_deferred(item) {
    var mark_read_fn = function() {
	var mark_read_btn = get_mark_read_button(item);
	debug('mark_read_deferred: mark-read-btn |' + mark_read_btn + '| for item |' + item.href + '|');
	get_message_and_mark_read(item, mark_read_btn);
    }

    return mark_read_fn;
}

function mark_all_messages_read(e) {
    var items = get_unread_messages();

    if (items.length > 0) {
	debug('mark_all_messages_read: ' + items.length + ' unread messages found.');
	for (var i = 0; i < items.length; i++) {
	    var item = items[i];
	    debug('mark_all_messages_read: marking item ' + item.href + ' as read ...');
	    var mark_read_fn = mark_read_deferred(item);
	    window.setTimeout(mark_read_fn, 50 * i + 1);
	}

	window.setTimeout(function() {update_mark_all_link_status(items);}, items.length * 50);
    }
}

function add_mark_all_read_link() {
    var items = document.getElementById('item_table');
    if (!items) {
	debug('No messages on the page. nothing to do.');
	return;
    }

    var first_child = items.firstChild;
    while (first_child.tagName != 'DIV')
	first_child = first_child.nextSibling;
    if (first_child && first_child.className == 'nomailmessages') {
	debug('No messages on the page. nothing to do.');
	return;
    }

    var link = document.createElement('a');
    link.id = 'mark_all_messages_read';
    link.className = 'select';
    link.appendChild(document.createTextNode('Mark all messages on this page as read'));

    link.addEventListener('click', mark_all_messages_read, false);

    var div = document.createElement('div');
    div.style.margin = '5px';
    div.style.cursor = 'pointer';
    div.appendChild(link);

    items.appendChild(div);
}

function update_mark_all_link_status(unread) {
//     var unread = get_unread_message_urls();
    debug('update_mark_all_link_status: ' + unread.length + ' unread messages');
    if (!unread || unread.length == 0) {
	var mark_all_link = document.getElementById('mark_all_messages_read');
	mark_all_link.parentNode.innerHTML = '<strong>All messages on this page are marked read.</strong>';
    }
    else {
	var now_unread = new Array();
	for (var i = 0; i < unread.length; i++) {
	    if (!unread[i].parentNode.className.match(/uptodate/))
		now_unread.push(unread[i]);
	}
	window.setTimeout(function() {update_mark_all_link_status(now_unread)}, 50);
    }
}

function get_unread_messages() {
    debug('get_unread_message_urls: -->');
    // get all unread messages
    var all_items = document.getElementById('item_table');
    if (!all_items)
	return null;

    var messages = new Array();
    for (var i = 0, item; item = all_items.childNodes.item(i); i++) {
	if (item.tagName != 'DIV' || !item.className.match(/\b(newreplies|unread)\b/))
	    continue;

	// get item url
	debug('get_unread_messages: getting url for child ' + i);
	var message = get_item_subject(item);
	if (!message) {
	    debug('get_unread_messages: message not found for child ' + i);
	    continue;
	}

	messages.push(message);
    }
    debug('get_unread_messages: ' + messages.length + ' messages found.');

    return messages;
}

function get_item_url(mrow) {
    var item_url = null;
    for (var i = 0, child; child = mrow.childNodes[i]; i++) {
	// debug('get_item_url: child ' + i + ' - ' + child.tagName);
	if (child.tagName == 'A' && child.firstChild.tagName == 'H4') {
	    item_url = child.getAttribute('href');
	    debug('get_item_url: url |' + item_url + '|');
	    item_url = get_full_url(item_url);
	    break;
	}
    }
    return item_url;
}

function get_item_subject(mrow) {
    for (var i = 0, child; child = mrow.childNodes[i]; i++) {
	if (child.tagName == 'A' && child.firstChild.tagName == 'H4') {
	    debug('get_item_subject: child ' + i + ' - ' + child.href);
	    return child;
	}
    }
    return null;
}

function get_mark_read_button(item) {
    if (!item)
	return null;

    var next = item.nextSibling;
    while (next) {
	if (next.tagName == 'DIV' && next.className == 'mailreplies') {
	    return next.lastChild;
	}
	next = next.nextSibling;
    }

    return null;
}

function get_full_url(item_url) {
    if (!item_url)
	return;

    if (!item_url.match(/^http/)) {
	var host = document.location.protocol + '//' + document.location.host;
	if (item_url.match(/^\//)) {
	    item_url = host + item_url;
	} else {
	    item_url = host + document.location.pathname.replace(/[^\/]*$/, '') + item_url;
	}
	debug('get_full_url: item_url = |' + item_url + '|');
    }

    return item_url;
}

var xpath_expr = '//div[contains(@class, "mrow ") and not(contains(@class, "uptodate"))]/div[@class="mailreplies"]';
var xpr = document.evaluate(xpath_expr, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

debug(xpr.snapshotLength + ' unread messages found');

for (var i = 0, unread_msg; unread_msg = xpr.snapshotItem(i); i++) {
    add_mark_read_icon(unread_msg);
}
add_mark_all_read_link();
