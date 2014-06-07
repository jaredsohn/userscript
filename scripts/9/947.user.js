// ==UserScript==
// @name          Remove IMDB ad column
// @namespace     http://geocities.com/miroac/javascript/greasemonkey
// @description	  Remove the "ad column" from the right hand side of imdb.com
//                  entries.
// @include       http://imdb.com/*/*
// @include       http://www.imdb.com/*/*
// ==/UserScript==

/******************************************************************************
 * 1) finds the right TR
 * 2) removes the last TD from the TR, which is the column with the ads in it
 */

(function()
{
    try
    {
        var tr = document.evaluate("//TR[TD/@class='lhscol'][1]/TD[last()]//TR[1]",
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
