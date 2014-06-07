/// ==UserScript==
// @name        Signalfire Growl Notification
// @namespace   http://fluidapp.com
// @description Adds a Growl Notification panel to Signalfire. Will display a notification for new messages, when the window is in the background.
// @include     https://signalfire.com/rooms/*
// @include     https://*.signalfire.com/rooms/*
// @author      Christian Maloney <cmaloney@newleaders.com>
// ==/UserScript==

Object.extend(String.prototype, {
    stripHTML: function() { return(this.replace(/<[^>]+>/g, '').gsub("&gt;", ">").gsub("&lt;", "<").gsub("&amp;", "&")); }
  });

function getCookie(name) {
    return $A(document.cookie.split(";")).map(function(c) {
      parts = c.split("=")
      if (parts[0].toString().strip()==name) 
      {
        return unescape(parts[1]);
      }
    }).compact().first();
  }

function setCookie(name, value, days) { 
    expire_str = days ? ";expires="+(new Date(new Date().getTime() + days*24*60*60*1000)).toGMTString() : ""
    document.cookie = (name + "=" + escape(value)) + (expire_str); 
  }

SFgrowl = {
  mostRecentlyViewedMessage: null,
  inBackground: false,
	room_id: "",
	room_settings: null,
  
  intoBackground: function() {
    window.console.log("Growl Notification activated");
    SFgrowl.inBackground = true;
    SFgrowl.mostRecentlyViewedMessage = SFgrowl.messages()[0];
    SFgrowl.checkMessages();
  },

  intoForeground: function() {
    SFgrowl.inBackground = false;
    window.console.log("Growl Notification deactivated");
  },
  
  messages: function() {
    return $$("#messages tr td p");
  },

	shouldSend: function(message){
		if (SFgrowl.room_settings.get("growl_when") == "always") return true;
		var trig = SFgrowl.room_settings.get("trigger").strip().gsub(' ','').gsub(/,$/,'').gsub(',','|');
		var searchPatt = new RegExp("\\b"+trig+"\\b","i");
		if (searchPatt.test(message)) return true;
		return false;
	},
  
  checkMessages: function() {
    var allMessages = SFgrowl.messages();
    var indexOfLast = allMessages.indexOf(SFgrowl.mostRecentlyViewedMessage);
		SFgrowl.mostRecentlyViewedMessage = allMessages[0];
    if (indexOfLast > 0) {
			for (var i = 0; i < indexOfLast; i++) {
				var message = allMessages[i].innerHTML;
				if (SFgrowl.shouldSend(message)) {
					//get author
					var text = allMessages[i].parentNode.parentNode.childNodes[1].innerHTML;
					var author = text.substring(text.indexOf("<strong>")+8, text.indexOf("</strong>"));
					//shorten message
					if (message.length > 300) message = message.substr(0,300)+"\n...";
					//Notify
					window.fluid.showGrowlNotification({
					    title: author, 
					    description: message.stripHTML(),
					    icon: "http://signalfire.com/images/v1/logo.gif"
					});
				}
			}
		}
    if (SFgrowl.inBackground) { 
      setTimeout(SFgrowl.checkMessages, 2000);
    }
  },

	showConfigForm: function() {
	      if ($('growl_config_div')) $('growl_config_div').remove();
				var divTag = document.createElement("div");
				divTag.id = "growl_config_div";
				divTag.className ="box";
				divTag.innerHTML = "\
				<h3>Growl Notification</h3>\
	      <form id='growl_form' style='font-size: 10px;padding:5px 0 0 5px;'>\
	        <div><input type='radio' name='growl_when' id='growl_when_always' value='always' />Everything</div>\
	        <div><input type='radio' name='growl_when' id='growl_when_on_name' value='on_name' />Only on <input type='text' name='trigger' id='growl_trigger' size='25' style='padding:2px 5px;border-radius:10px;border:1px inset;font-size:1em;font-weight:normal;'/></div>\
	      	<p style='margin:0 0 0 8px;'>to match multiple words seperate with a comma: str1, str2, str3</p>\
				</form>";
				document.getElementById('sidebar').appendChild(divTag);

	    },
	
	loadRoomSettings: function() {
	      if (serialized_settings = getCookie("growl_settings_" + SFgrowl.room_id))
	        eval("SFgrowl.room_settings = $H(" + serialized_settings + ");");
	      else
	        SFgrowl.room_settings = $H({
	          growl_when: 'always',
	          trigger: 'YOURNAME'
	        });
	    },
	
	populateSettings: function() {
	      if (SFgrowl.room_settings.get("growl_when") == "always")
	        $('growl_when_always').checked = true
	      else
	        $('growl_when_on_name').checked = true
	      $('growl_trigger').value = SFgrowl.room_settings.get("trigger");
	    },
	
	saveRoomSettings: function() {
	      setCookie("growl_settings_" + SFgrowl.room_id, SFgrowl.room_settings.toJSON(), 14);
	    },
	
	extractSettings: function() {
	      SFgrowl.room_settings = $H(Form.serialize('growl_form', true));
	      SFgrowl.saveRoomSettings();
	    }

}

if (window.fluid) {
		//get room id
		var id = $('header').innerHTML;
		SFgrowl.room_id = id.substring(id.indexOf("<h1")+15, id.indexOf("</h1>")).stripHTML().toLowerCase().gsub(/[^a-z0-9]/, "");
		
		SFgrowl.showConfigForm();
		SFgrowl.loadRoomSettings();
		SFgrowl.populateSettings();
		SFgrowl.saveRoomSettings();
	
    Event.observe(window, 'blur', function() { SFgrowl.intoBackground(); });
    Event.observe(window, 'focus', function() { SFgrowl.intoForeground(); });

		 $w("growl_when_always growl_when_on_name growl_trigger").each( function(e_id) {
        Event.observe(e_id, 'change', function(e) { SFgrowl.extractSettings() });
      });

    window.console.log("Growl Notification active.");
		
		
    
}