// ==UserScript==
// @name           2 Linkbuttons Pennergame
// @description    Fuegt 2 Linkbuttons hinzu (links neben dem Wetter) Anpassbar im Script! 
// @include        http://*pennergame.de*
// @version        1.1 Mausfinger hinzugefügt
// ==/UserScript==

// BUTTON 1
var bn1 = "Plunder" ; 	// Buttonname = was auf dem Button stehen soll					
var bl1 = "http://koeln.pennergame.de/stock/plunder/" ;	// Buttonlink = wohin verlinkt werden soll


// BUTTON2
var bn2 = "Basteln" ;
var bl2 = "http://koeln.pennergame.de/stock/plunder/craftlist/" ;

//------------------------------------------------------------------
//--------!!!AB HIER NICHTS MEHR ÄNDERN!!!--------------------------
//------------------------------------------------------------------

var table = document.getElementById('topmenu');
var li = document.createElement('li');
table.getElementsByTagName('ul')[0].appendChild(li);
li.innerHTML = '<input type="button" value="'+bn1+'" onClick=window.location.href="'+bl1+'" style="cursor:pointer"/><br><input type="button" value="'+bn2+'" onClick=window.location.href="'+bl2+'" style="cursor:pointer"/>';
