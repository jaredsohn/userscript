// ==UserScript==
// @name          Power Board Sig & Avatar Collapser
// @namespace     http://www.casa-z.org/~scott/user.js/
// @description	  Allows display toggle of user's avatar & signature on Power Board fora.
// @include       *index.php?*showtopic=*
// @exclude       

// Inspired by:	phpBB Avatar Suppression by Josh Wheeler (deltalima@gmail.com)
// 				& phpBB Signature Hider by Michael Tandy
// ==/UserScript==


(function() {

	// test for powerboard's <div id='ipbwrapper'>
	if(document.getElementById("ipbwrapper") == null) return;


	var nodes = document.evaluate(
		'//tr[td/span[@class="postdetails"]/img[@alt!="*"] or td/div[@class="signature"]]/..',
		document,
		null,
		//XpathResult.ANY_TYPE //XXX
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, //YYY
		null);

	var targets = new Array();
	var thispost;

//	try { thispost = nodes.iterateNext(); } //XXX
//	catch(e) { thispost = null; alert("outer: " + e); } //XXX
//	while(thispost) { //XXX
	for(var i=0; i<nodes.snapshotLength; i++) { //YYY
		thispost = nodes.snapshotItem(i); //YYY

		// locate the namenode
		var foo = document.evaluate(
			'descendant::span[@class="normalname"]',
			thispost,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null);

		//alert(foo.snapshotItem.length + "\n" + foo.snapshotItem(0));
		var namenode = foo.snapshotItem(0);

		var targets = new Array();

		// locate avatar
		foo = document.evaluate(
			'descendant::span[@class="postdetails" and parent::td]/child::img[string(@alt)=""]',
			thispost,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null);

		if(foo.snapshotItem(0)) {
			targets.push(foo.snapshotItem(0));
			foo.snapshotItem(0).style.display = 'none';
		}


		// locate signature
		foo = document.evaluate(
			'descendant::div[@class="signature"]',
			thispost,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null);

		if(foo.snapshotItem(0)) {
			targets.push(foo.snapshotItem(0));
			foo.snapshotItem(0).style.display = 'none';
		}


		// generate, inject & tie click-event handler to toggle-button anchor
		var anchor = document.createElement("a");
		anchor.appendChild(document.createTextNode("[+]"));
		anchor.style.cursor = 'pointer';
		anchor.title = 'Click to expand';
		anchor.addEventListener('click', genHandler(targets), false);
		namenode.parentNode.insertBefore(anchor, namenode.nextSibling);
		namenode.parentNode.insertBefore(document.createTextNode(" "), namenode.nextSibling); // pad button

		//alert(thispost + " finished loop");

		//try { thispost = nodes.iterateNext(); } //XXX
		//catch(e) { thispost = null; alert("inner: " + e); } //XXX
	}

	
})();


function genHandler(list) {

	return (function(event) {
		for(var i=0; i<list.length; i++) {
			var n = list[i];
			//alert(n);
			if(n.style.display == 'none')
			  n.removeAttribute('style');
			else
			  n.style.display = 'none';
		}
	});
}
