// ==UserScript==
// @name           Google Calendar Contrast
// @namespace      userscripts/erik7
// @description    Darkens colors in GCal, like the old days
// @include        http*://www.google.com/calendar/*render*
// ==/UserScript==

function ContrastCalendar() {
  var darken_amount = .9;
  
  function LightenDarkenColor(col,amt) {
    col = col.slice(4,-1);
    col = col.split(", ");
    
    var oldspread = Math.max(parseInt(col[0]),parseInt(col[1]),parseInt(col[2]))
      - Math.min(parseInt(col[0]),parseInt(col[1]),parseInt(col[2]));
    
    var r = Math.floor(parseInt(col[0]) / amt);
    var g = Math.floor(parseInt(col[1]) / amt);
    var b = Math.floor(parseInt(col[2]) / amt);
    
    var newspread = Math.max(r,g,b) - Math.min(r,g,b);
    var growth = newspread / (oldspread+1) +.1;
    var average = (r+g+b)/3;
    
    r = (r - average)/growth + average;
    g = (g - average)/growth + average;
    b = (b - average)/growth + average;
    
    if ( r > 255 ) r = 255;
    else if  (r < 0) r = 0;
    if ( g > 255 ) g = 255;
    else if  ( g < 0 ) g = 0;
    if ( b > 255 ) b = 255;
    else if  (b < 0) b = 0;
    
    return "#" + (b | (g << 8) | (r << 16)).toString(16);
  }
  function hasClass(ele, cls) {
    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  }
  
  gccappointments = document.getElementsByClassName("cbrd");
  for(i=0; i<gccappointments.length; i++) {
    appt = gccappointments[i];
    if(hasClass(appt,"iscolored")) continue;
    apbgcol = appt.style.backgroundColor;
    apbdcol = appt.style.borderColor;
    appt.style.backgroundColor = LightenDarkenColor(apbgcol, 1.5*darken_amount);
    appt.firstChild.style.backgroundColor =
      LightenDarkenColor(apbgcol, 2.5*darken_amount);
    appt.style.borderColor = LightenDarkenColor(apbdcol, 1.5*darken_amount);
    appt.style.textShadow = "#000000 0px 0px 3px";
    appt.style.color = "#FFF";
    appt.className += " iscolored";
  }
  
  gccborders = document.getElementsByClassName("mask");
  for(i=0; i<gccborders.length; i++) {
    appt = gccborders[i];
    if(hasClass(appt,"iscolored")) continue;
    apbgcol = appt.style.backgroundColor;
    apbdcol = appt.style.borderColor;
    appt.style.backgroundColor = LightenDarkenColor(apbgcol, 1.5*darken_amount);
    appt.style.borderColor = LightenDarkenColor(apbdcol, 1.5*darken_amount);
    appt.className += " iscolored";
  }
  
  gccappointments2 = document.getElementsByClassName("rb-n");
  for(i=0; i<gccappointments2.length; i++) {
    appt = gccappointments2[i];
    if(hasClass(appt,"iscolored")) continue;
    apbgcol = appt.style.backgroundColor;
    apbdcol = appt.style.borderColor;
    appt.style.backgroundColor = LightenDarkenColor(apbgcol, 2*darken_amount);
    appt.style.borderColor = LightenDarkenColor(apbdcol, 2*darken_amount);
    appt.style.color = "#FFF";
    appt.style.textShadow = "#000000 0px 0px 3px";
    appt.className += " iscolored";
  }
  GM_log("Changed colors for " + String(gccborders.length + 
    gccappointments.length + gccappointments2.length) + " elements");
}

document.body.addEventListener("load", ContrastCalendar, true);