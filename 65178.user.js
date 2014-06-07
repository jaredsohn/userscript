// ==UserScript==
// @name           sotzone patch
// @namespace      blank
// @include        http://forum.sotzone.ru/*
// ==/UserScript==
//-----------------------------------------------------------------------------
// FUNCTIONS
//-----------------------------------------------------------------------------
// $id(id)
//-----------------------------------------------------------------------------
function $id(id)
{
  return document.getElementById(id);
}
//-----------------------------------------------------------------------------
// $cls(class)
//-----------------------------------------------------------------------------
function $cls(class)
{
  return document.getElementsByClassName(class);
}
//-----------------------------------------------------------------------------
// $x(xpath, context)
//-----------------------------------------------------------------------------
function $x(xpath, context)
{
  context = context || document.body;
  return document.evaluate(xpath, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
//-----------------------------------------------------------------------------
// $x1(xpath, context)
//-----------------------------------------------------------------------------
function $x1(xpath, context)
{
  var snapshot = $x(xpath, context);
  if( snapshot.snapshotLength > 0 )
  {
    return snapshot.snapshotItem(0);
  }
  else
  {
    return null;
  }
}
//-----------------------------------------------------------------------------
// addStyleSheet(css)
//-----------------------------------------------------------------------------
function addStyleSheet(css)
{
  var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "data:text/css,"+escape(css);
  document.getElementsByTagName("head")[0].appendChild(link);
}
//-----------------------------------------------------------------------------


//-----------------------------------------------------------------------------
// hide advert
//-----------------------------------------------------------------------------
var ban_ids = [];
var ban_classes = ['below_body'];
var exclude_ids = {};

// hide ids
for( var i = 0; i < ban_ids.length; i++ )
{
  var node = $id(ban_ids[i]);
  if( node )
    node.parentNode.removeChild(node);
}

// hide classes
for( var i = 0; i < ban_classes.length; i++ )
{
  var nodes = $cls(ban_classes[i]);
  if( nodes.length )
  {
    var len = nodes.length;
    for( var j = len-1; j >= 0; j-- )
    {
      var id = nodes[j].getAttribute('id');
      if( id && exclude_ids[id] )
        continue;
      nodes[j].parentNode.removeChild(nodes[j]);
    }
  }
}
//-----------------------------------------------------------------------------


//-----------------------------------------------------------------------------
// design fixes
//-----------------------------------------------------------------------------
$cls('textboxcontainer')[0].childNodes[0].childNodes[0].style.marginTop = '3px'
$cls('above_body')[0].childNodes[5].style.height = '45px';
$cls('above_body')[0].childNodes[5].childNodes[1].childNodes[0].style.marginTop = '10px';

var nodes = $cls('after_content');
for( var i = 0; i < nodes.length; i++ )
  nodes[i].style.clear = 'none';
//-----------------------------------------------------------------------------
