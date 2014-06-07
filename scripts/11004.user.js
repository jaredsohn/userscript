// Message Reply Copier
// version 0.3
// 2007.08.08
// Copyright (c) 2007, Stinky Pete
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Message Reply Copier
// @namespace      http://www.deadawaken.com
// @description    This script cycles through the list _existing_ hitmen and removes them from the drop-down box.
// @include        http://www.deadawaken.com/game.php?sec=home&scr=readmsg&listId=*
// ==/UserScript==

var messageNode, messageContent, replyNode, printBreak;

messageNode = document.evaluate( "//tr[@class='gen']/td[@class='td_700 gen']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);
messageContent = messageNode.childNodes;
replyNode = document.getElementsByTagName( 'textarea' ).item(0);
printBreak = false;

for( var i = 0; i < messageContent.length; i++ )
{
	var tmpNode = messageContent.item(i);
	// Text Node
	if( tmpNode.nodeType == 3 )
	{
		if( tmpNode.nodeValue.indexOf( '>>' ) == -1 && tmpNode.nodeValue.replace(/^\s*|\s*$/g, '').length > 0 )
		{
			printBreak = true;
			replyNode.appendChild( document.createTextNode('>> ') );
			replyNode.appendChild( document.createTextNode( tmpNode.nodeValue.replace(/\n/g, '') ) );
		}
	}
	// BR Element
	else if( printBreak )
	{
		replyNode.appendChild( document.createTextNode( '\n' ) );
	}
}

replyNode.appendChild( document.createTextNode('\n\n') );
replyNode.scrollTop = replyNode.scrollHeight;