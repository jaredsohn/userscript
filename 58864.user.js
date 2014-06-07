// ==UserScript==
// @name          The New Guy’s anti-god script
// @namespace     http://basilmarket.com/allmods
// @description   Hides any thread with the word ‘God’ in it
// @version	   0.1

// @include       *basilmarket*

// ==/UserScript==

// Any thread with these tags will be hidden.
var hideTags = new Array(
    "God",
    "god",
    "religion",
);

function hideParentTR(node)
{
    while (node)
    {
        if (node.tagName == "TR")
        {
            node.style.display = 'none';
            break;
        }
        node = node.parentNode;
    }
}

var imgs = document.evaluate('//img[@src="images/misc/tag.png"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < imgs.snapshotLength; i++)
{
    var img = imgs.snapshotItem(i);
    var text = img.alt.toLowerCase();
    for (var j = 0; j < hideTags.length; j++)
    {
        if (text.indexOf(hideTags[j]) != -1)
        {
            hideParentTR(img);
            break;
        }
    }
} 
