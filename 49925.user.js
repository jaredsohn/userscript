scr_meta=<><![CDATA[
// ==UserScript==
// @name	FetLife Latest Activity Organizer
// @namespace	Solipsistic
// @description	Groups and collapses friend activity on home page tabs.
// @version	3.0.6
// @date	October 7th, 2011
// @include	https://fetlife.com/home/v3*
// ==/UserScript==
]]></>.toString();

//==============================================================//
// Originally created by Solipsistic.  Updated and maintained   //
// by Crogmagnon and Solipsistic.				//
//								//
// Credit to Crogmagnon for making the changes necessary to	//
// update this script to version 2 of the FetLife feed and also	//
// for other options, such as name filtering, status commenting,//
// and display options.						//
//								//
// Credit to sizzlemctwizzle for the auto-update code.		//
//==============================================================//


//==== Begin Auto-update Code ====//


CheckScriptForUpdate = {
// Don't edit after this line, unless you know what you're doing ;-)
 name: /\/\/\s*@name\s+(.*)\s*\n/i.exec(scr_meta)[1],
 version: /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1].replace(/\./g, ''),
 time: new Date().getTime(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'http://userscripts.org/scripts/source/49925.meta.js',
	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/\/\/\s*@version\s+(.*)\s*\n/i.exec(xpr.responseText);
    this.xname=/\/\/\s*@name\s+(.*)\s*\n/i.exec(xpr.responseText);
    if ( (this.xversion) && (this.xname[1] == this.name) ) {
      this.xversion = this.xversion[1].replace(/\./g, '');
      this.xname = this.xname[1];
    } else {
      if ( (xpr.responseText.match("the page you requested doesn't exist")) || (this.xname[1] != this.name) ) 
      return false;
    }
    if ( (+this.xversion > +this.version) && (confirm('A new version of the '+this.xname+' script is available.\nAfter installing, please reload this page to apply the update.\n\nProceed with update?')) ) {
      GM_setValue('updated', this.time+'');
      try { top.location.href = 'http://userscripts.org/scripts/source/49925.user.js'; }
	catch (err) {} 
    } else if ( (this.xversion) && (+this.xversion > +this.version) ) {
      if(confirm('Do you want to turn off automatic updating for this script?')) {
	GM_setValue('update_on',false);
	alert('Automatic updates can be re-enabled for this script on the Settings tab.');
      } else {
	GM_setValue('updated', this.time+'');
      }
    } else {
      if(response) alert('No updates available for the '+this.name+' script.');
      GM_setValue('updated', this.time+'');
    }
  },
 check: function() {
    if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time+'');
    if ( (GM_getValue('update_on', true)) && (+this.time > (+GM_getValue('updated', 0) + (1000*60*60*24*GM_getValue('update_days',1)))) ) {
      this.call();
    }
    }
};
if (self.location == top.location && typeof GM_xmlhttpRequest != 'undefined') CheckScriptForUpdate.check();

// ==== End Auto-update Code ====//


//======= Begin Menu Code =======//

// Retrieve our saved or default settings
//
function getSettings() {
	DISTINCT_HEADERS = GM_getValue('DISTINCT_HEADERS',false);		// Shows colored and highlighted headers; coded by Cromagnon
	AVATARS_IN_HEADERS = GM_getValue('AVATARS_IN_HEADERS',false);		// Shows avatar only on the header; coded by Cromagnon
	COMPACT_HEADERS = GM_getValue('COMPACT_HEADERS',false);			// Show compact headers which save space; coded by Cromagnon
	ISOLATE_STATUS_UPDATES = GM_getValue('ISOLATE_STATUS_UPDATES',false);	// Shows status updates only on the status tab; created by Cromagnon
	MAX = GM_getValue('MAX',3);						// Number of pages of updates to load by default

	ORGANIZE_EVERYTHING = GM_getValue('ORGANIZE_EVERYTHING',true);
	ORGANIZE_GROUP = GM_getValue('ORGANIZE_GROUP',true);
	ORGANIZE_STATUSES = GM_getValue('ORGANIZE_STATUSES',true);
	ORGANIZE_WRITING = GM_getValue('ORGANIZE_WRITING',true);
	ORGANIZE_PICTURES = GM_getValue('ORGANIZE_PICTURES',true);
	ORGANIZE_VIDEOS = GM_getValue('ORGANIZE_VIDEOS',true);

	HOTLIST = GM_getValue('HOTLIST','').split("\n");			// List of users which appear at the top of the list; coded by Cromagnon
	COLDLIST = GM_getValue('COLDLIST','').split("\n");			// List of users which appear at the bottom of the list; coded by Cromagnon			
	HIDDENLIST = GM_getValue('HIDDENLIST','').split("\n");			// List of users which are hidden; inspired by Cromagnon

	UPDATE_ON = GM_getValue('update_on',true);
	UPDATE_DAYS = GM_getValue('update_days',1);
}	
getSettings();


