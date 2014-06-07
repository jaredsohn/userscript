
// original script : Ain't It Readable
// version 0.6 BETA!
// 2005-05-02
// maximum respect to -->> Copyright (c) 2005, Mark Pilgrim
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Atarnet Fix", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Atarnet Fix
// @namespace     Nadav Kavalerchik
// @description   change style on http://www.atarnet.net/
// @include       http://www.atarnet.net/*
// ==/UserScript==

// 2007-02-28
// i used http://diveintomark.org/projects/greasemonkey/
// for scripting ideas

function getNodeByTagAndAttribute(tag, attrName, attrValue, nodeToSearch)
{
	var node = document.evaluate("//" + tag + "[@" + attrName + "='" + attrValue + "']", 
		nodeToSearch == null ? document : nodeToSearch, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );

	return node.singleNodeValue;
}

function newchange(event) {
    var target = event ? event.target : this;

    // do anything you like here
    //alert('Combo Change on ' + target.options[target.selectedIndex].value);
    var idPage = target.options[target.selectedIndex].value;
    //alert(idPage.substring(0,idPage.length-4));
    var jumpToo = idPage.substring(0,idPage.length-4);
	if (target.id=="ComboMenu_1933" || target.id=="ComboMenu_2692" || target.id=="ComboMenu_1257")
	{
	//alert('url= ' + jumpToo);
	window.location = "http://www.atarnet.net/nodeweb.asp?t=25585&subid=" + jumpToo;
	}
	if (target.id=="ComboMenu_1257")
	{
	//alert('url= ' + jumpToo);
	window.location = "http://www.atarnet.net/nodeweb.asp?t=19546&subid=" + jumpToo;
	}
	if (target.id=="ComboMenu_1950" || target.id=="ComboMenu_1880")
	{
	//alert('url= ' + jumpToo);
	window.location = jumpToo;
	}
    //alert('Combo Change on ' + target.id);
    // call real submit function
    ////this._change();
}

// capture the onclick event on all forms
window.addEventListener('change', newchange, true);

// If a script calls someForm.submit(), the onsubmit event does not fire,
// so we need to redefine the submit method of the HTMLFormElement class.
////HTMLFormElement.prototype._change = HTMLFormElement.prototype.change;
HTMLFormElement.prototype.change = newchange;

