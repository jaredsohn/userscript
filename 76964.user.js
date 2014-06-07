// ==UserScript==
// @name           Super Google Reader - full entry iframe
// @namespace      *
// @description    Super Google Reader full entry iframe. Runs in the iframe that the entry is loaded into. Sends the iframe size back to the Google Reader parent window so the iframe can be set to an appropriate height. Note: To be used with the Super Google Reader script.
// @require	   http://supergooglereader.com/js/jquery-1.4.2.min.sgr.js
// ==/UserScript==


(function($) {

  // Return as quickly as possible if we are not in an iframe
  //
  if (unsafeWindow.parent == unsafeWindow || typeof unsafeWindow.parent == 'undefined') {
    return;
  }

  // If this is the google reader settings iframe, return
  //
  if (window.location.href.match(/\/\/(www\.|)google\.com\/reader\/settings/)) {
    return;
  }

  // Minimum allowed iframe height to be sent to the parent
  //
  const MIN_IFRAME_HEIGHT = 700;

  // Enable or disable debug output
  //
  //const DEBUG = true;
  const DEBUG = false;

  // Maximum allowed times to send height to parent.
  //
  const MAX_SEND_SIZE = 25;

  // Counter for amount of times height has been sent to parent.
  var send_size_counter = 0;

  var ok_to_proceed = false;


  // Helper function to output debug statements
  //
  function debug() {
    if (DEBUG && console) {
      console.log.apply(this, arguments);
    }
  }

  // Execute the posting of a message to our parent window.
  //
  function postMessageToParent(msg) {
    if (unsafeWindow.parent['postMessage']) {
      // Ugh. We can't find out what protocol the parent google reader window is using, so
      // we spam both http and https. Yuck.
      //
      unsafeWindow.parent.postMessage(msg,'http://www.google.com');
      unsafeWindow.parent.postMessage(msg,'https://www.google.com');
    }
  }

  // Receive a response from our parent window. We are looking for a 'hello'
  // message from a google.com parent. Once we receive this, we can proceed 
  // with more destructive actions such as hiding all comments on the page.
  // Note this is not necessairly a security precaution, it's more a way of
  // preventing any iframe from running our "destructive" code.
  //
  function receiveParentMessage(event) {  
    var msg_ev = event.originalEvent;

    //debug('msg_ev.data = ' + msg_ev.data);
    //debug('msg_ev.origin = ' + msg_ev.origin);

    // Check the message was received from a google domain (http or https)
    //
    if (msg_ev.origin.match(/http(s|):\/\/www\.google\.com/) == null) {
      return;
    }
    if (typeof msg_ev.data == 'undefined') {
      return;
    }  

    if (msg_ev.data == 'hello') {
      ok_to_proceed = true;
      $.sgr.hideComments();
      sendSizeToParent();
    }

  }

  // Send a message to the parent window to acknowledge our existence, and 
  // ensure our parent is a google domain
  //
  function registerWithParent() {
    postMessageToParent('helo');
    return false;
  }

  // Find the height of the window and send it to the parent window.
  // This is done via parent.postMessage()
  //
  function sendSizeToParent() {

    // Check if we have exceeded the maximum allowed times to send the height to the parnet.
    // This is here as a catchall or precaution in case we get stuck in a resize loop and continually
    // spam the parent with height values. This can sometimes occur if we use a window resize event 
    // handler to determine when to send height to the parent.
    //
    if (send_size_counter > MAX_SEND_SIZE) {
      debug("sendSizeToParent() exceeded call limit");
      if (jQuery) {
        $(window).unbind('resize', sendSizeToParent);
      }
      return false;
    }

    send_size_counter += 1;

    if (unsafeWindow.parent['postMessage']) {
      var height;

      // If jQuery has loaded, use it to find the window height
      //
      if (jQuery) { 
        // document.body.scrollHeight *seems* to be the correct height to use in 
        // cases where a page has been shortened in height during it's load process. 
        // So if document.body.scrollHeight is less than $(document).height(), but 
        // still larger than the minimum allowable iframe height, use it.
        //
        if (document.body.scrollHeight < $(document).height() && document.body.scrollHeight > MIN_IFRAME_HEIGHT) {
          // Add a little fudge (20px) to cover fringe cases of incorrect height
          //
          height = document.body.scrollHeight + 20;
        } else {
          height = $(document).height();
        }

      // If we don't have access to jQuery, simply use document.body.scrollHeight
      //
      } else {
        // Add a little fudge (20px) to cover fringe cases of incorrect height
        //
        height = document.body.scrollHeight + 20;
      }

      // Send the height to the parent using postMessage()
      //
      postMessageToParent(height);
    }
    return false;
  }

  // Register a listener for receiving messages from our parent
  //
  $(window).bind("message", receiveParentMessage);

  // Send a message to our parent to check we are interacting with a google domain
  //
  registerWithParent();

  // Send the window size to the parent right now
  //
  sendSizeToParent();

  // Send the window size to the parent in 5 seconds
  //
  //window.setTimeout(sendSizeToParent, 5000);


  // $.sgr namespace constructor
  //
  $.sgr = function(func_name) {
    $.isFunction(func_name) ? func_name.call() : null
  }

  // Comment selector snippet for finding comments on a page
  //
  $.sgr.comment_selector = "[class*=comment], [id*=comment]";

  // Settings container
  //
  $.sgr.settings = [];

  // Load GM settings into a local $.sgr.settings array. This is mainly so we can access these
  // values in event handlers.
  //
  $.sgr.init_settings = function() {
    $.sgr.settings['global_use_iframes'] = false;
    $.sgr.settings['global_url_in_subject'] = false;
    $.sgr.settings['global_readability'] = false;
    $.sgr.settings['global_hide_likers'] = true;
    $.sgr.settings['global_hide_comments'] = true;

    for each (var val in GM_listValues()) {
      $.sgr.settings[val] = GM_getValue(val);
    }
  }

  // Get a setting value. Look for a locally set value first (for this user), otherwise use
  // the default global setting value
  //
  $.sgr.getSetting = function(setting_name) {
    return typeof $.sgr.settings[$.sgr.getSettingVarName(setting_name)] == 'undefined' ? $.sgr.settings['global_' + setting_name] : $.sgr.settings[$.sgr.getSettingVarName(setting_name)];
  }

  // Get a setting name, namespaced to the currently selected feed or folder
  //
  $.sgr.getSettingVarName = function(setting_name) {
    var feed = $.sgr.getCurrentFeedName();
    if (typeof feed == 'undefined') {
      return false;
    }
    return "setting_" + setting_name + "_" + feed;
  }

  // Find and return the currently selected feed href or folder name
  //
  $.sgr.getCurrentFeedName = function() {
    if (typeof $("a.tree-link-selected").attr('href') != 'undefined') {
      return unescape($("a.tree-link-selected").attr('href').match(/.*\/(.*)/)[1]);
    }
  }


  // Helper function to add global CSS styles to the page head
  //
  $.sgr.addStyles = function(css) {
    var head=document.getElementsByTagName('head')[0];
    if (head)
    {
      var style=document.createElement('style');
      style.type='text/css';
      style.innerHTML=css;
      head.appendChild(style);
    }
  }


  // Initialise global page CSS styles
  //
  $.sgr.init_styles = function() {

    var global_styles = (<r><![CDATA[
#sgr_toggle_cmts {
  cursor: pointer;
  font-size: 14px;
  color: black;
  background-color: #F3F5FC;
  border: 2px solid #6688EE;
  padding: 5px;
  position: absolute;
  right: 20px;
  top: 0px;
  text-decoration: none;
  font-weight: normal;
  display: inline;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
}
#sgr_toggle_cmts:hover {
  text-decoration: underline;
}

]]></r>).toString();

    $.sgr.addStyles(global_styles);
  }

  // Find and hide elements that appear to be comments. Add a show/hide comments
  // button to the page to allow comments to be toggled on/off.
  //
  $.sgr.hideComments = function() {
    if ($.sgr.getSetting('hide_comments')) {
      var comments = $($.sgr.comment_selector);
      if (comments.size() > 0) {
        comments.hide();
        $("body").prepend('<div id="sgr_toggle_cmts" class="sgr_hidden">Show comments</div>');
        $("#sgr_toggle_cmts").click(function(){
          if ($(this).hasClass('sgr_hidden')) {
            $($.sgr.comment_selector).show();
            $(this).removeClass('sgr_hidden').text('Hide comments');
          } else {
            $($.sgr.comment_selector).hide();
            $(this).addClass('sgr_hidden').text('Show comments');
          }
          sendSizeToParent();
        });
      }
    }
  }

  // Main code run
  //
  $.sgr.run = function() {
    $.sgr.init_settings();
    $.sgr.init_styles();
  }

  // MAIN
  //

  // Send the window size to the parent right now
  //
  sendSizeToParent();

  // Send the window size to the parent after the window has loaded
  //
  $(window).load(sendSizeToParent);

  // Run the main code
  //
  $.sgr.run();

})(jQuery);

