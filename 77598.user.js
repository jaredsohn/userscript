// ==UserScript==
// @name Mincer
// @namespace http://unorthodox.me/mincer/
// @description Power-user script for Gaydar (http://gaydarguys.com) chat
// @include http://gaydar.net/Chat/Channel.aspx?channel=*
// @include http://*.gaydar.net/Chat/Channel.aspx?channel=*
// @include http://gaydar.net/Chat/ChannelList.aspx
// @include http://*.gaydar.net/Chat/ChannelList.aspx
// @include http://gaydar.net/Chat/InviteReceived.aspx?*
// @include http://*.gaydar.net/Chat/InviteReceived.aspx?*
// @include http://gaydarguys.com/Chat/Channel.aspx?channel=*
// @include http://*.gaydarguys.com/Chat/Channel.aspx?channel=*
// @include http://gaydarguys.com/Chat/ChannelList.aspx
// @include http://gaydarguys.com/Chat/InviteReceived.aspx?*
// @include http://*.gaydarguys.com/Chat/InviteReceived.aspx?*
// @include http://*.gaydarguys.com/Chat/ChannelList.aspx
// @include http://gaydar.co.uk/Chat/Channel.aspx?channel=*
// @include http://*.gaydar.co.uk/Chat/Channel.aspx?channel=*
// @include http://gaydar.co.uk/Chat/ChannelList.aspx
// @include http://*.gaydar.co.uk/Chat/ChannelList.aspx
// @include http://gaydar.co.uk/Chat/InviteReceived.aspx?*
// @include http://*.gaydar.co.uk/Chat/InviteReceived.aspx?*
// @include http://gaydar.com.au/Chat/ChannelList.aspx
// @include http://*.gaydar.com.au/Chat/ChannelList.aspx
// @include http://gaydar.com.au/Chat/Channel.aspx
// @include http://*.gaydar.com.au/Chat/Channel.aspx
// @include http://gaydar.com.au/Chat/InviteReceived.aspx?*
// @include http://*.gaydar.com/au/Chat/InviteReceived.aspx?*
// @scriptsource http://userscripts.org/scripts/show/77598
// @author TJ <geek@unorthodox.me>
// @copyright 2010, TJ (http://unorthodox.me)
// @license  GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version 0.4.8

/* StartHistory
 v0.4.8 - 29 June 2010
  - add handling of the InviteReceived page
  - create clickable link around inviter's nickname that appears on the first line
  - Don't show MutationEvent warning modal dialog if cause is a null chatLogContent element

 v0.4.7 - 26 June 2010
  - activate for *.gaydar.net domain since QSoft now redirecting via HTTP URL rewrite from *.gaydarguys.com

 v0.4.6 - 17 June 2010
  - fix remaining bug for "hide advertising banner' on ChannelList window where Friends & Favourites, and People List, weren't relocated

 v0.4.5 - 17 June 2010
  - fix bug in 'hide advertising banner' where chat-log area wouldn't resize vertically when window was enlarged

 v0.4.4 - 10 June 2010
  - add @include for Australian sites
  - Add preference to hide advertising banner

 v0.4.3 - 9 June 2010
  - Tweak gaydar version extraction to allow for alphabetical suffixes
  - Removed DHTML Color Picker (Mozilla security prevents passing/receiving chosen color value)
  - Add preference to hide older 'action' messages (joins/parts) to keep conversation flow un-interrupted
  - Make 'action' colour-change respect preferences setting (was being applied regardless)

 v0.4.2 - 8 June 2010
  - Don't save window layout of private chat windows (they have 'random' names and don't repeat)
  - Added base64-encoded version of DHTML Color Picker v2.0 from http://www.colorjack.com/software/dhtml+color+picker+2.html

 v0.4.1 - 7 June 2010
  - Direct some debug messages to mincer.debug_log() rather than GM_log()
  - increase range of symbols recognised in UPPERCASE message detection
  - Save and restore window layout

 v0.4.0 - 6 June 2010
  - Add dedicated debug log window option to make reporting problems much easier
  - Add 'Upload' button to debug log window so user's can send logs to developers easily
  - Add server-side code at unorthodox.me to receive and save user debug logs
  - Fix setting of background-colour for message editing area (apply to editor DIV)

 v0.3.9 - 6 June 2010
  - Move Mincer logo to right side of message editing area

 v0.3.8 - 6 June 2010
  - Add option to replace the View-Profile action with a custom URL
  - Add manual-update option

 v0.3.7 - 6 June 2010
  - Auto-update installation revised after testing from clean install

 v0.3.6 - 6 June 2010
  - No-change update-testing upload

 v0.3.5 - 6 June 2010
  - Close chat windows just before updating to new version, otherwise GreaseFire installs a second instance of
    Mincer. That results in two (different versions) of Mincer installed and running on subsequent chat sessions!

 v0.3.4 - 6 June 2010
  - Add reminder after installing update to restart chat

 v0.3.3 - 6 June 2010
  - Add 'hide my nickname' preference (hides nickname prefix for user's own messages)

 v0.3.2 - 6 June 2010
  - Re-factored and modified update code
  - Removed template REFRESH base64-encoded HTML
  - Removed template update code
  - Enabled auto-update code

 v0.3.1 - 6 June 2010
  - Add 'set current text colour' option to preferences dialog

 v0.3.0 - 1 June 2010
  - Add help button to preferences dialog and supporting web page

 v0.2.9 - 1 June 2010
  - Always save text colour as a hex code (QSoft's setColor() only accepts hex, not CSS rgb(R,G,B) or named colours
  - Add PayPal Donate button to preferences dialog

 v0.2.8 - 1 June 2010
  - Fix layout faults in preferences dialog

 v0.2.7 - 1 June 2010
  - Update and save preferences from dialog box (colour's cannot yet be altered)

 v0.2.6 - 1 June 2010
  - Strip illegal characters from auto-join channel names (IRC doesn't accept them)
  - Implement preferences dialog (doesn't save settings yet - use about:config instead)

 v0.2.5 - 31 May 2010
  - convert UPPERCASE messages to Proper case
  - don't highlight keywords in my own messages

 v0.2.4 - 30 May 2010
  - auto-join channels listed in preferences
  - display debug message in window status-bar if Firefox's dom.disable_window_status_change == false

 v0.2.3 - 30 May 2010
  - Fix bug in document.title watch not being set correctly (needed quotes around property name)

 v0.2.2 - 30 May 2010
  - Auto-prefix debug messages with channel name
  - Time-stamp debug messages
  - Don't hide a message twice (duplicate then blocked detected on same message)
  - Don't hide a duplicate message sent by 'me'
  - Highlight messages containing keywords and/or nickname

 v0.2.1 - 29 May 2010
  - Fix hiding blocked messages (inserting time-stamp caused failed match on blocked class)

 v0.2.0 - 29 May 2010
  - include jshash-2.2/md5-min.js to support Hash tables of messages
  - hash and detect duplicate messages, optionally hiding duplicates

 v0.1.9 - 29 May 2010
  - watch document.title for changes and re-append version info

 v0.1.8 - 29 May 2010
  - adjust @namespace to point to http://unorthodox.me/mincer/
  - store and restore bold setting for chat log and message edit text-box
  - store and restore message time-stamping preference
  - prefix messages with time-stamp
  - show gaydar chat & Mincer version in window title

 v0.1.7 - 29 May 2010
  - rework colour over-ride to not strip icon images

 v0.1.6 - 28 May 2010
  - Correct @scriptsource link
  - report channel-name in blocked-message report as well as nick-name
  - activate for Channel.aspx and ChannelList.aspx
  - refactored into mincer prototypes, losing UIL template
  - set reason
  - add base64-encoded data: URI PNG icons
  - display logo in background of messageTextarea
  - display Mincer icon and button on Channel toolbar (will launch preferences dialog eventually)
  - read/write preferences from/to persistent storage (accessible from "about:config" filtered by "mincer")
  - TODO: add base64-encoded data: URI preferences HTML (currently empty)

 v0.1.5 - 27 May 2010
  - add debug option and information messages (written to Firefox Error Console)
  - use GreaseMonkey's unsafeWindow to access textBox and _sortOrder
  - use correct event property to report who has been blocked

 v0.1.4 - 26 May 2010
  - set colour
  - set text size
  - set sort order
  - remove unnecessary manipulation of the throbber display style  

 v0.1.3 - 26 May 2010
  - use getElementByXPath() in preference to getElementById()
  - refactor to be object-oriented (thanks to GoogleMonkeyR for example code and preferences interface)
  - add PayPal donate button
  - add error-console logging
  - add preferences dialog to GM menu user-commands

 v0.1.2 - 25 May 2010
  - Support gaydarguys.com and *.gaydarguys.com
 
 v0.1.1 - 25 May 2010
  - Hide messages from blocked or ignored users
  - Show command console
  - Show join console
 EndHistory */
// ==/UserScript==

/*
Implemented

    * Never see messages from Blocked or Ignored users
    * Save and restore text colour
    * Save and restore custom text size
    * Save and restore sort order
    * Save and restore custom background colour
    * Save and restore over-ride custom text colour


    * Over-ride (remove) colours in messages
    * Mincer menu added to channel toolbar (does nothing - awaiting preferences dialog)
    * Mincer logo in background of message textarea
    * Log actions to Firefox Error Console
    * Save and restore 'reason' message in the 'Room List' window
    * Auto-remove repeated (cut-n-paste) messages
    * Auto-highlight all public chat that is directed to you (contains your nickname or aliases)
    * Auto-join channels at start-up
    * Preferences dialog box
    * Auto-update notifications
    * Save and restore preferred window size and location

In Progress

    * Tab completion of nicknames when typing messages

Pending

    * Auto-accept or auto-decline private chat invitations (or limit to Friends & Favourites)
    * Audible alerts when new messages arrive in hidden windows
    * Log conversations
    * Trigger actions based on events, such as a person joining or leaving a room
    * Provide auto-status messages such as Away, Busy, etc.
    * Sort user-list with Friends & Favourites first

*/

/* TODO: provide this information in an HTML help screen
 userlist filter and no-chrome: gzg7l7XfDF.JxLehtrqzs (shortcut IDKFA)
 command dialog: gzg7l7XfDF.tfmcoqLMKr (shortcut IDDQD)
 join dialog: gzg7l7XfDF.cG1b1nLIRt (shortcut IDNOCLIP)
 Note: must disable Firefox quick-search (Preferences->Advanced->General->"Search for text when I start typing"
 and *not* have focus in the message textbox.
*/

/* TODO:
   Copy array: arr2 = arr1.slice(0, arr1.length);

   Invite window details:
   /Chat/InviteReceived.aspx?user=110412&channel=PV0001af4cc35780fb50b03872c5ce82542e9efb74&reason=Hi
   
   <p id="invUser">xxxxx invites you to Start a private chat</p>
 */

/*
 * Prototypes and additional document functions
 * (from GoogleMonkeyR)
 */
