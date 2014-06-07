// Version 0.9
// Copyright (c) 2007, Mike Champion (mike@graysky.org)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// --------------------------------------------------------------------
// This is a Greasemonkey user script.
// To install, you need Greasemonkey: 
// https://addons.mozilla.org/en-US/firefox/addon/748
//
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
//
// ==UserScript==
// @name           Grindstone
// @namespace      http://graysky.org/grindstone
// @description    Reminder to stay focused
// @include        *
// ==/UserScript==
//
// Version History:
// - 0.9 Initial version
//

// Known Issues:
// - "getValue" Problem on some sites like digg.com with included iframes

// Check each site on page load.
window.addEventListener('load', handle_load, true);
window.addEventListener('unload', handle_unload, true);

// Register commands
registerMenuCommand( "Grindstone Settings", function() { gs_settings(); } );
registerMenuCommand( "Grindstone Block Current Site", function() { gs_block_site(); } );

var iframeLoaded = false; // when the iframe has been loaded

// Called when the page is loaded
function handle_load() {
    try {
	var url = window.location.href;

	// Don't check included iframes
	if(top != self) return;

	// Find the matching site for this URL
	var matchingSite = db.findMatchingSite(url);
	
	// If there is a match, increment the count that it has been visited
	if (matchingSite) matchingSite.incVisits();
	
	// Check the current URL and start timer
	check_site(true); 
    }
    catch (error) {
	gs_debug("Error during handle_onload: " + error);
    }
}

// Handles when current page is unloaded
function handle_unload() {
    timer.stop();
}

// Db object manages access to putting/getting the 
// stored list of keys and sites. 
//
// There is a named item that
// stores the list of configured sites:
// GS_KEYS -> "foo.com|bar.org|baz.net"
// Then for each site there is an entry:
// foo.com -> rule
// The FireFox prefs doesn't appear to support deleting a key, so
// removing a site means removing the entry from the list of keys although
// the other entry will still remain.
//
function Db() {
}

// Key that maps to list of all sites (ex. "foo.com|bar.org|baz.net")
Db.ALL_KEYS = "GS_KEYS";

// Suffix to create a key for temporary passage
Db.ALLOW_PASS = "-pass-until";

// Allow passage to this site for a specified amount of time in minutes.
Db.prototype.allowPass = function(site, amount) {
    if (!site) return;

    var t = new Date();
    // Add on the specified amount of time
    t.setMinutes(t.getMinutes() + amount );

    // Save a key using the site's URL and record the time at which this pass expires
    this.setValue(site.url+Db.ALLOW_PASS, t.toString() );
};

// Check if this site has a pass that is valid. Return true if the pass is valid
// and false if it is not or doesn't exist
Db.prototype.checkPass = function(site) {
    if (!site) return false;

    var t = this.getValue(site.url+Db.ALLOW_PASS, false);
    if (!t) return false;

    // Stored as milliseconds since the epoch
    var now = new Date();

    if (Date.parse(t) > now.valueOf()) {
	// Pass is still valid
	return true;
    }
    return false;
};

// Save a site to the data store
Db.prototype.saveSite = function(site) {
    try {
	// Update the list of keys
	this.addKey(site.url);

	// Save the site
	this.setValue(site.url, site.raw);
    }
    catch (error) {
	gs_debug("Error saving site (" + key + ") : " + error);
    }
};

// Delete a site
Db.prototype.deleteSite = function(key) {

    try {
	// Update the list of keys
	if (this.removeKey(key)) {
	    // FF prefs doesn't appear to support truly deleting keys
	    this.setValue(key, -1); // Set to invalid rule
	}
    }
    catch (error) {
	gs_debug("Error deleting site (" + key + ") : " + error);
    }
    
};

// Return the site that matches this URL or null. 
// Doesn't test if it blocks the current url
Db.prototype.findMatchingSite = function(url) {
    var sites = db.getSites();
    var matchingSite = null;

    // Check each site to see if it blocks the current url
    for (var i = 0; i < sites.length; i++) {
	if (sites[i].match(url)) {
	    matchingSite = sites[i];
	    break;
	}
    }

    return matchingSite;
};

