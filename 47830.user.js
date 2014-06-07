// ==UserScript==
// @author         Crend King
// @version        2.1.3
// @name           Google Reader: Mark some as read
// @namespace      http://users.soe.ucsc.edu/~kjin
// @description    Mark the entries below, above or between certain entries as read in Google Reader.
// @include        http://www.google.com/reader/view/*
// @include        https://www.google.com/reader/view/*
// @exclude        http://www.google.com/reader/view/#search/*
// @exclude        https://www.google.com/reader/view/#search/*
// @homepage       http://userscripts.org/scripts/show/47830
// @downloadURL    https://userscripts.org/scripts/source/47830.user.js
// @updateURL      https://userscripts.org/scripts/source/47830.meta.js
// ==/UserScript==

/*

version history

2.1.3 on 10/31/2011:
- Support new Google Reader.

2.1.2 on 03/28/2011:
- Optimize code.

2.1.1 on 03/24/2011:
- Fix bug when no at clause is presented.
- Performance optimization when session token is expired.

2.1 on 03/23/2011:
- Intelligent session token retrieval
- Fix bug in session token request.

2.0 on 03/17/2011:
- Employ new API to retrieve item IDs.
- Employ new API to compare items.
- Mark multiple items in one request.
- Bug fix, code refactor and optimization.
- UI improvement.
- Implement a decimal to hexadecimal conversion function for 64-bit numbers.

1.5.5 on 03/11/2011:
- Improve XPath performance.
- Fix bug of ajax request in unread_entry().

1.5.4 on 03/10/2011:
- Add option to force requesting a session token each time the marking starts.

1.5.3 on 03/09/2011:
- Fix bug that current stream ID cannot be retrieved.

1.5.2 on 03/08/2011:
- Fix bug that script crashes when any unread entry has no original link.
- Swap single quotes and double quotes in the script.

1.5.1 on 03/08/2011:
- Fix bug that entries from feeds other than the current are mismarked.

1.5 on 03/06/2011:
- Turn synchronized marking model to asynchronized.

1.4.1 on 03/05/2011:
- Improve compatibility with other extensions (thanks cheek, reference: http://userscripts.org/topics/40771);

1.4 on 03/03/2011:
- Support new Google Reader API, mainly adapted for the Google Multiple sign-in feature.
- Script only applies to google.com.

1.3.10 on 11/16/2010:
- Mark buttons are not made if the "Mark all as read" button is invisible (e.g. on search pages).

1.3.9 on 08/27/2009:
- Fix visual marking bug when only new items are shown.

1.3.8 on 06/30/2009:
- Use Firefox native JSON object, which is introduced in Firefox 3.5.

1.3.7 on 05/20/2009:
- Optimize implementation of message display.

1.3.6 on 05/19/2009:
- Use Google Reader's native message area to show information.

1.3.5 on 05/19/2009:
- Add option to reload the page after marking.

1.3.4 on 05/18/2009:
- Write comments.

1.3.3 on 05/16/2009:
- Fix bug that marking fails when feed's URL contains HTML entities.

1.3.2 on 05/07/2009:
- Fix bug that previous from entry will be marked unread if click mark is followed by a mark below/above.
- Fix bug when clicking buttons without selecting an entry first.
- Cannot click mark on same entry.

1.3.1 on 05/05/2009:
- Support the magic sort order ("Sort by auto").
- Fix bug that sometimes the entries in the reader panel are not marked read.

1.3 on 05/04/2009:
- Allow script to be used in any view ("All items", specific feed, label or folder).
- Add information text;

1.2.1 on 04/30/2009:
- Fix bug when user has multiple feeds and labels.

1.2 on 04/30/2009:
- Implement Click Mark.
- Minimize use of XPath.

1.1 on 04/30/2009:
- Request reading list in JSON format rather than XML.
- Fix sort order problem.

1.0 on 04/29/2009:
- Initial version.

*/


//// preference section ////

// set to true to show "Mark below as read" and "Mark above as read" buttons
var SHOW_BUTTONS = true;

