// ==UserScript==
// @name           TM_Hidden_stat
// @namespace      *www.tmgame.ru*
// @include        http://tmgame.ru/game.php
// @include        http://*.tmgame.ru/game.php
// ==/UserScript==
var divPr;
var actions;
var tpActions;
var tmDomain;
(function(){
  tmDomain=document.location.href.match(/http:\/\/[^\/]+/gi);
  tmDomain=tmDomain?tmDomain[0]:"http://www.tmgame.ru";


   refresh();
}
)();

function refresh(){



   GM_xmlhttpRequest({
      method: 'GET',
      //  url: tmDomain+'/xml/persxml.php',
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
         actions = dom.getElementsByTagName('action');
         tpActions = new Array();
         var art_id = new Array();
         var str='';
		//GM_log(actions.length);
         openBags();
         CompileAmul();
		
         divPr = document.createElement("div");
         divPr.innerHTML = '';
         divPr.setAttribute("style",'position:absolute;right:0;bottom:0;background-color:#F2D48C;cursor:pointer;padding:3px;');
         document.getElementsByTagName('body')[0].appendChild(divPr);
         var bOpenBags = document.createElement("b");
 
         bTeleportRoot = document.createElement("b");
        
         bTeleportRoot.setAttribute("id",'tpD');
         var st1='#tpD .tpItem{display:none;} #tpD:hover .tpItem{display:inline!important;}';
         var st2='.tpItem{color:green;}';
         
         GM_addStyle(st2);
         divPr.appendChild(bTeleportRoot);

    
         var bTeleportItem;
         var bTPcnt=0;
	 var actionsInfo=new Object();
         for (var q=0;q<actions.length;q++){
            var caption='';
            link=normalize(actions[q].getAttribute("link"));
            
            if(link.indexOf('obj_type=8')>0){
               if(link.indexOf('aid=759')>0){
                  caption='Увеличить Урон';
               }
               else
               if(link.indexOf('aid=1728')>0){
                  caption='Увеличить Вампиризм';
               }
               else
               if(link.indexOf('aid=1730')>0){
                  caption='Увеличить Бронебойность';
               }
               else
               if(link.indexOf('aid=2402')>0){
                  caption='Увеличить Инициативу';
               }
               else
               if(link.indexOf('aid=1732')>0){
                  caption='Увеличить Броню';
               }
               else
               if(link.indexOf('aid=2416')>0){
                  caption='Увеличить Блок';
               }
               else
               if(link.indexOf('aid=1965')>0){
                  caption='Увеличить Контратаку';
               }
               else
               if(link.indexOf('aid=3142')>0){
                  caption='Увеличить Ярость';
               }
               else
               if(link.indexOf('aid=3093')>0){
                  caption='Увеличить Оглушение';
               }
               else
               if(link.indexOf('aid=3144')>0){
                  caption='Увеличить Удачу';
               }
               else
               if(link.indexOf('aid=1965')>0){
                  caption='Увеличить Вампиризм';
               }
               else
               
               if(link.indexOf('aid=761')>0){
                  caption='Увеличить Урон';
               }
               else
               if(link.indexOf('aid=1727')>0){
                  caption='Увеличить Бронебойность';
               }
               else
               if(link.indexOf('aid=1731')>0){
                  caption='Увеличить Вампиризм';
               }
               else
               if(link.indexOf('aid=1963')>0){
                  caption='Увеличить Инициативу';
               }
               else
               if(link.indexOf('aid=1964')>0){
                  caption='Увеличить Броню';
               }
               else
               if(link.indexOf('aid=2417')>0){
                  caption='Увеличить Блок';
               }
               else
               if(link.indexOf('aid=3143')>0){
                  caption='Увеличить Контратаку';
               }
               else
               if(link.indexOf('aid=3092')>0){
                  caption='Увеличить Ярость';
               }
               else
               if(link.indexOf('aid=3145')>0){
                  caption='Увеличить Оглушение';
               }
               if (caption!=''){
                  bTeleportItem = document.createElement("b");
                  bTeleportItem.innerHTML = ''+caption+'<br>';
                  bTeleportItem.setAttribute("link",tmDomain+'/'+link);
                  bTeleportItem.setAttribute("class",'tpItem');
                  bTeleportRoot.appendChild(bTeleportItem);
                  bTeleportItem.addEventListener('lick', bar=function(){
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

function openBags(){
   var link;
   for (var q=0;q<actions.length;q++){
      link=normalize(actions[q].getAttribute("link"));
      if(link.indexOf('aid=1962')>0){
         GM_xmlhttpRequest({
            method: "GET",
            url: tmDomain+'/'+link,
            onload: function(responseDetails)
            {
            }
         }
         );
      }
     
      if(link.indexOf('aid=1496')>0){
         GM_xmlhttpRequest({
            method: "GET",
            url: tmDomain+'/'+link,
            onload: function(responseDetails)
            {
            }
         }
         );
      }

   }
}
function CompileAmul(){
   var link;
   for (var q=0;q<actions.length;q++){
      link=normalize(actions[q].getAttribute("link"));
      if(link.indexOf('aid=1181')>0){
         GM_xmlhttpRequest({
            method: "GET",
            url: tmDomain+'/'+link,
            onload: function(responseDetails)
            {
            }
         }
         );
      }
   }
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
