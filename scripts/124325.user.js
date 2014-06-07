// ==UserScript==
// @name           ds_farmkoordinator
// @namespace      none
// @include        http://ae*.tribalwars.ae/game.php?*screen=place*
// @include        http://ae*.tribalwars.ae/game.php?screen=place*
// @include        http://ae*.tribalwars.ae/game.php?*screen=place
// @exclude        http://ae*.tribalwars.ae/game.php?*screen=place&mode=units
// @exclude        http://ae*.tribalwars.ae/game.php?*screen=place&mode=sim
// @exclude        http://ae*.tribalwars.ae/game.php?*screen=place&mode=neighbor
// @exclude        http://ae*.tribalwars.ae/game.php?*screen=place&try=confirm
// ==/UserScript==



if ((window.navigator.userAgent.indexOf("Firefox") > -1) || (window.navigator.userAgent.indexOf("CometBird") > -1)) {
window.addEventListener('load', function()
{ getArgs(); }, false);
}else{
addLoadEvent(function() {
  getArgs();
});
}


//parse arguments
function getArgs() { 
   args = new Object();
   var query = location.search.substring(1); 

   var pairs = query.split("&"); 
   for(var i = 0; i < pairs.length; i++) { 
      var pos = pairs[i].indexOf('='); 
      if (pos == -1) continue; 
         var argname = pairs[i].substring(0,pos); 
         var value = pairs[i].substring(pos+1); 
         args[argname] = unescape(value); 
      } 
   //return args; 
   if (args.type){
        type = parseInt(args.type);
}else{
     type = -1;
}
if(type == 0){
  doInsertUnitsAction();
}
} 

function doInsertUnitsAction(){
                             
 //all available units
   units = new Array("spear", "sword", "axe", "archer", "spy","light", "marcher", "heavy", "ram", "catapult", "knight", "snob");
   //go through all units

   for (var i = 0; i < units.length; ++i){
        //get field for unit        
        field = document.getElementsByName(units[i])[0];
       
        //if field is valid and arguments contain value for field
        if(field != null && args[units[i]] != null){
           //insert valid value
if ((window.navigator.userAgent.indexOf("Firefox") > -1) || (window.navigator.userAgent.indexOf("CometBird") > -1)) {
         unsafeWindow.insertUnit(field, parseInt(args[units[i]]));
}else{
   insertUnit(field, parseInt(args[units[i]]));
}
      }
   }
}

function addLoadEvent(func) {
var oldonload;
if ((window.navigator.userAgent.indexOf("Firefox") > -1) || (window.navigator.userAgent.indexOf("CometBird") > -1)) {
   oldonload = unsafeWindow.onload;
}else{
   oldonload = window.onload
}


  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      if (oldonload) {
        oldonload();
      }
      func();
    }
  }
}  
