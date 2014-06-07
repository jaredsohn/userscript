// ==UserScript==
// @name           Total Battles Counter
// @namespace      Kinetic
// @description    See total battles counter in-game.
// @include        http://thelostrunes.com/game.php
// @include        http://www.thelostrunes.com/game.php
// ==/UserScript==

document.getElementById("page").innerHTML += '<div id="script_hidden" style="display: none; visibility: hidden;"></div>';
document.getElementById("left1").innerHTML += '<br /><b>Total Battles:</b> <span id="battles_counter"><a href="javascript:getBattles(1);">[Load]</a></span>';

function addGlobalJS(js) {
    var head, script;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = js;
    head.appendChild(script);
}

addGlobalJS('function battleResponse() { if(misc.readyState == 4) { var response = misc.responseText; response = response.replace(/div/gi, "span"); response = response.replace(/html/gi, "span"); response = response.replace(/body/gi, "span"); response = response.replace(/script/gi, "span"); response = response.replace(/meta/gi, "span"); response = response.replace(/!DOCTYPE/gi, "span"); response = response.replace(/link/gi, "span"); document.getElementById("script_hidden").innerHTML = response; var battles_counter = document.getElementById("battles").innerHTML; document.getElementById("script_hidden").innerHTML = ""; document.getElementById("battles_counter").innerHTML = battles_counter; } }');

addGlobalJS('function getBattles(n){ if(n == 1) { setInterval("getBattles(0)", 55123); } var url = "index.php"; misc.open("GET",url,true); misc.send(null); misc.onreadystatechange=battleResponse; }');