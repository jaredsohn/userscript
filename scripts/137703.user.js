// ==UserScript==
// @name           DZ Search Filter v2.1
// @namespace      http://userscripts.org/people/26505
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js
// @description    Filter the search result for DZ forumn
// @include        http://okfun.org/search.php?*
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
            if(theArs.length == 0) return;
            var theAr = theArs[0];
			var theTr = theForumTd.parentNode;
			var theTBody = (theTr)?theTr.parentNode:null;
			if(!theTr || !theTBody) continue;
            if(isSafe && theAr.href.match(filterExp)){
              	theTBody.parentNode.removeChild(theTBody);
            }
            if(!isSafe && !theAr.href.match(filterExp)){
            	theTBody.parentNode.removeChild(theTBody);
            }
        }    
    },    
}

$(document).ready(function() {
	var isSafe = GM_getValue("isSafe", true);
    ContentFilter.filterTable('forum', 
    	/(fid\=(36|40|39|71|182|41|74|62|72|75|77|211|145|231|239|143|237|187|144|146|151|261|81|188|63|65|262|44|64|69|263|92|85|132|133)+)+/,
    	isSafe);
	$('div .pages').append('<a id="sssafe">' + (isSafe?'OO':'XX') + '</a>');
	$('a#sssafe').bind('click', function(event) {
		GM_setValue("isSafe",!isSafe);
		location.reload();
	});
});