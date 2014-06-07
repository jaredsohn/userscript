// ==UserScript==
// @name           TS-FutaEraser
// @namespace      http://tsadult.s7.x-beat.com/
// @include        http://tsadult.s7.x-beat.com/*
// ==/UserScript==


nodes = document.evaluate( '/html/body/form/font[contains(*//@href,"mailto:\u3075\u305F\u7D75")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

for ( var i = 0; i < nodes.snapshotLength; ++i ){
  var node = nodes.snapshotItem( i );
  hideBlock( node );
};

nodes = document.evaluate( '/html/body/form/table[contains(*//@href,"mailto:\u3075\u305F\u7D75")]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

for ( var i = 0; i < nodes.snapshotLength; ++i ){
  var node = nodes.snapshotItem( i );
  hideBlock( node );
};

function hideBlock( node ) {
  if ( node != null && node.style.display == "none" )  return( false );
  var currentNode;
  currentNode = node;
  while ( currentNode != null && currentNode.tagName != "HR" ) {
    try {
      currentNode.style.display = "none";
      document.last_removed_node = currentNode;
    } catch ( e ) {
    };
    currentNode = currentNode.previousSibling;
  };

  currentNode = node.nextSibling;
  while ( currentNode != null && currentNode.tagName != "HR" ) {
    try {
      currentNode.style.display = "none";
      document.last_removed_node = currentNode;
    } catch( e ) {
    };
    currentNode = currentNode.nextSibling;
  };

  return ( true );
};
