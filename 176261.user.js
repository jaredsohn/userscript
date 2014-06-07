// ==UserScript==
// @name       Bettingsssss
// @namespace  http://dfsfsdfur.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://www.leakforums.org/newpoints.php?action=betting&type=1vs1
// @copyright  2012+, You
// ==/UserScript==

var a = document.getElementById("container").getElementsByTagName("form");

for (var i = 0; i < a.length; i++)
{
    a[i].setAttribute("action", a[i].getAttribute("action").replace("decline","enter"));
    a[i].lastChild.setAttribute("value", "Accept");
}