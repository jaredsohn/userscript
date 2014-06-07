// ==UserScript==
// @name            co-meeting [Fluid.app]
// @namespace   http://www.co-meeting.com
// @description     co-meeting extension for FluidApp. Adds a dock badge when you have unread group messages.
// @include     http://www.co-meeting.com/*
// @version         0.1
// @copyright       2012, Shinsaku Chikura
// ==/UserScript==

window.fluid.dockBadge = '';

setInterval(updateDockBadge, 5000);

function updateDockBadge() {
  var newBadge = '';
  var badgeElm = document.getElementById('my-groups-button-badge');
  var totalCount = parseInt(badgeElm.innerHTML);
  var numUnreads = totalCount + "";
  if (numUnreads != '0') {
    newBadge = numUnreads;
  }
  window.fluid.dockBadge = newBadge;
}