document.getElementByXPath = function(XPath, contextNode)
{
 var a = this.evaluate(XPath, (contextNode || this), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
 return (a.snapshotLength ? a.snapshotItem(0) : null);
};

document.getElementsByXPath = function(XPath, contextNode)
{
 var ret=[], i=0;
 var a = this.evaluate(XPath, (contextNode || this), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
 while(a.snapshotItem(i)) {
  ret.push(a.snapshotItem(i++));
 }
 return ret;
};

document.buildElement = function(type, atArr, inner, action, listen)
{
 var e = document.createElement(type);
 for (var at in atArr) {
  if (atArr.hasOwnProperty(at)) {
   e.setAttribute(at, atArr[at]);
  }
 }
 if(action && listen) {
  e.addEventListener(action, listen, false);
 } 
 if(inner) {
  e.innerHTML = inner;
 }
 return e;
};

Function.prototype.bind = function(object)
{
 var __method = this;
 return function()
 {
  __method.apply(object, arguments);
 }
};

String.prototype.repeat = function(l)
{
 return new Array(l+1).join(this);
};

String.prototype.retNum = function()
{
 return (isNaN(this) ? 0 : (+this));
}; 

/*
 * Primary object
 */
var mincer =
{
 script_name : "Mincer",
 script_version : "0.4.8",
 script_id : "77598",
 paypal_hosted_button_id : "YLRHKYMZBTD3E",
 gaydar_chat_version : "0",
 debug : true,
 debug_window : null,
 debug_window_log : null,
 debug_use_external_now : false,
 warned_no_mutation_events : false,
 page : window.location.pathname,
 channel_list : null,
 regexp_channel : /Channel\.aspx/,
 regexp_channel_list : /ChannelList\.aspx/,
 regexp_invite_received : /InviteReceived\.aspx/,
 update_available : false,

 /*
  * Write to Error console
  */
 debug_log : function(debug_message)
 {
  var prefix = "";
  if (mincer.debug) {
   // timestamp prefix
   var now = new Date();
   prefix =  now.toLocaleTimeString() + " ";

   /* don't wait for the channel-name to write to the status bar since the
      channel belongs in that window anyhow */
   // log to window status bar if not disabled by Firefox
   if (mincer.channel && !mincer.channel.disable_window_status_change)
    unsafeWindow.status = prefix + debug_message;

   // auto-prefix the channel name if this message is from a channel instance
   if (mincer.channel) 
    prefix += "[" + mincer.channel.channel_display_name + "] ";

   if (mincer.prefs.bool_set_debug_window) {
    /* Log to dedicated debug window.
       This is complicated code to make sure the dedicated external log-window is created
       the first time it is required. The code has to cope with a delay between
       opening the window and the document becoming available to attach messages to.
       To deal with that without blocking, a temporary element in this document is
       used to gather the messages. When the log element in the window is ready, the
       collected messages are imported to the other document.
       This code could be running for several different web pages simultaneously, all updating
       the external log window.
     */


    if (!mincer.debug_window) { // no debug window yet so create it
     // if the 'Room List' Mincer instance has alaready created one, use it
     if (unsafeWindow.opener._channellist && unsafeWindow.opener._channellist.mincer && unsafeWindow.opener._channellist.mincer.debug_window) {
      GM_log(prefix + "Info, valid parent debug_window, using it");
      mincer.debug_window = unsafeWindow.opener._channellist.mincer.debug_window;
     }
     else {
      // FIXME: any way avoid this - needed to call add_message()
      mincer.debug_window = unsafeWindow.open(mincer.resources.DEBUG_HTML, "Mincer_Debug");
      GM_log(prefix + "Info, opened Debug Log window");
     }
    }   

    // window that contains document that contains the log element (internal temporary or external permanent)
    var owner_window = null;
    if(mincer.debug_use_external_now) {
     owner_window = mincer.debug_window
     // GM_log(prefix + "Info, owner_window = mincer.debug_window");
    }
    else {
     owner_window = window;
     // GM_log(prefix + "Info, owner_window = window");
    }

    if (!mincer.debug_window_log) { // nowhere to add messages so create a parent element
     mincer.debug_window_log = document.createElement("div");
     GM_log(prefix + "Info, created temporary log element");
    }

/*   GM_log(prefix + "Info, mincer.debug_use_external_now="+mincer.debug_use_external_now);
    GM_log(prefix + "Info, mincer.debug_window="+mincer.debug_window);
    GM_log(prefix + "Info, mincer.debug_window.document="+mincer.debug_window.document);
    GM_log(prefix + "Info, mincer.debug_window.document.getElementById(\"log\")="+mincer.debug_window.document.getElementById("f_log"));
*/
    var log = null;
    // only enter this block if the external window isn't ready
    if (!mincer.debug_use_external_now 
         && mincer.debug_window.document 
         && (log = mincer.debug_window.document.getElementById("f_log"))) {
     // external document is accessible and so is log element
     GM_log(prefix + "Info, external log element is accessible =" + log);
     if (mincer.debug_window_log !== log) { // still using the temporary log
      // copy all messages from the temporary log to the visible log window
      if (mincer.debug_window_log.childNodes && mincer.debug_window_log.childNodes.length > 0) {
       GM_log(prefix + "Info, copying " + mincer.debug_window_log.childNodes.length + " messages to external window");

       for (var child = 0; child < mincer.debug_window_log.childNodes.length; child++) {
        mincer.debug_window.add_message(mincer.debug_window_log.childNodes[child].firstChild.data);
       }
       mincer.debug_window.add_message(prefix + "Copied " + mincer.debug_window_log.childNodes.length + " messages to external window, switching to direct logging");
      }
      // set permanent log element reference
      mincer.debug_use_external_now = true;
      mincer.debug_window_log = log;
      owner_window = mincer.debug_window;
     }
    }

    // finally, add the message!
    // create the message element using the correct parent document
    if (owner_window) {
     if (owner_window !== window) { // using the external window so just add to the textarea
      owner_window.add_message(prefix + debug_message);
     }
     else { // using a temporary div
      var el_text = owner_window.document.createTextNode(prefix + debug_message);
      var el_div = owner_window.document.createElement("div");
      el_div.appendChild(el_text);
      mincer.debug_window_log.appendChild(el_div);
     }
     // GM_log(prefix + "Info, added element to owner_window");
    }
    else {
     GM_log(prefix + "Error, couldn't add element to owner_window");
    }
   }
   else {
    // log to browser's Error Console
    GM_log(prefix + debug_message);
   }
  }
 },

 /*
  * Custom View Profile URL handler
  */
 view_profile_button_click_handler : function(event)
 {
  var selected_user = unsafeWindow._selectedUser;
  if (selected_user && selected_user.DisplayName) {
   var nickname = selected_user.DisplayName;
   var url = mincer.prefs.str_custom_view_profile_url;
   if (url) {
    url = url.replace(/{nickname}/, nickname);
    mincer.debug_log("Info, View Profile for " + nickname + " using " + url);
    window.open(url, "_blank");
   }
   else
    mincer.debug_log("Warning, custom view profile URL not set");
  }
  else
   mincer.debug_log("Error, unable to access _selectedUser");
 },

 /*
  * watch the View Profile thumbnail for updates and alter the href of the link
  */
 watch_view_profile_summary_handler : function(property, oldval, newval)
 {
  mincer.debug_log("Info, View Profile summary watch has fired on " + property);
  var result = newval;
  var selected_user = unsafeWindow._selectedUser;
  if (selected_user && selected_user.DisplayName) {
   var nickname = selected_user.DisplayName;
   var url = mincer.prefs.str_custom_view_profile_url;
   if (url) {
    result = url.replace(/{nickname}/, nickname);
    mincer.debug_log("Info, replacing view profile thumbnail href");
   }
   else
    mincer.debug_log("Warning, custom view profile thumbnail href not set");
  }
  else
   mincer.debug_log("Error, unable to access _selectedUser");

  return result;
 },

 /*
  * Save some preferences
  */
 unload_event_handler : function(event)
 {
  mincer.debug_log("Info, window closing, saving some settings");

  if (mincer.prefs.bool_set_save_window_layout) { // Save window position and size
   // don't save private chat window positions since their names are randomly generated each time and don't repeat
   if (window.name.search( /^channel_PV.*/ ) == -1) { 
    // must re-read the preference since it may be stale (other windows may have written to it since this window opened)
    mincer.prefs.str_save_window_layout = mincer.prefs.get_pref("save_window_layout", "");
    var location = window.name + "=" + window.outerWidth + "x" + window.outerHeight + "@" + window.screenX + "," + window.screenY;
    var regexp_window = new RegExp(window.name + "=\\d+x\\d+@\\d+,\\d+");
    if (regexp_window.test(mincer.prefs.str_save_window_layout)) {
     // this window already has a saved setting, so replace it
     mincer.debug_log("Info, saving location of window " + window.name);
     var pref = mincer.prefs.str_save_window_layout.replace(regexp_window, location);
     mincer.prefs.str_save_window_layout = pref;
    }
    else { // add information on new window
     mincer.prefs.str_save_window_layout += location + ":";
     mincer.debug_log("Info, saving location of window " + window.name);
    }
   }
  }

  mincer.prefs.save(); // make sure preferences are in persistent storage
 },

 /*
  * General initialisation tasks for all windows
  */
 load_event_handler : function(event)
 {
  mincer.debug_log("Info, Performing " + mincer.script_name + " general tasks");

  // hide the advertising banner
  if (mincer.prefs.bool_set_hide_advertising_banner) {
   var ad = document.getElementById("advert_advertArea");
   if (ad) ad.parentNode.removeChild(ad);
   delete ad;
   ad = document.getElementById("adbanner");
   if (ad) ad.parentNode.removeChild(ad);
   delete ad;
   // now shuffle other elements up so the vacated space isn't blank
   // use a redirection trick to ensure getting parent element even when it has no id (as on the ChannelList page)
   var page = document.getElementById("profileSummaryArea").parentNode;
   if (page) {
    // have to separate numeric and units part in order to adjust position
    var regexp = /^(\d+)(.*)$/;
    var parts = regexp.exec(document.defaultView.getComputedStyle(page.firstElementChild, null).top);
    if (parts != null) {
     var adjust = parts[1]; // the numeric part (hopefully pixels!)

     var divs = document.getElementsByXPath("div", page);
     // Channel: only the first 3 DIVs need the 'top' value setting, others will flow.
     // Channel List: only the first 5 DIVs need the 'top' value setting, others will flow.
     for (var index = 0;index < (mincer.channel ? 3 : 5); index++) {
      var el = divs[index];
      if (el) {
       var computed_top = document.defaultView.getComputedStyle(el, null).top;

       // have to separate numeric and units part in order to adjust position
       var parts = regexp.exec(computed_top);
       if (parts != null)
        // FIXME: different units could potentially be used on 'page' and this element, might need to test and force them
        el.style.top = (parts[1] - adjust) + parts[2];
      }
     }
     GM_log("Debug, resizing window by " + -adjust);
     window.resizeBy(0, -adjust);
    }
   }
  }

  // use a custom View Profile URL
  if (mincer.prefs.bool_set_custom_view_profile_url && mincer.prefs.str_custom_view_profile_url) {
   // add a watch on the profile summary so each time it changes Mincer can alter the link URL
   var link_profile_summary = unsafeWindow.document.getElementById("uplProfileSummary");
   if (link_profile_summary) {
    // div
    link_profile_summary.watch("firstChild", mincer.watch_view_profile_summary_handler);
    // span id="profileSummary"
    link_profile_summary.firstChild.watch("firstChild", mincer.watch_view_profile_summary_handler);
    mincer.debug_log("Info, added custom View Profile summary watch handler");
   }

   var el_toolbar = unsafeWindow.document.getElementById("userToolbar");
   if (el_toolbar) {
    var el_button = el_toolbar.firstElementChild;
    mincer.debug_log("Info, custom View Profile URL attaching event to " + el_button);
    if (el_button /* && el_button.tagName == "SPAN" */ ) {
     var old_event_handler = unsafeWindow.viewProfileButtonClickHandler;
     // var old_event_handler = "viewProfileButtonClickHandler";
     try {
      var result = el_button.removeEventListener("click", old_event_handler, false);
      result = el_button.addEventListener("click", mincer.view_profile_button_click_handler, false);
      mincer.debug_log("Info, using custom View Profile URL");
     }
     catch(ex) {
      mincer.debug_log("Error, failed to remove existing View Profile click event handler: "+ex.name + " = " + ex.message);
     }
    }
    else
     mincer.debug_log("Error, unable to locate View Profile button element");
   }
   else
    mincer.debug_log("Error, unable to locate userToolbar");
  }

  // use preferred window location and size
  if (mincer.prefs.bool_set_save_window_layout) {
   // don't restore private chat window positions since their names are randomly generated each time and don't repeat
   if (window.name.search( /^channel_PV.*/ ) == -1) { 
    mincer.debug_log("Info, checking for saved layout for window " + window.name);
    var regexp_window = new RegExp(window.name + "=(\\d+)x(\\d+)@(\\d+),(\\d+)");

    if (regexp_window.test(mincer.prefs.str_save_window_layout)) {
     // this window already has a saved setting, so extract it

     var location = regexp_window.exec(mincer.prefs.str_save_window_layout);
     mincer.debug_log("Info, restoring location of window " + window.name);

     if (location && location.length == 5) { // found all the values needed
      window.moveTo(location[3], location[4]);
      window.resizeTo(location[1], location[2]);
     }
     else
      mincer.debug_log("Error, unable to extract window location for " + window.name);
    }
   }
  }
 },

 /*
  * General initialisation tasks for all windows
  */
 init : function()
 {
  mincer.debug_log("Info, Initialising " + mincer.script_name + " (general tasks)");

  // some things can't be done until the load event is fired
  window.addEventListener("load", this.load_event_handler, false);
  // and some things need to be done when the window closes
  window.addEventListener("unload", this.unload_event_handler, false);
 },

 /*
  * Check for a new version of this script
  */
 update_check : function()
 {
  mincer.debug_log("Info, checking for update");		
  if (this.current_time() > (mincer.prefs.int_last_check + 86400)) { // 24 hours since last check?
   mincer.debug_log("Info, fetching latest meta-data");		
   // change the saved and current preference
   GM_setValue('delay_update', (mincer.prefs.int_delay_update = false));   
   GM_xmlhttpRequest({
    method : "GET",
    url    : "http://userscripts.org/scripts/source/" + mincer.script_id + ".meta.js",
    onload : function(response) { mincer.update_check_metadata(response.responseText); }
   });
  }
  else {
   if ( mincer.version_compare(mincer.script_version, mincer.prefs.str_on_site_version) ) {
    if ( mincer.version_compare(mincer.prefs.str_skip_version, mincer.prefs.str_on_site_version) && !mincer.prefs.bool_delay_update ) {
     mincer.update_available = true;
     mincer.debug_log("Info, update v" + mincer.prefs.str_on_site_version + " available");
     mincer.update_show_notification();
    }
    else
     mincer.debug_log("Info, update not available");
   }
  }
 },

 /*
  * Fetch and read the metadata for this script
  */
 update_check_metadata : function(content)
 {
  mincer.debug_log("Info, checking update-site meta-data for newer version");
  var version_metadata = content.match( /\/{2,2}\s*@version\s*(\d.*)/ );
  mincer.prefs.str_version_available = (version_metadata===null) ? "0" : version_metadata[1];
  GM_setValue('on_site_version', mincer.prefs.str_version_available);

  var update_history = content.substring(content.search( /\/\*.*StartHistory/im ));
  update_history = update_history.substring(0, update_history.search( /EndHistory.*\*\//im ))
  GM_setValue('on_site_version_history', (mincer.prefs.str_update_history = encodeURIComponent(update_history)));

  if (mincer.version_compare(mincer.script_version, mincer.prefs.str_version_available)) {
   if (mincer.version_compare(mincer.prefs.str_skip_version, mincer.prefs.str_version_available)) {
    mincer.update_available = true;
    mincer.debug_log("Info, update v" + mincer.prefs.str_on_site_version + " available");
    mincer.update_show_notification();
   }
   else
    mincer.debug_log("Info, update not available");

  }
  GM_setValue('last_check', (mincer.prefs.int_last_check = mincer.current_time()));
 },	

 /*
  * Compare two multi-part version strings
  */
 version_compare : function(ver1, ver2)
 {
  var max_version_part_test = 5;
  var ver1_arr = (ver1+('.0'.repeat(max_version_part_test))).split(".",max_version_part_test);
  var ver2_arr = (ver2+('.0'.repeat(max_version_part_test))).split(".",max_version_part_test);
        
  for(var i=0; i < max_version_part_test; i++) {
   if( ver1_arr[i].retNum() < ver2_arr[i].retNum() ) {
    break;
   }
   else if( ver1_arr[i].retNum() > ver2_arr[i].retNum() ) {
    i = max_version_part_test;
    break;
   }
  }
  return (i < max_version_part_test);
 },

 /*
  * Get current Unix time
  */	
 current_time : function()
 {
  var d = new Date();
  return Math.round(d.getTime() / 1000); // Unix time in seconds
 },

 /*
  * Add a notification message to the chat conversation
  */
 update_show_notification : function()
 {
  // is an update notification required and this is a channel window object?
  if (mincer.update_available && mincer.channel) {
   mincer.debug_log("Info, showing update notification");
   var el_notify = document.buildElement("div",
    {style : "cursor:pointer; font-weight:bold; color: red; background-color: silver"},
    "Version "+ mincer.prefs.str_on_site_version + " of " + mincer.script_name + " is available, click here to review and install it",
    "click",
    mincer.update_show_history
   );
   if (el_notify) {
    if (mincer.channel.chatLogContent)
     mincer.channel.chatLogContent.appendChild(el_notify);
    else
     mincer.debug_log("Error, chatLogContent is null");
   }
   else
    mincer.debug_log("Error, failed to create update notification");
  }
 },

 /*
  * Display the changelog of the newer version wit option to install it
  */
 update_show_history : function(event)
 {
  mincer.debug_log("Info, opening update history dialog");
  try {
   window.open(mincer.resources.HISTORY_HTML, "Mincer_Update_History", "dialog=yes,centerscreen,status=yes,resizable=yes,scrollbars=yes,location=no,alwaysRaised=no,outerHeight=560,outerWidth=600");
  } catch(ex) {
   mincer.debug_log("Error, failed to open update history dialog");
  }
 },

 /*
  * Takes a text field and an array of strings for autocompletion
  * From: http://stackoverflow.com/questions/1837555/ajax-autocomplete-or-autosuggest-with-tab-completion-autofill-similar-to-shell
  */
 autocomplete : function(input, data)
 {
  if (input.value.length == input.selectionStart && input.value.length == input.selectionEnd) {
   var candidates = [];
   // filter data to find only strings that start with existing value
   for (var i=0; i < data.length; i++) {
    if (data[i].indexOf(input.value) == 0 && data[i].length > input.value.length)
     candidates.push(data[i]);
   }

   if (candidates.length > 0) {
    // some candidates for auto-completion are found
    if (candidates.length == 1) input.value = candidates[0];
    else input.value = mincer.longestInCommon(candidates, input.value.length);
    return true;
   }
  }
  return false;
 },

 /*
  * Finds the longest common substring in the given data set.
  * Takes an array of strings and a starting index
  */
 longestInCommon : function(candidates, index)
 {
  var i, ch, memo;
  do {
   memo = null;
   for (i=0; i < candidates.length; i++) {
    ch = candidates[i].charAt(index);
    if (!ch) break;
    if (!memo) memo = ch;
    else if (ch != memo) break;
   }
  } while (i == candidates.length && ++index);

  return candidates[0].slice(0, index);
 },

 /*
  * Convert decimal to hex
  */
 dec_to_hex : function(decimal)
 {
  var result = null;
  var hex_codes = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F" ];

  var hex = "";
  hex += hex_codes[decimal & 0xF0 >> 4];
  hex += hex_codes[decimal & 0x0F];

  if (hex.length == 2)
   result = hex;

  return result;
 },

 /*
  * Convert CSS style color in named format to hex
  */
 css_color_named_to_hex : function(colour)
 {
  var color_names = { 
   "maroon" : "#800000",
   "red"    : "#FF0000",
   "orange" : "#FFA500",
   "yellow" : "#FFFF00",
   "olive"  : "#808000",
   "purple" : "#800080",
   "fuschsia" : "#FF00FF",
   "white"    : "#FFFFFF",
   "lime"     : "#00FF00",
   "green"    : "#008000",
   "navy"     : "#000080",
   "blue"     : "#0000FF",
   "aqua"     : "#00FFFF",
   "teal"     : "#008080",
   "black"    : "#000000",
   "silver"   : "#C0C0C0",
   "gray"     : "#808080"
  };

  var result = color_names[colour]; // assume color-name is valid
  if (!result || result.length == 0) // if not, return a null string
   result = null;
   
  return result;
 },

 /*
  * Convert a CSS style color to hex format (#RRGGBB)
  */
 css_color_to_hex : function(colour)
 {
  var result = colour;
  var hex = "#";
  var log = "Info, converting CSS style 'color' " + colour;

  if (!colour.match( /^#[0-9A-F]{6}$/ )) {
   mincer.debug_log("Info, not a hex code, converting");

   // test for rgb(R,G,B) (allow for spaces around each parameter)
   // capture R, G, B in groups 1, 2, 3 respectively
   var regexp_rgb = /^\s*rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*$/;
   var matches = regexp_rgb.exec(colour);

   if (matches && matches.length == 4) { // legal values have 3 groups captured
    hex += mincer.dec_to_hex(matches[1]);
    hex += mincer.dec_to_hex(matches[2]);
    hex += mincer.dec_to_hex(matches[3]);
    mincer.debug_log(log + " from rgb(R,G,B) format = " + hex);
   }
   else if (colour.match( /^\s*\w(:|\s*)\s*$/ )) { // a word - should be a named colour
    hex = mincer.css_color_named_to_hex(colour);    
    mincer.debug_log(log + " from named-colour format = " + hex);
   }
  }
  if (hex.length == 7)
   result = hex;

  return result;
 },

 last_method : function()
 {
  // dummy - last class isn't suffixed with a comma
 }
};

/*
 * Preferences (saved/restored from persistent storage)
 */
mincer.prefs =
{
 is_saving : false, // set to true whilst writing to Firefox store

 // name format is <type>_<name> to help ensure type safety in handling in later code
 str_reason : null,
 bool_set_debug_logging : false,
 bool_set_debug_window : false,
 bool_set_text_size : false,
 bool_set_text_colour : false,
 bool_set_text_bold : false,
 bool_set_override_text_colour : false,
 bool_set_background_colour : false,
 bool_set_sort_order : false,
 str_text_size : "10pt",
 str_text_colour : "#000000",
 str_override_text_colour : "#000000",
 str_background_colour : "#FFFFFF",
 int_sort_order : 0,
 bool_set_message_timestamp : false,
 bool_set_hide_blocked : false,
 bool_set_hide_duplicate_messages : false,
 int_hide_duplicate_messages_min_length : 8,
 bool_set_highlight_keywords : true,
 bool_set_highlight_include_my_nickname : true,
 str_highlight_keywords : "",
 str_highlight_colour : "#FF0000",
 str_channels_autojoin : "",
 bool_set_proper_case : false,
 bool_set_action_colour : true,
 str_action_colour : "#000000",
 int_last_check : 0,
 bool_delay_update : false,			
 str_on_site_version : "",
 str_skip_version : "",
 str_on_site_version_history : "",
 bool_set_hide_my_nickname : false,
 bool_set_custom_view_profile_url : false,
 str_custom_view_profile_url : "",
 bool_set_mincer_logo : true,
 bool_set_save_window_layout : true,
 str_save_window_layout : "",
 bool_set_hide_old_action_messages : true,
 bool_set_hide_advertising_banner : true,

 // preferences not stored by Mincer
 disable_status_change : GM_getValue("dom.disable_window_status_change"),

 /*
  * Reads stored settings and applies sensible defaults
  */
 init : function()
 {
  this.bool_set_debug_logging = this.get_pref("set_debug_logging", false);
  this.bool_set_debug_window = this.get_pref("set_debug_window", false);
  mincer.debug = this.bool_set_debug_logging;
  mincer.debug_log("Info, mincer.prefs.init()");

  // read these prefs for all windows (because they are used to populate the Preferences dialog)
  this.str_reason = this.get_pref("reason", "Try Mincer, a fantastic chat add-on: http://unorthodox.me/mincer/");
  this.str_channels_autojoin = this.get_pref("channels_autojoin", "");
  this.bool_delay_update = this.get_pref("delay_update", false);			
  this.str_skip_version = GM_getValue('skip_version', "0");
  this.str_on_site_version = this.get_pref("on_site_version", "0");
  this.bool_set_custom_view_profile_url = this.get_pref("set_custom_view_profile_url", false);
  this.str_custom_view_profile_url = this.get_pref("custom_view_profile_url", "http://www.gaydarguys.com/{nickname}");
  this.bool_set_save_window_layout = this.get_pref("set_save_window_layout", true);
  this.str_save_window_layout = this.get_pref("save_window_layout","");
  this.bool_set_hide_advertising_banner = this.get_pref("set_hide_advertising_banner", true);

  // only read these prefs for the channel window (ChannelList doesn't need to know these currently)
  if (mincer.regexp_channel.test(mincer.page)) {
   this.bool_set_text_size = this.get_pref("set_text_size", true);
   this.bool_set_text_colour = this.get_pref("set_text_colour", true);
   this.bool_set_text_bold = this.get_pref("set_text_bold", false);
   this.bool_set_override_text_colour = this.get_pref("set_override_text_colour", false);
   this.bool_set_background_colour = this.get_pref("set_background_colour", false);
   this.bool_set_sort_order = this.get_pref("set_sort_order", true);
   this.str_text_size = this.get_pref("text_size", "10pt");
   this.str_text_colour = this.get_pref("text_colour", "#0099ff");
   this.str_override_text_colour = this.get_pref("override_text_colour", "#000000");
   this.str_background_colour = this.get_pref("background_colour", "#FFFFFF");
   this.int_sort_order = this.get_pref("sort_order", 2);
   this.bool_set_message_timestamp = this.get_pref("set_message_timestamp", false);
   this.bool_set_hide_blocked = this.get_pref("set_hide_blocked", false);
   this.bool_set_hide_duplicate_messages = this.get_pref("set_hide_duplicate_messages", false);
   this.int_hide_duplicate_messages_min_length = this.get_pref("hide_duplicate_messages_min_length", 8);
   this.bool_set_highlight_keywords = this.get_pref("set_highlight_keywords", true);
   this.bool_set_highlight_include_my_nickname = this.get_pref("set_highlight_include_my_nickname", true);
   this.str_highlight_keywords = this.get_pref("highlight_keywords", "");
   this.str_highlight_colour = this.get_pref("highlight_colour", "#FF0000");
   this.bool_set_proper_case = this.get_pref("set_proper_case", false);
   this.bool_set_action_colour = this.get_pref("set_action_colour", true);
   this.str_action_colour = this.get_pref("action_colour", "#CCCCCC");
   this.str_on_site_version_history = this.get_pref("on_site_version_history", "Unknown");
   this.bool_set_hide_my_nickname = this.get_pref("set_hide_my_nickname", false);
   this.bool_set_mincer_logo = this.get_pref("set_mincer_logo", true);
   this.bool_set_hide_old_action_messages = this.get_pref("set_hide_old_action_messages", true);
  }
 },

 /*
  * Save live preferences to persistent storage
  */
 save : function()
 {
  mincer.debug_log("Info, saving preferences");
  mincer.prefs.is_saving = true; // flag that a save is underway

  mincer.prefs.set_pref("set_debug_logging", mincer.prefs.bool_set_debug_logging);
  mincer.prefs.set_pref("set_debug_window", mincer.prefs.bool_set_debug_window);

  // write these prefs for all windows (because they are used to populate the Preferences dialog)
  mincer.prefs.set_pref("reason", mincer.prefs.str_reason);
  mincer.prefs.set_pref("channels_autojoin", mincer.prefs.str_channels_autojoin);
  mincer.prefs.set_pref("set_custom_view_profile_url", mincer.prefs.bool_set_custom_view_profile_url);
  mincer.prefs.set_pref("custom_view_profile_url", mincer.prefs.str_custom_view_profile_url);
  mincer.prefs.set_pref("set_save_window_layout", mincer.prefs.bool_set_save_window_layout);
  mincer.prefs.set_pref("save_window_layout", mincer.prefs.str_save_window_layout);
  mincer.prefs.set_pref("set_hide_advertising_banner", mincer.prefs.bool_set_hide_advertising_banner);

  // only write these prefs for the channel window
  if (mincer.regexp_channel.test(mincer.page)) {
   mincer.prefs.set_pref("set_text_size", mincer.prefs.bool_set_text_size);
   mincer.prefs.set_pref("set_text_colour", mincer.prefs.bool_set_text_colour);
   mincer.prefs.set_pref("set_text_bold", mincer.prefs.bool_set_text_bold);
   mincer.prefs.set_pref("set_override_text_colour", mincer.prefs.bool_set_override_text_colour);
   mincer.prefs.set_pref("set_background_colour", mincer.prefs.bool_set_background_colour);
   mincer.prefs.set_pref("set_sort_order", mincer.prefs.bool_set_sort_order);
   mincer.prefs.set_pref("text_size", mincer.prefs.str_text_size);
   // must convert colour to hex so that calls to QSoft's setColor() don't fail
   mincer.prefs.set_pref("text_colour", mincer.css_color_to_hex(mincer.prefs.str_text_colour));
   mincer.prefs.set_pref("override_text_colour", mincer.prefs.str_override_text_colour);
   mincer.prefs.set_pref("background_colour", mincer.prefs.str_background_colour);
   mincer.prefs.set_pref("sort_order", mincer.prefs.int_sort_order);
   mincer.prefs.set_pref("set_message_timestamp", mincer.prefs.bool_set_message_timestamp);
   mincer.prefs.set_pref("set_hide_blocked", mincer.prefs.bool_set_hide_blocked);
   mincer.prefs.set_pref("set_hide_duplicate_messages", mincer.prefs.bool_set_hide_duplicate_messages);
   mincer.prefs.set_pref("hide_duplicate_messages_min_length", mincer.prefs.int_hide_duplicate_messages_min_length);
   mincer.prefs.set_pref("set_highlight_keywords", mincer.prefs.bool_set_highlight_keywords);
   mincer.prefs.set_pref("set_highlight_include_my_nickname", mincer.prefs.bool_set_highlight_include_my_nickname);
   mincer.prefs.set_pref("highlight_keywords", mincer.prefs.str_highlight_keywords);
   mincer.prefs.set_pref("highlight_colour", mincer.prefs.str_highlight_colour);
   mincer.prefs.set_pref("set_proper_case", mincer.prefs.bool_set_proper_case);
   mincer.prefs.set_pref("set_action_colour", mincer.prefs.bool_set_action_colour);
   mincer.prefs.set_pref("action_colour", mincer.prefs.str_action_colour);
   mincer.prefs.set_pref("set_hide_my_nickname", mincer.prefs.bool_set_hide_my_nickname);
   mincer.prefs.set_pref("set_hide_old_action_messages", mincer.prefs.bool_set_hide_old_action_messages);

  }

  mincer.prefs.is_saving = false; // flag that save is complete
 },

 /*
  * Read preference from persistent storage
  */
 get_pref : function(pref_name, default_value)
 {
  var pref = GM_getValue(pref_name);
  if (pref === undefined) {
   GM_setValue(pref_name, default_value);
   pref = default_value;
  }
  // rate-limit report to avoid showing the version history in particular
  mincer.debug_log("Info, reading preference " + pref_name + (pref.length && pref.length > 200 ? "" : " = " + pref));
  return pref;
 },

 /*
  * Set preference in persistent storage
  */
 set_pref : function(pref_name, value)
 {
  if (value !== undefined && value != null) {
   GM_setValue(pref_name, value);
   mincer.debug_log("Info, writing preference " + pref_name + " = " + value);
  }
  else
   mincer.debug_log("Error, unable to write preference " + pref_name + " = " + value);
  return value;
 },

 /*
  * Ensure hex colour code is valid (e.g. #FF002C)
  */
 check_colour_code : function(str_hex_colour_code)
 {
  str_hex_colour_code = str_hex_colour_code.toUpperCase();
  if(!str_hex_colour_code.match(/^#[0-9A-F]{6}$/)) {
   return null;
  }
  return str_hex_colour_code;
 }
};

 /*
  * Resources (base64-encoded HTML and images)
  */
 mincer.resources =
 {
  PREFS_HTML : "data:text/html;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIGh0bWwgUFVCTElDICItLy9XM0MvL0RURCBYSFRNTCAxLjAgVHJhbnNpdGlvbmFsLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL1RSL3hodG1sMS9EVEQveGh0bWwxLXRyYW5zaXRpb25hbC5kdGQiPgo8aHRtbCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCI%2BCiA8aGVhZD4KICA8dGl0bGU%2BTWluY2VyIFByZWZlcmVuY2VzPC90aXRsZT4KICA8bWV0YSBjb250ZW50PSJUSiIgbmFtZT0iYXV0aG9yIj4KICA8c2NyaXB0IHR5cGU9InRleHQvamF2YXNjcmlwdCI%2BCiAgIHZhciBtaW5jZXIgPSB3aW5kb3cub3BlbmVyLm1pbmNlcjsKICAgbWluY2VyLmRlYnVnX2xvZygiSW5mbywgb3BlbmVkIE1pbmNlciBQcmVmZXJlbmNlcyBkaWFsb2ciKTsKICAgCiAgIHZhciBjb2xvcl9waWNrZXJfd2luZG93X2hhbmRsZSA9IG51bGw7CgogICB2YXIgZ2V0RWwgPSBmdW5jdGlvbihpZCkKICAgewogICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTsKICAgfTsKICAgCiAgIC8qCiAgICAqIHVwZGF0ZSB0aGUgbWluY2VyLnByZWZzIG9iamVjdCBwcm9wZXJ0aWVzCiAgICAqLwogICB2YXIgdXBkYXRlX3ByZWZlcmVuY2VzID0gZnVuY3Rpb24oKQogICB7CiAgICBtaW5jZXIucHJlZnMuc3RyX3JlYXNvbiA9IGdldEVsKCJmX3JlYXNvbiIpLnZhbHVlOwogICAgbWluY2VyLnByZWZzLmJvb2xfc2V0X2RlYnVnX2xvZ2dpbmcgPSBnZXRFbCgiZl9zZXRfZGVidWdfbG9nZ2luZyIpLmNoZWNrZWQ7CiAgICBtaW5jZXIucHJlZnMuYm9vbF9zZXRfdGV4dF9zaXplID0gZ2V0RWwoImZfc2V0X3RleHRfc2l6ZSIpLmNoZWNrZWQ7CiAgICBtaW5jZXIucHJlZnMuYm9vbF9zZXRfdGV4dF9jb2xvdXIgPSBnZXRFbCgiZl9zZXRfdGV4dF9jb2xvdXIiKS5jaGVja2VkOwogICAgbWluY2VyLnByZWZzLmJvb2xfc2V0X3RleHRfYm9sZCA9IGdldEVsKCJmX3NldF90ZXh0X2JvbGQiKS5jaGVja2VkOwogICAgbWluY2VyLnByZWZzLmJvb2xfc2V0X292ZXJyaWRlX3RleHRfY29sb3VyID0gZ2V0RWwoImZfc2V0X292ZXJyaWRlX3RleHRfY29sb3VyIikuY2hlY2tlZDsKICAgIG1pbmNlci5wcmVmcy5ib29sX3NldF9iYWNrZ3JvdW5kX2NvbG91ciA9IGdldEVsKCJmX3NldF9iYWNrZ3JvdW5kX2NvbG91ciIpLmNoZWNrZWQ7CiAgICBtaW5jZXIucHJlZnMuYm9vbF9zZXRfc29ydF9vcmRlciA9IGdldEVsKCJmX3NldF9zb3J0X29yZGVyIikuY2hlY2tlZDsKICAgIG1pbmNlci5wcmVmcy5zdHJfdGV4dF9zaXplID0gZ2V0RWwoImZfdGV4dF9zaXplIikudmFsdWU7CiAgICBtaW5jZXIucHJlZnMuc3RyX3RleHRfY29sb3VyID0gZ2V0RWwoImZfdGV4dF9jb2xvdXIiKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I7CiAgICBtaW5jZXIucHJlZnMuc3RyX292ZXJyaWRlX3RleHRfY29sb3VyID0gZ2V0RWwoImZfb3ZlcnJpZGVfdGV4dF9jb2xvdXIiKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I7CiAgICBtaW5jZXIucHJlZnMuc3RyX2JhY2tncm91bmRfY29sb3VyID0gZ2V0RWwoImZfYmFja2dyb3VuZF9jb2xvdXIiKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I7CiAgICBtaW5jZXIucHJlZnMuaW50X3NvcnRfb3JkZXIgPSBnZXRFbCgiZl9zb3J0X29yZGVyIikuc2VsZWN0ZWRJbmRleDsKICAgIG1pbmNlci5wcmVmcy5ib29sX3NldF9tZXNzYWdlX3RpbWVzdGFtcCA9IGdldEVsKCJmX3NldF9tZXNzYWdlX3RpbWVzdGFtcCIpLmNoZWNrZWQ7CiAgICBtaW5jZXIucHJlZnMuYm9vbF9zZXRfaGlkZV9ibG9ja2VkID0gZ2V0RWwoImZfc2V0X2hpZGVfYmxvY2tlZCIpLmNoZWNrZWQ7CiAgICBtaW5jZXIucHJlZnMuYm9vbF9zZXRfaGlkZV9kdXBsaWNhdGVfbWVzc2FnZXMgPSBnZXRFbCgiZl9zZXRfaGlkZV9kdXBsaWNhdGVfbWVzc2FnZXMiKS5jaGVja2VkOwogICAgbWluY2VyLnByZWZzLmludF9oaWRlX2R1cGxpY2F0ZV9tZXNzYWdlc19taW5fbGVuZ3RoID0gZ2V0RWwoImZfaGlkZV9kdXBsaWNhdGVfbWVzc2FnZXNfbWluX2xlbmd0aCIpLnZhbHVlOwogICAgbWluY2VyLnByZWZzLmJvb2xfc2V0X2hpZ2hsaWdodF9rZXl3b3JkcyA9IGdldEVsKCJmX3NldF9oaWdobGlnaHRfa2V5d29yZHMiKS5jaGVja2VkOwogICAgbWluY2VyLnByZWZzLmJvb2xfc2V0X2hpZ2hsaWdodF9pbmNsdWRlX215X25pY2tuYW1lID0gZ2V0RWwoImZfc2V0X2hpZ2hsaWdodF9pbmNsdWRlX215X25pY2tuYW1lIikuY2hlY2tlZDsKICAgIG1pbmNlci5wcmVmcy5zdHJfaGlnaGxpZ2h0X2tleXdvcmRzID0gZ2V0RWwoImZfaGlnaGxpZ2h0X2tleXdvcmRzIikudmFsdWU7CiAgICBtaW5jZXIucHJlZnMuc3RyX2hpZ2hsaWdodF9jb2xvdXIgPSBnZXRFbCgiZl9oaWdobGlnaHRfY29sb3VyIikuc3R5bGUuYmFja2dyb3VuZENvbG9yOwogICAgbWluY2VyLnByZWZzLnN0cl9jaGFubmVsc19hdXRvam9pbiA9IGdldEVsKCJmX2NoYW5uZWxzX2F1dG9qb2luIikudmFsdWU7CiAgICBtaW5jZXIucHJlZnMuYm9vbF9zZXRfcHJvcGVyX2Nhc2UgPSBnZXRFbCgiZl9zZXRfcHJvcGVyX2Nhc2UiKS5jaGVja2VkOwogICAgbWluY2VyLnByZWZzLnN0cl9hY3Rpb25fY29sb3VyID0gZ2V0RWwoImZfYWN0aW9uX2NvbG91ciIpLnN0eWxlLmJhY2tncm91bmRDb2xvcjsKICAgIG1pbmNlci5wcmVmcy5ib29sX3NldF9oaWRlX215X25pY2tuYW1lID0gZ2V0RWwoImZfc2V0X2hpZGVfbXlfbmlja25hbWUiKS5jaGVja2VkOwogICAgbWluY2VyLnByZWZzLmJvb2xfc2V0X2N1c3RvbV92aWV3X3Byb2ZpbGVfdXJsID0gZ2V0RWwoImZfc2V0X2N1c3RvbV92aWV3X3Byb2ZpbGVfdXJsIikuY2hlY2tlZDsKICAgIG1pbmNlci5wcmVmcy5zdHJfY3VzdG9tX3ZpZXdfcHJvZmlsZV91cmwgPSBnZXRFbCgiZl9jdXN0b21fdmlld19wcm9maWxlX3VybCIpLnZhbHVlOwogICAgbWluY2VyLnByZWZzLmJvb2xfc2V0X2RlYnVnX3dpbmRvdyA9IGdldEVsKCJmX3NldF9kZWJ1Z193aW5kb3ciKS5jaGVja2VkOwogICAgbWluY2VyLnByZWZzLmJvb2xfc2V0X3NhdmVfd2luZG93X2xheW91dCA9IGdldEVsKCJmX3NldF9zYXZlX3dpbmRvd19sYXlvdXQiKS5jaGVja2VkOwogICAgbWluY2VyLnByZWZzLmJvb2xfc2V0X2hpZGVfb2xkX2FjdGlvbl9tZXNzYWdlcyA9IGdldEVsKCJmX3NldF9oaWRlX29sZF9hY3Rpb25fbWVzc2FnZXMiKS5jaGVja2VkOwogICAgbWluY2VyLnByZWZzLmJvb2xfc2V0X2hpZGVfYWR2ZXJ0aXNpbmdfYmFubmVyID0gZ2V0RWwoImZfc2V0X2hpZGVfYWR2ZXJ0aXNpbmdfYmFubmVyIikuY2hlY2tlZDsKICAgIC8vIHRoaXMgc2V0dGluZyBpcyBpbnZlcnRlZAogICAgbWluY2VyLnByZWZzLmRpc2FibGVfc3RhdHVzX2NoYW5nZSA9ICFnZXRFbCgiZl9kaXNhYmxlX3N0YXR1c19jaGFuZ2UiKS5jaGVja2VkOwogICB9OwogIAogICAvKgogICAgKiBkaXNtaXNzIHRoZSBkaWFsb2cgd2l0aG91dCBtYWtpbmcgYW55IGNoYW5nZXMKICAgICovCiAgIHZhciBmb3JtX2NhbmNlbCA9IGZ1bmN0aW9uKGV2ZW50KQogICB7CiAgICB3aW5kb3cuY2xvc2UoKTsKICAgfTsKCiAgIC8qCiAgICAqIGFwcGx5IHNldHRpbmdzIHRvIGN1cnJlbnQgY2hhbm5lbCBhbmQgc2F2ZSB0byBGaXJlZm94IHBlcnNpc3RlbnQgc3RvcmFnZQogICAgKi8KICAgdmFyIGZvcm1fYXBwbHkgPSBmdW5jdGlvbihldmVudCkKICAgewogICAgdXBkYXRlX3ByZWZlcmVuY2VzKCk7CiAgICBtaW5jZXIuY2hhbm5lbC5wcmVmZXJlbmNlc19hcHBseSgpOwogICAgLy8gYXZvaWQgR3JlYXNlbW9ua2V5IHNlY3VyaXR5IGV4Y2VwdGlvbgogICAgd2luZG93Lm9wZW5lci5zZXRUaW1lb3V0KHdpbmRvdy5vcGVuZXIubWluY2VyLnByZWZzLnNhdmUsIDApOwogICAgd2luZG93LmNsb3NlKCk7CiAgIH07CgogICAvKgogICAgKiBzYXZlIHNldHRpbmdzIHRvIEZpcmVmb3ggcGVyc2lzdGVudCBzdG9yYWdlCiAgICAqLwogICB2YXIgZm9ybV9zYXZlID0gZnVuY3Rpb24oZXZlbnQpCiAgIHsKICAgIHVwZGF0ZV9wcmVmZXJlbmNlcygpOwogICAgLy8gYXZvaWQgR3JlYXNlbW9ua2V5IHNlY3VyaXR5IGV4Y2VwdGlvbgogICAgd2luZG93Lm9wZW5lci5zZXRUaW1lb3V0KHdpbmRvdy5vcGVuZXIubWluY2VyLnByZWZzLnNhdmUsIDApOwogICAgd2luZG93LmNsb3NlKCk7CiAgIH07CiAgIAogICAvKgogICAgKiBvcGVuIHRoZSBoZWxwIHdpbmRvdwogICAgKi8KICAgdmFyIGhlbHAgPSBmdW5jdGlvbihldmVudCkKICAgewogICAgd2luZG93Lm9wZW4oImh0dHA6Ly91bm9ydGhvZG94Lm1lL21pbmNlci1oZWxwLyIsICJtaW5jZXJfaGVscCIpOwogICB9OwogCiAgIC8qCiAgICAqIGNvcHkgdGhlIGN1cnJlbnQgdGV4dCBjb2xvdXIgdG8gcHJlZmVyZW5jZXMKICAgICovCiAgIHZhciBzZXRfY3VycmVudF9jb2xvdXIgPSBmdW5jdGlvbihldmVudCkKICAgewogICAgZ2V0RWwoImZfdGV4dF9jb2xvdXIiKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBnZXRFbCgiY3VycmVudF9jb2xvdXIiKS5zdHlsZS5jb2xvcjsKICAgfTsKCiAgIC8qCiAgICAqIG1hbnVhbCB1cGRhdGUgY2hlY2sKICAgICovCiAgIHZhciB1cGRhdGVfY2hlY2sgPSBmdW5jdGlvbihldmVudCkKICAgewogICAgbWluY2VyLnVwZGF0ZV9jaGVjaygpOwogICAgaWYgKG1pbmNlci51cGRhdGVfYXZhaWxhYmxlKSB7CiAgICAgbWluY2VyLnVwZGF0ZV9zaG93X2hpc3RvcnkoKTsKICAgIH0KICAgIGVsc2UgewogICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJsYmxfdXBkYXRlX2NoZWNrIikuaW5uZXJIVE1MID0gIiBObyB1cGRhdGVzIGF2YWlsYWJsZSI7CiAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoImxibF91cGRhdGVfY2hlY2siKS5zdHlsZS5jb2xvcj0icmVkIjsKICAgIH0KICAgfTsKCiAgIHZhciBwcmVwYXJlX3ByZWZlcmVuY2VzX2Zvcm0gPSBmdW5jdGlvbihldmVudCkKICAgewogICAgZ2V0RWwoIm1pbmNlcl92ZXJzaW9uIikudGV4dENvbnRlbnQgPSBtaW5jZXIuc2NyaXB0X3ZlcnNpb247CiAgICBnZXRFbCgiZ2F5ZGFyX3ZlcnNpb24iKS50ZXh0Q29udGVudCA9IG1pbmNlci5nYXlkYXJfY2hhdF92ZXJzaW9uOwogICAgZ2V0RWwoIm5pY2tuYW1lIikudGV4dENvbnRlbnQgPSBtaW5jZXIuY2hhbm5lbC5uaWNrbmFtZTsKICAgIHZhciBjaGFubmVsID0gIkFsbCBjaGFubmVscyIKICAgIGlmIChtaW5jZXIuY2hhbm5lbCAmJiBtaW5jZXIuY2hhbm5lbC5jaGFubmVsX2Rpc3BsYXlfbmFtZSkKICAgICBjaGFubmVsID0gbWluY2VyLmNoYW5uZWwuY2hhbm5lbF9kaXNwbGF5X25hbWU7CiAgICAKICAgIGdldEVsKCJjaGFubmVsX25hbWUiKS50ZXh0Q29udGVudCA9IGNoYW5uZWw7CgogICAgZ2V0RWwoImZfcmVhc29uIikudmFsdWUgPSBtaW5jZXIucHJlZnMuc3RyX3JlYXNvbjsKICAgIGdldEVsKCJmX3NldF9kZWJ1Z19sb2dnaW5nIikuY2hlY2tlZCA9IG1pbmNlci5wcmVmcy5ib29sX3NldF9kZWJ1Z19sb2dnaW5nOwogICAgZ2V0RWwoImZfc2V0X3RleHRfc2l6ZSIpLmNoZWNrZWQgPSBtaW5jZXIucHJlZnMuYm9vbF9zZXRfdGV4dF9zaXplOwogICAgZ2V0RWwoImZfc2V0X3RleHRfY29sb3VyIikuY2hlY2tlZCA9IG1pbmNlci5wcmVmcy5ib29sX3NldF90ZXh0X2NvbG91cjsKICAgIGdldEVsKCJmX3NldF90ZXh0X2JvbGQiKS5jaGVja2VkID0gbWluY2VyLnByZWZzLmJvb2xfc2V0X3RleHRfYm9sZDsKICAgIGdldEVsKCJmX3NldF9vdmVycmlkZV90ZXh0X2NvbG91ciIpLmNoZWNrZWQgPSBtaW5jZXIucHJlZnMuYm9vbF9zZXRfb3ZlcnJpZGVfdGV4dF9jb2xvdXI7CiAgICBnZXRFbCgiZl9zZXRfYmFja2dyb3VuZF9jb2xvdXIiKS5jaGVja2VkID0gbWluY2VyLnByZWZzLmJvb2xfc2V0X2JhY2tncm91bmRfY29sb3VyOwogICAgZ2V0RWwoImZfc2V0X3NvcnRfb3JkZXIiKS5jaGVja2VkID0gbWluY2VyLnByZWZzLmJvb2xfc2V0X3NvcnRfb3JkZXI7CiAgICBnZXRFbCgiZl90ZXh0X3NpemUiKS52YWx1ZSA9IG1pbmNlci5wcmVmcy5zdHJfdGV4dF9zaXplOwogICAgZ2V0RWwoImZfdGV4dF9jb2xvdXIiKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBtaW5jZXIucHJlZnMuc3RyX3RleHRfY29sb3VyOwogICAgZ2V0RWwoImZfb3ZlcnJpZGVfdGV4dF9jb2xvdXIiKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBtaW5jZXIucHJlZnMuc3RyX292ZXJyaWRlX3RleHRfY29sb3VyOwogICAgZ2V0RWwoImZfYmFja2dyb3VuZF9jb2xvdXIiKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBtaW5jZXIucHJlZnMuc3RyX2JhY2tncm91bmRfY29sb3VyOwogICAgZ2V0RWwoImZfc29ydF9vcmRlciIpLnNlbGVjdGVkSW5kZXggPSBtaW5jZXIucHJlZnMuaW50X3NvcnRfb3JkZXI7CiAgICBnZXRFbCgiZl9zZXRfbWVzc2FnZV90aW1lc3RhbXAiKS5jaGVja2VkID0gbWluY2VyLnByZWZzLmJvb2xfc2V0X21lc3NhZ2VfdGltZXN0YW1wOwogICAgZ2V0RWwoImZfc2V0X2hpZGVfYmxvY2tlZCIpLmNoZWNrZWQgPSBtaW5jZXIucHJlZnMuYm9vbF9zZXRfaGlkZV9ibG9ja2VkOwogICAgZ2V0RWwoImZfc2V0X2hpZGVfZHVwbGljYXRlX21lc3NhZ2VzIikuY2hlY2tlZCA9IG1pbmNlci5wcmVmcy5ib29sX3NldF9oaWRlX2R1cGxpY2F0ZV9tZXNzYWdlczsKICAgIGdldEVsKCJmX2hpZGVfZHVwbGljYXRlX21lc3NhZ2VzX21pbl9sZW5ndGgiKS52YWx1ZSA9IG1pbmNlci5wcmVmcy5pbnRfaGlkZV9kdXBsaWNhdGVfbWVzc2FnZXNfbWluX2xlbmd0aDsKICAgIGdldEVsKCJmX3NldF9oaWdobGlnaHRfa2V5d29yZHMiKS5jaGVja2VkID0gbWluY2VyLnByZWZzLmJvb2xfc2V0X2hpZ2hsaWdodF9rZXl3b3JkczsKICAgIGdldEVsKCJmX3NldF9oaWdobGlnaHRfaW5jbHVkZV9teV9uaWNrbmFtZSIpLmNoZWNrZWQgPSBtaW5jZXIucHJlZnMuYm9vbF9zZXRfaGlnaGxpZ2h0X2luY2x1ZGVfbXlfbmlja25hbWU7CiAgICBnZXRFbCgiZl9oaWdobGlnaHRfa2V5d29yZHMiKS52YWx1ZSA9IG1pbmNlci5wcmVmcy5zdHJfaGlnaGxpZ2h0X2tleXdvcmRzOwogICAgZ2V0RWwoImZfaGlnaGxpZ2h0X2NvbG91ciIpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IG1pbmNlci5wcmVmcy5zdHJfaGlnaGxpZ2h0X2NvbG91cjsKICAgIGdldEVsKCJmX2NoYW5uZWxzX2F1dG9qb2luIikudmFsdWUgPSBtaW5jZXIucHJlZnMuc3RyX2NoYW5uZWxzX2F1dG9qb2luOwogICAgZ2V0RWwoImZfc2V0X3Byb3Blcl9jYXNlIikuY2hlY2tlZCA9IG1pbmNlci5wcmVmcy5ib29sX3NldF9wcm9wZXJfY2FzZTsKICAgIGdldEVsKCJmX3NldF9hY3Rpb25fY29sb3VyIikuY2hlY2tlZCA9IG1pbmNlci5wcmVmcy5ib29sX3NldF9hY3Rpb25fY29sb3VyOwogICAgZ2V0RWwoImZfYWN0aW9uX2NvbG91ciIpLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IG1pbmNlci5wcmVmcy5zdHJfYWN0aW9uX2NvbG91cjsKICAgIGdldEVsKCJmX3NldF9oaWRlX215X25pY2tuYW1lIikuY2hlY2tlZCA9IG1pbmNlci5wcmVmcy5ib29sX3NldF9oaWRlX215X25pY2tuYW1lOwogICAgZ2V0RWwoImZfc2V0X2N1c3RvbV92aWV3X3Byb2ZpbGVfdXJsIikuY2hlY2tlZCA9IG1pbmNlci5wcmVmcy5ib29sX3NldF9jdXN0b21fdmlld19wcm9maWxlX3VybDsKICAgIGdldEVsKCJmX2N1c3RvbV92aWV3X3Byb2ZpbGVfdXJsIikudmFsdWUgPSBtaW5jZXIucHJlZnMuc3RyX2N1c3RvbV92aWV3X3Byb2ZpbGVfdXJsOwogICAgZ2V0RWwoImZfc2V0X2RlYnVnX3dpbmRvdyIpLmNoZWNrZWQgPSBtaW5jZXIucHJlZnMuYm9vbF9zZXRfZGVidWdfd2luZG93OwogICAgZ2V0RWwoImZfc2V0X3NhdmVfd2luZG93X2xheW91dCIpLmNoZWNrZWQgPSBtaW5jZXIucHJlZnMuYm9vbF9zZXRfc2F2ZV93aW5kb3dfbGF5b3V0OwogICAgZ2V0RWwoImZfc2V0X2hpZGVfb2xkX2FjdGlvbl9tZXNzYWdlcyIpLmNoZWNrZWQgPSBtaW5jZXIucHJlZnMuYm9vbF9zZXRfaGlkZV9vbGRfYWN0aW9uX21lc3NhZ2VzOwogICAgZ2V0RWwoImZfc2V0X2hpZGVfYWR2ZXJ0aXNpbmdfYmFubmVyIikuY2hlY2tlZCA9IG1pbmNlci5wcmVmcy5ib29sX3NldF9oaWRlX2FkdmVydGlzaW5nX2Jhbm5lcjsKICAgIAogICAgLy8gdGhpcyBzZXR0aW5nIGlzIGludmVydGVkCiAgICBnZXRFbCgiZl9kaXNhYmxlX3N0YXR1c19jaGFuZ2UiKS5jaGVja2VkID0gIW1pbmNlci5wcmVmcy5kaXNhYmxlX3N0YXR1c19jaGFuZ2U7CiAgCiAgICAvLyBoaW50IGZvciB0aGUgJ3NldCBjdXJyZW50IHRleHQgY29sb3VyJyBidXR0b24KICAgIGlmIChtaW5jZXIuY2hhbm5lbCAmJiBtaW5jZXIuY2hhbm5lbC5lZGl0b3IpIHsKICAgICAvLyBnZXQgdGhlIGRvY3VtZW50IGZyb20gdGhlIGVkaXRvciBpZnJhbWUKICAgICB2YXIgZWxfZWRpdG9yID0gbWluY2VyLmNoYW5uZWwuZWRpdG9yLmNoaWxkTm9kZXNbM10uZmlyc3RFbGVtZW50Q2hpbGQuY29udGVudERvY3VtZW50OwogICAgIGlmIChlbF9lZGl0b3IpIHsKICAgICAgdmFyIGFsbF9mb250X2VscyA9IGVsX2VkaXRvci5nZXRFbGVtZW50c0J5VGFnTmFtZSgiZm9udCIpOwogICAgICBpZiAoYWxsX2ZvbnRfZWxzICYmIGFsbF9mb250X2Vscy5sZW5ndGggPiAwKSB7IC8vIHNvbWUgdGV4dCBoYXMgYWxyZWFkeSBiZWVuIHR5cGVkCiAgICAgICAvLyB1c2UgdGhlIGNvbG91ciBvZiB0aGUgbGFzdCBmb250IGVsZW1lbnQKICAgICAgIG1pbmNlci5kZWJ1Z19sb2coIkluZm8sICIrYWxsX2ZvbnRfZWxzLmxlbmd0aCsiIGZvbnQgZWxlbWVudHMiKTsKICAgICAgIGdldEVsKCJjdXJyZW50X2NvbG91ciIpLnN0eWxlLmNvbG9yID0gYWxsX2ZvbnRfZWxzW2FsbF9mb250X2Vscy5sZW5ndGgtMV0uY29sb3I7CiAgICAgIH0KICAgICAgZWxzZSB7IC8vIG5vIHRleHQgdHlwZWQ7IHVzZSBjdXJyZW50IHByZWZlcmVuY2VzIGNvbG91cgogICAgICAgbWluY2VyLmRlYnVnX2xvZygiSW5mbywgbm8gZm9udCBlbGVtZW50cyIpOwogICAgICAgZ2V0RWwoImN1cnJlbnRfY29sb3VyIikuc3R5bGUuY29sb3IgPSBtaW5jZXIucHJlZnMuc3RyX3RleHRfY29sb3VyOwogICAgICB9CiAgICAgIAogICAgIH0KICAgIH0KICAgIAogICAgLy8gYWRkIGxpc3RlbmVycyB0byB0aGUgYWN0aW9uIGJ1dHRvbnMKICAgIGdldEVsKCJidG5fZm9ybV9jYW5jZWwiKS5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsIGZvcm1fY2FuY2VsLCBmYWxzZSk7CiAgICBnZXRFbCgiYnRuX2Zvcm1fYXBwbHkiKS5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsIGZvcm1fYXBwbHksIGZhbHNlKTsKICAgIGdldEVsKCJidG5fZm9ybV9zYXZlIikuYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCBmb3JtX3NhdmUsIGZhbHNlKTsKICAgIGdldEVsKCJidG5faGVscCIpLmFkZEV2ZW50TGlzdGVuZXIoImNsaWNrIiwgaGVscCwgZmFsc2UpOwogICAgZ2V0RWwoImJ0bl91c2VfY3VycmVudF9jb2xvdXIiKS5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsIHNldF9jdXJyZW50X2NvbG91ciwgZmFsc2UpOwogICAgZ2V0RWwoImJ0bl91cGRhdGVfY2hlY2siKS5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsIHVwZGF0ZV9jaGVjaywgZmFsc2UpOwogICB9OwogICAKICAvLyBkZWxheSBhcHBseWluZyBwcmVmZXJlbmNlcyB1bnRpbCBkb2N1bWVudCBib2R5IGlzIGZ1bGx5IGxvYWRlZAogICB2YXIgdGFyZ2V0ID0gd2luZG93LmFkZEV2ZW50TGlzdGVuZXIgPyB3aW5kb3cgOiAoZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lciA%2FIGRvY3VtZW50IDogbnVsbCk7CiAgIGlmICh0YXJnZXQpCiAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigibG9hZCIsIHByZXBhcmVfcHJlZmVyZW5jZXNfZm9ybSwgZmFsc2UpOwogICBlbHNlCiAgICBtaW5jZXIuZGVidWdfbG9nKCJFcnJvciwgdW5hYmxlIHRvIGFkZCAnbG9hZCcgZXZlbnQgbGlzdGVuZXIgdG8gcHJlZmVyZW5jZXMgZGlhbG9nIHdpbmRvdyIpOwogIDwvc2NyaXB0PgogIDxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCiAgYm9keSwgZm9ybSwgcCwgbGVnZW5kIHtmb250LXNpemU6OXB0O30KICBoMSB7Zm9udC1zaXplOiAxMnB0O30KICAud2FybmluZyB7Y29sb3I6cmVkO2ZvbnQtd2VpZ2h0OmJvbGQ7fQogIDwvc3R5bGU%2BCiA8L2hlYWQ%2BCiA8Ym9keT4KICA8aDE%2BTWluY2VyIHY8c3BhbiBpZD0ibWluY2VyX3ZlcnNpb24iPjwvc3Bhbj4gUHJlZmVyZW5jZXM8L2gxPgogIDxwPkdheWRhciBDaGF0IHZlcnNpb246IHY8c3BhbiBpZD0iZ2F5ZGFyX3ZlcnNpb24iPjwvc3Bhbj48L3A%2BCiAgPHAgY2xhc3M9Indhcm5pbmciPlByZWZlcmVuY2VzIGRpYWxvZyBpcyB1bmRlciBkZXZlbG9wbWVudC4gQ29sb3VyIHZhbHVlcyBjYW5ub3QgY3VycmVudGx5IGJlIGNoYW5nZWQgaGVyZSAoYnV0IGNhbiBpbiA8YSBocmVmPSJhYm91dDpjb25maWciPmFib3V0OmNvbmZpZzwvYT4pLjwvYT48YnIvPgogICBUaGlzIHdhcm5pbmcgd2lsbCBiZSByZW1vdmVkIHdoZW4gdGhpcyBkaWFsb2cgaXMgZnVsbHkgZnVuY3Rpb25hbC48L3A%2BCiAgPGZvcm0gaWQ9InByZWZlcmVuY2VzIiBhY3Rpb249IiIgbWV0aG9kPSIiPgogIDxmaWVsZHNldCBpZD0iZ19jaGFubmVscyI%2BCiAgIDxsZWdlbmQ%2BQ2hhbm5lbHM8L2xlZ2VuZD4KICAgPHA%2BCiAgICA8bGFiZWw%2BPGlucHV0IHR5cGU9ImNoZWNrYm94IiBpZD0iZl9zZXRfc29ydF9vcmRlciIvPiBTZXQgc29ydCBvcmRlcjwvbGFiZWw%2BCiAgICAgPHNlbGVjdCBpZD0iZl9zb3J0X29yZGVyIiBzaXplPSIxIj4KICAgICAgPG9wdGlvbiB2YWx1ZT0iMCI%2BQS1aPC9vcHRpb24%2BCiAgICAgIDxvcHRpb24gdmFsdWU9IjEiPlotQTwvb3B0aW9uPgogICAgICA8b3B0aW9uIHZhbHVlPSIyIiBzZWxlY3RlZD0ic2VsZWN0ZWQiPk5ld2VzdCBhdCB0b3A8L29wdGlvbj4KICAgICAgPG9wdGlvbiB2YWx1ZT0iMyI%2BTmV3ZXN0IGF0IGJvdHRvbTwvb3B0aW9uPgogICAgIDwvc2VsZWN0Pjxici8%2BCiAgICA8bGFiZWw%2BPGlucHV0IHR5cGU9ImNoZWNrYm94IiBpZD0iZl9zZXRfaGlkZV9teV9uaWNrbmFtZSIvPiBIaWRlIG15IG5pY2tuYW1lIGZvciBteSBtZXNzYWdlczwvbGFiZWw%2BPGJyLz4KICAgIDxsYWJlbD48aW5wdXQgdHlwZT0iY2hlY2tib3giIGlkPSJmX3NldF9tZXNzYWdlX3RpbWVzdGFtcCIvPiBQcmVmaXggbWVzc2FnZXMgd2l0aCB0aW1lLXN0YW1wPC9sYWJlbD48YnIvPgogICAgPGxhYmVsPjxpbnB1dCB0eXBlPSJjaGVja2JveCIgaWQ9ImZfc2V0X2hpZGVfYmxvY2tlZCIvPiBIaWRlIG1lc3NhZ2VzIGZyb20gYmxvY2tlZCBvciBpZ25vcmVkIHVzZXJzPC9sYWJlbD48YnIvPgogICAgPGxhYmVsPjxpbnB1dCB0eXBlPSJjaGVja2JveCIgaWQ9ImZfc2V0X2hpZGVfb2xkX2FjdGlvbl9tZXNzYWdlcyIvPiBIaWRlIG9sZGVyIGFjdGlvbnMgKGpvaW4vcGFydCBtZXNzYWdlcyk8L2xhYmVsPjxici8%2BCiAgICA8bGFiZWw%2BPGlucHV0IHR5cGU9ImNoZWNrYm94IiBpZD0iZl9zZXRfaGlkZV9kdXBsaWNhdGVfbWVzc2FnZXMiLz4gSGlkZSBkdXBsaWNhdGUgKHNwYW0pIG1lc3NhZ2VzPC9sYWJlbD4gPGxhYmVsPnRoYXQgaGF2ZSBhIG1pbmltdW0gb2YgPGlucHV0IHR5cGU9dGV4dCIgaWQ9ImZfaGlkZV9kdXBsaWNhdGVfbWVzc2FnZXNfbWluX2xlbmd0aCIgc2l6ZT0iMiIvPiBjaGFyYWN0ZXJzPC9sYWJlbD48YnIvPgogICAgPGxhYmVsPjxpbnB1dCB0eXBlPSJjaGVja2JveCIgaWQ9ImZfc2V0X2hpZ2hsaWdodF9rZXl3b3JkcyIvPiBIaWdobGlnaHQga2V5d29yZHM8L2xhYmVsPiA8bGFiZWw%2Bd2l0aCA8aW5wdXQgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6Ymx1ZTsiIHR5cGU9InRleHQiIGlkPSJmX2hpZ2hsaWdodF9jb2xvdXIiIHNpemU9IjEiLz48L2xhYmVsPiA8bGFiZWw%2BPGlucHV0IHR5cGU9ImNoZWNrYm94IiBpZD0iZl9zZXRfaGlnaGxpZ2h0X2luY2x1ZGVfbXlfbmlja25hbWUiLz4gSW5jbHVkZSBteSBuaWNrbmFtZSAoPHNwYW4gaWQ9Im5pY2tuYW1lIj5Vbmtub3duPC9zcGFuPikuPC9sYWJlbD48YnIvPgogICAgPGxhYmVsPktleXdvcmRzIDxpbnB1dCB0eXBlPSJ0ZXh0IiBpZD0iZl9oaWdobGlnaHRfa2V5d29yZHMiIHNpemU9IjIwIi8%2BIChSZXF1aXJlcyBhIDxhIGhyZWY9Imh0dHA6Ly93d3cucmVndWxhci1leHByZXNzaW9ucy5pbmZvLyIgdGFyZ2V0PSJtaW5jZXJfaGVscCI%2BUmVndWxhciBFeHByZXNzaW9uKTwvYT48L2xhYmVsPjxici8%2BCiAgICA8bGFiZWw%2BPGlucHV0IHR5cGU9ImNoZWNrYm94IiBpZD0iZl9zZXRfcHJvcGVyX2Nhc2UiLz4gQ29udmVydCBVUFBFUkNBU0UgbWVzc2FnZXMgdG8gUHJvcGVyIGNhc2U8L2xhYmVsPjxici8%2BCiAgIDwvcD4KCiAgIDxmaWVsZHNldCBpZD0iZ19jc3Nfc3R5bGVzIj4KICAgIDxsZWdlbmQ%2BQ1NTIHN0eWxlczwvbGVnZW5kPgogICAgPGxhYmVsPjxpbnB1dCB0eXBlPSJjaGVja2JveCIgaWQ9ImZfc2V0X3RleHRfc2l6ZSIvPiBTZXQgdGV4dCBzaXplPC9sYWJlbD4gPGxhYmVsPnRvIDxpbnB1dCB0eXBlPSJ0ZXh0IiBpZD0iZl90ZXh0X3NpemUic2l6ZT0iMTAiLz48L2xhYmVsPiA8bGFiZWw%2BPGlucHV0IHR5cGU9ImNoZWNrYm94IiBpZD0iZl9zZXRfdGV4dF9ib2xkIi8%2BIE1ha2UgdGV4dCBib2xkPC9sYWJlbD48YnIvPgogICAgPGxhYmVsPjxpbnB1dCB0eXBlPSJjaGVja2JveCIgaWQ9ImZfc2V0X3RleHRfY29sb3VyIi8%2BIFNldCBteSBtZXNzYWdlIHRleHQgY29sb3VyPC9sYWJlbD4gPGxhYmVsPnRvIDxpbnB1dCBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjpibHVlIiB0eXBlPSJ0ZXh0IiBpZD0iZl90ZXh0X2NvbG91ciIgc2l6ZT0iMSIvPjwvbGFiZWw%2BIDxsYWJlbD4odXNlIDxzcGFuIGlkPSJjdXJyZW50X2NvbG91ciI%2BY3VycmVudCBjb2xvdXI8L3NwYW4%2BIDxidXR0b24gaWQ9ImJ0bl91c2VfY3VycmVudF9jb2xvdXIiIHZhbHVlPSJzZXRfY3VycmVudF9jb2xvdXIiIHR5cGU9InN1Ym1pdCI%2BU2V0PC9idXR0b24%2BKTwvbGFiZWw%2BPGJyLz4KICAgIDxsYWJlbD48aW5wdXQgdHlwZT0iY2hlY2tib3giIGlkPSJmX3NldF9vdmVycmlkZV90ZXh0X2NvbG91ciIvPiBPdmVyLXJpZGUgcmVjZWl2ZWQgbWVzc2FnZXMgdGV4dCBjb2xvdXI8L2xhYmVsPiA8bGFiZWw%2BdG8gPGlucHV0IHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOmJsdWUiIHR5cGU9InRleHQiIGlkPSJmX292ZXJyaWRlX3RleHRfY29sb3VyIiBzaXplPSIxIi8%2BPC9sYWJlbD48YnIvPgogICAgPGxhYmVsPjxpbnB1dCB0eXBlPSJjaGVja2JveCIgaWQ9ImZfc2V0X2JhY2tncm91bmRfY29sb3VyIi8%2BIFNldCBiYWNrZ3JvdW5kIGNvbG91cjwvbGFiZWw%2BIDxsYWJlbD50byA8aW5wdXQgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6Ymx1ZSIgdHlwZT0idGV4dCIgaWQ9ImZfYmFja2dyb3VuZF9jb2xvdXIiIHNpemU9IjEiLz48L2xhYmVsPjxici8%2BCiAgICA8bGFiZWw%2BPGlucHV0IHR5cGU9ImNoZWNrYm94IiBpZD0iZl9zZXRfYWN0aW9uX2NvbG91ciIvPiBTZXQgYWN0aW9uIGNvbG91cjwvbGFiZWw%2BIDxsYWJlbD50byA8aW5wdXQgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6Ymx1ZSIgdHlwZT0idGV4dCIgaWQ9ImZfYWN0aW9uX2NvbG91ciIgc2l6ZT0iMSIvPjwvbGFiZWw%2BPGJyLz4KICAgPC9maWVsZHNldD4KICA8L2ZpZWxkc2V0PgoKICA8ZmllbGRzZXQgaWQ9ImdfY2hhbm5lbF9saXN0Ij4KICAgPGxlZ2VuZD5DaGFubmVsIExpc3Q8L2xlZ2VuZD4KICAgPGxhYmVsPkF1dG8tam9pbiB0aGVzZSBjaGFubmVsczxici8%2BPGlucHV0IHR5cGU9InRleHQiIGlkPSJmX2NoYW5uZWxzX2F1dG9qb2luIiBzaXplPSI0MCIvPiAoY29tbWEtc2VwYXJhdGVkIGxpc3QpPC9sYWJlbD48YnIvPgogICA8bGFiZWw%2BUmVhc29uPGJyLz48aW5wdXQgdHlwZT0idGV4dCIgaWQ9ImZfcmVhc29uIiBzaXplPSI0MCIvPiAoZm9yIGpvaW5pbmcgY2hhbm5lbHMpPC9sYWJlbD48YnIvPgogIDwvZmllbGRzZXQ%2BCgogIDxmaWVsZHNldCBpZD0iZ19taW5jZXJfY29udHJvbCI%2BCiAgIDxsZWdlbmQ%2BTWluY2VyIGNvbnRyb2xzPC9sZWdlbmQ%2BCiAgIDxsYWJlbD48aW5wdXQgdHlwZT0iY2hlY2tib3giIGlkPSJmX3NldF9kZWJ1Z19sb2dnaW5nIi8%2BIERlYnVnIGxvZ2dpbmc8L2xhYmVsPjxici8%2BCiAgIDxsYWJlbD48aW5wdXQgdHlwZT0iY2hlY2tib3giIGlkPSJmX3NldF9kZWJ1Z193aW5kb3ciLz4gVXNlIGRlZGljYXRlZCBkZWJ1ZyBsb2cgd2luZG93IHJhdGhlciB0aGFuIGJyb3dzZXIncyBFcnJvciBDb25zb2xlPC9sYWJlbD48YnIvPgogICA8bGFiZWw%2BPGlucHV0IHR5cGU9ImNoZWNrYm94IiBpZD0iZl9kaXNhYmxlX3N0YXR1c19jaGFuZ2UiLz4gV3JpdGUgZGVidWcgbWVzc2FnZXMgdG8gdGhlIHN0YXR1cyBiYXI8L2xhYmVsPgogIDwvZmllbGRzZXQ%2BCgogIDxmaWVsZHNldCBpZD0iZ19taXNjZWxsYW5lb3VzIj4KICAgPGxlZ2VuZD5NaXNjZWxsYW5lb3VzPC9sZWdlbmQ%2BCiAgIDxsYWJlbD48aW5wdXQgdHlwZT0iY2hlY2tib3giIGlkPSJmX3NldF9oaWRlX2FkdmVydGlzaW5nX2Jhbm5lciIvPiBIaWRlIGFkdmVydGlzaW5nIGJhbm5lcjwvbGFiZWw%2BPGJyLz4KICAgPGxhYmVsPjxpbnB1dCB0eXBlPSJjaGVja2JveCIgaWQ9ImZfc2V0X3NhdmVfd2luZG93X2xheW91dCIvPiBSZW1lbWJlciB3aW5kb3cgbGF5b3V0PC9sYWJlbD48YnIvPgogICA8bGFiZWw%2BPGlucHV0IHR5cGU9ImNoZWNrYm94IiBpZD0iZl9zZXRfY3VzdG9tX3ZpZXdfcHJvZmlsZV91cmwiLz4gVXNlIGN1c3RvbSBWaWV3IFByb2ZpbGUgVVJMPC9sYWJlbD48YnIvPgogICA8bGFiZWw%2BVVJMIDxpbnB1dCB0eXBlPSJ0ZXh0IiBpZD0iZl9jdXN0b21fdmlld19wcm9maWxlX3VybCIgc2l6ZT0iNDAiLz48YnIvPihpbnNlcnQgPHNwYW4gc3R5bGU9ImZvbnQtd2VpZ2h0OmJvbGQiPntuaWNrbmFtZX08L3NwYW4%2BIGluIFVSTCB3aGljaCB3aWxsIGJlIHJlcGxhY2VkIGJ5IGFjdHVhbCB1c2VyJ3Mgbmlja25hbWUpPC9sYWJlbD48L2JyPgogIDwvZmllbGRzZXQ%2BCgogIDxmaWVsZHNldCBpZD0iZ191cGRhdGVzIj4KICAgPGxlZ2VuZD5VcGRhdGVzPC9sZWdlbmQ%2BCiAgIDxsYWJlbCBpZD0ibGJsX3VwZGF0ZV9jaGVjayI%2BPGJ1dHRvbiBpZD0iYnRuX3VwZGF0ZV9jaGVjayIgdHlwZT0ic3VibWl0Ij5VcGRhdGU8L2J1dHRvbj4gRG8gYSBtYW51YWwgdXBkYXRlIGNoZWNrIG5vdzwvbGFiZWw%2BCiAgPC9maWVsZHNldD4KICAgPGEgaHJlZj0iaHR0cDovL3Vub3J0aG9kb3gubWUvbWluY2VyLyNkb25hdGlvbnMiIHRhcmdldD0iTWluY2VyX0RvbmF0ZSI%2BPGlucHV0IGlkPSJidG5fZG9uYXRlIiBzdHlsZT0idmVydGljYWwtYWxpZ246bWlkZGxlIiB0eXBlPSJpbWFnZSIgc3JjPSJodHRwczovL3d3dy5wYXlwYWwuY29tL2VuX0dCL2kvYnRuL2J0bl9kb25hdGVfTEcuZ2lmIiBib3JkZXI9IjAiIGFsdD0iUGF5UGFsIC0gVGhlIHNhZmVyLCBlYXNpZXIgd2F5IHRvIHBheSBvbmxpbmUuIiB0aXRsZT0iRG9uYXRlIHRvIHRoZSBwcm9ncmFtbWVyJ3MgYmVlciBmdW5kIi8%2BPC9hPgogICA8YnV0dG9uIGlkPSJidG5fZm9ybV9jYW5jZWwiIG5hbWU9ImNhbmNlbCIgdmFsdWU9ImNhbmNlbCIgdHlwZT0ic3VibWl0Ij5DYW5jZWw8L2J1dHRvbj4KICAgPHNwYW4gaWQ9ImNoYW5uZWxfaG9sZGVyIiBzdHlsZT0iZGlzcGxheTppbmxpbmU7Ij4gPGJ1dHRvbiAgaWQ9ImJ0bl9mb3JtX2FwcGx5IiBuYW1lPSJzdWJtaXQiIHZhbHVlPSJhcHBseSIgdHlwZT0ic3VibWl0Ij5TYXZlIGFuZCBBcHBseTwvYnV0dG9uPiB0byA8c3BhbiBpZD0iY2hhbm5lbF9uYW1lIj5BbGwgQ2hhbm5lbHM8L3NwYW4%2BPC9zcGFuPgogICA8YnV0dG9uIGlkPSJidG5fZm9ybV9zYXZlIiBuYW1lPSJzdWJtaXQiIHZhbHVlPSJzYXZlIiB0eXBlPSJzdWJtaXQiPlNhdmU8L2J1dHRvbj4KICAgPGJ1dHRvbiBpZD0iYnRuX2hlbHAiIG5hbWU9InN1Ym1pdCIgdmFsdWU9ImhlbHAiIHR5cGU9InN1Ym1pdCI%2BSGVscDwvYnV0dG9uPgogIDwvZm9ybT4KIDwvYm9keT4KPC9odG1sPg%3D%3D",

  HISTORY_HTML : "data:text/html;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIGh0bWwgUFVCTElDICItLy9XM0MvL0RURCBYSFRNTCAxLjAgVHJhbnNpdGlvbmFsLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL1RSL3hodG1sMS9EVEQveGh0bWwxLXRyYW5zaXRpb25hbC5kdGQiPgo8aHRtbCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCI%2BCiA8aGVhZD4KICA8dGl0bGU%2BTWluY2VyIFZlcnNpb24gSGlzdG9yeTwvdGl0bGU%2BCiAgPG1ldGEgY29udGVudD0iVEoiIG5hbWU9ImF1dGhvciI%2BCiAKIDwvaGVhZD4KIDxib2R5PgogIDxmb3JtIGlkPSJoaXN0b3J5Ij4KICAgPGRpdiBhbGlnbj0iY2VudGVyIj4KICAgIDxoMT48c3BhbiBpZD0iZl9zY3JpcHRfbmFtZSI%2BTWluY2VyPC9zcGFuPiBWZXJzaW9uIDxzcGFuIGlkPSJmX3VwZGF0ZV92ZXJzaW9uIj4wLjAuMDwvc3Bhbj4gSGlzdG9yeTwvaDE%2BCiAgICA8dGV4dGFyZWEgaWQ9ImZfaGlzdG9yeSIgY29scz0iODAiIHJvd3M9IjIwIj4mbmJzcDs8L3RleHRhcmVhPgogICAgPGhyLz4KICAgIDxpbnB1dCB2YWx1ZT0iSW5zdGFsbCIgaWQ9ImJ0bl9pbnN0YWxsIiB0eXBlPSJidXR0b24iLz4KICAgIDxpbnB1dCB2YWx1ZT0iQ2xvc2UiIGlkPSJidG5fY2FuY2VsIiB0eXBlPSJidXR0b24iLz4KICAgIDxoci8%2BCiAgICA8cCBzdHlsZT0iZm9udC13ZWlnaHQ6Ym9sZDtjb2xvcjpyZWQ7Ij5BZnRlciB1cGRhdGluZyByZXN0YXJ0IGNoYXQgdG8gdXNlIHRoZSBuZXcgdmVyc2lvbjwvcD4KICAgPC9kaXY%2BCiAgPC9mb3JtPgogIDxzY3JpcHQgdHlwZT0idGV4dC9qYXZhc2NyaXB0Ij4KICAgdmFyIG1pbmNlciA9IHdpbmRvdy5vcGVuZXIubWluY2VyOwogICBtaW5jZXIuZGVidWdfbG9nKCJJbmZvLCBvcGVuZWQgTWluY2VyIFZlcnNpb24gSGlzdG9yeSBkaWFsb2ciKTsKICAgCiAgIHZhciBnZXRFbCA9IGZ1bmN0aW9uKGlkKQogICB7CiAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpOwogICB9OwoKICAgdmFyIHVwZGF0ZV9jYW5jZWwgPSBmdW5jdGlvbihldmVudCkKICAgewogICAgd2luZG93LmNsb3NlKCk7CiAgIH07CgogICAvKgogICAgKiBpbnN0YWxsIHRoZSB1cGRhdGUgLSB0aGlzIHNob3VsZCBraWNrIG9mIHRoZSBicm93c2VyJ3MgYXV0by1pbnN0YWxsIGhlbHBlcgogICAgKiBHcmVhc2VGaXJlIG9uIEZpcmVmb3ggYW5kIFNlYU1vbmtleS4gQ2hyb21lL0Nocm9taXVtIGRvZXMgaXQgbmF0aXZlbHkuCiAgICAqLyAgIAogICB2YXIgdXBkYXRlX2luc3RhbGwgPSBmdW5jdGlvbihldmVudCkKICAgewogICAgdHJ5IHsKICAgICB3aW5kb3cub3BlbigiaHR0cDovL3VzZXJzY3JpcHRzLm9yZy9zY3JpcHRzL3NvdXJjZS8iKyBtaW5jZXIuc2NyaXB0X2lkICsiLnVzZXIuanMiKTsKICAgICB3aW5kb3cuY2xvc2UoKTsKICAgIH0KICAgIGNhdGNoKGV4KSB7fSAgIAogICB9OwoKICAgLy8gY29weSBzY3JpcHQgZGV0YWlscyBpbnRvIGhlYWRlcgogICBnZXRFbCgiZl9zY3JpcHRfbmFtZSIpLnRleHRDb250ZW50ID0gbWluY2VyLnNjcmlwdF9uYW1lOwogICBnZXRFbCgiZl91cGRhdGVfdmVyc2lvbiIpLnRleHRDb250ZW50ID0gbWluY2VyLnByZWZzLnN0cl9vbl9zaXRlX3ZlcnNpb247CiAgIAogICAvLyBjb3B5IGNoYW5nZWxvZyBmcm9tIHByZWZlcmVuY2VzICAgCiAgIGdldEVsKCJmX2hpc3RvcnkiKS52YWx1ZSA9IGRlY29kZVVSSUNvbXBvbmVudChtaW5jZXIucHJlZnMuc3RyX29uX3NpdGVfdmVyc2lvbl9oaXN0b3J5KTsKICAgLy8gbWFrZSBlbGVtZW50IHJlYWQtb25seQogICBpZiAoZ2V0RWwoImZfaGlzdG9yeSIpLmNvbnRlbnRFZGl0YWJsZSkKICAgIGdldEVsKCJmX2hpc3RvcnkiKS5jb250ZW50RWRpdGFibGUgPSAiZmFsc2UiOwogICBlbHNlCiAgICBnZXRFbCgiZl9oaXN0b3J5IikuZGlzYWJsZWQgPSB0cnVlOwoKICAgLy8gYWRkIGxpc3RlbmVycyB0byB0aGUgYWN0aW9uIGJ1dHRvbnMKICAgZ2V0RWwoImJ0bl9jYW5jZWwiKS5hZGRFdmVudExpc3RlbmVyKCJjbGljayIsIHVwZGF0ZV9jYW5jZWwsIGZhbHNlKTsKICAgZ2V0RWwoImJ0bl9pbnN0YWxsIikuYWRkRXZlbnRMaXN0ZW5lcigiY2xpY2siLCB1cGRhdGVfaW5zdGFsbCwgZmFsc2UpOwogIDwvc2NyaXB0PgogPC9ib2R5Pgo8L2h0bWw%2B",
    
  DEBUG_HTML : "data:text/html;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIGh0bWwgUFVCTElDICItLy9XM0MvL0RURCBYSFRNTCAxLjAgVHJhbnNpdGlvbmFsLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL1RSL3hodG1sMS9EVEQveGh0bWwxLXRyYW5zaXRpb25hbC5kdGQiPgo8aHRtbCB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCI%2BCiA8aGVhZD4KICA8dGl0bGU%2BTWluY2VyIERlYnVnIExvZzwvdGl0bGU%2BCiAgPG1ldGEgY29udGVudD0iVEoiIG5hbWU9ImF1dGhvciI%2BCiA8L2hlYWQ%2BCiA8Ym9keT4KICA8Zm9ybSBhY3Rpb249Imh0dHA6Ly91bm9ydGhvZG94Lm1lL2NnaS1iaW4vbWluY2VyL2RlYnVnX2xvZyIgbWV0aG9kPSJQT1NUIiBuYW1lPSJkZWJ1Z19sb2ciIGlkPSJkZWJ1Z19sb2ciIGVuY3R5cGU9ImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCIgYWNjZXB0LWNoYXJzZXQ9IlVURi04Ij4KICAgPGRpdiBpZD0ibG9nX2NvbnRhaW5lciIgYWxpZ249ImNlbnRlciI%2BCiAgICA8aDE%2BPHNwYW4gaWQ9ImZfc2NyaXB0X25hbWUiPk1pbmNlcjwvc3Bhbj4gVmVyc2lvbiA8c3BhbiBpZD0iZl91cGRhdGVfdmVyc2lvbiI%2BMC4wLjA8L3NwYW4%2BIERlYnVnIExvZzwvaDE%2BCiAgICA8bGFiZWw%2BPGJ1dHRvbiBpZD0iYnRuX3VwbG9hZCIgbmFtZT0idXBsb2FkIiB2YWx1ZT0idXBsb2FkIiB0eXBlPSJzdWJtaXQiPlVwbG9hZDwvYnV0dG9uPiBidWcgcmVwb3J0IHRvIE1pbmNlciBkZXZlbG9wZXJzPC9sYWJlbD4KICAgIDxoci8%2BCiAgICA8bGFiZWw%2BRGVzY3JpcHRpb24gb2YgcHJvYmxlbTxici8%2BCiAgICAgPHRleHRhcmVhIGlkPSJmX3JlcG9ydCIgbmFtZT0iZl9yZXBvcnQiIGNvbHM9IjEwMCIgcm93cz0iMTAiPjwvdGV4dGFyZWE%2BCiAgICA8L2xhYmVsPgogICAgPGhyLz4KICAgIDxsYWJlbD5Mb2c8YnIvPgogICAgIDx0ZXh0YXJlYSBpZD0iZl9sb2ciIG5hbWU9ImZfbG9nIiBjb2xzPSIxMDAiIHJvd3M9IjIwIj48L3RleHRhcmVhPgogICAgPC9sYWJlbD4KICAgPC9kaXY%2BCiAgPC9mb3JtPgogIDxzY3JpcHQgdHlwZT0idGV4dC9qYXZhc2NyaXB0Ij4KICAgdmFyIG1pbmNlciA9IHdpbmRvdy5vcGVuZXIubWluY2VyOwogICAKICAgdmFyIGdldEVsID0gZnVuY3Rpb24oaWQpCiAgIHsKICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7CiAgIH07CgogICB2YXIgYWRkX21lc3NhZ2UgPSBmdW5jdGlvbihtZXNzYWdlKQogICB7CiAgICB2YXIgdGV4dGFyZWEgPSBnZXRFbCgiZl9sb2ciKTsKICAgIGlmICh0ZXh0YXJlYSkgewogICAgIHRleHRhcmVhLnZhbHVlICs9ICJcbiIgKyBtZXNzYWdlOwogICAgfQogICB9OwoKICAgLy8gY29weSBzY3JpcHQgZGV0YWlscyBpbnRvIGhlYWRlcgogICBnZXRFbCgiZl9zY3JpcHRfbmFtZSIpLnRleHRDb250ZW50ID0gbWluY2VyLnNjcmlwdF9uYW1lOwogICBnZXRFbCgiZl91cGRhdGVfdmVyc2lvbiIpLnRleHRDb250ZW50ID0gbWluY2VyLnByZWZzLnN0cl9vbl9zaXRlX3ZlcnNpb247CgogICB2YXIgdGV4dGFyZWEgPSBnZXRFbCgiZl9sb2ciKTsKICAgaWYgKHRleHRhcmVhKSB7IC8vIHByZXZlbnQgZWRpdGluZyBvciBjb3JydXB0aW9uIG9mIHRoZSBsb2cKICAgIG1pbmNlci5kZWJ1Z19sb2coIkluZm8sIHNldHRpbmcgZGVidWcgbG9nIHRleHRhcmVhIHRvIHJlYWQtb25seSIpOwogICAgdGV4dGFyZWEucmVhZE9ubHkgPSB0cnVlOwogICAgaWYgKHRleHRhcmVhLmNvbnRlbnRFZGl0YWJsZSAhPSB1bmRlZmluZWQpCiAgICAgdGV4dGFyZWEuY29udGVudEVkaXRhYmxlID0gImZhbHNlIjsKICAgfQogIDwvc2NyaXB0PgogPC9ib2R5Pgo8L2h0bWw%2B",

  MINCER_16x16_PNG :
   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAABGdBTUEAALGPC%2FxhBQAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAAPYQAAD2EBqD%2BnaQAAAftJREFUOMuFk71uE0EUhb%2BZ2dm1Y4cNJr%2BACSGghIgKgYQCBaKlpET8VVSUPETeIz0NAikNeQEklCpNBCKAEIpikpj17npnLoVjsnYScZuZIx3de%2BbcM4peqcNTTsOqB2TlHrMLF3m5n2GfvuF1cEiW%2FzUSIKrSfP9NP4ms3%2F6R8JYhUv9%2BKp6fszU0i31ctyh9OE2VlMiQkr4a%2FmTdhQDSfvN2FzEnqOhVVG%2FQiJ3O3JQo56enuZkkjHZSPpX55gQPFEBg87sVl%2BouslSvybgUzOzt8U5rlMgRX3O8BKBIow%2BF%2BIfgppWoplSjzwDeD5LN0GSJYi7UasQKd1UclXqV9XZCHCrxWSZfS1wFgx7I6BkmkgOzmuXB4kTs1wphN%2B1wy2haCfojTdOl5Qc802UPDh5c30WpBui5g1xdSTOWVWhNnrMeaD1F5%2FHwdpQZ2PXmjlAx29r7a96aDRBdFCht5afRjLjwy2%2FaqZRzov910%2FY5KnxF6lve8gzvvxe1sQ1qVQEzYsVXcLEa9qy0BTkH%2Fg74KTqF67bdJpgRCcIl72zXOyzZjpq%2FNHtsC72uJnyE0jEwbgO%2FhTAp1UCRJyFjlzddnoWYZtT6tbU%2FFHUUxh4lMay8QJk1pc2qbsT3GTt7A6AaEZzyd0pv0mYw0jPnb6vJieWhoJVzwF%2Fmur6WtJq7QQAAAABJRU5ErkJggg%3D%3D",

  MINCER_16x16_INVERTED_PNG :
   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAAPYQAAD2EBqD%2BnaQAAAf5JREFUOMt9kztvE0EUhc%2Bd3fXauzFBIZFDkIlIQIQIJISEQGlIT4GgoUJAxS%2BAip9BSRdaOiqEAIlINPSAFB7BwRALHMd27H3MzKEAm93Eye3O1b1zjr6ZEQAgKQAgItxPE4AS4YM3nP24gXuHfHgrN%2BS%2BS1IOWszqqMfq2017K05VbSbAM2SHhk4H6LXPSUjDhYHuJBRXRDjKWUQ40IMKfe%2B0BprZGYURJSJk1Jlgo1EwOpqhYfijzktBiHHPka%2FZVPsy0By7kARBraQ5343Q9UuYGj8sT43Jz6tR7gDgFuNXrqirgDNNYVX68RcAULs29jCIWjwWG0jUR0W5%2BNnuY7UcyrkOvSALN2s2bLS3OUWrX1Anj%2BoNVrsdnklS3oxjLnNHh5hz99yOyjIov3zfBDkB2BPlAueKPpaYpI7vy2ttbYWrj4fOg%2BQqF%2Bn6okHMh5bOli%2FapWbb85Q1ESetOA7k2h5m7pCoSe5AWAbUOxXxtlHqlLvT2qDrnUepFKTiFAvOtuxmkDlRjgDqMqAqEnimUHY%2FACYQnSwqJ02VAw%2F%2BpMwfn80lUMNHYfVRWK1AcyVJeNJYLkAKGv7YGn6tJ0Xb7QG16U%2Ff1nMM%2FhLVyf%2F3H%2Ffv0urn1ugn5ndrmVvNswDQi%2BiO%2Bju5a6HRko3H%2BveLdrOxlOsNZv8t%2FwEPCF%2BzI8q7lgAAAABJRU5ErkJggg%3D%3D",

  MINCER_64x64_PNG :
   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABGdBTUEAALGPC%2FxhBQAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAAPYQAAD2EBqD%2BnaQAAESBJREFUeNrVm2uMZcdRx3%2FVfV537mPmznPfu2N7N3b8xDYBE0gcmTgQIB8ibFAkEkCgRIAE%2BcY3bIEiPkRRokhEkSKQCKCgBCkBRCJAmCiOHcdxEsf47cRr73N2dmfmzn2ec7q7%2BDAz9vV4Xrs769gtjXTu6dNd1dXVVf%2BqrgEQQFSVtef1v7fqe7OMX3t%2F330YVQVV87FbOPKX7%2BK6T%2F46137gndTX%2BofHrD28JZuuSmK4Ccin3iUfrdd4f73KWGzIg1C2cxaX%2Bnzi49%2FQJwFERADM2iTrJxv%2BvVmfrrY3cvzw93K%2FmOExH75ZZr%2Fwfvnq4Rn%2B5PAU09MN8kaVQZaQxxH7nOPO9TTeshqwJoh7jskHR4XfeefV%2FLg5xg2NChKUs70uiQjBG9JeDnMdKj9Z4BOffVS%2FPawBb0kBqKrevEeqLeHOkz3UjxzpfmT0%2BB9%2F8FYiY%2FGDPmWnQ8Ub6gFksaA81%2BUzn3xYvy4ioqq6JoBoKyJrHw0%2FXwyTV3J8Txg5fYG7qhUWlsPiP%2F1fiweue5lfzSoUvT4HCkfsYbmA7z%2Fd5dNfe0Ln2ICHaG3y9QQ3OnvrGVrrf6PHA%2FS6aJryY%2B%2Fp0i9vyGrc1S4480KLT1%2FoY7se93iDE2cf1%2B6wyr%2BOj82OwJtZA1RVZ2clW%2Bpwd5EjfsDe90xRfuOU%2Fp1C4PWuQWSLky6b%2BdTt%2FO5Wf1dyvKqiqkzv5X024w8nR7ldVbkPDKubulP6ZjN128pN%2FTT7h7UhlORGicoSBbgPFJGLmt%2B84g6GVGz43Zutf9h2JIbSlwSfUH2NSl%2FE%2FGbTc7HBgItpV268rr6716ZVRkQorJINHeeLom%2Feav5fdUUCt9zy5Xo3pxpFpEWP1mukcxHtLQWFRUTuX4W%2Fi4tc5UpS76n1S%2Ba2ihO2ov%2BWQYLD2OHoXpkqU35pocWoyxnt9%2FmcquaXctzMdlLaru%2BNGf%2Fqu1tvlSlq3Nrq4POSPVb50UaL3yl980bt3Mbn%2BdW2%2Fpt1hk8BDs3I1UtL3NHpMFoE9keec%2B2%2B%2Fo%2FI%2FWbYO1yUsb2SR2AjyDtE0wDmyBHk%2BHGcqrrVb4yqhvVA7ugsN3ccVxcF1UGfaXGc7PT553VzX3QTVX0dFt8JFN0Oyw8%2FH5Wj6QvVVpPxrqEwDtPpcAZhaqrOfDslVUue2wqVQZ%2B%2BBXorlKZ6quc61xyRX%2BgV3FB6JM9pxIFvX1jWh9bjgkvh%2F4ppwCtMZdlViL0T9afJ88ev4ZqFF257IXC23mC%2BOoPp78W5GPJQid1SFNGKq9iigCInqiaMxjE3AiHPGR0EvjpY1mfXNGWjzbskI3ilmrX528BNE%2FL9WUb6Ai94HiOwEFcIxRghNDChTkSIIDIp1Sgiqo5gJ8YZ7RdcDVDm1EPBg4NlfXa9z7%2FUxV%2FRfMBaG7E82g9FaTMqkVK7BuzzqrmItIhQfOqIfB9xfRfjRiKisqRMYlhcxJSBZVFM6aHdW5fN2YKnnfK%2FoQ3YzJpeTDw%2F%2FFypyGETc1NRUGQxhfH0C2VElTjP7QiWgkRaWHdhPKHd6TBWBMbHaow3Gkx320wMCr7e6egPh3nZLp%2BwE%2F6jzYKFrSS4VYCxnjmAfl9fimM5JDE%2F44SWyViwhl4sDOLYF5qQlgUzRcHBVsemHh%2FZGG8zVBU7cOTdBs%2BtzI2sma3t6O%2BE%2FzckFhBBjh3jEV8SFwUjGsg0kBSeqmRUncMgBGuIvcVi6VUjnoyhokqJcEZPa29dvLMr7YrmA16VtvDkk1qI5engqWugAZjgaQ76jLuSWpGTeI8QG4e1PrJ0owgPGAeLsve6IxvRuVz%2Br3g%2B4DUeQTluDJkqVV9yQD3T3tEwQgOIEDsAKW3hbbXJfmvpiLCcJZwjX%2FhFaTbH1gdHl8vfZecD1kt7PbQd3oVGgxNZxIXUcE4LJn3OQeOZ9p7GCuCjT%2FADExOfn2M0BPY6xR6scyrTcw8y2di%2F2%2FkIc7lgZ9jg7d8vk%2BN1uWEVpLyy8PvlfjM1JfUSjsUZAw97QsA6xwUgGE%2BEx4MMkGggFtcveP5Ci6di5VCZM6aeG2nVkt22TxumxXcCJddZW9No8I7RjPlCibB8YGJCvmctS8vL7AsVxpKSetmnZiI0BGrAaBRxtlbjH43BdXKaqi4tC1fF0LSW63s9zreguhR4r3c8xUzx1IZo8zKg%2FCVB4eEJxg5LszvHOxyp4vN%2BtUa70WSxbFO229ziHHjDuUoFS484KKMOaiKcq9V4sVZj%2BY476DSb6PHvkDz8IvvLkj2qZM6RjYxwfSh5qTvgS2vQd1c91JoAdirB4cVPTEhjoYxuIEgPRShLZWTUUPSifc3ybFHg8sBhLUg0p6UxsTF0s4wlEYJzJBWgsLgQsCFg8pz93jNlLSPOkYrwnTzXZza73Ngs7N6JBmwJhbcyLqsTJMRcR5yUhPxmnNyEj2%2BnV%2FwLEs6dXop9Vcri6BRPv7zM20thUKlwxvsVmiFgRQhdT%2BIKxr2nEQKTgAUS5xgPgQXnVha%2FXuV3zQZsZim3y8o2GtRcl%2Ble2TuAS%2B4GDgHHce73wb4E%2FIMkzL28zFIInHaOPSIs2JXdNs5R8Z6Kc8zoCiyurNgkKkBqLUtpyg8AZLY5xrmlCkLgZ%2B%2B8oKpu6wTK1l7gNX2Xmg%2FIGnIMx6%2FkA7kLYoeWRxD7IqrTCIqRKI3cXyUWe%2FU0D553HGzNk0cjDMqShnPMhMC49xhriVVJgSBC2xjmrOX5TkfPikhKg4PkKKZSMNE%2Frye0v1UscDFGMNoMtGznR2Ml8QlnZKB7ldABazDUiNI5Cj8K2smD%2Bd08Np8%2Fs%2BiaccIgCIf6fYoQmABqqoj3WCBYy5IInTjmVKfDk2uLO3AAs7REUkKR98Vx8hJ2eZO%2By4oFOr7SKgNnRYgw1hHJgDg7gS%2B%2Bh4YFgniC2UuJJWPalxQCAc%2BsKo3VHY%2FTlIU0YkmE0hiWOp3bnh2GrSdPIkmC5GkKE2q4aWZX4xezk%2FqbjcPLfnBUvAg5wTfxKGp6NnInsS4itpbAGCKHi4KkIqjE1ApPBmgUsWAMZ11grJfUm0Tkaqirfq8cpjI1hSkKQkoOTMCZSdmpq96a%2F8sIhgCoskx1pFTlUcBjUVx%2BradxN%2FHY8wQfYewizh9YtJP9XsqMtUxmGadMzGKh1Es46kfGexjTTxVr4XYRmR0mMz%2BPFAWa5yjaE%2Bad%2FNSDIQCd1zbE8yHiIdRFuLAXMT18cQzXvQasIFoDuhRqez2OGcPpPNDMS6Y9cRxC3MV7i8srRUGe9wmx5d3DdJpNTFEAabpS3tasmWE%2Br1gwtKNWdKqMT%2FwYwzcgdBAdRYOFyKClBTNPtf44mRpjeDCDtvEYyBQfPIScwis2KRwYlySnvZIO8xXCal2fIqgKemFXkaC5lPv5V0YvdE7RbbeZmfwq6JetG4B3ddSnqOxHi5ewoY2q9Z6bWo7DpcVYGXSrFV8SKKGAcuCcQxkUS5JRDtumVgtpNolWhNA3hONmN4%2FAJZXIvC4nuGf8RgJjdBb3VwLvRNnr4UdFtfkAcezjzrmb8GiptlNPfcsZMg%2B2As1BQZwXnMcmIQpFSxMO%2BB5%2Fr6rFqppOVKvsE8F3HD3G6x09tXx%2BOzS446ToVsHQ%2BoVuCZH3NQ%2FTd1fZojNiIS7i0R6OwKA1Olbn%2FFLPzmCtQbSOJN%2FBmNMM2ldXM653BSdzZ5skNlhfqC%2F4D1XtA9TrMq3KXhF8aenlabWrc5253YLDO3GDO7IVenrxJSr1R7ypHS8K%2BgwGceRb%2Bb4Zvuk9xciIzzE6Yyhn6Haf1eXlC1rod7u2vghEeP8sGqfe25yhQqcsw6piVFc3S0dkO9d22fmA4XeqGmZlNosiea%2F3NgPfgFjAWwg1a3nee76pqi09fboHPLn6tya9CUbSSSRqZKZb8cJ%2F%2BVX1XpFc6ORx5dqxqH96KfenqFYPTCbLCZAD9Hqv3CNKmmDyEOxu5gO2S4tb4L1Y%2BxE0PoeVWbzpIxJBrIB45RBS%2FJ7E8ae0LL%2B1wR3dBeDfpF6fHnToqq7U7VWacniQVhskI03iOFta9NfOTAwemFuWG%2FqeI8ATq14gSg3iQPJlwKjsJhSOtrzGTmpvwxcfw8hZgu4Dc4pIWgQqGDkPwRD8Pozp48I9IvKQqvqNQldVPbf6O2bP9J8ST9%2BN1wmsfxxCnzTJu91iKpH%2BCe9pxrHcUZb6sCqRKgZB8hwY729rtHcvHxA600haIxiHhuMY5wiRxzBHoEDCbWgYQcMU6KNri9%2FoJmY4OYxKifp5nC9QaYP1JCO%2BE9ytqA2x755IU06vN9QpqeQ9lY2u0Hc1H%2FAKw06%2FCdFBLPcgZgyVDHUFXo1oqCmcx8hTkdHPlqX%2B91Y3NUNzD4DPyM8fbfD02Y9jslFs%2BghChSIao5SRsuRfi0LbAGm6IoCij5TkSpYJg9d7rkvNB2xoBF%2B7c%2B6LwBdHRcaXbfxBxMwQwoSa5AzinovEn7eWcyKSqGqxVRrtNRw%2F8sKAmcllSjdOyMdxLsWHNogB4rXP8hyMgSRBy7IuDGrAGbmiRnDdIAE%2BDOZ2lBFQizGC%2BsOofbdDnPM4jF1KEvmcqj622Q6sMCwCqrdxmz5m5ufxC5MU%2BQhie8Q2gF0Cuq%2BYoZWbIVVFSAvIgOuH6wGRlVmvQD5AVRXLvZjkbozNQBR0CSMLGDuP%2BJ8AJSIlhLT05g82qwF6dbfuE4AfVh%2F7LfKloxi1FHmdwaBO0OMYfUJXrs8jkQMTbSURwUuJkucBqSjPzI6L7KmuVg%2BpiF6%2BDdgcKpkpvHaRqA%2B%2BCraCSoLKMkSGSC4AFu8NSNgmobrqw%2F8Cn1TBu5dxOobYksS8yIh%2FnlOdruy7fYRDb5%2Blfcbg0qJXJCVZqkRZn7JWEiRmurpH9t9ecvo3Tqrep%2Btx4U6h8Jb%2FL7Bis6s%2FJJbb8CZHPahXwCHaxJs2vqiDVTALZPFfv%2BcGqT16nFkP07GhcH2czVi245xW1cVXKUcDfDJAyjGC9YT8VJbktq%2B6KPtuPUxpPa63khxJ24G8ErCiSOGxJZxTSy2vcuALKWh%2F%2BBhczP8rRNvd9avqt0QaT5G4XwauBakT2QquKPG%2Bh4kex4bvjsaFGXg%2B9L9PmutMFOaCMwcHsABhmp5xdMLJOJa%2BrfClwbI%2BR%2FCBWhKxWAjiJcrL6p%2B%2FeN9KAcT4Dy5w4cgk2YGINId5E5AioIkl1ZSORky7iP78vJ5Y7m90xndaH7BlNLhRscOGaiRyjxf7R0b89zXYq8T4l0VIfZBJI%2FpsIKpEuNwF06xUwvNvH%2BNzj4XmXUia0e4eBqcHmv2%2FOTGU7b33XrFffpCUHmnVkQDS7eJg1ENWwNxgGHdsdVFyWSUyrwpgxXpvfLbtn2G4BuwEoXzGwHgAE0XkLpjpyIT54JgwhmeAMRv42%2FwaXmKh%2FiGcHb1jufb5h%2FREf7sSl52UvVxsiYzZ6f2%2ByKsppuFUEwBjzZfJqjUsC9j42oCdTiLmXKCRmPBsCHSDjdURH3FEFwaqz%2BFnj1AdbxLJvoffJs2N4LNs0bYrkdlxyuxyak5eY0BHZ95HCD%2BHc0cIfgxfjBOIMNLHmBOgT1C6h1SLR2Rm7GqS%2Bm%2FS6y1gbQuJxjD9%2F9Qzi8d3%2B%2BrripbKbpQwEZGMsbGMJb%2FiYptRyeLNXdUHVkphx8dHGZ38bdqtnp6f%2ByKATE3dSZYdYyz%2Bmj7xk7k3UgCXXB%2Bwpl4bVGIPgMGmFK%2B6Cs6fn8Iv%2FvtHb5e4uBFbT3mi7Q7exnxvFlZq%2Fy%2BnVPdNUSq7hcbETE%2F%2FGlE6TvBTlLkSRZbSn8eXX9GlpcWfyhG41Hj6YuNxVVU5KimtA4co2qNEamlri6J9UlU7OwmmdrM%2B4P8BCCYKbITq%2BosAAAAASUVORK5CYII%3D"

 };


/*
 * Execution starts here
 */


// keep alive by ensuring a reference is held - accessed by child windows such as Preferences
unsafeWindow.mincer = mincer;
// Read stored preferences
mincer.prefs.init();
// General initialisation tasks
mincer.init();


if (mincer.regexp_channel.test(window.location.pathname)) {
 mincer.debug_log("Info, creating channel objects");
 // create an empty object for the channel
 mincer.channel = {};
 mincer.channel.target = null;
 mincer.channel.chatLogContent = null;
 mincer.channel.channel_display_name = unsafeWindow._channelDisplayName;
 mincer.channel.nickname = null;
 mincer.channel.message_hash_table = {};
 mincer.channel.editor = document.getElementByXPath("//div[@id='editor']");

 /*
  * Convert message to "Proper case" (helpful for ALL CAPITALS messages)
  */
  mincer.proper_case = function(sentence)
  {
   var words = sentence.toLowerCase().split(' ');
   var proper = '';
    for(i=0; i < words.length; i++)
     if (i == 0)
       proper += words[i].charAt(0).toUpperCase() + words[i].substring(1,words[i].length) + ' ';
     else
       proper += words[i].toLowerCase() + ' ';

   return proper;
  };

 /*
  * Base64 decoder
  * from http://www.nczonline.net/blog/2009/12/08/computer-science-in-javascript-base64-encoding/
  */
 mincer.base64_decode = function(text)
 {
  text = text.replace(/\s/g,"");

  if (!(/^[a-z0-9\+\/\s]+\={0,2}$/i.test(text)) || text.length % 4 > 0) {
   throw new Error("Not a base64-encoded string.");
  }   

  var digits = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
   cur, prev, digitNum,
   i=0,
   result = [];

  text = text.replace(/=/g, "");

  while (i < text.length) {
   cur = digits.indexOf(text.charAt(i));
   digitNum = i % 4;

   switch (digitNum) {
    //case 0: first digit - do nothing, not enough info to work with
    case 1: //second digit
     result.push(String.fromCharCode(prev << 2 | cur >> 4));
     break;
    case 2: //third digit
     result.push(String.fromCharCode((prev & 0x0f) << 4 | cur >> 2));
     break;
    case 3: //fourth digit
     result.push(String.fromCharCode((prev & 3) << 6 | cur));
     break;
   }

   prev = cur;
   i++;
  }

  return result.join("");
 };

 /*
  * Returns the Gaydar chat version
  */
 mincer.channel.get_gaydar_chat_version = function()
 {
  var result = null;
  var regexp = /^.*VersionedFile\.axd\/(.*)\.js$/; // the versioned file name pattern
  var scripts = document.getElementsByXPath("//script"); // all script elements
  for (var index = 0; index < scripts.length; index++) {
   var matches = regexp.exec(scripts[index].src);
   if (matches && matches.length > 0) { // found a versioned file
    var base64 = matches[1]; // extract the base64 encoding
    result = mincer.base64_decode(base64);
    var regexp_ver = /^([0-9\.]+).*\|.*$/; // version + filename pattern
    matches = regexp_ver.exec(result);
    if (matches && matches.length > 0) {
     result = matches[1]; // extract the version
     if (result && result.length > 0) break; // don't need to process any other script names
    }
   }
  }
  return result;
 };

 /*
  * Apply current preferences to this channel (possibly recently changed)
  */
 mincer.channel.preferences_apply = function()
 {
  mincer.debug_log("Info, Applying preferences");
  // TODO
 };

 /*
  * Handles click event on channel toolbar Mincer button
  */
 mincer.channel.mincer_button_click_handler = function(event)
 {
  mincer.debug_log("Info, mincer button pressed, opening Preferences dialog");
  try {
   window.open(mincer.resources.PREFS_HTML, "Mincer_Preferences", "dialog=yes,centerscreen=yes,status=yes,resizable=yes,scrollbars=yes,location=no,alwaysRaised=no,outerHeight=560,outerWidth=600");
  } catch(ex) {
   mincer.debug_log("Error, failed to open preferences dialog");
  }
 };

 /*
  * Called when iframe loads a new document.
  * Required to ensure bold style is re-applied if document changes
  */
 mincer.channel.iframe_preferences_apply = function()
 {
  if (mincer.prefs.bool_set_text_bold && this.contentDocument) {
    this.contentDocument.body.style.fontWeight = "bold";
  }
  else {
   this.contentDocument.body.style.fontWeight = "";
  }
  mincer.debug_log("Info, (iframe reload) set text-box CSS style.fontWeight to '" + this.contentDocument.body.style.fontWeight + "'");

  if (mincer.prefs.bool_set_background_colour) {
   // FIXME: maybe use firstElementChild.
   // this.parentNode.style.backgroundColor = mincer.prefs.str_background_colour;
   document.getElementById("editor").style.backgroundColor = mincer.prefs.str_background_colour;
   mincer.debug_log("Info, (iframe reload) set background colour to " + mincer.prefs.str_background_colour);
  }
 };

 /*
  * Monitor the document title to ensure it always shows the chat version
  */
 mincer.channel.watch_document_title = function(property, oldval, newval)
 {
  return mincer.channel.channel_display_name + " (v" + mincer.gaydar_chat_version + ", Mincer v" +mincer.script_version + ")";
 };

 /*
  * Apply preferences to channel
  */
 mincer.channel.preferences_apply = function()
 {
  mincer.gaydar_chat_version = mincer.channel.get_gaydar_chat_version();

  // append the chat version number to the window/document title
  var title = mincer.channel.watch_document_title(document.title, document.title, document.title);
  document.title = title;

  // if the document title changes, make sure it shows the versions
  unsafeWindow.document.watch("title", mincer.channel.watch_document_title);

  var messageTextarea = document.getElementByXPath("//textarea[@id='messageTextarea']");

  if (mincer.prefs.bool_set_text_colour && unsafeWindow.textBox) {
   unsafeWindow.textBox.setColor(mincer.prefs.str_text_colour);
   mincer.debug_log("Info, set CSS style.color to " + messageTextarea.style.color);
  }

  if (mincer.prefs.bool_set_text_bold) {
   mincer.channel.chatLogContent.style.fontWeight = "bold";
   if (messageTextarea && messageTextarea.parentNode.firstElementChild.nodeName == "IFRAME")
    messageTextarea.parentNode.firstElementChild.contentDocument.body.style.fontWeight = "bold";
    // add a listener to re-apply the setting in case the iframe document changes
    messageTextarea.parentNode.firstElementChild.addEventListener("load", mincer.channel.iframe_preferences_apply, false);
  }
  else {
   mincer.channel.chatLogContent.style.fontWeight = "";
   if (messageTextarea && messageTextarea.parentNode.firstElementChild.nodeName == "IFRAME")
    messageTextarea.parentNode.firstElementChild.contentDocument.body.style.fontWeight = "";
    messageTextarea.parentNode.firstElementChild.addEventListener("load", mincer.channel.iframe_preferences_apply, false);
  }
  mincer.debug_log("Info, set CSS style.fontWeight to '" +  mincer.channel.chatLogContent.style.fontWeight + "'");

  if (mincer.prefs.bool_set_override_text_colour) {
   mincer.channel.chatLogContent.style.color = mincer.prefs.str_override_text_colour;
  }

  if (mincer.prefs.bool_set_background_colour) {
   mincer.channel.chatLogContent.style.backgroundColor = mincer.prefs.str_background_colour;
   // FIXME: maybe use firstElementChild.
   // messageTextarea.parentNode.style.backgroundColor = mincer.prefs.str_background_colour;
   document.getElementById("editor").style.backgroundColor = mincer.prefs.str_background_colour;
   var user_list_content = document.getElementByXPath("//div[@id='userListContent']");
   if (user_list_content) user_list_content.style.backgroundColor = mincer.prefs.str_background_colour;
   mincer.debug_log("Info, set background colour to " + mincer.prefs.str_background_colour);
  }

  if (mincer.prefs.bool_set_text_size && mincer.channel.chatLogContent) {
   mincer.channel.chatLogContent.style.fontSize = mincer.prefs.str_text_size;
   mincer.debug_log("Info, set CSS style.fontSize to " + mincer.channel.chatLogContent.style.fontSize);
   // set the same size in the input area
   messageTextarea.style.fontSize = mincer.prefs.str_text_size;
  }

  if(mincer.prefs.bool_set_sort_order && unsafeWindow._sortOrder) {
   unsafeWindow._sortOrder = mincer.prefs.int_sort_order; // (range 0-3) [2] is _3868:'Sort Newest at Top'
   mincer.debug_log("Info, setting sort order to " + unsafeWindow._sortOrder);
  }

 };

 /*
  * Called once the document is ready
  */
 mincer.channel.configure_channel_window = function(event)
 {
  mincer.debug_log("Info, configuring channel window");

  /* Mutation events allow capture of node-inserted events
     These can be used on DIV elements (onchange doesn't fire on DIV, only TEXTAREA, etc).
   */
  var hasMutationEvents = false;
  GM_log("Info, document.implementation.hasFeature('MutationEvents','2.0')=" + document.implementation.hasFeature('MutationEvents','2.0'));
  GM_log("Info, window.MutationEvent=" + window.MutationEvent);
  if (document.implementation.hasFeature('MutationEvents','2.0') || window.MutationEvent)
   hasMutationEvents = true;

  // find the messages area of the channel window
  mincer.channel.chatLogContent = document.getElementById("chatLogContent");
  GM_log("Info, chatLogContent=" + mincer.channel.chatLogContent);
  GM_log("Info, document.getElementById(\"chatLogContent\")=" + document.getElementById("chatLogContent"));
  GM_log("Info, document.getElementById(\"chatLog\")=" + document.getElementById("chatLog"));

  // register the event handler
  if (hasMutationEvents) {
   if (mincer.channel.chatLogContent) {
    mincer.channel.chatLogContent.addEventListener("DOMNodeInserted", mincer.channel.new_node, false);
    mincer.debug_log("Info, added DOMNodeInserted event listener");
   }
   else {
    GM_log("Warning: Setting mutation event listener, element 'chatLogContent' is unexpectedly null");
   }
  }
  else {
   GM_log("Error, Browser doesn't support MutationEvents, cannot register DOMNodeInserted event listener");
   mincer.debug_log("Error, Browser doesn't support MutationEvents, cannot register DOMNodeInserted event listener");
   if (!mincer.warned_no_mutation_events) {
    window.alert("Browser doesn't support MutationEvents\nMincer cannot monitor or modify conversations");
    mincer.warned_no_mutation_events = true;
   }
  }

  // create a Mincer sprite button with icon that mimics a QSoft.UI.SpriteButton
  var btn_icon = document.buildElement('img',
   {id:'mincer_icon',
    style:'border:0;vertical-align:middle',
    align:'middle',
    src:mincer.resources.MINCER_16x16_INVERTED_PNG},
    null,
    null,
    null
  );  
  var btn_label = document.createElement("span");
  btn_label.className = "mincerbutton";
  btn_label.appendChild(btn_icon);
  btn_label.appendChild(document.createTextNode(mincer.script_name));

  var btn_link = document.createElement("a");
  btn_link.className = "content";
  btn_link.appendChild(btn_label);

  var btn = document.createElement("span");
  btn.c = {"out" : "out", "over" : "over", "down" : "down", "disabled" : "disabled"};
  btn.className = "toolbarbutton sprite out";
  if (btn.addEventListener) btn.addEventListener("click", mincer.channel.mincer_button_click_handler, false);
  else mincer.debug_log("Error, btn.addEventListener is null");
  btn.unselectable = "on";
  btn.onselectstart = function()
  {
    return false;
  };
  btn.style.MozUserSelect = "none";
  btn.style.WebkitUserSelect = "none";
  btn.appendChild(btn_link);


  // add the Mincer sprite button to the channel toolbar
  var channel_toolbar = document.getElementByXPath("//div[@id='channelToolbar']");
  channel_toolbar.appendChild(btn);

  if (mincer.prefs.bool_set_mincer_logo) {
   // create a large Mincer icon/logo
   var img_logo = document.buildElement('img',
    {id:'mincer_logo',
     style:'border:0;vertical-align:top;float:right;margin-right:20px',
     src:mincer.resources.MINCER_64x64_PNG},
     null,
     null,
     null
   );  
   // insert into background of message textbox iframe
   var messageTextarea = document.getElementByXPath("//textarea[@id='messageTextarea']");
   messageTextarea.parentNode.insertBefore(img_logo, messageTextarea);
   mincer.debug_log("Info, inserting Mincer logo into message area");
  }

  // apply preferences
  mincer.channel.preferences_apply();

  // remove this event listener since it has done its job
  mincer.channel.target.removeEventListener("load", mincer.channel.configure_channel_window, false);
 };

 /*
  * Called when the chat log content area gets a new node (a new message or action)
  */
 mincer.channel.new_node = function(event)
 {
 
  // monitor window._user object to copy out the user's nickname
  if (!mincer.channel.nickname && unsafeWindow._user) {
   mincer.channel.nickname = unsafeWindow._user.DisplayName;
   mincer.debug_log("Info, nickname=" + mincer.channel.nickname);
  }

  if (event.target.parentNode.id == "chatLogContent") {
   var nickname = event.target.childNodes[0].textContent.replace(/:\s$/, "");

   // multi-purpose loop over all message elements
   var plain_text = "";
   for (var index = 0; index < event.target.childNodes.length; index++) {
    // don't include nickname in message plain text
    if (index > 0) plain_text += event.target.childNodes[index].textContent;
    // strip custom colour codes from messages
    if (mincer.prefs.bool_set_override_text_colour)
     event.target.childNodes[index].style.color = "";
   }

   if (mincer.prefs.bool_set_proper_case) {
    // determine if messages is all UPPER CASE
    var all_upper = /^[A-Z0-9\s\?\-\.\$\*\(\)\+=_!£%&"'@#~\/\\:;]+$/;
    if (all_upper.test(plain_text)) {
     mincer.debug_log("Info, converting UPPERCASE message to Proper case from " + nickname);
     // convert plain text to proper case
     plain_text = mincer.proper_case(plain_text);
     // now convert all spans within the message
     for (var index = 0; index < event.target.childNodes.length; index++) {
      if (index > 0) // don't include nickname
       event.target.childNodes[index].textContent = mincer.proper_case(event.target.childNodes[index].textContent);
     }
    }
   }

   if (mincer.prefs.bool_set_hide_blocked) {
    // class of SPAN containing user message
    if (event.target.childNodes.length > 1 && event.target.childNodes[1].className == "blocked message") {
     event.target.style.display = 'none';
     mincer.debug_log("Info, hiding blocked message from " + nickname);
    }
   }

   if (event.target.className != "action" 
        && plain_text.length >= mincer.prefs.int_hide_duplicate_messages_min_length
        && (mincer.channel.nickname && nickname != mincer.channel.nickname)
      ) {
    // hide duplicate messages
    var key = hex_md5(plain_text); // hash message
    if (mincer.prefs.bool_set_hide_duplicate_messages 
         && mincer.channel.message_hash_table[key] !== undefined
         && event.target.style.display != 'none') {
     event.target.style.display = 'none';
     mincer.debug_log("Info, hiding duplicate message from " + nickname);
    }
    else {
    // add message hash to dictionary
     mincer.channel.message_hash_table[key] = event.target; // the complete DIV is referenced
    }
   }

   if (mincer.prefs.bool_set_action_colour && event.target.className == "action")
   {
    event.target.style.color = mincer.prefs.str_action_colour;
   }

   // highlight keywords
   if (mincer.prefs.bool_set_highlight_keywords && mincer.channel.nickname != nickname) {
    var keywords = mincer.prefs.str_highlight_keywords;

    // don't highlight my own messages that contain the keywords
    if (mincer.prefs.bool_set_highlight_include_my_nickname
         && nickname != mincer.channel.nickname)
     if (mincer.channel.nickname)
      keywords += (keywords.length > 0 ? "|" : "") + mincer.channel.nickname;

     keywords = "(" + keywords + ")"; // create regular expression group
     var regexp = new RegExp(keywords);
     var matches = regexp.exec(plain_text);

     if (matches && matches.length > 0) {
      event.target.style.color = mincer.prefs.str_highlight_colour;
      event.target.style.fontWeight = "bolder";
      // to ensure the entire message is highlighted, apply colour to each span
      for (var index = 0; index < event.target.childNodes.length; index++) {
       // over-ride any custom colour with highlight
       event.target.childNodes[index].style.color = mincer.prefs.str_highlight_colour;
       event.target.childNodes[index].style.fontWeight = "bolder";
      }     
      mincer.debug_log("Info, highlighting message from " + nickname + " matched '" + matches[1] + "'");
     }
   }

   if (mincer.prefs.bool_set_hide_my_nickname 
       && event.target.className != "action" 
       && (mincer.channel.nickname && nickname == mincer.channel.nickname))
    event.target.removeChild(event.target.firstChild);

   // prefix messages with time-stamp
   // *** always do this last as it affects the layout of the child elements ***
   if (mincer.prefs.bool_set_message_timestamp) {
    var now = new Date();
    var elem = document.createElement('span');
    elem.innerHTML = "[" + now.toLocaleTimeString() + "] ";
    event.target.insertBefore(elem, event.target.firstChild);
   }
  
   // auto-hide older 'action' messages to make display easier to read
   if (mincer.prefs.bool_set_hide_old_action_messages) {
    var older = event.target.parentNode.childNodes.length - 5;
    if (older >= 0 && event.target.parentNode.childNodes[older].className == "action" ) {
     event.target.parentNode.childNodes[older].style.display = 'none';
     mincer.debug_log("Info, hiding older action message");
    }
   }
  }
 };

 /*
  * Initialise operating environment when starting
  */
 mincer.channel.init = function()
 {
  mincer.debug_log("Info, v"+mincer.script_version+" initialising on page "+window.location.pathname);

  // add the preferences dialog to the GreaseMonkey User commands menu
  GM_registerMenuCommand(mincer.script_name+" Preferences...", mincer.channel.mincer_button_click_handler);

  // delay applying configuration until document body is fully loaded
  this.target = window.addEventListener ? window : (document.addEventListener ? document : null);
  if (this.target) {
   this.target.addEventListener("load", mincer.channel.configure_channel_window, false);
   mincer.debug_log("Info, added onload event listener to " + (this.target == window ? "window" : "document"));
  }
  else mincer.debug_log("Error, channel.init(): unable to register onload event listener");



 };


 /* Do something useful */
 mincer.update_check(); // check for update
 mincer.channel.init(); // start
}
else if (mincer.regexp_channel_list.test(window.location.pathname)) {

 /*
  * auto-join channels once document is ready
  */
 mincer.autojoin_channels = function(event)
 {
  if (unsafeWindow._application && unsafeWindow._application.openChannel) {
   // auto-join channels
   if (mincer.prefs.str_channels_autojoin && mincer.prefs.str_channels_autojoin.length > 0) {
    var reason = mincer.prefs.str_reason ? mincer.prefs.str_reason : "";
    var autojoin = mincer.prefs.str_channels_autojoin.split(",");
    var channel = "";
    for (var index in autojoin) {
     // remove illegal characters (IRC channels cannot contain spaces or punctuation)
     channel = autojoin[index].replace(/\(|\)|\-|\+|\.|\/|\s+/g, '');
     unsafeWindow._application.openChannel(channel, reason);
     mincer.debug_log("Info, auto-joining channel: " + autojoin[index] + " (IRC: " + channel + ")");
    }
    // detach
    window.removeEventListener("load", mincer.autojoin_channels, false);
   }
  }
 };

 GM_log("Info, " + window.location.pathname);

 /* save a reference to the ChannelList window in the ChatApplet window so that
    Mincer can 'talk' to it later. When a Channel window opens it will take a copy
    for itself so that all Channel windows can 'talk' to the ChannelList.
    Need to use an unsafewindow so mincer can add properties to the target.
    FIXME: Security implications - can mincer do without this?
  */
 unsafeWindow.opener._channellist = unsafeWindow;

 // Set the reason
 var textBox = document.getElementByXPath("//input[@id='txtReason']");
 if (textBox && mincer.prefs.str_reason) {
  textBox.value = mincer.prefs.str_reason;
  unsafeWindow._isReasonSet = true;
  mincer.debug_log("Info, ChannelList's _isReasonSet=" + unsafeWindow._isReasonSet);
 }
 
 window.addEventListener("load", mincer.autojoin_channels, false);
}
else if (mincer.regexp_invite_received.test(window.location.pathname)) {
 var nickname = document.getElementById('invUser');
 if (nickname) {
  var text = nickname.textContent;
  if (text && text.length > 0) {
   var regexp = /^(.+?)(\s.*)$/;
   var match = regexp.exec(text);
   if (match) {
    var inviter = match[1]; // just the nickname
    text = match[2]; // everything after the nickname
    var link = document.createElement('a');
    if (link) {
     link.href="/scripts/ndisplay.asp?userid=" + inviter + "&vsrc=C";
     link.target= inviter;
     link.textContent = inviter;
     nickname.textContent = "";
     nickname.appendChild(link);
     nickname.appendChild(document.createTextNode(text));
    }
   }
  }
 }
}

// include 3rd-party libraries here

// include jshash-2.2/md5-min.js
/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
var hexcase=0;function hex_md5(a){return rstr2hex(rstr_md5(str2rstr_utf8(a)))}function hex_hmac_md5(a,b){return rstr2hex(rstr_hmac_md5(str2rstr_utf8(a),str2rstr_utf8(b)))}function md5_vm_test(){return hex_md5("abc").toLowerCase()=="900150983cd24fb0d6963f7d28e17f72"}function rstr_md5(a){return binl2rstr(binl_md5(rstr2binl(a),a.length*8))}function rstr_hmac_md5(c,f){var e=rstr2binl(c);if(e.length>16){e=binl_md5(e,c.length*8)}var a=Array(16),d=Array(16);for(var b=0;b<16;b++){a[b]=e[b]^909522486;d[b]=e[b]^1549556828}var g=binl_md5(a.concat(rstr2binl(f)),512+f.length*8);return binl2rstr(binl_md5(d.concat(g),512+128))}function rstr2hex(c){try{hexcase}catch(g){hexcase=0}var f=hexcase?"0123456789ABCDEF":"0123456789abcdef";var b="";var a;for(var d=0;d<c.length;d++){a=c.charCodeAt(d);b+=f.charAt((a>>>4)&15)+f.charAt(a&15)}return b}function str2rstr_utf8(c){var b="";var d=-1;var a,e;while(++d<c.length){a=c.charCodeAt(d);e=d+1<c.length?c.charCodeAt(d+1):0;if(55296<=a&&a<=56319&&56320<=e&&e<=57343){a=65536+((a&1023)<<10)+(e&1023);d++}if(a<=127){b+=String.fromCharCode(a)}else{if(a<=2047){b+=String.fromCharCode(192|((a>>>6)&31),128|(a&63))}else{if(a<=65535){b+=String.fromCharCode(224|((a>>>12)&15),128|((a>>>6)&63),128|(a&63))}else{if(a<=2097151){b+=String.fromCharCode(240|((a>>>18)&7),128|((a>>>12)&63),128|((a>>>6)&63),128|(a&63))}}}}}return b}function rstr2binl(b){var a=Array(b.length>>2);for(var c=0;c<a.length;c++){a[c]=0}for(var c=0;c<b.length*8;c+=8){a[c>>5]|=(b.charCodeAt(c/8)&255)<<(c%32)}return a}function binl2rstr(b){var a="";for(var c=0;c<b.length*32;c+=8){a+=String.fromCharCode((b[c>>5]>>>(c%32))&255)}return a}function binl_md5(p,k){p[k>>5]|=128<<((k)%32);p[(((k+64)>>>9)<<4)+14]=k;var o=1732584193;var n=-271733879;var m=-1732584194;var l=271733878;for(var g=0;g<p.length;g+=16){var j=o;var h=n;var f=m;var e=l;o=md5_ff(o,n,m,l,p[g+0],7,-680876936);l=md5_ff(l,o,n,m,p[g+1],12,-389564586);m=md5_ff(m,l,o,n,p[g+2],17,606105819);n=md5_ff(n,m,l,o,p[g+3],22,-1044525330);o=md5_ff(o,n,m,l,p[g+4],7,-176418897);l=md5_ff(l,o,n,m,p[g+5],12,1200080426);m=md5_ff(m,l,o,n,p[g+6],17,-1473231341);n=md5_ff(n,m,l,o,p[g+7],22,-45705983);o=md5_ff(o,n,m,l,p[g+8],7,1770035416);l=md5_ff(l,o,n,m,p[g+9],12,-1958414417);m=md5_ff(m,l,o,n,p[g+10],17,-42063);n=md5_ff(n,m,l,o,p[g+11],22,-1990404162);o=md5_ff(o,n,m,l,p[g+12],7,1804603682);l=md5_ff(l,o,n,m,p[g+13],12,-40341101);m=md5_ff(m,l,o,n,p[g+14],17,-1502002290);n=md5_ff(n,m,l,o,p[g+15],22,1236535329);o=md5_gg(o,n,m,l,p[g+1],5,-165796510);l=md5_gg(l,o,n,m,p[g+6],9,-1069501632);m=md5_gg(m,l,o,n,p[g+11],14,643717713);n=md5_gg(n,m,l,o,p[g+0],20,-373897302);o=md5_gg(o,n,m,l,p[g+5],5,-701558691);l=md5_gg(l,o,n,m,p[g+10],9,38016083);m=md5_gg(m,l,o,n,p[g+15],14,-660478335);n=md5_gg(n,m,l,o,p[g+4],20,-405537848);o=md5_gg(o,n,m,l,p[g+9],5,568446438);l=md5_gg(l,o,n,m,p[g+14],9,-1019803690);m=md5_gg(m,l,o,n,p[g+3],14,-187363961);n=md5_gg(n,m,l,o,p[g+8],20,1163531501);o=md5_gg(o,n,m,l,p[g+13],5,-1444681467);l=md5_gg(l,o,n,m,p[g+2],9,-51403784);m=md5_gg(m,l,o,n,p[g+7],14,1735328473);n=md5_gg(n,m,l,o,p[g+12],20,-1926607734);o=md5_hh(o,n,m,l,p[g+5],4,-378558);l=md5_hh(l,o,n,m,p[g+8],11,-2022574463);m=md5_hh(m,l,o,n,p[g+11],16,1839030562);n=md5_hh(n,m,l,o,p[g+14],23,-35309556);o=md5_hh(o,n,m,l,p[g+1],4,-1530992060);l=md5_hh(l,o,n,m,p[g+4],11,1272893353);m=md5_hh(m,l,o,n,p[g+7],16,-155497632);n=md5_hh(n,m,l,o,p[g+10],23,-1094730640);o=md5_hh(o,n,m,l,p[g+13],4,681279174);l=md5_hh(l,o,n,m,p[g+0],11,-358537222);m=md5_hh(m,l,o,n,p[g+3],16,-722521979);n=md5_hh(n,m,l,o,p[g+6],23,76029189);o=md5_hh(o,n,m,l,p[g+9],4,-640364487);l=md5_hh(l,o,n,m,p[g+12],11,-421815835);m=md5_hh(m,l,o,n,p[g+15],16,530742520);n=md5_hh(n,m,l,o,p[g+2],23,-995338651);o=md5_ii(o,n,m,l,p[g+0],6,-198630844);l=md5_ii(l,o,n,m,p[g+7],10,1126891415);m=md5_ii(m,l,o,n,p[g+14],15,-1416354905);n=md5_ii(n,m,l,o,p[g+5],21,-57434055);o=md5_ii(o,n,m,l,p[g+12],6,1700485571);l=md5_ii(l,o,n,m,p[g+3],10,-1894986606);m=md5_ii(m,l,o,n,p[g+10],15,-1051523);n=md5_ii(n,m,l,o,p[g+1],21,-2054922799);o=md5_ii(o,n,m,l,p[g+8],6,1873313359);l=md5_ii(l,o,n,m,p[g+15],10,-30611744);m=md5_ii(m,l,o,n,p[g+6],15,-1560198380);n=md5_ii(n,m,l,o,p[g+13],21,1309151649);o=md5_ii(o,n,m,l,p[g+4],6,-145523070);l=md5_ii(l,o,n,m,p[g+11],10,-1120210379);m=md5_ii(m,l,o,n,p[g+2],15,718787259);n=md5_ii(n,m,l,o,p[g+9],21,-343485551);o=safe_add(o,j);n=safe_add(n,h);m=safe_add(m,f);l=safe_add(l,e)}return Array(o,n,m,l)}function md5_cmn(h,e,d,c,g,f){return safe_add(bit_rol(safe_add(safe_add(e,h),safe_add(c,f)),g),d)}function md5_ff(g,f,k,j,e,i,h){return md5_cmn((f&k)|((~f)&j),g,f,e,i,h)}function md5_gg(g,f,k,j,e,i,h){return md5_cmn((f&j)|(k&(~j)),g,f,e,i,h)}function md5_hh(g,f,k,j,e,i,h){return md5_cmn(f^k^j,g,f,e,i,h)}function md5_ii(g,f,k,j,e,i,h){return md5_cmn(k^(f|(~j)),g,f,e,i,h)}function safe_add(a,d){var c=(a&65535)+(d&65535);var b=(a>>16)+(d>>16)+(c>>16);return(b<<16)|(c&65535)}function bit_rol(a,b){return(a<<b)|(a>>>(32-b))};
// EOF

