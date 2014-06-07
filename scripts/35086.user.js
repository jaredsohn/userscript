// ==UserScript==
// @name           ImageShack - un-check and hide HotJobs ad
// @namespace      http://khopis.com/scripts
// @include        http://imageshack.tld/
// @include        http://*.imageshack.tld/
// @author         Adam Katz <scriptsATkhopiscom>
// @copyright      2008 by Adam Katz
// @license        AGPL v3+
// @version        0.4
// @lastupdated    2008-10-06
// ==/UserScript==

// I've seen this site render that ad twice with the same id
// so rather than using getElementById, we'll search for it.

var hotjobs = document.getElementsByTagName("input");
for (var i=0; i<hotjobs.length; i++) {
  if (hotjobs[i].checked && hotjobs[i].id == "p_ct_checkbox") {
    hotjobs[i].checked = false;
    hotjobs[i].parentNode.style.display = "none";
  }
}
