// ==UserScript==
// @name           MLPArena Ignore Forum
// @namespace      http://mlparena.com/mlp/index.php/topic,295599.0.html
// @description    Hides some subforums from the Recent Unread Topis page on MLPArena forums. Can be edited to hide the specific forums you prefer.
// @include        http://mlparena.com/mlp/index.php?action=unread*
// ==/UserScript==

// note: I'm hiding the these 5 forums from the Recent Unread Topis:
// 21=What's Your Problem, 14=Introductions, 81=The Dollhouse, 173=Monster High Sales & Trades, 151=Littlest Pet Shop
// You can edit the entries below to remove whatever forums you don't want to see.

var rows = document.evaluate(
'//tr/td/div/p/em/a[@href="http://mlparena.com/mlp/index.php/board,21.0.html" or @href="http://mlparena.com/mlp/index.php/board,14.0.html" or @href="http://mlparena.com/mlp/index.php/board,81.0.html" or @href="http://mlparena.com/mlp/index.php/board,173.0.html" or @href="http://mlparena.com/mlp/index.php/board,151.0.html"]',
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null)
for (i = 0; i < rows.snapshotLength; i++) {
foo = rows.snapshotItem(i).parentNode.parentNode.parentNode.parentNode.parentNode
foo.parentNode.removeChild(foo)
}
