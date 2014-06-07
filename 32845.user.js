// ==UserScript==
// @name           HARDWiRED - Javított kurzorkezelés
// @description    A HARDWiRED-en kommentelésnél, szövegformázás (félkövér, dőlt, stb.) után a kurzor nem ugrik a szöveg legvégére, hanem megtartja a pozícióját. Készítette Végvári "TnS" Miklós.
// @namespace      http://greasemonkey.mozdev.com
// @include        http://hardwired.hu/*
// @include        http://www.hardwired.hu/*
// ==/UserScript==

(function()
{

// How to Override a Global JS Function from a .js File Using Greasemonkey
// http://groups.google.com/group/greasemonkey-users/browse_frm/thread/9b6c33e3e3cf5bbd
unsafeWindow.settag = function settag(objname, strPrepend, strAppend)
{
    var obj = unsafeWindow.document.getElementById(objname);
    if ( obj.selectionStart || obj.selectionStart == '0' )
    {
        var sPos  = obj.selectionStart;
        var ePos  = obj.selectionEnd;
        var seltext = obj.value.substring(sPos, ePos);

        obj.value = obj.value.substring(0, sPos) + strPrepend + seltext + strAppend + obj.value.substring(ePos, obj.value.length);
        obj.selectionStart = obj.selectionEnd = ePos + strPrepend.length + strAppend.length;
    }
    else
    {
        obj.value += strPrepend + strAppend;
    }
}

})();