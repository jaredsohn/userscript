// ==UserScript==
// @name           Asylum From Politics
// @namespace      stanni.us
// @description    Hides "Political Asylum" from the Best of the Boards
// @include        http://boards.fool.com/BestOf.asp*
// ==/UserScript==


(function () {
	var boardsToBlock = [ 'Political Asylum' ];
	var blockQuery = '[contains(.,"' + boardsToBlock.join('") or contains(.,"') + '")]';
	
	var allLinks =
		document.evaluate( 
			'//tr/td' + blockQuery + '/ancestor::tr[1]'
			,document, 
			null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
			null); 

	//GM_log('allLinks count = ' + allLinks.snapshotLength);

	for (var i = 0; i < allLinks.snapshotLength; i++) { 
	  allLinks.snapshotItem(i).style.display="none"; 
	}

})();