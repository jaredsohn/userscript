// ==UserScript==
// @name        Google Voice Growler
// @namespace   http://fluidapp.com
// @description Auto query for new items in Google Voice and update the dock badge and growl in Fluid.
// @include     https://www.google.com/voice*
// @include     http://www.google.com/voice*
// @author      Chris Martin, @cjmartin
// ==/UserScript==

if (!window.fluid) {
  alert("This script is meant to be run in Fluid, you should disable it. kthxbye.");
  return;
}

var inboxCount = 0;
var smsCount = 0;
var missedCount = 0;
var voicemailCount = 0;

var refreshInterval = 120000;
var refreshUrl = "https://www.google.com/voice/inbox/recent/";
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
      updateCounts();
    } else {
      setTimeout(refresh, refreshInterval);
    }
  }
}

function updateCounts() {
  var json = eval('(' + req.responseXML.getElementsByTagName("json")[0].firstChild.nodeValue + ')');
  var counts = json.unreadCounts;
  if(counts.inbox != inboxCount) {
    if(counts.sms > smsCount) {
      growl((counts.sms - smsCount) + " new SMS message" + plural(counts.sms) + ".");
    }
    if(counts.missed > missedCount) {
      growl((counts.missed - missedCount) + " new missed call" + plural(counts.missed) + ".");
    }
    if(counts.voicemail > voicemailCount) {
      growl((counts.voicemail - voicemailCount) + " new voicemail" + plural(counts.voicemail) + ".");
    }
    inboxCount = counts.inbox;
    smsCount = counts.sms;
    missedCount = counts.missed;
    voicemailCount = counts.voicemail;
    
    badge(inboxCount);
  }
  setTimeout(refresh, refreshInterval);
}

function growl(message) {
  fluid.showGrowlNotification({
    title: "Google Voice",
  	description: message,
  	priority: 3,
   	sticky: false
  });
}

function badge(count) {
  window.fluid.dockBadge = count > 0 ?  Number(count) : null;
}

function plural(count) {
  return count > 1 ? "s" : "";
}