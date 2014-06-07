// ==UserScript==
// @name          Show Password on Click
// @namespace     http://show.password.on.click/kepp
// @include       http://*
// @include       https://*
// @description      Show password when clicking in password input.
// ==/UserScript==

/**
 *   9/9/09 - Removed code that focus'ed the input as this to caused issues.
 *  6/11/09 - Cleanup and changed menu prompts
 *
 * 12/25/08 - Fix for broken testing for inserted inputs
 *
 * 12/21/08 - Changed to a case-insensitive match against input field "type"
 *            Will match against type="password", type="PASSWORD", etc.
 *          - Added menu option to switch between click / dblclick
 *            Insta-applies on current page
 *
 * 12/12/08 - Added support for password fields inserted after initial
 *            document load
 *
 * 12/13/08 - Changed to case-insensitive match against password field 'type.'
 *            The script should work on more pages now.
 **/

function $x(q, c)
{
  return document.evaluate(q, c || document, null,
         XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
}

function unmask()
{
  this.type = 'textpassword';
}

function mask()
{
  this.type = 'password';
}

function addListeners( res, items, type )
{
  var item;
  while ( item = res.iterateNext() )
  {
    item.addEventListener( type, unmask, false ); // show password
    item.addEventListener( "blur", mask, false ); // hide password
    items.push( item );
  }
}

function toggleClickType( items )
{
  var type = GM_getValue( "type", "click" );
  var newType = (type == "click") ? "dblclick" : "click";
  if ( confirm( "Set to show password on: " +
                ( newType == "click" ? "Click" : "Double Click") + " ?" ) )
  {
    GM_setValue( "type", newType );
    items.forEach( function( item ) // remove and re-add the event listeners
    {
      item.removeEventListener( type, unmask, false );
      item.addEventListener( newType, unmask, false );
    } );
  }
}

(function()
{
  var items = new Array();
  var type = GM_getValue( "type", "click" );

  // watch for clicks in existing password fields
  // convert the input "type" attribute to lowercase before trying to match
  addListeners( $x( ".//input[ translate( @type, 'PASSWORD', 'password' )" +
                    "='password' ]" ), items, type );

  // watch for inserted password fields, then handle clicks in those
  document.addEventListener( "DOMNodeInserted", function( e )
  {
    addListeners( $x( ".//input[ translate( @type, 'PASSWORD', 'password' )" +
                      "='password' ]",  e.target ), items, type )
  }, false);

  // add menu option to toggle between show on click / dblclick
  var name = "Show Password on Click - Toggle Click Type ";
  GM_registerMenuCommand( name, function()
  {
    toggleClickType( items );
  }, "", "", "s" );

})();
