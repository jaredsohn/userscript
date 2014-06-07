// ==UserScript==
// @name        Trollfilter-tanzmitmir.net
// @namespace   trollfilter.tanzmitmir.net
// @version     2.1
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @include      *.tanzmitmir.net/*/viewtopic.php*
// @exclude
// @description  Verstecke Beiträge ausgewählter Nutzer im tanzmitmir.net-Forum. Benutzung: [x] vor Benutzernamen zum Ignorieren des Benutzers. [+] nach Benutzernamen Einblenden des Beitrags oder Zitats.
//   Hide posts of selected users in tanzmitmir.net forum. Usage: [X] before every username to ignore the selected user. [+] after the username to unhide hidden post or quotation.
//   Based on phpBB User Hide (Firefox 3 compatible) http://userscripts.org/scripts/show/50036
// ==/UserScript==
//

(function() {
	// Greasemonkey persistent storage for hidden users
	var settingName = "tmmUserHide";

	// Get stored hidden users from cookie
	var users = [];
	var cookieName = "phpUserHide";
	for (var i = 0; i < document.cookie.split('; ').length; i++) {
		var oneCookie = document.cookie.split('; ')[i].split('=');
		if (oneCookie[0] == cookieName) {
			users = oneCookie[1].split(', ');
			GM_setValue(settingName, users.join(', ')); 
			break;
		}
	}

	// remove cookie
	if (users.length > 0) {
		document.cookie = cookieName + '=;expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/';
	}
	
	// Get list of hidden users from Greasemonkey persistent storage. 
	users = GM_getValue(settingName,"").split(', ');

	// Cursor functions
	var curPointer = function(event) {
		event.target.style.cursor = 'pointer';
		event.preventDefault();
	};
	var curDefault = function(event) {
		event.target.style.cursor = 'default';
		event.preventDefault();
	};

	// Add or remove a user from Greasemonkey persistent storage.
	var addRemoveUser = function(event) {
		var userNode = event.target.nextSibling;
		var userInnerTags = userNode.getElementsByTagName('A');
		if(userInnerTags.length > 0)
			userNode = userInnerTags[0];
		var user = escape(userNode.innerHTML);

		notFound = true;
		for (var j = 0; j < users.length; j++) {
			if (users[j] == user) {
				users.splice(j, 1);
				notFound = false;
			}
		}
		if (notFound)
			users.push(user);
		if (users.length > 0) {
			GM_setValue(settingName, users.join(', ')); 
		} else {
			GM_deleteValue(settingName);
		}
		location.reload(); 
		event.preventDefault();
	};
	// Toggle display of user's post
	var togglePost = function(event) {
		var displayState = event.target.getAttribute('displaystate');
		if (displayState == 'none')
			displayState = '';
		else
			displayState = 'none';
		event.target.setAttribute('displaystate', displayState);

		containingRow = event.target.parentNode.parentNode;
		var innerTags = containingRow.getElementsByTagName('*');
		for (var i = 0; i < innerTags.length; i++) {
			var tagClass = innerTags[i].getAttribute('class');
			if (tagClass == 'postbody' || tagClass == 'postsig'
				|| tagClass == 'postdetails' || innerTags[i].tagName == 'TABLE')
				innerTags[i].style.display = displayState;
		}
		var nextRow = containingRow.nextSibling.nextSibling;
		nextRow.style.display = displayState;

		event.preventDefault();
	};
	// Toggle display of user's quote
	var toggleQuote = function(event) {
		var displayState = event.target.getAttribute('displaystate');
		if (displayState == 'none')
			displayState = 'table-row';
		else
			displayState = 'none';
		event.target.setAttribute('displaystate', displayState);

		// Jump to parent row
		var containingRow = event.target.parentNode.parentNode.parentNode.parentNode.nextSibling;
		// Find containing row
		while (containingRow.nodeType != 1)
			containingRow = containingRow.nextSibling;
		containingRow.style.display = displayState;

		event.preventDefault();
	};

	// Find all the usernames in the page
	var results = document.evaluate("//span[@class='name']/b|//span[@class='name']/strong", document, null,
		XPathResult.ANY_TYPE, null);
	var resultNodes = [];
	var aResult;
	while (aResult = results.iterateNext())
		resultNodes.push(aResult);

	// Loop through every user post on the page
	for (var i in resultNodes) {
		var containingRow = resultNodes[i].parentNode.parentNode.parentNode;
		// Format whitespace
		var userNode = resultNodes[i];
		var userInnerTags = userNode.getElementsByTagName('A');
		if(userInnerTags.length > 0)
			userNode = userInnerTags[0];
		var user = escape(userNode.innerHTML);
		// Flag whether the user is in our hide list
		var notFound = true;
		for (var j = 0; j < users.length; j++) {
			if (users[j] == user) {
				notFound = false;
			}
		}

		// Add relevant event handlers to user's name and a toggler node
		var toggler = document.createElement('span');
		toggler.setAttribute('title', "Benutzer zur Ignorierliste hinzufügen oder davon entfernen");
		toggler.appendChild(document.createTextNode('[X] '));
		toggler.style.fontSize = "7pt";
		toggler.addEventListener('mouseover', curPointer, true);
		toggler.addEventListener('mouseout', curDefault, true);
		toggler.addEventListener('click', addRemoveUser, true);

		resultNodes[i].parentNode.insertBefore(toggler, resultNodes[i]);

		// If this user isn't in our hide list, skip to the next user
		if (notFound)
			continue;

		// Find the first element node (td) in the containing row
		var elem = containingRow.firstChild;
		while (elem.nodeType != 1)
			elem = elem.nextSibling;

		// Create a span to control toggling
		var span = document.createElement('span');
		span.setAttribute('title', "Ein-/Ausblenden dieses Beitrags");
		span.appendChild(document.createTextNode(' [+]'));
		span.style.fontSize = "7pt";
		span.setAttribute('displaystate', 'none');
		span.addEventListener('mouseover', curPointer, true);
		span.addEventListener('mouseout', curDefault, true);
		span.addEventListener('click', togglePost, true);

		// Insert the span after the username and before the <br>
		elem.insertBefore(span, elem.firstChild.nextSibling);
		// Insert a <br> after the username and before the span
		//elem.insertBefore(document.createElement('br'), elem.firstChild.nextSibling.nextSibling);

		var innerTags = containingRow.getElementsByTagName('*');
		for (var i = 0; i < innerTags.length; i++) {
			var tagClass = innerTags[i].getAttribute('class');
			if (tagClass == 'postbody' || tagClass == 'postsig'
				|| tagClass == 'postdetails' || innerTags[i].tagName == 'TABLE')
				innerTags[i].style.display = 'none';
		}
		var nextRow = containingRow.nextSibling.nextSibling;
		nextRow.style.display = 'none';
	}

	// Find all the usernames quoted in the page
	var results = document.evaluate("//td[@class='quote']/parent::*/preceding-sibling::*/td/span/b|"
		+ "//td[@class='quote']/parent::*/preceding-sibling::*/td/span/strong", document, null,
		XPathResult.ANY_TYPE, null);
	var resultNodes = [];
	var aResult;
	while (aResult = results.iterateNext())
		resultNodes.push(aResult);

	// Loop through every user quote on the page
	for (var i in resultNodes) {
		var containingRow = resultNodes[i].parentNode.parentNode.parentNode.nextSibling;
		while (containingRow.nodeType != 1)
			containingRow = containingRow.nextSibling;

		// Find username
		var usermatch = resultNodes[i].innerHTML.match(/(.*) wrote:$/);
		if(!usermatch)
			usermatch = resultNodes[i].innerHTML.match(/(.*) hat folgendes geschrieben:$/);
		if (usermatch)
			var user = escape(usermatch[1]);
		else
			continue;

		// Flag whether the user is in our hide list
		var notFound = true;
		for (var j = 0; j < users.length; j++) {
			if (users[j] == user) {
				notFound = false;
			}
		}

		// If this user isn't in our hide list, skip to the next user
		if (notFound)
			continue;

		// Create a span to control toggling
		var span = document.createElement('span');
		span.setAttribute('title', "Ein-/Ausblenden dieses Zitats");
		span.appendChild(document.createTextNode(' [+]'));
		span.style.fontSize = "7pt";
		span.setAttribute('displaystate', 'none');
		span.addEventListener('mouseover', curPointer, true);
		span.addEventListener('mouseout', curDefault, true);
		span.addEventListener('click', toggleQuote, true);

		// Insert span
		resultNodes[i].appendChild(span);
		
		// Hide the quote
		containingRow.style.display = 'none';
	}

})();