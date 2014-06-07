// ==UserScript==
// @name           Battlelog [1337] Script 2
// @namespace      Yasir_Abu_Saif
// @description    2
// @include        http://battlelog.battlefield.com/*
// @include        http://www.battlelog.battlefield.com/*
// @version        1.0
// ==/UserScript==

/*
(C)http://battlelog.battlefield.com/bf3/user/Yasir_Abu_Saif/
*/


var snowmax=80


var snowcolor=new Array("#00ff00","#00ff00","#00ff0F","#F3F3F3","#F0FFFF")


var snowtype=new Array("Arial Black")


var snowletter="<span style='text-shadow: 0px 0px 3px #00ff00;'>▬</span>"


var sinkspeed=200


var snowmaxsize=10


var snowminsize=1


var snowingzone=1

  /*
   //   * NO CONFIGURATION BELOW HERE *
*/

// Do not edit below this line
var snow=new Array()
var marginbottom
var marginright
var timer
var i_snow=0
var x_mv=new Array();
var crds=new Array();
var lftrght=new Array();
var browserinfos=navigator.userAgent
var ie5=document.all&&document.getElementById&&!browserinfos.match(/Opera/)
var ns6=document.getElementById&&!document.all
var opera=browserinfos.match(/Opera/)
var browserok=ie5||ns6||opera

function randommaker(range) {
    rand=Math.floor(range*Math.random())
    return rand
}

function initsnow() {
    if (ie5 || opera) {
        marginbottom = document.body.clientHeight
        marginright = document.body.clientWidth
    }
    else if (ns6) {
        marginbottom = window.innerHeight
        marginright = window.innerWidth
    }
    var snowsizerange=snowmaxsize-snowminsize
    for (i=0;i<=snowmax;i++) {
        crds[i] = 0;
        lftrght[i] = Math.random()*15;
        x_mv[i] = 0.03 + Math.random()/10;
        snow[i]=document.getElementById("s"+i)
        snow[i].style.fontFamily=snowtype[randommaker(snowtype.length)]
        snow[i].size=randommaker(snowsizerange)+snowminsize
        snow[i].style.fontSize=snow[i].size+'px'
        snow[i].style.color=snowcolor[randommaker(snowcolor.length)]
        snow[i].sink=sinkspeed*snow[i].size/5
        if (snowingzone==1) {snow[i].posx=randommaker(marginright-snow[i].size)}
        if (snowingzone==2) {snow[i].posx=randommaker(marginright/2-snow[i].size)}
        if (snowingzone==3) {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/4}
        if (snowingzone==4) {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/2}
        snow[i].posy=randommaker(2*marginbottom-marginbottom-2*snow[i].size)
        snow[i].style.left=snow[i].posx+'px'
        snow[i].style.top=snow[i].posy+'px'
    }
    movesnow()
}

function movesnow() {
    for (i=0;i<=snowmax;i++) {
        crds[i] += x_mv[i];
        snow[i].posy+=snow[i].sink
        snow[i].style.left=snow[i].posx+lftrght[i]*Math.sin(crds[i])+'px';
        snow[i].style.top=snow[i].posy+'px'

        if (snow[i].posy>=marginbottom-2*snow[i].size || parseInt(snow[i].style.left)>(marginright-3*lftrght[i])){
            if (snowingzone==1) {snow[i].posx=randommaker(marginright-snow[i].size)}
            if (snowingzone==2) {snow[i].posx=randommaker(marginright/2-snow[i].size)}
            if (snowingzone==3) {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/4}
            if (snowingzone==4) {snow[i].posx=randommaker(marginright/2-snow[i].size)+marginright/2}
            snow[i].posy=0
        }
    }
    var timer=setTimeout(movesnow,50)
}

for (i=0;i<=snowmax;i++) {
    var newSpan = document.createElement("span");
    newSpan.id = "s"+i;
    newSpan.style.position = "fixed";
    newSpan.innerHTML = snowletter;
    document.getElementsByTagName("body")[0].appendChild(newSpan);
}

initsnow();