// Function for updating and saving our settings between sessions
//
function updateSettings() {
	var max = document.getElementById('max');
	var max_value = parseInt(max.value);

	var days = document.getElementById('update_days');
	var days_value = parseInt(days.value);

	// Reject non-numeric entries for MAX or UPDATE_DAYS
	//
	if (isNaN(max_value)) {
		max.setAttribute('style','outline: thin solid red; width: 15px');
		alert('Please enter the number of pages to load.')
		return;
	} else	max.setAttribute('style','width: 15px');

	if (isNaN(days_value)) {
		days.setAttribute('style','outline: thin solid red; width: 15px');
		alert('Please enter the number of days between updates.')
		return;
	} else	days.setAttribute('style','width: 15px');


	// Set our active variables to the new values
	//
	DISTINCT_HEADERS = document.getElementById('distinct').checked;
	AVATARS_IN_HEADERS = document.getElementById('avatars').checked;
	COMPACT_HEADERS = document.getElementById('compact').checked;
	ISOLATE_STATUS_UPDATES = document.getElementById('status').checked;
	MAX = max_value;

	ORGANIZE_EVERYTHING = document.getElementById('organize_everything_true').checked;
	ORGANIZE_GROUP = document.getElementById('organize_group_true').checked;
	ORGANIZE_STATUSES = document.getElementById('organize_statuses_true').checked;
	ORGANIZE_WRITING = document.getElementById('organize_writing_true').checked;
	ORGANIZE_PICTURES = document.getElementById('organize_pictures_true').checked;
	ORGANIZE_VIDEOS = document.getElementById('organize_videos_true').checked;

	UPDATE_ON = document.getElementById('update_on').checked;
	UPDATE_DAYS = days_value;


	// Update our style settings, based on our new selections
	//
	var distinct_style_node = document.getElementById('distinct_header_style')
	var compact_style_node = document.getElementById('compact_header_style')

	distinct_style_node.parentNode.removeChild(distinct_style_node);
	if (compact_style_node != null) compact_style_node.parentNode.removeChild(compact_style_node);

	addGlobalStyle(DISTINCT_HEADERS ? distinct_header_style : normal_header_style,'distinct_header_style');
	if (!COMPACT_HEADERS) addGlobalStyle(expanded_header_style,'compact_header_style');


	// Generate our filtered user lists
	//
	var top = document.getElementById('filter_top').value;
	var bottom = document.getElementById('filter_bottom').value;
	var hidden = document.getElementById('filter_hidden').value;

	HOTLIST = top.split("\n");
	COLDLIST = bottom.split("\n");
	HIDDENLIST = hidden.split("\n");


	// Save our variables to about:config
	//
	GM_setValue('DISTINCT_HEADERS',DISTINCT_HEADERS);
	GM_setValue('AVATARS_IN_HEADERS',AVATARS_IN_HEADERS);
	GM_setValue('COMPACT_HEADERS',COMPACT_HEADERS);
	GM_setValue('ISOLATE_STATUS_UPDATES',ISOLATE_STATUS_UPDATES);
	GM_setValue('MAX',MAX);

	GM_setValue('ORGANIZE_EVERYTHING',ORGANIZE_EVERYTHING);
	GM_setValue('ORGANIZE_GROUP',ORGANIZE_GROUP);
	GM_setValue('ORGANIZE_STATUSES',ORGANIZE_STATUSES);
	GM_setValue('ORGANIZE_WRITING',ORGANIZE_WRITING);
	GM_setValue('ORGANIZE_PICTURES',ORGANIZE_PICTURES);
	GM_setValue('ORGANIZE_VIDEOS',ORGANIZE_VIDEOS);

	GM_setValue('HOTLIST',top);
	GM_setValue('COLDLIST',bottom);
	GM_setValue('HIDDENLIST',hidden);

	GM_setValue('update_on',UPDATE_ON);
	GM_setValue('update_days',UPDATE_DAYS);

	feed_settings_notice = document.createElement('div');
	feed_settings_notice.setAttribute('class','notice');
	feed_settings_notice.innerHTML = "Settings have been saved! Click on the tabs to see the changes.";
	feed_container.insertBefore(feed_settings_notice,fieldset);

	self.scrollTo(0,0);
}


// Insert our configuration tab
//
function addMenu() {
	var tabnav = document.getElementById('tabnav');

	var settings_tab = document.createElement('li');
	settings_tab.id = 'settings';
	settings_tab.setAttribute('class','tab tab6'); 

	tabnav.appendChild(settings_tab);

	var menu = document.createElement('a');
	settings_tab.appendChild(menu);

	menu.setAttribute('href','#');
	menu.addEventListener("click", openMenu, true);
	menu.innerHTML = "Settings";
}
addMenu();


