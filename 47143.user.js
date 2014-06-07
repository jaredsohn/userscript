// ==UserScript==
// @name           Idiot Eraser
// @description    Version 1.0 - Removes forum posts from utter retards.
// @include        http://*forumwarz.com/discussions/*
// @include        http://forumwarz.com/discussions/*
// ==/UserScript==

// By Invariel, for KittieJenn.  <3
 
if (!GM_getValue ("FWZ_retards"))
  GM_setValue ("FWZ_retards", "");

// An array of idiots.
var idiots = GM_getValue ("FWZ_retards").split(",");
 
window.addEventListener ("load", function (e) {
  if (idiots.length > 0) {
    var thePage = document.body.innerHTML.replace (/\n/gi, '');
    var rows = thePage.split("<tr class=");
    var myRegex, regex, i, j;
 
    for (i = 0; i < rows.length; i ++)
    {
      for (j = 0; j < idiots.length; j ++)
      {
        myRegex = 'only_path="false">' + idiots[j].toLowerCase () + '</a>';
        regex = new RegExp (myRegex, "gi");

        if (rows[i].replace("<br>", "").match (new RegExp (myRegex, "gi")))
        {
          rows[i] = "";
          rows[i + 1] = "";
        }
      }
    }

    document.body.innerHTML = rows.join("<tr class=");
  }
}, "false");