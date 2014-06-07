// ==UserScript==
// @name        GitHub Inbox Dock Badge
// @namespace   http://fluidapp.com
// @description Displays GitHub inbox's unread count on the dock icon badge for a GitHub Fluid.app.
// @include     *
// @author      Christopher Sexton http://www.codeography.com
// ==/UserScript==

(function () {
    if (window.fluid) {
      function updateBadges() {
        if ($('a.unread_count').html()> 0) {
          window.fluid.dockBadge = $("a.unread_count").html();
        } else {
          window.fluid.dockBadge = "";
        }
      }
      updateBadges();
    }
})();

