// ==UserScript==
// @name           SpamCop - Reporting helper/automator
// @namespace      http://khopis.com/scripts
// @description    Helper for reporting; check fwd, goto report page, err->home
// @include        http://www.spamcop.net/*
// @include        http://spamcop.net/*
// @author         Adam Katz <scriptsATkhopiscom>
// @copyright      2007+ by Adam Katz
// @license        AGPL v3+
// @version        1.2
// @lastupdated    2008-12-03
// ==/UserScript==
/*
 * This helper does six things:
 *   1. Your forward address on the report page is automatically checked.
 *   2. An extra "submit" button is added, and you can submit via "SHIFT+ALT+S"
 *   3. Error pages (from recovered crashes) are redirected to / after 2 sec.
 *   4. If there are pending reports, you automatically follow the link there.
 *   5. If you enable it (first non-comment line), reports are auto-submitted.
 *   6. Common headers (From, To, Subject, Date) are highlighted in summaries.
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

var autoSubmit = false;  // set this to true to COMPLETELY automate submissions

var pathsearch = location.pathname + location.search;

////// Auto-check user-defined forward address (like unregistered@coldrain.net)
if ( pathsearch.match(/^\/?sc\?id=.../) ) {
  inputs = document.getElementsByTagName("input");
  for (var i=0; i<inputs.length; i++) {
    if (inputs[i].value.match(/Send Spam Report/)) {
      inputs[i].setAttribute("accessKey","s"); // submit on SHIFT+ALT+S
      var extraSubmit = inputs[i].cloneNode(false);
      extraSubmit.id = "extraSubmit";
      GM_addStyle("#extraSubmit { position:absolute; top:6.25em; left:1em; }");
      GM_addStyle("#content { padding-top:4em; }");
      inputs[i].parentNode.insertBefore(extraSubmit, inputs[i]);
      i++; // skip the node we just created
    }
    if (inputs[i].value != "notify") { continue; }
    // get send input from notify, so if type2 has value="notify", check send2
    forward = inputs[i].name.replace(/^[a-z]*/,"send");
    document.getElementsByName(forward)[0].checked = true;
  }
  /* auto-submit ... Robin Monks's version does something special for pages  *
   * that have more than one "sendreport" item whereas I just assume we      *
   * want the first one.  See http://userscripts.org/scripts/show/6533       */
  if(autoSubmit) try { document.getElementsByName("sendreport")[0].submit(); }
  catch(e) { /* alert("Auto-submit failed with error:\n" + e); */ }

  /* color the important parts of the header for easier skimming */
  var emailBody = document.getElementById("content");
  if (emailBody) {
    emailBody = emailBody.getElementsByTagName("pre");
    if (emailBody && emailBody[0]) {
      emailBody[0].innerHTML = emailBody[0].innerHTML.replace (
        /\n((From|Subject|To|Date): [^\n]*)(?=\n)/g, // zero-width look-ahead
        '\n<span class="$2">$1</span>'
      );
      GM_addStyle("\n"
        + "#content pre > span[class] { font-weight:bold; color:black; }\n"
        + "span.Subject { background-color:#bee; }\n" // blue
        + "span.From    { background-color:#ebb; }\n" // red
        + "span.Date    { background-color:#beb; }\n" // green
        + "span.To      { background-color:#fea; }\n" // yellow
      );
    }
  } // end coloring

}

////// If we're loading up "/sc" with an error, go to the top level after 2 sec
else if ( pathsearch.match(/^\/?sc\??$/) ) {
  strongs = document.getElementsByTagName("strong");
  for (var i=0; i<strongs.length; i++) {
    if (strongs[i].innerHTML != "No data / Too much data") { continue; }
    var note = document.createElement("span");
    note.innerHTML = " (redirecting you home in 2 seconds...)";
    note.style.color = "red";
    strongs[i].appendChild(note);
    window.setTimeout( function(){ location.pathname = ''; }, 2000);
  }
}

////// Auto-click on report pages when they appear
if ( pathsearch.match(/^\/?(sc)?$/) ) {
  links = document.getElementsByTagName("a");
  for (var i=0; i<links.length; i++) {
    if (! links[i].text.match(/Report Now/) ) { continue; } // skip misses
    location.href = links[i].href; // go to the report page
  }
}
