// Greasepress
// version 0.21
// 2005-06-26
// Copyright (c) 2005, drac (http://lair.fierydragon.org)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Greasepress", and click Uninstall.
//
// Important: this script does *NOT* make use of XMLHTTPRequest.
// ie: The script should never generate additional HTTP requests.

// Known bugs: Unpredictable results with a write-post page on which a draft is present
// Credits: Learnt lots from Dive into Greasemonkey (the book), Fark Butler and RSSPanel scripts

// changelog:
// 0.10 - initial release. quicktags, categories and trackback toggles, saves options.
// 0.11 - bugfix. detects a draft page and inserts_UI after password fieldset instead of always after title fieldset
// 0.15 - changed ui text slightly to conserve horizontal space, added content textarea expander/shrinker
// 0.20 - changed options UI from 4em to 6em, UI display changes from new posts to draft posts
// 0.21 - added colours to the UI. Boredom.

// ==UserScript==
// @name          Greasepress
// @namespace   http://lair.fierydragon.org
// @description  Toggle visibility of Wordpress post authoring UI elements. Category selection,  QuickTags and Trackback, CommentStatus and PostPassword widgets are currently supported.
// @include       */wp-admin/post.php*
// ==/UserScript==)

var version_String = "0.30";
var isColoured = 1; // make this value 0 and it all reverts to plain Wordpress UI colouring.

var original_marginRight = '11em'; // todo: use getComputedStyle instead of hardcoding the value. Didn't work first time round ?
var grease_TrackText =  '<span id="track_sp">trackback' + '<input type="checkbox" value ="hide_track" id = "toggle_track" name="toggle_track_display" />&nbsp;&nbsp;</span>';
var grease_PostText = '<span id="pwd_sp">password' + 
	 '<input type="checkbox" value ="hide_pwd" id = "toggle_pwd" name="toggle_pwd_display" />&nbsp;&nbsp;</span>' +	
	'<span id="comment_sp">comments' + 
	 '<input type="checkbox" value ="hide_commentstatus" id = "toggle_commentstatus" name="toggle_commentstatus_display" />&nbsp;&nbsp;</span>';
var grease_DefaultHeader = ' ' + '<legend><a ' + get_TitleColour() + 
'href="javascript:alert(\'Greasepress '+ version_String + ' is a GreaseMonkey user script. \\n\\nPlease disable or uninstall the script locally if you do not wish to see these options.\\n\\n The latest version can be found at http://lair.fierydragon.org\');">' +
		'<b>Greasepress options</b></a></legend>' +
	  '<b>Hide: </b> ' +
	  'categories' +
	  '<input type="checkbox" value ="hide_cat" id = "toggle_cat" name="toggle_cat_display" />&nbsp;&nbsp;' +
	  'quicktags' +
	  '<input type="checkbox" value ="hide_ed" id = "toggle_ed" name="toggle_ed_display"/>&nbsp;&nbsp;';
var grease_DefaultFooter = '&nbsp;&nbsp;' +	 
	 '<span align="right"><input type="button" value ="Save settings" id = "save_grease_options" name="save_opt""/></span>' +	  	 
	  '</fieldset>';

var grease_AllText = grease_DefaultHeader + grease_TrackText + grease_PostText + grease_DefaultFooter;

var option_hideCategory;
var option_hideEditTools;
var option_hideTrackback;
var option_hidePassword;
var option_hideComentPingStatus;

function get_TitleColour() {
	if (isColoured == 1) {
		return 'style="color: #000"';
	}
	else {
		return '';
	}
}

function toggle_post_width(post_Div, toggle) {
	if (toggle) { post_Div.style.marginRight = "1em"; 	}
	else { post_Div.style.marginRight = original_marginRight; }	
}

function toggle_visibility (action_element, toggle) {	
	if (toggle) { action_element.style.display = 'none'; }
	else { action_element.style.display = 'block'; }
}

