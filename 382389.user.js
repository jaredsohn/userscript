// ==UserScript==
// @name       Reduzir 10 min pesquisas
// @namespace  Rodolfo1010.org
// @version    0.1
// @description  enter something useful
// @match      http://*.imperiaonline.org/imperia/game_v5/game/village.php
// @copyright  2012+, You
// ==/UserScript==

var script = document.createElement("script");
script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
document.body.appendChild(script);

setInterval(
    function(){
    	xajax_listResearches('1', '1', '', -1, 0, 0, 'NULL', 2);
    },60000
);