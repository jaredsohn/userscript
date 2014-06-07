// ==UserScript==
// @namespace       http://flickr.dwardu.info/
// @name            Flickr/Explore/Interestingness/Last 7 Days/UNRELOAD!
// @description     When exploring the interesting flickr photos from the last 7 days [http://www.flickr.com/explore/interesting/7days/] this script makes it possible to navigate back to the previous set of photos after the RELOAD! button would have been pressed.
// @author          Edward Grech (dwardu@dwardu.info)
// @date            2007-04-26
// @version         0.2
// @include         http://www.flickr.com/explore/interesting/7days/*
// @include         http://flickr.com/explore/interesting/7days/*
// ==/UserScript==
(function() {
	form_elements = document.evaluate("//form[@action='/explore/interesting/7days/']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	t = new Date().getTime();
	for(i = 0; i < form_elements.snapshotLength; i++) {
		input_element = document.createElement('input');
		input_element.name = 't';
		input_element.type = 'hidden';
		input_element.value = t;
		form_elements.snapshotItem(i).appendChild(input_element);
	}
})();