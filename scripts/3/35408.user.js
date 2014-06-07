// ==UserScript==
// @name            Google Calendar Day Fader
// @namespace       http://www.davidgurak.com
// @version         1.0
// @author          David Gurak
// @description     Fade previous days when in a month view (current month only)
// @include         http://calendar.google.tld/*
// @include         https://calendar.google.tld/*
// @include         http://www.google.tld/calendar*
// @include         https://www.google.tld/calendar*
// @include         http://google.tld/calendar*
// @include         https://google.tld/calendar*

// ==/UserScript==

window.setInterval(function() {  
    var decowner = document.getElementById("decowner");
    var today = decowner.firstChild;
    var todayLeft = today.style.left.replace(/%/, "");
    var todayTop = today.style.top.replace(/%/, "");;
    var days = decowner.getElementsByTagName("DIV");
    var d=0;
    for (var i=0; i<days.length;i++) {
      var dayLeft = days[i].style.left.replace(/%/, "");
      var dayTop = days[i].style.top.replace(/%/, "");
      if (dayLeft != "") {
        if ((dayLeft < todayLeft && dayTop <= todayTop) || (dayTop < todayTop)) {
          days[i].style.backgroundColor = "#888";
          days[i].style.zIndex = "2";
          days[i].style.opacity = ".40"; 
          days[i].style.filter = 'alpha(opacity=40)';
          var dayHeader = document.getElementById('dh'+d).parentNode;
          dayHeader.style.backgroundColor = "#222";
          d++;
        }
      }
    }
}, 2000);

