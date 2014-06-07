// ==UserScript==
// @name vBulletin Forum Filter
// @namespace http://userscripts.org/users/536753
// @description vBulletin: Hides selected forums from search results - Modify from http://userscripts.org/scripts/show/180821
// @include */search.php?searchid=*
// @include */search.php?&searchid=*
// @include */forumdisplay.php*
// @include */forum.php*
// @include */forum/search*
// @include */forum/threads/*
// @include */showthread.php*
// ==/UserScript==

(function() {
  
    // EDIT FORUM_HIDE_LIST BELOW!
    // as long as the list has the forum names in full to be matched on
    // we can filter a number of them
 	var FORUM_HIDE_LIST = "Politics and Religion"

	this.hideforumposts = function(xpathRow, xpathForum, filterForum) {
		var i, j;
		
		// get the matching li elements which contain each search result row
		var rows = document.evaluate(xpathRow, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		for(i = 0; i < rows.snapshotLength; i++) {
			var row = rows.snapshotItem(i);			
			
			// for each row we need to interogate the forum it is from
			links = document.evaluate(xpathForum, row, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
			
			for(j = 0; j < links.snapshotLength; j++) {
                var link = links.snapshotItem(j);
    			
    			// if the forum for this row matches we need to hide it!
				if (filterForum.indexOf(link.textContent.trim()) != -1) {
                    console.log("2nd loop matched:"+row.id+":"+link.textContent);
                    row.style.display = 'none';
				}			
			}

		}
	}
	
	this.hideforumposts("/html/body/div[2]/div[2]/div[4]/div/ol/li","div/div[@class='threadpostedin td alt']/p/a",FORUM_HIDE_LIST);
	
}).call(this);