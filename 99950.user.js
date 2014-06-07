// ==UserScript==
// @name          Campfire Audio Notification
// @namespace     http://johnpwood.net
// @description   Play a sound when a message is received from a specific user or when it contains a specific word.
// @author        John Wood
// @homepage      http://johnpwood.net
// @include       *.campfirenow.com/room*
// ==/UserScript==

try { if ( typeof(Campfire) != "undefined" ) {
  // hook into the onMessagesInserted function
  if (typeof( Campfire.Transcript.prototype.insertMessages_without_hook ) == "undefined" ) {
    Campfire.Transcript.prototype.insertMessages_without_hook_audio = Campfire.Transcript.prototype.insertMessages;
  }

  Campfire.Transcript.prototype.insertMessages = function() {
    try {
      messages = this.insertMessages_without_hook_audio.apply(this, arguments);
      messages.each(function(message) {
        if (message) notifyMessage(message);
      });
    
      return messages;
    } catch(e) { notifyError(e); }
  }
  
  function notifyError(e) {
    new Insertion.Bottom('chat', "<tr><td colspan='2' style='color: red'>A Javascript Error Occurred in the campfire grease monkey script: " + e + "</td></tr>");
  }
  
  function notifyMessage(message) {
    try {
      message_dom_id = "message_" + message.id();
      if ($(message_dom_id)) {
        what_node = $$("#" + message_dom_id + " .body div").first();
        name_node = $$("#" + message_dom_id + " .person span").first();
      
        if (what_node && name_node) {
          what = what_node.innerHTML;
          name = name_node.innerHTML;
          audioPlayer.playAudio(name, what);
        }
      }
    } catch(e) { notifyError(e) }
  }
  
  AudioPlayer = Class.create();
  AudioPlayer.prototype = {
    initialize: function() {
      this.showConfigForm();
      this.loadRoomSettings();
      this.populateSettings();
      this.saveRoomSettings(); // Keep the cookie alive
    },
    matchesTrigger: function(text, matcher) {
      if (matcher.empty()) return false;
      if (contents = /^\/(.+)\/([a-z]*)$/i.exec(matcher)) {
        matcher = new RegExp(contents[1], contents[2]);
      } else {
        matcher = new RegExp("\\b" + matcher + "\\b", "i");
      }
      if (matcher.exec(text)) return true;
      return false;
    },
    matchesMessageTrigger: function(message) {
      matcher = this.room_settings.get("message_trigger").strip();
      return this.matchesTrigger(message, matcher);
    },
    matchesUserTrigger: function(name) {
      matcher = this.room_settings.get("user_trigger").strip();
      return this.matchesTrigger(name, matcher);
    },
    playAudioFor: function(name, message) {
      if (this.matchesMessageTrigger(message) || this.matchesUserTrigger(name)) return true;
      return false;
    },
    playAudio: function(name, message) {
      if (! this.playAudioFor(name, message) || this.room_settings.get("audio_url").strip().empty()) return false;
      document.getElementById("audio_notification_element").innerHTML=
        "<embed src=' " + this.room_settings.get("audio_url").strip() + "' hidden='true' autostart='true' loop='false' />";
    },
    showConfigForm: function() {
      if ($('audio_notification_config_div')) $('audio_notification_config_div').remove();
      new Insertion.After('participants', "\
      <div id='audio_notification_config_div'>\
      <h3>Audio Notification:</h3>\
      <div id='debug'></div>\
      <div id='audio_notification_element'></div>\
      <form id='audio_notification_form' style='font-size: 10px'>\
        <div>Message Trigger: <input type='text' name='message_trigger' id='audio_notification_message_trigger'/></div>\
        <div>User Trigger: <input type='text' name='user_trigger' id='audio_notification_user_trigger'/></div>\
        <div>Audio URL: <input type='text' name='audio_url' id='audio_notification_audio_url'/></div>\
      </form>\
      </div>\
      ");
      that = this;
      $w("audio_notification_message_trigger audio_notification_user_trigger audio_notification_audio_url").each( function(e_id) {
        Event.observe(e_id, 'change', function(e) { this.extractSettings() }.bindAsEventListener(that));
      });
    },
    populateSettings: function() {
      $('audio_notification_message_trigger').value = this.room_settings.get("message_trigger");
      $('audio_notification_user_trigger').value = this.room_settings.get("user_trigger");
      $('audio_notification_audio_url').value = this.room_settings.get("audio_url");
    },
    extractSettings: function() {
      this.room_settings = $H(Form.serialize('audio_notification_form', true));
      this.saveRoomSettings();
    },
    saveRoomSettings: function() {
      setCookie("audio_notification_settings_" + this.room_id, this.room_settings.toJSON(), 14);
    },
    loadRoomSettings: function() {
      if (serialized_settings = getCookie("audio_notification_settings_" + this.room_id))
        eval("this.room_settings = $H(" + serialized_settings + ");");
      else
        this.room_settings = $H({
          message_trigger: '',
          user_trigger: '',
          audio_url: ''
        });
    }
  }

  function setCookie(name, value, days) { 
    expire_str = days ? ";expires="+(new Date(new Date().getTime() + days*24*60*60*1000)).toGMTString() : ""
    document.cookie = (name + "=" + escape(value)) + (expire_str); 
  }

  function getCookie(name) {
    return $A(document.cookie.split(";")).map(function(c) {
      parts = c.split("=")
      if (parts[0].toString().strip()==name) {
        return unescape(parts[1]);
      }
    }).compact().first();
  }

  audioPlayer = new AudioPlayer();  
} } catch(e) { new Insertion.After('participants', e); } 

