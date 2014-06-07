// ==UserScript== 
// @name           Old dAmnifier 
// @namespace      thej2.com
// @description    This magical thing makes dAmn (deviantART's messaging network) chatrooms appear in the original size-stylings. It's pretty great.
// @include        http://chat.deviantart.com/chat/* 
// ==/UserScript==  

stylemans = document.createElement('style') 
stylemans.type = "text/css" 
stylemans.appendChild(document.createTextNode(".damncr-members {       line-height: 150% !important;  } /* did you guys know that electricnet is SUPERHUMAN */    .damncr-title,  .damncr-leftbar,  .damncr-members,  .sidebar,  .damncrc-iconbar,  .damncrc-base,  .damncrc-alertbox,  .damncrc-error,  .damncrc-chat,  .damnc-tabbar, .damncrc-topic {       font-size:8.25pt;  } ")) 
document.getElementsByTagName('head')[0].appendChild(stylemans)