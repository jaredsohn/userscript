//
// (c) 2013 by cms
//

// ==UserScript==
// @name            mods.de - SFT FuSL
// @namespace       userscripts.org/users/cms
// @description     Blendet die Posts von FuSL im SFT aus
// @version         1.0.1
// @grant           none
// @include         http://forum.mods.de/bb/thread.php*
// ==/UserScript==

if (parent.document.title.toLowerCase().indexOf("schöne frauen") != -1)
{

// --- data -----------------

var users = [ "FuSL" ];



// --- functions ------------

function init()
{
    var expr, node1, node2;

    users.forEach(function (user)
    {
        expr = document.evaluate(".//tr[@username='" + escape(user) + "']", document.body, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

        for (var i = 0; item = expr.snapshotItem(i); i++)
        {
            node1 = item.getElementsByTagName("td")[3]; // Zum Anfügen des Links
            node2 = item.getElementsByTagName("td")[4]; // Der Beitrag selbst (der versteckt werden soll)

            node2.style.display = "none";

            makeLink(node1, node2);
        }
    });
}

function makeLink(node, hideNode)
{
    var button;
    
    button = document.createElement("a");
    button.href = "javascript:void(0);";
    button.addEventListener("click", function (event) { toggleDisplay.toggle(hideNode, button); }, false);
    button.appendChild(document.createTextNode(toggleDisplay.text[getStyle(hideNode, "display")]));
    
    node.appendChild(button);
}

function getStyle(el, styleProp)
{
    var y;

	if (el.currentStyle)
    {
		y = el.currentStyle[styleProp];
    }
	else if (window.getComputedStyle)
    {
		y = document.defaultView.getComputedStyle(el,null).getPropertyValue(styleProp);
	}

    return y;
}

var toggleDisplay =
{
    text: {"none": "anzeigen", "table-cell": "verstecken"},
    display: {"none": "table-cell", "table-cell": "none"},
    
    toggle: function(node, callingLink)
    {
        node.style.display = toggleDisplay.display[getStyle(node, "display")];
        callingLink.innerText = toggleDisplay.text[getStyle(node, "display")];
    }
}

init();


}