// ==UserScript==
// @name        YouTube - Export Favorites List to HTML
// @description	Adds an export button to this page: http://www.youtube.com/my_favorites. You must rename the file extension to html.
// @namespace   ttt
// @include     https://www.youtube.com/my_favorites*
// @include     http://www.youtube.com/my_favorites*
// @version     1
// ==/UserScript==

// TODO:	store thumbnails (using the data protocol)
//			add the remaining meta data
//			full description
//			non-favorite lists
//			I probably won't do any of this

// open tab with encoding set to something that's downloadable
function exportPlaylist() {
	var pageNav = document.getElementsByClassName('yt-uix-pager')[0], plObject = {};
	for each (var lnk in pageNav.childNodes) { // not sure if this is correct
		if (lnk.tagName === 'A') {
			plObject[lnk.getAttribute('data-page')] = lnk.href;
		}
	}
	
	var htmlNode = document.createElement('html');
	var htmlBody = htmlNode.appendChild(document.createElement('body'));
	var objKeys = Object.keys(plObject).sort(function(a,b) a>b), refCount = objKeys.length;
	// create some empty child nodes so we can put the pages in the right order
	for (var i=0; i<objKeys.length; i++) {
		htmlBody.appendChild(document.createElement('fakenode'));
	}
	// request all the pages
	for (var k in objKeys) {
		GM_xmlhttpRequest({
			method: 'GET',
			url: plObject[objKeys[k]],
			headers: {
				"Accept":"text/html"
			},
			onload: function(ind) {
				return function(response) {
					var elem = new DOMParser().parseFromString(response.responseText, "text/html");
					// create links for this page
					var pageNode = exportPlaylistPage(elem),
						hTitle = document.createElement('h1');
					hTitle.appendChild(document.createTextNode('Page ' + ind));
					pageNode.insertBefore(hTitle, pageNode.firstChild);
					htmlBody.replaceChild(pageNode, htmlBody.childNodes[ind]);
					refCount--;
				};
			}(k)
		});
	}
	setTimeout(function thisFunc() {
		// reset the timer if all pages have not been downloaded yet. (No, I'm not gonna use setInterval. Shut up.)
		if (refCount > 0) {
			setTimeout(thisFunc, 5);
		} else {
			GM_openInTab('data:data/html;base64,' + btoa(unescape(encodeURIComponent(htmlNode.outerHTML))));
		}
	}, 5);
}
function exportPlaylistPage(document) {
	var vidInfoTree = document.getElementsByClassName('vm-video-info-container');
	var newDocument = document.createElement('div');

	for each (var vidInf in vidInfoTree) {
		if (vidInf.tagName !== 'DIV')
			continue;
		// add the desc, date etc to dd/dt tags
		var subDiv = document.createElement('dl');
		//subDiv.style.backgroundColor='#eee';
		// add vid link
		var link = document.createElement('a');
		link.appendChild(document.createTextNode(vidInf.getElementsByClassName('vm-video-title-content')[0].textContent.trim()));
		link.href = vidInf.getElementsByClassName('vm-video-title-content')[0];
		subDiv.appendChild(document.createElement('dt')).appendChild(document.createTextNode('Video'));
		subDiv.appendChild(document.createElement('dd')).appendChild(link);
		// get descs
		var infoSubElems = vidInf.getElementsByClassName('vm-video-info');
		subDiv.appendChild(document.createElement('dt')).appendChild(document.createTextNode('Uploaded'));
		subDiv.appendChild(document.createElement('dd')).appendChild(document.createTextNode(infoSubElems[1].textContent.trim()));
		var userLink = document.createElement('a');
		userLink.appendChild(document.createTextNode(infoSubElems[2].textContent.trim()));
		userLink.href = infoSubElems[2].getElementsByTagName('a')[0].href;
		subDiv.appendChild(document.createElement('dt')).appendChild(document.createTextNode('Uploader'));
		subDiv.appendChild(document.createElement('dd')).appendChild(userLink);
		subDiv.appendChild(document.createElement('dt')).appendChild(document.createTextNode('Description'));
		subDiv.appendChild(document.createElement('dd')).appendChild(document.createTextNode(infoSubElems[0].textContent.trim()));
		// add the dl to the doc body
		newDocument.appendChild(subDiv);
		newDocument.appendChild(document.createTextNode('\r\n'));
	}
	return newDocument;
}

if (document.getElementById('vm-video-list-container')) {
	// create an export button and add it next to the playlist actions thingy
	var newButton = document.createElement('button');
	newButton.className=' yt-uix-button yt-uix-button-hh-default';
	//newButton.role = 'button';
	//newButton.type = 'button';
	newButton.style.color='#050';
	var buttonContent = document.createElement('span');
	buttonContent.className = 'yt-uix-button-content';
	buttonContent.appendChild(document.createTextNode('Export playlist to file'));
	document.getElementById('vm-video-actions-inner').appendChild(newButton.appendChild(buttonContent) && newButton);

	// make the button execute the export script
	newButton.addEventListener('click', function() {
		exportPlaylist();
		return false;
	});
}