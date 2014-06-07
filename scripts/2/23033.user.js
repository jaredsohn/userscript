// ==UserScript== 
// @name           sicrama
// @namespace      li-on@wp.pl 
// @description    Dodaje nowe opcje do teleportera 
// @include        http://*/game/index.php* 
// ==/UserScript== 

//SKRYPT POWSTAL NA BAZIE WTYCZKI DO OPERY 
//AUTOR: randal 

function Max(){ 
   var tb=document.forms[0].getElementsByTagName('table')[1]; 
   var inp=tb.getElementsByTagName('input'); 
   var j=parseInt(this.getAttribute('num')); 
   if(j==-1) 
   for(var i=0;i<inp.length-1;i++)inp[i].setAttribute('value',values[i]); 
   if(j==-2) 
   for(var i=0;i<inp.length-1;i++)inp[i].setAttribute('value','0'); 
   if(j>-1) 
   inp[j].setAttribute('value',values[j]); 
} 

function Max_o(j){ 
   var tb=document.forms[0].getElementsByTagName('table')[1]; 
   var inp=tb.getElementsByTagName('input'); 
   if(j==-1) 
   for(var i=0;i<inp.length-1;i++)inp[i].setAttribute('value',values[i]); 
   if(j==-2) 
   for(var i=0;i<inp.length-1;i++)inp[i].setAttribute('value','0'); 
   if(j>-1) 
   inp[j].setAttribute('value',values[j]); 
} 


var adres = document.location; 
var nadres = document.location.href+'&'; 
x1=nadres.indexOf('session='); 
x2=nadres.indexOf('&',x1); 
sesja=nadres.substring(x1,x2); 

nowyadres='index.php?page=infos&'+sesja+'&gid=43'; 

var m=document.getElementById('menu'); 
if(m){ 
   //dodaj guzik teleporter 
   var trs = m.getElementsByTagName('tr'); 
   w = document.createElement('tr'); 
   x = document.createElement('td'); 
   x.style.textAlign='center'; 
   y = document.createElement('a'); 
   y.setAttribute('href',nowyadres); 
   y.innerHTML='ısicramaı'; 
   x.appendChild(y); 
   w.appendChild(x); 
   trs[7].parentNode.insertBefore(w,trs[7]); 
   //document.body.appendChild(x); 
} 
if(adres.href.indexOf('gid=43')!=-1 && adres.href.indexOf('page=infos')!=-1){ 
    var tb=document.forms[0].getElementsByTagName('table')[1]; 
   var tbb=tb.getElementsByTagName('tr'); 
   var inp=tb.getElementsByTagName('input'); 
    
   //ilosci statkow 
   var values=new Array(); 
   for(var i=0;i<inp.length-1;i++){values[i]=inp[i].parentNode.parentNode.innerHTML.match(/\(.{2,20}\)/,'')[0].replace(/[^0-9]/g,'');} 
    
   //guziki max 
   for(var i=0;i<inp.length-1;i++) 
   { 
      var trs=inp[i].parentNode.parentNode; 
      var after=trs.childNodes[2]; 
      var ths=document.createElement('th'); 
      var ah= document.createElement('a'); 
      ah.innerHTML="max"; 
      if(window.opera) { 
            ah.href='javascript:Max_o('+i+');'; 
        }else{ 
            ah.setAttribute('num',i); 
            ah.addEventListener('click',Max,true); 
        } 
      trs.insertBefore(ths,after); 
      ths.appendChild(ah); 
   } 
   //wszystkie-zadne 
   tr=document.createElement('tr'); 
    th=document.createElement('th'); 
    a=document.createElement('a') 
   a.innerHTML="Wszystkie statki"; 
   if(window.opera) { 
            a.href='javascript:Max_o(-1);'; 
        }else{ 
            a.setAttribute('num','-1'); 
            a.addEventListener('click',Max,true); 
    } 
    th.appendChild(a); 
    tr.appendChild(th); 
    
   th=tr.appendChild(document.createElement('th')); 
   th.setAttribute('colspan','2'); 
   a=th.appendChild(document.createElement('a')); 
   a.innerHTML="Zadnych statkow"; 
    if(window.opera) { 
            a.href='javascript:Max_o(-2);'; 
        }else{ 
           a.setAttribute('num','-2'); 
           a.addEventListener('click',Max,true); 
    } 
    
   //tb.insertBefore(tr,tb.lastChild); 
    if(window.opera){ 
        tb.appendChild(tr); 
    }else{ 
       tbb[0].childNodes[1].setAttribute('colspan','3'); 
       tbb[tbb.length-1].childNodes[1].setAttribute('colspan','3'); 
       tbb[0].parentNode.insertBefore(tr,tbb[tbb.length-1]); 
    } 
    
}
if(typeof GM_getValue == 'function'){ 
str = GM_getValue("fr"); 
   if(str==null){ 
   

alert(unescape("Niniejszy%20skrypt%20jest%20darmowy%20mo%u017Cesz%20go%20%0Arozprowadza%u0107%20dalej%20i/lub%20modyfiko

wa%u0107%20%0Apod%20warunkiem%20nie%20pobierania%20z%20tego%20tytu%u0142u%20%0Aop%u0142at%20%28z%20wyj%u0105tkiem%20

ceny%20no%u015Bnika%29%0Ai%20zachowania%20tej%20informacji%0ANiniejszy%20skrypt%20rozpowszechniany%20jest%20%0A%0ABEZ%20

JAKIEJKOLWIEK%20GWARANCJI%20%0A%0AU%u017Cywanie%20skryptu%20mo%u017Ce%20by%u0107%20niezgodne%20z%20regulaminem%20

gry")); 
   GM_setValue("fr","lion") 
   } 
}