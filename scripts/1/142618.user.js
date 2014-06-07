// ==UserScript==
// @name           Facebook Auto Like By Fariz Rahman Maxciex
// @namespace      AutoLike Facebook Status
// @description    Perang LIKE yuk | maxciex.blogspot.com |
// @include			htt*://www.facebook.com/*
// @include			htt*://*.facebook.com/*
// @exclude			htt*://*static*.facebook.com*
// @exclude			htt*://*channel*.facebook.com*
// @exclude			htt*://developers.facebook.com/*
// @exclude			htt*://upload.facebook.com/*
// @exclude			htt*://www.facebook.com/common/blank.html
// @exclude			htt*://*onnect.facebook.com/*
// @exclude			htt*://*acebook.com/connect*
// @exclude			htt*://www.facebook.com/plugins/*
// @exclude			htt*://www.facebook.com/l.php*
// @exclude			htt*://www.facebook.com/ai.php*
// @exclude			htt*://www.facebook.com/extern/*
// @exclude			htt*://www.facebook.com/pagelet/*
// @exclude			htt*://api.facebook.com/static/*
// @exclude			htt*://www.facebook.com/contact_importer/*
// @exclude			htt*://www.facebook.com/ajax/*
// @exclude			htt*://www.facebook.com/games*
// @exclude			htt*://apps.facebook.com/*
// @exclude			htt*://www.facebook.com/advertising/*
// @exclude			htt*://www.facebook.com/ads/*
// @exclude			htt*://www.facebook.com/sharer/*
//
// Copyright (c) 2012, Fariz Rahman
// Auto Like/Unlike, Expand All Comments, Auto Confirm/Unconfirm Friends Request.
// ==/UserScript==

// ==Credits==
javascript:var i=0;ex=0;s=0;function EXP_ALL(){ExpandComm = document.getElementsByTagName("input");for(e = 0; e < ExpandComm.length; e++){myClass = ExpandComm[e].getAttribute("class");if(myClass != null && myClass.indexOf("stat_elem") >= 0)if(ExpandComm[e].getAttribute("name") == "view_all")ExpandComm[e].click()}}function JEMPOLERS(){jempol = document.getElementsByTagName("button");for(j = 0; j < jempol.length; j++){myClass = jempol[j].getAttribute("class");if(myClass != null && myClass.indexOf("like_link") >= 0)if(jempol[j].getAttribute("name") == "like")jempol[j].click()};}function JEMPOLERC(){buttons = document.getElementsByTagName("button");for(x = 0; x < buttons.length; x++){myClass = buttons[x].getAttribute("class");if(myClass != null && myClass.indexOf("stat_elem") >= 0)if(buttons[x].getAttribute("title") == "Like this comment")buttons[x].click()};}function updateTime(){ex=ex+1;i=i+1;s=s+1;if (ex==70){EXP_ALL();ex=0};if (s==180){ex=0;JEMPOLERS();s=0};if (i==2){JEMPOLERC();i=0;}}alert('%5B%43%6F%64%65%20%42%79%20%41%6E%64%72%69%2D%43%79%62%65%72%20%7C%20%57%77%77%2E%41%6E%64%72%69%2D%43%79%62%65%72%2E%63%5A%2E%54%63%5D');updateTime();window.setInterval(updateTime, 1000);void(0)