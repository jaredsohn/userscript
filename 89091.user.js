// ==UserScript==
// @name           TMExp
// @namespace      *www.tmgame.ru*
// @include        http://tmgame.ru/game.php
// @include        http://*.tmgame.ru/game.php
// @include        http://*tmgame.mail.ru/game.php
// ==/UserScript==
var divPr;
var actions;
var tpActions;
var tmDomain;

var bbRoot = document.createElement("b");
bbRoot.innerHTML = '=Одето:= <br>';
bbRoot.setAttribute("id",'tpD');
var bbItem;
bbItem= document.createElement("b");
bbItem.innerHTML = 'Ничего не одето<br>';
bbItem.setAttribute("class",'tpItem');
bbRoot.appendChild(bbItem);
bbItem.addEventListener('click', bar=function(){
                     isequip();
                  }
                  , false);

(function(){
  tmDomain=document.location.href.match(/http:\/\/[^\/]+/gi);
  tmDomain=tmDomain?tmDomain[0]:"http://www.tmgame.ru";

  divPr = document.createElement("div");
  divPr.innerHTML = '';
         divPr.setAttribute("style",'position:absolute;cursor:pointer;top:0px;left:0px;background:#F2D48C;padding: 3px 3px;');
         document.getElementsByTagName('body')[0].appendChild(divPr);

   refresh();
   isequip();
   setInterval(function() { isequip() }, 1000)
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
                  bbItem.innerHTML = 'Сфера Бури<br>';
                  sucess = 1;
               }
               if (art_id==1381){
                  bbItem.innerHTML = 'Лампа<br>';
                  sucess = 1;
               }
         }
         if (sucess == 0) {
              bbItem.innerHTML = 'Ничего не одето<br>';
         }
      }
   }
   );
}


