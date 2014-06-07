// ==UserScript==
// @name	IP.Board - Isolate Posts by User
// @namespace	Makaze
// @include	*
// @grant	none
// @version	1.0.9
// ==/UserScript==

var thisViews,
thisLink,
thisThreadInList,
threadNameInList,

thisThreadInThread,
threadNameInThread,
authorInThread,

listOnPage,
thisThreadOnPage,
threadNameOnPage,
usersOnPage,
authorOnPage,

thisUser,
usersPosts,
posts,
threads,
newLink,
i = 0;

// Classes constructor

function ClassHandler() {
	var self = this;

	this.classList = function(elem) {
		return elem.className.trim().split(/[\b\s]/);
	};

	this.hasClass = function(elem, className) {
		var classes = self.classList(elem),
		has = false,
		i = 0;

		for (i = 0; i < classes.length; i++) {
			if (classes[i] === className) {
				has = true;
				break;
			}
		}

		return (has);
	};

	this.addClass = function(elem, className) {
		var classes;

		if (!self.hasClass(elem, className)) {
			classes = self.classList(elem);
			classes.push(className);
			elem.className = classes.join(' ').trim();
		}

		return self;
	};

	this.removeClass = function(elem, className) {
		var classes = self.classList(elem),
		i = 0;

		for (i = 0; i < classes.length; i++) {
			if (classes[i] === className) {
				classes.splice(i, 1);
			}
		}

		elem.className = classes.join(' ').trim();

		return self;
	};

	this.toggleClass = function(elem, className) {
		var classes;

		if (self.hasClass(elem, className)) {
			self.removeClass(elem, className);
		} else {
			classes = self.classList(elem);
			classes.push(className);
			elem.className = classes.join(' ').trim();
		}

		return self;
	};
}

// Initialize

var Classes = new ClassHandler();

// End Classes constructor

function empty(listOnPage) {
	while (listOnPage.hasChildNodes()) {
		listOnPage.removeChild(listOnPage.lastChild);
	}
}

function createElement(type, callback) {
	var element = document.createElement(type);

	callback(element);

	return element;
}

function createIsoOnPost(author, threadName, thread) {
	return createElement('span', function(span) {
		span.className = 'right ipsType_small desc blend_links';
		span.style.marginRight = '7px';
		span.appendChild(createElement('a', function(link) {
			link.title = 'View all posts by ' + author + ' in ' + threadName;
			link.href =
				window.location.protocol
				+ '//'
				+ window.location.hostname
				+ window.location.pathname
				+ '?app=core&module=search&do=search&cType=topic&cId='
				+ thread
				+ '&search_author='
				+ author;
			link.appendChild(document.createTextNode('All'));
		}));
	});
}

function createIsoOnWho(author, threadName, thread, postsElem) {
		return createElement('a', function(link) {
			link.title = 'View all posts by ' + author + ' in ' + threadName;
			link.href =
				window.location.protocol
				+ '//'
				+ window.location.hostname
				+ window.location.pathname
				+ '?app=core&module=search&do=search&cType=topic&cId='
				+ thread
				+ '&search_author='
				+ author;
			link.appendChild(document.createTextNode(postsElem.textContent + ' (View)'));
		});
	}

var generateLinks = function(event) {
	var listOnPage = event.target,
	users,
	author,
	thisUser,
	usersPosts,
	i = 0;

	if (!listOnPage.className || !Classes.hasClass(listOnPage, 'fixed_inner')) {
		return false;
	}

	threadNameInList = listOnPage.parentNode.getElementsByTagName('h3')[0].textContent.split('Who posted in: ')[1];

	users = listOnPage.getElementsByTagName('tr');

	for (i = 0; i < users.length; i++) {
		thisUser = users[i];
		if (!Classes.hasClass(users[i], 'header')) {
			author = thisUser.getElementsByTagName('td')[0].textContent.trim();
			usersPosts = thisUser.getElementsByTagName('td')[1];
			usersPosts.className = 'blend_links';
			
			newLink = createIsoOnWho(author, threadNameInList, thisThreadInList, usersPosts);
			
			empty(usersPosts);
			usersPosts.appendChild(newLink);
		}
	}

	document.removeEventListener('DOMNodeInserted', generateLinks, false);
};

var generateLinksInit = function(event) {
	thisThreadInList = event.target.href.match(/t=(\d+)/)[1];

	document.addEventListener('DOMNodeInserted', generateLinks, false);
};

if (document.body.id === 'ipboard_body') {
	if (document.getElementsByClassName('__topic')[0] != null) {
		for (i = 0, threads = document.getElementsByClassName('__topic'); i < threads.length; i++) {
			thisViews = threads[i].getElementsByClassName('col_f_views')[0];
			thisLink = thisViews.getElementsByTagName('a')[0];

			if (thisLink != null) {
				thisLink.addEventListener('click', generateLinksInit, false);
			}
		}
	}

	if (document.getElementsByClassName('post_id')[0] != null) {
		for (i = 0, posts = document.getElementsByClassName('post_id'); i < posts.length; i++) {
			if (posts[i].getElementsByTagName('a')[0].href.match(/\/topic\//)) {
				thisThreadInThread = posts[i].getElementsByTagName('a')[0].href.match(/\/topic\/(\d+)/)[1];
			} else {
				thisThreadInThread = posts[i].getElementsByTagName('a')[0].href.match(/showtopic=(\d+)/)[1];
			}

			threadNameInThread = posts[i].getElementsByTagName('a')[0].title.split(': post #')[0];
			authorInThread = posts[i].parentNode.parentNode.getElementsByClassName('author')[0].textContent.trim();

			posts[i].parentNode.appendChild(createIsoOnPost(authorInThread, threadNameInThread, thisThreadInThread));
		}
	}

	if (window.location.href.match('do=who')) {
		listOnPage = document.getElementsByClassName('fixed_inner')[0];

		thisThreadOnPage = window.location.href.match(/t=(\d+)/)[1];
		threadNameOnPage = listOnPage.parentNode.getElementsByTagName('h3')[0].textContent.split('Who posted in: ')[1];

		usersOnPage = listOnPage.getElementsByTagName('tr');

		for (i = 0; i < usersOnPage.length; i++) {
			thisUser = usersOnPage[i];
			if (!Classes.hasClass(thisUser, 'header')) {
				authorOnPage = thisUser.getElementsByTagName('td')[0].textContent.trim();
				usersPosts = thisUser.getElementsByTagName('td')[1];
				usersPosts.className = 'blend_links';

				newLink = createIsoOnWho(authorOnPage, threadNameOnPage, thisThreadOnPage, usersPosts);
				
				empty(usersPosts);
				usersPosts.appendChild(newLink);
			}
		}
	}
}