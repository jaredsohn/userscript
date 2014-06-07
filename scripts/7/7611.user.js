// ==UserScript==
// @name           LPLFixup
// @version        11
// @namespace      http://freecog.net/2006/
// @description    Fixes a variety of annoyances at the La Crosse Public Library web site.
// @include        http://lacrosselibrary.org/*
// @include        http://www.lacrosselibrary.org/*
// @include        http://lacrosse.lib.wi.us/*
// @include        http://www.lacrosse.lib.wi.us/*
// @include        http://lpl.lacrosse.lib.wi.us/*
// @include        http://lpl.lacrosse.lib.wi.us:81/*
// @include        http://lplcat.lacrosse.lib.wi.us/rpa/webauth.exe*
// @include        http://lplcat.lacrosse.lib.wi.us:8080/rpa/webauth.exe*
// ==/UserScript==

//GM_log("LPLFixup running.");

// Changelog
/*

Version 12, 10 October 2007:
	Fixed a bug that would cause the script to break if you had no saved information.

Version 11, 18 February 2007:
    Added support for filling of the "Remote Patron Authentication" form.
    Minor aesthetic improvements.
    Added fixing of the "Reader's Guide" link in the Information Toolbox tab so that
        the user is not prompted to select a library (New pref: boolean 
        "fix_readers_guide_link")
    Fixed a bug in the rewriting of javascript: URLs.

Version 10, 7 February 2007:
    New options dialog; many more exposed options with extended explanations.
    Renamed pref "fix_click_for_more_search_options_text" to "fix_more_search_options_link".

Version 9, 4 February 2007:
    Bugfix: "www" subdomain versions of URLs for which this script is included added.

Version 8, 20 Jan 2007:
    User preferences (e.g., the checkboxes at the bottom of the page) are now automatically
        propagated to pages in other windows or tabs.

Version 7, 5 Jan 2007:
    Added better support for "My List" page titles.
    Finally got the session timeout prevention mechanism working.  (New pref: boolean 
        "maintain_session"; New pref: int "maintain_session_interval"; New pref:  int
        "session_timeout_interval")

Version 6, 1 Jan 2007:
    Added JavaScript link rewriting (New pref: boolean "fix_js_links", disabled 
         by default)  This is disabled because it may cause strange behavior--
         more testing is necessary.
    Added fixing of the "More Search Options" link, which is by default called
         "Click For More Search Options".  (New pref: boolean 
         "fix_click_for_more_search_options_text")
    Added fixing of how the search history page displays "More Search Options" 
         searches as "Click For;More Search Options"  (New pref: boolean 
         "fix_more_search_options_history")

Version 5, 1 Jan 2007:
    Fixed bug that attempted to parse the URL on a logout page.
    Added support for infering the title on search form pages.
    Added some comments.
    Restructured the title code.
    Added fixing of the "Reader's Guide" link under "Information Toolbox" so that it looks
         like a normal link, instead of a visited one.  (New pref: boolean 
         "fix_readers_guide_link_style")
    New pref: boolean "fix_title" -- globabl flag for fixing of page titles
    Added fixing of the "Local news index&Fast Facts" tab text.
    Added the Community Resources site to the include list: http://lpl.lacrosse.lib.wi.us:81/*
    Added support for titles for Community Resources record pages. 
    Happy new year.

Version 4, 31 Dec 2006:
    Added fixing of the "More Search Options" page title, which is "Click Here For ;More
         Search Options" by default.  (New pref: boolean "fix_more_search_options_title")
    Fixed typo: 'Accound Overview' -> 'Account Overview'
    Minor styling enhancements.
    Reused UI text moved to `ui_strings` dictionary.
    Added fixing of the background image on pages with the flowery red image (which tiles
         on wide monitors).
    Removed use of UTF-8 Unicode literals in favor of escape sequences (due to a stupid 
         Greasemonkey bug).
    Fixed a bug that caused POST pages to have incorrect titles missing the last two letters.

Version 3, 17 Dec 2006:
    Added document title inference.  (New pref: boolean "end_titles_with_lpl".)
    Added null removal. (New pref: boolean "hide_null".)
    Added non-link style fixer (New pref: boolean "fix_nonlink_styles".)

Version 2, 17 Dec 2006: Initial public release

version 1: Initial version

*/


// Unicode symbol quick reference
/*
Hyphen: \u2010
EN-Dash: \u2013
EM-Dash: \u2014
Left single quotation mark: \u2018
Right single quotation mark: \u2019
Left double quotation mark: \u201c
Right double quotation mark: \u201d
Interrobang: \u203d                   // Just 'cause I can.
*/


const DEBUG = GM_getValue("debug", false);
// Don't access the Firebug console through the unsafeWindow object?
const SAFE_DEBUG = GM_getValue("safe_debug", false);

function log() {
	if (DEBUG) {
		if (!SAFE_DEBUG && unsafeWindow.console) {
			// It's nice to bypass Greasemonkey's logging function because
			// that function prepends a long namespace to the logged value,
			// wasting screen space.
			unsafeWindow.console.log.apply(unsafeWindow.console, arguments);
		} else {
			GM_log.apply(null, arguments);
		}
	}
};


