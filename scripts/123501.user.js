// ==UserScript==
// @name           TW Command Renamer
// @namespace      http://userscripts.org/users/351815
// @include        http://*.tribalwars.co.uk/game.php?*mode=commands*
// @description    Script to rename outgoing commands on TribalWarsv8 (v1.0.0.1)
// @author         hatchywatchy
// @version        1.0.0.1
// ==/UserScript==


function OutgoingRename(){

 var doc = (window.frames.length > 0) ? window.main.document : document;  
 var eleSpans = doc.getElementsByTagName("span");  
 for (var x = 0; x < eleSpans.length; x++) {      
  if (eleSpans[x].id.match(/label/)) table = doc.getElementById("commands_table");  
 }  

 function theInnerText(theNode) {      
  return typeof (theNode.innerText) == 'undefined' ? theNode.textContent : theNode.innerText;  
 }  

 function overView() {      
  var TroopRows = table.rows;      
  var headers = TroopRows[0].getElementsByTagName("th");        

  function getHeader(ele) {          
   for (i = 0; i < headers.length; i++) {              
    if (headers[i].innerHTML.match(ele, "i")) return i;          
   }      
  }      

  for (x = 1; x < TroopRows.length; x++) {          
   var inputs = TroopRows[x].getElementsByTagName("input");          
   if (inputs[1].value.match(/Attack on/i)) {              
    var spear = TroopRows[x].cells[getHeader('spear')].innerHTML;              
    var sword = TroopRows[x].cells[getHeader('sword')].innerHTML;              
    var axe = TroopRows[x].cells[getHeader('axe')].innerHTML;              
    var scout = TroopRows[x].cells[getHeader('spy')].innerHTML;              
    var lc = TroopRows[x].cells[getHeader('light')].innerHTML;              
    var hc = TroopRows[x].cells[getHeader('heavy')].innerHTML;              
    var ram = TroopRows[x].cells[getHeader('ram')].innerHTML;              
    var cat = TroopRows[x].cells[getHeader('catapult')].innerHTML;   
    var pally = TroopRows[x].cells[getHeader('paladin')].innerHTML;           
    var noble = TroopRows[x].cells[getHeader('snob')].innerHTML;              
    var coord = inputs[1].value.match(/(\d+\|\d+)\) K\d+/)[1];              

    var fighters = parseInt(spear) + parseInt(sword) + parseInt(axe) + parseInt(lc) + parseInt(hc);

    //- Farming
    if( fighters < 100 ){

     inputs[1].value = 'Farming ';
     if( spear > 1 ){
      inputs[1].value = inputs[1].value + "SP,";
     }
     if( axe > 1 ){
      inputs[1].value = inputs[1].value + "AX,";
     }
     if( lc > 1 ){
      inputs[1].value = inputs[1].value + "LC,";
     }
     if( hc > 1 ){
      inputs[1].value = inputs[1].value + "HC,";
     }
     inputs[1].value = inputs[1].value.substr(0,inputs[1].value.length-1);

    }

    //- Scouting
    if (scout >= 2 && fighters == 0) {  
     if( pally == 0 ){
      inputs[1].value = 'Scout';
     } else {
      inputs[1].value = 'Pally Scout';
     }
    }
      
    if (spear >= 100) {                  
     inputs[1].value = 'Sucide Troops';              
    }              

    if (sword >= 100) {                  
     inputs[1].value = 'Sucide Troops';              
    }              

    if (hc >= 500) {                  
     inputs[1].value = 'HC Clearing';              
    }              

    if (cat == 1 && scout >= 2) {                  
     inputs[1].value = 'Cat Intel';              
    }  			 

    if (cat == 1 && scout >= 2) {                  
     inputs[1].value = 'Ram Intel';              
    }              

    if (cat == 1) {                  
     inputs[1].value = 'Fake';              
    }              

    if (cat >= 2) {                  
     inputs[1].value = 'Fanged Fake';              
    }              

    if (ram == 1) {                  
     inputs[1].value = 'Fake';              
    }              

    if (axe >= 500 && lc <= 3100) {                  
     inputs[1].value = 'Nuke';              
    }  			

    if (axe >= 500 && lc <= 3100 && cat >= 1) {                  
     inputs[1].value = 'Cat Nuke';              
    }  			

    if (axe >= 500 && lc >= 500 && noble == 1) {                  
     inputs[1].value = 'Noble Nuke';              
    }              

    if (lc >= 3101) {                  
     inputs[1].value = 'LC Nuke';              
    }              

    if (axe <= 499 && lc <= 499 && noble == 1) {                  
     inputs[1].value = 'Noble';              
    }  			
             

    inputs[1].value = coord + ' ' + inputs[1].value;              
    inputs[2].click();          
   }      
  }  
 }  
 overView()
};

var cform = document.getElementById("cancelform");
var newbutton = document.createElement("input");
newbutton.setAttribute("text","Rename Commands");
newbutton.setAttribute("type","button");
newbutton.addEventListener("click", OutgoingRename, true );
newbutton.setAttribute("value","Rename Reports");
cform.insertBefore(newbutton, cform.childNodes.item(1));