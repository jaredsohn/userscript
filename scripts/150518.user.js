// ==UserScript==
// @name       SDN Buton Ekleme
// @namespace  http://forum.shiftdelete.net/*
// @version    0.1
// @description  Buton ile Ekle
// @match      http://forum.shiftdelete.net/*
// @copyright  2012+, Selim
// @require    http://code.jquery.com/jquery-latest.js
// ==/UserScript==

// Inserts javascript that will be called by the autoCheckOrderButton


function runScript()
{
    var cevapnode = $(".wysiwyg_block");
    modifyGroup();
    if(checkSignature() == true)
        addSignature();
}

$(document).ready(runScript());

function modifyGroup()
{  
    var sElement = document.createElement('input');
    sElement.type = 'button';
    sElement.value = 'Butonla Ekle';
    sElement.setAttribute('class', 'button');
    sElement.setAttribute('style', 'margin-right:4px');
    sElement.setAttribute('onClick', 'addSignature();');
    
    if($('[id="vB_Editor_001_save"]').length > 0)
        $('[id="vB_Editor_001_save"]').before(sElement);
    else
        $('[id="qr_submit"]').before(sElement);
    
    //sElement.addEventListener("click", "addSignature()", false);
}

function checkSignature()
{
    var storedObject = GM_getValue("SGNSignatureObject");
    if(storedObject == undefined)
    {   
        var signature=prompt("Butona Eklenecek Görev","Buraya Girin");
        if (signature!=null && signature!="")
        {
            GM_setValue("SGNSignatureObject", signature);
            return true;
        }
        else
            return false;
    }
    else
        return true;
    
    /*TODO*/
    return true;
}

function bindSignature()
{
    /*TODO*/
}
//[title="Rich text editor, vB_Editor_QR_editor, press ALT 0 for help."]
function addSignature()
{
    var storedObject = GM_getValue("SGNSignatureObject");
    var scriptElement = document.createElement('script');
    scriptElement.type = 'text/javascript';
    scriptElement.innerHTML =  'function addSignature() { if(vB_Editor.vB_Editor_001 != undefined){ var element = vB_Editor.vB_Editor_001.editor.getData(); vB_Editor.vB_Editor_001.editor.setData(element+"\\n\\n"+"'+storedObject+'");  }else{ var element = vB_Editor.vB_Editor_QR.editor.getData(); vB_Editor.vB_Editor_QR.editor.setData(element+"\\n\\n"+"'+storedObject+'"); }  }';
    unsafeWindow.document.getElementsByTagName("head")[0].appendChild(scriptElement);
}

function askSignature()
{
    
}