// ==UserScript==
// @name           Super Google Reader
// @description    Allows full content to be shown for Google Reader entries. It enables per-feed or folder loading of Google Reader entries in an iframe, allowing the full content of the feed entry to be viewed. Will also set the height of the iframe dynamically based on the actual height of the window it is showing.  Note: To be used with the 'Super Google Reader - full entry iframe' script.
// @include         http://reader.google.tld/reader/*
// @include         https://reader.google.tld/reader/*
// @include         http://www.google.tld/reader/*
// @include         https://www.google.tld/reader/*
// @require	    http://supergooglereader.com/js/jquery-1.4.2.min.sgr.js
// ==/UserScript==

(function($) {

  //const DEBUG = true;
  const DEBUG = false;

  // Helper function to output debug statements
  //
  function debug() {
    if (DEBUG && console) {
      console.log.apply(this, arguments);
    }
  }

  // $.sgr namespace constructor
  //
  $.sgr = function(func_name) {
    $.isFunction(func_name) ? func_name.call() : null
  }

  ////////////
  // CONFIG
  ////////////

  // Minimum allowed height for the preview iframe
  //
  $.sgr.minimum_iframe_height = 700;
  $.sgr.minimum_iframe_height_str = $.sgr.minimum_iframe_height.toString() + 'px';

  ////////////
  // End CONFIG
  ////////////

  // Setting container
  $.sgr.settings = [];

  // Setting tab counter, so we know when to insert our settings tab
  //
  $.sgr.setting_group_title_add_count = 0;

  // Container to store when an entry has been closed. Used to prevent entry 'flicker'
  // when entry is closed/opened/closed too quickly
  //
  $.sgr.entry_closed_at_time = {};


  // Load GM settings into a local $.sgr.settings array. This is mainly so we can access these
  // values in event handlers.
  //
  $.sgr.initSettings = function() {
    // Set the defaults for global settings
    //
    $.sgr.settings['global_use_iframes'] = false;
    $.sgr.settings['global_url_in_subject'] = false;
    $.sgr.settings['global_hide_likers'] = true;

    for each (var val in GM_listValues()) {
      $.sgr.settings[val] = GM_getValue(val);
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
  $.sgr.initStyles = function() {

    var global_styles = (<r><![CDATA[
div.preview .entry-container {
  display: none;
}
.entry .entry-container-preview {
  padding: 0.5em 0;
  margin: 0 10px;
  color: #000;
  max-width: 98%;
  display: block;
  left: -10000px;
}
.entry .entry-container-preview .entry-title {
  max-width: 98%;
}
.entry .entry-container-preview .entry-main .entry-date {
  display: none;
}
.entry .entry-container-preview-hidden {
  position: absolute;
}
#setting-enhanced .enhanced {
  border-bottom:1px solid #FFCC66;
  margin:0;
  padding:0.6em 0;
}
#setting-enhanced .enhanced-header {
  font-weight: bold;
  margin-bottom: 1em;
}
div.preview iframe.preview {
  display: block;
  overflow-y: hidden;
}
.entry .hostname {
  font-weight: normal;
}
.entry .entry-main .hostname {
  font-size: 90%;
}
]]></r>).toString();

    // Check if 'Hide likers' is enabled and add appropriate CSS
    //
    if ($.sgr.getSetting('hide_likers')) {
      global_styles += ' .entry-likers { display: none; }';
    }

    $.sgr.addStyles(global_styles);
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

  // Helper function to get the CSS xpath for a specific HTML element
  //
  $.sgr.getXPath = function(elt) {
    var path = '';
    for (; elt && elt.nodeType == 1; elt = elt.parentNode)
    {
      var idx = 0;
      $(elt.parentNode).children(elt.tagName).each(function(index) {
        if (this == elt) {
          idx = index + 1;
          return;
        }
      });
      //var idx = $(elt.parentNode).children(elt.tagName).index($(elt)) + 1;
      idx > 1 ? (idx='[' + idx + ']') : (idx='');
      path = '/' + elt.tagName.toLowerCase() + idx + path;
    }
    return path;
  }

  // Main message handler to handle messages from iframe preview window.
  //
  // There are 2 types of messages we will accept from a child iframe:
  //  1. Data string of 'helo', to which we respond with 'hello'. This 
  //     represents the iframe registering itself with it's parent (us)
  //     so the iframe window knows it is running inside google.com
  //  2. Data string containing an integer, which represents the height 
  //     of the iframe window. When receiving this we adjust the height 
  //     of the iframe element on our page.
  //
  $.sgr.receiveIframeMessage = function(event) {  
    var msg_ev = event.originalEvent;
    //debug('msg_ev.data = ' + msg_ev.data);
    //debug('msg_ev.origin = ' + msg_ev.origin);

    if (typeof msg_ev.data == 'undefined') {
      return;
    }  

    var iframe = $('#sgr_preview');

    // Message data from iframe is 'helo'. iframe is registering itself with us,
    // we respond with 'hello'.
    //
    if (msg_ev.data == 'helo') {
      window.frames[0].postMessage('hello', msg_ev.origin);

    // Convert any other data to an integer and set the iframe element height accordingly
    //
    } else {
      var height = parseInt(msg_ev.data);

      //debug('height = ' + height);

      if (iframe.size() < 1) {
        return;
      }

      // Make sure the requested height is above our minimum
      //
      if (height < parseInt($.sgr.minimum_iframe_height)) {
        return;
      }

      // Set the iframe height
      //
      iframe.attr('height', height.toString() + 'px');
    }
  }  

  // Scroll viewing pane to the top of a specific entry
  //
  $.sgr.scrollTo = function(entry) {
    $("#entries").scrollTop(entry.attr("offsetTop"));
  }

  // Toggle the showing / hiding of an entry preview iframe.
  //
  $.sgr.showPreview = function(entry) {

    //debug("showPreview");

    // If this entry is already open in an iframe, close it
    //
    if (entry.hasClass("preview")) {
      $.sgr.removePreview(entry);

    // Else show the entry in an iframe
    //
    } else {
      entry.addClass("preview");

      $.sgr.scrollTo(entry);

      // If there is already a hidden preview container for this entry, show it
      //
      if (entry.find(".entry-container-preview-hidden").size() > 0) {
        $.sgr.restorePreview(entry);
      } else { //if ($(".entry-body iframe.preview").size() <= 0) {
        $.sgr.createPreviewIframe(entry, false);
      }

    }

  }

  // Create a new iframe element for previewing an entry.
  //
  $.sgr.createPreviewIframe = function(entry, hidden) {
    if (typeof hidden == 'undefined') {
      hidden = false;
    }

    // Create a new div.entry-container-preview with our iframe in it. 
    //
    entry.find(".collapsed").after($('<div class="entry-container-preview' + (hidden ? ' entry-container-preview-hidden' : '') + '"><iframe id="sgr_preview" width="100%" height="' + $.sgr.minimum_iframe_height_str + '" src="' + $.sgr.getEntryUrl(entry) + '" class="preview"></iframe></div>'));

    // Add the entry header to our iframe container
    //
    $.sgr.populateIframeHeading(entry);
  }

  // Completely remove the iframe preview container from the DOM.
  //
  $.sgr.removePreview = function(entry) {
    //debug("removePreview");
    $(entry).removeClass("preview").find(".entry-container-preview").remove();
  }

  // Save the preview iframe container (effectively hiding it) for possible re-use later.
  //
  $.sgr.savePreview = function(entry) {
    //debug("savePreview");
    $(entry).removeClass("preview").find(".entry-container-preview").addClass("entry-container-preview-hidden");
  }

  // Restore a previously saved/hidden preview iframe.
  //
  $.sgr.restorePreview = function(entry) {
    //debug("restorePreview");
    entry.find(".entry-container-preview-hidden").removeClass("entry-container-preview-hidden");
    $.sgr.populateIframeHeading(entry);
  }

  // When adding a preview iframe, we need to rebuild the entry header elements to prepend
  // to our iframe container.
  //
  $.sgr.populateIframeHeading = function(entry) {
    // If the preview container is not in this entry, or it already has
    // an .entry-main added, return
    //
    if (entry.find(".entry-container-preview").size() <= 0 
        || entry.find(".entry-container-preview .entry-main").size() > 0) 
    {
      return;
    }

    // Grab the relevant header components from the existing .entry-container and 
    // prepend them to our new preview container.
    //
    var preview_header = entry.find(".entry-container .entry-main").clone();
    if (preview_header.size() > 0) {
      preview_header.find(".entry-body").remove();
      entry.find(".entry-container-preview").prepend(preview_header);
      $.sgr.addHostnameToSubject(entry, '.entry-container-preview .entry-main .entry-title');
    }
  }


  // Setup the Settings window. Google Reader settings are handled via a seperate iframe. 
  // When a user starts the Settings iframe, we execute this function to inject our 'Enhanced' 
  // settings tab content into the DOM.
  //
  $.sgr.initSettingsNavigation = function() {
    $('#settings .settings-list').append((<r><![CDATA[
<li id="setting-enhanced" class="setting-group">
<div id="setting-enhanced-body" class="setting-body">
  <div class="enhanced">
    <div class="enhanced-header">Opening entries</div>
    <label>
      <input type="checkbox" id="setting-global-use-iframes"> Default to open all entries as previews (iframes)
    </label>
  </div>
  <div class="enhanced">
    <div class="enhanced-header">Entry subject</div>
    <label>
      <input type="checkbox" id="setting-global-url-in-subject"> Default to include entry hostname in subject
    </label>
  </div>
  <div class="enhanced">
    <div class="enhanced-header">Entry content</div>
    <label>
      <input type="checkbox" id="setting-global-hide-likers"> Hide 'Liked by users' for each entry
    </label>
  </div>
</div>
</li>
]]></r>).toString());

    var global_settings = ['use_iframes', 'url_in_subject', 'hide_likers'];

    // Loop the possible global settings and set the checkboxs to appropriate initial values
    // based on the user's current global setting values. Also initialise a click event
    // handler for each setting.
    //
    $(global_settings).each(function(){
      var gs_name = this;
      var alt_gs_name = gs_name.replace(/_/g, '-');

      // Set the setting checkbox state based on the user's global setting value
      //
      if ($.sgr.settings['global_' + gs_name] == true) {
        $("#setting-global-" + alt_gs_name).attr('checked','checked');
      }

      // Initialise a click event handler for this setting checkbox
      //
      $("#setting-global-" + alt_gs_name).click(function() {
        $.sgr.globalSettingClickEventHandler(gs_name, false, 'setting-global-' + alt_gs_name);
      });
    });

  }

  // Settings checkbox click event handler. Handles a user changing a setting.
  //
  $.sgr.globalSettingClickEventHandler = function(gs_name, gs_default, gs_id) {
    gs_name = 'global_' + gs_name;
    var gs_value = !GM_getValue(gs_name, gs_default);
    GM_setValue(gs_name, gs_value);

    if (gs_value) {
      $("#" + gs_id).attr('checked','checked');
    } else {
      $("#" + gs_id).removeAttr('checked');
    }

  }

  // Main setup for previewing entries in iframes. Sets up appropriate listeners.
  //
  $.sgr.initMainWindowEvents = function() {

    // Do not execute this for the settings iframe
    //
    if (window.location.href.match(/\/\/(www\.|)google\.com\/reader\/settings/)) {
      //debug("returning, reader settings");
      return;
    }

    // Add the entry hostname to entry subjects (if enabled)
    //
    $.sgr.addHostnameToSubjects();

    // Note: We try to setup live events on the entire div#entries area where possible. 
    // This keeps the amount of live events to a minimum.
    //


    // div#entries live DOMAttrModified event
    //
    $("#entries").live('DOMAttrModified', function(ev){

      // If this is an .entry node and the class is being changed
      //
      if ($(ev.target).hasClass("entry") && ev.attrName === 'class') {

        // If it has the class 'expanded' but doesnt anymore, try to save any iframe.preview that exists
        //
        if (ev.prevValue.match(/expanded/) && !ev.newValue.match(/expanded/)) {
        
          // Store the time that this particular entry is being closed
          //
          var entry_closed_at_time = new Date();
          $.sgr.entry_closed_at_time[$.sgr.getXPath(ev.target)] = entry_closed_at_time.getTime();
          $.sgr.removePreview(ev.target);

        // Else if it doesn't have the class 'expanded' but previously did, try to open an iframe.preview
        //
        // TODO support for ctrlKey toggling of iframe on a per-entry basis
        //
        } else if (!ev.prevValue.match(/expanded/) && ev.newValue.match(/expanded/) && $.sgr.getSetting('use_iframes')) {
          //debug('class "expanded" added. prevValue: "' + ev.prevValue, '", newValue: "' + ev.newValue + '"');

          // Grab the time that this entry is being opened
          //
          var entry_opened_at_time = new Date();
          var entry_xpath = $.sgr.getXPath(ev.target);

          // Check if this entry was recently closed. Google reader seems to remove, add, and remove the 'expanded'
          // class when closing an entry. This causes it to 'flicker' on the screen. We check that the entry
          // wasn't recently (<500ms) closed before we attempt to open it, in order to avoid the flicker.
          //
          if (typeof $.sgr.entry_closed_at_time[entry_xpath] != 'undefined') {
            //debug("found previous entry_closed_at_time = " + $.sgr.entry_closed_at_time[entry_xpath]);

            if (500 > (entry_opened_at_time.getTime() - $.sgr.entry_closed_at_time[entry_xpath])) {
              //debug("time diff < 500 : " + (entry_opened_at_time.getTime() - $.sgr.entry_closed_at_time[entry_xpath]));
              return;
            }
          }

          // Show the preview iframe
          //
          $.sgr.showPreview($(ev.target).closest(".entry")); 
        }
      }
    });

    // div#entries live DOMNodeInserted event
    //
    $("#entries").live('DOMNodeInserted', function(ev){
      var ev_target = $(ev.target);

      // If this is an .entry node being inserted, add the entry hostname to it's subject (if appropriate).
      //
      if (ev_target.hasClass("entry")) {
        $.sgr.addHostnameToSubject(ev_target, '.entry-title');
      }
    });


    // 'Settings' menu live click event. Inject our own items into the menu.
    //
    $("#stream-prefs-menu").live('click', function(ev) {
      // Remove any existing settings we may have injected
      //
      $("#stream-prefs-menu-menu .sgr-menuitem").remove();

      // Inject our settings options
      //
      $("#stream-prefs-menu-menu .goog-menuseparator:first").before($.sgr.getGoogMenuseparatorHtml() + $.sgr.getGoogMenuitemHtml('menu_use_iframes', 'Full entry content', $.sgr.getSetting('use_iframes')) + $.sgr.getGoogMenuitemHtml('menu_url_in_subject', 'Show host in subject', $.sgr.getSetting('url_in_subject')));

      // Initialise a hover event for hovering over our settings menu options
      //
      $(".sgr-menuitem").hover(
        function(ev) {
          $(this).addClass("goog-menuitem-highlight");
        },
        function(ev) {
          $(this).removeClass("goog-menuitem-highlight");
        }
      );
    });

    // Feed/folder setting menu option live click event
    //
    $(".sgr-menuitem").live('click', function(ev) {
      var var_type = $(this).attr('id').match(/^menu_(.*)/)[1];

      // Get the setting name
      //
      var var_name = $.sgr.getSettingVarName(var_type);
      if (var_name == false) {
        return false;
      }

      // If this feed/folder doesn't already have a setting for this, use
      // the global setting to determine what to set the feed/folder setting to
      //
      var var_value = !$.sgr.getSetting(var_type);

      GM_setValue(var_name, var_value);
      $.sgr.settings[var_name] = var_value;

      // Set the setting in the menu to display our new value (a tick beside the setting).
      //
      if (var_value) {
        $(this).addClass("goog-option-selected");
        if ($(this).attr('id') == 'menu_url_in_subject') {
          $.sgr.addHostnameToSubjects();
        }
      } else {
        $(this).removeClass("goog-option-selected");
        if ($(this).attr('id') == 'menu_url_in_subject') {
          $.sgr.removeHostnameFromSubjects();
        }
      }

    });

    // 'Back to Google reader' settings close live click event (settings iframe will have a class adjusted)
    // 
    $("#settings-frame").live('DOMAttrModified', function(ev){

      // If the settings iframe is being hidden after being shown,
      // look for changes to hide_likers and then reload the $.sgr.settings 
      // array because settings may have been updated.
      //
      if (!$(ev.target).hasClass("loaded") && ev.attrName === 'class') {

        // Note: The $.sgr.settings container has the *previous* values for global settings
        // in it at this point. This is because the settings were changed in an iframe, and 
        // not in the parent. This allows us to compare $.sgr.settings values to the GM_getvalue()
        // equivalent to find settings that have changed and then take appropriate action.
        //

        // If hide_likers is being disabled, show all entry likers
        //
        if ($.sgr.getSetting('hide_likers') && !GM_getValue('global_hide_likers')) {
          debug("previous global_hide_likers is true, new is false");
          $.sgr.addStyles(' .entry-likers { display: ""; }');
          $(".entry-likers").css('display','');

        // If hide_likers is being enabled, hide all entry likers
        //
        } else if (!$.sgr.getSetting('hide_likers') && GM_getValue('global_hide_likers')) {
          debug("previous global_hide_likers is false, new is true");
          $.sgr.addStyles(' .entry-likers { display: none; }');
          $(".entry-likers").css('display','none');
        }

        // Re-initialise the settings container values so they pickup changes done in the settings iframe
        //
        $.sgr.initSettings();

      }
    });

    // Listener for iframe messages
    //
    $(window).bind("message", $.sgr.receiveIframeMessage);
  }


  // Main setup for Google Reader Settings iframe. Initialises listeners and injects settings
  // tab and tab content into the DOM.
  //
  $.sgr.initSettingsWindow = function() {

    // Only execute this for the settings iframe
    //
    if (!window.location.href.match(/\/\/(www\.|)google\.com\/reader\/settings/)) {
      return;
    }

    $.sgr.initSettingsNavigation();

    // Live event for DOMNodeInserted on #settings
    //
    $("#settings").live('DOMNodeInserted', function(ev){
      var ev_target = $(ev.target);

      // If the inserted node is a setting tab, check if we want to insert our own tab.
      //
      if (ev_target.hasClass("setting-group-title")) {
        $.sgr.setting_group_title_add_count += 1;

        // When the 6th (last) setting tab has been inserted, append our Enhanced setting tab
        // 
        if ($.sgr.setting_group_title_add_count == 6) {

          // Inject the Enhanced tab heading html
          //
          $("#settings-navigation").append('<h3 id="setting-header-enhanced" class="setting-group-title"><span class="link setting-group-link">Super</span></h3>');

          // Click event for Enhanced tab. Add "selected" state for our enhanced tab and remove it from other tabs.
          //
          $("#setting-header-enhanced").click(function(){
            $("#settings .setting-group-title, #settings .setting-group").removeClass("selected");
            $("#setting-header-enhanced, #setting-enhanced").addClass("selected");
          });

          // Click event for non-Enhanced tabs. We need to remove the "selected" state from our enhanced tab.
          //
          $(".setting-group-title:not(#setting-header-enhanced)").click(function(){
            $("#setting-header-enhanced, #setting-enhanced").removeClass("selected");
          });
        }
      } 
    });
  }

  // Find and return the external/outgoing link for a specific entry
  //
  $.sgr.getEntryUrl = function(entry) {
    return entry.find('.entry-original').attr('href');
  }

  // Append an entry's hostname to it's subject (or any specified selector).
  // Take into account the global setting for appending an entries hostname.
  //
  $.sgr.addHostnameToSubject = function(entry, selector) {
    if ($.sgr.getSetting('url_in_subject')) {
      entry.find(selector).append('<span class="hostname"> ' + $.sgr.getEntryHostname(entry) + '</span>');
    }
  }

  // Add entry hostnames to all available entries
  //
  $.sgr.addHostnameToSubjects = function() {
    $(".entry").each(function(){
      $.sgr.addHostnameToSubject($(this), '.entry-title');
    });
  }

  // Remove the hostname from entry subjects if it exists
  //
  $.sgr.removeHostnameFromSubjects = function() {
    $(".entry-title .hostname").remove();
  }

  // Find the hostname for an entry, based on it's external/outgoing link
  //
  $.sgr.getEntryHostname = function(entry) {
    return $.sgr.getEntryUrl(entry).match(/\/\/([^\/]*?)(?:\/|$)/)[1].replace(/^www./, '');
  }

  // Contruct the HTML for a dropdown menu option item
  //
  $.sgr.getGoogMenuitemHtml = function(id, label, selected) {
      return '<div class="sgr-menuitem goog-menuitem goog-option' + (selected ? ' goog-option-selected' : '') + '" role="menuitem" style="-moz-user-select: none;" id="' + id + '"><div class="goog-menuitem-content"><div class="goog-menuitem-checkbox"></div>' + label + '</div></div>';
  }

  // Contruct the HTML for a dropdown menu separator item
  //
  $.sgr.getGoogMenuseparatorHtml = function() {
    return '<div class="goog-menuseparator sgr-menuitem" style="-moz-user-select: none;" role="separator" id=""></div>';
  }


  // Main run of all code
  //
  $.sgr.run = function() {

    $.sgr.initSettings();

    $.sgr.initStyles();

    $.sgr.initMainWindowEvents();

    $.sgr.initSettingsWindow();

  }

  /////////
  // MAIN
  /////////

  $.sgr.run();

})(jQuery);