function set_handlers() {	
	document.getElementById('toggle_cat').onclick = 
		function() { 
			toggle_visibility(document.getElementById("categorydiv"), document.post.toggle_cat_display.checked); 
			toggle_post_width(document.getElementById("poststuff"), document.post.toggle_cat_display.checked);
			option_hideCategory = document.post.toggle_cat_display.checked;
		};	

	document.getElementById('toggle_ed').onclick = 
		function() { 
			toggle_visibility(document.getElementById('quicktags'), document.post.toggle_ed_display.checked);
			option_hideEditTools = document.post.toggle_ed_display.checked;
		};

	document.getElementById('toggle_track').onclick = 
		function() { 
			if (window.location.href.match(/post.php$/i)) {	
				toggle_visibility(document.evaluate("//div[@id='poststuff']/p", document, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0), document.post.toggle_track_display.checked);			
			}			
			option_hideTrackback = document.post.toggle_track_display.checked;
		};	
	
	document.getElementById('toggle_pwd').onclick = 
		function() { 
			toggle_visibility(document.evaluate("//fieldset[@id='postpassworddiv']", document, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0), document.post.toggle_pwd_display.checked);
			option_hidePassword = document.post.toggle_pwd_display.checked;
		};	
	
	document.getElementById('toggle_commentstatus').onclick = 
		function() { 
			toggle_visibility(document.evaluate("//fieldset[@id='commentstatusdiv']", document, null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0), document.post.toggle_commentstatus_display.checked);
			option_hideCommentPingStatus = document.post.toggle_commentstatus_display.checked;
		};	
	
	if (GM_setValue) 	{
		document.getElementById('save_grease_options').onclick =
			function() { 
				GM_setValue('hide_categories', option_hideCategory); 
				GM_setValue('hide_edit', option_hideEditTools); 
				GM_setValue('hide_trackback', option_hideTrackback); 	
				GM_setValue('hide_pwd', option_hideTrackback); 	
				GM_setValue('hide_commentstatus', option_hideTrackback); 	

				alert('Greasepress options saved');
			}
	}	
}

function insert_UI() {
	var grease_fieldset = document.createElement("fieldset");
	grease_fieldset.style.height = "6em;";
	if (isColoured == 1) {
		grease_fieldset.style.background = '#ffffe1';	
		grease_fieldset.style.color = '#000';
	}

	// oddity: The diveintogreasemonkey method (insert complex html) produces 2 fieldsets, hence no starting fieldset tag below.
	// <fieldset> instead of ' ' as the first string produces a nested fieldset.

	var page_elem;
	var href = window.location.href;
	grease_fieldset.innerHTML = grease_AllText;
	if (href.match(/post.php$/i)) {	
		page_elem = document.getElementById('titlediv');		
	}
	else {
		page_elem = document.getElementById('postpassworddiv');
	}
	// any other case other than draft or initial post mode and this check is gonna break. Submit bug reports
	if (page_elem) 	{
		page_elem.parentNode.insertBefore(grease_fieldset, page_elem.nextSibling);
		var c = document.getElementById('content');		
		var up = document.createElement('a');		
		up.innerHTML = "<a href=\"#\" onclick=\"javascript:{ var c = document.getElementById('content'); if (c.rows > 4) { c.rows -= 2; } }\">&#8593;</a>&nbsp;";
		var down = document.createElement('a');
		down.innerHTML = "<a href=\"#\" onclick=\"javascript:{ var c = document.getElementById('content'); if (c.rows < 40) { c.rows += 2; } }\">&#8595;</a>&nbsp;";
		c.parentNode.insertBefore(up, c.nextSibling);		
		c.parentNode.insertBefore(down, c.nextSibling);
	}	
}

function hide_RedundantOptions() {
	var href = window.location.href;
	if (href.match(/post.php$/i)) {	
		document.getElementById('comment_sp').style.display = "none";
		document.getElementById('pwd_sp').style.display = "none";
	}
	else {
		document.getElementById('track_sp').style.display = "none";
	}
}

function restore_saved_options() {
	if (!GM_getValue) {
		// redundant use of a redundant check ;)
		alert('This browser is running a version of Greasemonkey below 0.3. Please consider upgrading');
		return;
	}	
	document.post.toggle_cat_display.checked = option_hideCategory = GM_getValue('hide_categories', false);	
	document.post.toggle_ed_display.checked = option_hideEditTools = GM_getValue('hide_edit', false);	
	document.post.toggle_track_display.checked = option_hideTrackback = GM_getValue('hide_trackback', false);
	document.post.toggle_pwd_display.checked = option_hideTrackback = GM_getValue('hide_pwd', false);
	document.post.toggle_commentstatus_display.checked = option_hideTrackback = GM_getValue('hide_commentstatus', false);
		
	document.getElementById('toggle_cat').onclick();
	document.getElementById('toggle_ed').onclick();
	document.getElementById('toggle_track').onclick();
	document.getElementById('toggle_pwd').onclick();
	document.getElementById('toggle_commentstatus').onclick();
}

function setup_environment() {
	insert_UI();
	set_handlers();
	hide_RedundantOptions();
}

setup_environment();
if (GM_getValue) {
	restore_saved_options(); // if GM_get and setValue is not available, this function can be commented out
}