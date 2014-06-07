// ==UserScript== 
// @name			CollerEvader
// @author			FurryEwok
// @description			Coller fleet evader
// @include			http://uni1.ogame.org/game/index.php?page=*
// ==/UserScript==

var hour=23;
var minute=59;
var second=58;
var galaxy=4;
var system=185;
var planet=5;
var planettype=3; // 1=planet, 2=DF, 3=moon
var speed=1; // 10=100%, 9=90%, 8=80%, 7=70%, 6=60%, 5=50%, 4=40%, 3=30%, 2=20%, 1=10%
var order=4; // 1=attack, 3=transport, 4=deployment, 6=espionage, 8=harvest, 9=moon destruction

function LoadFleetPage() {
 if (running) { return; }
 var time;
 time=new Date();
 window.status=time.getHours()+":"+time.getMinutes()+":"+time.getSeconds()+" -> "+hour+":"+minute+":"+second;
 if ((time.getHours()==hour) && (time.getMinutes()==minute) && (time.getSeconds()==second)) {
  running=true;
  var sessionID;
  sessionID=location.href.substr("http://uni1.ogame.org/game/index.php?page=overview&session=".length)
  location.href="http://uni1.ogame.org/game/index.php?page=flotten1&session="+sessionID+"&mode=Flotte";
 } else {
  setTimeout(LoadFleetPage,500);
 }
}

function PressContinue() {
 var inputs;
 inputs=document.getElementsByTagName("input");
 for (var i=0; i<inputs.length; i++) {
  if ((inputs[i].type=="submit") && (inputs[i].value=="continue")) {
   inputs[i].click();
  }
 }
}

var running;
running=false;
if (location.href.match("page=overview")) {
 LoadFleetPage();
} else if (location.href.match("page=flotten1")) {
 var id;
 for (var i=200; i<220; i++) {
  id="ship"+i;
  if (document.getElementsByName(id)[0]) {
   document.getElementsByName(id)[0].value = document.getElementsByName("max"+id)[0].value;
  }
 }
 setTimeout(PressContinue,(Math.random()*100)+650); // 650 to 750 millisec delay to avoid script detection
} else if (location.href.match("page=flotten2")) {
 document.getElementsByName("galaxy")[0].value=galaxy;
 document.getElementsByName("system")[0].value=system;
 document.getElementsByName("planet")[0].value=planet;
 document.getElementsByName("planettype")[0].value=planettype;
 document.getElementsByName("speed")[0].value=speed;
 setTimeout(PressContinue,(Math.random()*100)+350); // 350 to 450 millisec delay to avoid script detection
} else if (location.href.match("page=flotten3")) {
 var orders;
 orders=document.getElementsByName("order");
 for (var i=0; i<orders.length; i++) {
  if (orders[i].value==order) {
   orders[i].click();
  }
 }
 setTimeout(PressContinue,(Math.random()*100)+350); // 350 to 450 millisec delay to avoid script detection
}

