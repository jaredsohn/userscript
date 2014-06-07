// ==UserScript==
// @name          The Amazing Outlook.com Tweaks Script
// @namespace     http://scripts.withinwindows.com/outlookdotcom
// @description   Tweak Outlook.com to be less weird
// @include       http*://*.mail.live.com/*
// @exclude       
// @version       0.3.5.0
// @history       0.3 Added retry logic for slower notifications
// @history       0.2 Removed jQuery dependency so the script, you know, works.
// @history       0.1 Initial release
// ==/UserScript==

// Tweak 1: Remove the POP3 notification banner.
//     Why: For whatever reason, Windows Live/Hotmail/Outlook/whatever isn't aware that you're
//          actually receiving mail already, likely as a result of using Live Custom Domains.
//          So every time you sign in, this annoying notification appears. Well, not anymore.

// BUGBUG: I presume Outlook.com is localized. If so, this will break.

var g_t1_keepTrying = true;
setTimeout('g_t1_keepTrying = false', 5000)

function tweak1()
{
  var container = document.getElementById("notificationContainer");
  
  if(container == null || container.textContent == null) {
    if(g_t1_keepTrying) setTimeout(tweak1, 250);
    return;
  }
    
  if(container.textContent.search('Get your .* mail right in Outlook') == 0) {

    //
    // The Notification Container houses notifications for the super bar at the bottom, as well
    // as incoming IMs and the such. So we don't want to nuke the entire layer. Just the bar if
    // it meets our criteria.
    //

    for(i=0; i<container.children.length; i++) {
      brat = container.children[i];
      
      if(brat.nodeType == 1 && brat.className.search('SuperBar') != -1) {
        container.removeChild(brat);
        break;
      }
    }
    
    return;
  }
}

tweak1();