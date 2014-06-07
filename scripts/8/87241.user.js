// ==UserScript==
// @name           No spoilers on my 420chan
// @description    Removes spoilers from 420chan
// @include http://boards.420chan.org/*
// ==/UserScript==

function visitElements(element, visitorFunction)
{
    var children = element.childNodes;
    var childrenLength = children.length;
    for(var i = 0; i < childrenLength; i++)
    {
        var child = children[i];
        visitorFunction(child);
        visitElements(child, visitorFunction);
    }
}

function elementVisitor(el)
{
    if (el.className && el.className.indexOf("spoiler") != -1)
    {
        // GM_log("unspoiling: " + el);
        el.className = "";
    }
}

function unspoil()
{
    // GM_log("unspoil loading");
    visitElements(document.getElementById("midzone"), elementVisitor);
}

unspoil();