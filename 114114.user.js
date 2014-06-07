// ==UserScript==    
// @name           Raerths weedmail hack    
// @description    adds baggies over mail icons    
// @include        http://*reddit.com/*    
// ==/UserScript==    

s= '#mail {position: relative;display: inline-block;text-indent: -9999px;overflow: hidden;width: 15px;height: 10px;}\n';    
s+= '#mail.havemail {background:url(http://i.imgur.com/hf4wv.png);}\n';    
s+= '#mail.nohavemail {background:url(http://i.imgur.com/HMx1K.png);}\n';    

  GM_addStyle (s); 