// Oh, how I long,
//    for MochiKit dot DOM.
function El(name /* children... */) {
    var a, el = document.createElement(name.match(/^[^.#$\s]+/)[0]);
    for (var i = 1; i < arguments.length; i++) {
        a = arguments[i];
        if (a.__dom__) a = a.__dom__(el);
        else if (a.dom) a = a.dom(el);
        switch (typeof a) {
            case 'string':
            case 'number':
                a = document.createTextNode(a);
            default:
                if (a) el.appendChild(a);
                break;
        }
    }
    var id = name.match(/#([^\.#\s]+)/);
    if (id) el.id = id[1];
    var classes = name.match(/\.[^.#$\s]+/g);
    if (classes)
        el.className = classes.map(function(c) {
            return c.slice(1); }).join(' ');
    var style = name.match(/\$(.+)$/);
    if (style) el.setAttribute('style', style[1]);
    return el;
};




function Prefs(options) {	
	var self = this;
	// Table mapping pref names to arrays of listener functions 
	var listeners = {};
	// Stores the last known value of each pref that is listened
	// for so that changes can be detected.
	var cache = {};
	// An array of the names that are stored in the cache.
	var cached_prefs = [];
	
	function check_for_update(name) {
		// List of names of prefs to check if they have changed.
		var names_to_check = (name) ? [name] : cached_prefs;
		for (var i = 0; i < names_to_check.length; i++) {
			name = names_to_check[i];
			var old_value = cache[name];
			var new_value = self[name];
			if (old_value !== new_value) { // There has been a change
				log("Change detected for pref " + name);
				log("  old value: %o", old_value);
				log("  new value: %o", new_value);
				var funcs = listeners[name];
				if (funcs) {
					for (var j = 0; j < funcs.length; j++) {
						funcs[j](new_value, old_value, name);
					}
				}
				cache[name] = new_value;
			}
		}
	}
	
	if (options.live_update) {
		window.setInterval(function() {
			check_for_update();
		}, options.live_update_interval || 200);
	}
	
	this.create = function(name, default_) {
		if ("create|make_checkbox|listen".indexOf(name)>-1)
			throw "The name " + name + " is reserved.";
		
		// `is_number` is used to enable a hack that stores
		// numbers as strings, allowing the storage of any
		// JavaScript number, not just ints.
		var is_number = (typeof(default_) == 'number');
		
		self.__defineGetter__(name, function() {
			var val = GM_getValue(name, default_);
			if (is_number) val = parseFloat(val, 10);
			return val;
		});
		
		self.__defineSetter__(name, function(value) {
			log("Pref " + name + " set");
			cache[name] = self[name];
			var set_value = (is_number) ? '' + value : value;
			GM_setValue(name, set_value);
			if (name in listeners) {
				check_for_update(name);
			}
			return value;
		});
		
		log("Pref created: " + name);
	};
	
	// Set a function to be called whenever the pref is
	// changed, with its value, old value, and name.
	this.listen = function(name, func) {
		if (!(name in listeners)) { // Hasn't been listened to before.
			listeners[name] = [];
			// Initialize the cache so changes can be detected.
			cache[name] = self[name];
			cached_prefs.push(name);
		}
		listeners[name].push(func);
		log("Listener added to " + name);
	};
	
	// Make a checkbox that is linked to the pref `name`.
	// Boolean prefs only, please.
	this.make_checkbox = function(name) {
		var cb = document.createElement('input');
		cb.setAttribute('type', 'checkbox');
		cb.checked = self[name];
		cb.addEventListener('DOMActivate', function() {
			self[name] = this.checked;
		}, false);
		// Register
		self.listen(name, function(value, old_value, name) {
			cb.checked = value;
		});
		return cb;
	};
	
	// Link an <input> or <textarea> to a pref.
	// Textual prefs only.
	this.link_text_field = function(name, input, overwrite/*=false*/) {
		function update() { self[name] = input.value; }
		input.addEventListener("change", update, false);
		input.addEventListener("keypress", update, false);
		input.addEventListener("DOMFocusOut", update, false);
		input.addEventListener("DOMActivate", update, false);
		document.addEventListener("unload", update, false);
		
		self.listen(name, function(value, old_value, name) {
			input.value = value;
		});
		
		if (overwrite) { // Overwrite
			input.value = self[name];
		} else {
			self[name] = input.value;
		}
	};
}


function now() {
	return (new Date()).getTime();
}









// Is this page part of the abominable Horizon iPac system?
var is_ipac_page = document.location.href.match(/lpl.lacrosse.lib.wi.us\//i);

function is_login_page() {
	return is_ipac_page && document.forms[0] && document.forms[0].name == 'security';
}

function is_remote_auth_page() {
	return document.location.href.match(/http:\/\/lplcat\.lacrosse\.lib\.wi\.us\/rpa\/webauth\.exe/i);
}


// Detect a failed login attempt.
function login_failed() {
	return document.body.textContent.indexOf("Login failed.  Please check your barcode and pin and try again.") > -1;
};

(function main(){

var prefs = new Prefs({live_update: true});
prefs.create("change_fields", true);
prefs.create("remember_info", false);
prefs.create("disable_timer", true);
prefs.create("auto_login", false);
prefs.create("barcode", '');
prefs.create("pin", '');
prefs.create("hide_null", true);
prefs.create("fix_nonlink_styles", true);
prefs.create("fix_background_image", true);
prefs.create("fix_readers_guide_link", true);
prefs.create("fix_readers_guide_link_style", true);
prefs.create("fix_community_resources_tab_text", true);

prefs.create("fix_more_search_options_title", true);
prefs.create("fix_more_search_options_link", true);
prefs.create("fix_more_search_options_history", true);

prefs.create("fix_title", true);
prefs.create("end_titles_with_lpl", true);

prefs.create("fix_js_links", true);

prefs.create("maintain_session", true);
prefs.create("maintain_session_interval", 5000); // How often to check whether the server should be pinged.
prefs.create("session_timeout_interval", 1000 * 60); // How often to ping the server; default 1 min.

// We set the defaults of both of these to now() because
// only the one (if any) that applies to this page will 
// be accessed.
prefs.create("last_catalog_access", now());
prefs.create("last_cr_access", now());




function get_prefs_interface() {
	var checkboxes = [
		// [pref_name, checkbox_label, long_desc], 
		["change_fields", "Change field types", "Make the login form's password fields normal text fields."],
		["remember_info", "Remember my info", "Remember my library card number and PIN."],
		["auto_login", "Automatically log in", "Fill and submit any login form encountered."],
		["hide_null", "Hide null", 'Hide the "null" on the borrower overview page.'],
		["fix_nonlink_styles", "Fix the appearance of nonlink text", "Force only links to look like links"],
		["fix_background_image", "Fix background image", "Stop the flowery red background from tiling on very wide monitors"],
		//["fix_readers_guide_link_style", 'Fix "Reader\'s Guide" link style', "Makes the \"Reader's Guide\" link on the Information Toolbox page look unvisited."],
		//["fix_community_resources_tab_text", "Fix Community Resources tab text", ""],
		["fix_more_search_options_title", "Fix \"More Search Options\" title", "Removes the text \"Click Here For ;\" from the page title."],
		["fix_more_search_options_link", "Fix \"More Search Options\" link", "Remove \"Click For\" from the link text."],
		["fix_more_search_options_history", "Fix \"More Search Options\" history", "Fix \"More Search Options\" search type in the search history display."],
		["fix_title", "Add page titles", "Add appropriate page titles to pages that lack them"],
		["end_titles_with_lpl", "End page titles with \u201cLa Crosse Public Library\u201d", "For pages for which titles are added"],
		["fix_js_links", "Fix \"javascript:\" links", "Modify JavaScript-protocol links, allowing them to be middle-clicked when possible."],
		["disable_timer", "Disable timer", "Disable the client-side code that automatically logs you out after about five minutes by sending you to the logout page.  This prevents a new page being suddenly loaded without you clicking on a link or button."],
		["maintain_session", "Maintain session", "Prevent the session from expiring on the server by periodically sending it requests.  This stops the server from automatically logging you out after about five minutes.\xA0 Note: this feature functions by making periodic requests to the server, which may create congestion on limited bandwith Internet links."]
	];
	
	var homepage_link = El("A", "Home Page");
	homepage_link.href = "http://freecog.net/2006/lplfixup/";
	var checkbox_container = El("DIV.checkboxes");
	
	var barcode_input = El("INPUT");
	var pin_input = El("INPUT");
	barcode_input.type = pin_input.type = "text";
	barcode_input.size = 16; pin_input.size = 4;
	prefs.link_text_field("barcode", barcode_input, true);
	prefs.link_text_field("pin", pin_input, true);
	var clear_button = El("BUTTON", "Clear");
	clear_button.addEventListener("DOMActivate", function() {
		prefs.barcode = '';
		prefs.pin = '';
	}, false);
	var info_container = El("DIV.info",
		El("LABEL", "Card number: ", barcode_input),
		El("LABEL", "\xA0\xA0\xA0\xA0 PIN: ", pin_input),
		"\xA0\xA0\xA0\xA0 ", clear_button
	);
	
	var close_button = El("BUTTON.close_button", "Close");
	
	var container =  El("DIV#lplfixup_prefs",
		El("H1", "LPLFixup Options"),
		El("P", homepage_link),
		info_container,
		checkbox_container,
		El("DIV.bottombar", 
			close_button,
			El("P", "Your changes take place immediately.")
		)
	);
	
	checkboxes.forEach(function(item) {
		checkbox_container.appendChild(El("P.checkbox", El("LABEL", prefs.make_checkbox(item[0]), " ", item[1]), item[2]));
	});
	
	
	close_button.addEventListener("DOMActivate", function(evt) {
		var event = document.createEvent("Event");
		event.initEvent("LPLFixup_Close", false, true);
		container.dispatchEvent(event);
	}, false);
	
	return container;
}


// A button to forget saved info
var forget_button = El("BUTTON", "Forget");
if (!prefs.barcode && !prefs.pin) {
	forget_button.disabled = true;
}
forget_button.addEventListener("DOMActivate", function(evt) {
	prefs.barcode = '';
	prefs.pin = '';
	alert("Your barcode and PIN have been forgotten.");
	forget_button.disabled = true;
	evt.stopPropagation();
	evt.preventDefault();
}, false);

var homepage_link = El("A", "LPLFixup Home Page");
homepage_link.setAttribute('href', 'http://freecog.net/2006/lplfixup/');

var prefs_dialog = null;
var prefs_button = El("BUTTON.prefs_button", "More Options");
prefs_button.addEventListener("DOMActivate", function(evt) {
	if (!prefs_dialog) {
		prefs_dialog = get_prefs_interface();
	}
	document.body.appendChild(prefs_dialog);
	evt.stopPropagation();
	evt.preventDefault();
	prefs_button.disabled = true;
	prefs_dialog.addEventListener("LPLFixup_Close", function(evt) {
		document.body.removeChild(prefs_dialog);
		prefs_button.disabled = false;
	}, false);
}, false);


/////////////////////////////////
////// LOGIN FORM HANDLING //////
/////////////////////////////////

// The login form.
var form = document.forms[0];
// The input fields.
var barcode_input, pin_input, message_container;

function restore_info() {
	if (prefs.remember_info) {
		log("Restoring info");
		barcode_input.value = prefs.barcode;
		pin_input.value = prefs.pin;
	}
}

// Set the event listener to save the barcode and PIN
// when the form is submitted.
function set_save_listener() {
	form.addEventListener('submit', function() {
		// Save info
		if (prefs.remember_info) {
			log("Saving info");
			prefs.barcode = barcode_input.value;
			prefs.pin = pin_input.value;
		}
	}, false);
}

function get_message(details) {
	return El("P", El("STRONG", "Unable to automatically log in: " + details + "."));
}

const NEED_MORE_INFO = "please complete your login information";
const ATTEMPT_FAILED = "detected failed attempt. Please correct your information";

if (is_login_page()) { // Login form
	log("This is an iPac login page.");
	
	form = document.forms[0];
	barcode_input = form.elements.namedItem('sec1');
	pin_input = form.elements.namedItem('sec2');
	
	
	// I like to be able to see my typos, thank you.
	if (prefs.change_fields)
		barcode_input.type = pin_input.type = 'text';
	
	restore_info();
	
	// Auto-submit
	if (prefs.auto_login) {
		var details;
		if (!prefs.barcode || !prefs.pin) {
			details = NEED_MORE_INFO;
		} else if (login_failed()) {
			details = ATTEMPT_FAILED;
		} else {
			form.submit();
			return; // No need to continue
		}
		var msg = get_message(details);
		msg.style.color = 'red';
		var tbody = pin_input.parentNode.parentNode.parentNode;
		tbody.parentNode.style.width = '50%';
		var cell = tbody.lastChild.firstChild;
		cell.replaceChild(msg, cell.firstChild);
	}
	
	set_save_listener();

} else if (is_remote_auth_page()) {
	log("This is a remote authentication page.");
	
	form = document.forms[0];
	
	// Is this the library selection page?
	if (form.elements.namedItem("lb").type != "hidden") {
		// Then we'll fill it and submit it.
		form.elements.namedItem("lb").value = "LACRS";
		if (prefs.auto_login) {
			form.submit();
		}
		return;
	} else {
		barcode_input = form.elements.namedItem('h1');
		pin_input = form.elements.namedItem('h2');
		
		if (prefs.change_fields)
			pin_input.type = 'text';
		
		restore_info();
	
		if (prefs.auto_login) {
			var details;
			if (!prefs.barcode || !prefs.pin) {
				details = NEED_MORE_INFO;
			} else if (document.body.innerHTML.match(/Sorry, Your identification is not recognized/)) {
				details = ATTEMPT_FAILED;
			} else {
				// We can login!
				form.submit();
				return; // No need to continue processing the page.
			}
			var msg = get_message(details);
			msg.style.color = 'red';
			input.parentNode.appendChild(msg);
		}
		
		set_save_listener();
	}
}


// Set up the inline prefs.
var inline_prefs = El("DIV#lplfixup_inline_prefs", 
	El("STRONG", "LPLFixup"),
	El("LABEL", prefs.make_checkbox("remember_info"), " Remember my info ", forget_button),
	El("LABEL", prefs.make_checkbox("auto_login"), " Automatically login"),
	El("LABEL", prefs.make_checkbox("disable_timer"), " Disable automatic logout"),
	" ", prefs_button, homepage_link
);
document.body.appendChild(inline_prefs);


// Insert the style sheet
GM_addStyle([
	'#lplfixup_prefs {',
		'font-size: .8em;',
		'text-align: left;',
		'border: 2px solid black;',
		'padding: 10px;',
		'position: absolute;',
		'left: 100px;',
		'right: 100px;',
		'top: 100px;',
		'margin-bottom: 100px;',
		'background: white;',
	'}',
	'#lplfixup_prefs h1 {',
		'margin-top: 0;',
		'line-height: 1;',
		'text-align: center;',
	'}',
	'#lplfixup_prefs div.checkboxes {',
		'-moz-column-count: 2;',
	'}',
	'#lplfixup_prefs p {',
		'text-indent: -25px;',
		'margin-left: 25px;',
	'}',
	'#lplfixup_prefs p label {',
		'display: block;',
		'font-size: 1.2em;',
	'}',
	'#lplfixup_prefs .info {',
		'font-size: 1.2em;',
	'}',
	'#lplfixup_prefs .close_button {',
		'float: right;',
	'}',
	'#lplfixup_prefs .bottombar {',
		'margin-top: 20px;',
	'}',
	'#lplfixup_prefs button,',
	'#lplfixup_inline_prefs button {',
		'font-size: inherit;',
		'font-family: inherit;',
	'}',
	'#lplfixup_inline_prefs label {',
		'white-space: nowrap;',
	'}',
	'#lplfixup_prefs a,',
	'#lplfixup_inline_prefs a {',
		'white-space: nowrap;',
		'margin-left: 2em;',
	'}',
	'#lplfixup_inline_prefs label {',
		'margin-left: 1em;',
	'}',
	'#lplfixup_inline_prefs button.prefs_button {',
		'margin-left: 2em;',
	'}',
	'#lplfixup_inline_prefs {',
		'font-size: .7em;',
		'text-align: center;',
		'margin-bottom: 10px;',
		'width: 80%;', // It overflows the <body> without this width declaration in narrow windows.
		'margin-left: auto; margin-right: auto;', // Center
	'}',
].join('\n'));


// Set up the timer killer
var orig_timer = unsafeWindow.Timer;

function set_timer(value) {
	if (value) {
		log("NOOP Timer set.");
		unsafeWindow.location.href = "javascript:" + 
			encodeURIComponent("Timer = function(){}; void(0);");
	} else {
		unsafeWindow.location.href = "javascript:" + 
			encodeURIComponent("Timer = " + orig_timer.toSource().
				replace(/closeTime/g, 'window.closeTime') + "; Timer(); void(0);"
			);
		log("Original Timer set.");
	}
}

prefs.listen("disable_timer", set_timer);
set_timer(prefs.disable_timer);



//////////////////////////////
//  SET THE DOCUMENT TITLE  //
//////////////////////////////

// Titles in the two major sections of the interface are displayed
// differently in each area, with added versions for the serch results
// pages and the individual item pages.
//
// "Search the Catalog" -- search forms
//    An <a class="boldBlackFont2">&nbsp;
//    ``get_serach_form_title()``
// "My Library Record" -- borrower information
//    An <a class="big">
//    ``get_myrecord_title()``
// Search Results
//    An <a class="boldBlackFont3">
//    ``get_search_results_title()``
// Item Record Page
//    An <a class="largeAnchor">
//    ``get_record_title()``
//
// All these functions return null if they don't find an appropriate
// title.
//
// I now suspect that a better architecture might have been to figure
// out which link in the navigation is highlighted--but oh well.


// A helper function for finding <a>s with a particular class.
// <a>s with presentational class names are used  on iPac pages much 
// like <span>s might be on a site designed by a rational mind.
// Fortunately, Horizon doesn't seem to have any concept of 
// multiple classes, and doesn't surround them with whitespace, so
// a simple equality comparison works.
function get_as_by_class_name(class_name) {
	if (typeof(class_name) == 'string')
		class_name = new RegExp('(^|\s)' + class_name + '(\s|$)');
	return Array.slice(document.getElementsByTagName('a') || []).filter(function(a) {
		return a.className.match(class_name);
	});
}

// Maps the title pulled from the page content to the title
// used when the title is inferred from the URL.  This is used 
// instead of the title in the content where possible for consistency
// with the page titles generated elsewhere.
var myrecord_title_remap = {
	'Items Out': 'Checked Out',
	'Hold Requests': 'Holds',
	'Blocks': 'Fines/Blocks',
	'Profile': 'Borrower Information',
};

// Gets the text of the first <a> with a class of "big" -- this
// is appropriate as a document title for "My Library Record" pages.
function get_myrecord_title() {
	var big_as = get_as_by_class_name('big');
	if (big_as[0]) {
		var text = big_as[0].textContent;
		var title = text.replace(/\s-.*/, '');
		// For consistency's sake, map the title to whatever we use
		// when it's inferred from the URL.
		return myrecord_title_remap[title] || title;
	}
	return null;
}

// Get a document title on a "My List" listing
// These listings look much like search result pages from 
// a HTML perspective.
function get_mylist_title() {
	var containers = get_as_by_class_name('boldBlackFont2');
	if (containers[0] && containers[0].textContent.match(/\d+\s+titles/)) {
		var titles = containers[0].textContent;
		if (titles.match(/^1\s+titles$/)) {
			titles = '1 title';
			// Might as well fix this, while we're at it.
			containers[0].firstChild.nodeValue = titles;
		}
		var list_name = containers[0].parentNode.parentNode.previousSibling.firstChild.textContent;
		return list_name + " (" + titles + ")";
	} else {
		log("No containers.");
	}
	
	// New list name prompt
	if (document.forms && document.forms.namedItem("ipac") && 
		document.forms.namedItem("ipac").elements.namedItem("moveto_listkey") && 
		document.forms.namedItem("ipac").elements.namedItem("moveto_listkey").value == "ipac_new_saved_list") {
		return "Enter new list name";
	}
	
	log("Not a \"My List\" listing.");
	return null;
}


function get_mylist_management_title() {
	// We find this page by the names of the table columns.
	if (document.body.textContent.match(/ListsListTitlesCreatedExpires/)) {
		return 'Manage Lists';
	}
	return null;
}

// Like `myrecorrd_title_remap`, but for search form pages.
var search_form_title_remap = {
	'BASIC SEARCHES': 'Basic Search',
	'Click Here For ;More Search Options': 'More Search Options',
};

// Get a document title on a search form page.
function get_search_form_title() {
	var containers = get_as_by_class_name('boldBlackFont2');
	if (containers[0]) {
		var a = containers[0];
		var text = a.textContent.replace(/^[\xA0\s]+|\s+$/g, "");
		return search_form_title_remap[text] || text;
	}
	return null;
}

// Get a document title on a search results page.
function get_search_result_title() {
	var bbf3_as = get_as_by_class_name('boldBlackFont3');
	if (bbf3_as[0]) {
		var a1 = bbf3_as[0];
		var bolded = a1.parentNode.parentNode.nextSibling.getElementsByTagName('b');
		if (bolded.length == 1) {
			// Just the query
			var info = bolded[0].textContent;
		} else if (bolded.length == 2) {
			// Include the number of results
			var info = bolded[1].textContent + " (" + bolded[0].textContent + ")";
		}
		return a1.textContent.replace(/^\s+/, '') + ": " + info
	}
	return null;
}

// Get a document title for an item record page.
function get_record_title() {
	var anchors = get_as_by_class_name('largeAnchor');
	if (anchors[0]) {
		return anchors[0].textContent.replace(/^\s+|\s+$/, '');
	}
}

// Get the document title for record in the Community Resources
// database.
function get_community_resources_record_title() {
	// These records lack any prominent header--they're just flat DB fields.
	// All record pages seem to contain the text "Question/Headline:", so
	// that'll be used to detect them.
	if (document.body.textContent.indexOf("Question/Headline:") > -1) {
		// The text relevant to the title is contained in the <a class="normalBlackFont1">
		// after the one containing "Question/Headline: ".  This seems to be the third one, 
		// but I'm not going to count on it.
		var containers = get_as_by_class_name("normalBlackFont1");
		var extract_next = false; // set to true when "Question/Headline" is encountered.
		for (var i = 0; i < containers.length; i++) {
			if (extract_next) {
				return containers[i].textContent.replace(/^\s+|\s+$/g, ""); // Should ellipsize this?
			} else if (containers[i].textContent.match(/Question\/Headline:/i)) {
				extract_next = true;
			}
		}
		
		// Nothing was extracted.  Fallback:
		log("Unable to extract a title for this Community Resources page.");
		return "Item Record";
		
		// The fallback will also be displayed for MARC records.  I'm not going to bother
		// changing that unless someone requests it.
	}
	return null;
}


// Get a document title for the Information Toolbox page.
function get_information_toolbox_title() {
	// Is this the information toolbox page?  Since it has 
	// no content, we find out by examining the navigation.
	var pseudo_spans = get_as_by_class_name("TabActive");
	if (pseudo_spans[0] && pseudo_spans[0].title == "Great databases") {
		return "Information Toolbox";
	} else {
		return null;
	}
}


// Dict mapping the URL components 'menu' and 'submenu' to page titles.
var url_to_title = {
	'search': {
		DEFAULT: 'Basic Search',
		'basic_search': 'Basic Search',
		'advanced': 'More Search Options',
		'power': 'Power Search',
		'history': 'Search History'
	},
	'account': {
		DEFAULT: 'Account Overview',
		'overview': 'Account Overview',
		'itemsout': 'Checked Out',
		'holds': 'Holds',
		'blocks': 'Fines/Blocks',
		'info': 'Borrower Information'
	},
	'Information%20Resources': {
		DEFAULT: 'Information Toolbox'
	},
	'mylist': {
		DEFAULT: 'My List'
	}
};


// Infer from the URL -- this would be used in the
// general case, except it doesn't work on POST or login pages.
function get_title_from_url() {
	var url = document.location.href;
	// There must be a querystring, and it can't be one for a logout page
	if (!url.match(/\/ipac.jsp$|[\?&]logout=true(&|$)/)) {
		try {
			var menu = url.match(/[?&]menu=([\w\d%]+)(&|$)/)[1];
			var submenu = 'DEFAULT';
			try {
				var submenu = url.match(/[?&]submenu=(\w+)(&|$)/)[1];
			} catch(e) { /* go with DEFAULT */ }
			return url_to_title[menu][submenu] || url_to_title[menu].DEFAULT;
		} catch(e) {
			log("Error parsing the querystring to get a title: " + e);
			log("  menu = " + menu);
			log("  submenu = " + submenu);
		}
	}
	log("Not able to parse the querystring for a title.");
	return null;
};

// Get the title if this is a login page.
function get_login_title() {
	return is_login_page() ? 'Login' : null;
};

var title_getters = [
	get_login_title,
	get_mylist_title,
	get_mylist_management_title,
	get_search_result_title,
	get_record_title,
	get_community_resources_record_title,
	get_title_from_url,
	// Fallbacks
	get_information_toolbox_title,
	get_search_form_title,
	get_myrecord_title,
];

// Code poetry:
function fix_title() {
	// Does the document need a title?
	var need = (!document.title || document.title === "iPac2.0")
	// Can it be fixed?
	var ability = document.location.href.match(/\/ipac.jsp?/);
	return need && ability;
}

if (prefs.fix_title && fix_title()) {
	// Kill me now ;-)
	var title, i = 0;
	while (title_getters[i] && !(title = title_getters[i]())) { i++; }
	
	if (!title) {
		// Fallback, if nothing else is found
		title = 'Online Catalog';
		log("No title found \u2014 a fallback will be used.");
	}
	
	if (prefs.end_titles_with_lpl) {
		title += ' \u2014 La Crosse Public Library';
	}
	
	document.title = title;
	log("document.title set to \u201c" + title + "\u201d")
}



////////////////////////////////////////////
//  HIDE THAT 'null' ON THE ACCOUNT PAGE  //
////////////////////////////////////////////

if (prefs.hide_null) {
	var ps = document.getElementsByTagName('p');
	if (ps && ps[1] && ps[1].textContent == 'null') {
			ps[1].parentNode.removeChild(ps[1]);
	}
}

//////////////////////////////////////////
//  MAKE NON-LINKS NOT LOOK LIKE LINKS  //
//////////////////////////////////////////

if (prefs.fix_nonlink_styles && is_ipac_page) {
	GM_addStyle([
		'a[class$=Anchor]:not([href]) {',
			'font-weight: normal;',
			'color: black;',
		'}',
		'a[class$=Anchor]:not([href]):hover {',
			'text-decoration: none;',
		'}',
		'a[class$=Anchor]:not([href]):active {',
			'font-style: normal;',
		'}'
	].join('\n'));
}

/////////////////////////////////////////////////////////////////////
//  REMOVE "Click Here For ;" FROM THE "More Search Options" PAGE  //
/////////////////////////////////////////////////////////////////////

if (prefs.fix_more_search_options_title && is_ipac_page) {
	var a_tags = get_as_by_class_name("boldBlackFont2");
	if (a_tags.length) {
		var a = a_tags[0];
		if (a.textContent.match(/Click Here For ;More Search Options/)) {
			a.firstChild.textContent = "\xA0More Search Options";
			log('"More Search Options" page title corrected');
		}
	}
}

////////////////////////////////
//  FIX THE BACKGROUND IMAGE  //
////////////////////////////////

if (prefs.fix_background_image && !is_ipac_page) {
	GM_addStyle([
		'body[background$="redbackground.gif"] {',
			'background: white url(/images/redbackground.gif) repeat-y top left;',
		'}'
	].join('\n'));
	log("Any red-background issue has been corrected.");
}


//////////////////////////////
//  FIX READER'S GUIDE LINK //
//////////////////////////////

if (prefs.fix_readers_guide_link || prefs.fix_readers_guide_link_style) {
	get_as_by_class_name('navBarCurrent').forEach(function(a) {
		if (a.textContent == "Readers' Guide") {
			if (prefs.fix_readers_guide_link && a.href == "http://lplcat.lacrosse.lib.wi.us/rpa/webauth.exe?rs=RG") {
				a.href += '&lb=LACRS';
			}
			if (prefs.fix_readers_guide_link_style) {
				a.className = 'navBarAnchor';
			}
		}
	});
}

////////////////////////////////////////////
//  FIX THE COMMUNITY RESOURCES TAB TEXT  //
////////////////////////////////////////////

if (prefs.fix_community_resources_tab_text) {
	get_as_by_class_name('TabActive').forEach(function(a) {
		if (a.textContent == "Local news index&Fast Facts")
			a.firstChild.nodeValue = 'Local news index & Fast Facts';
	});
}

/////////////////////////////////////////
//  FIX MORE SEARCH OPTIONS LINK TEXT  //
/////////////////////////////////////////

// Remove "Click For" from the "Click For More Search Options" link.
if (prefs.fix_more_search_options_link) {
	get_as_by_class_name('navBarAnchor|navBarCurrent').forEach(function(a) {
		if (a.textContent == "Click ForMore Search Options") {
			a.innerHTML = "More Search Options";
			log('Fixed "More Search Options" link text.');
		}
	});
}

/////////////////////////////////////////////////////////////
//  FIX "Click For;More Search Options" IN SEARCH HISTORY  //
/////////////////////////////////////////////////////////////

if (prefs.fix_more_search_options_history) {
	// Is this a search history page? -- &menu=search&submenu=history
	var url = document.location.href;
	if (url.match(/[\?&]menu=search(&|$)/) && url.match(/[\?&]submenu=history(&|$)/)) {
		get_as_by_class_name('normalBlackFont1').forEach(function(a) {
			if (a.textContent == "Click For;More Search Options") {
				a.firstChild.nodeValue = "More Search Options";
			}	
		});
		log('Done fixing the search history page\'s "More Search Options" entries.');
	}
}


////////////////////////////
//  FIX JAVASCRIPT LINKS  //
////////////////////////////

// Function reference:
/*

buildReturnPageNewList(url, return_url)
    Submits the form "buildLink", which has just one field, named
    "returnURL," which is filled with the `return_url` parameter.
    The action of the form is set to `url`, and the form is POST'ed.
    (Note that the url is unescape()'d when navigator.appName ==
    'Netscape', too.)
        Replacement action: simply use `url` as the href of the link.
    This may break the "Return to results" link, but who cares?
    That's what the back button's for.
ReturnSearchPage(url)
    Submits either the form "SearchResult" or the form "buildLink" 
    with `url` as the action, or falls back to setting document.location
    to `url`.  `url` is unescape()'d.
        Replacement action: href_from_string_arg()
buildNewList(url, return_url, summary)
    I'm not exactly sure what this is trying to to.  I guess that 
    it is accumulating a breadcrum trail of history.  That's pointless,
    since it's already implemeneted in the form of the back button, and
    will likely break when multiple tabs are used anyway.  Axed.
        Replacement action: href_from_string_arg()
loginIntoOrOutOfAccount(url, return_url)
    This seems to combine buildReturnPageNewList and buildNewList.
        Replacement action: href_from_string_arg()
AddCopy(bkey, ikey, pos)
	This is part of the booklist system.  It's pure JavaScript, so it
	shouldn't be replaced.
buildMyList(url, return_url)
	Yet another thing that seems to do whatever buildReturnPageNewList
	and buildNewList do.
	    Replacement action: href_from_string_arg()

*/

// Extracts the body of a string literal as if it had been eval()'d.
// This is probably painfully slow.
function eval_string(string) {
	var quote = string[0];
	if (!(quote == "'" || quote == '"') || string[string.length-1] != quote || string.length < 2) 
		throw new Error("This doesn't look like a string literal: " + string);
	string = string.slice(1, -1);
	var chunks = string.split(/(\\(?:['"\/bfnrt]|u[a-zA-Z0-9]{4}|U[a-zA-Z0-9]{8}))/);
	for (var i = 0; i < chunks.length; i++) {
		if (chunks[i][0] == '\\') {
			chunks[i] = eval(quote + chunks[i] + quote);
		}
	}
	return chunks.join('');
}

// Extracts and sets `a`'s href propery to the the text of the first 
// single-quoted string in the href.
function href_from_string_arg(a) {
	// The string extraction RE isn't right, but the URLs never seem 
	// to contain escaped apostrophes anyway.
	a.href = unescape(eval_string(a.href.match(/'(\\'|[^'])+'/)[0]));
}

function fix_popUpHelp(a) {
	a.setAttribute('onclick', a.href.replace(/javascript:/, "") + 'return false;');
	href_from_string_arg(a);
}

// Maps link function names to functions that set a valid HREF.
// NOOP functions are provided where it is not possible to provide
// a non-JavaScript equivalent.
var link_functions_to_fixes = {
	buildReturnPageNewList:  href_from_string_arg,
	ReturnSearchPage:        href_from_string_arg,
	viewlargeimage:          function(){}, // NOOP
	AddCopy:                 function(){}, // NOOP
	buildNewList:            href_from_string_arg,
	buildMyList:             href_from_string_arg,
	popUpHelp:               fix_popUpHelp,
	loginIntoOrOutOfAccount: href_from_string_arg,
};

if (prefs.fix_js_links) {
	// Dispatch to the functions for link types.
	Array.slice(document.getElementsByTagName("a")).filter(function(a) {
		return ( a.href && a.href.match(/^\s*javascript:/i) );
	}).forEach(function(a) {
		var func_name = a.href.match(/^\s*javascript:\s*([a-z0-9_$]+)/i)[1];
		var func = link_functions_to_fixes[func_name];
		if (func) {
			func(a, func_name);
			if (DEBUG) {
				if (a.href.match(/^http:/i)) {
					a.href += "#fixed_from_" + func_name;
				} else {
					a.href += "//fixed from " + func_name;
				}
			}
		} else {
			log("Unable to fix a link calling " + func_name);
			log("  link was " + a.href);
		}
	});
	log("Link fixing completed");
}


///////////////////////////
// MAINTAIN THE SESSION  //
///////////////////////////


function is_community_resources_page() {
	return document.location.href.match(/^https?:\/\/lpl.lacrosse.lib.wi.us:81\//i);
}

var session_interval_ident = null;
var access_pref_name = is_community_resources_page() ? "last_cr_access" : "last_catalog_access";

function maintain_session() {
	if (!prefs.maintain_session) {
		session_interval_ident = null;
		return;
	}
	
	var expires_at = prefs[access_pref_name] + prefs.session_timeout_interval;
	if (expires_at <= now()) {
		// Pull the url to load out of the navigation (we need one that
		// contains the session token).
		var link_found = false;
		var links = get_as_by_class_name("TabInactive|navBarAnchor");
		for (var i = 0; i < links.length; i++) {
			if (links[i].href.match(/^https?:\/\/lpl.lacrosse.lib.wi.us/)) {
				GM_xmlhttpRequest({
					method: 'GET',
					url: links[i].href,
					onload: function() {
						log("Session extension request completed.");
						prefs[access_pref_name] = now();
					},
					onerror: function() {
						log("Error encountered when making the session extension request.");
					}
				});
				link_found = true;
				break;
			}
		}
		
		if (link_found) {
			log("Request sent to extend the session.");
		} else {
			log("Couldn't find a link to extend the session with");
		}	
	}
	
	session_interval_ident = window.setTimeout(maintain_session, prefs.maintain_session_interval);
}

if (is_ipac_page) {
	log("Starting session maintenance loop.");
	prefs[access_pref_name] = now();
	maintain_session();
	prefs.listen("maintain_session", function(value, old_value, name) {
		if (value && !old_value) maintain_session();
		if (!value && session_value_ident) window.clearTimeout(session_value_ident);
	});
}

})();
