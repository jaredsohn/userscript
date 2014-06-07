// ==UserScript==
// @name           Redmine single-click setters
// @namespace      http://henrik.nyh.se
// @description    Instead of painful dropdowns, use a single click to select tracker, status or priority; assign to yourself; set version to current, next or last. Compatible with GreaseKit (e.g Fluid.app).
// @include        http://redmine.*
// @include        https://redmine.*
// ==/UserScript==

function jQueryIsReady($) {

  GM_addStyle(' .shortcuts a { padding: 4px; font-size: 11px; } ');

  // Single click to assign to a tracker, status or priority.
  $(['tracker', 'status', 'priority']).each(function() {
    var attribute = this;
    $('#issue_'+attribute+'_id').after('<span class="shortcuts"></span>');
    $('#issue_'+attribute+'_id option').each(function() {
      var val  = $(this).val();
      var text = $(this).text();
      $('#issue_'+attribute+'_id + .shortcuts').append('<a href="#" cid="'+val+'">'+text+'</span>');
    });
    $('#issue_'+attribute+'_id + .shortcuts a').click(function() {
      $('#issue_'+attribute+'_id').val( $(this).attr('cid') );
      return false;
    });

  });

  // Single click to assign to "me".
  var me_id = $('#loggedas a').attr('href').match(/(\d+)\/?$/)[0];
  $('#issue_assigned_to_id').after('<span class="shortcuts"><a href="#" id="set_me">Me</a></span>');
  $('#set_me').click(function() {
    $('#issue_assigned_to_id').val(me_id);
    return false;
  });

  // Single click to set target version to "this" (current, assumes you always asterisk the current target, e.g. "1.2*"), "next" (after the "*" one), "last" (last version in list).
  var current_version_id = $('#issue_fixed_version_id option[text$=*]').val();
  var next_version_id = $('#issue_fixed_version_id option[text$=*] + option').val();
  var last_version_id = $('#issue_fixed_version_id option:last').val();
  $('#issue_fixed_version_id').after('<span class="shortcuts"><a href="#" cid="'+current_version_id+'">This</a> <a href="#" cid="'+next_version_id+'">Next</a> <a href="#" cid="'+last_version_id+'">Last</a></span>');
  $('#issue_fixed_version_id + .shortcuts a').click(function() {
    $('#issue_fixed_version_id').val( $(this).attr('cid') );
    return false;
  });

}


// ----------------------------------------------------------------------
// Greasemonkey/GreaseKit compatibility
// ----------------------------------------------------------------------


if (typeof(unsafeWindow) === 'undefined') {
 unsafeWindow = window;
}

// Based on http://userscripts.org/topics/1912
if (typeof(GM_addStyle) === "undefined") {
  GM_addStyle = function(styles) {
    var oStyle = document.createElement("style");
    oStyle.setAttribute("type", "text/css");
    oStyle.appendChild(document.createTextNode(styles));
    document.getElementsByTagName("head")[0].appendChild(oStyle);
  }
}


// ----------------------------------------------------------------------
// jQuery
// ----------------------------------------------------------------------

var script = document.createElement('script');
script.src = 'http://jquery.com/src/jquery-latest.js';
script.type = 'text/javascript';
script.addEventListener("load", function() {
  unsafeWindow.jQuery.noConflict();
  jQueryIsReady(unsafeWindow.jQuery);
}, false);
document.getElementsByTagName('head')[0].appendChild(script);
