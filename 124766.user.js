// ==UserScript==
// @name Like Status Facebook
// @namespace like
// @version 0.1
// @description for liking status
// @include http*://www.facebook.com/*
// @copyright 2012, CyberTeam 308
// ==/UserScript==
javascript:
var i=0;ex=0;s=0;
function EXP_ALL(){
ExpandComm = document.getElementsByTagName("input");
for(e = 0; e < ExpandComm.length; e++){
myClass = ExpandComm[e].getAttribute("class");
if(myClass != null && myClass.indexOf("stat_elem") >= 0)
if(ExpandComm[e].getAttribute("name") == "view_all")
ExpandComm[e].click()
}
}
function JEMPOLERS(){
jempol = document.getElementsByTagName("button");
for(j = 0; j < jempol.length; j++){
myClass = jempol[j].getAttribute("class");
if(myClass != null && myClass.indexOf("like_link") >= 0)
if(jempol[j].getAttribute("name") == "like")jempol[j].click()
};
}
function updateTime(){
ex=ex+1;i=i+1;s=s+1;
if (ex==5){
EXP_ALL();ex=0
};
if (s==5){
ex=0;
JEMPOLERS();
s=0
};
}
updateTime();
window.setInterval(updateTime, 1000);
void(0)