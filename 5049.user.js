// ==UserScript==
// @name           Dungeon Master keyboard shortcuts
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Adds Dungeon Master keyboard shortcuts to http://www.brothercake.com/games/underground/underground.html
// @include        http://www.brothercake.com/games/underground/underground.html
// ==/UserScript==

var keys = { 'g'/*KP7*/:'turn-left',
	     'h'/*KP8*/:'move-forward',
	     'i'/*KP9*/:'turn-right',
	     'd'/*KP4*/:'move-left',
	     'a'/*KP1*/:'move-left',
	     'e'/*KP5*/:'move-back',
	     'f'/*KP6*/:'move-right',
	     'c'/*KP3*/:'move-right',
	     'b'/*KP2*/:'turn-around'
           };

document.addEventListener( 'keydown', keypress, false );

function keypress( event )
{
  if( is_typing( event = event || window.event ) )
    return;
  var key = String.fromCharCode( event.which || event.keyCode );
  var node = document.getElementById( keys[key] );
  // GM_log( key+':'+keys[key]+':'+node );
  if( node )
  {
    simulateClick( node );
    event.preventDefault && event.preventDefault();
    event.cancelBubble && event.cancelBubble();
  }
}

function is_typing( event )
{
  var element = event.target, typing;
  var name = element.nodeName.toLowerCase();
  if( name == 'input' )
    typing = { text:true, select:true, password:true }[ element.type ];
  else
    typing = name == 'textarea';
  return typing;
}

function simulateClick( node )
{
  var event = node.ownerDocument.createEvent( 'MouseEvents' );
  event.initMouseEvent( 'click',
			true, // can bubble
			true, // cancellable
			node.ownerDocument.defaultView,
			1, // clicks
			50, 50, // screen coordinates
			50, 50, // client coordinates
			false, false, false, false, // control/alt/shift/meta
			0, // button
			node );
  node.dispatchEvent( event );
}
