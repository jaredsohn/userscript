// ==UserScript==
// @name          Metfilter tagline joke remover
// @namespace     http://www.metafilter.com/user/29882
// @description   Hides all comments on www.metafilter.com containing twee Metafilter: tagline jokes
// @include        http://*.metafilter.com/*
// ==/UserScript==


(function () {

var patterns=new Array();
//various possible spellings/misspellings
patterns[0]="//div[contains(child::text(),'Metafilter:')]";
patterns[1]="//div[contains(child::text(),'Metfilter:')]";
patterns[2]="//div[contains(child::text(),'metafilter:')]";
patterns[3]="//div[contains(child::text(),'metfilter:')]";
patterns[4]="//div[contains(child::text(),'MetaFilter:')]";
patterns[5]="//div[contains(child::text(),'metaFilter:')]";
patterns[6]="//div[contains(child::text(),'metFilter:')]";
patterns[7]="//div[contains(child::text(),'<strong>MetaFilter:</strong>')]";
patterns[8]="//div[contains(child::text(),'METAFILTER:')]";

//loop over possible patterns
    for (j=0;j<patterns.length;j++)
{    
  //this code adapted from http://userscripts.org/scripts/show/47393
  var thisPattern = patterns[j];
	var options = document.evaluate(thisPattern, document, null, 
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

//this leaves a kinda ugly break where the comment is, but unless there're a bunch of tagline jokes in a row,it's hardly noticeable.
	
	
}

})();