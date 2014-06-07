// ==UserScript==
// @name         removecontent
// @description remove content from web
// @include       http://www.cngba.com/forum-122-1.html
// ==/UserScript==

function removeContent(id)
{
    var node = document.getElementById(id);
    if (node)
    {
       node.parentNode.RemoveChild(node);
       node = null:
    }
}

removeContent (
    'iframe_shop'
);


removeContent (
    'cgnav'
);