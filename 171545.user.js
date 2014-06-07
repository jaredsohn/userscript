// ==UserScript==
// @name        OgameSelectAllMessages
// @namespace   http://userscripts.org/
// @include     http://uni120.ogame.pl/game/index.php?page=messages
// @version     1
// @run-at      document-end
// ==/UserScript==


function selectAll()
{
    var cnt = document.getElementById("messageContent");
    var cbs = cnt.getElementsByTagName("input");
    for (i=0;i<cbs.length;++i)
    {
        var cb = cbs[i];
        if (cb.getAttribute("type")=="checkbox")
            cb.checked = !cb.checked;
    }
}

function checkCB()
{
    var cb = document.getElementById("checkAll");
    if (!cb)
    {
        setTimeout(checkCB,100);
        return;
    }
    cb.onclick = selectAll;
    setTimeout(checkCB,1000); // reset function when changing pages
}
setTimeout(checkCB,500);