// ==UserScript==
// @name          Bloglines sidebar tweaker
// @namespace     http://lieschke.net/projects/greasemonkey/
// @description   Squeezes the feeds in the Bloglines side panel so that as many as possible are visible at once. Removes the tabs at the top of the side panel. Moves the Add/Edit/Options links and Extras into a drop-down at the bottom of the feed tree. The sidebar display can be customised through the Tools --> User Script Commands menu. Adapted from http://www.allpeers.com/blog/downloads/bloglines-sidebar-squeezer.user.js
// @include       http*://*bloglines.com/myblogs
// @include       http*://*bloglines.com/myblogs_subs*
// ==/UserScript==

var RELOAD_MESSAGE = 'Please reload Bloglines for the change to take effect.';

function setSidebarWidth() {
	var width = prompt('Bloglines sidebar width (in pixels)');
	if (width == null ) return;
	width = parseInt(width);
	if (isNaN(width) || width <= 0) {
		alert('Sorry, that\'s not a valid width.');
		return;
	}
	GM_setValue('width', width);
	alert(RELOAD_MESSAGE);
}

function resetSidebarWidth() {
	GM_setValue('width', -1);
	alert(RELOAD_MESSAGE);
}

function hideTopLevelFolder() {
	GM_setValue('hideTopLevelFolder', confirm('Hide the top level folder?'));
	alert(RELOAD_MESSAGE);
}

function displayActionsAtTop() {
	GM_setValue('actionsAtTop', confirm('Display actions above the feed list?'));
	alert(RELOAD_MESSAGE);
}

if (GM_setValue && document.location.href.split('/').slice(-1) == 'myblogs') {
	GM_registerMenuCommand('Bloglines | Set sidebar width...', setSidebarWidth);
	GM_registerMenuCommand('Bloglines | Reset sidebar width to default', resetSidebarWidth);
	GM_registerMenuCommand('Bloglines | Set top level folder display...', hideTopLevelFolder);
	GM_registerMenuCommand('Bloglines | Set actions drop-down position...', displayActionsAtTop);
	return;
}

var selectStyle = 'margin: 0 0 5px 5px';
var sidebarWidth = GM_getValue('width', -1);
if (sidebarWidth != -1) {
	selectStyle += '; width: ' + Math.max(100, sidebarWidth - 50) + 'px';
	parent.document.getElementsByTagName('frameset')[0].cols = sidebarWidth + ',*';	
}

var navSelect = document.createElement('select');
navSelect.setAttribute('style', selectStyle);

var option = document.createElement('option');
option.innerHTML = 'Choose Action...';
navSelect.appendChild(option);

var navLinks = new Array();

function NavLink(link, openInBasefrm) {
	this.link = link;
	this.openInBasefrm = openInBasefrm;

	this.open = function() {
		if (this.openInBasefrm) {
			parent.frames[1].location.href = this.link;
		} else {
			document.location.href = this.link;
		}
	}
}

function DummyLink() {
	this.open = function() {}
}

function openLink() {
	navLinks[navSelect.selectedIndex].open();
	navSelect.selectedIndex = 0;
}

(function() {
	parent.document.getElementsByTagName('frame')[0].scrolling = 'auto';
	parent.document.getElementsByTagName('frame')[1].scrolling = 'auto';
	if (document.title == 'Bloglines | My Feeds') {
		navLinks.push(new DummyLink());

		/*
		// Can't get Show All to work :(
		if (GM_getValue('hideTopLevelFolder')) {
			var option = document.createElement('option');
			navLinks.push({open: function() {
					var event = document.createEvent('MouseEvents');
					event.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
					document.getElementById('treeltreeRoot').dispatchEvent(event);
				}});
			option.innerHTML = 'Show All';
			navSelect.appendChild(option);
		}
		*/

		for (var i = 0; i < document.links.length; i++) {
			if (document.links[i].className == 'navbar') {
				var option = document.createElement('option');
				navLinks.push(new NavLink(document.links[i].href, document.links[i].target == 'basefrm'));
				option.innerHTML = document.links[i].innerHTML;
				navSelect.appendChild(option);
			}
		}

		navSelect.addEventListener('change', openLink, true);

		var extras = document.evaluate("//*[@class = 'extras']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < extras.snapshotLength; i++) {
			extras.snapshotItem(i).style['display'] = 'none';
		}

		var divs = document.getElementsByTagName('div');
		for (var i = 0; i < divs.length; i++) {
			var divclass = divs[i].getAttribute('class');
			if (divclass == 'tabs' || divclass == 'hnav') {
				divs[i].style['display'] = 'none';
			} else if (divclass == 'header-list') {
				if (GM_getValue('hideTopLevelFolder')) {
					setTimeout("document.getElementById('treeltreeRoot').style.display = 'none'", 1000);
				}
				if (GM_getValue('actionsAtTop')) {
					document.getElementById('treeContainer').parentNode.insertBefore(navSelect, document.getElementById('treeContainer'));
				} else {
					document.body.appendChild(navSelect);
				}
			}
		}
	}
})();