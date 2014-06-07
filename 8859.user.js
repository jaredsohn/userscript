// ==UserScript==
// @name           FDZone Search Filter v2.1
// @namespace      http://userscripts.org/people/26505
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js
// @description    Filter the search result for fdzone forum
// @include        http://pro.tw.fdzone.org/search.php?*
// @include	 http://fastzone.org/forum.php?mod=guide**
// ==/UserScript==

    var ContentFilter =
    {
        filterTable: function(className, filterExp, isSafe){
            	var allForumTds = document.evaluate( "//td[@class='" + className + "']", document, null,
                                    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            	if(allForumTds.snapshotLength == 0) return;
		for(var i = allForumTds.snapshotLength - 1 ; i >=0 ; i--){
			var theForumTd = allForumTds.snapshotItem(i);
			var theArs = theForumTd.getElementsByTagName('a');
			if(!theArs || theArs.length == 0) continue;
			var theAr = theArs[0];
			var theTr = theForumTd.parentNode;
			var theTBody = (theTr)?theTr.parentNode:null;
			if(!theTr || !theTBody || !theTBody.parentNode) continue;
			if(isSafe && theAr.href.match(filterExp)){
				theTBody.parentNode.removeChild(theTBody);
			}
			if(!isSafe && theAr.href.match(/(fid\=[0-9]*)/) && !theAr.href.match(filterExp)){
				theTBody.parentNode.removeChild(theTBody);
			}
	        }    
        },
    }; 
    
$(document).ready(function() {
	var isSafe = GM_getValue("isSafe", true);
	ContentFilter.filterTable('by', 
    		/(fid\=(74|76|282|276|239|257|277|237|256|283|226|238|240|258|71|167|168|73|75|171|182|278|72|77|169|170|181|279|205|271|203)+)+/,
    		isSafe);
	$('div.pg').append('<a id="sssafe">' + (isSafe?'OO':'XX') + '</a>');
	$('a#sssafe').bind('click', function(event) {
		GM_setValue("isSafe",!isSafe);
		location.reload();
	});   	
});