// ==UserScript==
// @name          Growl Notifications with messages for campfire and fluid
// @namespace     http://tim.theenchanter.com/
// @description   If your name is mentioned in a message, a growl notification shows what was said.
// @author        Tim Harper
// @homepage      http://tim.theenchanter.com/
// @include       *.campfirenow.com/room*
// @version       0.2
// ==/UserScript==

try { if ( typeof(Campfire) != "undefined" ) {
  var growler;
  
  Campfire.window_is_focused = true;
  Event.observe(window, 'blur', function() { Campfire.window_is_focused = false; });
  Event.observe(window, 'focus', function() { Campfire.window_is_focused = true; });
  
  function setCookie(name, value, days) { 
    var expire_str = days ? ";expires="+(new Date(new Date().getTime() + days*24*60*60*1000)).toGMTString() : "";
    document.cookie = (name + "=" + escape(value)) + (expire_str); 
  }
  function getCookie(name) {
    return $A(document.cookie.split(";")).map(function(c) {
      var parts = c.split("=");
      if (parts[0].toString().strip()==name) 
        return unescape(parts[1]);
      else
        return undefined;
    }).compact().first();
  }  function getCookie(name) {
    return $A(document.cookie.split(";")).map(function(c) {
      var parts = c.split("=");
      if (parts[0].toString().strip()==name) 
        return unescape(parts[1]);
      else
        return undefined;
    }).compact().first();
  }
  
  // remove 37 signals growl implementation to prevent double-growl
  if(Campfire.Responders.indexOf("GrowlNotifier")) {
    window.chat.listeners.splice(10,1);
    Campfire.Responders.splice(10,1);
  }

  Campfire.FluidGrowler = Class.create({
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

    onMessagesInserted: function(messages) {
      if(Campfire.window_is_focused) return;
      for (var i = 0; i < messages.length; i++) {
        var message = messages[i];
        if (message.kind == "text") {
          var bodyElement = message.bodyElement();
          var body = bodyElement.innerHTML.unescapeHTML();

          if (this.shouldGrowl(body)) {
            var bodyElement = message.bodyElement();
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
    },
    matchesTrigger: function(message) {
      var trigger = this.room_settings.get("trigger").strip();
      if (trigger.empty()) return false;
      var matcher = new RegExp("\\b" + trigger + "\\b", "i");
      if (matcher.exec(message)) return true;
      return false;
    },
    shouldStick: function(message) {
      if(this.room_settings.get("growl_when") == "always")
        return false;
      else
        return (this.matchesTrigger(message));
    },
    shouldGrowl: function(message) {
      switch(this.room_settings.get("growl_when")) {
        case "always":
        case "always_with_stick":
        return true;

        default:
        return (this.matchesTrigger(message));
      };
    },
    showConfigForm: function() {
      if ($('growl_config_div')) $('growl_config_div').remove();
      new Insertion.After('participants', "\
      <div id='growl_config_div'>\
      <h3>Growl:</h3>\
      <div id='debug'></div>\
      <form id='growl_form' style='font-size: 10px'>\
        <div><input type='radio' name='growl_when' id='growl_always' value='always' /> Always</div>\
        <div><input type='radio' name='growl_when' id='growl_always_with_stick' value='always_with_stick' /> Always, but stick on regex</div>\
        <div><input type='radio' name='growl_when' id='growl_only_on_regex' value='only_on_regex' /> Only on regex</div>\
        <div id='growl_trigger_div'>Regex: /\\b<input type='text' name='trigger' id='growl_trigger'/>\\b/i</div>\
      </form>\
      </div>\
      ");
      var that = this;
      
      $w("growl_always growl_always_with_stick growl_only_on_regex growl_trigger").each( function(e_id) {
        Event.observe(e_id, 'change', function(e) {
          this.extractSettings();
          this.setGrowlTriggerVisibility();
        }.bindAsEventListener(that));
      });
    },
    populateSettings: function() {
      var growl_when = this.room_settings.get("growl_when");
      var radio = $("growl_" + growl_when);
      if(radio) radio.checked = true;
      $('growl_trigger').value = this.room_settings.get("trigger");
      this.setGrowlTriggerVisibility();
    },
    extractSettings: function() {
      this.room_settings = $H(Form.serialize('growl_form', true));
      this.saveRoomSettings();
    },
    setGrowlTriggerVisibility: function() {
      $("growl_trigger_div").style.display = (this.room_settings.get("growl_when") == "always") ? "none" : "";
    },
    saveRoomSettings: function() {
      setCookie("growl_settings_" + this.room_id, JSON.stringify(this.room_settings), 14);
    },
    loadRoomSettings: function() {
      var serialized_settings = getCookie("growl_settings_" + this.room_id);
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
  });
  
  Campfire.Responders.push("FluidGrowler");
  window.fluid_growler = new Campfire.FluidGrowler(window.chat);
  window.chat.listeners.push(fluid_growler );
} } catch(e) { if(console) console.log(e); new Insertion.After('participants', e); }
