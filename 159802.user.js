// ==UserScript==


// @name           Resize chat
// @namespace      Avalon
// @description    Adds buttons in your Footer to resize chat beyond 100
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


document.getElementById("footer").innerHTML += '<table border="0" cellspacing="0" cellpadding="1" align="center"  style="margin-top: 10px;" style="margin-bottom: 14px;"><tr><td><input type="submit" value="Default" onClick="Javascript:chatArray.length=20;void(0);" style="height:23px;" /></td><td><input type="submit" value="250 Lines" onClick="Javascript:chatArray.length=250;void(0);" style="height:23px;" /></td><td><input type="submit" value="500 Lines" onClick="Javascript:chatArray.length=500;void(0);" style="height:23px;" /></td></tr></table>';


