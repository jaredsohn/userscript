// ==UserScript==
// @name Cloudlinks Enhancer
// @description Adds enhancements to the topic list with Cloudlinks
// @include http://*.endoftheinter.net/topics*
// @include https://*.endoftheinter.net/topics*
// @grant GM_setValue
// @grant GM_getValue
// ==/UserScript==

// VERSION: 1.2

// *** BEGIN SETTINGS ***

var confirmDelete = true; // Set to 'true' to receive a confirmation window asking you if you want to remove a topic, 'false' if you don't.
var highlightColor = '#aaeeff'; // A hex color to highlight topics. Simple things like 'red' will work too
var onlyOnPosted = true; // Only shows 'Load Unread Topics' when the [Posted] tag is selected
var autoScroll = false; // Set to false to disable scrolling opening new pages.

// *** END SETTINGS *** 


// Check if GreaseMonkey functions exist
var greaseMonkey = false;
if (typeof GM_setValue == 'function' && typeof GM_getValue == 'function') {
	greaseMonkey = true;
}


function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if (node == null)
		node = document;
	if ( tag == null)
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (var i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

function coolCursor() {
	this.style.cursor = "pointer";
}


var nextPageURL;
var showRemoved = false;
var noNextPage = false;
var topicsTable = getElementsByClass('grid', document, 'table')[0];
var removedTopics = 0;



function highlightRow(row, add) {
	var innerCells = row.getElementsByTagName('td');
	for (var i = 0; i < innerCells.length; i++) {
		if (add) {
			innerCells[i].style.backgroundColor = highlightColor;
		} else {
			innerCells[i].style.backgroundColor = null;
		}
	}
}

var userbar = getElementsByClass('userbar', document, 'div')[0];

if (greaseMonkey) {

	if (GM_getValue('showRemoved', -1) != -1) {
		showRemoved = true;
	}	


	// Interface for toggling removed topics
	function toggleShowRemoved() {
		if (showRemoved) {
			GM_setValue('showRemoved', -1);	
		} else {
			GM_setValue('showRemoved', 1);
		}
		document.getElementById('showRemovedLink').removeEventListener('click', toggleShowRemoved, true);
		window.location.reload();
	}

	
	var spanA = document.createElement('span');
	spanA.appendChild(document.createTextNode(' | '));
	var showRemovedLink = document.createElement('a');
	showRemovedLink.id = 'showRemovedLink';
	showRemovedLink.style.textDecoration = 'underline';
	showRemovedLink.addEventListener('mouseover', coolCursor, true);
	showRemovedLink.addEventListener('click', toggleShowRemoved, true);
	if (showRemoved) {
		showRemovedLink.appendChild(document.createTextNode('H'));
		showRemovedLink.setAttribute('title', 'Hide removed topics');
	} else {
		showRemovedLink.appendChild(document.createTextNode('R'));
		showRemovedLink.setAttribute('title', 'Show removed topics');
	}
	userbar.appendChild(spanA);
	userbar.appendChild(showRemovedLink);

	// Functions for highlighting/disabling/removing
	function highlightTopic() {
		var topicID = this.id;
		var aboveRow = this.parentNode.parentNode;
		if (GM_getValue(topicID,-1) != -1) {
			GM_setValue(topicID,-1);
			highlightRow(aboveRow, false);
		} else {
			GM_setValue(topicID, 1);
			highlightRow(aboveRow, true);
		}	
	}

	function disableTopic() {
		var topicID = this.id;
		if (GM_getValue(topicID,-1) != -1) {
			GM_setValue(topicID,-1);
			this.parentNode.parentNode.style.opacity = 1;
		} else {
			GM_setValue(topicID, 1);
			this.parentNode.parentNode.style.opacity = 0.5;	
		}
	}

	function removeTopic() {
		var topicID = this.id;
		var parentTR = this.parentNode.parentNode;
		var conf = true;
		if (confirmDelete) {
			var topicTitle = parentTR.getElementsByTagName('td')[0].getElementsByTagName('a')[0].firstChild.nodeValue;
			conf = confirm('Are you sure you want to remove the topic "' + topicTitle + '"?');
		}
		if (conf) {
			parentTR.parentNode.removeChild(parentTR);
			GM_setValue(topicID, 1);
		} 
	}

}


var unreadTopics = new Array();

function clearLink() {
	unreadLink = document.getElementById('unreadTopicLink');
	if (unreadLink.hasChildNodes()) {	
		unreadLink.removeChild(unreadLink.firstChild);
	}
	unreadLink.appendChild(document.createTextNode('No Unread Topics'));
	unreadLink.style.textDecoration = 'none';
	unreadLink.removeEventListener('click', openUnreadTopics, true);
	unreadLink.removeEventListener('mouseover', coolCursor, true);	
}

function openUnreadTopics() {
	for (var i = 0; i < unreadTopics.length; i++) {
		window.open(unreadTopics[i], '_blank');	
	}
	unreadTopics = new Array();
	clearLink();
}

function updateUnreadTopics() {
	var unreadLink;
	var unreadSpan;
	if (document.getElementById('unreadTopicLink') == null) {
		unreadSpan = document.createElement('span');
		unreadSpan.appendChild(document.createTextNode(' | '));
		unreadSpan.id = 'unreadSpan';
		
		unreadLink = document.createElement('a');
		unreadLink.id = 'unreadTopicLink';	
		
		userbar.appendChild(unreadSpan);
		userbar.appendChild(unreadLink);
	} else {
		unreadLink = document.getElementById('unreadTopicLink');
	}
	if (unreadTopics.length == 0) {
		clearLink();
	} else {
		unreadLink.style.textDecoration = 'underline';
		unreadLink.addEventListener('click', openUnreadTopics, true);
		if (unreadLink.hasChildNodes()) {	
			unreadLink.removeChild(unreadLink.firstChild);
		}
		unreadLink.appendChild(document.createTextNode('Load Unread Topics (' + unreadTopics.length + ')'));
		unreadLink.addEventListener('mouseover', coolCursor, true);		
	}
}

function processPage(doc) {
	var rows = getElementsByClass('grid', doc, 'table')[0].getElementsByTagName('tr');
	for (var i = 1; i < rows.length; i++) {
		var cells = rows[i].getElementsByTagName('td');
		datecell = cells[3];
		
		// Retrieves topic ID
		var topicID = cells[0].getElementsByTagName('a')[0].getAttribute('href').split('=')[1];
		
		var disabled = false;
		var highlighted = false;
		
		if (greaseMonkey) {	
			// Check if (in order) removed, disabled, highlighted
			if (GM_getValue('r' + topicID, -1) != -1 && !showRemoved) {
				rows[i].parentNode.removeChild(rows[i]);
				i--;
				continue;
			} 
			if (GM_getValue('d' + topicID, -1) != -1) {
				disabled = true;
				rows[i].style.opacity = 0.5;
			}
			
			if (GM_getValue('h' + topicID, -1) != -1) {
				highlighted = true;
				highlightRow(rows[i], true);
			}
			
			// Are there unread? Does the link actually need to be to the next page?
			if (!disabled && cells[2].getElementsByTagName('a').length != 0) {
				var newposts = parseInt(cells[2].getElementsByTagName('a')[0].innerHTML.replace('+', ''));
				var newPostsURL = cells[2].getElementsByTagName('a')[0].href;
				var allPosts = cells[2].innerHTML.split('<span')[0];
				if ((allPosts - newposts) % 50 == 0 && newPostsURL.indexOf('page') != -1) {
					var regex = new RegExp("[\\?&]page=([^&#]*)");
					var pageHunt = regex.exec(newPostsURL);
					var nextPage = parseInt(pageHunt[1]);
					newPostsURL = newPostsURL.replace('page=' + nextPage, 'page=' + (nextPage + 1));
				}				
				unreadTopics.push(newPostsURL);
			}
			
			
			
			// Create links in date column
			
			var removeLink = document.createElement('a');
			removeLink.appendChild(document.createTextNode('X'));
			removeLink.style.color = 'red';
			removeLink.id = 'r' + topicID;
			removeLink.addEventListener('mouseover', coolCursor, true);
			removeLink.addEventListener('click', removeTopic, true);
			removeLink.setAttribute('title', 'Click to remove this topic');
			
			var disableLink = document.createElement('a');
			disableLink.appendChild(document.createTextNode('D'));
			disableLink.style.color = 'blue';
			disableLink.id = 'd' + topicID;
			disableLink.addEventListener('mouseover', coolCursor, true);
			disableLink.addEventListener('click', disableTopic, true); 
			disableLink.setAttribute('title', 'Click to disable this topic');
			
			var highlightLink = document.createElement('a');
			highlightLink.appendChild(document.createTextNode('H'));
			highlightLink.style.color = 'green';
			highlightLink.id = 'h' + topicID;
			highlightLink.addEventListener('mouseover', coolCursor, true);
			highlightLink.addEventListener('click', highlightTopic, true);
			highlightLink.setAttribute('title', 'Click to highlight this topic');
			
			
			datecell.appendChild(document.createTextNode(' '));
			datecell.appendChild(removeLink);
			datecell.appendChild(document.createTextNode(' '));
			datecell.appendChild(disableLink);
			datecell.appendChild(document.createTextNode(' '));
			datecell.appendChild(highlightLink);
		}
		
		
	}
	
	if (!onlyOnPosted || (document.location.href.toLowerCase().indexOf("posted") != -1 && document.location.href.toLowerCase().indexOf("-posted") == -1)) {
		
		updateUnreadTopics();
	}
	
	// Get URL to next page
	var infobars = getElementsByClass('infobar', doc, 'div');
	if (infobars[infobars.length - 2].getElementsByTagName('a')[0] != null) {
		nextPageURL = infobars[infobars.length-2].getElementsByTagName('a')[0].href;
	} else {
		noNextPage = true;
	}
		
	
}

function processNewPage(XML) {
	var newPage = document.createElement("div");
	newPage.innerHTML = XML;
	processPage(newPage);
	var newRows = newPage.getElementsByTagName("tr");

	var newTr = document.getElementById('newTr');
	while (newRows.length > 0) {
		topicsTable.tBodies[0].insertBefore(newRows[0], newTr);
	}
}

function loadNextPage() {
	document.removeEventListener('scroll', scrollCheck, true);
	
	var newTr = document.createElement("tr");
	newTr.id = "newTr";
	newTr.className = "r0";
	topicsTable.tBodies[0].appendChild(newTr);

	var newTd = document.createElement("td");
	newTd.setAttribute("colspan", "4");
	newTd.style.textAlign = "center";
	newTd.style.padding = "5px 0";
	newTd.style.fontSize = "11px";
	newTr.appendChild(newTd);
	
	var loadingSpan = document.createElement("span");
	loadingSpan.innerHTML = "Loading next page... ";
	
	var loadingImg = new Image();
	loadingImg.src = 'data:image/gif;base64,R0lGODlhEAAQAPIAAP///2Zm/9ra/o2N/mZm/6Cg/rOz/r29/iH/C05FVFNDQVBFMi4wAwEAAAAh/hpD' +
		'cmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi6' +
		'3P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKp' +
		'ZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJU' +
		'lIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAAD' +
		'Mgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsR' +
		'kAAAOwAAAAAAAAAAAA==';
	newTd.appendChild(loadingSpan);
	newTd.appendChild(loadingImg);
	
	
	var ajax = new XMLHttpRequest();
	ajax.open('GET', nextPageURL, true);
	ajax.send(null);
	ajax.onreadystatechange = function() {
		if (ajax.readyState == 4) {
			if (ajax.status == 200) {
				processNewPage(ajax.responseText);
				
			} else {
				alert("An error occurred loading the next page. Fuck.");
			}
		}
	}	
	
	window.setTimeout(function() {		
		newTr.parentNode.removeChild(newTr);
		document.addEventListener('scroll', scrollCheck, true);	
	}, 5000);
	
}

// Checks if at bottom of page
function scrollCheck() {
	if ((window.pageYOffset + window.innerHeight) >= document.body.clientHeight) {
		loadNextPage();
	}
}

if (autoScroll) {
	document.addEventListener('scroll', scrollCheck, true);
}
processPage(document);
