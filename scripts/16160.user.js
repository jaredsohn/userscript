// ==UserScript==
// @name           No Halo Comments
// @namespace      userscripts.org
// @include        http://www.rlslog.net/*
// @include        http://rlslog.net/*
// ==/UserScript==

(function(){

	if(document.title.toLowerCase().indexOf('halo') < 1){

		var getComm = document.evaluate( '//div[@class="commenttext"]' ,document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

		for (var s = 0; s < getComm.snapshotLength; s++){
		
			var sI = getComm.snapshotItem(s);

			if( sI.textContent.toLowerCase().indexOf('halo') > -1 ){

				sI.parentNode.style.display = 'none';
			
			}

		}
	
	}

})();