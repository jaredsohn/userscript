// ==UserScript==
// @name           Zooomr Zipline Notification
// @namespace      http://www.zooomr.com/photos/ping/
// @description    Alerts you when there is a new Zipline entry. Video: http://vimeo.com/322459
// @include        http://*.zooomr.com/zipline/
// @include        http://*.zooomr.com/
// @include        http://*.zooomr.com/zipline/#
// @include        http://*.zooomr.com/#
// ==/UserScript==
(function() {

	var timeline = document.getElementById('timeline');
	if (!timeline) {
		return;
	}
	
	// Adapted from "Scrolling Message Across Title Bar" By: Don Santiago, Email: senor_santi@yahoo.com
	var msg = '', pos = 0, stopScroll = false;
	function scrollMSG() {
		document.title = msg.substring(pos, msg.length) + msg.substring(0, pos);
		pos++;
		if (pos >  msg.length) pos = 0
		
		if (!stopScroll) {
			window.setTimeout(scrollMSG, 200);
		} else {
			document.title = originalTitle;
		}
	}
	
	var lastMessage = '', originalTitle = '';
	if (originalTitle == '') { 	originalTitle = document.title; }
	
	function ziplineReloaded(event) {
		if (event.target.tagName == 'TBODY') {
			window.setTimeout(ziplineMonitor, 100); // delays the function
		}
	}
	
	function resetMonitor(event) {
		stopScroll = true;
		document.title = originalTitle;
		if (event.type == 'focus') {
			lastMessage = getLatestActivity();
			document.body.setAttribute('hasFocus', true);
		} else {
			document.body.setAttribute('hasFocus', false);
		}
	}
	
	ziplineMonitor();
	timeline.addEventListener('DOMNodeRemoved' , ziplineReloaded, false);
	document.addEventListener('focus' , resetMonitor, false);
	document.addEventListener('blur' , resetMonitor, false);
	
	function ziplineMonitor() {
		
		var latestActivity = getLatestActivity();
		if (!document.body.getAttribute('hasFocus')) {
			document.body.setAttribute('hasFocus', false);
		}
		
		if (lastMessage != latestActivity && lastMessage != '') {
			if (document.body.getAttribute('hasFocus') == 'false') {
				//GM_log('scroll!');
				msg = originalTitle + ': ' + latestActivity + ' ';
				if (stopScroll) {
					stopScroll = false;
					scrollMSG();
				}
			}
		} else {
			lastMessage = latestActivity;
		}
	}
	
	function getLatestActivity() {
		var zipPosts;
		zipPosts = document.evaluate(
			'//table[@id="timeline"]/tbody/tr/td/div[contains(@id,"status")]'
			, document
			, null
			, XPathResult.FIRST_ORDERED_NODE_TYPE
			, null);		
		
		post = zipPosts.singleNodeValue.cloneNode(true);
		timestamps = post.getElementsByTagName('em');
		for (var x = 0; x < timestamps.length; x++) {
			//post.removeChild(timestamps[x]); -- funny, can't remove child
			timestamps[x].innerHTML = '';
		}
		timestamps = post.getElementsByTagName('span');
		for (var x = 0; x < timestamps.length; x++) {
			timestamps[x].innerHTML = '';
		}
		return post.textContent;
	}
	
})()