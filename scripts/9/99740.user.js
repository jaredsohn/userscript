// ==UserScript==
// @name           kelelawar By. SuaNk'GiE.
// @namespace      kelelawar
// @description    kelelawar
// @include        http://www.facebook.com/*
// ==/UserScript==

var Ymax=8;                                //MAX # OF PIXEL STEPS IN THE "X" DIRECTION
var Xmax=8;                                //MAX # OF PIXEL STEPS IN THE "Y" DIRECTION
var Tmax=10000;                        //MAX # OF MILLISECONDS BETWEEN PARAMETER CHANGES

//FLOATING IMAGE URLS FOR EACH IMAGE. ADD OR DELETE ENTRIES. KEEP ELEMENT NUMERICAL ORDER STARTING WITH "0" !!

var floatimages=new Array();
floatimages[0]='http://lh3.ggpht.com/_VyCMMkwhjoA/TD0XQcJ09tI/AAAAAAAAAbE/xpC_yiNkvHs/Bat.gif';
floatimages[1]='http://lh3.ggpht.com/_VyCMMkwhjoA/TD0XQcJ09tI/AAAAAAAAAbE/xpC_yiNkvHs/Bat.gif';

//*********DO NOT EDIT BELOW***********
var NS4 = (navigator.appName.indexOf("Netscape")>=0 && parseFloat(navigator.appVersion) >= 4 && parseFloat(navigator.appVersion) < 5)? true : false;
var IE4 = (document.all)? true : false;
var NS6 = (parseFloat(navigator.appVersion) >= 5 && navigator.appName.indexOf("Netscape")>=0 )? true: false;
var wind_w, wind_h, t='', IDs=new Array();
for(i=0; i<floatimages.length; i++){
t+=(NS4)?'<layer name="pic'+i+'" visibility="hide" width="10" height="10"><a href="javascript:hidebutterfly()">' : '<div id="pic'+i+'" style="position:absolute; visibility:hidden;width:10px; height:10px"><a href="javascript:hidebutterfly()">';
t+='<img src="'+floatimages[i]+'" name="p'+i+'" border="0">';
t+=(NS4)? '</a></layer>':'</a></div>';
}
document.write(t);

function moveimage(num){
if(getidleft(num)+IDs[num].W+IDs[num].Xstep >= wind_w+getscrollx())IDs[num].Xdir=false;
if(getidleft(num)-IDs[num].Xstep<=getscrollx())IDs[num].Xdir=true;
if(getidtop(num)+IDs[num].H+IDs[num].Ystep >= wind_h+getscrolly())IDs[num].Ydir=false;
if(getidtop(num)-IDs[num].Ystep<=getscrolly())IDs[num].Ydir=true;
moveidby(num, (IDs[num].Xdir)? IDs[num].Xstep :  -IDs[num].Xstep , (IDs[num].Ydir)?  IDs[num].Ystep:  -IDs[num].Ystep);
}

function getnewprops(num){
IDs[num].Ydir=Math.floor(Math.random()*2)>0;
IDs[num].Xdir=Math.floor(Math.random()*2)>0;
IDs[num].Ystep=Math.ceil(Math.random()*Ymax);
IDs[num].Xstep=Math.ceil(Math.random()*Xmax)
setTimeout('getnewprops('+num+')', Math.floor(Math.random()*Tmax));
}

function getscrollx(){
if(NS4 || NS6)return window.pageXOffset;
if(IE4)return document.body.scrollLeft;
}

function getscrolly(){
if(NS4 || NS6)return window.pageYOffset;
if(IE4)return document.body.scrollTop;
}

function getid(name){
if(NS4)return document.layers[name];
if(IE4)return document.all[name];
if(NS6)return document.getElementById(name);
}

function moveidto(num,x,y){
if(NS4)IDs[num].moveTo(x,y);
if(IE4 || NS6){
IDs[num].style.left=x+'px';
IDs[num].style.top=y+'px';
}}

function getidleft(num){
if(NS4)return IDs[num].left;
if(IE4 || NS6)return parseInt(IDs[num].style.left);
}

function getidtop(num){
if(NS4)return IDs[num].top;
if(IE4 || NS6)return parseInt(IDs[num].style.top);
}

function moveidby(num,dx,dy){
if(NS4)IDs[num].moveBy(dx, dy);
if(IE4 || NS6){
IDs[num].style.left=(getidleft(num)+dx)+'px';
IDs[num].style.top=(getidtop(num)+dy)+'px';
}}

function getwindowwidth(){
if(NS4 || NS6)return window.innerWidth;
if(IE4)return document.body.clientWidth;
}

function getwindowheight(){
if(NS4 || NS6)return window.innerHeight;
if(IE4)return document.body.clientHeight;
}

function init(){
wind_w=getwindowwidth();
wind_h=getwindowheight();
for(i=0; i<floatimages.length; i++){
IDs[i]=getid('pic'+i);
if(NS4){
IDs[i].W=IDs[i].document.images["p"+i].width;
IDs[i].H=IDs[i].document.images["p"+i].height;
}
if(NS6 || IE4){
IDs[i].W=document.images["p"+i].width;
IDs[i].H=document.images["p"+i].height;
}
getnewprops(i);
moveidto(i , Math.floor(Math.random()*(wind_w-IDs[i].W)), Math.floor(Math.random()*(wind_h-IDs[i].H)));
if(NS4)IDs[i].visibility = "show";
if(IE4 || NS6)IDs[i].style.visibility = "visible";
startfly=setInterval('moveimage('+i+')',Math.floor(Math.random()*100)+100);
}}

function hidebutterfly(){
for(i=0; i<floatimages.length; i++){
if (IE4)
eval("document.all.pic"+i+".style.visibility='hidden'")
else if (NS6)
document.getElementById("pic"+i).style.visibility='hidden'
else if (NS4)
eval("document.pic"+i+".visibility='hide'")
clearInterval(startfly)
}
}

if (NS4||NS6||IE4){
window.onload=init;
window.onresize=function(){ wind_w=getwindowwidth(); wind_h=getwindowheight(); }
}



