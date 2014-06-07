// ==UserScript==
// @name          Remove CNN ad column
// @namespace     http://geocities.com/miroac/javascript/greasemonkey
// @description	  Remove the "ad column" from the right hand side of cnn.com
//                  articles.
// @include       http://www.cnn.com/*
// ==/UserScript==

/******************************************************************************
 * 1) finds the TR with the TD/DIV/@class='cnnStoryContent'
 * 2) removes the last TD from the TR, which is the column with the ads in it
 */

(function()
{
    try
    {
        var tr = document.evaluate("//TR[TD/DIV/@class='cnnStoryContent']",
                document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
                null).snapshotItem(0);
        if (tr)
        {
            tr.deleteCell(tr.cells.length - 1);
        }
    }
    catch (e)
    {
        alert("UserScript exception: " + e);
    }
}
)();
