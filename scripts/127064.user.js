// ==UserScript==
// @name            Wunderkit [Fluid.app]
// @namespace   http://fluidapp.com
// @description     Wunderkit extension for FluidApp. Adds a dock badge when you have unread tasks and activities.
// @include     https://www.wunderkit.com/*
// @version         0.1
// @copyright       2012, Shinsaku Chikura
// ==/UserScript==

window.fluid.dockBadge = '';

setInterval(updateDockBadge, 5000);

function updateDockBadge() {
  var newBadge = '';
  var totalCount = 0;
  var badgesRoot = document.getElementById('wk-notifications');
  var badgeElms = badgesRoot.getElementsByClassName('wk-badge');
  for (i = 0; i < badgeElms.length; i++) {
    var elm = badgeElms[i];
    if (elm.style.display != 'none') {
      totalCount += parseInt(elm.innerHTML);
    }
  }
  // console.log(totalCount);
  var numUnreads = totalCount + "";
  if (numUnreads != '0') {
    newBadge = numUnreads;
  }
　
  window.fluid.dockBadge = newBadge;
}
