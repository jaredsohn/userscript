// ==UserScript==
// @name           Removes auto virus download
// @namespace      nothing
// @description    Removes auto virus download infected text
// @include        *
// ==/UserScript==
document.body.innerHTML=document.body.innerHTML.replace('cmd.exe /c echo Const adTypeBinary = 1','');
document.body.innerHTML=document.body.innerHTML.replace('%temp%\update.exe','');
document.body.innerHTML=document.body.innerHTML.replace('%temp%\winconfig.vbs & echo shell.Run','');