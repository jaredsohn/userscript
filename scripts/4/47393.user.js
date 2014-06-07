// ==UserScript==
// @name          DrossFilter
// @namespace      http://www.metafilter.com/user/12682
// @description   Hides all comments on www.metafilter.com that have less than 5 favourites. Based on Multifavorite
// @include        http://www.metafilter.com/*
// ==/UserScript==

(function () {

	// Threshold; at this number or higher the comment will be displayed
	var threshold = 5;

    // this could all be done with one loop through the comments
    // but this is just a quick hack.
    
    //hide all comments firsts.
    var searchPattern  = "//div[@class='comments']";

	var options = document.evaluate( searchPattern, document, null, 
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
	var i;
    var classx;
	for (classx = null, i = 0; (classx = options.snapshotItem(i)); i++) {	
        var commentNode=classx;
        while (commentNode.nodeName != "DIV") {
            commentNode = commentNode.parentNode;
        }
        commentNode.style.display='none';			
	}	
	
    // show comments without enough favourites
	searchPattern = "//a[contains(@title,'marked this as favorite')]";

	options = document.evaluate( searchPattern, document, null, 
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

	for (classx = null, i = 0; (classx = options.snapshotItem(i)); i++) {	
		var favCount=classx.title.replace(/[^0-9]*([0-9]+) users? marked this as.*/,'$1');
		if (favCount > threshold) {
			var commentNode=classx;
			while (commentNode.nodeName != "DIV") {
				commentNode = commentNode.parentNode;
			}
			commentNode.style.display='block';
            commentNode.style.margin='18px 75px 9px 75px';
			
		};
	}
    //get rid of breaks to tighten up page
    searchPattern = "//div[@id='page']/br";
	options = document.evaluate( searchPattern, document, null, 
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

	for (classx = null, i = 0; (classx = options.snapshotItem(i)); i++) {	
        var pazza =classx.parentNode;
        //console.log("removing br");
        pazza.removeChild(classx);			
	}

})();
	