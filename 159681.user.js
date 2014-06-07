// ==UserScript==
// @name           Land Walker v2
// @namespace      Avalon
// @description    Walks your map
// @include        http://thelostrunes.com/game.php
// @include        http://www.thelostrunes.com/game.php
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

addGlobalJS('function landWalkerScript(x,y){ var atimer_check = document.getElementById("actiontimer").innerHTML; if(atimer_check != "0.0") { walkTimeout = setTimeout(function(){landWalkerScript(x,y);}, 500); return; } else { var currLoc = document.getElementById("loccoords").innerHTML; currLoc = currLoc.split(","); var currLocX = currLoc[0]; var currLocY = currLoc[1]; if (x == "") { return; } if (y == "") { return; } if (currLocX != x) { var Xtest = parseFloat(x-currLocX); if (Xtest < 0) { go(4); walkTimeout = setTimeout(function(){landWalkerScript(x,y);}, 500); return; } else if (Xtest > 0) { go(3); walkTimeout = setTimeout(function(){landWalkerScript(x,y);}, 500); return; } } if (currLocY != y) { var Ytest = parseFloat(y-currLocY); if (Ytest < 0) { go(2); walkTimeout = setTimeout(function(){landWalkerScript(x,y);}, 500); return; } else if (Ytest > 0) { go(1); walkTimeout = setTimeout(function(){landWalkerScript(x,y);}, 500); return; } } } }');

document.getElementById("right3").innerHTML += '<table border="0" cellspacing="0" cellpadding="1" align="center"  style="margin-top: 10px;" style="margin-bottom: 14px;"><tr><td><font color="#281400"><b>X:</b></font> <input id="script_xloc" type="text" style="width:18px;" /></td><td><font color="#281400"><b>Y:</b></font> <input id="script_yloc" type="text" style="width:18px;" /></td><td><input type="submit" value="Go" onClick="landWalkerScript(document.getElementById(\'script_xloc\').value,document.getElementById(\'script_yloc\').value)" style="height:23px;" /></td><td><input type="submit" value="Stop" onClick="clearTimeout(walkTimeout)" style="height:23px;" /></td><td><input type="submit" value="Home" onClick="javascript:teleport();" style="height:23px;" /></td></tr></table>';
