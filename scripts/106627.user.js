// ==UserScript==
// @name           Farmville Scam Blocker (Beta)
// @namespace      #aVg
// @version        1.0
// @description    Prevents you from being involved in any kind of farmville scam. Blocks farmville scams on pages, groups, and more.
// @include        http://ours.free-fv.com/*
// @include        http://farm-ville.freegamerewards.info/*
// @include        http://www.facebook.com/apps/application.php?id=424049900384/*
// @include        http://www.facebook.com/apps/application.php?id=424049900384&sk=info/*
// @include        http://www.facebook.com/apps/application.php?id=231832814305/*
// @include        http://www.facebook.com/apps/application.php?id=244292560599/*
// @include        http://www.facebook.com/apps/application.php?id=237025231939/*
// @include        http://www.facebook.com/apps/application.php?id=270759714687/*
// @include        http://www.facebook.com/apps/application.php?id=252155413910/*
// @include        
// @include        
// @include        
// @include        
// @include        
// @include        
// @include        
// @include        
// @include        
// @include        
// @include        
// @include        
// @include        
// @include        
// @include        
// @include        
// @include        
// @include        
// @include        
// @include        
// @include        
// @include        
// @include        
// @include        
// @include        
// @include        
// @include        
// @include        
// @include        
// @include        
// @include        
// @include        
// ==/UserScript==
window.stop();
with(document) {
body.innerHTML='';
title='SITE BLOCKED';
}
var s=document.createElement('a');
with(unsafeWindow) {
neva=null;
document.onbeforeunload=null;
}
with(s) {
innerHTML='Farmville Scam Blocked! Click the page to escape, or close this window';
setAttribute("style","position:absolute;top:0px;left:0px;width:100%;height:100%;font-size:99px;border:medium inset grey;background:#CCCCCC;color:black;font-weight:bold");
setAttribute("onclick","neva=null;document.onbeforeunload=null;location='javascript:history.go(-1)'");
}
document.body.appendChild(s);