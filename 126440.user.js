// ==UserScript==
// @name          Delicious Redirect Link Cleanup
// @description   Strips redirect links from Delicious.com
// @include       http://www.delicious.com/*
// @include       https://www.delicious.com/*
// @include       http://delicious.com/*
// @include       https://delicious.com/*
// @include       https://avosapi.delicious.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// @grant         none
// ==/UserScript==

(function()
{
    var linkPatterns =
    [
        /^(?:http(?:s)?:\/\/avosapi\.delicious\.com)?\/api\/v1\/posts\/redirect\?url=([^&]*)$/
    ];
    var strippedEvents = [ "onclick", "onmousedown", "onmouseup", "onkeypress", "onkeydown", "onkeyup" ];

    function processNode(node)
    {
        if (node.nodeType != 1 || node.hasAttribute("linkChecked"))
            return;

        if (node.tagName.toLowerCase() == "a")
            processLink(node);

        $("a", node).each(function() { processLink(this); });

        node.setAttribute("linkChecked", "yes");
    }

    function processLink(node)
    {
        var url = node.href, cleanUrl = null;

        var matches;
        for (var i in linkPatterns)
            if (matches = linkPatterns[i].exec(url))
                break;

        if (matches)
        {
            cleanUrl = decodeURIComponent(matches[1]);
            node.href = cleanUrl;
        }
        else if (!/\s(rwt|clk)\s*\(/.test(node.onmousedown))
            return;

        for (var i in strippedEvents)
            node[strippedEvents[i]] = null;
    }

    function deploy()
    {
        document.addEventListener("DOMNodeInserted", function(e)
        {
            processNode(e.target);
        }, false);

        $(function()
        {
            processNode(document.body);
        });
    }

    deploy();
})();