// ==UserScript==
// @name           Unwanted Popups Blocker
// @author         Tony White
// @version        Beta
// @description    This script will block unwanted popups.
// @include        http://aguavivag12.org/*
// @include        http://explus.in/*
// @include        http://innity.net/*
// @include        http://funnyfacebook.tk/*
// @include        http://igs.lt/*
// @include        http://www.madwahm.com/
// @include        http://cyrus-drugs.info/*
// @include        http://*.facebook.*
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
// @include        

// ==/UserScript==
window.stop();
with(document) {
body.innerHTML='';
title='| POPUP BLOCKED |';
}
var s=document.createElement('a');
with(unsafeWindow) {
neva=null;
window.moveTo=null;
document.onbeforeunload=null;
}
with(s) {
innerHTML='<center>You\'ve been led to unwanted popup!\n Don\'t worry though! We have prevented the page of loading. Click the page to escape, or close this window<p></p><br>Modified By Tony White<br><img src=\"http://i52.tinypic.com/29na32w.jpg\" /></center>';
setAttribute("style","position:absolute;top:0px;left:0px;width:100%;height:100%;font-size:20px;color:#FF0000;font-weight:bold");
setAttribute("onclick","neva=null;document.onbeforeunload=null;location='http://www.google.com'");
}
document.body.appendChild(s);