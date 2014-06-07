// ==UserScript==
// @name            NewsBlur [Fluid.app]
// @namespace       http://fluidapp.com
// @description     Display a dock badge for NewsBlur with the number of unread stories.
// @include         *newsblur.com*
// @version         0.2
// @copyright       2013, Reavis Sutphin-Gray
// ==/UserScript==

if (!window.fluid) {
  return;
}

setInterval(updateDockBadge, 5000);

function updateDockBadge() {
  var matches, newBadge;
  matches = document.title.match(/\((.*)\)/);
  newBadge = '';
  if (matches && matches[1] !== '0') {
    newBadge = matches[1];
  }
  window.fluid.dockBadge = newBadge;
}