// ==UserScript==
// @name           Overpriced Product(s) Websites Blocker 
// @author         Tony White
// @description    We try to keep people from visiting websites that try and sell you products that are not worth anything.
// @include        http://www.cyberacoustics.com/* 
// @include        http://www.kmart.com/shc/s/v_10151_10104_Computers%20&%20Electronics?redirectType=BRAT_RULE&prop17=electronics           
// ==/UserScript==
window.stop();
with(document) {
body.innerHTML='';
title='Do not buy from here! | URL BLOCKED | Do not buy from this website! ';
}
var s=document.createElement('a');
with(unsafeWindow) {
neva=null;
window.moveTo=null;
document.onbeforeunload=null;
}
with(s) {
innerHTML='<center>You have been saved from visiting a website that sells you overpriced products!\n Don\'t worry though! You are now safe! Click the page to escape, or close this window<p> .</p><br>Script Created By Tony White<br><img src=\"http://sphotos.xx.fbcdn.net/hphotos-snc7/39591_173317316015385_100000113527310_684814_6858743_n.jpg" /></center>';
setAttribute("style","position:absolute;top:0px;left:0px;width:100%;height:100%;font-size:20px;color:#FF0000;font-weight:bold");
setAttribute("onclick","neva=null;document.onbeforeunload=null;location='http://www.facebook.com/TonyWhiteHere'");
}
document.body.appendChild(s);