// Layout and design of the menu
//
function openMenu() {
	// Clear our space for the config options
	//
	status_form.style.display = 'none';
	tab_spinner.parentNode.removeChild(tab_spinner);	
	while (feed_container.childNodes.length) feed_container.removeChild(feed_container.firstChild);

	// Get our most current settings
	//
	getSettings();

	// Create settings layout
	//
	fieldset = document.createElement('fieldset');
	fieldset.innerHTML = '<legend>Activity Organizer Settings</legend>';
	feed_container.appendChild(fieldset);


	// Display settings section
	//
	var feed_display_settings = document.createElement('table');
	feed_display_settings.setAttribute('class','settings');
	feed_display_settings.setAttribute('style','width:100%');

	feed_display_settings.innerHTML = 
		'<tr>'
		+	'<th colspan="2" class="section_header">Activity Display Settings</th>'
		+'</tr>'
		+'<tr>'
		+	'<td>Highlight friend activity and post count</td>'
		+	'<td class="option"><input id="distinct" type="checkbox" value="distinct"></td>'
		+'</tr>'
		+'<tr>'
		+	'<td>Show profile pictures only once</td>'
		+	'<td class="option"><input id="avatars" type="checkbox" value="avatars"></td>'
		+'</tr>'
		+'<tr>'
		+	'<td>Make friend activity headings more compact</td>'
		+	'<td class="option"><input id="compact" type="checkbox" value="compact"></td>'
		+'</tr>'
		+'<tr>'
		+	'<td>Hide status updates from the Everything tab</td>'
		+	'<td class="option"><input id="status" type="checkbox" value="status"></td>'
		+'</tr>'
		+'<tr>'
		+	'<td>Set number of pages of activity to load</td>'
		+	'<td class="option"><input id="max" type="text" maxlength="2" style="width:15px"></td>'
		+'</tr>';

	fieldset.appendChild(feed_display_settings);

	if (DISTINCT_HEADERS) document.getElementById('distinct').checked = true;
	if (AVATARS_IN_HEADERS) document.getElementById('avatars').checked = true;
	if (COMPACT_HEADERS) document.getElementById('compact').checked = true;
	if (ISOLATE_STATUS_UPDATES) document.getElementById('status').checked = true;
	document.getElementById('max').value = MAX;

	
	// FIXME
	// Individual tab settings section
	//
	var feed_tab_settings = document.createElement('table');
	feed_tab_settings.setAttribute('class','settings');
	feed_tab_settings.setAttribute('style','width:100%');

	feed_tab_settings.innerHTML = 
		'<tr>'
		+	'<th class="section_header">Individual Tab Settings</th>'
		+	'<th class="default_option">On</th>'
		+	'<th class="option">Off</th>'
		+'</tr>'
		+'<tr>'
		+	'<td>Organize activity on the Everything tab</td>'
		+	'<td class="default_option"><input id="organize_everything_true" type="radio" value="true" name="organize_everything"></td>'
		+	'<td class="option"><input id="organize_everything_false" type="radio" value="false" name="organize_everything"></td>'
		+'</tr>'
		+'<tr>'
		+	'<td>Organize activity on the Group Activity tab</td>'
		+	'<td class="default_option"><input id="organize_group_true" type="radio" value="true" name="organize_group"></td>'
		+	'<td class="option"><input id="organize_group_false" type="radio" value="false" name="organize_group"></td>'
		+'</tr>'
		+'<tr>'
		+	'<td>Organize activity on the Status Updates tab</td>'
		+	'<td class="default_option"><input id="organize_statuses_true" type="radio" value="true" name="organize_statuses"></td>'
		+	'<td class="option"><input id="organize_statuses_false" type="radio" value="false" name="organize_statuses"></td>'
		+'</tr>'
		+'<tr>'
		+	'<td>Organize activity on the Writing tab</td>'
		+	'<td class="default_option"><input id="organize_writing_true" type="radio" value="true" name="organize_writing"></td>'
		+	'<td class="option"><input id="organize_writing_false" type="radio" value="false" name="organize_writing"></td>'
		+'</tr>'
		+'<tr>'
		+	'<td>Organize activity on the Pictures tab</td>'
		+	'<td class="default_option"><input id="organize_pictures_true" type="radio" value="true" name="organize_pictures"></td>'
		+	'<td class="option"><input id="organize_pictures_false" type="radio" value="false" name="organize_pictures"></td>'
		+'</tr>'
		+'<tr>'
		+	'<td>Organize activity on the Videos tab</td>'
		+	'<td class="default_option"><input id="organize_videos_true" type="radio" value="true" name="organize_videos"></td>'
		+	'<td class="option"><input id="organize_videos_false" type="radio" value="false" name="organize_videos"></td>'
		+'</tr>';

	fieldset.appendChild(feed_tab_settings);

	if (ORGANIZE_EVERYTHING)	document.getElementById('organize_everything_true').checked = true;
	else				document.getElementById('organize_everything_false').checked = true;
	if (ORGANIZE_GROUP) 		document.getElementById('organize_group_true').checked = true;
	else				document.getElementById('organize_group_false').checked = true;
	if (ORGANIZE_STATUSES) 		document.getElementById('organize_statuses_true').checked = true;
	else				document.getElementById('organize_statuses_false').checked = true;
	if (ORGANIZE_WRITING) 		document.getElementById('organize_writing_true').checked = true;
	else				document.getElementById('organize_writing_false').checked = true;
	if (ORGANIZE_PICTURES) 		document.getElementById('organize_pictures_true').checked = true;
	else				document.getElementById('organize_pictures_false').checked = true;
	if (ORGANIZE_VIDEOS) 		document.getElementById('organize_videos_true').checked = true;
	else				document.getElementById('organize_videos_false').checked = true;

	feed_tab_settings.style.display = 'none';
	// FIXME


	// Filter settings section
	//
	var feed_filter_settings = document.createElement('table');
	feed_filter_settings.setAttribute('class','settings');

	feed_filter_settings.innerHTML = 
		'<tr>'
		+	'<th class="section_header">Friend Filter Settings</th>'
		+	'<th class="option"></th>'
		+	'<th class="option"></th>'
		+'</tr>'
		+'<tr>'
		+	'<td class="small">Move these friends to the top</td>'
		+	'<td class="small">Move these friends to bottom</td>'
		+	'<td class="small">Hide these friends completely</td>'
		+'</tr>'
		+'<tr>'
		+	'<td><textarea id="filter_top" rows="30" cols="30" style="width:196px;height:220px"></textarea></td>'
		+	'<td><textarea id="filter_bottom" rows="30" cols="30" style="width:196px;height:220px"></textarea></td>'
		+	'<td><textarea id="filter_hidden" rows="30" cols="30" style="width:196px;height:220px"></textarea></td>'
		+'</tr>'
		+'<tr>'
		+	'<td colspan="3">Arrange or hide friends from the activity tabs. Enter friends above, one name per line.</td>'
		+'</tr>';

	fieldset.appendChild(feed_filter_settings);

	document.getElementById('filter_top').value = GM_getValue('HOTLIST','');
	document.getElementById('filter_bottom').value = GM_getValue('COLDLIST','');
	document.getElementById('filter_hidden').value = GM_getValue('HIDDENLIST','');


	// Auto-update settings
	//
	var version = /\/\/\s*@version\s+(.*)\s*\n/i.exec(scr_meta)[1];
	var date = /\/\/\s*@date\s+(.*)\s*\n/i.exec(scr_meta)[1];

	var feed_update_settings = document.createElement('table');
	feed_update_settings.setAttribute('class','settings');
	feed_update_settings.setAttribute('style','width:100%');

	feed_update_settings.innerHTML = 
		'<tr>'
		+	'<th colspan="2" class="section_header">Automatic Update Settings</th>'
		+'</tr>'
		+'<tr>'
		+	'<td>Automatically check for new script updates</td>'
		+	'<td class="option"><input id="update_on" type="checkbox" value="update_on"></td>'
		+'</tr>'
		+'<tr>'
		+	'<td>Number of days between checks (enter "0" for every time)</td>'
		+	'<td class="option"><input id="update_days" type="text" maxlength="2" style="width:15px"></td>'
		+'</tr>'
		+'<tr colspan="2">'
		+	'<td><span class="smaller">Version '+version+' ('+date+'). <a id=\"check_update\" href=#>Check for updates now</a>.</span></td>'
		+'</tr>';

	fieldset.appendChild(feed_update_settings);

	document.getElementById('update_on').checked = UPDATE_ON;
	document.getElementById('update_days').value = UPDATE_DAYS;

	document.getElementById('check_update').addEventListener('click',CheckScriptForUpdate.call,true);


	// Update button
	//
	feed_settings_button_area = document.createElement('p');
	feed_settings_button_area.id = "button_area";
	feed_container.appendChild(feed_settings_button_area);

	feed_settings_button = document.createElement('span');
	feed_settings_button.id = "submit_button";
	feed_settings_button.innerHTML = '<input type="submit" value="Save" name="commit">';
	feed_settings_button.addEventListener("click", updateSettings, true);
	feed_settings_button_area.appendChild(feed_settings_button);


	// Create a footer for information on the script
	//
	var feed_settings_footer = document.createElement('div');
	feed_settings_footer.innerHTML = '<h4><a target="_blank" href=http://userscripts.org/scripts/show/49925>FetLife Latest Activity Organizer</a></h4>'
					+ '<span class="smaller quiet">Originally created by <a href=https://fetlife.com/users/117480>Solipsistic</a>.<br>'
					+'Updated and maintained by <a href=https://fetlife.com/users/5793>Cromagnon</a> and <a href=https://fetlife.com/users/117480>Solipsistic</a>.</span>';

	feed_container.appendChild(feed_settings_footer);
}

