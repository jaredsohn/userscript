// ==UserScript==
// @name        Dock Badge for Timer Status for Co-op
// @namespace   http://fluidapp.com
// @description If no timer is running on http://coopapp.com/groups/xxx page, then a "?" badge is displayed on the fluidapp dock icon ()
// @include     http://coopapp.com/groups/*
// @include     http://*.coopapp.com/groups/*
// @author      Dr Nic Williams, http://drnicwilliams.com, http://mocra.com - the premier iPhone/Rails consultancy 
// ==/UserScript==

(function () {
    if (window.fluid) {
      function updateBadges() {
        if ($$('div.current_timer[class~=from_current_user]').length > 0) {
          window.fluid.dockBadge = "";
        } else {
          window.fluid.dockBadge = "?";
        }
        setTimeout(updateBadges, 500);
      }
      updateBadges();
    }
})();