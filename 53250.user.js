// ==UserScript==
// @name           CBL Evidence Opener
// @namespace      http://thecaconline.net/cbl/memberlist.php?mode=viewprofile&u=1899
// @description    Clicking on "Exhibit A" for any report attempts to open all exhibits in new tabs
// @include        http://thecaconline.net/cbl/cbl.php*
// ==/UserScript==

// Find every Exhibit A link in the document
var evidence_links = document.evaluate(
  "//a[starts-with(text(),'Exhibit A')]",
  document,
  null,
  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
  null);

var exhibit_link;
for( var i = 0; i < evidence_links.snapshotLength; i++ ) {
  exhibit_link = evidence_links.snapshotItem( i );

	// CBL evidence rows don't have a unique ID, so we need to give them one.
	// This will give the XPath something to 'latch onto'.
	exhibit_link.parentNode.parentNode.id = 'cbl_evidence_row_' + i.toString();

	exhibit_link.addEventListener( "click", 
		function( event ) {
			var row_id = event.target.parentNode.parentNode.id;

			// Find only those links that are within rows with the corresponding id
			var row_links = document.evaluate(
				"id('" + row_id + "')/td/a[starts-with(text(),'Exhibit')]",
				document,
				null,
				XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
				null);
			
			// Open each link in a new tab
			for( var j = 0; j < row_links.snapshotLength; j++ ) {
				row_link = row_links.snapshotItem( j );
				GM_openInTab( row_link.href );
			}
			
			// Suppress the original function of the Exhibit A link
			event.stopPropagation();
			event.preventDefault();
		}, true );
}
