// ==UserScript==
// @name           Triburile text to smiley
// @description    inlocuieste textul cu imagini (yahoo smiley) 
// @require        http://userscripts.org/scripts/source/96820.user.js
// @include        http://ro*.triburile.ro/game.php?*&screen=mail&mode=view&view=*
// @include        http://ro*.triburile.ro/forum.php?screen=view_thread&thread_id*
// @exclude        http://ro*.triburile.ro/forum.php?screen=view_thread&thread_id=*&answer=true&quote_id=*
// @exclude        http://ro*.triburile.ro/forum.php?screen=view_thread&thread_id=*&edit_post_id*
// ==/UserScript==


window=unsafeWindow;
document=window.document;

replaceElement(document, yemo);

function listen(evt)
{
	var node = evt.target;
	if (node.nodeType == document.ELEMENT_NODE) 
		replaceElement(node, yemo);
	
	if (node.nodeType == document.TEXT_NODE) {
		var parent = node.parentNode;
		var span = replaceTextNode(node, yemo);
		if (span) 
			parent.replaceChild(span, node);
	}
}		

document.body.addEventListener('DOMNodeInserted', listen, true);