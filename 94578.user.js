// ==UserScript==
// @name           tower
// @namespace      http://tmgame.ru/game.php
// @description    towerTM
// @include        http://tmgame.ru/game.php
// ==/UserScript==
var divDn;
var actions;
var tpActions;
var tmDomain;

tmDomain=document.location.href.match(/http:\/\/[^\/]+/gi);
tmDomain=tmDomain?tmDomain[0]:"http://www.tmgame.ru";

divDn2 = document.createElement("div");
divDn2.innerHTML = '';
divDn2.setAttribute("style",'position:absolute;cursor:pointer;top:300px;left:0px;background-color:transparent;padding: 3px 3px;');
document.getElementsByTagName('body')[0].appendChild(divDn2);

BPVis = document.createElement("b");
BPVis.innerHTML = '(Hide) ';
BPVis.addEventListener('click', bar=function(){
   BPRoot.style.visibility="hidden";
   BPRoot.innerHTML='';
}
, false);
divDn2.setAttribute("id",'tpD');
var st2='.tpItem{color:green;}';
GM_addStyle(st2);
divDn2.appendChild(BPVis);

BPRoot2= document.createElement("b");
BPRoot2.innerHTML = '=In BackPack= <br>';
                  BPRoot2.addEventListener('click', bar=function(){
                     checkBP();
                  }
                  , false);
BPRoot2.setAttribute("id",'tpD');
var st2='.tpItem{color:green;}';
GM_addStyle(st2);
divDn2.appendChild(BPRoot2);

BPRoot= document.createElement("b");
BPRoot.innerHTML = '';
BPRoot.setAttribute("id",'tpD');
var st2='.tpItem{color:green;}';
GM_addStyle(st2);
divDn2.appendChild(BPRoot);


(function(){
}
)();

function checkBP(){

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
         while (BPRoot.childNodes[0]) {
            BPRoot.removeChild(BPRoot.childNodes[0]);
         }
         BPRoot.innerHTML = '';

         var dom = parser.parseFromString(resp,"application/xml");
         var items = dom.getElementsByTagName('item');
                
         for (var q in items){
            slot=normalize(items[q].getAttribute("slots"));
             if((slot != '0')&&(normalize(items[q].getAttribute("obj_type"))==8)){
                  var object;
                  object = document.createElement("b");
                  object.setAttribute("class",'tpItem');
                  object.setAttribute("link",'http://tmgame.ru/action.php?xml=1&acode=dress&amount=1&obj_id='+normalize(items[q].getAttribute("id"))+'&obj_type=8&slot_num='+slot);
  switch (slot)
  {
    case '7': { object.innerHTML = 'Оружие<br>'; break }
    case '5': { object.innerHTML = 'Сапоги<br>'; break }
    case '4': { object.innerHTML = 'Поножи<br>'; break }
    case '3': { object.innerHTML = 'Кольчуга<br>'; break }
    case '2': { object.innerHTML = 'Броня<br>'; break }
    case '1': { object.innerHTML = 'Шлем<br>'; break }
    case '15': { object.innerHTML = 'Перчатки<br>'; break }
    case '14': { object.innerHTML = 'Амулет<br>'; break }
    case '13': { object.innerHTML = 'Плечи<br>'; break }
    case '11,12': { object.innerHTML = 'Кольцо<br>'+normalize(items[q].getAttribute("id")); break }
  }
var title = items[q].getElementsByTagName('title');
object.innerHTML = title[0].firstChild.nodeValue+'</br>';
                  object.addEventListener('click', bar=function(){
                     getURL(this.getAttribute("link"));
                  }
                  , false);
                  BPRoot.appendChild(object);
            }
         }
BPRoot.style.visibility="visible"
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