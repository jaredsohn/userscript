// ==UserScript==
// @name           expert.ru hidden users
// @namespace      http://expert.ru/
// @description    Add expert.ru users to the array hiddenUsers in order to hide their comments.
// @include        http://www.expert.ru/*
// @include        http://expert.ru/*
// ==/UserScript==
//-------------------------------------------------------------------------------------
var hiddenUsers=["Malov", "Petr", "another user"]; //add users here
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
    hiddenUsers.sort();
    var links = document.getElementsByTagName('a');

    for (var i in links)
    {
        var link = links[i];

        if (hiddenUsers.binarySearch(link.text)         &&
            /\/users\/.*$/i.test(link.getAttribute('href')))
        {
            var li = getParentNode(link, /^li$/i, /^$/, /^$/);
            var ul = getParentNode(li, /^ul$/i, /^c-inform$/, /^$/);
            var div = getParentNode(ul, /^div$/i, /^left-side$/, /^$/);
            var badChild = getParentNode(div, /^div$/i, /^comment$/, /^$/);
            var badParent = getParentNode(badChild, /^div$/i, /^all-comments$/, /^$/);

            if (!badParent)
            {
		var h5 = getParentNode(link, /^h5$/i, /^$/, /^$/);
		div = getParentNode(h5, /^div$/i, /^lt-side$/, /^$/);
		badChild = getParentNode(div, /^div$/i, /^forum-topic clearfix$/, /^cmt\d+$/);
                badParent = getParentNode(badChild, /^div$/i, /^forum-container$/, /^$/);
            }
				
            if (badParent)
                badChild.style.display = "none";								
        }
    }
}
//-------------------------------------------------------------------------------------
main();
//-------------------------------------------------------------------------------------
