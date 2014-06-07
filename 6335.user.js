// ==UserScript==
// @name           Netvibes No Footer
// @namespace      http://www.netvibes.com/
// @description    Removes title div on Netvibes
// @include        *.netvibes.*
// @exclude        
// ==/UserScript==
window.setTimeout("document.getElementById('footer').innerHTML='';",5000)

