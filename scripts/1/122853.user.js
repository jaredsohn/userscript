// ==UserScript==
// @name           Charter97 helper
// @namespace      NaumPoldnevNameSpace
// @description    Полезности для читателей сайта Хартия97
// @author Наум Полднев
// @include        *charter97.org/*
// ==/UserScript==

function $ec(className){
   return document.getElementsByClassName(className);
}


// Комментарии верхнего (1-го) уровеня
var comcontainer = $ec("commentContainer");
if(comcontainer) {
   for(i=0; i<comcontainer.length; i++) {
      comcontainer[i].style.margin = "5px 0 5px 10.8%";
      comcontainer[i].style.borderLeft = "ridge 5px #555";
      comcontainer[i].style.padding = "0 0 0 5px";
   }
}

// Комментарии 2-5-го уровня
var comlevl = [$ec("commentContainer commentLevel2"),
               $ec("commentContainer commentLevel3"),
               $ec("commentContainer commentLevel4"),
               $ec("commentContainer commentLevel5")];
if(comlevl) {
   var curcom; var lg = "";  
   for(i=0; i<comlevl.length;i++) {
      curcom = comlevl[i];
      
      for(j=0; j<curcom.length; j++) {
         switch(i) {
            case 0:
               curcom[j].style.margin = "5px 0 5px 12%";
               curcom[j].style.borderLeft = "ridge 4px red";
               break;
           case 1:
               curcom[j].style.margin = "5px 0 5px 14%";
               curcom[j].style.borderLeft = "ridge 3px green";
               break;
           case 2:
               curcom[j].style.margin = "5px 0 5px 16%";
               curcom[j].style.borderLeft = "ridge 2px brown";
               break;
           case 3:
               curcom[j].style.margin = "5px 0 5px 18%";
               curcom[j].style.borderLeft = "ridge 1px blue";
               break;            
            default:
               curcom[j].style.margin = "5px 0 5px 18%";
               curcom[j].style.borderLeft = "dotted 1px blue";
               break;
         }
         curcom[j].style.padding = "0 0 0 5px";
      }
      
   }
}

var cominfo = $ec("info");
if(cominfo) {
   for(i=0; i<cominfo.length; i++) {
      cominfo[i].style.fontWeight = "bold";
      cominfo[i].style.backgroundColor = "#E5E5E5";
   }
}

var comdate = $ec("date");
if(comdate) {
   for(i=0; i<comdate.length; i++) {
      comdate[i].style.fontWeight = "bold";
      comdate[i].style.color = "#005500";
      comdate[i].style.padding = "0 0 0 5px";
   }
}