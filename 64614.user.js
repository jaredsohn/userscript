// ==UserScript==
// @name           Lazy Bastard AutoQuote
// @namespace      blurg!
// @description    Autmatically adds all the quote
// @include        http://forums.whirlpool.net.au/forum-reply.cfm?r=*
// ==/UserScript==

document.querySelector('#body').value="@" + 
document.querySelector('#respondingid').value + " " + 
document.querySelector('#respondingto').value + " writes...\n" + 
document.querySelector('#reply_tr1').textContent.replace(/^\s+|\s+$/g, "").replace(/\s*$/,'').replace(/^\s*/, '').replace(/^(.+)$/mg, "[\"$1\"]\n\r");
unsafeWindow.doPreview();
document.querySelector('#body').focus();