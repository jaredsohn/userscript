// ==UserScript==
// @name        Google Reader mark page
// @namespace   http://jackfengji.appspot.com
// @description In google reader, you can use this script to mark only all the entries before the last one you can see as read instead of all the entries in the stream. So next time you can start reading from the entry you stop this time.
// @version     1.0
// @license     Jackfengji
// @include      https://www.google.com/reader/view/#stream*
// @include      http://www.google.com/reader/view/#stream*
// ==/UserScript==

//document.onload = function () {
	var topbar = document.getElementById('viewer-top-controls');
	var newButton = document.getElementById('viewer-refresh').cloneNode(false);
	newButton.innerHTML = newButton.title = "Mark entries in page as read";
	newButton.addEventListener('click', function (e) {
		console.log('mark all the entries in this page as read');
		var entries = document.getElementsByClassName('entry');
		
		var event = document.createEvent('MouseEvents');
		event.initEvent('click', true, true);
		
		var entriesContainer = document.getElementById('viewer-entries-container');
		var visibleScroll = entriesContainer.scrollTop + entriesContainer.clientHeight;
		var lastvisible = 0;
		for (;lastvisible < entries.length; ++lastvisible)
			if (entries[lastvisible].offsetTop >= visibleScroll)
				break;
		
		for (var i = 0; i < lastvisible; ++i) {
			entries[i].firstChild.dispatchEvent(event);
		}
	}, false);
	topbar.appendChild(newButton);
//};