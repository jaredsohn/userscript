      //==UserScript==
	// @name			ShortcutKeys
	// @namespace		http://www.imperialviolet.org
	// @description		Adds access keys to Google search results
	// @include			http://www.google.co.in/search*
	// ==/UserScript==
	
  	var results = document.evaluate("//p[@class='g']", document, null,
	XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	var counter = 1;
	var querybox = document.evaluate("//input[@name='q']", document, null,
		XPathResult.ORDERED_NODE_ITERATOR_TYPE, null).iterateNext( );

	var next_nodes = document.evaluate(
		"//a[span[@class='b' and text( )='Next']]",
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	var prev_nodes = document.evaluate(
		"//a[span[@class='b' and text( )='Previous']]",
		document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	var nextlink = null;
	var prevlink = null;

	if (next_nodes.snapshotLength) {
		nextlink = next_nodes.snapshotItem(0).getAttribute('href');
	}

	if (prev_nodes.snapshotLength) {
		prevlink = prev_nodes.snapshotItem(0).getAttribute('href');
	}

	prev_nodes = next_nodes = null;
	var links = new Array( );

	for (var i = 0; i < results.snapshotLength; ++i) {
		var result = results.snapshotItem(i);
		links.push(result.firstChild.nextSibling.getAttribute("href"));
		var newspan = document.createElement("span");
		newspan.setAttribute("style", "color:red; font-variant: small-caps;");
		newspan.appendChild(document.createTextNode('' + counter++ + ' '));
		alert(counter);
		result.insertBefore(newspan, result.firstChild);
	}
	results = null;

	function keypress_handler(e) {
		if (e.ctrlKey || e.altKey || e.metaKey) { return true; }
		if (e.target.nodeName == 'INPUT' && e.target.name == 'q') {
			return true;
		}
		var keypressed = String.fromCharCode(e.which);
		if (nextlink && (keypressed == 'l' || keypressed == 'L' ||
				 keypressed == '.')) {
			if (e.shiftKey) {
				window.open(nextlink,'Search Results','');
			} else {
				document.location.href = nextlink;
			}
			return false;
		}
		if (prevlink && (keypressed == 'h' || keypressed == 'H' ||
				 keypressed == ',')) {
			if (e.shiftKey) {
				window.open(prevlink,'Search Results','');
			} else {
				document.location.href = prevlink;
			}
			return false;
		}

		if (keypressed <'0' || keypressed > '9') {
			return true;
		}

		var resnum = e.which - "0".charCodeAt(0);
		if (resnum == 0) {
			resnum = 10;
		}

		if (e.shiftKey) {
			window.open(links[resnum - 1],'Search Results','');
		} else {
			document.location.href = links[resnum - 1];
		}
		return false;
	}

	document.addEventListener('keydown', keypress_handler, false);