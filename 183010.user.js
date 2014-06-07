// ==UserScript==
// @name         Unblock Contextmenu
// @namespace    iFantz7E.UnblockContext
// @version      0.1
// @description  Enable right-click and drag
// @match        *
// @copyright    2013, 7-elephant
// ==/UserScript==

function unblockContext()
{
    var bodys = document.getElementsByTagName("body");

    for (var i in bodys) 
    {
		bodys[i].setAttribute("onDragStart","return true");
		bodys[i].setAttribute("oncontextmenu","return true");
		bodys[i].setAttribute("onSelectStart","return true");
    }
}
unblockContext();