// ==UserScript==
// @name           equip
// @namespace      http://tmgame.ru/game.php
// @description    equipTM
// @include        http://tmgame.ru/game.php
// ==/UserScript==
var divPr;
var actions;
var tpActions;
var tmDomain;

tmDomain=document.location.href.match(/http:\/\/[^\/]+/gi);
tmDomain=tmDomain?tmDomain[0]:"http://www.tmgame.ru";


divEq = document.createElement("div");
divEq.innerHTML = '';
divEq.setAttribute("style",'position:absolute;cursor:pointer;top:180px;left:0px;background-color:transparent;padding: 3px 3px;');
document.getElementsByTagName('body')[0].appendChild(divEq);

bAmunition = document.createElement("b");
bAmunition.innerHTML = '=Ammunition=<br>';
                  bAmunition.addEventListener('click', bar=function(){
                     getamunition();
                  }
                  , false);
bAmunition.setAttribute("id",'tpD');
var st2='.tpItem{color:green;}';
GM_addStyle(st2);
divEq.appendChild(bAmunition);
var AmunitionItem = []
for (var i=0;i<3;i++) {
    AmunitionItem[i] = document.createElement("b");
    switch (i)
    {
        case 0: { AmunitionItem[i].innerHTML = 'Одеть Лампу<br>'; break}
        case 1: { AmunitionItem[i].innerHTML = 'Одеть Сферу Бури<br>'; break}
        case 2: { AmunitionItem[i].innerHTML = 'Одеть Проводник<br>'; break}
    }
    AmunitionItem[i].setAttribute("class",'tpItem');
    bAmunition.appendChild(AmunitionItem[i]);
}


bCurAmunition = document.createElement("b");
bCurAmunition.innerHTML = '=Equiped=<br>';
                  bCurAmunition.addEventListener('click', bar=function(){
                     isequip();
                  }
                  , false);
bCurAmunition.setAttribute("id",'tpD');
divEq.appendChild(bCurAmunition);
bCurAmunitionItem= document.createElement("b");
bCurAmunitionItem.innerHTML = 'Ничего не одето<br>';
bCurAmunitionItem.setAttribute("class",'tpItem');
bCurAmunition.appendChild(bCurAmunitionItem);

(function(){
   getamunition();
   isequip();
}
)();

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
               if (art_id==1368){
                  bCurAmunitionItem.innerHTML = 'Проводник<br>';
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


function getamunition(){

   GM_xmlhttpRequest({
      method: 'GET',
      url: tmDomain+'/srv/user/bpxml',
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
         
         for (var i=0;i<3;i++) {
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
            if(art_id == 1368){
                  AmunitionItem[2].style.visibility="visible";
                  AmunitionItem[2].setAttribute("link",'http://tmgame.ru/action.php?xml=1&acode=dress&amount=1&obj_id='+normalize(items[q].getAttribute("id"))+'&obj_type=8&slot_num=8');
                  AmunitionItem[2].innerHTML = 'Проводник ['+items[q].getAttribute("amount")+']<br>';
                  AmunitionItem[2].addEventListener('click', bar=function(){
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