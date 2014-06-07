// ==UserScript==
// @name        FM Group
// @namespace   tracz.me/fm
// @include     *fmgroup.pl*
// @include     *perfumy.fm*
// @version     1
// ==/UserScript==
var tdElems = document.getElementsByTagName('td');
if ((tdElems[12].textContent == "0")&&(tdElems[5].textContent != "0"))
    {
    if (tdElems[21].textContent != "0")
        var thisElem = tdElems[21];
    }
else
    if (tdElems[5].textContent == "0")
    {
    if(tdElems[13].textContent != "0")
        var thisElem = tdElems[13];
    }
else
    if (tdElems[2].textContent == "0")
    {
    if(tdElems[12].textContent == "0")
        var thisElem = tdElems[12];
    }

thisElem.textContent = thisElem.textContent + "N " + (Math.floor(parseFloat(thisElem.textContent.replace(",",".")) * 123) / 100)+ "B"; // change it

