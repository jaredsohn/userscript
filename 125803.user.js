// ==UserScript==
// @name           Chat Test
// @namespace      http://storm2.servequake.com/
// @description    Change CSS
// @include        http://storm2.servequake.com/*
// ==/UserScript==
GM_addStyle((<><![CDATA[
   #maintable #chatbox, body {
   font-family: Verdana; !important; 
   font-size: 17px; !important;
}
]]></>).toString());