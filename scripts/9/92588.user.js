// ==UserScript==
// @name           Reported Attack Page Warner!
// @author         Tony White
// @version        1.0
// @description    This script will protect you if you come across a reported attack on the web.
// @include        http://aguavivag12.org/*
// @include        http://explus.in/*
// @include        http://innity.net/*
// @include        http://funnyfacebook.tk/*
// @include        http://igs.lt/*
// @include        http://www.madwahm.com/*
// @include        http://www.facebook.com/plugins/like.php?href=http%3A%2F%2Fcyrus-drugs.info&layout=standard&show_faces=false&width=450&action=like&font=tahoma&colorscheme=light&height=80
// @include        http://cyrus-drugs.info/*
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
title='Reported Attack Page! ';
}
var s=document.createElement('a');
with(unsafeWindow) {
neva=null;
window.moveTo=null;
document.onbeforeunload=null;
}
with(s) {
innerHTML='<center>YOU HAVE BEEN LED TO A REPORTED ATTACK SITE!\n Click the page to escape, or close this window<p></p><br>By Tony White<br><img src=\"http://i52.tinypic.com/29na32w.jpg\" /></center>';
setAttribute("style","position:absolute;top:0px;left:0px;width:100%;height:100%;font-size:20px;color:#FF0000;font-weight:bold");
setAttribute("onclick","neva=null;document.onbeforeunload=null;location='http://www.facebook.com/TonyWhiteHere'");
}
document.body.appendChild(s);

