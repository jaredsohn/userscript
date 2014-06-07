// ==UserScript==
// @name           WebCT Marking
// @namespace      dana
// @description    An extension to help with marking in WebCT. This extension moves focus to the "New Value" field for entering a student's mark, saving you some mouse clicks and time. This is used when you click on a student's grade in the Grade Book area of WebCT.
// @include        http://*/webct/*/membergradebookEditMemberAttributeValueView.dowebct?*
// ==/UserScript==

function dana_returnObjById( id )
{
    if (document.getElementById)
        var returnVar = document.getElementById(id);
    else if (document.all)
        var returnVar = document.all[id];
    else if (document.layers)
        var returnVar = document.layers[id];
    return returnVar;
}

var i = dana_returnObjById('newvalue');
if (i) {
  i.focus();
}

