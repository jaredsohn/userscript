// ==UserScript==
// @name          phpBB User Hide
// @include       */viewtopic.php*
// @description   Allows you to hides users' posts. Stores hidden users in a cookie.
// @exclude
// ==/UserScript==

(function() {
	// Get stored hidden users from cookie
	var users = [];
	var cookieName = "phpUserHide";
	for (var i = 0; i < document.cookie.split('; ').length; i++) {
		var oneCookie = document.cookie.split('; ')[i].split('=');
		if (oneCookie[0] == cookieName) {
			users = oneCookie[1].split(', ');
			break;
		}
	}

	// Find all the usernames in the page
	var results = document.evaluate("//span[@class='name']/b", document, null,
		XPathResult.ANY_TYPE, null);
	var resultNodes = [];
	var aResult;
	while (aResult = results.iterateNext())
		resultNodes.push(aResult);

	// Loop through every user post on the page
	for (var i in resultNodes) {
		var containingRow = resultNodes[i].parentNode.parentNode.parentNode;
		// Collapse whitespace
		var user = resultNodes[i].innerHTML.replace(/ /g, '');

		// Flag whether the user is in our hide list
		var notFound = true;
		for (var j = 0; j < users.length; j++) {
			if (users[j] == user) {
				notFound = false;
				resultNodes[i].style.color = 'gray';
			}
		}

		// Add relevant event handlers to user's name
		resultNodes[i].title = "double click to add or remove this user from your hide list";
		resultNodes[i].onmouseover = function(event) { event.target.style.cursor = 'pointer'; };
		resultNodes[i].onmouseout = function(event) { event.target.style.cursor = 'default'; };
		// On double-click, add or remove this user from the stored user list in the cookie
		resultNodes[i].ondblclick = function(event) {
			for(j = 0; j < document.cookie.split('; ').length; j++ ) {
				var oneCookie = document.cookie.split('; ')[j].split('=');
				if (oneCookie[0] == cookieName) {
					users = oneCookie[1].split(', ');
					break;
				}
			}
			user = event.target.innerHTML.replace(/ /g, '');
			notFound = true;
			for (var j = 0; j < users.length; j++) {
				if (users[j] == user) {
					users.splice(j, 1);
					notFound = false;
				}
			}
			if (notFound)
				users.push(event.target.innerHTML.replace(/ /g, ''));
			if (users.length > 0) {
				var date = new Date();
				var days = 365;
				date.setTime(date.getTime() + (days*24*60*60*1000));
				var expires = '; expires=' + date.toGMTString();
				var value = users.join(', ');
				document.cookie = cookieName + '=' + value + expires + '; path=/';
			} else {
				document.cookie = cookieName + '=;expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/';
			}
			alert(event.target.innerHTML + ' has been ' + (notFound ? 'added to' : 'removed from')
				+ ' your hide list\n'
				+ 'You must refresh the page to view the changes.');
		};

		// If this user isn't in our hide list, skip to the next user
		if (notFound)
			continue;

		// Find the first element node in the containing row
		var elem = containingRow.firstChild;
		while (elem.nodeType != 1)
			elem = elem.nextSibling;

		// Create a span to control toggling
		var span = document.createElement('span');
		span.appendChild(document.createTextNode('Show/Hide'));
		span.setAttribute('class', 'gensmallbold');
		span.style.color = 'gray';
		span.style.textDecoration = 'underline';
		span.setAttribute('displaystate', 'none');
		span.onmouseover = function(event) { event.target.style.cursor = 'pointer'; };
		span.onmouseout = function(event) { event.target.style.cursor = 'default'; };
		span.onclick = function(event) {
			var displayState = event.target.getAttribute('displaystate');
			if (displayState == 'none')
				displayState = '';
			else
				displayState = 'none';
			event.target.setAttribute('displaystate', displayState);
			elem = event.target.nextSibling;
			while (elem) {
				if (elem.getAttribute && (elem.getAttribute('class') == 'postdetails'))
					elem.style.display = displayState;
				elem = elem.nextSibling;
			}
			elem = event.target.parentNode.nextSibling;
			while (elem.nodeType != 1)
				elem = elem.nextSibling;
			elem = elem.firstChild;
			while (elem) {
				if (elem.getAttribute && (elem.getAttribute('class') == 'postbody'
					|| elem.getAttribute('class') == 'postsig'))
					elem.style.display = displayState;
				elem = elem.nextSibling;
			}
		};

		// Insert the span after the username and before the <br>
		elem.insertBefore(span, elem.firstChild.nextSibling.nextSibling);
		// Insert a <br> after the username and before the span
		elem.insertBefore(document.createElement('br'), elem.firstChild.nextSibling.nextSibling);

		// Crawl down and remove the postdetails span
		elem = elem.firstChild;
		while (elem) {
			if (elem.getAttribute && (elem.getAttribute('class') == 'postdetails'))
				elem.style.display = 'none';
			elem = elem.nextSibling;
		}

		// Reset the elem pointer to the first table cell in the row
		elem = containingRow.firstChild;
		while (elem.nodeType != 1)
			elem = elem.nextSibling;

		// Move to the next table cell in the row
		elem = elem.nextSibling;
		while (elem.nodeType != 1)
			elem = elem.nextSibling;

		// Move inside that table cell and remove the postbody and postsig spans
		elem = elem.firstChild;
		while (elem) {
			if (elem.getAttribute && (elem.getAttribute('class') == 'postbody'
				|| elem.getAttribute('class') == 'postsig'))
			elem.style.display = 'none';
			elem = elem.nextSibling;
		}
	}
})();