// ==UserScript==
// @name          itü sözlük duyurular sayici
// @description   sayar
// @include       http://www.itusozluk.com/*

// ==/UserScript==

function replaceContentInContainer(matchClass,content)
{
    var elems = document.getElementsByTagName('*'), i;
    for (i in elems)
    {
        if((" " + elems[i].className + " ").indexOf(" " + matchClass + " ") > -1)
        {
            elems[i].innerHTML = content;
        }
    }
}



replaceContentInContainer("content","asd");