/* This program is free software. It comes without any warranty, to
 * the extent permitted by applicable law. You can redistribute it
 * and/or modify it under the terms of the Do What The Fuck You Want
 * To Public License, Version 2, as published by Sam Hocevar. See
 * http://www.wtfpl.net/ for more details. */

// ==UserScript==
// @name              Kaskus - Hide Deleted VM
// @id                kaskus.vm@loucypher
// @namespace         http://userscripts.org/users/12
// @description       Hide deleted VM on your profile page.
// @version           7.5
// @author            LouCypher
// @license           WTFPL
// @icon              http://loucypher.github.io/userscripts/kaskus/kaskus-48.png
// @icon64URL         http://loucypher.github.io/userscripts/kaskus/kaskus-64.png
// @contributionURL   http://loucypher.github.io/userscripts/donate.html?Kaskus+-+Hide+Deleted+VM
// @homepageURL       https://greasyfork.org/scripts/10
// @supportURL        https://greasyfork.org/scripts/10/feedback
// @downloadURL       https://greasyfork.org/scripts/10/code.user.js
// @updateURL         https://greasyfork.org/scripts/10/code.user.js
// @resource          CSS https://raw.github.com/LouCypher/userscripts/master/kaskus/moderated-vm-fix.css
// @resource          CHANGELOG https://raw.github.com/LouCypher/userscripts/master/kaskus/kaskus-hide-deleted-vm.CHANGELOG.txt
// @resource          LICENSE https://raw.github.com/LouCypher/userscripts/master/licenses/WTFPL/LICENSE.txt
// @include           /^http://www\.kaskus\.co\.id/profile(/[0-9]+)?/?$/
// @run-at            document-start
// @grant             unsafeWindow
// @grant             GM_getValue
// @grant             GM_setValue
// @grant             GM_addStyle
// @grant             GM_getResourceText
// @grant             GM_log
// ==/UserScript==

var log = (typeof GM_info == "object") ? "" : "\n";

// Get user's numeric id from cookie if user is logged in
function getUserId() {
  var userid = "";
  document.cookie.split(";").forEach(function(cookie) {
    if (/userid/.test(cookie)) {
      userid = cookie.match(/\d+/).toString();
    }
  })
  log += "* You" + (userid ? " have" : "'re NOT") + " logged in.";
  return userid;
}

// Check if current page is user's profile page
function isMyProfile(aUserId) {
  var mine = false;
  if ((location.href.match(/\d+/) == aUserId) ||
      (/\/profile\/?$/.test(location.pathname))) {
    mine = true;
  }
  if (aUserId) {
    log += "\n* This is" + (mine ? " " : " NOT ") + "your profile page.";
  }
  return mine;
}

// Run on startup if argument is true
function start(aOK) {
  if (aOK) {
    window.addEventListener("afterscriptexecute", process, true);
    document.addEventListener("DOMContentLoaded", contentLoad, false);
  }
  log += "\n* The userscript is" + (aOK ? " " : " NOT ") + "running.\n";
  GM_getValue("debug", false) && GM_log(log);
  GM_setValue("debug", GM_getValue("debug", false));
}

// Run after each script is executed
function process(aEvent) {
  if (/profile.js$/.test(aEvent.target.src)) {
    window.removeEventListener(aEvent.type, arguments.callee, true);

    unsafeWindow.hideDeleted = true; // 'hideDeleted' is variable that
                                     // will be used by 'Show/Hide' button

    var $ = unsafeWindow.$;

    // Override 'getVM' function
    unsafeWindow.getVM = function getVM(b) {
      b && $("#do-see-more-updates").remove();
      var profile = $("#profile-content");
      profile.append('<div class="item" style="text-align:center"' +
                     ' id="ajax_loader_html"><img src="http://kkcdn-static.' +
                     'kaskus.co.id/img/ajax-loader.gif"/></div>');
      $.getJSON("/profile/stream_activity_vm/all/" + (b ? b : "0") + "/" +
                $("#userid").val(), function(c) {
        $("#ajax_loader_html").remove("");
        $.each(c.stream_activity, function(e, f) {
          var deleted = /deleted\-vm/.test(f.content);
          var hideDeleted = unsafeWindow.hideDeleted;
          var html = '<div class="item' +
                     (deleted ? ' deleted' : '') +
                     (deleted && hideDeleted ? ' hide' : '') +
                     '" id="vm_' + f.vmid + '"><div class="item-content">' +
                     '<a href="#vm_' + f.vmid + '" class="entry-head">' +
                     '<i class="icon-star"></i></a>' + f.profilepic +
                     '<div class="message"><div class="vcard">' + f.username +
                     f.date + '</div>' + f.content + '</div></div>';
          if (f.button_action != "") {
            html += '<div class="m-meta">' + f.button_action + "</div>"
          }
          html += "</div>";
          profile.append(html);
          if (c.stream_activity.length - 1 == e && f.username != "") {
            profile.append('<div class="load-more"><a href="javascript:' +
                           'void(0);" id="do-see-more-updates" onclick="' +
                           'getVM(\'' + c.oldest_id + '\'); return false;"' +
                           ' class="button small white">Load More updates' +
                           '</a></div>')
          }
        })
      })
    }

    // Override 'moderate_vm' function
    unsafeWindow.moderate_vm = function moderate_vm(a, c) {
      $.get("/visitormessage/moderate/" + a + "/" + c, function(d) {
        if (c == "delete") {
          $("#vm_" + a + " .m-meta").html('<a href="javascript:void(0);"' +
                                          ' onclick="moderate_vm(' + a +
                                          ',\'undelete\');return false;"' +
                                          ' class="delete"><i class="icon-' +
                                          'trash"></i>Undelete</a>')
          $("#vm_" + a).addClass("deleted");
          $("#vm_" + a + " .message").addClass("deleted-vm"); // paint it red
          unsafeWindow.hideDeleted && $("#vm_" + a).addClass("hide"); // hide
        } else { // undelete
          $("#vm_" + a).html(d);
          $("#vm_" + a).removeClass("deleted hide"); // unhide
        }
      })
    }
  }
}

// Run at DOMContentLoaded
function contentLoad() {
  // Scriptish doesn't add styles at document-start so we put it here
  GM_addStyle(GM_getResourceText("CSS"));

  if (document.querySelector('div[class^="wrap op"]') ||  // over posting
      document.querySelector("div.pong-wrapper"))         // main tenis
    return; // Don't run if Kaskus is over posting or main tenis

  if (!("$" in unsafeWindow)) {
    var msg = "JavaScript must be enabled for Kaskus - Hide Deleted VM "
            + "user script to work.\nIf you have NoScript extension, "
            + "you must allow `googleapis.com`, `kaskus.com` and\n"
            + "`kaskus.co.id` from NoScript menu.";
    alert(msg);
    throw new Error(msg);
  }

  var $ = unsafeWindow.$;

  // Add button to toggle show/hide deleted VM
  $("#say-what .act input").after('<input type="button" value="Show deleted' +
                                  ' VM" class="button small white" style="' +
                                  'float:left"/>');

  // Button action
  $("#say-what .act input[type='button']").click(function(e) {
    if ($(".deleted").hasClass("hide")) {
      e.target.value = e.target.value.replace(/^Show/, "Hide");
      $(".deleted").removeClass("hide");
      unsafeWindow.hideDeleted = false;
    }
    else {
      e.target.value = e.target.value.replace(/^Hide/, "Show");
      $(".deleted").addClass("hide");
      unsafeWindow.hideDeleted = true;
    }
  })
}

// Start if current page is user's profile page
start(isMyProfile(getUserId()));
