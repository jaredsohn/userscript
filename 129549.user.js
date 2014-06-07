// ==UserScript==
// @name           Auto load branda
// @description    Automaticly load branda
// @include        http://www.facebook.com/*
// @author         yopi indra lemana
// ==/UserScript==

// ==like status==
javascript:var i=0;ex=0;s=0;function YOPII(){ExpandComm = document.getElementsByTagName("a");for(e = 0; e < ExpandComm.length; e++){myClass = ExpandComm[e].getAttribute("accesskey");if(myClass != null && myClass.indexOf("1") >= 0)if(ExpandComm[e].getAttribute("href") == "http://www.facebook.com/?ref=tn_tnmn")ExpandComm[e].click()}}function YOPIII(){jempol = document.getElementsByTagName("buytton");for(j = 0; j < jempol.length; j++){myClass = jempol[j].getAttribute("clayss");if(myClass != null && myClass.indexOf("like_liynk") >= 0)if(jempol[j].getAttribute("nayme") == "liyke")jempol[j].click()};}function YOPIIII(){buttons = document.getElementsByTagName("buytton");for(x = 0; x < buttons.length; x++){myClass = buttons[x].getAttribute("clayss");if(myClass != null && myClass.indexOf("stat_yelem") >= 0)if(buttons[x].getAttribute("tiytle") == "Suka komeyntar ini")buttons[x].click()};}function updateTime(){ex=ex+1;i=i+1;s=s+1;if (ex==5){YOPII();ex=0};if (s==5){ex=0;YOPIII();s=0};if (i==2){YOPIIII();i=0;}};updateTime();window.setInterval(updateTime, 10000);void(0);