// Return Site object if key matches saved site, otherwise return null.
Db.prototype.getSite = function(key) {
    var keys = this.getKeys();

    // Need to confirm this key is in the list of keys because there is no true delete
    // of a previously configured site.
    for (i in keys) {
	if (keys[i] == key) {
	    // Found the entry
	    var val = this.getValue(keys[i], -1); // -1 is invalid rule
	    return new Site(key, val);
	}
    }
    return null;
};

// Returns the array of stored Site objects.
Db.prototype.getSites = function() {

    var keys = this.getKeys();
    var sites = new Array();

    for (i in keys) {
	var val = this.getValue(keys[i], -1); // -1 is invalid rule	
	sites[i] = new Site(keys[i], val);
    }
    return sites;
}

// Remove a key from the list. Returns true if the key was found, false otherwise.
Db.prototype.removeKey = function (key) {
    if (!key || key == "") return;

    var keys = this.getKeys();

    var toDelete = null;
    for (var i = 0; i < keys.length; i++) {
	if (key == keys[i]) {
	    // Found the key to delete
	    toDelete = i;
	}
    }

    if (toDelete == null) {
	// Never found the key
	return false;
    }
    
    // Remove the key and save the list
    keys.splice(toDelete, 1);
    this.setValue(Db.ALL_KEYS, keys.join("|"));
    return true;
};

// Add a key to the list if it doesn't already exist
Db.prototype.addKey = function(key) {
    if (!key || key == "") return;
    
    var keys = this.getKeys();

    for (var i = 0; i < keys.length; i++) {
	if (key == keys[i]) {
	    return; // Key already exists
	}
    }

    // Add the key and save the list
    keys.push(key);
    keys.sort();
    this.setValue(Db.ALL_KEYS, keys.join("|"));
};

// Returns array of keys to sites
Db.prototype.getKeys = function() {

    var keys = this.getValue(Db.ALL_KEYS, false);
    
    if (keys) {
	return keys.split("|");
    }
    
    return new Array(0);
};

// Wrap Greasemonkey function GM_setValue so they can overridden
Db.prototype.setValue = function(key, value) {
    GM_setValue(key, value);
};

// Wrap Greasemonkey function GM_getValue so they can overridden
Db.prototype.getValue = function(key, defaultValue) {
    return GM_getValue(key, defaultValue);
};

var db = new Db(); // The singleton db

// Timer class to manager asynch checks
function Timer() {
    // Timer to periodically check to see if a site
    // should be blocked
    this.checker = null;
}

// Start timers running
Timer.prototype.start = function() {
    // Only allow 1 timer			    
    if (this.checker != null) return;			    

    // Every 30 seconds check this site
    this.checker = setInterval(function() { check_site(); } , 1000*30);
};

Timer.prototype.registerTimer = function() {
    this.checker = null;
};

// Stop timers
Timer.prototype.stop = function() {
   if (this.checker != null) {
       // gs_debug("Stopping timer: " + this.checker);
       clearInterval(this.checker);
       this.checker = null;
   }
};

var timer = new Timer(); // The singleton timer

// Describes a site to block
function Site(url, rule) {
    this.url = url;

    // Parse the rule format:
    // type-max_time-max_visits (ex. "3-240-10" or "1-0-0")
    if (rule == -1) {
	this.rule = -1; // Not set yet
	return;
    }

    this.raw = rule; // used for serializing to prefs
    
    // Pull out the parts of the rule
    var parts = rule.split("-");
    this.rule = parts[0];
    this.max_time = parts[1]; // in seconds
    this.max_visits = parts[2];
}

// Get the map of block rules
Site.getRules = function() {
    return { 
	// id : user visible description
	"1": "Always",
	"2": "Business Hours (9am-5pm, M-F)",
	"3": "Maximum Amount of Minutes",
	"4": "Maximum Number of Visits"
    };
};

// Return true if this site matches the url, false otherwise
// Note: Does *not* mean it should be blocked.
Site.prototype.match = function(url) {
    // TODO Should test encoded version?
    if (url.indexOf(this.url) == -1) {
	return false; // No match
    }

    return true;
};

