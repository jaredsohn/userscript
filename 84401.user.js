// ==UserScript==
// @name        Notification
// @namespace   http://fluidapp.com
// @description Display a dock badge for Nirvania when using Fluid.
// @include     https://www.nirvanahq.com/*
// @include     http://www.nirvanahq.com/*
// @author      Eric Hines
// ==/UserScript==

if (!window.fluid) {
	return;
}

var currentCount = 10;
var refreshInterval = 1000;
var refreshUrl = "https://www.nirvanahq.com/app";
var req;

refresh();

function refresh() {
  req = new XMLHttpRequest();
  req.onreadystatechange = processReqChange;
  req.open("GET", refreshUrl);
  req.send("");
}

// handle onreadystatechange event of req object
function processReqChange() {
  // only if req shows "loaded"
  if (req.readyState == 4) {
    // only if "OK"
    if (req.status == 200) {
      updateBadges(120000);
    } else {
     setTimeout(refresh, refreshInterval);
     window.fluid.dockBadge = "Loading";
    }
  }
}


function updateBadges(timeout) {
        var currentCount = document.getElementById('today').getElementsByClassName('all')[0].innerHTML;
        if(currentCount&&currentCount!=0) {
		window.fluid.dockBadge = currentCount;
		setTimeout(refresh, refreshInterval);
		}else{
		window.fluid.dockBadge = "Error";
		}
}