// ==UserScript==
// @name 		   BSCF : weight override
// @namespace	   http://supportforums.blackberry.com/t5/
// @description	version 0.1
// @include		http://supportforums.blackberry.com/t5/*
// ==/UserScript==


function addWeight(nodesSnapshot) {
	var nbrDivs = nodesSnapshot.snapshotLength;
	if (0!=nbrDivs) {
		/* create elem to add everywhere */
		var myLink0 = document.createElement('a');
			var myText = document.createTextNode('weight');
		myLink0.appendChild(myText);
			var myHref = document.createAttribute('href');
				myHref.value='http://supportforums.blackberry.com/t5/user/myprofilepage/tab/personal-profile%3Akudos-weight-override';
		myLink0.setAttributeNode(myHref);
			var myTarget = document.createAttribute('target');
				myTarget.value='_blank';
		myLink0.setAttributeNode(myTarget);
		var myXdx0 = document.createElement('div');
		myXdx0.appendChild(myLink0);
		
		for ( var i=0 ; i < nbrDivs ; i++ ) {
			var myDiv = nodesSnapshot.snapshotItem(i).parentNode.parentNode;
			var myXdxNode = myDiv.parentNode.insertBefore(myXdx0.cloneNode(true),myDiv);
		} // end for
	} // end if

} // end function addWeight()



function fetchAndAdd() {
	var nodesSnapshot = document.evaluate(
		  '//a[@class="lia-link-navigation kudos-link"]'
		, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null
	);
	addWeight(nodesSnapshot);
} // end function fetchAndReplace()

window.xdx = function() {
  fetchAndAdd();
}

xdx();