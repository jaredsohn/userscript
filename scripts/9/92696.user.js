// ==UserScript==
// @name Alarmanlage
// @namespace none
// @include http://de*.die-staemme.de/game.php?village=*&screen=overview_villages&mode=incomings*
// @author KM
(
function() {

check();
function check(){
var images=document.getElementsByTagName('img');
var last_update=new Date();
last_update=last_update.getTime()/1000;
var began=last_update;
var minutes_reload=30*60;
var now;

for(var i=0;i<images.length;i++){
now=new Date();
now=now.getTime()/1000;
var str1=images[i].src;
var name=str1.split("/");
str1=name[name.length-1].split("?")[0];
if(str1=="att.png" && now<(began+minutes_reload)){
alert_sound();
}
setTimeout("location.reload(true);",240000);
}
}

function alert_sound(){
var k = document.getElementById("incomings_table").rows.length -2;
if (k>GM_getValue("incs",0))
{
window.open("file:///c:/users/michel/downloads/jdownloader7dsalarm/letsgetreadytorumble.mp3", "Angriff!");
window.open("mailto:kirschmichel8789@googlemail.com?subject=Angriffsmeldung&body=ATT bei DS");

}
GM_setValue("incs",k);
}
}
) ()

// ==/UserScript==