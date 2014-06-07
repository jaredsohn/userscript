// ==UserScript==
// @name           Last.fm - Clear Event Title
// @namespace      http://userscripts.org/users/43234
// @description    Adds a link to clear the title of events
// @include        http://www.last.fm/events*
// @include        http://www.last.fm/events/*/*
// @include        http://www.last.fm/music/*/+events*
// @include        http://www.last.fm/venue/*/events*
// @include        http://www.last.fm/user/*/events*
// @include        http://www.last.fm/user/*/addedevents*
// @include        http://www.lastfm.tld/events*
// @include        http://www.lastfm.tld/events/*/*
// @include        http://www.lastfm.tld/music/*/+events*
// @include        http://www.lastfm.tld/venue/*/events*
// @include        http://www.lastfm.tld/user/*/events*
// @include        http://www.lastfm.tld/user/*/addedevents*
// @version        1.0
// @author         escapist
// ==/UserScript==

if (top != self) return;

var events = Array.filter(document.getElementsByClassName('gig'), (function (event) {return event.classList.contains('future') || event.classList.contains('past')}));

for (var i in events) {
	event = events[i];
	eventLink = event.getElementsByTagName('a')[0];
	eventId = eventLink.href.match('[0-9]+');
	eventTitle = eventLink.getElementsByTagName('strong')[0].textContent;
	venueName = event.getElementsByClassName('location')[0].getElementsByTagName('strong')[0].textContent;

	var link = document.createElement('a');
	link.id = 'clearTitle' + eventId;
	link.setAttribute('event', eventId);
	link.addEventListener("click", function(event) {clearTitle(this.getAttribute('event'))}, false);
	link.textContent = 'Clear title';

	event.getElementsByClassName("info")[0].getElementsByTagName('p')[0].insertBefore(link, null);
}

function clearTitle(eventId) {
	var progressIndicator = document.createElement('span');
	progressIndicator.id = 'clearTitle' + eventId;
	progressIndicator.textContent = 'Clearing...';
	var link = document.getElementById('clearTitle' + eventId);
	link.parentNode.replaceChild(progressIndicator, link);

	var editWindow = window.open('http://' + document.location.hostname + '/event/' + eventId + '/edit');
	editWindow.addEventListener('load', onEditPageLoaded, false);
}

function onEditPageLoaded(event) {
	var editDocument = event.target;
	var editWindow = editDocument.defaultView;
	editWindow.removeEventListener('load', onEditPageLoaded, false);
	optionalInputFields = editDocument.getElementById('what').getElementsByTagName('input');
	for (var i in optionalInputFields) {
		if (optionalInputFields[i].id == 'festivalName') {
			optionalInputFields[i].value = '';
			break;
		}
	}

	editWindow.addEventListener('pageshow', onEditPageReloaded, false);
	editDocument.getElementById('uploadSubmit').click();
}

function onEditPageReloaded(event, retry) {
	if (retry) {
		var editWindow = event.target.defaultView;
		var eventId = editWindow.location.pathname.match(/\/event\/([0-9]+)/)[1];
		var link = document.getElementById('clearTitle' + eventId);
		link.parentNode.replaceChild(document.createTextNode('Done!'), link);
		editWindow.close();
	} else {
		setTimeout(onEditPageReloaded, 4000, event, true);
	}
}