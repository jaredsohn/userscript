// ==UserScript==
// @name        autowysylanie by Slay
// @namespace   http://shoxteam.net
// @description autowysyla zwiad
// @include     *.plemiona.pl/game.php?*&screen=map*
// @include     *.plemiona.pl/game.php?*&screen=place*
// @version     1.0.1
// ==/UserScript==

var target_x = "786";
var target_y = "364";

function GM_wait() {

  if (typeof unsafeWindow.jQuery == 'undefined') {
    window.setTimeout(GM_wait, 100);
  } else {
    $ = unsafeWindow.jQuery;
    letsJQuery();
  }

}



// Main()
function letsJQuery()
{
  if (typeof unsafeWindow == 'undefined') {
    unsafeWindow = window;
  }
	$(document).ready(function()
	{
	  //$('#unit_input_spy').attr("value", "5");
	  $('#unit_input_axe').attr("value", "15");
	  //$('#unit_input_light').attr("value", "15");
	  $('#inputx').attr("value", target_x); $('#inputy').attr("value", target_y); $("#target_attack").click(); $("#troop_confirm_go").click();
  });
}

if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
    this.GM_getValue=function (key,def) {
        return localStorage[key] || def;
    };
    this.GM_setValue=function (key,value) {
        return localStorage[key]=value;
    };
    this.GM_deleteValue=function (key) {
        return delete localStorage[key];
    };
}


GM_wait();