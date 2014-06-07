// ==UserScript==
// @name          Monkey Scut Collapser
// @namespace     http://zoolcar9.lhukie.net/mozilla/userscripts/
// @include       http://slashdot.org/
// @include       http://slashdot.org/index.pl?issue=*
// @include       http://*.slashdot.org/
// @include       http://*.slashdot.org/index.pl?issue=*
// @description	  Expand/Collapse Monkey Scut
// ==/UserScript==

// shamelessly ripped from the Slashdot Collapser: this hides Monkey Scut.
// I'm tired of mentally crap-filtering all of ScuttleMonkey's stories
// so this does it for me. Now I can read Slashdot in peace once again.


(function() {
	var genTitles, genTitle, postDetails, postBody, storyLinks;
	var postedBy, lastWasMonkeyScut;

	lastWasMonkeyScut = 0;

	genTitles = document.evaluate(
		'//div[@class="generaltitle"]',
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);

	if(!genTitles) return;

	for(var i = 0; i < genTitles.snapshotLength; i++) {
		genTitle = genTitles.snapshotItem(i);
		postDetails = genTitle.nextSibling.nextSibling;
		postedBy = postDetails.childNodes[1];

		if( lastWasMonkeyScut == 1 ) {
			genTitle.style.marginTop = '1em';
			lastWasMonkeyScut = 0;
		}

		if ( postedBy.textContent.match(/ScuttleMonkey/) ) { 
	
			//alert("located monkey scut");
				
			postBody = postDetails.nextSibling.nextSibling;
			storyLinks = genTitle.parentNode.nextSibling;
			postDetails.style.display = 'none';
			postBody.style.display = 'none';
			storyLinks.style.display = 'none';
			
			genTitle.style.cursor = 'pointer';
			genTitle.title = 'Click to expand';
			genTitle.addEventListener('click', function(event) {
				pDetails = this.nextSibling.nextSibling;
				pBody = pDetails.nextSibling.nextSibling;
				pLinks = this.parentNode.nextSibling;
				if(pDetails.style.display == 'none') {
					pDetails.removeAttribute('style');
					pBody.removeAttribute('style');
					pLinks.removeAttribute('style');
					this.title = 'Click to collapse';
				} else {
					pDetails.style.display = 'none';
					pBody.style.display = 'none';
					pLinks.style.display = 'none';
					this.title = 'Click to expand';
				}
			}, false);
	
			lastWasMonkeyScut = 1;
	
			
		}
	}
})();