// set to true to enable keyboard shortcuts
var KEYPRESS_MARK = false;

// "Click Mark" is a feature that when clicking an entry, the script will mark the entries
// between the current entry and the clicked entry as read. set to false to disable it.
var CLICK_MARK = false;

// reload the page after marking
var RELOAD_AFTER_MARK = false;


//// code section ////

// milliseconds to show messages
var MSG_TIMEOUT = 4000;

// the "entries" element in Google Reader
var entries_node = document.getElementById('entries');

var msg_area = document.getElementById('message-area');

// the action of the current marking (below, above, between)
var mark_action;

// counters
var entry_ts_counter;
var actual_mark_counter;

// current step of the main function
var curr_prog;

// the string the user is currently viewing
var curr_stream_id;

// encoded active user ID for multiple sign-in
// appended at the end of URL for every request
var at_clause;

// 'd': sort by newest; 'o': sort by oldest; 'm': sort by auto
var list_order;

// object of the current entry. members:
// node: corresponding DOM node
// index: index in the read list
// ts: timestampUsec from server
var curr_entry = {};

// object of the from entry for ClickMark
var from_entry = {};

// session token retrieved from server
// required for marking requests
var session_token;

// list of unread items
var unread_list;

var item_clauses = [];

// shortcut to debug function
var d = function(a)
{
	unsafeWindow.console.log(a);
};

/*
converts a string of 64-bit signed decimal number (-0x8000000000000000 - 0x7fffffffffffffff) to unsigned hexadecimal
0x7fffffffffffffff =  922337203 6854775807 (19 digits)
0xffffffffffffffff = 1844674407 3709551615 (20 digits)

Javascript cannot do arithmetic accurately over 2^53
this function splits the string into two parts (high, low), each at most 10 digits, process them separately
*/
var dec2hex = function (n)
{
	// check sign
	var is_negative = (n[0] == '-');
	if (is_negative)
		digits = n.substr(1);
	else
		digits = n;

	// split number to two parts, each at most 10 digits
	var high = digits.substr(0, digits.length - 10);
	var low = digits.substr(high.length);
	high = Number(high);
	low = Number(low);

	// if negative number, convert to its 2's complement
	// otherwise, the output is signed
	if (is_negative)
	{
		high = 1844674406 - high;
		low = 13709551616 - low;
	}

	var hex = '0123456789abcdef';
	var ret = '';
	
	while (high > 0 || low > 0)
	{
		// division of high over 16
		var high_div = high % 16;
		high = Math.floor(high / 16);
	
		// carry to low
		low += high_div * 10000000000;
	
		// division of low over 16
		var low_div = low % 16;
		low = Math.floor(low / 16);
	
		// convert remainder to hexadecimal
		ret = hex[low_div] + ret;
	}
	
	// Google Reader item ID needs to be padded in the front to 16 bytes
	for (var i = ret.length; i < 16; ++i)
		ret = '0' + ret;	

	return ret;
};

// replace the old class to a new class in the given node
// specify $ for the old class to add the new class
// specify '' for the new class to remove the old class
var replace_class = function(node, old_cls, new_cls)
{
	node.className = node.className.replace(new RegExp('\s?' + old_cls), new_cls);
};

var show_prog_msg = function()
{
	msg_area.textContent = 'Marking target items as read: ' + (curr_prog++) + ' / 4';
	
	// show message area
	msg_area.className = 'jfk-butterBar jfk-butterBar-shown jfk-butterBar-promo';
};

var hide_msg_area = function()
{
	// hide message area
	msg_area.className = 'jfk-butterBar';	
};

var show_info_msg = function(msg)
{
	msg_area.textContent = msg;
	msg_area.className = 'jfk-butterBar jfk-butterBar-shown jfk-butterBar-info';
	window.setTimeout(hide_msg_area, MSG_TIMEOUT);
};

var get_curr_entry = function(entry)
{
	entry.node = document.getElementById('current-entry');

	if (entry.node == null)
		entry.index = -1;
	else
		entry.index = document.evaluate('count(./preceding-sibling::*)', entry.node, null, XPathResult.NUMBER_TYPE, null).numberValue;
};