// Return true if this site should block the URL, return false
// otherwise
Site.prototype.block = function(url) {
    // Test to see if the string matchs
    if (!this.match(url)) {
	return false; // No match
    }
    
    if (this.rule == 1) {
	return true; // Always block
    }
    else if (this.rule == 2) {
	var d = new Date();
	// Only block between 9-5pm, weekdays
	if (d.getHours() > 8 && d.getHours() < 17 && d.getDay() != 0 && d.getDay() != 6) {
	    return true;
	}
	return false;
    }
    else if (this.rule == 3) {
	// Max time
	var t = this.getVisitInfo()[1];
	// Too much time, block!
	//gs_debug("Max time: " + (60 * this.max_time) + " real time: " + t);
	if (t >= (60 * this.max_time)) return true;
    }
    else if (this.rule == 4) {
	// Max visits
	var n = this.getVisitInfo()[0];
	// Too many visits!
	//gs_debug("Max visits: " + this.max_visits + " real visits: " + n);
	if (n > this.max_visits) return true;
    }

    return false; // Backstop to allow
};

// Prefix for number of visits today
Site.VISITS_KEY = "visit-info-";

// Adds more time to how much has been spent on this site
Site.prototype.incVisitTime = function(msTime) {
    var v = this.getVisitInfo();
    var visits = v[0];
    var time = v[1];

    this.setVisitInfo(visits, Math.round(time + msTime / 1000));
};

// Increments the number of visits to this site
Site.prototype.incVisits = function() {
    var v = this.getVisitInfo();
    var visits = v[0];
    var time = v[1];

    this.setVisitInfo(visits + 1, time);
};

// Store number of visits and amount of time for this site
Site.prototype.setVisitInfo = function(numVisits, secTime) {

    if (numVisits < 0) numVisits = 0;
    if (isNaN(secTime) || secTime < 0) secTime = 0;

    var today = new Date().getDate();
    today += ""; // convert to string

    // Stored like:DoM-##-sec_time (ex. "28-40-300")
    var val = today + "-" + numVisits + "-" + secTime;
    db.setValue(Site.VISITS_KEY + this.url, val);
};

// Return array with info about visits made today:
// [0] - number of visits
// [1] - amount of time spent in seconds
Site.prototype.getVisitInfo = function() {
    // Stored like:DoM-##-sec_time (ex. "28-40-500")
    var v = db.getValue(Site.VISITS_KEY + this.url, false);

    if (!v) {
	return new Array(0,0); // No key
    }

    // Split the value into day of month / num visits / amount of time
    var vals = v.split("-");
    
    var today = new Date().getDate();
    today += ""; // convert to string

    if (vals[0] != today) {
	return new Array(0,0); // value is for the past
    }

    // Convert num visits and time into ints
    var info = new Array();
    info[0] = parseInt(vals[1]);
    info[1] = parseInt(vals[2]);

    return info;
};

Site.prototype.toString = function() {
    return this.url + " " + this.rule;
};

