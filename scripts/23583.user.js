// ==UserScript==
// @name          Growl Notifications with messages for campfire and fluid
// @namespace     http://code.leadmediapartners.com/
// @description   Shows what was said in the growl window, along with the window title.  Simple, but how big of a difference does that make :) !
// @author        Tim Harper
// @homepage      http://code.leadmediapartners.com/
// @include       *.campfirenow.com/room*
// ==/UserScript==

try {
  if ( typeof(Campfire) != "undefined" ) {
    
    Campfire.window_is_focused = false;
    Campfire.currentName = $('user_' + window.chat.userID).down('span').innerHTML;
    // hook into the onMessagesInserted function
    if (typeof( Campfire.Transcript.prototype.insertMessages_without_hook ) == "undefined" )
    {
      Campfire.Transcript.prototype.insertMessages_without_hook = Campfire.Transcript.prototype.insertMessages;
        Campfire.Transcript.prototype.insertMessages = function() {
        try {
          messages = this.insertMessages_without_hook.apply(this, arguments);
          messages.each(function(message) {
            if ((! Campfire.window_is_focused) && (message) ) notifyMessage(message);
          })
        
          return messages;
        } catch(e) { notifyError(e); }
      }
      
      function notifyError(e)
      {
        new Insertion.Bottom('chat', "<tr><td colspan='2' style='color: red'>A Javascript Error Occurred in the campfire grease monkey script: " + e + "</td></tr>");
      }
    
      function notifyMessage(message)
      {
        try {
          message_dom_id = "message_"+message.id();
          if ($(message_dom_id))
          {
            what_node = $$("#" + message_dom_id + " .body div").first();
            name_node = $$("#" + message_dom_id + " .person span").first();
          
            if (what_node && name_node) {
              what = what_node.innerHTML;
              name = name_node.innerHTML;
              if(what.indexOf(Campfire.currentName.toLowerCase().split(" ")[0]) != -1) {
                alert_message = new String(name + ": " + what).stripHTML();
                fluid.showGrowlNotification({
                  title: document.title,
                  description: alert_message,
                  priority: 2,
                  sticky: false
                });
              }
            }
          }
      
        } catch(e) { notifyError(e) }
      }
    
      Event.observe(window, 'blur', function() { Campfire.window_is_focused = false; });
      Event.observe(window, 'focus', function() { Campfire.window_is_focused = true; });
    
      Object.extend(String.prototype, {
        stripHTML: function() { return(this.replace(/<[^>]+>/g, '').gsub("&gt;", ">").gsub("&lt;", "<").gsub("&amp;", "&")); }
      });
    }
  }
} catch(e) { alert(e); }