// ajax function to get the sort order of the current view
var get_sort_order = function()
{
	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: 'https://www.google.com/reader/api/0/preference/stream/list' + at_clause + 'output=json',
		onload: function(response)
		{
			try
			{
				var query_result = JSON.parse(response.responseText);
				var sort_order;
				
				var list_prefs = query_result.streamprefs[curr_stream_id];
				if (list_prefs != undefined)
				{
					for (var i = 0; i < list_prefs.length; ++i)
					{
						// find the key 'ranking', get the raw preference value
						if (list_prefs[i].id == 'ranking')
						{
							sort_order = list_prefs[i].value;
							break;
						}
					}
				}
				
				// 'o': sort by oldest
				// 'a': sort by auto
				// by default, it is sort by newest
				switch (sort_order)
				{
				case 'oldest':
					list_order = 'o';
					break;
				case 'auto':
					show_info_msg('"Sort by magic" is not supported');
					return;
				default:
					list_order = 'n';
					break;
				}

				show_prog_msg();
				
				get_entry_ts(curr_entry);
				get_entry_ts(from_entry);
			}
			catch (e)
			{
				show_info_msg('Error occurred in get_sort_order(): ' + e);
			}
		}
	});
};

// ajax function to get the ID of the entry node from server
// the index in the Google Reader page equals to the index in the API output
var get_entry_ts = function(entry)
{
	if (entry.index >= 0)
	{
		GM_xmlhttpRequest(
		{
			method: 'GET',
				
			// the API URL contains the sort order
			url: 'https://www.google.com/reader/api/0/stream/items/ids' + at_clause + 'output=json&s=' + curr_stream_id + '&n=' + (entry.index + 1) + '&r=' + list_order,
			onload: function(response)
			{
				try
				{
					var id_list = JSON.parse(response.responseText);
					entry.ts = id_list.itemRefs[entry.index].timestampUsec;
				
					entry_ts_counter += 1;
					show_prog_msg();

					if (entry_ts_counter == 2)
						get_unread_list();
				}
				catch (e)
				{
					show_info_msg('Error occurred in get_entry_ts(): ' + e);
				}
			}
		});
	}
	else
	{
		entry_ts_counter += 1;
		show_prog_msg();
	}
};

// ajax function to get the unread list
var get_unread_list = function()
{
	GM_xmlhttpRequest(
	{
		method: 'GET',
		url: 'https://www.google.com/reader/api/0/stream/items/ids' + at_clause + 'output=json&s=' + curr_stream_id + '&xt=user/-/state/com.google/read&n=1000&r=' + list_order,
		onload: function(response)
		{
			unread_list = JSON.parse(response.responseText);

			switch(mark_action)
			{
			case 'below':
				mark_below_server();
				break;
			case 'above':
				mark_above_server();
				break;
			case 'between':
				mark_between_server();
				break;
			}
		}
	});
};

// prepare the 'i=' clauses for given item ID
var prepare_item_clauses = function(item_ids)
{
	if (item_ids.length == 0)
	{
		show_prog_msg();
		show_info_msg('Marked target items as read.');
		return;
	}

	// construct item ID clauses for massive tagging in one request

	var max_items_per_request = 250;
	var i_clauses = '';

	for (var i = 0; i < item_ids.length; ++i)
	{
		i_clauses += '&i=' + item_ids[i];

		// if this is the last item, or maximum number of items have reached
		if ((i == item_ids.length - 1) || ((i + 1) % max_items_per_request == 0))
		{
			item_clauses.push(i_clauses);
			i_clauses = '';
		}
	}
};

// ajax function to request a new session token and try marking items read again
var get_session_token = function()
{
	GM_xmlhttpRequest(
	{
		method: "GET",
		url: "https://www.google.com/reader/api/0/token" + at_clause,
		onload: function(response)
		{
			if (response.status == 200)
			{
				session_token = response.responseText;
				mark_items_read(true);
			}
			else
				show_info_msg('Error occurred in get_session_token().');
		}
	});
};

