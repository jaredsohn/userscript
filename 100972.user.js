// ==UserScript==
// @name           About Forum Unicode Fix
// @namespace      http://userscripts.org/users/320236
// @description    This script preserves unicode characters when posting on About.com forums. (11/4/2011)
// @include        http://forums.about.com/n/pfx/forum.aspx?*nav=post*
// @include        http://forums.about.com/n/pfx/forum.aspx?*nav=edit*
// ==/UserScript==
//
// Author: Matthai Nazrani
//
//

function Fix()
{
   var headID = document.getElementsByTagName("head")[0];
   var newScript = document.createElement('script');
   newScript.type = 'text/javascript';
   newScript.text =
    "function TextFixUni(txt){var txtRes=''; for(var i=0; i<txt.length; i++) if(txt.charCodeAt(i)>127) txtRes+= '&#' + txt.charCodeAt(i) + ';';else txtRes+= txt.charAt(i); return txtRes;}"
    +"function FTB_CopyHtmlToHidden(ftbName){if (!FTB_Initialized(ftbName)) return;hiddenHtml = FTB_GetHiddenField(ftbName);editor = FTB_GetIFrame(ftbName);"
    +"if (isIE) {if (FTB_IsHtmlMode(ftbName)) {hiddenHtml.value = editor.document.body.innerText;} else {hiddenHtml.value = editor.document.body.innerHTML;}"
    +"} else {if (FTB_IsHtmlMode(ftbName)) {editorContent = editor.document.body.ownerDocument.createRange();editorContent.selectNodeContents(editor.document.body);"
    +"hiddenHtml.value = editorContent.toString();} else {hiddenHtml.value = editor.document.body.innerHTML;}}"
    +"if (hiddenHtml.value == '<P>&nbsp;</P>' || hiddenHtml.value == '<br>') {hiddenHtml.value = '';}"
    + "hiddenHtml.value=TextFixUni(hiddenHtml.value);}"
   headID.appendChild(newScript);
}

Fix();

