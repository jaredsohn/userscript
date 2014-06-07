// ==UserScript==
// @name           utopiadice
// @namespace      squirtle
// @include        http://utopia-game.com/wol/game/throne*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
else { $ = unsafeWindow.jQuery; letsJQuery(); }
}
GM_wait();

// All your GM code must be inside this function
function letsJQuery() {
  var times = Math.ceil( (parseInt( $($("#throne-statistics tr")[6]).children(".col4").html().split("(")[1].split("%")[0] )-10)/3 );
  $("#navigation").append("<ul><li><a id='dicekey' href='#'>Dice x"+times+"</a></li></ul>");
  $("#dicekey").click(function(){
    for (var i=0; i<=times; i++){
        $.post("/wol/game/enchantment", {"spell":"PARADISE"}, function(data) {
          if (i >= times){
            $("#dicekey").html("Done dice.");
          }
          // introduce random wait time as to avoid hammering the server
          // ...and to look less like a script is dicing
          sleep( Math.floor(Math.random()*501)+500 );
        });
    };
    return false;
  });
}