// ajax function to mark items in the item clauses to read
var mark_items_read = function(is_final)
{
	var num_requests = 0;
	var mark_result = true;

	for (var i = 0; i < item_clauses.length; ++i)
	{
		GM_xmlhttpRequest(
		{
			method: 'POST',
			url: 'https://www.google.com/reader/api/0/edit-tag' + at_clause + 'output=json',
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			data: 'a=user/-/state/com.google/read&async=true&T=' + session_token + item_clauses[i],
			onload: function(response)
			{
				++num_requests;

				if (response.responseText != 'OK')
					mark_result = false;
			
				// finalize until all pending requests are responded	
				if (num_requests == item_clauses.length)
				{
					if (mark_result)
					{
						// all requests are successful
						
						// free memory
						item_clauses = [];
	
						show_prog_msg();
		
						// every item is marked successfully
		
						if (RELOAD_AFTER_MARK)
							window.location.reload();
						else
						{
							switch (mark_action)
							{
							case 'below':
								mark_below_view();
								break;
							case 'above':
								mark_above_view();
								break;
							case 'between':
								mark_between_view();
								break;
							}
		
							show_info_msg('Marked target items as read.');
						}
					}
					else if ((response.responseHeaders.indexOf('X-Reader-Google-Bad-Token') != -1) && !is_final)
					{
						// session token is expired
						// request new one and remark
						get_session_token();
					}
					else
					{
						// free memory
						item_clauses = [];
	
						show_info_msg('Error occurred in prepare_item_clauses().');
					}
				}
			}
		});
	}
};

// function to mark the entries below the current in the view
var mark_below_view = function()
{
	var next_node = curr_entry.node.nextElementSibling;
	while (next_node)
	{
		replace_class(next_node, '$', ' read');
		next_node = next_node.nextElementSibling;
	}
};

// function to mark the entries below the current in the server
var mark_below_server = function()
{
	var item_ids = [];

	for (var i = unread_list.itemRefs.length - 1; i >= 0; i--)
	{
		var curr_item = unread_list.itemRefs[i];
		var is_earlier = (curr_item.timestampUsec < curr_entry.ts);
		if ((list_order == 'n') ? !is_earlier : is_earlier)
			break;

		item_ids.push(curr_item.id);
	}

	prepare_item_clauses(item_ids);
	mark_items_read(false);
};

// function to mark the entries above the current in the view
var mark_above_view = function()
{
	var prev_node = curr_entry.node.previousElementSibling;
	while (prev_node)
	{
		replace_class(prev_node, '$', ' read');
		prev_node = prev_node.previousElementSibling;
	}
};

// function to mark the entries above the current in the server
var mark_above_server = function()
{
	var item_ids = [];

	for (var i = 0; i < unread_list.itemRefs.length; ++i)
	{
		var curr_item = unread_list.itemRefs[i];
		var is_later = (curr_item.timestampUsec > curr_entry.ts);
		if ((list_order == 'n') ? !is_later : is_later)
			break;

		item_ids.push(curr_item.id);
	}
	
	prepare_item_clauses(item_ids);
	mark_items_read(false);
};

// function to mark the entries between the current and the from in the view
var mark_between_view = function()
{
	var top_node, bottom_node;
	if (from_entry.index < curr_entry.index)
	{
		top_node = from_entry.node;
		bottom_node = curr_entry.node;
	}
	else
	{
		top_node = curr_entry.node;
		bottom_node = from_entry.node;
	}
	
	while (top_node != bottom_node)
	{
		replace_class(top_node, '$', ' read');
		top_node = top_node.nextElementSibling;
	}
};

