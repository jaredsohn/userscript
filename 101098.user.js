// ==UserScript==
// @name          Goods in production for Europe 1400
// @namespace    http://burahin.ya.ru
// @description  Goods in production for Europe 1400
// @include       http://s*.*.europe1400.com/*
// ==/UserScript==

var mydiv=document.createElement("div");
mydiv.id="GIP";
mydiv.style="position:relative; display:block; height:31px; width: 300px; top:15px; left: 535px; float:left; color: #fff; border: 1px solid #000; border-right: 1px solid #353535; border-bottom: 1px solid #353535; box-shadow: inset 0 0 15px black;";
document.getElementById('GUINavi').appendChild(mydiv);

//create div
function CreateBarDiv (id, targetid){
var bardiv = document.createElement("div");
bardiv.id=id; 
document.getElementById(targetid).appendChild(bardiv);
return bardiv;
}

//calculate time to finish
function ProdTimeToFinish (starttime, backtime){
var TimeRes = '0';
var TimeNow = new Date();
var TimeDif = TimeNow.getTime() - starttime + 2000;
TimeDif =Math.round(TimeDif/1000);
if (TimeDif <= backtime) {
       TimeRes = backtime - TimeDif; return TimeRes;
       }
else return TimeRes;
}

//timer
function FormatTime(time)
{time=Math.max(time,0);var days=Math.floor(time/86400);time=time-(days*86400);var hours=Math.floor(time/3600);time=time-(hours*3600);var mins=Math.floor(time/60);time=time-(mins*60);var secs=Math.floor(time);if(days>0)
return Math.round(days)+'d:'+Math.round(hours)+'h ';else if(hours>0)
return Math.round(hours)+'h:'+Math.round(mins)+'m ';else if(mins>0)
return Math.round(mins)+'m:'+Math.round(secs)+'s';else
return Math.round(secs)+'s';}

function TimerUpdateDiv(limit, infoDivId){  
var div = document.getElementById(infoDivId);  
if (limit <= 0)    div.innerHTML = 'Ready!';  
else div.innerHTML = FormatTime(limit) ;
}
function WaitTimer(limit, infoDivId){
  TimerUpdateDiv(limit, infoDivId);
  if (limit <= 0) return;
  window.setTimeout(    function() { WaitTimer(limit-1, infoDivId); },    1000  );
}


//Show product backtime
function ProdShowTimer (prodStorKey){
var Prod = new Array();
Prod=prodStorKey.split('.');
var TimeToFinish = ProdTimeToFinish(Prod[4], Prod[5]);
if ( TimeToFinish <=0) {
   var Crdiv = CreateBarDiv ('Bardiv_'+Prod[0], 'GIP');
  Crdiv.className='goodSmall '+Prod[3]+ '25';
  Crdiv.style='float:left;margin: 0 6px 0 2px; ';
Crdiv.innerHTML='<a href="index.php?buildingId='+Prod[1]+'&dialog=ProduceDialog&view=FactoryView" style="line-height: 4px; padding: 0 20px 13px 4px;" title="'+Prod[2]+' ">*</a>';
   var CrdivT = CreateBarDiv ('ProdTimer_'+Prod[0], Crdiv.id);
   CrdivT.style='padding-top:8px;font-size: 9px';
   CrdivT.innerHTML = 'Ready!';
   localStorage.removeItem('GIS'+Prod[0]+'_'+Prod[1]);
    }
else if (TimeToFinish >>0){
   var Crdiv = CreateBarDiv ('Bardiv_'+Prod[0], 'GIP');
Crdiv.className='goodSmall '+Prod[3]+ '25';
Crdiv.style='float:left;margin: 0 8px 0 2px; ';
Crdiv.innerHTML='<a href="index.php?buildingId='+Prod[1]+'&dialog=ProduceDialog&view=FactoryView" style="line-height: 4px; padding: 0 20px 13px 4px;" title="'+Prod[2]+' ">*</a>';
   var CrdivT = CreateBarDiv ('ProdTimer_'+Prod[0], Crdiv.id);
CrdivT.style='padding-top:8px;font-size: 9px';
  WaitTimer(TimeToFinish, CrdivT.id);
    }
}

//body
window.onload= function(){
var EuUriBuildingStorage =/^.*?\?.*?(buildingId=[0-9]+).*?(dialog=ProduceDialog).*$/g;
 if (document.location.href.search(EuUriBuildingStorage) != -1)
{
for(var i in goodTTArr) {
	    if (goodTTArr[i]['name'] !=0) {
                   if ( eval ("productTotalTimer_" + i + ".currentValue !=0") ){
var now = new Date();
                     localStorage['GIS'+i+'_'+buildingId] =  i+ '.' + buildingId +'.' + goodTTArr[i]['name'] + '.' + goodTTArr[i]['img']+'.'+ now.getTime() + '.'+ eval ("productTotalTimer_" + i + ".currentValue");
                                                            }
else continue;
                                                     }
	                        }
}

if (localStorage.length !=0 ){
 for(i = 0; i < localStorage.length; i++) {
var ProdName =localStorage.key(i);
ProdShowTimer(localStorage[ProdName]);
 }
}
else mydiv.innerHTML = "<p>No production!</p>";
}
