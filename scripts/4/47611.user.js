// Message Reply Copier
// version 0.5
// 2008.01.16
// Copyright (c) 2008, Stinky Pete
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
// @description    This script copies the contents of the previous message into the current message box, created specifically for phasmatis
// @include        http://www.deadawaken.com/game.php?sec=home&scr=readmsg&listId=*
// ==/UserScript==

var messageNode, messageContent, replyNode, printBreak, j;

messageNode = document.evaluate( "//tr[@class='gen']/td[@class='td_700 gen']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null ).snapshotItem(0);
messageContent = messageNode.childNodes;
replyNode = document.getElementsByTagName( 'textarea' ).item(0);
printBreak = false;

for( j = messageContent.length; j > 0; j-- )
{
	var tmpNode = messageContent.item(j-1);
	if( tmpNode.nodeType == 3 && tmpNode.nodeValue.indexOf( '--------' ) != -1 )
		break;
}

replyNode.appendChild( document.createTextNode( 'QUOTE:\n\n\'' ) );

for( var i = j; i < messageContent.length; i++ )
{
	var tmpNode = messageContent.item(i);
	// Text Node
	if( tmpNode.nodeType == 3 )
	{
		if( tmpNode.nodeValue.replace(/^\s*|\s*$/g, '').length > 0 )
		{
			printBreak = true;
			replyNode.appendChild( document.createTextNode( tmpNode.nodeValue.replace(/\n/g, '') ) );
		}
	}
	// BR Element
	else if( printBreak )
	{
		replyNode.appendChild( document.createTextNode( '\n' ) );
	}
}

replyNode.appendChild( document.createTextNode('\'\n\n------------------------------------------------\n\n') );
replyNode.scrollTop = replyNode.scrollHeight;