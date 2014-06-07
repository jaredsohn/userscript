// ==UserScript==
// @name        TW@FCB Search Filter v1.0
// @namespace   TW@FCB
// @description    Filter the search result for TW@FCB forum
// @include        http://twfcb.com/bbs/search.php?*
// ==/UserScript==
(function() {
    var ContentFilter =
    {
        filterTable: function(className, filterExp){
            var allForumTds = document.evaluate( "//td[@class='" + className + "']", document, null,
                                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            if(allForumTds.snapshotLength == 0) return;
            for(var i = allForumTds.snapshotLength - 1 ; i >=0 ; i--){
	            var theForumTd = allForumTds.snapshotItem(i);
	            var theArs = theForumTd.getElementsByTagName('a');
	            if(theArs.length == 0) return;
	            var theAr = theArs[0];
	            if(theAr.href.match(filterExp)){      
					var theTr = theForumTd.parentNode;
					var theTBody = (theTr)?theTr.parentNode:null;
					if(!theTr || !theTBody) continue;
	              	theTBody.parentNode.removeChild(theTBody);
	            }   
	        }    
        },
    }        
    //^[1]$|^[3]$|^[4]$|^[6]$|^[1]0$
    ContentFilter.filterTable('forum', /(fid\=(97|99|75|107|104|230|202|98|148|149|150|117|105|106|100)+)+/);
})();