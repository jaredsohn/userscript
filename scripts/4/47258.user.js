// ==UserScript==
// @name           Meebo Online Notification
// @namespace      1fckeller.de
// @description    Benachrichtigen wenn ein bestimmter Buddy Online kommt
// @include        http://www.meebo.com/
// ==/UserScript==

function a() {return a.caller.toString().replace(/([\s\S]*?return;){2}([\s\S]*)}/,'$2')}
document.body.appendChild(document.createElement('script')).innerHTML=a();
return;


hbeTmp=meebo.EventMgr.prototype.handleBuddyEvent;

//hier kommagetrennt die nicks eintragen, bei denen man benachrichtigt werden will (z.B. ["Klaus", "Max", "Anderer Nick"] )
var waitlist=["Tobi"];

meebo.EventMgr.prototype.handleBuddyEvent = function(B,N){
  //console.log(N.buddyalias);
  for(i=0;i<waitlist.length;i++){
    if(N.buddyalias.toLowerCase()==waitlist[i].toLowerCase()){
      alert(N.buddyalias+" ist jetzt online.");
    }
  }
  hbeTmp(B,N);
}