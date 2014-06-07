// ==UserScript==
// @name          Disable Google Page Preview
// @description   Disables the page preview feature in Google search results.
// @include       http://www.google.tld/*
// @include       https://www.google.tld/*
// @include       https://encrypted.google.tld/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js
// ==/UserScript==

(function()
{
    var resultElem = "div.vsc";
    var previewClass = "vsc";
    var previewButton = ".vspib";
    var previewElem = "div.vspi";

    function processNode(node)
    {
        if (node.nodeType != 1 || node.hasAttribute("previewHandled"))
            return;

        node.setAttribute("previewHandled", "yes");

        $(resultElem, node).each(function()
        {
            $(this).removeClass(previewClass);
            $(previewButton, this).remove();
            $(previewElem, this).remove();
        });
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
