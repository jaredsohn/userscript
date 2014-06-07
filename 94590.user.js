// ==UserScript==
// @name           items
// @namespace      http://tmgame.ru/game.php
// @description    itemsTM
// @include        http://tmgame.ru/game.php
// ==/UserScript==
var divDn;
var actions;
var tpActions;
var tmDomain;

tmDomain=document.location.href.match(/http:\/\/[^\/]+/gi);
tmDomain=tmDomain?tmDomain[0]:"http://www.tmgame.ru";

divDn = document.createElement("div");
divDn.innerHTML = '';
divDn.setAttribute("style",'position:absolute;cursor:pointer;top:0px;right:0px;background-color:transparent;padding: 3px 3px;');
document.getElementsByTagName('body')[0].appendChild(divDn);

DurabilityVis = document.createElement("b");
DurabilityVis.innerHTML = '(Hide) ';
DurabilityVis.addEventListener('click', bar=function(){
   //DurabilityItem.style.visibility="hidden";
   DurabilityItem.innerHTML='';
}
, false);
divDn.setAttribute("id",'tpD');
var st2='.tpItem{color:green;}';
GM_addStyle(st2);
divDn.appendChild(DurabilityVis);
DurabilityRoot = document.createElement("b");
DurabilityRoot.innerHTML = '=Equiped= <br>';
                  DurabilityRoot.addEventListener('click', bar=function(){
                     checkDurability();
                  }
                  , false);
DurabilityRoot.setAttribute("id",'tpD');
var st2='.tpItem{color:green;}';
GM_addStyle(st2);
divDn.appendChild(DurabilityRoot);
DurabilityItem = document.createElement("b");
DurabilityItem.setAttribute("class",'tpItem');
DurabilityRoot.appendChild(DurabilityItem);

(function(){
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
               var title = items[q].getElementsByTagName('title');
               DurabilityItem.innerHTML = DurabilityItem.innerHTML+title[0].firstChild.nodeValue+'</br>';
               DurabilityItem.style.visibility="visible"
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