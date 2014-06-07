// ==UserScript==
// @name       COPY COPY
// @namespace  http://agedjus.com
// @version    0.1
// @include     https://twitter.com/*
// @include     http://twitter.com/*
// @copyright  2013+, You
// ==/UserScript==

function clipboardCopy(txt) { 
    if (window.clipboardData) { 
        window.clipboardData.clearData(); 
        window.clipboardData.setData("Text", txt); 
    } 
    else if (window.netscape) { 
        try { 
            netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect"); 
        } 
        catch (e) { 
            alert("Un script no puede Cortar / Copiar / Pegar automáticamente por razones de seguridad.\n"+ 
                  "Para hacerlo necesitas activar 'signed.applets.codebase_principal_support' en about:config'"); 
            return false; 
        } 
        var clip = Components.classes['@mozilla.org/widget/clipboard;1'].createInstance(Components.interfaces.nsIClipboard); 
        if (!clip) 
            return; 
        var trans = Components.classes['@mozilla.org/widget/transferable;1'].createInstance(Components.interfaces.nsITransferable); 
        if (!trans) 
            return; 
        trans.addDataFlavor('text/unicode'); 
        var str = new Object(); 
        var len = new Object(); 
        var str = Components.classes['@mozilla.org/supports-tring;1'].createInstance(Components.interfaces.nsISupportsString); 
        var copytext = txt; 
        str.data = copytext; 
        trans.setTransferData("text/unicode",str,copytext.length*2); 
        var clipid = Components.interfaces.nsIClipboard; 
        if (!clip) 
            return false; 
        clip.setData(trans,null,clipid.kGlobalClipboard); 
    } 
}

var twitt=document.getElementsByClassName('js-tweet-text tweet-text')[0];
clipboardCopy('hola');
clipboardCopy("hola2");