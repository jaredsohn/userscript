// ==UserScript==
// @name          Gmail Unreads Summary
// @description   Summary of unread emails in Gmail's current view, grouped by sender with unread count.
// @copyright     2009+, Winston Teo Yong Wei (http://www.winstonyw.com)
// @version       0.2.0
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.js
// @include       http*://mail.google.com/*
// ==/UserScript==
//
// ==Changelog==
// 0.0.1
//   - Prototype.
// 0.0.2
//   - Implemented [close] functionality by setting GM value.
// 0.0.3
//   - Removed [close] functionality.
//   - Implemented [minimize] and [maximize] functionality.
// 0.0.4
//   - Updated @require to use Google Ajax API.
// 0.0.5
//   - Updated search urls with URL parameters.
//   - Updated search urls with 'target=_top' for in-browser refresh.
//   - Encoded email in search urls.
// 0.0.6
//   - Updated [minimize] and [maximize] functionality to make display / hide sticky across views.
// 0.1.0
//   - GMailGreasemonkey API broke for functions: getNavPaneElement() and addNavModule()
//   - Removed usage of getNavPaneElement() which was used for creating Query URL.
// 0.1.1
//   - GMailGreasemonkey API broke for functions: getActiveViewType() and getActiveViewElement()
//   - Implemented winActiveViewType() and winActiveViewElement()
//   - Froze jQuery at version 1.3.2.
//   - Generalised @include; Fix for GoogleApp users.
// 0.1.2
//   - GMailGreasemonkey API broke for functions: registerViewChangeCallback()
//   - Added manual "Refresh" link to refresh summary.
// 0.2.0
//   - Updated position of "Refresh" link.
//   - Updated "Refresh" link to "Refresh GMUS" link.
//   - Refactored functions.
//   - Updated variable names.
// ==/Changelog==

$(document).ready(function() {

  var GMAIL = null;

  // Loads Gmail-Greasemonkey API (http://code.google.com/p/gmail-greasemonkey/wiki/GmailGreasemonkey10API)
  if (unsafeWindow.gmonkey) {
    unsafeWindow.gmonkey.load('1.0', init);
  }

  function init(obj) {

    GMAIL = obj;

    create_view();

  };

  function create_view() {

    window.setTimeout(function() {

      GM_log("Gmail Unreads Summary: Start");

      // Display Views
      switch(winActiveViewType()) {
        case 'tl' : break;
        default   : return false;
      }

      // Gmail API
      var head  = GMAIL.getMastheadElement();
      var body  = winActiveViewElement();

      // jQuerised JS Elements
      var jhead = $(head);
      var jbody = $(body);

      // Reset
      var gmus  = jhead.find('div#gmus');
      gmus.remove();

      // Create Views
      create_refresh(jhead, jbody);
      create_content(jhead, jbody);

      GM_log("Gmail Unreads Summary: End");

    }, 200);

  };

  function create_refresh(jhead, jbody) {

    if (!jbody.find('div#gmus_refresh').is('*')) {

      // Create Refresh Link
      var jlink = $('<div id="gmus_refresh" class="J-J5-Ji"><a class="AP" href="#">Refresh "Unread"</a></div>');

      // Append to Body
      jbody.find('div.J-J5-Ji').find('div.AP').parent().after(jlink);

      // Action -  Refresh Binding
      var gmus_refresh = jbody.find('div#gmus_refresh');

      gmus_refresh.bind('click', function() {
        create_view();
      });

    }

  };

  function create_content(jhead, jbody) {

    // Summarise
    var unreads = new Array();
    var cnt     = 0;

    var dhref   = jhead.find('a#:qw.e').attr('href');       // Main URL
    var items   = jbody.find('tr.zE');                      // Class for Unread Emails

    for (var i=0; i<items.length; i++) {

      var item  = items[i];

      var sname = $(item).find('span.zF').html();
      var email = $(item).find('span.zF').attr('email');
      var query = dhref.substring(0, dhref.indexOf('#')) + '#search/in:inbox+label:unread+from:' + encodeURIComponent(email);

      if (unreads[email] == null) {
        unreads[email] = new Array(sname, email, query, 1);
      } else {
        unreads[email][3] += 1;
      }
      cnt++;

    }

    if (cnt > 0) {

      // Create Content
      var jelem = $('<div id="gmus" style="display: block; overflow: hidden; background: transparent; border: 1px solid lightblue; padding: 0px; margin: 2px 10px 2px 29px; width: 102px; "></div>');
      jelem.append('<h5 class="header" style="display: block; float: left; padding: 0px; margin: 0px 1px 0px 5px; color: #000000;">Unread:' + '  ' + cnt + '' + '</h5>');
      jelem.append('<div id="gmus_toggler"  style="float: right; cursor: pointer; font-family: Courier; font-size: 5px; color: #000000; margin-right: 4px;">[' + (GM_getValue('gmus_hide', false) ? '+' : '-') + ']</div>');

      var contents = '<div id="gmus_content" style="display:' + (GM_getValue('gmus_hide', false) ? 'none' : 'block') + ';"><ul style="list-style-type: none; padding: 0px; margin 0px;">'
      for (var email in unreads) {
        var unread = unreads[email];
        contents  += '<li style="display: block; float: left; margin: 2px 10px 2px 5px; width: 102px; font-size: 10px; font-weight: normal;"><a target="_top" href="' + unread[2] + '" title="' + unread[1] + '">' + unread[0] + ' (' + unread[3] + ')' + '</a></li>';
      }
      contents    += '</ul></div>';
      jelem.append(contents);

      // Append to Head
      jhead.append(jelem);

      // Action - Minimize + Maximize Binding
      var gmus_toggler = jhead.find('div#gmus_toggler');
      var gmus_content = jhead.find('div#gmus_content');

      gmus_toggler.bind('click', function() {
        if (GM_getValue('gmus_hide',false)) {
          gmus_toggler.html('[-]');
          gmus_content.show();
          GM_setValue('gmus_hide', false);
        } else {
          gmus_toggler.html('[+]');
          gmus_content.hide();
          GM_setValue('gmus_hide', true);
        }
      });

    }

  };

  // Re-implementation of getActiveViewType
  function winActiveViewType() {

    var body  = $('iframe#canvas_frame', parent.document).contents().find('div.nH.q0CeU.z');

    if (body.is("*")) {
      return 'tl';
    } else {
      return 'na';
    }

  };

  // Re-implementation of getActiveViewElement
  function winActiveViewElement() {
    return $('iframe#canvas_frame', parent.document).contents().find('div.nH.q0CeU.z');
  };

});