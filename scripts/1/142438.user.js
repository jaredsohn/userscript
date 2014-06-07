// ==UserScript==


// @name           Land Walker
// @namespace      TehNoob
// @description    Go, go, go.
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

addGlobalJS('function landWalkerScript(x,y){ var atimer_check = document.getElementById("actiontimer").innerHTML; { var currLoc = document.getElementById("loccoords").innerHTML; currLoc = currLoc.split(","); var currLocX = currLoc[0]; var currLocY = currLoc[1]; if (x == "") { return; } if (y == "") { return; } if (currLocX != x) { var Xtest = parseFloat(x-currLocX); if (Xtest < 0) { go(4); walkTimeout = setTimeout(function(){landWalkerScript(x,y);}, 100); return; } else if (Xtest > 0) { go(3); walkTimeout = setTimeout(function(){landWalkerScript(x,y);}, 100); return; } } if (currLocY != y) { var Ytest = parseFloat(y-currLocY); if (Ytest < 0) { go(2); walkTimeout = setTimeout(function(){landWalkerScript(x,y);}, 100); return; } else if (Ytest > 0) { go(1); walkTimeout = setTimeout(function(){landWalkerScript(x,y);}, 100); return; } } } }');

document.getElementById('tilestats').innerHTML = '<div align="center"><table border="0" cellspacing="0" cellpadding="2"><tr><td>X: <input id="script_xloc" type="text" style="width:18px;" /></td><td>Y: <input id="script_yloc" type="text" style="width:18px;" /></td><td><input type="submit" value="Go" onClick="landWalkerScript(document.getElementById(\'script_xloc\').value,document.getElementById(\'script_yloc\').value)" style="height:23px;" /></td><td><input type="submit" value="Stop" onClick="clearTimeout(walkTimeout)" style="height:23px;" /></td></tr></table></div>';