function refresh(){

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
         //GM_log(resp);
        
         var dom = parser.parseFromString(resp,"application/xml");
         var items = dom.getElementsByTagName('item');
         var actions = dom.getElementsByTagName('action');
         var str='';
		
         bTeleportRoot = document.createElement("b");
         bTeleportRoot.innerHTML = '=Teleport= <br>';
         bTeleportRoot.setAttribute("id",'tpD');
         var st1='#tpD .tpItem{display:none;} #tpD:hover .tpItem{display:inline!important;}';
         var st2='.tpItem{color:green;}';
         GM_addStyle(st2);
         divPr.appendChild(bTeleportRoot);

    // TELEPORT    
         var bTeleportItem;
         var bTPcnt=0;
	 var actionsInfo=new Object();
         for (var q in actions){
            var caption='';
            link=normalize(actions[q].getAttribute("link"));
            //GM_log(link);
            if(link.indexOf('obj_type=8')>0){
               if(link.indexOf('aid=5965')>0){
                  caption='К парниковой ферме';
               }
               else
               if(link.indexOf('aid=3092')>0){
                  caption='Хаотический бой';
               }
               else
               if(link.indexOf('aid=1963')>0){
                  caption='В катакомбы';
               }
               else
               if(link.indexOf('aid=5963')>0){
                  caption='K APEHE';
               }
               else
               if(link.indexOf('aid=761')>0){
                  caption='В город';
               }
               else
               if(link.indexOf('aid=1731')>0){
                  caption='В оазис Омакшан';
               }
               else
               if(link.indexOf('aid=2417')>0){
                  caption='К мастерской';
               }
               else
               if(link.indexOf('aid=3143')>0){
                  caption='К Башне';
               }
               else
               if(link.indexOf('aid=3145')>0){
                  caption='К Аукциону';
               }
               else
               if(link.indexOf('aid=3686')>0){
                  caption='На ОСТРОВ';
               }
               if (caption!=''){
                  bTeleportItem = document.createElement("b");
                  bTeleportItem.innerHTML = ''+caption+'<br>';
                  bTeleportItem.setAttribute("link",tmDomain+'/'+link);
                  bTeleportItem.setAttribute("class",'tpItem');
                  bTeleportRoot.appendChild(bTeleportItem);
                  bTeleportItem.addEventListener('click', bar=function(){
                     getURL(this.getAttribute("link"));
                  }
                  , false);
               }
            }
         }
   // Ammunition
         bAmunition = document.createElement("b");
         bAmunition.innerHTML = '=Ammunition= <br>';
         bAmunition.setAttribute("id",'tpD');
         var st2='.tpItem{color:green;}';
         GM_addStyle(st2);
         divPr.appendChild(bAmunition);

         bLampaRoot = document.createElement("b");
         bLampaRoot.innerHTML = '======== <br>';
         bLampaRoot.setAttribute("id",'tpD');
         var st2='.tpItem{color:green;}';
         GM_addStyle(st2);
         divPr.appendChild(bLampaRoot);
         bLampaRoot.innerHTML = '======== <br>';
         var bLampaItem;
         var bunLampaItem;
         var bTPcnt=0;
         for (var q in items){
            art_id=normalize(items[q].getAttribute("art_id"));
            if(art_id == 1381){
                  bLampaItem= document.createElement("b");
                  bLampaItem.innerHTML = 'Одеть Лампу<br>';
                  bLampaItem.setAttribute("class",'tpItem');
                  bLampaRoot.appendChild(bLampaItem);
                  bLampaItem.addEventListener('click', bar=function(){
                     getURL("http://tmgame.ru/action.php?xml=1&acode=dress&amount=1&obj_id=81466164&obj_type=8&slot_num=8");
                  }
                  , false);
                  bunLampaItem= document.createElement("b");
                  bunLampaItem.innerHTML = 'Снять Лампу<br>';
                  bunLampaItem.setAttribute("class",'tpItem');
                  bLampaRoot.appendChild(bunLampaItem);
                  bunLampaItem.addEventListener('click', bar=function(){
                     getURL("http://tmgame.ru/action.php?xml=1&acode=undress&amount=1&obj_id=81466164&obj_type=8&slot_num=8");
                  }
                  , false);
break;
            }
         }



         bBuriaRoot = document.createElement("b");
         bBuriaRoot.innerHTML = '======== <br>';
         bBuriaRoot.setAttribute("id",'tpD');
         var st1='#tpD .tpItem{display:none;} #tpD:hover .tpItem{display:inline!important;}';
         var st2='.tpItem{color:green;}';
         //	GM_addStyle(st1);
         GM_addStyle(st2);
         divPr.appendChild(bBuriaRoot);
         bBuriaRoot.innerHTML = '======== <br>';
         var bBuriaItem;
         var bunBuriaItem;
         var bTPcnt=0;
         for (var q in items){
            art_id=normalize(items[q].getAttribute("art_id"));
            if(art_id == 1350){
                  bBuriaItem = document.createElement("b");
                  bBuriaItem.innerHTML = 'Одеть Сферу<br>';
                  bBuriaItem.setAttribute("class",'tpItem');
                  bBuriaRoot.appendChild(bBuriaItem);
                  bBuriaItem.addEventListener('click', bar=function(){
                     getURL("http://tmgame.ru/action.php?xml=1&acode=dress&amount=1&obj_id=80770197&obj_type=8&slot_num=8");
                  }
                  , false);
                  bunBuriaItem = document.createElement("b");
                  bunBuriaItem.innerHTML = 'Снять Сферу<br>';
                  bunBuriaItem.setAttribute("class",'tpItem');
                  bBuriaRoot.appendChild(bunBuriaItem);
                  bunBuriaItem.addEventListener('click', bar=function(){
                     getURL("http://tmgame.ru/action.php?xml=1&acode=undress&amount=1&obj_id=80770197&obj_type=8&slot_num=8");
                  }
                  , false);
break;
	
            }
         }
         divPr.appendChild(bbRoot);
   
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