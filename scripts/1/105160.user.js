// ==UserScript==
// @name       Cameroid "Fusker"
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @include    http://www.cameroid.com/00001-A1
// @copyright  bowser
// ==/UserScript==

function decToBase36(d, p)
{
    var h = Number(d).toString(36);
    while (h.length < p)
    {
        h = "0" + h;
    }
    return h;
}

function getPics()
{
    var s1 = prompt("Min:","");
    var s2 = prompt("Max:","");   
    
    getPics(s1, s2);
}

function getPics(s1,s2)
{
    var n1 = Number(s1);
    var n2 = Number(s2);
    if(n1 > 0 && n2 > 0 && n1 < n2)
    {
        var f;
        for(i = n1; i < n2; i ++)
        {
            f+= "<img src=/i/" + decToBase36(i,5) + "-A1/5>";
        }
    
        document.getElementById("snapshot").innerHTML = f;
    }
}

window.onload+=getPics();
