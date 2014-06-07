//Niniejszy skrypt jest darmowy mozesz go 
//rozprowadzac dalej i/lub modyfikowac 
//pod warunkiem nie pobierania z tego tytulu oplat 
//(z wyjatkiem ceny nosnika) 
//i zachowania tej informacji 

//Niniejszy skrypt rozpowszechniany jest 
// BEZ JAKIEJKOLWIEK GWARANCJI 

//Uzywanie skryptu moze byc niezgodne z regulaminem gry 

// ==UserScript== 
// @name            Buddy kordy 
// @namespace       li-on@wp.pl 
// @description     Dodaje linki do koordow w buddy 
// @include         http://s*.ogame.onet.pl/game/index.php?page=buddy* 
// ==/UserScript== 

var th=document.getElementsByTagName("th"); 
var loc=document.location.href.substring(0); 
loc=loc.substring(loc.indexOf('?page=buddy')+11); 
for(i=5;i<th.length;i+=6){ 
   koordy=th[i].innerHTML; 
   p1=parseInt(koordy); 
   p2=parseInt(koordy.substring(koordy.indexOf(':')+1)); 
   th[i].innerHTML='<a href="'+loc.replace('?page=buddy','?page=galaxy&galaxy='+p1+'&system='+p2+'&position')+'">'+koordy+'</a>'; 
} 

str = GM_getValue("fr"); 
   if(str==null){ 
   alert(unescape("Niniejszy%20skrypt%20jest%20darmowy%20mo%u017Cesz%20go%20%0Arozprowadza%u0107%20dalej%20i/lub%20modyfikowa%u0107%20%0Apod%20warunkiem%20nie%20pobierania%20z%20tego%20tytu%u0142u%20%0Aop%u0142at%20%28z%20wyj%u0105tkiem%20ceny%20no%u015Bnika%29%0Ai%20zachowania%20tej%20informacji%0ANiniejszy%20skrypt%20rozpowszechniany%20jest%20%0A%0ABEZ%20JAKIEJKOLWIEK%20GWARANCJI%20%0A%0AU%u017Cywanie%20skryptu%20mo%u017Ce%20by%u0107%20niezgodne%20z%20regulaminem%20gry")); 
   GM_setValue("fr","lion") 
   }