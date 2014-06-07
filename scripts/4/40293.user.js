// ==UserScript==
// @name           Youtube BBCode Button
// @namespace      http://userscripts.org/scripts/show/40293
// @description    Formatted BBCode for sharing videos, complete with description and thumbnails, on BBCode compliant forums
// @include        http://*.youtube.com/watch?*
// @include        http://www.dmack.ca/uchoob/*
// @version        2009/09/18
// ==/UserScript==


if(document.getElementById("watch-actions-area"))
{
   var watchArea = document.getElementById("watch-actions-area");
   var bbcodeButton = document.createElement('div');
   bbcodeButton.setAttribute("class","watch-recent-shares-div");

   bbcodeButton.innerHTML = "<div class=\"watch-recent-shares-div\">\n<div class=\"watch-recent-share\">\n<a href=\"http://www.dmack.ca/uchoob/index.php?url=" + encodeURIComponent(document.getElementById("watch-url-field").value) + "\" target=\"_blank\" onclick=\"openPopup('http://www.dmack.ca/uchoob/index.php?url=" + encodeURIComponent(document.getElementById("watch-url-field").value) + "\', 'BBCode', 580, 900, true);return false;\">\n<span>BBCode</span>\n</a>\n</div>\n</div>";

   document.getElementById("more-options").parentNode.parentNode.insertBefore(bbcodeButton,document.getElementById("more-options").parentNode);

}
else if(document.getElementById("uchoobform") && document.getElementsByName("url")[0].value != "")
   document.getElementById("fetchsubmit").click();