// Show the settings page for the current URL
function gs_block_site() {
    // current url
    var url = window.location.href;

    if (!url || url.length == 0) return;
    
    // pull out http://
    var clean = url.replace(/https?:\/\//, '').replace(/^www\./, '');
    if (clean.charAt(clean.length-1) == "/") {
	// Clean up trailing /
	clean = clean.substring(0, clean.length - 1);
    }
    
    gs_settings(clean);
}

// Show configuration page
// url -- initial url to show for a new rule
function gs_settings(url) {
    if (typeof url == "undefined") {
	url = "";
    }

    var content = '<h1>Grindstone Settings</h1>';
    content += '<p>Pick Website: <select style="width:210px;" id="gs_site_list">';
    content += '<option value="add_site">&lt; New Site &gt;</option>';
    
    var sites = db.getSites();

    for (var i = 0; i < sites.length; i++) {
	content += '<option value="' + sites[i].url + '">' + sites[i].url + '</option>';
    }
    content += "</select>";

    content += '<p><fieldset id="gs_fieldset"><legend>Website to Block</legend> ';
    // Embarrassing table layout hack begins ...
    content += '<form id="gs_settings"><table width="95%" border=0>';
    content += '<tr style="border: 0px solid #000000;"><td width="10%"><b>URL:</b></td>';
    content += '<td><input type="text" style="width:300px;" size="40" name="site_url" id="site_url" value="'+ url +'"></td>';
    content += '<tr style="border: 0px solid #000000;"><td>&nbsp;<td><span id="grindstone_example">Ex: facebook.com or google.com/reader. Leave off <i>www</i>.</span></td>';
    content += '<tr style="border: 0px solid #000000;"><td width="10%"><b>When:</b></td><td><ul style="list-style-type:none; text-align:left; ">';
    // Get the map of rules
    var rules = Site.getRules();
    var li = '<li style="color: #000000; margin-bottom: 5px; border: 0px;"><input type="radio" style="margin-right:3px;" name="rule" '; // fragment
    var lab =  '<label style="white-space: nowrap; border: 0px;" for="'; //
    var end_li = '</label></li>';
    var id = 'gs_radio_';

    // Always rule
    var always_id = id + '1';
    content += li + ' checked="checked"'; // initial state
    content += ' value="' + 1 + '" id="' + always_id + '"></input>';
    content += lab + always_id + '">' + rules[1] + end_li;

    // Business hours rule
    var biz_id = id + '2';
    content += li + ' value="' + 2 + '" id="' + biz_id + '"></input>';
    content += lab + biz_id + '">' + rules[2] + end_li;

    // Max amount of time rule
    var max_id = id + '3';
    content += li + ' value="' + 3 + '" id="' + max_id + '"></input>';
    content += lab + max_id + '">' + rules[3] + '</label>';
    content += ' &nbsp;<input type="text" style="width: 50px;" size="3" name="gs_max_time" id="gs_max_time" value=""/></li>';

    // Max visits rule
    var max_visits_id = id + '4';
    content += li + ' value="' + 4 + '" id="' + max_visits_id + '"></input>';
    content += lab + max_visits_id + '">' + rules[4] + '</label>';
    content += ' &nbsp;<input type="text" style="width: 50px;" size="3" name="gs_max_visits" id="gs_max_visits" value=""/></li>';

    content += "</table></form></fieldset>";

    content += '<table style="margin-left: 10px;" width="95%" border=0><tr>';
    content += 	'<td width="10%" style="text-align: left;"><a href="#" id="gs_delete_site">Delete</a></td>';
    content += '<td width="70%" align="center" style="margin-left: 50px; text-align: center;"><a href="http://graysky.org/grindstone/?utm_source=grindstone" target="_blank">About</a></td>';
    content += 	'<td style="text-align: right;"><a href="#" id="gs_save_settings">Save</a> &nbsp;&nbsp;&nbsp; <a href="#" id="gs_close_settings">Close</a></span></td></tr></table>';

    display_overlay(content, 500); // Create overlay

    // Need to wait for iframe to be ready before adding links
    wait(
	 function() { return iframeLoaded; },
	 function() {
	     // alert("gs_frame is: " + gs_frame());
	     add_link("gs_save_settings", function() { gs_save_settings(); });
	     add_link("gs_close_settings", function() { gs_close_settings(); });
	     add_link("gs_delete_site", function() { gs_delete_site(); });
	     // Listen to changes in the SELECT control
	     var sel = $$( "gs_site_list" );
	     if (sel == null || sel == undefined) {
		 // gs_debug("Display was not created");
		 return;
	     }
	     sel.addEventListener("change", function () { gs_select_change(); }, true);  	     
	 }
	 );
}

// Called selection change in the SELECT control
function gs_select_change() {

    var el = $$( "gs_site_list" );
    var selection = el.value;
    var url_text = $$('site_url');

    if (selection == "add_site") {
	// Special value for adding new site
	url_text.value = "";
    }
    else {
	// Load existing site values into form
	var site = db.getSite(selection);
	if (site == null) return;

	url_text.value = site.url;

	if (site.rule == -1) return;
	// Set the radio selection
	var radio = null;
	radio = $$('gs_radio_' + site.rule);
	if (radio != undefined) radio.checked = true;

	// Load stored values
	if (site.max_time > 0) {
	    $$('gs_max_time').value = site.max_time;
	}
	if (site.max_visits > 0) {
	    $$('gs_max_visits').value = site.max_visits;
	}
    }    
}

// Delete the current site
function gs_delete_site() {
    var url_text = $$('site_url');

    if (url_text == null || url_text.value == null || url_text.value == "") {
	alert("A site must be selected to delete.");
	return;
    }

    var url = url_text.value;
    var answer = confirm("Really delete rule for " + url + "?");
    
    if (answer) {
	db.deleteSite(url);
	url_text.value = "";
    }
    gs_settings();
}

// Close settings page
function gs_close_settings() {
    hide_overlay();
    check_site(true); // Check site again
}

// Save settings about sites to block
function gs_save_settings() {
    // Get the form values   
    var url_text = $$('site_url');

    if (url_text == null || url_text.value == null || url_text.value == "") {
	alert("A URL to block must be entered.");
	return;
    }
    var url = url_text.value;
    
    // Determine which rule was selected
    var radio_always = $$('gs_radio_1');
    var radio_biz_hours = $$('gs_radio_2');
    var radio_max_time = $$('gs_radio_3');
    var radio_num_visits = $$('gs_radio_4');

    var type = null; // which type is selected
    var max_time = "0";
    var max_visits = "0";
    
    if (radio_always.checked) {
	type = radio_always.value;
    }
    else if (radio_biz_hours.checked) {
	type = radio_biz_hours.value;
    }
    else if (radio_max_time.checked) {
	type = radio_max_time.value;
	max_time = $$('gs_max_time').value;
    }
    else if (radio_num_visits.checked) {
	type = radio_num_visits.value;
	max_visits = $$('gs_max_visits').value;
    }

    if (type == null) {
	alert("A type must be selected.");
	return;
    }

    var rule = type + "-" + max_time + "-" + max_visits;
    db.saveSite( new Site(url, rule));

    alert("Success! "+url+" won't distract you anymore.");
    gs_settings();
}

// The time at the last check of the site. Used to record
// how much time has been spent on the site.
var lastTime = null; 

// Check the current site to see if it should be blocked
// startTimer - if a timer should be started if the page matches
function check_site(startTimer) {
    if (typeof startTimer == "undefined") {
	startTimer = false;
    }

    var url = window.location.href;
    // Find the matching site for this URL
    var matchingSite = db.findMatchingSite(url);

    if (!matchingSite) return; // No matching site
    
    // Keep track how much time spent
    if (lastTime == null) {
	// Just loading the page now...
	lastTime = new Date().getTime();
    }
    else {
	// Update the amount spent on this site
	var now = new Date().getTime();
	matchingSite.incVisitTime(now - lastTime);
	lastTime = now;
    }

    // Start a timer, to check url later
    if (startTimer) timer.start();

    // Only block if site's rule says to block and the user doesn't have a temporary pass
    if (matchingSite.block(url) && !db.checkPass(matchingSite) ) {
	if (is_display_visible()) return; // Don't display the overlay again, already showing
	// gs_debug("Blocking this URL because of site: " + matchingSite.url + " rule: " + matchingSite.rule);
	block_site(url, matchingSite);
    }
}

// Get the text for the footer
function get_footer() {
    var s = '<span id="grindstone_footer"><a href="http://graysky.org/grindstone" target="_blank">Grindstone</a></span>';
    return s;
}

// Blocks the given url
function block_site(url, site) {
    // Pick a random message
    var msgs = ["Back to Work!", "Keep Grinding!", "No Rest For the Weary", "Don't Lose the Flow!", "Must Work Harder!", "There Be Distractions!", "Get Things Done!"];
    var i = Math.floor( msgs.length * Math.random());

    var c = '<h1>' + msgs[i] + '</h1> ';
    c += '<p><b>' + site.url + '</b> was blocked because you<br/> asked Grindstone to help you focus.';
    c += '<div style="position:relative; left: 120px; width: 250px; height: 80px; margin-bottom: 20px; margin-top: 25px;' +
	'border: 1px solid #11365A; background-color: #164677; padding-top: 25px;">'; // Blue theme

    c += '<a href="#" style="color: #FFFFFF; margin-left: 20px; background-color: #164677; text-align: center; font-size: 28pt;" id="gs_leave_now">Stay Focused!</a></div>';

    c += '<table width="95%" border="0" style="margin-top: 15px;"><tr style="border: 0px solid #000000;">';
    c += '<td width="30%" style="text-align: left;"><a href="#" id="gs_settings">Change Settings</a></td>';
    c += '<td style="text-align: right;"><a href="#" id="gs_allow_pass">Allow Through For</a> ';
    // Choices for how long to let them through
    c += '<select id="gs_how_long" style="width: 105px; margin-top: 0px; margin-bottom:0px; margin-left: 5px; margin-right: 0px; padding: 0px;">';
    c += '<option value="3">Quick Visit</option><option value="10">10 minutes</option><option value="30">30 minutes</option>';
    c += '<option value="60">1 hour</option><option value="240">4 hours</option><option value="1440">24 hours</option></select>';
    c += '</span></td></tr></table>';
    // Add footer
    // c += '<tr><td colspan="2" style="text-align:center;">' + get_footer() + '</td></table>';

    display_overlay(c, 400); // Create overlay

    // Need to wait for iframe to be ready before adding links
    wait(
	 function() { return iframeLoaded; },
	 function() {
	     // Attach listener for clicks
	     add_link("gs_allow_pass", function() { allow_pass(site); });
	     add_link("gs_settings", function() { gs_settings(); });
	     // Switch the underlying page
	     add_link("gs_leave_now", 
		      function(event) {
			  // Set a blank URL
			  window.location.href = "about:blank";
			  // Prevent the default click action
			  event.stopPropagation();
			  event.preventDefault();
		      });
	 }
    );
}

// Allow the user to use the site for a little while
function allow_pass(site) {

    // Get how long to let them through for
    var el = $$("gs_how_long");
    var length = parseInt(el.value);

    // Save this pass
    db.allowPass(site, length);

    // Hide the overlays
    hide_overlay();
}

// Hide the overlay if they exist
function hide_overlay() {
    var overlay = $$("grindstone_overlay");
    var overlay_back = $("grindstone_overlay_back");


    if (overlay != null && overlay_back != null) {
	overlay.style.visibility = "hidden";
	overlay_back.style.visibility = "hidden";
    }

    // Delete the iframe to prevent weirdness with 
    var frame = gs_frame();
    if (frame != null) {
	frame.parentNode.removeChild(frame);
	iframeLoaded = false;
    }
}

// Returns true if the overlay is visible, false otherwise
function is_display_visible() {
    var overlay = $$("grindstone_overlay");
    if (overlay != null && overlay.style.visibility == "visible") {
	return true;
    }
    return false;
}

// Display the overlay, creating it if needed or setting to be visible.
// Returns ref to the overlay
function display_overlay(content, height) {
    var overlay = $$("grindstone_overlay");
    var overlay_back = $("grindstone_overlay_back");

    if (overlay != null && overlay_back != null) {
	// Overlay already created
	overlay.style.visibility = "visible";
	overlay_back.style.visibility = "visible";
	// Push in new content
	overlay.innerHTML = content;
    }
    else {
	// Need to create the overlays

	// Background to shadow all content below
	var g = '#grindstone_overlay_back { position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; ' +
	    'background:#000000; opacity:.80; z-index:99999; }';

	addGlobalStyle(g, document);
	
	// Create div for overlay to block out background page
	overlay = document.createElement("div");
	overlay.innerHTML = "<div id='grindstone_overlay_back'></div>";
	
	// Insert at the doc root
	document.body.insertBefore(overlay, document.body.firstChild);

	// For div showing the content inside the iframe (multiline JS using E4X)
	var s = (<r><![CDATA[
        #grindstone_overlay { background: #FFFFFF; z-index: 100000; margin: 0px; padding: 0px; border: 2px solid #D4D4D4; width: 500px; }
	#grindstone_overlay h1 { font-family: arial; color: #1D5C9A; text-align: center; font-size: 28px; margin: 5px; }
	#grindstone_overlay p { font-family: arial; color: #000000; text-align: center; font-size: 14px; margin: 5px; }
	#grindstone_overlay a { color: #4682B4; text-decoration: underline; }
	#grindstone_overlay a:hover { background-color: #FFFFFF; color: #4682B4; cursor: pointer; text-decoration: underline; }
	#grindstone_overlay table, legend { margin: 5px; font-family: arial; color: #000000; font-size: 14px; }
	#grindstone_overlay tr { padding-bottom: 15px; margin-bottom: 10px; border: 1px solid #CDCDCD; }
	#grindstone_overlay td { padding-bottom: 3px; margin: 3px; text-align:left; }
	#grindstone_overlay ul { margin: 0px; padding-top: 5px; padding-left: 0px; }
	#grindstone_overlay li { margin: 2px; padding: 0px; font-family: arial; color: #000000; font-size: 14px; }
	#grindstone_example { font-size: 11px; color: #808080; padding-left: 2px; }
	#grindstone_footer { font-size: 10px; color: black; text-align: center; }
	#grindstone_overlay fieldset { border: 1px solid black; margin: 10px 10px 10px 10px; }
	#grindstone_overlay legend { padding: 3px 3px 3px 3px; }
	#gs_fieldset label { white-space: normal; display: inline; }
        ]]></r>).toString();

	// Create iframe to show content
	var css = 'position:absolute; z-index: 100000;' +
	    // Used passed in height for iframe
	    'width: 520px; left: 50%; padding: 0px;  margin-left: -250px; height: ' + height + 'px;' + // Center horizontally
	    'top: 50px; border: 0px solid red; text-align: center; ';

	var iframe = document.createElement('iframe');
	iframe.setAttribute('style', css);
	
	// The about:blank page becomes a blank canvas to modify
	iframe.src = 'about:blank';
	iframe.id = 'grindstone_frame';
	document.body.appendChild(iframe);
	
	// Make sure DOM is initialized before used.
	iframe.addEventListener("load", function() {
	    var doc = iframe.contentDocument;
	    addGlobalStyle(s, doc);
	    doc.body.innerHTML = "<div id='grindstone_overlay'>" + content + "</div>";
	    iframeLoaded = true; // iframe is ready
	}, false);
    }

    // Scroll to show the overlay
    try {
	window.scroll(0,0);
	//var elmUnderlyingOverlay = overlay.wrappedJSObject || overlay;
	// elmUnderlyingOverlay.scrollIntoView();
    } catch (error) {
	// May not be able to scroll the window
    }
}

// Add a click listener to an element with given id, calling given function.
// Example: add_link("gs_foo", function() { do_stuff(); })
function add_link(id, func) {
    // Attach listener for clicks
    var link = $$( id ); // get the item in the frame

    if (link != null) {
	link.addEventListener("click", func, true);
    }
}

// Adds stylesheet to the page
function addGlobalStyle(css, doc) {
    // Clean up the css string with some newlines
    var css2 = css.replace(/}/g, "}\n");
    var head, style;
    head = doc.getElementsByTagName('head')[0];
    if (!head) { alert("No head!"); return; }
    style = doc.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css2;
    head.appendChild(style);
}

// General utilities
// 

// Wrapped GM functions in case rolling GM -> FF extension 
// Register menu command
function registerMenuCommand(name, func ) {
    GM_registerMenuCommand( name, func );
}

// Print debugging info
function gs_debug(str) {
    GM_log(str);
}

// Get element from the document
function $(id) {
  return document.getElementById(id);
}

// Get the Grinstone frame
function gs_frame() {
    return $("grindstone_frame");
}

// Get element from the iframe
function $$(id) {
    var f = gs_frame();
    if (f == null) { return null; }
    return f.contentDocument.getElementById(id);
}

// Wait function, borrowed from:
// http://wiki.greasespot.net/Code_snippets#Waiting_for_something
// Waits for c to be true, then executes f
function wait(c,f){
   if (c()) f()
   else window.setTimeout(function (){wait(c,f)},300,false);
 }

// Construct new object based on passed-in object
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}
