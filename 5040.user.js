// ==UserScript==
// @name            Y! Site Search Everywhere
// @namespace       http://docs.g-blog.net/code/greasemonkey/
// @description     v20060807.8: Hit Alt+Shift+Y or Ctrl+Shift+Y to bring up a search form which will let you query a Yahoo! search for this particular site only.
// @author          Carlo Zottmann <carlo@zottmann.org>
// @include         http://*
// @include         https://*
// @exclude         http://search.yahoo.com/*
// @exclude         http://*.search.yahoo.com/*
// ==/UserScript==

// 

function ysseKeypress(event)
{
    if (!document.contentType.match(/text\/html/i)) { return true; }

    if ((event.ctrlKey || event.altKey) && event.shiftKey && String.fromCharCode(event.which) == "Y")
    {
        ysseShowMask();
    }
    else if (event.keyCode == 27 && document.getElementById("ysseDivFull")) 
    {
        ysseHideMask();
    }
}



function ysseShowMask()
{
    if (!document.getElementById("ysseDivFull")) { ysseBuildMask(); }
    
    document.getElementById("ysseDivFull").style.display = "block";
    document.getElementById("ysseTextField").focus();
}



function ysseHideMask()
{
    if (document.getElementById("ysseDivFull")) {
        document.getElementById("ysseDivFull").style.display = "none";
    }
}



function ysseBuildMask()
{
    var divFull = document.createElement("div");
    var divMask = document.createElement("div");
    
    var host = document.location.host.replace(/www\./i, "");

    divFull.id = "ysseDivFull";
    divFull.style.width = "100%";
    divFull.style.height = "100%";
    divFull.style.backgroundColor = "black";
    divFull.style.opacity = 0.85;
    divFull.style.position = "fixed";
    divFull.style.top = "0px";
    divFull.style.left = "0px";
    divFull.style.display = "none";
    divFull.style.zIndex = "998";
    
    divMask.id = "ysseDivMask";
    divMask.style.width = "30%";
    divMask.style.height = "150px";
    divMask.style.backgroundColor = "white";
    divMask.style.opacity = 1;
    divMask.style.position = "absolute";
    divMask.style.top = "250px";
    divMask.style.left = "35%";
    divMask.style.padding = "30px";
    divMask.style.border = "4px solid purple";
    divMask.style.textAlign = "center";
    divMask.style.zIndex = "1000";

    divMask.innerHTML = '<form method="get" action="http://search.yahoo.com/search" style="font-family: Verdana, Tahoma, sans-serif">'
    + '<input type="hidden" name="vs" value="' + host + '" />'
    + '<input type="hidden" name="fr" value="yscpb" />'
    + '<a href="http://search.yahoo.com/"><img src="http://us.i1.yimg.com/us.yimg.com/i/us/nt/ma/ma_search_1.gif" width="230" height="33" border="0" /></a><br />'
    + '<input type="text" name="p" id="ysseTextField" style="width: 90%; margin: 5px; background-color: lightyellow; border: 1px solid purple; padding: 3px; font-size: 14pt;" /><br />'
    + '<input type="submit" value="Search ' + host + '" style="font-size: 13pt;" /><br/><br/>'
    + '<span style="font-size: 10pt; color: black;">Hint: press ESC to hide the search mask, Ctrl+Shift+Y or Alt+Shift+Y to bring it up again.</span>'
    + '</form>';
    
    divFull.appendChild(divMask);
    document.getElementsByTagName("body")[0].appendChild(divFull);

    return true;
}



GM_registerMenuCommand("Y! Search " + document.location.host.replace(/www\./i, ""), ysseShowMask);
document.addEventListener("keypress", ysseKeypress, true);

