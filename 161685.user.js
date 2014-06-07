// ==UserScript==
// @name           Imported Reset Buttons
// @namespace      Avalon
// @description    Adds 4 Reset buttons ( need both imported counters ) 
// @include        http://thelostrunes.com/game.php
// @include	http://www.thelostrunes.com/game.php
// ==/UserScript==

function addGlobalJS(js)
{
    var head, script;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = js;
    head.appendChild(script);
}

document.getElementById("right2").innerHTML += '<table style="margin-bottom: 8px;" align="center" cellpadding="0" cellspacing="0"><tbody><tr><td colspan="2" align="center"><br>[ <a href="javascript:addCounterReset(1);" style="color: #DD2222">Reset Gains</a> ]</td></tr> <tr><td colspan="2" align="center"> [ <a href="javascript:addCounterReset(4);" style="color: #DD2222">Reset Lucky Finds</a> ]</td></tr> <tr><td colspan="2" align="center">[ <a href="javascript:addCounterReset(2);" style="color: #DD2222">Reset Timers</a> ]</td></tr><tr><td colspan="2" align="center"> [ <a href="javascript:addCounterReset(3);" style="color: #DD2222">Reset Battle Statistics</a> ]</td></tr></tbody></table></form>';

addGlobalJS("function addCounterReset(n) { if (n == 1) { document.getElementById('add_foodcount').innerHTML = '0'; document.getElementById('add_woodcount').innerHTML = '0'; document.getElementById('add_ironcount').innerHTML = '0'; document.getElementById('add_stonecount').innerHTML = '0'; document.getElementById('add_ingotcount').innerHTML = '0'; document.getElementById('add_platcount').innerHTML = '0'; }     else if (n == 2) { document.getElementById('addhourcount').innerHTML = '0'; document.getElementById('addminutecount').innerHTML = '0'; document.getElementById('addsecondcount').innerHTML = '0';  } else if (n == 3) {     document.getElementById('percent_wins').innerHTML = '50.00';     document.getElementById('add_killinc').innerHTML = '0';     document.getElementById('add_deathinc').innerHTML = '0';    } else if (n == 4)   {         document.getElementById('add_insanecount').innerHTML = '0';         document.getElementById('add_extremecount').innerHTML = '0';         document.getElementById('add_verycount').innerHTML = '0';        document.getElementById('add_luckycount').innerHTML = '0';        }}");


