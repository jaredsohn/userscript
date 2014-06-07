// ==UserScript==
// @name       Jethro Tull > Chuck Norris
// @namespace  http://ferret.withaspork
// @version    0.1
// @description  Replaces "Chuck Norris" with "Jethro Tull" on the interwebs
// @match      *://*/*
// @copyright  2012+, Me
// ==/UserScript==
function htmlreplace(a, b, element)
{    
    if (!element) element = document.body;    
    var nodes = element.childNodes;
    for (var n=0; n<nodes.length; n++)
    {
        if (nodes[n].nodeType == Node.TEXT_NODE)
        {
            var r = new RegExp(a, 'gi');
            nodes[n].textContent = nodes[n].textContent.replace(r, b);
        }
        else
        {
            htmlreplace(a, b, nodes[n]);
        }
    }
}
htmlreplace('Chuck', 'Jethro');
htmlreplace('Norris', 'Tull');