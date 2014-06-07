// ==UserScript==
// @author         Crend King
// @version        1.3.9
// @name           Google Reader: Mark some as read
// @namespace      http://users.soe.ucsc.edu/~kjin
// @description    Mark the entries below, above or between certain entries as read in Google Reader.
// @include        http://*google.tld/reader/view/*
// @include        https://*google.tld/reader/view/*
// ==/UserScript==

// check latest version at http://userscripts.org/scripts/show/47830

/*

version history

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


///// preference section /////

// set to true to show "Mark below as read" and "Mark above as read" buttons
const show_buttons = true;

// set to true to enable keyboard shortcuts
const keypress_mark = true;

// "Click Mark" is a feature that when clicking an entry, the script will mark the entries
// between the current entry and the clicked entry as read. set to false to disable it.
const click_mark = true;

// reload the page after marking
const reload_after_mark = false;


///// code section /////

// number of entries in one request
const req_list_length = 40;

// time interval for main function (in milliseconds)
const step_interval = 100;

// the "entries" element in Google Reader
const entries_node = document.getElementById("entries");

const msg_container = document.getElementById("message-area-outer");
const msg_area = document.getElementById("message-area-inner");

// width of the padding in the message area
const msg_area_padding = 10;

// milliseconds to show messages
const msg_timeout = 4000;

// IDs set by setInterval(). used by clearInterval()
var interval_ids = {};

// current step of the main function
var curr_step;

// the string the user is currently viewing
var curr_view;

// "d": sort by newest; "o": sort by oldest; "m": sort by auto
var list_order;

// object of the current entry. members:
// url: href url
// id: internal ID from the server
// index: index in the Google Reader view
// node: corresponding DOM node
var curr_entry = {};

// object of the from entry for ClickMark
var from_entry = {};

// unread entry list
var unread_list;

// session token retrieved from server
// required for marking requests
var session_token;

// list of request results from server
var req_results;

// return true if the given node contains the specific class
function is_class_contain(node, cls)
{
	return (node.className.search("(\\s|^)" + cls + "(\\s|$)") != -1);
}

// replace the old class to a new class in the given node
// specify $ for the old class to add the new class
// specify "" for the new class to remove the old class
function replace_class(node, old_cls, new_cls)
{
	node.className = node.className.replace(new RegExp("\s?" + old_cls), new_cls);
}

// encode string with HTML entity
// e.g. "&" -> "&amps;"
function encode_entity(str)
{
	var div = document.createElement("div");
	div.textContent = str;
	return div.innerHTML;
}

// decode HTML entity in string
// e.g. "&amps;" -> "&"
function decode_entity(str)
{
	var div = document.createElement("div");
	div.innerHTML = str;
	return div.textContent;
}

function init_msg_area()
{
	// pad message area
	msg_area.style.paddingLeft = msg_area_padding + "px";
	msg_area.style.paddingRight = msg_area_padding + "px";
}

function show_prog_msg(msg)
{
	// set message text
	msg_area.textContent = msg;
	
	// show message container
	msg_container.className = "message-area progress-message";
	
	// center message container
	msg_container.style.marginLeft = -msg_container.clientWidth / 2 + "px";
	msg_container.style.width = "";
}

function show_info_msg(msg)
{
	msg_area.textContent = msg;
	
	msg_container.className = "message-area info-message";
	msg_container.style.marginLeft = -msg_container.clientWidth / 2 + "px";
	msg_container.style.width = "";
}

function hide_msg_area()
{
	// hide message container
	replace_class(msg_container, "$", " hidden");
	
	// restore message area style
	msg_area.removeAttribute("style");
}

// get the href URL of the current entry
// if no current entry, return "error"
function get_curr_entry_url()
{
	var url_node = document.evaluate("//div[@id='current-entry']//a[@class='entry-original']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	
	if (url_node)
		return encode_entity(url_node.href);
	else
		return "error";
}

// ajax function to get the sort order of the current view
function get_sort_order()
{
	GM_xmlhttpRequest(
	{
		method: "GET",
		url: "https://www.google.com/reader/api/0/preference/stream/list?output=json",
		onload: function(response)
		{
			var query_result = JSON.parse(response.responseText);
			var sort_order;
			
			for (var key in query_result.streamprefs)
			{
				// if user has configured the sort order of the current view
				// it should appear in the preference list
				if (key == curr_view)
				{
					var prefs = query_result.streamprefs[key];
					for (var i = 0; i < prefs.length; i++)
					{
						// find the key "ranking", get the raw preference value
						if (prefs[i].id == "ranking")
							sort_order = prefs[i].value;
					}
				
					break;
				}
			}
			
			// "o": sort by oldest
			// "m": sort by auto
			// by default, it is sort by newest
			switch (sort_order)
			{
			case "oldest":
				list_order = "o";
				break;
			case "magic":
				list_order = "m";
				break;
			default:
				list_order = "d";
				break;
			}

			// advance step
			curr_step++;
		}
	});
}

// ajax function to get the information of the entry node from server
// compare the href URL from the view with the reading-list
function get_entry_info(entry_obj, continuation)
{
	// skip if no URL is presented
	if (entry_obj.url)
	{
		GM_xmlhttpRequest(
		{
			method: "GET",
				
			// the API URL contains the sort order
			url: "https://www.google.com/reader/api/0/stream/contents/" + escape(curr_view) + "?n=" + req_list_length + "&r=" + list_order + (continuation ? "&c=" + continuation : ""),
			onload: function(response)
			{
				entry_obj.id = null;
				const reading_list = JSON.parse(response.responseText);

				for (var i = 0; i < reading_list.items.length; i++)
				{
					if (reading_list.items[i].alternate[0].href == entry_obj.url)
					{
						// get entry ID
						entry_obj.id = reading_list.items[i].id;
						break;
					}
					
					// also get the index of the entry in the reading-list
					entry_obj.index++;
				}
				
				// found the entry
				if (entry_obj.id)
					curr_step++;
				else
					// if the entry does not present in the current list,
					// get the next req_list_length entries and try again
					get_entry_info(entry_obj, reading_list.continuation);
			}
		});
	}
	else
		curr_step++;
}

// ajax function to get the session token
function get_session_token()
{
	GM_xmlhttpRequest(
	{
		method: "GET",
		url: "https://www.google.com/reader/api/0/token",
		onload: function(response)
		{
			session_token = response.responseText;
			curr_step++;
		}
	});
}

// mark the entry as not read, so it will appear in the unread list
function unread_entry(entry_obj)
{
	if (entry_obj.id)
	{
		GM_xmlhttpRequest(
		{
			method: "POST",
			url: "https://www.google.com/reader/api/0/edit-tag?client=scroll",
			headers: {"Content-type": "application/x-www-form-urlencoded"},
			data: "ac=edit-tags&r=user/-/state/com.google/read&i=" + escape(entry_obj.id) + "&T=" + escape(session_token),
			onload: function(response)
			{
				if (response.responseText == "OK")
					curr_step++;
				else
				{
					// if the response from server is not OK, stop the main function
					clearInterval(interval_ids.main);
					show_info_msg("Error occurred in unread_curr_entry().");
					setTimeout(hide_msg_area, msg_timeout);
				}
			}
		});
	}
	else
		curr_step++;
}

// ajax function to get the unread list
function get_unread_list()
{
	GM_xmlhttpRequest(
	{
		method: "GET",
		url: "https://www.google.com/reader/api/0/stream/contents/" + escape(curr_view) + "?xt=user/-/state/com.google/read&n=1000&r=" + list_order,
		onload: function(response)
		{
			unread_list = JSON.parse(response.responseText);
			curr_step++;
		}
	});
}

// ajax function to mark the entry with the specific ID as read
function mark_entry_read(entry_id)
{
	GM_xmlhttpRequest(
	{
		method: "POST",
		url: "https://www.google.com/reader/api/0/edit-tag?client=scroll",
		headers: {"Content-type": "application/x-www-form-urlencoded"},
		data: "ac=edit-tags&a=user/-/state/com.google/read&r=user/-/state/com.google/kept-unread&i=" + escape(entry_id) + "&T=" + escape(session_token),
		onload: function(response)
		{
			req_results.push(response.responseText == "OK");
		}
	});
}

// check the results of batch request are all OK or not
// if all OK, call the mark view function
// otherwise, throw error message
function check_result(expected_length, mark_view_func)
{
	// wait until all expected results are received
	if (req_results.length >= expected_length)
	{
		// stop the iteration
		clearInterval(interval_ids.mark);
		
		for (var i = 0; i < req_results.length; i++)
		{
			if (!req_results[i])
			{
				show_info_msg("Error occurred in check_result().");
				return;
			}
		}
		
		// success
		if (reload_after_mark)
			window.location.reload();
		else
			mark_view_func();
	}
}

// function to mark the entries below the current in the view
function mark_below_view()
{
	var next_node = curr_entry.node.nextSibling;
	while (next_node)
	{
		replace_class(next_node, "$", " read");
		next_node = next_node.nextSibling;
	}
}

// function to mark the entries below the current in the server
function mark_below_server()
{
	var i;
	req_results = [];
	
	for (i = unread_list.items.length - 1; i >= 0; i--)
	{
		mark_entry_read(unread_list.items[i].id);
		
		if (unread_list.items[i].id == curr_entry.id)
			break;
	}
	
	// iteration to check results
	interval_ids.mark = setInterval(check_result, step_interval, unread_list.items.length - i, mark_below_view);
}

// function to mark the entries above the current in the view
function mark_above_view()
{
	var prev_node = curr_entry.node.previousSibling;
	while (prev_node)
	{
		replace_class(prev_node, "$", " read");
		prev_node = prev_node.previousSibling;
	}
}

// function to mark the entries above the current in the server
function mark_above_server()
{
	var i;
	req_results = [];
	
	for (i = 0; i < unread_list.items.length; i++)
	{
		mark_entry_read(unread_list.items[i].id);
		
		if (unread_list.items[i].id == curr_entry.id)
			break;
	}
	
	interval_ids.mark = setInterval(check_result, step_interval, i + 1, mark_above_view);
}

// function to mark the entries between the current and the from in the view
function mark_between_view()
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
		replace_class(top_node, "$", " read");
		top_node = top_node.nextSibling;
	}
}

// function to mark the entries between the current and the from in the server
function mark_between_server()
{
	var i, j;
	req_results = [];
	
	var first_match, second_match;
	if (curr_entry.index < from_entry.index)
	{
		first_match = curr_entry.id;
		second_match = from_entry.id;
	}
	else
	{
		first_match = from_entry.id;
		second_match = curr_entry.id;
	}
	
	for (i = 0; i < unread_list.items.length; i++)
	{
		if (unread_list.items[i].id == first_match)
			break;
	}
	
	for (j = i; j < unread_list.items.length; j++)
	{
		mark_entry_read(unread_list.items[j].id);
		
		if (unread_list.items[j].id == second_match)
			break;
	}
	
	interval_ids.mark = setInterval(check_result, step_interval, j - i + 1, mark_between_view);
}

// mark main function
function mark_main(action)
{
	show_prog_msg("Marking target items as read: " + curr_step * 100 / 40 + "%");

	// use step value to serialize correlated Ajax procedures
	// while still maintain independent procedures parallel

	if (curr_step == 0)
	{
		get_sort_order();
		curr_step += 9;
	}
	
	if (curr_step == 10)
	{
		curr_entry.index = 0;
		from_entry.index = 0;
		
		get_entry_info(curr_entry);
		get_entry_info(from_entry);
		get_session_token();
		
		curr_step += 7;
	}
	
	if (curr_step == 20)
	{
		unread_entry(curr_entry);
		unread_entry(from_entry);
		
		curr_step += 8;
	}
	
	if (curr_step == 30)
	{
		get_unread_list();
		
		curr_step += 9;
	}
	
	if (curr_step == 40)
	{
		clearInterval(interval_ids.main);
		
		switch(action)
		{
		case "below":
			mark_below_server();
			break;
		case "above":
			mark_above_server();
			break;
		case "between":
			mark_between_server();
			break;
		}
		
		curr_entry.id = null;
		curr_entry.url = null;
		from_entry.id = null;
		from_entry.url = null;
		
		show_info_msg("Marked target items as read.");
		setTimeout(hide_msg_area, msg_timeout);
	}	
}

// initialization of the mark process
function begin_mark(action)
{
	curr_step = 0;
	curr_entry.url = get_curr_entry_url();
	curr_entry.node = document.getElementById("current-entry");
	curr_view = unescape(window.location.href.replace(/http.?:\/\/www\.google\.com\/reader\/view.*\/(?=(user|feed))/, ""));
	init_msg_area();
	
	// if no selected entry
	if (curr_entry.url == "error" || from_entry.url == "error")
	{
		show_info_msg("Select an entry first.");
		setTimeout(hide_msg_area, msg_timeout);
		return;
	}
	
	// no ClickMark on a same node
	if (action == "between" && curr_entry.url == from_entry.url)
	{
		show_info_msg("Same entry for marking.");
		setTimeout(hide_msg_area, msg_timeout);
		return;
	}
	
	interval_ids.main = setInterval(mark_main, step_interval, action);
}

// create buttons in the toolbar
function make_buttons()
{
	// clone the "Mark all as read" button
	const mark_all_btn = document.getElementById("mark-all-as-read");
	var mark_below_btn = mark_all_btn.cloneNode(true);
	var mark_above_btn = mark_all_btn.cloneNode(true);

	// change node IDs
	mark_below_btn.id = "mark-below-as-read";
	mark_above_btn.id = "mark-above-as-read";
	
	// attach click events to the buttons
	mark_below_btn.addEventListener("click", function(event) { begin_mark("below"); }, true);
	mark_above_btn.addEventListener("click", function(event) { begin_mark("above"); }, true);

	// add buttons
	var viewer_ctrls = document.getElementById("viewer-top-controls");
	viewer_ctrls.appendChild(mark_below_btn);
	viewer_ctrls.appendChild(mark_above_btn);

	// change button texts
	var button_body;
	button_body = document.evaluate("//div[@id='mark-below-as-read']//div[@class='goog-button-body']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	button_body.textContent = "Q below as read";
	button_body = document.evaluate("//div[@id='mark-above-as-read']//div[@class='goog-button-body']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	button_body.textContent = "W above as read";
}

function on_keypress(event)
{
	if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey)
		return;
	
	const key_code = String.fromCharCode(event.which);	
	if (key_code == 'q')
	{
		begin_mark("below");
		event.preventDefault();
	}
	else if (key_code == 'w')
	{
		begin_mark("above");
		event.preventDefault();
	}
}

function on_click(event)
{
	// if left click with shift key down
	if (event.button == 0 && event.shiftKey)
	{
		from_entry.url = get_curr_entry_url();
		from_entry.node = document.getElementById("current-entry");
		
		setTimeout(begin_mark, step_interval, "between");
		
		// prevent the default behavior
		// otherwise, when shift+clicking on the "original entry" icon, it opens a new window
		event.preventDefault();
	}
}

if (show_buttons)
	make_buttons();

if (keypress_mark)
	document.addEventListener("keypress", on_keypress, true);

if (click_mark)
{
	// process event before its default action is executed
	entries_node.addEventListener("click", on_click, true);
}