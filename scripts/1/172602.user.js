// ==UserScript==
// @name       C# Unity Docs Default Language Enhancer, or CUDDLE for short
// @version    1.0
// @description  Sets C# as the default language of the Unity docs code examples
// @include      *://docs.unity3d.com/Documentation/ScriptReference/*
// @copyright  2013, Alexander Cobleigh
// ==/UserScript==

function main() {
        window.addEventListener("load", function() {
        var listItem = document.evaluate("//*[text()='C#']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
        listItem.singleNodeValue.click();
    }, false);
}


main();
