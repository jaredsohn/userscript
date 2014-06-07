// ==UserScript==
// @name        Remove MAC OS X software form 0sec.org
// @namespace   removeMACOSX
// @include     http://0sec.org/software*
// @version     1
// @grant       none
// ==/UserScript==
function remove() 
{
    var links = document.links;
   
    for (i = 0; i < links.length; i++) 
    {
        if (links[i].href.indexOf('mac') != - 1 && links[i].href.indexOf('os') != - 1) 
        {
            links[i].parentNode.outerHTML = "";
            
            
        }
    }
}
remove();
