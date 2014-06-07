// ==UserScript==
// @name           DS Workbench Scripts
// @namespace      none
// @include        http://de*.die-staemme.de/game.php?*screen=place*
// @include        http://de*.die-staemme.de/game.php?screen=place*
// @include        http://de*.die-staemme.de/game.php?*screen=place
// @include        http://de*.die-staemme.de/game.php?*screen=market&mode=send*
// @exclude        http://de*.die-staemme.de/game.php?*screen=place&mode=units
// @exclude        http://de*.die-staemme.de/game.php?*screen=place&mode=sim
// @exclude        http://de*.die-staemme.de/game.php?*screen=place&mode=neighbor
// @exclude        http://de*.die-staemme.de/game.php?*screen=place&try=confirm
// ==/UserScript==



if(window.navigator.userAgent.indexOf("Firefox") > -1){
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
}else if(type == 1){
  doInsertResourcesAction();
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
if(window.navigator.userAgent.indexOf("Firefox") > -1){
         unsafeWindow.insertUnit(field, parseInt(args[units[i]]));
}else{
insertUnit(field, parseInt(args[units[i]]));
}
      }
   }
}

function doInsertResourcesAction(){
 //insert valid value
if(window.navigator.userAgent.indexOf("Firefox") > -1){
    unsafeWindow.insertNumber(document.getElementsByName('wood')[0],args['wood']);
		unsafeWindow.insertNumber(document.getElementsByName('stone')[0], args['clay']);
		unsafeWindow.insertNumber(document.getElementsByName('iron')[0], args['iron']);
}else{
		insertNumber(document.forms[0].wood, args['wood']);
		insertNumber(document.forms[0].stone, args['clay']);
		insertNumber(document.forms[0].iron, args['iron']);
}
      }


function addLoadEvent(func) {
var oldonload;
if(window.navigator.userAgent.indexOf("Firefox") > -1){
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

/**helper function**/

/*function insertUnit(input, count) {
	if(input.value != count)
		input.value=count;
	else
		input.value='';
}*/
