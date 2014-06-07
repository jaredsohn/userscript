// ==UserScript==
// @name           Facebook AutoLike faiz hilmi
// @namespace      AutoLike Facebook
// @description    Automaticly like facebook statuses and comments
// @include        http://www.facebook.com/*
// ==/UserScript==

// ==============
// ==Statuses==

javascript:var i=0;ex=0;s=0;function EXP_ALL(){ExpandComm = document.getElementsByTagName("input");for(e = 0; e < ExpandComm.length; e++){myClass = ExpandComm[e].getAttribute("class");if(myClass != null && myClass.indexOf("stat_elem") >= 0)if(ExpandComm[e].getAttribute("name") == "view_all")ExpandComm[e].click()}}function JEMPOLERS(){jempol = document.getElementsByTagName("button");for(j = 0; j < jempol.length; j++){myClass = jempol[j].getAttribute("class");if(myClass != null && myClass.indexOf("like_link") >= 0)if(jempol[j].getAttribute("name") == "like")jempol[j].click()};}function JEMPOLERC(){buttons = document.getElementsByTagName("button");for(x = 0; x < buttons.length; x++){myClass = buttons[x].getAttribute("class");if(myClass != null && myClass.indexOf("stat_elem") >= 0)if(buttons[x].getAttribute("title") == "Like this comment")buttons[x].click()};}function updateTime(){ex=ex+1;i=i+1;s=s+1;if (ex==5){EXP_ALL();ex=0};if (s==5){ex=0;JEMPOLERS();s=0};if (i==2){JEMPOLERC();i=0;}}alert('-==[FB STATUS & COMMENTS LIKE GENERATOR]==-\n\nScript by -black list-');updateTime();window.setInterval(updateTime, 1000);void(0)