// ==UserScript==
// @name       CorrigiEapaga =
// @namespace  http://www.facebook.com/rhandrey
// @description  Tira o sinal "="
// @description  Crédito Isaias Ramos 
// @include     https://*.facebook.com/*
// @include     https://facebook.com/*
// @include     http://*.facebook.com/*
// @include     http://facebook.com/*
// @version     =
// @author      Rhandrey Ricardo
// ==/UserScript==
function att() {

    document.getElementsByName('xhpc_message_text')[0].value = document.getElementsByName('xhpc_message_text')[0].value.replace("@=", "@");
    var xhpc_message_text = document.getElementsByName("xhpc_message_text")[0];
    var xhpc_message = document.getElementsByName('xhpc_message')[0].value;
    var cont = 0;
    if (xhpc_message_text.value == "Diga algo sobre isto...") return 0;

	
        document.getElementsByName('xhpc_message')[0].value = document.getElementsByName('xhpc_message_text')[0].value;
		

}

function att2() {

    document.getElementsByName('message_text')[0].value = document.getElementsByName('message_text')[0].value.replace("@=", "@");
    var xhpc_message_text = document.getElementsByName("message_text")[0];
    var xhpc_message = document.getElementsByName('message')[0].value;
    var cont = 0;
    if (xhpc_message_text.value == "Diga algo sobre isto...") return 0;

	
        document.getElementsByName('message')[0].value =  document.getElementsByName("message_text")[0].value;
		

}

function insertString(src, index, str) {
    return src.substr(0, index) + str + src.substr(index);
}

function CustomReplace(strData, strTextToReplace, strReplaceWith, replaceAt) {
    var index = strData.indexOf(strTextToReplace);
    for (var i = 1; i < replaceAt; i++)
        index = strData.indexOf(strTextToReplace, index + 1);
    if (index >= 0)
        return strData.substr(0, index) + strReplaceWith + strData.substr(index + strTextToReplace.length, strData.length);
    return strData;
}


function corrige() {
    if (document.getElementsByName("xhpc_message_text")[0] !== undefined) {

        var xhpc_message = document.getElementsByName('xhpc_message')[0];
        console.log(xhpc_message);
        xhpc_message.addEventListener("keypress", att, false);
        att();
    }

    if (document.getElementsByName('message')[0] !== undefined) {
        var varDivTexto = document.getElementsByName('message')[0];
        varDivTexto.addEventListener("keypress", att2, false);
        att2();
    }


}
document.addEventListener("mousemove", corrige, true);