//======= End Menu Code =======//


// Insert CSS for custom elements.
//
function addGlobalStyle(css, id) {
    var head, style;

    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.id = id;
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

var distinct_header_style =
	'ul.user_feed {padding: 0 0 0 0; margin: 0 0 10px 0; list-style: none;}'
	+ 'ul.user_feed li {padding: 9px 0 8px 0; border-bottom: 1px dotted #333;}'
	+ 'ul.user_feed li .mini_feed_picture_other_side {float: right;}'
	+ 'ul.user_feed li blockquote {padding: 0;margin-top: 0;margin-bottom: 0;}'
	+ 'ul.user_list {padding: 0 0 0 0; margin: 0 0 10px 0; list-style: disc;}'
	+ 'ul.user_list li {color: #AAAAAA;}'
	+ 'ul.user_list li.user_heading {color: #AA0000; background-color: #272727;}'
	+ 'li.user_heading a {text-decoration: none; font-weight: bold; font-size: 95%; color: #AAAAAA;}'
	+ 'div.switching_tabs_spinner img {margin-top: -20px; margin-bottom: 20px;}'
	+ 'img.profile_avatar {vertical-align: middle; height: 35px; width: 35px;}'
	+ 'li.new_comment form a {color: #777777; font-size: 0.95em;}';

var normal_header_style =
	'ul.user_feed {padding: 0 0 0 0; margin: 0 0 10px 0; list-style: none;}'
	+ 'ul.user_feed li {padding: 9px 0 8px 0; border-bottom: 1px dotted #333;}'
	+ 'ul.user_feed li .mini_feed_picture_other_side {float: right;}'
	+ 'ul.user_feed li blockquote {padding: 0;margin-top: 0;margin-bottom: 0;}'
	+ 'ul.user_list {padding: 0 0 0 0; margin: 0 0 10px 0; list-style: disc;}'
	+ 'div.switching_tabs_spinner img {margin-top: -20px; margin-bottom: 20px;}'
	+ 'img.profile_avatar {vertical-align: middle; height: 35px; width: 35px;}'
	+ 'li.new_comment form a {color: #777777; font-size: 0.95em;}';

var expanded_header_style = 'ul.user_list li {padding: 9px 0 8px 0;}';

addGlobalStyle(DISTINCT_HEADERS ? distinct_header_style : normal_header_style,'distinct_header_style');
if (!COMPACT_HEADERS) addGlobalStyle(expanded_header_style,'compact_header_style');



// Toggle function for showing and hiding the form used to comment on a status
//
function toggleStatusCommentForm(status_id) {
	var items = document.getElementById(status_id).getElementsByTagName('li');
	var form = items[items.length - 1];

	form.parentNode.style.display = "block";

	if (form.style.display == "none")
		form.style.display = "block";
	else	form.style.display = "none";

	form.getElementsByTagName('textarea')[0].value = "";
}


// View Hidden Status Comments
//
function viewAllStatusComments(status_id) {
	var comments = document.getElementById(status_id).getElementsByTagName('li');

	for(var i = 0; i < comments.length; i++)
		if (comments[i].className != "clearfix status_comment") break;
		else comments[i].style.display = "block";

	if (comments[i].className == "view_other") comments[i].parentNode.removeChild(comments[i]);
}


// View all text for a long status comment
//
function viewLongStatusComment(comment_id) {
	var spans = document.getElementById(comment_id).getElementsByTagName('span');

	for(var i = 0; i < spans.length; i++)
		if (spans[i].className == "short") spans[i].style.display = "none";
		else if (spans[i].className == "long") spans[i].style.display = "block";
}


// Show up to two comments on the current status,
// remove the make_comment link from the end of the comments list
// and finally hook all three links to handle properly
//
function reworkStatusComments(snapshot) {
	var links = snapshot.getElementsByTagName('a');
	var i;

	for (i = 0; i < links.length; i++) {
		if (links[i].className == "make_comment") {
			links[i].href = snapshot.getElementsByTagName('span')[0].getAttribute("data-url");

//			links[i].addEventListener('click', (function(n) {
//				return function (e) {
//					e.preventDefault();
//					toggleStatusCommentForm(n);
//				};
//				})(snapshot.id), true);

			if (links[++i].innerHTML == "delete")
				links[i].href = snapshot.getElementsByTagName('span')[0].getAttribute("data-url");

			break;
		}
	}

	var comments = snapshot.getElementsByTagName('li');
	if (comments.length == 0) return; // skip the new status box

	for(i = 0; i < comments.length; i++) {
		if (comments[i].className != "clearfix status_comment") break;

		if (i < 2) comments[i].style.display = "block";

		links = comments[i].getElementsByTagName('a');

		if (links[links.length - 1].innerHTML == "delete")
			links[links.length - 1].href = snapshot.getElementsByTagName('span')[0].getAttribute("data-url");

		if (links[links.length - 2].innerHTML == "delete")
			links[links.length - 2].href = snapshot.getElementsByTagName('span')[0].getAttribute("data-url");

		if (links[links.length - 1].innerHTML == "more")
			links[links.length - 1].addEventListener('click', (function(n) {
				return function (e) {
					e.preventDefault();
					viewLongStatusComment(n);
				};
				})(comments[i].id), true);
	}

	if (comments[i].className == "view_other") {
		links = comments[i].getElementsByTagName('a');

		if (links[0].className == "view_all") {
			links[0].addEventListener('click', (function(n) {
				return function (e) {
					e.preventDefault();
					viewAllStatusComments(n);
				};
				})(snapshot.id), true);

			var item = document.createElement('li');
			item.className = "view_other";
			comments[i].parentNode.insertBefore(item, comments[i]);
			item.appendChild(links[0]);
			++i;
		}

		comments[i].parentNode.removeChild(comments[i]);
	}

	if (comments[i].className == "new_comment clearfix") {
		links = comments[i].getElementsByTagName('a');

		links[0].addEventListener('click', (function(n) {
			return function (e) {
				e.preventDefault();
				toggleStatusCommentForm(n);
			};
			})(snapshot.id), true);

		links[0].className = "cancel_comment";
	}
}


// Toggle function for showing and hiding user feeds.
//
function toggleUser(divid) {
	var user_feed = document.getElementById(divid);

	if(user_feed.style.display == "none")
		user_feed.style.display = "block";
	else	user_feed.style.display = "none";
}


// Add and return a heading to user_list inserted before cold_list
//
function addHeading(name, user_list, cold_list) {
	var user_heading = document.createElement('li');

	if (cold_list == null)	user_list.appendChild(user_heading);
	else			user_list.insertBefore(user_heading, cold_list);

	user_heading.id = name;
	user_heading.className = "user_heading";

	user_heading.addEventListener('click', (function(n) {
		return function (e) {
			if (!(e.ctrlKey || e.shiftKey || e.altKey)) {
				e.preventDefault();
				toggleUser(n);
			};
		};
		})(name.toLowerCase() + "_feed"), true);

	return user_heading;
}


// Find where this user is in the array or return the first empty spot.
//
function posInArray(name, userArray) {
	for(var i = 0; i < userArray.length; i++)
		if (name.toLowerCase() == userArray[i][0].toLowerCase()) return i;
	return i;
}

// Check if this user is in our array
//
function inArray(name, userArray) {
	for (var i = 0; i < userArray.length; i++)
		if (name.toLowerCase() == userArray[i].toLowerCase()) return true;
	return false;
}


// Build our lists of entries by user.
//
function buildLists() {
	workspace.style.display = "none";
	workspace.innerHTML = feed_html;
	feed_html = "";

	if (tab_spinner != null)
		tab_spinner.style.display = "none";

	feed.style.display = "block";

	var xpath = "//ul[@id='workspace']//div[contains(@class, 'story_2')]";
	var res = document.evaluate(xpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var name, url, time, avatar, spans, user_heading, user_feed, user_list, cold_list;
	var i, j, k, l;

	for (i = 0; i < res.snapshotLength; i++) {

		if (res.snapshotItem(i).className.indexOf("status") > 0) {
			if (ISOLATE_STATUS_UPDATES && (type != "statuses"))
				continue;

			//Handle commenting on status entries
			reworkStatusComments(res.snapshotItem(i));
		}

		url = res.snapshotItem(i).getElementsByTagName('a')[1];

		// Avoid errors/corruption in the activity feed.  Skip the new status box.
		//
		if (url == null || url.innerHTML == "cancel")
			continue;

		name = url.innerHTML;

		url = url.href;

		if (AVATARS_IN_HEADERS) {
			avatar = res.snapshotItem(i).getElementsByTagName('a')[0];
			res.snapshotItem(i).removeChild(avatar);

			avatar = "<a href=" + url + ">" + avatar.innerHTML + "</a> ";

		} else	avatar = "";

		spans = res.snapshotItem(i).getElementsByTagName('span');
		for (l = 0; l < spans.length; l++) {
			if ((spans[l].className == "time_ago timestamp") || (spans[l].className == "time_ago status-timestamp")) {
				time = spans[l].innerHTML;
				spans[l].setAttribute('data-timestamp',time);
				spans[l].className = "time_ago refresh-timestamp";
			}
		}

		j = posInArray(name, userArray);

		if (userArray[j] == null)
			userArray[j] = [name, url, time, avatar];

		k = userArray[j].length;

		userArray[j][k] = res.snapshotItem(i);

		res.snapshotItem(i).parentNode.removeChild(res.snapshotItem(i));
	}

	user_list = document.getElementById('user_list');
	cold_list = document.getElementById('cold_list');

	if (user_list == null) {
		user_list = document.createElement('ul');
		feed.appendChild(user_list);

		user_list.id = 'user_list';
		user_list.className = "user_list";

		// Insert place-holders at the top for our HOTLIST
		//
		for (i = 0; i < HOTLIST.length; i++)
			addHeading(HOTLIST[i].toLowerCase(), user_list, null).style.display = "none";

		// Mark the start of our COLDLIST
		//
		cold_list = document.createElement('li');
		cold_list.id = "cold_list";
		cold_list.style.display = "none";
		user_list.appendChild(cold_list);

		// Insert place-holders at the bottom for our COLDLIST
		//
		for (i = 0; i < COLDLIST.length; i++)
			addHeading(COLDLIST[i].toLowerCase(), user_list, null).style.display = "none";

		// Insert place-holders at the bottom for our HIDDENLIST
		//
		for (i = 0; i < HIDDENLIST.length; i++)
			addHeading(HIDDENLIST[i].toLowerCase(), user_list, null).style.display = "none";
	}

	for (i = 0; i < userArray.length; i++) {
		if (userArray[i] == null) continue;

		name = userArray[i][0];
		url = userArray[i][1];
		time = userArray[i][2];
		avatar = userArray[i][3];

		user_heading = document.getElementById(name.toLowerCase());

		if (user_heading == null)
			user_heading = addHeading(name.toLowerCase(), user_list, cold_list);
		else {
			if (!inArray(name, HIDDENLIST))
				user_heading.style.display = "block";

			user_feed = document.getElementById(name.toLowerCase() + "_feed");

			if (user_feed != null) user_feed.parentNode.removeChild(user_feed);
		}

		var link = "<a href=" + url + ">" + name + "</a>";
		var n = userArray[i].length-4;

		user_heading.innerHTML = avatar + link + " has " + n + (n == 1 ? " entry. " : " entries. ")
					 + "<span class='quiet smaller'>last was "
					 + "<span class='time_ago refresh-timestamp' data-timestamp='"
					 + time + "'>" + time + "</span></span>";

		user_feed = document.createElement('ul');
		user_list.insertBefore(user_feed, user_heading.nextSibling);

		user_feed.id = name.toLowerCase() + "_feed";
		user_feed.className = "user_feed";
		user_feed.style.display = "none";

		for (j = 4; j < userArray[i].length; j++) {
			user_feed.appendChild(userArray[i][j]);
		}
	}

	unsafeWindow.refreshAllTimestamps();
}


// Parse our last response and add it into the queue.  Get more if there 
// is more to get.
//
function getMore(responseDetails) {
	++offset;

	var response = responseDetails.responseText;

	// Check if there are no entries.
	//
	if (response.indexOf('<div class="empty">') > 0) {
		if (tab_spinner != null)
			tab_spinner.style.display = "none";

		feed_container.innerHTML = response;
		return;
	}

	// Replace Unicode with characters.
	//
	response = response.replace(/\\u003C/g,"<");
	response = response.replace(/\\u003E/g,">");
	response = response.replace(/\\u0026/g,"&");
	response = response.replace(/\\u2019/g,"'");

	// Parse our response.
	//
	var s = response.lastIndexOf("</div>\n</div>") + 14;
	var e = response.lastIndexOf("</div>\n  </div>") + 16;
	var html, more;

	e = Math.max(s,e);
	s = response.indexOf('<div class="story_2 ');

	if (s >= 0) {
			html = response.substr(s,e-s);
			html = html.replace(/\\n/g,"");
			html = html.replace(/\\/g,"");

			feed_html += html;
			more = true;
	} else		more = (response.indexOf('<div class="clearfix">\n  </div>') < 0);

	// If there are more entries and we're not at max_page, keep getting entries.
	// Otherwise, build our lists and finish.
	//
	if (more && offset < max_page) {
		GM_xmlhttpRequest({
   			method: 'GET',
    			url: 'http://www.fetlife.com/home/' + version + '.js?subfeed=' + type + '&page=' + offset,
    			headers: {
        			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        			'Accept': 'application/atom+xml,application/xml,text/xml',
    			},
    			onload: getMore
		});
	} else {
		buildLists();

		if (more) 	addViewMore();
		else		view_more.parentNode.removeChild(view_more);
	}
}


// Get our initial page of feed data, parse and try to get more.
//
function getSome() {
	// Basic request so we can see the "empty" message if there is one.
	//
	GM_xmlhttpRequest({
    		method: 'GET',
    		url: 'http://www.fetlife.com/home/' + version + '.js?subfeed=' + type + start,
    		headers: {
      	  		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
        		'Accept': 'application/atom+xml,application/xml,text/xml',
    		},
    		onload: getMore
	});
}


// Get the next page(s) of feed data starting just after the last page retreived.
//
function getNext() {
	// Show our spinner and hide the view more link to show that we are working on a request
	//
	spinner.style.display = "block";

	view_more_link.style.display = "none";

	start = "&page=" + offset;
	max_page += MAX;
	getSome();
}


// Main function
//
function init() {
	// Clear our workspace and variables
	while (feed_container.childNodes.length) feed_container.removeChild(feed_container.firstChild);
	userArray = new Array;
	feed_html = "";
	start = "";
	offset = 0;
	max_page = MAX;

	// Add our feed
	feed = document.createElement("div");
	feed_container.appendChild(feed);
	feed.id = "feed";

	// Create a workspace
	workspace = document.createElement("ul");
	feed_container.appendChild(workspace);
	workspace.id = "workspace";
	workspace.innerHTML = "<br><br>";

	// Show that we're working
	if (tab_spinner != null)
		tab_spinner.style.display = "block";

	// Create our user lists
	getSome();
}

function setTab() {
	type = this.id;

	// check for old numbered tab ids
	//
	switch (type) {
		case "tab1" : type = "everything";	break;

		case "tab2" : type = "group";		break;

		case "tab3" : type = "writing";		break;

		case "tab4" : type = "pictures";	break;

		case "tab5" : type = "videos";		break;
	}

	// remove or replace the new status entry form, so it
	// won't appear on tabs other than Status Updates
	//
	if (ISOLATE_STATUS_UPDATES && (status_form != null)) {
		if (type == "statuses")
			feed_container.parentNode.insertBefore(status_form, feed_container.previousSibling);
		else if (status_form.parentNode != null)
			status_form.parentNode.removeChild(status_form);
	}

	getTabSpinner();

	init();
}

function addViewMore () {
	view_more = document.getElementById("view_more");

	if (view_more != null) {
		view_more.parentNode.removeChild(view_more);
	}

	view_more = document.createElement("div");
	feed.appendChild(view_more);
	view_more.id = "view_more";

	view_more_link = document.createElement("div");
	view_more.appendChild(view_more_link);
	view_more_link.className = "quiet";
	view_more_link.innerHTML = "<a href='javascript:void(0);'>V &nbsp; &nbsp; view more &nbsp; &nbsp; V</a>";

	spinner = document.createElement("div");
	view_more.appendChild(spinner);
	spinner.id = "spinner";
	spinner.className = "spinner";
	spinner.style.display = "none";
	spinner.innerHTML = '<img src="http://static.fetlife.com/spinner.gif" class="spinner">';
	
	view_more.addEventListener('click', getNext, true);
}

// Handle tab clicking.
//
function hookTabs () {
	var tabs = 	[["everything",	ORGANIZE_EVERYTHING],
			["group",	ORGANIZE_GROUP],
			["statuses",	ORGANIZE_STATUSES],
			["writing",	ORGANIZE_WRITING],
			["pictures",	ORGANIZE_PICTURES],
			["videos",	ORGANIZE_VIDEOS]];

	for(var i = 0; i < tabs.length; i++) {
		var tab = document.getElementById(tabs[i][0]);
		if (tab != null && tabs[i][1]) {
			tab.addEventListener("click", setTab, true);
			tab.getElementsByTagName("a")[0].href = "javascript:void(0);";
		}
	}

	// remove the new status entry form, so it
	// won't appear on tabs other than Status Updates
	//
	if ((type != "statuses") && ISOLATE_STATUS_UPDATES && (status_form != null))
		status_form.parentNode.removeChild(status_form);
}

// Find the tab switching spinner
//
function getTabSpinner() {
	tab_spinner = document.getElementById('switching_tabs_spinner');

	if (tab_spinner == null) {
		tab_spinner = document.createElement("div");

		feed_container.parentNode.insertBefore(tab_spinner, feed_container);

		tab_spinner.className = "switching_tabs_spinner";
		tab_spinner.id = "switching_tabs_spinner";
		tab_spinner.style.display = "block";

		tab_spinner.innerHTML = '<img src="/images/spinner_big.gif" alt="fetching information...">';
	}
}

// Status entry form functions ...
//
function updateNewStatusCounter(e) {
	var form = document.getElementById("new_status");

	var value = form.getElementsByTagName("textarea")[0].value;

	var counter = form.getElementsByTagName("span")[0];

	counter.innerHTML = 200 - value.length;

	if (value.length > 200) counter.className = "counter over_limit";
	else if (value.length < 180) counter.className = "counter";
	else counter.className = "counter getting_close";

	var btn = form.getElementsByTagName("input")[0];

	if (value.length == 0) btn.setAttribute("disabled",null);
	else btn.removeAttribute("disabled");
}

function enterNewStatus() {
	var form = document.getElementById("new_status");

	if (form.className.indexOf("in_focus") < 0) {
		form.className = "clearfix in_focus";
		form = form.getElementsByTagName("textarea")[0];
		if (form.value == "What's on your kinky mind?") form.value = "";
		updateNewStatusCounter();
	}
}

function cancelNewStatus() {
	var form = document.getElementById("new_status");

	if (form.className.indexOf("out_of_focus") < 0) {
		form.className = "out_of_focus clearfix";
		form.getElementsByTagName("input")[0].setAttribute("disabled",null);
		form = form.getElementsByTagName("textarea")[0];
		if (form.value == "") form.value = "What's on your kinky mind?";
	}
}

// Initialize our defaults.
//
type = "everything";
version = "v3";
if (document.location.toString().indexOf("subfeed=") > 0) type = document.location.toString().substr(document.location.toString().indexOf("subfeed=") + 8);
if (document.location.toString().indexOf("/v2") > 0) version = "v2";

feed_container = document.getElementById("feed_container");

status_form = document.getElementById("status_form");
if (status_form != null) status_form.addEventListener("focus", enterNewStatus, true);
if (status_form != null) status_form.getElementsByTagName("a")[1].addEventListener("click", cancelNewStatus, true);
if (status_form != null) status_form.getElementsByTagName("textarea")[0].addEventListener("keyup", updateNewStatusCounter, true);

hookTabs();
getTabSpinner();

// Call our main function.
//
init();

//end