// ==UserScript==
// @name           Adds additional Google Reader access keys
// @namespace      http://www.lysator.liu.se/~jhs/userscript
// @description    Adds access keys "b" for changing "Sort list by" mode, "x" for toggling "Show read items" and "z" for the "Keep unread" checkbox. (Editing these key bindings is a very simple modification of the script; just reassign the keys in the "keys" map at the top of the script.)
// @include        http://www.google.com/reader*
// @include        https://www.google.com/reader*
// @include        http://reader.google.com/*
// @include        http://google.com/reader*
// ==/UserScript==

var keys = { 'B':'div#order-by',	// order By
	     'X':'div#read-items',	// Sort by
	     'Z':'div.read-state input'	// Keep unread
           };

var key, selector, node, label;
for( key in keys )
{
  selector = keys[key];
  node = getElementsBySelector( selector );
  if( !node.length ) continue;
  node = node[0];
  if( node.nodeName.match( /a/i ) )
    underline( node, key );
  else if( node.nodeName.match( /div/i ) )
  {
    label = node.getElementsByTagName( 'label' ).item( 0 );
    underline( label, key );
  }
}

document.addEventListener( 'keydown', keypress, false );

function getStyle( node, style )
{
  if( node.currentStyle )
    return node.currentStyle[ style ];
  if( window.getComputedStyle )
    return getComputedStyle( node, null )[ style ];
  //.getPropertyValue( style );
  return '';
}

function underline( node, key )
{
  if( !node ) return;
  var character = new RegExp( '(<[^>]*>[^<'+ key +']*)*('+ key +')', 'i' );
  var hasOne = getStyle( node, 'textDecoration' ).match( 'underline' );
  var style = hasOne ? 'border-bottom:1px solid' : 'text-decoration:underline';
  var underlined = '$1<span style="'+ style +';">$2</span>';
  node.innerHTML = node.innerHTML.replace( character, underlined );
  node.title = 'Keyboard shortcut: "'+ key +'"';
}

function keypress( event )
{
  event = event || window.event;
  element = event.target;
  var elementName = element.nodeName.toLowerCase(), typing;
  if( elementName == 'input' ){
    typing = element.type == 'text' || element.type == 'password';
  } else {
    typing = elementName == 'textarea';
  }
  if( typing ) return true;
  var key = String.fromCharCode( event.which || event.keyCode );
  var node = getElementsBySelector( keys[key] ), label;
  if( !node.length ) return;
  node = node[0];
  switch( node.nodeName )
  {
    case 'DIV':
      var choices = node.getElementsByTagName( 'a' ), i, current = 0;
      for( i=1; i<choices.length; i++ )
	if( choices[i].className.match( 'selected' ) )
	  current = i;
      node = choices.item( ++current % choices.length );
      simulateClick( node );
      break;

    default:
      node.focus && node.focus();
      setTimeout( simulateClick, 10, node );
  }
  event.preventDefault && event.preventDefault();
  event.cancelBubble && event.cancelBubble();
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

function getAllChildren( node )
{
  return node.all ? node.all : node.getElementsByTagName( '*' );
}

function getElementsBySelector( selector )
{
  if( !document.getElementsByTagName )
    return [];
  var tokens = selector.split(' ');
  var currentContext = [document];
  for( var i = 0; i < tokens.length; i++ )
  {
    token = tokens[i].replace(/^\s+/,'').replace(/\s+$/,'');;
    if( token.indexOf('#') > -1 )
    {
      var bits = token.split('#');
      var tagName = bits[0];
      var id = bits[1];
      var element = document.getElementById(id);
      if( tagName && element.nodeName.toLowerCase() != tagName )
        return [];
      currentContext = [element];
      continue;
    }
    if( token.indexOf('.') > -1 )
    {
      var bits = token.split('.');
      var tagName = bits[0];
      var className = bits[1];
      if( !tagName )
        tagName = '*';
      var found = [];
      var foundCount = 0;
      for( var h = 0; h < currentContext.length; h++ )
      {
        var elements;
        if( tagName == '*' )
	  elements = getAllChildren(currentContext[h]);
        else
	  elements = currentContext[h].getElementsByTagName(tagName);
        for( var j = 0; j < elements.length; j++ )
          found[foundCount++] = elements[j];
      }
      currentContext = [];
      var currentContextIndex = 0;
      for( var k = 0; k < found.length; k++ )
        if( found[k].className &&
	    found[k].className.match(new RegExp('\\b'+className+'\\b')) )
          currentContext[currentContextIndex++] = found[k];
      continue;
    }
    if( token.match(/^(\w*)\[(\w+)([=~\|\^\$\*]?)=?"?([^\]"]*)"?\]$/) )
    {
      var tagName = RegExp.$1;
      var attrName = RegExp.$2;
      var attrOperator = RegExp.$3;
      var attrValue = RegExp.$4;
      if( !tagName )
        tagName = '*';
      var found = [];
      var foundCount = 0;
      for( var h = 0; h < currentContext.length; h++ )
      {
        var elements;
        if( tagName == '*' )
          elements = getAllChildren(currentContext[h]);
        else
          elements = currentContext[h].getElementsByTagName(tagName);
        for( var j = 0; j < elements.length; j++ )
          found[foundCount++] = elements[j];
      }
      currentContext = [];
      var currentContextIndex = 0;
      var checkFunction;
      switch( attrOperator )
      {
        case '=':
          checkFunction = function(e) { return (e.getAttribute(attrName) == attrValue); };
          break;
        case '~':
          checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('\\b'+attrValue+'\\b'))); };
          break;
        case '|':
          checkFunction = function(e) { return (e.getAttribute(attrName).match(new RegExp('^'+attrValue+'-?'))); };
          break;
        case '^':
          checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) == 0); };
          break;
        case '$':
          checkFunction = function(e) { return (e.getAttribute(attrName).lastIndexOf(attrValue) == e.getAttribute(attrName).length - attrValue.length); };
          break;
        case '*':
          checkFunction = function(e) { return (e.getAttribute(attrName).indexOf(attrValue) > -1); };
          break;
        default:
          checkFunction = function(e) { return e.getAttribute(attrName); };
      }
      currentContext = [];
      var currentContextIndex = 0;
      for( var k = 0; k < found.length; k++ )
        if( checkFunction(found[k]) )
          currentContext[currentContextIndex++] = found[k];
      continue;
    }
    tagName = token;
    var found = [];
    var foundCount = 0;
    for( var h = 0; h < currentContext.length; h++ )
    {
      var elements = currentContext[h].getElementsByTagName(tagName);
      for( var j = 0; j < elements.length; j++ )
        found[foundCount++] = elements[j];
    }
    currentContext = found;
  }
  return currentContext;
}

