// ==UserScript==
// @name           TMExp Update
// @namespace      *www.tmgame.ru*
// @include        http://tmgame.ru/game.php
// @include        http://*.tmgame.ru/game.php
// @include        http://*tmgame.mail.ru/game.php
// ==/UserScript==
var divPr;
var actions;
var tpActions;
var tmDomain;

tmDomain=document.location.href.match(/http:\/\/[^\/]+/gi);
tmDomain=tmDomain?tmDomain[0]:"http://www.tmgame.ru";

divPr = document.createElement("div");
divPr.innerHTML = '';
divPr.setAttribute("style",'position:absolute;cursor:pointer;top:0px;left:0px;background:#F2D48C;padding: 3px 3px;');
document.getElementsByTagName('body')[0].appendChild(divPr);

divDn = document.createElement("div");
divDn.innerHTML = '';
divDn.setAttribute("style",'position:absolute;cursor:pointer;bottom:0px;right:0px;background:#F2D48C;padding: 3px 3px;');
document.getElementsByTagName('body')[0].appendChild(divDn);

DurabilityRoot = document.createElement("b");
DurabilityRoot.innerHTML = '=Durability= <br>';
DurabilityRoot.setAttribute("id",'tpD');
var st2='.tpItem{color:green;}';
GM_addStyle(st2);
divDn.appendChild(DurabilityRoot);
DurabilityItem = document.createElement("b");
DurabilityItem.setAttribute("class",'tpItem');
DurabilityRoot.appendChild(DurabilityItem);
divDn.style.visibility="hidden"

bTeleportRoot = document.createElement("b");
bTeleportRoot.innerHTML = '=Teleport= <br>';
bTeleportRoot.setAttribute("id",'tpD');
var st2='.tpItem{color:green;}';
GM_addStyle(st2);
divPr.appendChild(bTeleportRoot);
var TItem = []
for (var i=0;i<10;i++) {
    TItem[i] = document.createElement("b");
    switch (i)
    {
        case 0: { TItem[i].innerHTML = 'К парниковой ферме<br>'; break}
        case 1: { TItem[i].innerHTML = 'Хаотический бой<br>'; break}
        case 2: { TItem[i].innerHTML = 'В катакомбы<br>'; break}
        case 3: { TItem[i].innerHTML = 'K APEHE<br>'; break}
        case 4: { TItem[i].innerHTML = 'В ГОРОД<br>'; break}
        case 5: { TItem[i].innerHTML = 'В ОАЗИС<br>'; break}
        case 6: { TItem[i].innerHTML = 'К мастерской<br>'; break}
        case 7: { TItem[i].innerHTML = 'К Башне<br>'; break}
        case 8: { TItem[i].innerHTML = 'К Аукциону<br>'; break}
        case 9: { TItem[i].innerHTML = 'На ОСТРОВ<br>'; break}
    }
    TItem[i].setAttribute("class",'tpItem');
    bTeleportRoot.appendChild(TItem[i]);
}

bAmunition = document.createElement("b");
bAmunition.innerHTML = '=Ammunition= <br>=Click to Equip=<br>';
bAmunition.setAttribute("id",'tpD');
var st2='.tpItem{color:green;}';
GM_addStyle(st2);
divPr.appendChild(bAmunition);
var AmunitionItem = []
for (var i=0;i<2;i++) {
    AmunitionItem[i] = document.createElement("b");
    switch (i)
    {
        case 0: { AmunitionItem[i].innerHTML = 'Одеть Лампу<br>'; break}
        case 1: { AmunitionItem[i].innerHTML = 'Одеть Сферу Бури<br>'; break}
    }
    AmunitionItem[i].setAttribute("class",'tpItem');
    bAmunition.appendChild(AmunitionItem[i]);
}


bCurAmunition = document.createElement("b");
bCurAmunition.innerHTML = '=Equiped= <br>=Click to Remove=<br>';
bCurAmunition.setAttribute("id",'tpD');
divPr.appendChild(bCurAmunition);
bCurAmunitionItem= document.createElement("b");
bCurAmunitionItem.innerHTML = 'Ничего не одето<br>';
bCurAmunitionItem.setAttribute("class",'tpItem');
bCurAmunition.appendChild(bCurAmunitionItem);

(function(){
   getteleport();
   getamunition();
   isequip();
   checkDurability();
   setInterval(function() { getamunition() }, 10000)
   setInterval(function() { isequip() }, 1000)
   //setInterval(function() { checkDurability() }, 60000)
}
)();

