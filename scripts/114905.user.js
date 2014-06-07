// ==UserScript==
// @name           KILL THE BLOG JS COMPANION
// @namespace      killblog@kwierso.com
// @include        http://roosterteeth.com/members/index.php
// @include        http://roosterteeth.com/members/
// ==/UserScript==

(function() {
  var innerRiver = document.getElementById("innerRiver");
  var firstChild = innerRiver.getElementsByTagName("div")[0];
  if(firstChild.id.match("streamDivLevelnewsBlog") != "streamDivLevelnewsBlog") {
    innerRiver.parentNode.parentNode.setAttribute("blogfree", "true");
  } else {
    var noAlerts = document.createElement("div");
    noAlerts.className = "freedom";
    noAlerts.textContent = "You have nothing new to read! Congratulations, you're free!"
    innerRiver.parentNode.appendChild(noAlerts);
  }
})();