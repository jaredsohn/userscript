// ==UserScript==
// @name           Railzilla auto print
// @description    Auto click print eticket
// @include        *
// ==/UserScript==

if((btnSubmit=document.evaluate("//input[@type='button' and @name='Print ERS (English)']",document,null,9,null).singleNodeValue)) btnSubmit.click();