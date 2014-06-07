// ==UserScript==
// @name           Accept Community Members Automatically
// @namespace      ARPIT
// @description    Accept Community Members Automatically .... Written By Arpit
// @include        http://www.orkut.co.in/Main#CommMembers.aspx?cmm=*&tab=4
// ==/UserScript==

/********************************************************
// Enjoy! :D and dont forget to say thanks
*********************************************************/


function go()
{
window.location = "javascript:parent.orkutFrame._submitForm(parent.orkutFrame.document.forms[2], 'acceptPending', '');";
}

setInterval(go,2500);

// End