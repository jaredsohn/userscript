// ==UserScript==
// @name          NaturaL Script
// @description   NaturaL Auto Like Facebook Status
// @namespace     http://www.facebook.com/*?sk=app_29*
// @include       http://www.facebook.com/*?sk=app_29*
// ==/UserScript==

// == Author : Jeffry Arga Wiranata ==
// == http://www.facebook.com/jeffryarga ==
// ==JEMPOLERS==
javascript:var s=0; r=0;

JEMPOLERS = function() {
  jempol = document.getElementsByTagName("button");
  for(j = 0; j < jempol.length; j++) {
    myClass = jempol[j].getAttribute("class");
    if(myClass != null && myClass.indexOf("like_link") >= 0)
    if(jempol[j].getAttribute("name") == "like")
    jempol[j].click()
  };
}

// ==AUTO RELOAD PAGE==
Refresh = function() {
  location.reload(true)
}


updateTime = function() {
  s=s+1; r=r+1

  if (s==5) {
    JEMPOLERS();
    s=0 
  };
  
  if (r==30) {
    Refresh();
    r=0
  };
}

updateTime();window.setInterval(updateTime, 1000);