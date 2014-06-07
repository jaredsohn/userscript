// ==UserScript==
// @name          Campfire Notifications
// @namespace     http://IamSeanMurphy.com
// @description   Control Growl and sound notification settings; allows you to set triggers.
// @author        Sean Murphy
// @homepage      http://IamSeanMurphy.com
// @include       *.campfirenow.com/room*
// ==/UserScript==

CampfireNotifications = function(window) { with(window) {
	
	issueNotifications = function(messages) {
		for(var i = 0; i < messages.length; i++) {
			if (chat.soundmanager.speaking) continue;
			
			if (this.settings.get('growl_when') === 'always') {
				growlNotification(messages[i]);
			} else if (this.settings.get('growl_when') === 'on_trigger' && matchesTrigger(messages[i], 'growl')) {
				growlNotification(messages[i]);
			}
			
			if (this.settings.get('sound_when') === 'always') {
				soundNotification(messages[i]);
			} else if (this.settings.get('sound_when') === 'on_trigger' && matchesTrigger(messages[i], 'sound')) {
				soundNotification(messages[i]);
			}
		}
	};
	
	growlNotification = function(message) {
		if (canGrowl() && message.kind == "text") {
			var bodyElement = message.bodyElement();
			var body = bodyElement.innerHTML.unescapeHTML();
			fluid.showGrowlNotification({
				title: document.title,
				description: "(" + message.author() + ") " + body,
				priority: 1,
				sticky: false,
				onclick: function() {
					bodyElement.visualEffect("highlight", { duration: 2 });
				}
			});
		}
	};
	
	soundNotification = function(message) {
		chat.soundmanager.playSound();
	};
	
	matchesTrigger = function(message, type) {
		var bodyElement = message.bodyElement();
		var body = bodyElement.innerHTML;
		var trigger = new String(this.settings.get(type+'_trigger')).strip();
		if (trigger.length) {
			if (contents = /^\/(.+)\/([a-z]*)$/i.exec(trigger)) {
				trigger = new RegExp(contents[1], contents[2]);
			} else {
				trigger = new RegExp("\\b" + trigger + "\\b", "i");
			}
			if (trigger.exec(body)) return true;
		}
		return false;
	};
	
	canGrowl = function() {
		return ((typeof(fluid) !== 'undefined') ? true:false);
	};

	insertConfigForm = function() {
		if ($('campfire_notifications_div')) {
			$('campfire_notifications_div').remove();
		}
		
		new Insertion.After('participants', "\
			<div id=\"cn_config_div\">\
			<h3>Campfire Notifications <span>(<a href=\"#\" id=\"toggle_cn_options\" title=\"Toggle Options\">-</a>)</span></h3>\
			<form id=\"cn_form\" style=\"font-size: 10px\">\
				<input type=\"hidden\" name=\"show_options\" id=\"show_options\" value=\"true\" />\
				<fieldset>\
					<legend>Growl</legend>\
					<div>\
						<input type=\"radio\" name=\"growl_when\" id=\"growl_when_always\" value=\"always\" /> Always\
						<input type=\"radio\" name=\"growl_when\" id=\"growl_when_never\" value=\"never\" /> Never\
					</div>\
					<div>\
						<input type=\"radio\" name=\"growl_when\" id=\"growl_when_on_trigger\" value=\"on_trigger\" /> Only on trigger\
						<input type=\"text\" name=\"growl_trigger\" id=\"growl_trigger\" />\
					</div>\
				</fieldset>\
				<fieldset>\
					<legend>Play Sound</legend>\
					<div>\
						<input type=\"radio\" name=\"sound_when\" id=\"sound_when_always\" value=\"always\" /> Always\
						<input type=\"radio\" name=\"sound_when\" id=\"sound_when_never\" value=\"never\" /> Never\
					</div>\
					<div>\
						<input type=\"radio\" name=\"sound_when\" id=\"sound_when_on_trigger\" value=\"on_trigger\" /> Only on trigger\
						<input type=\"text\" name=\"sound_trigger\" id=\"sound_trigger\" />\
					</div>\
				</fieldset>\
			</form>\
			</div>\
		");
		
		$('toggle_cn_options').observe('click', function(e) {
			$('cn_form').toggle();
			$('toggle_cn_options').innerHTML = ($('cn_form').visible()) ? '-':'+';
			$('show_options').value = $('cn_form').visible();
			saveSettings();
			Event.stop(e);
		});
		
		var elms = $$('#cn_form input');
		for(var i = 0; i < elms.length; i++) {
			elms[i].observe('change', function(e) { saveSettings(); });
		}
	};
	
	loadSettings = function() {
		saved_settings = eval("$H("+cookie('campfire_notification_settings_'+this.room_id)+");");
		this.settings = this.settings.merge(saved_settings);
		
		if (this.settings.get('show_options') == 'false') {
			$('cn_form').hide();
			$('toggle_cn_options').innerHTML = '+';
		}
		$('show_options').value = this.settings.get('show_options');
		$('growl_when_'+this.settings.get('growl_when')).checked = true;
		$('growl_trigger').value = this.settings.get('growl_trigger');
		$('sound_when_'+this.settings.get('sound_when')).checked = true;
		$('sound_trigger').value = this.settings.get('sound_trigger');
	};
	
	saveSettings = function() {
		this.settings = this.settings.merge($H(Form.serialize('cn_form', true)));
		cookie('campfire_notification_settings_'+this.room_id, this.settings.toJSON(), {path: '/', expires: 365});
	};
	
	cookie = function(name, value, options) {
	    if (typeof value != 'undefined') { // name and value given, set cookie
	        options = options || {};
	        if (value === null) {
	            value = '';
	            options.expires = -1;
	        }
	        var expires = '';
	        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
	            var date;
	            if (typeof options.expires == 'number') {
	                date = new Date();
	                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
	            } else {
	                date = options.expires;
	            }
	            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
	        }
	        var path = options.path ? '; path=' + (options.path) : '';
	        var domain = options.domain ? '; domain=' + (options.domain) : '';
	        var secure = options.secure ? '; secure' : '';
	        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
	    } else { // only name given, get cookie
	        var cookieValue = null;
	        if (document.cookie && document.cookie != '') {
	            var cookies = document.cookie.split(';');
	            for (var i = 0; i < cookies.length; i++) {
	                var cookie = new String(cookies[i]).strip();
	                // Does this cookie string begin with the name we want?
	                if (cookie.substring(0, name.length + 1) == (name + '=')) {
	                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
	                    break;
	                }
	            }
	        }
	        return cookieValue;
	    }
	};
  	
	// Initialization
	var matches = chat.speakURL.match(/room\/([^\/]+)/);
	this.room = $('room_name').innerHTML;
	this.room_id = matches[1];
	
	// Default settings
	this.settings = $H({
		show_options: true,
		growl_when: 'on_trigger',
		growl_trigger: chat.username,
		sound_when: 'on_trigger',
		sound_trigger: chat.username
	});
	
	insertConfigForm();
	loadSettings();
	saveSettings();

	// Hook into the onMessagesInserted function by copying it to another method and overriding the original.
	Campfire.Transcript.prototype.insertMessages_original = Campfire.Transcript.prototype.insertMessages;

	Campfire.Transcript.prototype.insertMessages = function() {
		messages = this.insertMessages_original.apply(this, arguments);
		issueNotifications(messages);
		return messages;
	}
	
} }((typeof(unsafeWindow) != 'undefined') ? unsafeWindow:window);