// ==UserScript==
// @name          Xbox-Scene Forums
// @namespace     http://8overpar.com/poppeseed/greasemonkey/
// @description   Gets rid of sigs and adds Xbox Live links in the Xbox-Scene Forums
// @include       http://forums.xbox-scene.com/index.php*
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

var navbar, newElement;
navbar = document.getElementById('userlinks');
if (navbar) {
    newElement = document.createElement('p');
	newElement.innerHTML = '&nbsp;<div align="left"><a href="http://live.xbox.com/en-US/default.aspx">' +
	'My Xbox</a> | <a href="http://live.xbox.com/en-US/profile/profile.aspx">Xbox Live Profile</a> ' +
    '| <a href="http://live.xbox.com/en-US/profile/Friends.aspx">Xbox Live Friends List</a></div>';
    navbar.parentNode.insertBefore(newElement, navbar.nextSibling);
}
