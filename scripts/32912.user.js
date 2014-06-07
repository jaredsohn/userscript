// ==UserScript==
// @name           Show LJ Tag Count
// @namespace      http://userscripts.org/users/29897
// @description    Show the # of tags on the Manage Tags page.
// @include        http://www.livejournal.com/manage/tags.bml*
// ==/UserScript==

var tagSelect = document.getElementById("tags").childNodes.length;
var legendOne = document.getElementsByTagName("legend")[0];

// You can, naturally, change the styling of the tag count fairly easily.
// I just wanted it both present and inobtrusive.

var newText = " <span style=\"color: #060; font-weight: normal;\">(" + tagSelect + ")</span>"

legendOne.innerHTML = legendOne.innerHTML + newText;