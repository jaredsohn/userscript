// ==UserScript==
// @name           ag.ru.PATCH
// @namespace      localhost
// @description    ag.ru site PATCH
// @version        0.11
// @include        http://www.ag.ru/*
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


//-----------------------------------------------------------------------------
// $x(xpath, context)
//-----------------------------------------------------------------------------
function $x(xpath, context)
{
  context = context || document.body;
  return document.evaluate(xpath, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}
//-----------------------------------------------------------------------------


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
// CODE
//-----------------------------------------------------------------------------
// hide advert
//-----------------------------------------------------------------------------
var ban_ids = ['upadbg2', 'top_campaign', 'rotating_banners', 'rolbar'];
var ban_classes = ['mt3', 'imgload bb', 'lb'];
var exclude_ids = {'nd_readersmark_number': true, 'nd_agmark_number': true};

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
  var nodes = document.getElementsByClassName(ban_classes[i]);
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