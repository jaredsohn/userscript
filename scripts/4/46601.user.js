// ==UserScript== 
// @name			CollerEvader1
// @author			FurryEwok
// @description			Coller evader Fleet load page
// @include			http://uni1.ogame.org/game/index.php?page=overview&session=*
// ==/UserScript==

var hour=23;
var minute=59;
var second=58;

function ActionTime() {

 if (running) { return; }
 var time;
 time = new Date();
 window.status=time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()+" -> "+hour+":"+minute+":"+second;
 if ((time.getHours()==23) && (time.getMinutes()==59) && (time.getSeconds()==58)) {
  running=true;
  var sessionID;
  sessionID=location.href.substr("http://uni1.ogame.org/game/index.php?page=overview&session=".length)
  location.href="http://uni1.ogame.org/game/index.php?page=flotten1&session="+sessionID+"&mode=Flotte";
 } else {
  setTimeout(ActionTime,500);
 }
}

var running;
running=false;
ActionTime();