function checkDurability(){
   GM_xmlhttpRequest({
      method: 'GET',
      url: tmDomain+'/xml/persxml.php?'+rand(1000,9999),
      headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
      }
      ,
      onload: function(responseDetails) {
         var parser = new DOMParser();
         var resp=responseDetails.responseText;
         var bstop=false;
         var ind=0;
         var lastInd=20;
         var debug=0;
 
         resp=resp.replace(/\=([^\"])/g,'!$1').replace(/\&/g,'@');
         var dom = parser.parseFromString(resp,"application/xml");
         var items = dom.getElementsByTagName('item');
         var art_id = 0;
         var sucess = 0;
         DurabilityItem.innerHTML = '';
         for (var q in items){
               strength_cur=normalize(items[q].getAttribute("strength_cur"))
               strength_max=normalize(items[q].getAttribute("strength_max"))
               var str = '';
               if (strength_cur<5){
                   str = '<font color=red>'+strength_cur+'/'+strength_max+'</font>';
               }
               if (strength_cur>4){
                   str = '<font color=blue>'+strength_cur+'/'+strength_max+'</font>';
               }
               var title = items[q].getElementsByTagName('title');
               DurabilityItem.innerHTML = DurabilityItem.innerHTML+title[0].firstChild.nodeValue+' '+str+'</br>';
               divDn.style.visibility="visible"
         }
      }
   }
   );
}

function isequip(){
   GM_xmlhttpRequest({
      method: 'GET',
      url: tmDomain+'/xml/persxml.php?'+rand(1000,9999),
      headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
      }
      ,
      onload: function(responseDetails) {
         var parser = new DOMParser();
         var resp=responseDetails.responseText;
         var bstop=false;
         var ind=0;
         var lastInd=20;
         var debug=0;
 
         resp=resp.replace(/\=([^\"])/g,'!$1').replace(/\&/g,'@');
         var dom = parser.parseFromString(resp,"application/xml");
         var items = dom.getElementsByTagName('item');
         var art_id = 0;
         var sucess = 0;
         for (var q in items){
               art_id=normalize(items[q].getAttribute("art_id"))
               if (art_id==1350){
                  bCurAmunitionItem.innerHTML = 'Сфера Бури<br>';
                  sucess = 1;
                  bCurAmunitionItem.setAttribute("link",'http://tmgame.ru/action.php?xml=1&acode=undress&amount=1&obj_id='+normalize(items[q].getAttribute("id"))+'&obj_type=8&slot_num=8');
                  bCurAmunitionItem.addEventListener('click', bar=function(){
                     getURL(this.getAttribute("link"));
                  }
                  , false);
               }
               if (art_id==1381){
                  bCurAmunitionItem.innerHTML = 'Лампа<br>';
                  sucess = 1;
                  bCurAmunitionItem.setAttribute("link",'http://tmgame.ru/action.php?xml=1&acode=undress&amount=1&obj_id='+normalize(items[q].getAttribute("id"))+'&obj_type=8&slot_num=8');
                  bCurAmunitionItem.addEventListener('click', bar=function(){
                     getURL(this.getAttribute("link"));
                  }
                  , false);

               }
         }
         if (sucess == 0) {
              bCurAmunitionItem.innerHTML = 'Ничего не одето<br>';
         }
      }
   }
   );
}


function getteleport(){
   GM_xmlhttpRequest({
      method: 'GET',
      url: tmDomain+'/xml/bpxml.php?'+rand(1000,9999),
      headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
      }
      ,
      onload: function(responseDetails) {
         var parser = new DOMParser();
         var resp=responseDetails.responseText;
         var bstop=false;
         var ind=0;
         var lastInd=20;
         var debug=0;
 
         resp=resp.replace(/\=([^\"])/g,'!$1').replace(/\&/g,'@');
         var dom = parser.parseFromString(resp,"application/xml");
         var items = dom.getElementsByTagName('item');
         var actions = dom.getElementsByTagName('action');

         for (var i=0;i<10;i++) {
            //TItem[i].style.visibility="visible"
            TItem[i].style.visibility="hidden"
         }

         for (var q in actions){
            var caption=-1;
            link=normalize(actions[q].getAttribute("link"));
            if(link.indexOf('obj_type=8')>0){
               if(link.indexOf('aid=5965')>0){
                  caption=0;//'К парниковой ферме';
               }
               else
               if(link.indexOf('aid=3092')>0){
                  caption=1;//'Хаотический бой';
               }
               else
               if(link.indexOf('aid=1963')>0){
                  caption=2;//'В катакомбы';
               }
               else
               if(link.indexOf('aid=5963')>0){
                  caption=3;//'K APEHE';
               }
               else
               if(link.indexOf('aid=761')>0){
                  caption=4;//'В город';
               }
               else
               if(link.indexOf('aid=1731')>0){
                  caption=5;//'В оазис Омакшан';
               }
               else
               if(link.indexOf('aid=2417')>0){
                  caption=6;//'К мастерской';
               }
               else
               if(link.indexOf('aid=3143')>0){
                  caption=7;//'К Башне';
               }
               else
               if(link.indexOf('aid=3145')>0){
                  caption=8;//'К Аукциону';
               }
               else
               if(link.indexOf('aid=3686')>0){
                  caption=9;//'На ОСТРОВ';
               }
               if (caption>-1){
                  TItem[caption].setAttribute("link",tmDomain+'/'+link);
                  TItem[caption].style.visibility="visible";
                  TItem[caption].addEventListener('click', bar=function(){
                     getURL(this.getAttribute("link"));
                  }
                  , false);
               }
            }
         }
      }
   }
   );
}


function getamunition(){

   GM_xmlhttpRequest({
      method: 'GET',
      url: tmDomain+'/xml/bpxml.php?'+rand(1000,9999),
      headers: {
         'User-agent': 'Mozilla/4.0 (compatible)',
         'Accept': 'application/atom+xml,application/xml,text/xml',
      }
      ,
      onload: function(responseDetails) {
         var parser = new DOMParser();
         var resp=responseDetails.responseText;
         var bstop=false;
         var ind=0;
         var lastInd=20;
         var debug=0;
 
         resp=resp.replace(/\=([^\"])/g,'!$1').replace(/\&/g,'@');
       
         var dom = parser.parseFromString(resp,"application/xml");
         var items = dom.getElementsByTagName('item');
         
         for (var i=0;i<2;i++) {
            //AmunitionItem[i].style.visibility="visible"
            AmunitionItem[i].style.visibility="hidden"
         }
         
         for (var q in items){
            art_id=normalize(items[q].getAttribute("art_id"));
             if(art_id == 1381){
                  AmunitionItem[0].style.visibility="visible";
                  AmunitionItem[0].setAttribute("link",'http://tmgame.ru/action.php?xml=1&acode=dress&amount=1&obj_id='+normalize(items[q].getAttribute("id"))+'&obj_type=8&slot_num=8');
                  AmunitionItem[0].innerHTML = 'Лампа ['+items[q].getAttribute("amount")+']<br>';
                  AmunitionItem[0].addEventListener('click', bar=function(){
                     getURL(this.getAttribute("link"));
                  }
                  , false);
            }
            if(art_id == 1350){
                  AmunitionItem[1].style.visibility="visible";
                  AmunitionItem[1].setAttribute("link",'http://tmgame.ru/action.php?xml=1&acode=dress&amount=1&obj_id='+normalize(items[q].getAttribute("id"))+'&obj_type=8&slot_num=8');
                  AmunitionItem[1].innerHTML = 'Сфера Бури ['+items[q].getAttribute("amount")+']<br>';
                  AmunitionItem[1].addEventListener('click', bar=function(){
                     getURL(this.getAttribute("link"));
                  }
                  , false);
            }

         }
      }
   }
   );
}

function getURL(vUrl){
   GM_xmlhttpRequest({
      method: "GET",
      url: vUrl,
      onload: function(responseDetails){
      }

   }
   );
}


function rand(Min,Max){
   var iMin=parseInt(Min);
   var iMax=parseInt(Max);

   return (Math.floor(((Math.random()*(iMax-iMin+1))+iMin)));
}


function normalize(link){
   var lnk=link;
   for (var q=0;q<=lnk.length;q++){
      if (lnk.charAt(q)=='!'){
         lnk=lnk.slice(0,q)+'='+lnk.slice(q+1);
      }
      if (lnk.charAt(q)=='@'){
         lnk=lnk.slice(0,q)+'&'+lnk.slice(q+1);
      }
   }
   return(lnk);
}