// ==UserScript==
// @name           Teleport
// @namespace      http://tmgame.ru/game.php
// @description    zzzzz
// @include        http://tmgame.ru/game.php
// ==/UserScript==
var divPr;
var actions;
var tpActions;
var tmDomain;

tmDomain=document.location.href.match(/http:\/\/[^\/]+/gi);
tmDomain=tmDomain?tmDomain[0]:"http://www.tmgame.ru";

divPr = document.createElement("div");
divPr.innerHTML = '';
divPr.setAttribute("style",'position:absolute;cursor:pointer;top:3px;left:3px;background-color:transparent;padding: 3px 3px;');
document.getElementsByTagName('body')[0].appendChild(divPr);

bTeleportRoot = document.createElement("b");
bTeleportRoot.innerHTML = '=Teleport= <br>';
bTeleportRoot.addEventListener('click', bar=function(){
                     getteleport();
                  }
                  , false);
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


(function(){
   getteleport();
}
)();

function getteleport(){
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