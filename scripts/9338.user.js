// ShopWiz Fixer v 0.1
//
// thanks, Platypus!
// 
// What it does do? Well, for now 3 things only:
// 1) Fixes the window title so it'll be easier to find
//    among more than 3 tabs or windows.
// 2) Looks like TNT put in the search form a hidden input,
// 	called feedset and usually set to 0 that would be set
//    by the onload event of GM's icon "status_on.gif" to 1.
//    As this is a chrome:// link, it would always be set to 1
//    just because GM is installed. This is harsh. So I removed
//    it with Platypus. 
// 3) Removes the link to your own Shop Front, for those wanting to keep
//    the Emo Avatar.
//
// ---------------------
// updated it slightly: Neopets' addition of "video" link borked the earlier version.
// ---------------------
//
// I don't give any guarantees that point 2 will work forever.
// Personally, I've physically moved away both status gifs from
// GM's content folder. It didn't complain about missing images :)
//
// ==UserScript==
// @name            ShopWiz Fixer 0.1
// @description     Removes neopet's js snippet against GM users (hopefully), fixes shop wizard's window title and helps you keep that Emo Usuki avatar
// @namespace       neopets
// @include         http://www.neopets.com/market.phtml*
// @include         http://neopets.com/market.phtml*
// ==/UserScript==


function do_script()
{
	smart_remove(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/TABLE[1]/TBODY[1]/TR[1]/TD[2]/CENTER[1]/A[6]/B[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,null,null,null);

	if (document.location.href.match('market.phtml') && document.location.href.match('type=wizard'))
	{
		do_modify_html_it(window.document,document.evaluate('/HTML[1]/BODY[1]/DIV[1]/DIV[3]/TABLE[1]/TBODY[1]/TR[1]/TD[2]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue,/img src=\"chrome:\/\/greasemonkey\/content\/status_on\.gif\" onload=\"var a=document\.getElementById\(\'feedset\'\); a\.value=\'1\';\" style=\"display: none;\"/,'!-- yeah, you wish --',null);
		document.title = "Shop Wizard";
	}
};

window.addEventListener("load", function() {do_script()}, false);

function do_modify_html_it(doc, element, match_re, replace_string)
{
	match_re = new RegExp(match_re);
	if (element.innerHTML)
		{element.innerHTML = element.innerHTML.replace(match_re, replace_string);};
};

function smart_remove(doc, node)
{
	if (node.parentNode.childNodes.length == 1)
		{smart_remove(doc, node.parentNode);}
	else {remove_it(doc, node);};
};

function remove_it(doc, node)
{
	if (doc == null || node == null) return;
	if (!node.parentNode) return;
	node.style.display = "none";
	doc.last_removed_node = node;
};
