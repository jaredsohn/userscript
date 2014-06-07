// ==UserScript==
// @name           Generic Autologin (w/ Password Manager) BETA
// @namespace      http://khopis.com/scripts
// @description    Automatically log into sites saved in the Password Manager
// @include        *
// @author         Adam Katz <scriptsATkhopiscom>
// @copyright      2008+ by Adam Katz
// @license        AGPL v3+
// @version        0.04
// @lastupdated    2009-01-27
// ==/UserScript==
/*
 * Some notes:  I'm not sure how stable this is, specifically regarding
 * infinite loops.  There are two anti-looping checks.  One merely looks
 * for words indicating a bad login attempt (or a log-out link), which
 * means some pages won't auto-log-in while others will still loop
 * infinitely.  The other tries to ensure that the referring page is not
 * also the current page, but I don't think that works as intended
 * (actually, I think it ends up never activating).  So it goes.
 * 
 * Known bug:  Some sites bring you back to the login page when you log
 * out.  For most of those sites, this script will log you back in (d'oh!).
 * Many of those sites fail to mention that you've successfully logged out,
 * which means there's no way for me to implement a check to prevent this.
 * The best solution I have is to use the addon mentioned below.
 * 
 * In a sticky situation, either log out of the master password so that
 * nothing gets filled in or temporarily disable Greasemonkey or this
 * userscript.  I also use "Master Password Timeout" to prevent
 * auto-logins:  https://addons.mozilla.org/en-US/firefox/addon/1275
 * 
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License at <http://www.gnu.org/licenses>.
 */

var pws = document.evaluate("//input[contains(@type,'password')]",
            document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

if (
  ! document.body.innerHTML.match(
    /invalid|denied|failed|log\W?(out|off)|\S\blogged\W(in|out)/i )
    // ("\S\b" prevents matching "not logged in")
  && document.referrer != location.href	// stave off infinite loops
  && pws.snapshotLength == 1		// has exactly one password field
  && document.title.match(/\blog\W?in\b/i)	// title includes text "log in"
  && getComputedStyle(document.body,'').height.match(/\d+/) < 1024 // small page
) {

  window.setTimeout( function(){ // trigger for auto-submit


    function snag(xpath, source) {
      if (source == null) source = document;
      return document.evaluate(xpath, source, null,
                               XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    }

    // (variables are not inherited, so we must re-fetch them)
    var form = snag("//input[contains(@type,'password')]");
    form = form.snapshotItem(0);
    if (form.value.match(/..../) ) { // if there is a password entered
      while (form != document.body) {
        form = form.parentNode; // climb up through parents to get to form
        if (form.method == "post") {
          var submits = snag("//input[contains(@type,'submit')]", form);
          if (submits.snapshotLength == 0) {
            submits = snag("//input[contains(@type,'button')]", form);
          }
          if (submits.snapshotLength == 1) {
            submits.snapshotItem(0).click();
          } else {
            form.submit();
          }
          break;
        }
      }
    }


  }, 10); // 10ms delay ensures this happens after Password Manager is called

}
