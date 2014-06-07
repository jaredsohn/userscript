// ==UserScript==
// @name          Odd Alice Fluid Campfire Extender
// @namespace     http://oddalice.com/
// @description   Colors the background of each message in a unique colors and if your name is mentioned in a message, and gives you setting to show Growl notifications. Based on "Growl Notifications with messages for campfire and fluid" by Tim Harpers (http://userscripts.org/scripts/show/22891).
// @author        David M&aring;rtensson
// @homepage      http://oddalice.com/
// @include       *.campfirenow.com/room*
// @version       0.9.6
// ==/UserScript==

/*
	Release list
	
	0.9.6
		- Removed red colors on guest access on/off and lock on/off messages
	0.9.5
		- Changed all border colors in between messages cells to white
	0.9.4
		- Removes forced red text on regexp mentions.
	0.9.3
		- Removes participants set height value
		- Moves Growl settings from inside participants HTML to after it
		- Added white background to timestamp messages
		- Re-checks color assignment on participants every 2.5s and re-assigns if new users logs in
		- Add links at participant list to Update colors
	0.9.2
		- Stores selected colors in cookies so it looks the same on each reload.
	0.9.1
		- N/A
	0.9
		- N/A (First dev-version built on Tims 0.2 version)
*/

// Has Campfire
try { if ( typeof(Campfire) != "undefined" ) {
	
	
	// Add some functions into Campfire
	
	/**
	 * Timer: Check if there are new/changed participants
	 */
	Campfire.timerCheckParticipants = function() {
		var test = document.getElementById('participant_list_user_colors');
		if (!test) {
			this.setupUserColors();
		}
		_t = setTimeout("Campfire.timerCheckParticipants();", 2500);
	}
	
	/**
	 * Clear/Update colors (3 step cannon with timeout between because of cookie lag, not 100% sure it's actually needed but...)
	 */
	Campfire.clearAndUpdateColors = function() {
		// Reset cookies
		this.setCookie("user_colors_"+ room_id, "", 14);
		this.setCookie("colors_"+ room_id, "", 14);
		// Reset arrays
		for (var i=0,end=_colors_set.length; i<end; i++) {
			_colors_set[i] = false;
		}
		this.background_colors = new Array;
		this.background_color_id = new Array;
		setTimeout("Campfire._clearAndUpdateColors();", 50);
	}
	Campfire._clearAndUpdateColors = function() {
		$('participant_list_user_colors').remove();
		this.createColors();
		this.setupUserColors();
		setTimeout("Campfire.__clearAndUpdateColors();", 50);
	}
	Campfire.__clearAndUpdateColors = function() {
		this.paintMessages();
	}
	
	/**
	 * Create colors
	 */
	Campfire.createColors = function() {
		// Get from cookie?
		var cookie_colors = this.getCookie("colors_" + room_id);
		// - Yes
		if (cookie_colors) {
			this.background_colors = JSON.parse(cookie_colors);
			for (var i=0,end=_colors_set.length; i<end; i++) {
				_colors_set[i] = true;
			}
		}
		// - No, set by random
		else {	
			var counter = 0;
			var found_counter = 0;
			var all_set = false;
			while (!all_set) {
				var index = parseInt(Math.random()*8);
				if (_colors_set[index] === false) {
					this.background_colors[this.background_colors.length] = _colors[index];
					_colors_set[index] = true;
					found_counter++;
				}
				if (counter == 1000 || this.background_colors.length == _colors.length) {
					all_set = true;
				}
				counter++;
			}	
			if (this.background_colors.length !== _colors.length) {
				for (var i=0, end=_colors.length; i<end; i++) {
					if (_colors_set[i] === false) {
						this.background_colors[this.background_colors.length] = _colors[index];
						_colors_set[i] = true;
					}
				}
			}
		}
		
		// (Re-)Store colors in cookie
		this.setCookie("colors_" + room_id, JSON.stringify(this.background_colors), 14);
	}
	
	/**
	 * Set user colors
	 */
	Campfire.setupUserColors = function() {
		// Get all participants and assign a color
		// - By cookie
		var cookie_user_colors = this.getCookie("user_colors_"+ room_id);
		if (cookie_user_colors) {
			Campfire.background_color_id = JSON.parse(cookie_user_colors);
		}
		// - Assign
		var participants = document.getElementById('participant_list-'+ room_id).getElementsByTagName('li');
		for (var i=0,end=participants.length; i<end; i++) {
			var user_id = parseInt(participants[i].id.replace(/user_/, ""));
			var color = this.getColor(user_id);
			var user_color_div = document.getElementById('user_color_'+ user_id);
			if (user_color_div) {
				$(user_color_div).remove();
			}
			new Insertion.Top(participants[i], '<div id="user_color_'+ user_id +'" style="width: 10px; height: 10px; background-color: '+ color +'; border: 1px solid #999; display: inline-block; margin-right: 5px;"></div>');
		}
		// - (Re-)Store cookie
		this.setCookie("user_colors_"+ room_id, JSON.stringify(Campfire.background_color_id), 14);
		// - Insert hidden <li> in the list, which is looked for by the participant timer to see if we need to re-setup
		new Insertion.Top('participant_list-'+ room_id, '<li id="participant_list_user_colors" style="display: none;"></li>');
	}
	
	/**
	 * Gets the color
	 */
	Campfire.getColor = function(id) {
		var found_index = false;
		for (var i=0, end=this.background_color_id.length; i<end; i++) {
			if (this.background_color_id[i] == id) {
				found_index = i;
				break;
			}
		}
		if (found_index === false) {
			found_index = this.background_color_id.length;
			this.background_color_id[found_index] = id; 
		}
		return this.background_colors[found_index];
	}
	
	/**
	 * Get user id from container class string
	 * @param string str_class
	 * @return int
	 */
	Campfire.getUserIdFromContainerClass = function(str_class) {
		var temp = str_class.split("user_");
		if (temp.length > 1) {
			var user_id = parseInt(temp[1]);
		}
		else if (str_class.match(/you/)) {
			var user_id = parseInt(Campfire.my_user_id);
		}		
		else {
			var user_id = 0;
		}
		return user_id;
	}
  
  	/**
  	 * Set cookie
  	 * @author Tim Harper
  	 */
	Campfire.setCookie = function(name, value, days) { 
		var expire_str = days ? ";expires="+(new Date(new Date().getTime() + days*24*60*60*1000)).toGMTString() : "";
		document.cookie = (name + "=" + escape(value)) + (expire_str); 
	}
	
	/**
	 * Get cookie
	 * @author Tim Harper
	 */
	Campfire.getCookie = function(name) {
		return $A(document.cookie.split(";")).map(function(c) {
			var parts = c.split("=");
			if (parts[0].toString().strip()==name) {
				return unescape(parts[1]);
			}
			else {
				return undefined;
			}
		}).compact().first();
	}  
	
	/**
	 * Paint available messages
	 */
	Campfire.paintMessages = function() {
		// Get all old messages and assign colors to them
		var history = document.getElementById('chat').getElementsByTagName('tr');
		for (var i=0, end=history.length; i<end; i++) {
			var user_id = this.getUserIdFromContainerClass(history[i].className);
			if (user_id) {
				color = this.getColor(user_id);
				history[i].style.backgroundColor = color;
			}
			else {
				history[i].style.backgroundColor = "#ffffff";
			}
		}
	}
	
	
	
	// Setup the stuff and the things
	
	
	// Setup Growl parts
	var growler;
	Campfire.window_is_focused = true;
	Event.observe(window, 'blur', function() { Campfire.window_is_focused = false; });
	Event.observe(window, 'focus', function() { Campfire.window_is_focused = true; });
	
	// Hide unwanted style
	var headElements = document.getElementsByTagName('head');
	var headElement = headElements[0];
	new Insertion.Bottom(headElement, "\
		<style type=\"text/css\">\
		table.chat td {\
			border-bottom: 1px solid #ffffff;\
			border-left: 1px solid #ffffff;\
		}\
		table.chat tr.timestamp_message td.time {\
			border-left: 1px solid #ffffff;\
		}\
		table.chat tr.leave_message td, table.chat tr.enter_message td, table.chat tr.idle_message td, table.chat tr.kick_message td, table.chat tr.unidle_message td, table.chat tr.lock_message td, table.chat tr.unlock_message td, table.chat tr.name_change_message td, table.chat tr.topic_change_message td, table.chat tr.allow_guests_message td, table.chat tr.disallow_guests_message td, table.chat tr.conference_created_message td, table.chat tr.conference_finished_message td, table.chat tr.system_message {\
			border-left: 1px solid #ffffff;\
		}\
		table.chat tr.lock_message td, table.chat tr.unlock_message td, table.chat tr.allow_guests_message td, table.chat tr.disallow_guests_message td {\
			background-color: transparent;\
		}\
		table.chat td.person {\
			background-color: transparent;\
		}\
		table.chat tr.you td {\
			background-color: transparent;\
		}\
		table.chat tr.leave_message td,\
		table.chat tr.enter_message td,\
		table.chat tr.kick_message td {\
			background-color: transparent;\
		}\
		ul.participant-list {\
			height: auto;\
		}\
		</style>\
	");
	
	
	// Add clear/update color link
	new Insertion.Before('locking_control', '<span id="clear_update_colors_control"><a href="javascript:Campfire.clearAndUpdateColors();">Update colors</a></span> | ');
	
	
	// Get room_id (temporary here, Campfire.FluidGrowler does this itself later)
	var temp = window.chat.participantList;
	var room_id;
	temp = temp.split("participant_list-");
	if (temp.length > 1) {
		room_id = parseInt(temp[1]);
	}
	
	// Store current user id
	Campfire.my_user_id = window.chat.userID;
	
	// Will store the background colors
	Campfire.background_colors = new Array;
	// Connects user to color
	Campfire.background_color_id = new Array;
	
	// Get available colors and set them randomly into Campfire.background_colors
	var _colors = new Array;
	_colors[0] = "#ffffcc";
	_colors[1] = "#ecf2d4";
	_colors[2] = "#deeadb";
	_colors[3] = "#ddece7";
	_colors[4] = "#d8e3e8";
	_colors[5] = "#d8dae8";
	_colors[6] = "#e2d9ea";
	_colors[7] = "#e7d3e3";
	_colors[8] = "#ecd9da";
	_colors[9] = "#ecc9c9";
	var _colors_set = new Array;
	_colors_set[0] = false;
	_colors_set[1] = false;
	_colors_set[2] = false;
	_colors_set[3] = false;
	_colors_set[4] = false;
	_colors_set[5] = false;
	_colors_set[6] = false;
	_colors_set[7] = false;
	_colors_set[8] = false;
	_colors_set[9] = false;
	
	
	// Create colors
	Campfire.createColors();
	
	// Set user colors
	Campfire.setupUserColors();

	
	// Remove history style
	var history_style = document.getElementById('chat').getElementsByTagName('style');
	for (var i=0,end=history_style.length; i<end; i++) {
		history_style[i].innerHTML = "";
	}
	
	
	// Get all old messages and assign colors to them
	Campfire.paintMessages();
	
	
	// Start participants timer
	var _t = setTimeout("Campfire.timerCheckParticipants();", 2500);
	
  
	// Remove 37 signals growl implementation to prevent double-growl
	if (Campfire.Responders.indexOf("GrowlNotifier")) {
		window.chat.listeners.splice(10,1);
		Campfire.Responders.splice(10,1);
	}
	

	/**
	 * Campfire FluidGrowler class
	 * @author Tim Harper (additions by David M&aring;rtensson)
	 */
	Campfire.FluidGrowler = Class.create({
	
		/**
		 * Init
		 */
		initialize: function(chat) {
			this.chat = chat;
			this.pattern = new RegExp("^" + RegExp.escape(this.chat.username));
			this.room = $('room_name').innerHTML;
			this.room_id = this.room.toLowerCase().gsub(/[^a-z0-9]/, "");
			this.showConfigForm();
			this.loadRoomSettings();
			this.populateSettings();
			this.saveRoomSettings(); // Keep the cookie alive
		},

		/**
		 * When a message is posted
		 */
		onMessagesInserted: function(messages) {
			// Loop through messages
			for (var i = 0; i < messages.length; i++) {
				// Get message, msg body element (<div>) and msg container element (<tr> row)
				var message = messages[i];
				var bodyElement = message.bodyElement();
				var containerElement = document.getElementById(message.element.id);
				// Check which user it is, or if its "you" by checking the message element class
				var user_id = Campfire.getUserIdFromContainerClass(message.element.className);
				// Found user, colorize it
				if (user_id) {
					color = Campfire.getColor(user_id);
					containerElement.style.backgroundColor = color;
				}
				else {
					containerElement.style.backgroundColor = "#ffffff";
				}
				// If it's a text message
				if (message.kind == "text") {
					// Get body and see if we should do a Growl notification
					var body = bodyElement.innerHTML.unescapeHTML();
					if (this.shouldGrowl(body)) {
						// Get body element
						var bodyElement = message.bodyElement();
						// Colorize message (always)
						//bodyElement.style.color = 'red';
						// Send Growl notification if window isn't in focus
						if (!Campfire.window_is_focused) {
							window.fluid.showGrowlNotification({
								title: document.title,
								description: "(" + message.author() + ") " + body,
								priority: 1,
								sticky: this.shouldStick(body),
								onclick: function() {
									bodyElement.visualEffect("highlight", { duration: 2 });
								}
							});
						}
					}			
				}	
			}
	    },
    
    	/**
		 * See when a Growl message should be triggerd. Called when the setting "Only on regex" is used.
		 * @return bool Returns true/false if the regexp matches the message
		 */
    	matchesTrigger: function(message) {
			var trigger = this.room_settings.get("trigger").strip();
			if (trigger.empty()) {
				return false;
			}
			var matcher = new RegExp("\\b" + trigger + "\\b", "i");
			if (matcher.exec(message)) {
				return true;
			}
			return false;
	    },
    	
    	/**
    	 * Should Growl message stick?
    	 * @return bool Return false if Growl always should be displayed, else true/false if the message matches the trigger
    	 */
    	shouldStick: function(message) {
			if(this.room_settings.get("growl_when") == "always") {
				return false;
			}
			else {
				return (this.matchesTrigger(message));
			}
    	},
    
    	/**
    	 * Should a Growl message be displayed
    	 * @return bool Returns true/false depending on setting + regexp trigger
    	 */
		shouldGrowl: function(message) {
			switch(this.room_settings.get("growl_when")) {
				case "always":
        		case "always_with_stick":
					return true;
				break;
				default:
					return (this.matchesTrigger(message));
				break;
			};
    	},
    	
    	/**
    	 * Show configuration form
    	 */
		showConfigForm: function() {
			// Remove div if it already exists
			if ($('growl_config_div')) {
				$('growl_config_div').remove();
			}
			// Insert html
			new Insertion.Before('guest_access', "\
				<div id='growl_config_div'>\
					<h3>Growl</h3>\
					<div id='debug'></div>\
					<form id='growl_form' style='font-size: 10px'>\
					<div><input type='radio' name='growl_when' id='growl_always' value='always' /> Always</div>\
					<div><input type='radio' name='growl_when' id='growl_always_with_stick' value='always_with_stick' /> Always, but stick on keyword match</div>\
					<div><input type='radio' name='growl_when' id='growl_only_on_regex' value='only_on_regex' /> Only on keyword match</div>\
					<div id='growl_trigger_div'>Keyword: /\\b<input type='text' name='trigger' id='growl_trigger'/>\\b/i</div>\
					</form>\
				</div>\
			");
			var that = this;
     		// Add event observer to each setting change that extracts and saves settings and show/hides regexp
			$w("growl_always growl_always_with_stick growl_only_on_regex growl_trigger").each( function(e_id) {
				Event.observe(e_id, 'change', function(e) {
					this.extractSettings();
					this.setGrowlTriggerVisibility();
				}.bindAsEventListener(that));
			});
	    },
    	
    	/**
    	 * Populate settings, called on init.
    	 */
	    populateSettings: function() {
			var growl_when = this.room_settings.get("growl_when");
			var radio = $("growl_" + growl_when);
			if(radio) {
				radio.checked = true;
			}
			$('growl_trigger').value = this.room_settings.get("trigger");
			this.setGrowlTriggerVisibility();
    	},
    	
    	/**
    	 * Extract and save settings
    	 */
	    extractSettings: function() {
			this.room_settings = $H(Form.serialize('growl_form', true));
			this.saveRoomSettings();
	    },
    
    	/**
    	 * Show/hide Growl trigger (regexp) form
    	 */
	    setGrowlTriggerVisibility: function() {
			$("growl_trigger_div").style.display = (this.room_settings.get("growl_when") == "always") ? "none" : "";
	    },
    
    	/**
    	 * Save room settings to cookie
    	 */
	    saveRoomSettings: function() {
			Campfire.setCookie("growl_settings_" + this.room_id, JSON.stringify(this.room_settings), 14);
	    },
    
    	/**
    	 * Load room settings from cookie amd store it to "this.room_settings"
    	 */
	    loadRoomSettings: function() {
			var serialized_settings = Campfire.getCookie("growl_settings_" + this.room_id);
			if (serialized_settings) {
				try {
					this.room_settings = $H(JSON.parse(serialized_settings));
				} catch(e) {
					alert("Error parsing settings. Using defaults");
					this.room_settings = undefined;
				};
			}
			if(!this.room_settings)
				this.room_settings = $H({
					growl_when: 'always',
					trigger: window.chat.username
				});
			}
	
	  	}
	);
  
  	// Finalize FluidGrowler 
	Campfire.Responders.push("FluidGrowler");
	window.fluid_growler = new Campfire.FluidGrowler(window.chat);
	window.chat.listeners.push(fluid_growler);
  
  
// Catch error
} } catch(e) { 
	if(console) {
		console.log(e); 
	}
	new Insertion.After('participants', e); 
}