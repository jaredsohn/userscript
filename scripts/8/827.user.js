// ==UserScript==
// @name          del.icio.us undupe
// @namespace     http://roub.net/
// @description   Removes redundant del.icio.us entries from a page -- leaves only the first entry for a given URL
// @include       http://del.icio.us/*
// ==/UserScript==
//
// History: http://roub.net/xul/greasemonkey/delundupe.history.txt
//

function dundupeNodeClass(node)
{
    if (node.getAttribute && node.getAttribute('class'))
    {
        return(node.getAttribute('class'));
    }

    return("");
}

(function() {
    // ORDERED_NODE_SNAPSHOT_TYPE

    var seenLinks = new Array();
    var lns = document.evaluate("//a[@class='delLink']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    for (var i = 0; i < lns.snapshotLength; i++) 
    {
        var ln = lns.snapshotItem(i);

        var parEl = ln.parentNode;
        var child = ln;

        while (parEl && (parEl != child) && (dundupeNodeClass(parEl) != 'post'))
        {
            child = parEl;
            parEl = child.parentNode;
        }

        if (seenLinks[ln.href])
        {
            if (dundupeNodeClass(parEl) == 'post')
            {
                parEl.parentNode.removeChild(parEl);
            }
        }
        else
        {
            seenLinks[ln.href] = 1;
        }
    }
})();
