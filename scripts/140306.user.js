// ==UserScript==
// @name           Prueba
// @version	    8.2
// @description     Prueba
// @namespace       Prueba
// @author	        Prueba
// @homepage	    Prueba
// @require	    https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require	    http://userscripts.org/scripts/source/85821.user.js
// @include         http://*.grepolis.*
// @source          http://userscripts.org/scripts/show/62989
// @license         GNU General Public License GPLv3
// ==/UserScript==
/**
* This script is licensed  under:
* GNU General Public License GPLv3
* To view a copy of this license, visit http://www.gnu.org/licenses/gpl.html
* Copyright © Doc Marco & die PC-Helfer, 2009-2010
* Initial script © Copyright Doc Marco & die PC-Helfer (aka Ðð¢ M@rco PC-Træk), 2009
* Snipes copied from http://userscripts.org/scripts/show/71132 - Dreambraker
*Pointsource from: http://userscripts.org/scripts/show/89114 //translate in all Languages
*Special thanks to Bart Kemps for refactoring the script and adding icons, drop down functionality and configurability
**/

// JQuery

var $;
if (unsafeWindow.jQuery == undefined){
  log("jquery no esta definida");
}else{
  log("jquery esta cargada";
  $ = unsafeWindow.jQuery;
  init();
}

function init() {
 var f = unsafeWindow.MenuBubbleMovement.attack_commands_count;
 $("div#bottom_ornament").bind("click",MenuToggle);
 alert(f);
}


function MenuToggle(event) {
 log(event.currentTarget.id)
 $("div#bottom_ornament").append("<span>HOLA</span>");
}




