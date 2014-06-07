// ==UserScript==
// @name           TMTeleport
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

bTeleportRoot = document.createElement("b");
bTeleportRoot.innerHTML = '=Teleport= <br>';
bTeleportRoot.setAttribute("id",'tpD');
var st2='.tpItem{color:green;}';
GM_addStyle(st2);
divPr.appendChild(bTeleportRoot);

bTeleportRoot.addEventListener('click', bar=function(){
                     getteleport();
                  }
                  , false);

(function(){
   getteleport();
   getamunition();
   isequip();
   setInterval(function() { isequip() }, 1000)
}
)();

function getteleport(){

   GM_xmlhttpRequest({
      method: 'GET',
      url: tmDomain+' '+rand(1000,9999),
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
		
    // TELEPORT    

         var bTeleportItem;
         var bTPcnt=0;
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