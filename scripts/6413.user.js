// Go To
// version 1.0
// 2006-11-24
// Copyleft (c) 2006, The Laughing Lizard 
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Go To", and click Uninstall.
//
// To use the script, simply specify a search string as a "GoTo" anchor
// in the following (case-insensitive) syntax:
// [URL]#GoTo=[escaped search string]
//
// To create escaped GoTo links easily, try the following:
// [URL]#MakeGoTo
//
// Note that greasemonkey springs into action only when a new page is
// loaded, so adding a GoTo to the address bar of a page you are already
// viewing will not work until you refresh your page.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Go To
// @description   Automatically scrolls the page down to a search string defined in the URL
// @include       *
// ==/UserScript==
//
// --------------------------------------------------------------------

// Searches for a text node that contains the target text.
// Returns an array containing the full text of the node,
// the matched string, and the containing node.
function getFirstAppNode(target)
{
    textnodes = document.evaluate
    (
        "//text()",
        document,
        null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
        null
    );

    re = new RegExp(target, "i");

    for(var i = 0; i < textnodes.snapshotLength; i++)
    {
        node = textnodes.snapshotItem(i);
        fullText = node.data;

        if(match = re.exec(fullText))
        {
            return [fullText, match[0], node.parentNode];
        }
    }
    return false;
}

// Adds an anchor around target text, if it is found
function setAnchor(target, anchorName)
{
    if(d = getFirstAppNode(target))
    {
        origString = d[0];
        match = d[1];
        subsString = origString.replace(match, "<A name='" + anchorName + "' title='GoTo Marker' style='background-color:yellow; color:black' >" + match + "</A>");
        pNode = d[2];
        s = pNode.innerHTML;
        s = s.replace(origString, subsString);
        pNode.innerHTML = s;
        return true;
    }
    return false;
}

savedLocation = "" + document.location.href;
curLocation = savedLocation.split("#");
if(curLocation.length == 2)
{
    if(curLocation[1].toLowerCase().substr(0, 8) == "makegoto")
    {
        target = escape(prompt("Type a string to search", ""));
        targetLocation = curLocation[0] + "#GoTo=" + target;

        if(prompt("Copy the link. OK takes you there, cancel does not.", targetLocation) !== null)
        {
            if(setAnchor(unescape(target), "GoTo"))
            {
                // Does the job
                setTimeout("document.location = '" + curLocation[0] + "#GoTo';", 10);

                // For show
                setTimeout("document.location = '" + targetLocation + "';", 20);
            }
            else
            {
                alert("Search string not found! Try copying it from the page source. Refresh to retry");
            }
        }
    }
    else
    {
        curLocation[1] = curLocation[1].split("=");
        if(curLocation[1][0].toLowerCase() == "goto")
        {
            setAnchor(unescape(curLocation[1][1]), "GoTo");

            // Does the job
            setTimeout("document.location = '" + curLocation[0] + "#GoTo';", 10);

            // For show
            setTimeout("document.location = '" + savedLocation + "';", 20);
        }
    }
}
