// ==UserScript==
// @name           WhereverIMayRoam
// @namespace      StabSoftware
// @description    Hide a user's comments wherever they are encountered (e.g. blogs & forums)
// @include        http://www.getrichslowly.org/blog/*
// @include        http://badmoneyadvice.com/*
// @include        http://thesimpledollar.com/*
// @include        *forum*
// ==/UserScript==


(function () {
	var peopleToBlock = [ 'Rob Bennett', 'RobBennett', 'hocus', 'hocus2004', 'hocus2009' ];
	var blockQuery = '[.="' + peopleToBlock.join('" or .="') + '"]';
	
	var allLinks =
		document.evaluate( 
			'//a' + blockQuery + '/ancestor::li[contains(@id,"comment")]'  //blog posts
			+'|//b[@class="postauthor"]/a' + blockQuery + '/ancestor::tbody[1]'  // phpBB
			+'|//span[@class="name"]/b' + blockQuery + '/ancestor::tr[1]' // vbulletin
			,document, 
			null, 
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
			null); 

	//GM_log('allLinks count = ' + allLinks.snapshotLength);

	for (var i = 0; i < allLinks.snapshotLength; i++) { 
	  allLinks.snapshotItem(i).style.display="none"; 
	}

})();