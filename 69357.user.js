// ==UserScript==
// @name            Wiki Backlinks for Wakka & Wikka 
// @namespace       http://home.comcast.net/~mailerdaemon/
// @description     Add backlinks link to wiki's powered by wakka and wikka.
// @include         *wakka.php?*
// @include         *wikka.php?*
// ==/UserScript==
function $X(_xpath, node){//to search in a frame, you must traverse the .contentDocument property.
    var doc = (node)?(node.ownerDocument || node):(node = document);
    return doc.evaluate(_xpath, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
}

var c = $X("//DIV[@class='header']");
if(c)
	c.appendChild(document.createTextNode(" :: "));
else if(c = $X("//ul[@id='main_menu']"))
	c = c.appendChild(document.createElement("li"));

if(c)
{
	var a = document.createElement("a");
		a.href = location.pathname + location.search.replace(/\?([^&]+&)*?(wakka=[^\/&]+).*/,"?$2") + "/../../actions/backlinks";
		a.appendChild(document.createTextNode(" Backlinks "));
	c.appendChild(a);
}
