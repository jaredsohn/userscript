// ==UserScript==
// @name    fuck Google search result URL redirect
// @version 0.1
// @author  electronixtar
// @match   http://www.google.com/search*
// ==/UserScript==


var a = document.getElementsByTagName('a');
for(var i=0;i<a.length;i++)
{
    if(a[i].className=='l')
    {
        a[i].onmousedown = '';
    }
}