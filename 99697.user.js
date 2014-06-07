// ==UserScript==
// @name		Uselessjunk Banner Remover
// @author		Hellsing
// @include		http://*uselessjunk.*/article_full.php*
// ==/UserScript==

var divs = document.getElementsByTagName('div');
 
for( var i = 0; i < divs.length; i++ )
{
    if( divs && divs[0].className && divs[0].className.match('related_wrapper') )
    {
        divs[i].parentNode.removeChild(divs[i]);
    }
}
 
var blocks = document.getElementsByTagName('blockquote');
blocks[0].parentNode.removeChild(blocks[0]);

var tables = document.getElementsByTagName('table');
tables[0].parentNode.removeChild(tables[0]);