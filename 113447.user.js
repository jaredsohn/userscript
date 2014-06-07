// ==UserScript==
// @name           habrahabr.ru hidden blogs
// @namespace      http://habrahabr.ru/
// @description    Add habrahabr.ru blog to the array hiddenBlogs in order to hide them.
// @include        http://www.habrahabr.ru/*
// @include        http://habrahabr.ru/*
// ==/UserScript==
//-------------------------------------------------------------------------------------
var hiddenBlogs=["Oracle"]; //add blogs here
//-------------------------------------------------------------------------------------
Array.prototype.binarySearch = function binarySearch(value)
{
    var low = 0;
    var high = this.length - 1;

    while (low <= high)
    {
        var curIndex = parseInt((low + high) / 2, 10);
        var curValue = this[curIndex];

             if (curValue < value)  low  = curIndex + 1;
        else if (curValue > value)  high = curIndex - 1;
        else                        return true;
    }

    return false;
};
//-------------------------------------------------------------------------------------
function getParentNode(child, reTag, reClass, reId)
{
    if (child)
    {
        var parent = child.parentNode;

        if (parent                          &&
            reTag  .test(parent.tagName  )  &&
            reClass.test(parent.className)  &&
            reId   .test(parent.id       ))
                return parent;
    }

    return null;
}
//-------------------------------------------------------------------------------------
function main()
{
    hiddenBlogs.sort();
    var links = document.getElementsByTagName('a');

    for (var i in links)
    {
        var link = links[i];

        if (hiddenBlogs.binarySearch(link.text)         &&
            /\/blogs\/.*$/i.test(link.getAttribute('href')))
        {
            var h2 = getParentNode(link, /^h2$/i, /^entry-title .*$/, /^$/);
            var badChild = getParentNode(h2, /^div$/i, /^hentry .*$/, /^$/);
            var badParent = getParentNode(badChild, /^div$/i, /^$/, /^main-content$/);
				
            if (badParent)
                badChild.style.display = "none";
        }
    }
}
//-------------------------------------------------------------------------------------
main();
//-------------------------------------------------------------------------------------
