// ==UserScript==
// @author         Crend King
// @version        1.2.2
// @name           Google Reader: Mark some as read (old)
// @namespace      http://users.soe.ucsc.edu/~kjin
// @description    Mark the entries below, above or between certain entries as read in Google Reader.
// @include        http://*google.tld/reader/view/*
// @include        https://*google.tld/reader/view/*
// @homepage       http://userscripts.org/scripts/show/45893
// @downloadURL    https://userscripts.org/scripts/source/45893.user.js
// @updateURL      https://userscripts.org/scripts/source/45893.meta.js
// ==/UserScript==

/*

version history

1.2.2 on 04/15/2009:
- Click Mark will be activated only when holding the shift key.
- Add option to automatically select the first entry after the page is loaded.

1.2.1 on 04/12/2009:
- Add option to show/hide mark buttons.
- Add option to enable/disable keyboard shortcuts.

1.2 on 04/10/2009:
- Add "Click Mark" feature.
- Refactor iteration code to improve performance.
- Bug fix.

1.1.1 on 04/08/2009:
- Cancel key press event only when triggering shortcuts

1.1 on 04/08/2009:
- Add "Mark above as read" button
- Add keyboard shortcuts: 'q' for marking below and 'w' for marking above.

1.0.2 on 04/06/2009:
- Return the cursor back to the start mark entry after marking.

1.0.1 on 04/04/2009:
- Use "m" and "n" keys to mark entry read.

1.0 on 04/04/2009:
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

// automatically select the first entry after the page is loaded
const select_first = true;

// the script stops marking down after encountering up to this number of read entries
const stop_cumulative_read = 20;

// the script stops marking down after encountering this number of consecutive read entries
const stop_consecutive_read = 10;

// the script stops marking down after encountering an entry this number of days before the starting entry
// this time is inclusive
// for example, if the starting entry is in April 4th, and this number is 2
// it marks all the entries in April 4th and April 3rd
const stop_days_ago = 2;

// this script waits this number of milliseconds for Google Reader to reload new entries
const load_wait = 1500;


///// code section /////

// currently cumulative read entries
var cumulative_read;

// currently cumulative consecutive read entries
var consecutive_read;

// the start mark entry and its timestamp
var start_entry;
var start_time;

// 86400000 = 24 * 60 * 60 * 1000 (milliseconds in a day)
const stop_millisec_ago = stop_days_ago * 86400000;

const key_codes = {'m': 0x4D, 'n': 0x4E, 'p': 0x50};

// set to true to skip an event which is triggered by the script, not user
// initially set to false to capture events
var semaphore = false;

Math.sign = function(x)
{
	if (x > 0)
		return 1;
	else if (x == 0)
		return 0;
	else
		return -1;
}

function is_class_contain(entry, style)
{
	var entry_class = entry.getAttribute("class");
	return (entry_class.search("(\\s|^)" + style + "(\\s|$)") != -1);
}

// get the timestamp of the specific entry
// find the entry date node and parse the string
function get_entry_time(entry)
{
	for (var i = 0; i < entry.firstChild.childNodes.length; i++)
	{
		var node = entry.firstChild.childNodes[i];
		if (is_class_contain(node, "entry-date"))
		{
			var ret = Date.parse(node.textContent);
			
			// if the date string is in "H:mm tt" format
			// Date.parse() returns NaN
			// return the timestamp for today instead
			if (!ret)
				ret = new Date().getTime();
			
			return ret;
		}
	}
}

// return true if decide to stop marking
function stop_or_not(entry)
{
	// if the current entry is a read entry
	if (is_class_contain(entry, "read"))
	{
		cumulative_read++;
		consecutive_read++;
		if (cumulative_read >= stop_cumulative_read || consecutive_read >= stop_consecutive_read)
			return true;
	}
	else
		consecutive_read = 0;
	
	// if the time between the starting entry and current entry exceeds the option
	var entry_time = get_entry_time(entry);
	if (start_time - entry_time >= stop_millisec_ago)
		return true;
	
	return false;
}

function simulate_keypress(node, keycode)
{
	// enter critical region
	semaphore = true;
	
	// create keyboard event
	var event = document.createEvent("KeyboardEvent");
	
	event.initKeyEvent("keypress",
		true, // can bubble
		true, // cancelable
		null, // view
		false, false, false, false, // ctrl, alt, shift, meta
		keycode, // key code
		0); // char code
	
	// simulate pressing the key on the node
	node.dispatchEvent(event);
	
	// leave critical region
	semaphore = false;
}

function simulate_dblclick(node)
{
	// enter critical region
	semaphore = true;
	
	// create mouse event
	var event = document.createEvent("MouseEvent");

	for (var i = 0; i < 2; i++)
	{
		event.initMouseEvent("click",
			true, // can bubble
			true, // cancelable
			window, // view
			1, // click count
			0, 0, 0, 0, // coordinate
			false, false, false, false, // ctrl, alt, shift, meta
			0, // left button
			null); // related target
		
		// simulate pressing the key on the node
		node.dispatchEvent(event);
	}
	
	// leave critical region
	semaphore = false;
}

// mark entries by dispatching keyboard event
function mark_below()
{
	var curr_entry = document.getElementById("current-entry").nextSibling;
	var first_entry = curr_entry;
	var last_entry = curr_entry.parentNode.lastChild;
	
	while (curr_entry != last_entry)
	{
		// press "n"
		simulate_keypress(curr_entry, key_codes['n']);
		
		// decide whether stop marking or not
		if (stop_or_not(curr_entry))
		{
			// return the cursor back to the start mark entry
			// and not change its expand/collapse state by clicking twice
			simulate_dblclick(start_entry.firstChild);
			return;
		}
			
		if (!is_class_contain(curr_entry, "read"))
		{
			// press "m"
			simulate_keypress(curr_entry, key_codes['m']);
		}
		
		curr_entry = curr_entry.nextSibling;
	}
	
	// if marked any entry, wait Google Reader to reload more entries and mark again
	if (first_entry != last_entry)
		setTimeout(mark_below, load_wait);
	else
		simulate_dblclick(start_entry.firstChild);
}

function mark_above()
{
	var curr_entry = start_entry.previousSibling;
	
	while (curr_entry)
	{
		// press "p"
		simulate_keypress(curr_entry, key_codes['p']);
		
		// decide whether stop marking or not
		if (stop_or_not(curr_entry))
			break;
			
		if (!is_class_contain(curr_entry, "read"))
		{
			// press "m"
			simulate_keypress(curr_entry, key_codes['m']);
		}
		
		curr_entry = curr_entry.previousSibling;
	}
	
	// return the cursor back to the start mark entry
	// and not change its expand/collapse state by clicking twice
	simulate_dblclick(start_entry.firstChild);
}

function click_mark_between(click_entry)
{
	var curr_entry = document.getElementById("current-entry");
	if (!curr_entry)
		return;
	
	// mark direction
	// 1: mark down; -1: mark up; 0: no mark
	var direction = Math.sign(click_entry.offsetTop - curr_entry.offsetTop);
	if (direction == 0)
		return;

	do
	{
		if (!is_class_contain(curr_entry, "read"))
			simulate_keypress(curr_entry, key_codes['m']);
		
		if (direction == 1)
		{
			curr_entry = curr_entry.nextSibling;
			simulate_keypress(curr_entry, key_codes['n']);
		}
		else
		{
			curr_entry = curr_entry.previousSibling;
			simulate_keypress(curr_entry, key_codes['p']);
		}
		
	} while (curr_entry != click_entry);
}

// initialize mark process
function init_mark()
{
	cumulative_read = 0;
	consecutive_read = 0;
	
	start_entry = document.getElementById("current-entry");
	start_time = get_entry_time(start_entry);
}

function begin_mark_below(event)
{
	init_mark();
	mark_below();
}

function begin_mark_above(event)
{
	init_mark();
	mark_above();
}

// create buttons in the toolbar
function make_buttons()
{
	// clone the "Mark all as read" button
	var mark_all_btn = document.getElementById("mark-all-as-read");
	var mark_below_btn = mark_all_btn.cloneNode(true);
	var mark_above_btn = mark_all_btn.cloneNode(true);

	// change node IDs
	mark_below_btn.setAttribute("id", "mark-below-as-read");
	mark_above_btn.setAttribute("id", "mark-above-as-read");
	
	// attach click events to the buttons
	mark_below_btn.addEventListener("click", begin_mark_below, true);
	mark_above_btn.addEventListener("click", begin_mark_above, true);

	// add buttons
	var viewer_ctrls = document.getElementById("viewer-top-controls");
	viewer_ctrls.appendChild(mark_below_btn);
	viewer_ctrls.appendChild(mark_above_btn);

	// change button texts
	var button_body;
	button_body = document.evaluate("//div[@id='mark-below-as-read']//div[@class='goog-button-body']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	button_body.textContent = "Mark below as read";
	button_body = document.evaluate("//div[@id='mark-above-as-read']//div[@class='goog-button-body']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	button_body.textContent = "Mark above as read";
}

function on_keypress(event)
{
	// skip this event if triggered by simulate_keypress()
	if (semaphore)
		return;
	
	if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey)
		return;
	
	var key_code = String.fromCharCode(event.which);
	
	if (key_code == 'q')
	{
		begin_mark_below(null);
		event.preventDefault();
	}
	else if (key_code == 'w')
	{
		begin_mark_above(null);
		event.preventDefault();
	}
}

function on_click(event)
{
	// skip this event if triggered by simulate_dblclick()
	if (semaphore)
		return;
	
	// if left click with shift key down
	if (event.button == 0 && event.shiftKey)
	{
		// clicked node
		var click_entry = event.target;

		// backtrace to the entry node
		while (!is_class_contain(click_entry, "entry"))
			click_entry = click_entry.parentNode;
		
		click_mark_between(click_entry);
		
		// prevent the default behavior
		// otherwise, when shift+clicking on the "original entry" icon, it opens a new window
		event.preventDefault();
	}
}

if (show_buttons)
	make_buttons();

if (keypress_mark)
	document.addEventListener("keypress", on_keypress, true);

var entries_node = document.getElementById("entries");
	
if (click_mark)
{
	// process event before its default action is executed
	entries_node.addEventListener("click", on_click, true);
}

if (select_first)
	setTimeout(simulate_keypress, load_wait, entries_node, key_codes['n']);