// function to mark the entries between the current and the from in the server
var mark_between_server = function()
{
	var early_item_ts, late_item_ts;
	if (curr_entry.ts < from_entry.ts)
	{
		early_item_ts = curr_entry.ts;
		late_item_ts = from_entry.ts;
	}
	else
	{
		early_item_ts = from_entry.ts;
		late_item_ts = curr_entry.ts;
	}

	var item_ids = [];
	
	for (var i = 0; i < unread_list.itemRefs.length; ++i)
	{
		var curr_item = unread_list.itemRefs[i];

		var is_earlier_late = (curr_item.timestampUsec < late_item_ts);
		if ((list_order == 'n') ? !is_earlier_late : is_earlier_late)
			continue;
		
		var is_later_early = (curr_item.timestampUsec > early_item_ts);
		if ((list_order == 'n') ? !is_later_early : is_later_early)
			break;

		item_ids.push(curr_item.id);
	}
	
	prepare_item_clauses(item_ids);
	mark_items_read(false);
};

// initialization of the mark process
var begin_mark = function(action)
{
	get_curr_entry(curr_entry);
	
	// if no selected entry
	if (curr_entry.index == -1 || from_entry.index == -1)
	{
		show_info_msg('Select an entry first.');
		return;
	}
	
	// no ClickMark on a same node
	if (action == 'between' && curr_entry.index == from_entry.index)
	{
		show_info_msg('Same entry for ClickMark.');
		return;
	}

	if (unsafeWindow.location.hash)
		curr_stream_id = unsafeWindow.location.hash.substr(8);	// omit '#stream/'
	else
		curr_stream_id = 'user/-/state/com.google/reading-list';
	
	at_clause = unsafeWindow.location.search;
	if (at_clause)
		at_clause += '&';
	else
		at_clause = '?'
	
	// initially use the session token supplied by Google Reader
	session_token = unsafeWindow._COMMAND_TOKEN;

	mark_action = action;
	
	entry_ts_counter = 0;
	actual_mark_counter = 0;

	curr_prog = 0;
	show_prog_msg();
	
	// begin marking by getting list sort order
	// subsequent actions are in the onload function of each ajax call
	get_sort_order();
};

var mark_below = function(event)
{
	begin_mark('below');
};

var mark_above = function(event)
{
	begin_mark('above');
};

// create buttons in the toolbar
var make_buttons = function()
{
	// clone the 'Mark all as read' button
	var mark_all_btn = document.getElementById('mark-all-as-read-split-button').firstChild;
	if (window.getComputedStyle(mark_all_btn.parentNode).display.toLowerCase() == 'none')
		return;

	var mark_below_btn = mark_all_btn.cloneNode(true);
	var mark_above_btn = mark_all_btn.cloneNode(true);

	// change node IDs
	mark_below_btn.id = 'mark-below-as-read';
	mark_above_btn.id = 'mark-above-as-read';

	// change button texts
	mark_below_btn.innerHTML = 'Mark below as read &darr;';
	mark_above_btn.innerHTML = 'Mark above as read &uarr;';
	
	// attach click events to the buttons
	mark_below_btn.addEventListener('click', mark_below, true);
	mark_above_btn.addEventListener('click', mark_above, true);

	// add buttons
	var viewer_ctrls = document.getElementById('viewer-top-controls');
	viewer_ctrls.appendChild(mark_below_btn);
	viewer_ctrls.appendChild(mark_above_btn);
};

var on_keypress = function(event)
{
	if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey)
		return true;
	
	var key_code = String.fromCharCode(event.which);	
	if (key_code == 'q')
	{
		begin_mark('below');
		
		// prevent the default behavior
		// otherwise, when shift+clicking on the 'original entry' icon, it opens a new window
		return false;
	}
	else if (key_code == 'w')
	{
		begin_mark('above');

		return false;
	}

	return true;
};

var on_click = function(event)
{
	// if left click with shift key down
	if (event.button == 0 && event.shiftKey)
	{
		get_curr_entry(from_entry);

		// make sure begin_mark is called after the event handler is returned
		window.setTimeout(begin_mark, 100, 'between');
		
		return false;
	}
	else
		return true;
};

if (SHOW_BUTTONS)
	make_buttons();

if (KEYPRESS_MARK)
	document.addEventListener('keypress', on_keypress, true);

if (CLICK_MARK)
{
	// process event before its default action is executed
	entries_node.addEventListener('click', on_click, true);
};