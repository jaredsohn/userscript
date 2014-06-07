//
//           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
//                   Version 2, December 2004
// 
//  Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>
//
//  Everyone is permitted to copy and distribute verbatim or modified
//  copies of this license document, and changing it is allowed as long
//  as the name is changed.
//
//           DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
//  TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
// 
//  0. You just DO WHAT THE FUCK YOU WANT TO.
// =====================================================================
//
// greasemonkey script written by: chuck @ utopiaforums
// www.utopiaforums.com
//
// ==UserScript==
// @name           	UPnuffsaid
// @namespace      	http://www.utopiaforums.com/UPnuffsaid
// @description    	Make morons STFU
// @include        	http://www.utopiaforums.com/boardthread*
// @include             http://atarchive.gotdns.org:8080/UtopiaForums/boardthread*
// ==/UserScript==

function onLoadingOfPage() {
	window.setBlockedPanel.name = 'setBlockedPanel';
	window.setBlockedPanel.style.position = 'absolute';
	window.setBlockedPanel.style.textAlign = 'left';
	window.setBlockedPanel.style.padding = '1px';
	window.setBlockedPanel.style.backgroundColor = '#eeeeee';
	window.setBlockedPanel.style.color = '#111111';
	window.setBlockedPanel.style.border = 'none';
	window.setBlockedPanel.style.zIndex = 1000005;
	document.body.appendChild(window.setBlockedPanel);
	document.body.style.backgroundColor = '#000000';
	
	document.body.appendChild(window.opaqueBackground);
	window.opaqueBackground.style.backgroundColor = '#111111';
	window.opaqueBackground.style.position = 'absolute';
	window.opaqueBackground.style.left = 0;
	window.opaqueBackground.style.top = 0;
	window.opaqueBackground.style.width = '100%';
	window.opaqueBackground.style.height = document.body.scrollHeight;
	//window.opaqueBackground.style.opacity = .8;
	window.opaqueBackground.style.zIndex = -1;

	hideSetBlockedPanel();
	
	populateBlockedLists();
	
	var i=0;
	for (i=0; i < tableCells.length; i++) {	
		if (window.tableCells[i].bgColor == '#000033') {
			
			var tempName = window.tableCells[i].innerHTML.substr(4, window.tableCells[i].innerHTML.indexOf('<br>') - 5);
			var tempAuth = '<b><a name="' + tempName.toLowerCase() + '">' + tempName + '</a></b>' +
							window.tableCells[i].innerHTML.substr(window.tableCells[i].innerHTML.indexOf('<br>'),
							window.tableCells[i].innerHTML.length - window.tableCells[i].innerHTML.indexOf('<br>'));
			var tempPost = window.tableCells[i+1].innerHTML;
			
			// Redraw the cells
			window.tableCells[i].innerHTML 	 = 	tempAuth;
			window.tableCells[i+1].innerHTML = 	tempPost;

			// package all the information that will constitute one item in window.originalPosts as an array
			tempA = new Array(i, tempName.toLowerCase(), tempAuth, tempPost);
							  
			window.originalPosts.push(tempA);
			
			var j=0;
			for(j=0; j < window.blocked.length; j++) {
				if (tempA[1] == window.blocked[j]) {
					hideOriginalPost(i);
				}
			}
			
			j=0;
			for(j=0; j < window.blockedThread.length; j++) {
				if (tempA[1] == window.blockedThread[j]) {
					hideOriginalPost(i);
				}
			}
			
			j=0;
			for(j=0; j < window.unblockedThread.length; j++) {
				if (tempA[1] == window.unblockedThread[j]) {
					// Posters blocked everywhere except this thread will be treated as
					// blocked posters with coloration; the only difference will be their
					// posts will be automatically expanded with a hide button vs
					// hidden with an expand button.
					hideOriginalPost(i);
					showOriginalPost(i);
				}
			}
		}
	}
	
	updateBindings();
}

function populateBlockedLists() {
	pageURL = document.location.href;
	if (pageURL.indexOf('&time=') !== -1) {
		
		window.threadNum = pageURL.substr(pageURL.indexOf('&thread=') + 8, pageURL.indexOf('&time') - (pageURL.indexOf('&thread=') + 8));
	
	} else {
		
		window.threadNum = pageURL.substr(pageURL.indexOf('&thread=') + 8, pageURL.length - (pageURL.indexOf('&thread=') + 8));
	}

	if (GM_getValue(window.threadNum) !== undefined) {
		
		window.blockedThread = GM_getValue(window.threadNum).split(',');
	}

	if (GM_getValue('u' + window.threadNum) !== undefined) {
		
		window.unblockedThread = GM_getValue('u' + window.threadNum).split(',');
	}

	if (GM_getValue('blocked') !== undefined) {
	
		window.blocked = GM_getValue('blocked').split(',');
	}
}

function toggleBlockedStatus(event) {
	hideSetBlockedPanel();
	
	if (event.target.id == 'unblock') {
	
		unblockUser(event.target.name);
	
	} else if (event.target.id == 'block') {
		
		blockUser(event.target.name);
	
	} else if (event.target.id == 'unblockThread') {
		
		threadUnblockUser(event.target.name);
	
	} else if (event.target.id == 'blockThread') {
		
		threadBlockUser(event.target.name);
	}

	updateBindings();
}

function showSetBlockedPanel (event) {
	var userName = event.target.innerHTML;
	var currentlyBlocked = false;
	var currentlyThreadBlocked = false;
	var currentlyThreadUnblocked = false;
	
	var blockedIndex = 0;
	for (blockedIndex = 0; blockedIndex < window.blocked.length; blockedIndex++) {
		if (userName.toLowerCase() == window.blocked[blockedIndex]) {
			
			currentlyBlocked = true;
		}
	}
	
	var blockedThreadIndex = 0;
	for (blockedThreadIndex = 0; blockedThreadIndex < window.blockedThread.length; blockedThreadIndex++) {
		if (userName.toLowerCase() == window.blockedThread[blockedThreadIndex]) {
			
			currentlyThreadBlocked = true;
		}
	}
	
	var unblockedThreadIndex = 0;
	for (unblockedThreadIndex = 0; unblockedThreadIndex < window.unblockedThread.length; unblockedThreadIndex++) {
		if (userName.toLowerCase() == window.unblockedThread[blockedThreadIndex]) {
			
			currentlyThreadUnblocked = true;
		}
	}
	
	var userGoHere = document.createElement('a');
	userGoHere.innerHTML = '<b>' + userName + '</b>';
	window.blockingForm.appendChild(userGoHere);
	window.blockingForm.appendChild(document.createElement('br'));
	
	if (currentlyBlocked) {
	
		var unblockButton = document.createElement('button');
		unblockButton.id = 'unblock';
		unblockButton.type = 'button';
		unblockButton.name = userName.toLowerCase();
		unblockButton.innerHTML = 'Unblock';
		unblockButton.style.width = '130px';
		unblockButton.addEventListener("click", toggleBlockedStatus, false);
		window.blockingForm.appendChild(unblockButton);
		window.blockingForm.appendChild(document.createElement('br'));
		
	} else {
	
		var blockButton = document.createElement('button');
		blockButton.id = 'block';
		blockButton.type = 'button';
		blockButton.name = userName.toLowerCase();
		blockButton.innerHTML = 'Block';
		blockButton.style.width = '130px';
		blockButton.addEventListener("click", toggleBlockedStatus, false);
		window.blockingForm.appendChild(blockButton);
		window.blockingForm.appendChild(document.createElement('br'));
	}
	
	if ((currentlyBlocked && !currentlyThreadUnblocked) || (currentlyThreadBlocked)) {
	
		var threadUnblockButton = document.createElement('button');
		threadUnblockButton.id = 'unblockThread';
		threadUnblockButton.type = 'button';
		threadUnblockButton.name = userName.toLowerCase();
		threadUnblockButton.innerHTML = 'Unblock in Thread';
		threadUnblockButton.style.width = '130px';
		threadUnblockButton.addEventListener("click", toggleBlockedStatus, false);
		window.blockingForm.appendChild(threadUnblockButton);
		
	} else {
	
		var threadBlockButton = document.createElement('button');
		threadBlockButton.id = 'blockThread';
		threadBlockButton.type = 'button';
		threadBlockButton.name = userName.toLowerCase();
		threadBlockButton.innerHTML = 'Block in Thread';
		threadBlockButton.style.width = '130px';
		threadBlockButton.addEventListener("click", toggleBlockedStatus, false);
		window.blockingForm.appendChild(threadBlockButton);
	}	
		
	window.opaqueBackground.addEventListener("click", hideSetBlockedPanel, false);
	window.opaqueBackground.style.zIndex = 1000004;
	window.opaqueBackground.style.opacity = .8;
	
	window.setBlockedPanel.style.left = Math.round(window.innerWidth / 2) - 306;
	window.setBlockedPanel.style.top = event.clientY + document.body.scrollTop - 8;
	window.setBlockedPanel.style.visibility = 'visible';
	
	//window.blockingForm.firstChild.nextSibling.nextSibling.focus();
}

function hideSetBlockedPanel () {
	while(window.blockingForm.hasChildNodes()) {
		window.blockingForm.removeChild(window.blockingForm.firstChild);
	}
	
	//window.setBlockedPanel.style.width = '5px';
	//window.setBlockedPanel.style.height = '5px';
	window.setBlockedPanel.style.visibility = 'hidden';
	window.setBlockedPanel.style.left = '-500px';
	window.setBlockedPanel.style.top = '-500px';
	window.opaqueBackground.style.zIndex = -1;
	window.opaqueBackground.style.opacity = 0;
}

function blockUser(userName) {
	window.blocked.push(userName.toLowerCase());
	GM_deleteValue('blocked');
	GM_setValue('blocked', window.blocked.toString());
	
	var blockedThreadIndex = 0;
	for (blockedThreadIndex = 0; blockedThreadIndex < window.blockedThread.length; blockedThreadIndex++) {
		
		if (userName.toLowerCase() == window.blockedThread[blockedThreadIndex]) {
			
			window.blockedThread.splice(blockedThreadIndex, 1);
			GM_deleteValue(window.threadNum);
			if(window.blockedThread.length !== 0) {
				
				GM_setValue(window.threadNum, window.blockedThread.toString());
			}
		}
	}
	
	var unblockedThreadIndex = 0;
	for (unblockedThreadIndex = 0; unblockedThreadIndex < window.unblockedThread.length; unblockedThreadIndex++) {
	
		if (userName.toLowerCase() == window.unblockedThread[unblockedThreadIndex]) {
		
			window.unblockedThread.splice(unblockedThreadIndex, 1);
			GM_deleteValue('u' + window.threadNum);
			if (window.unblockedThread.length !== 0) {
			
				GM_setValue('u' + window.threadNum, window.unblockedThread.toString());
			}
		}
	}
	
	var postIndex = 0;
	for (postIndex = 0; postIndex < window.originalPosts.length; postIndex++) {
	
		if (window.originalPosts[postIndex][1] == userName.toLowerCase()) {
		
			window.tableCells[window.originalPosts[postIndex][0]].style.backgroundColor = '#eeeeee';
			window.tableCells[window.originalPosts[postIndex][0]].style.color = '#111111';
			window.tableCells[window.originalPosts[postIndex][0] + 1].style.backgroundColor = '#eeeeee';
			window.tableCells[window.originalPosts[postIndex][0] + 1].style.color = '#111111';
			hideOriginalPost(window.originalPosts[postIndex][0]);
		}
	}
	
	updateBindings();
}

function threadBlockUser(userName) {
	window.blockedThread.push(userName.toLowerCase());
	GM_deleteValue(window.threadNum);
	GM_setValue(window.threadNum, window.blockedThread.toString());

	var unblockedThreadIndex = 0;
	for (unblockedThreadIndex = 0; unblockedThreadIndex < window.unblockedThread.length; unblockedThreadIndex++) {
	
		if (userName.toLowerCase() == window.unblockedThread[unblockedThreadIndex]) {
		
			window.unblockedThread.splice(unblockedThreadIndex, 1);
			GM_deleteValue('u' + window.threadNum);
			if (window.unblockedThread.length !== 0) {
			
				GM_setValue('u' + window.threadNum, window.unblockedThread.toString());
			}
		}
	}
	
	var postIndex = 0;
	for (postIndex = 0; postIndex < window.originalPosts.length; postIndex++) {
	
		if (window.originalPosts[postIndex][1] == userName.toLowerCase()) {
		
			hideOriginalPost(window.originalPosts[postIndex][0]);
		}
	}
}

function unblockUser(userName) {
	var blockedIndex = 0;
	for (blockedIndex = 0; blockedIndex < window.blocked.length; blockedIndex++) {
		if (window.blocked[blockedIndex] == userName.toLowerCase()) {
		
			window.blocked.splice(blockedIndex, 1);
			GM_deleteValue('blocked');
			if (window.blocked.length !== 0) {
			
				GM_setValue('blocked', window.blocked.toString());
			}
		}
	}
	
	var unblockedThreadIndex = 0;
	for (unblockedThreadIndex = 0; unblockedThreadIndex < window.unblockedThread.length; unblockedThreadIndex++) {
	
		if (userName.toLowerCase() == window.unblockedThread[unblockedThreadIndex]) {
		
			window.unblockedThread.splice(unblockedThreadIndex, 1);
			GM_deleteValue('u' + window.threadNum);
			if (window.unblockedThread.length !== 0) {
			
				GM_setValue('u' + window.threadNum, window.unblockedThread.toString());
			}
		}
	}
	
	var blockedThreadIndex = 0;
	for (blockedThreadIndex = 0; blockedThreadIndex < window.blockedThread.length; blockedThreadIndex++) {
		
		if (window.blockedThread[blockedThreadIndex] == userName.toLowerCase()) {
		
			window.blockedThread.splice(blockedThreadIndex, 1);
			GM_deleteValue(window.threadNum);
			GM_setValue(window.threadNum, window.blockedThread.toString());
		}
	}
	
	var postIndex = 0;
	for (postIndex = 0; postIndex < window.originalPosts.length; postIndex++) {
		
		if (window.originalPosts[postIndex][1] == userName.toLowerCase()) {
		
			window.tableCells[window.originalPosts[postIndex][0]].style.backgroundColor = '#000033';
			window.tableCells[window.originalPosts[postIndex][0]].style.color = '#eeeeee';
			window.tableCells[window.originalPosts[postIndex][0] + 1].style.backgroundColor = '#2B3849';
			window.tableCells[window.originalPosts[postIndex][0] + 1].style.color = '#eeeeee';
			window.tableCells[window.originalPosts[postIndex][0] + 1].innerHTML = window.originalPosts[postIndex][3];
			showOriginalPost(window.originalPosts[postIndex][0]);
			removeHideButton(window.originalPosts[postIndex][0] + 1);
		}
	}
}

function threadUnblockUser(userName) {

	var blockedThreadIndex = 0;
	for (blockedThreadIndex = 0; blockedThreadIndex < window.blockedThread.length; blockedThreadIndex++) {
		
		if (userName.toLowerCase() == window.blockedThread[blockedThreadIndex]) {
			var posts = 0;
			for(posts = 0; posts < window.originalPosts.length; posts++) {
				if (window.originalPosts[posts][1] == userName.toLowerCase()) {
					showOriginalPost(window.originalPosts[posts][0]);
				}
			}
			
			window.blockedThread.splice(blockedThreadIndex, 1);
			GM_deleteValue(window.threadNum);
			if(window.blockedThread.length !== 0) {
				GM_setValue(window.threadNum, window.blockedThread.toString());
			}
		}
	}
		
	var boardBlocked = false;	
	var blockedIndex = 0;
	for (blockedIndex = 0; blockedIndex < window.blocked.length; blockedIndex++) {
		
		if (userName.toLowerCase() == window.blocked[blockedIndex]) {
			
			boardBlocked = true;
		}
	}
	
	if (boardBlocked) {
	
		window.unblockedThread.push(userName.toLowerCase());
		GM_deleteValue('u' + window.threadNum);
		GM_setValue('u' + window.threadNum, window.unblockedThread.toString());
		var postIndex = 0;
		for (postIndex = 0; postIndex < window.originalPosts.length; postIndex++) {
			
			if(window.originalPosts[postIndex][1] == userName.toLowerCase()) {
			
				hideOriginalPost(window.originalPosts[postIndex][0]);
				showOriginalPost(window.originalPosts[postIndex][0]);
			}
		}
		
	} else {
		var blockedThreadIndex = 0;
		for (blockedThreadIndex = 0; blockedThreadIndex < window.blockedThread.length; blockedThreadIndex++) {
			
			if (window.blockedThread[blockedThreadIndex] == userName.toLowerCase()) {
			
				window.blockedThread.splice(blockedThreadIndex, 1);
				GM_deleteValue(window.threadNum);
				GM_setValue(window.threadNum, window.blockedThread.toString());
			}
		}
		
		var postIndex = 0;
		for (postIndex = 0; postIndex < window.originalPosts.length; postIndex++) {
			
			if (window.originalPosts[postIndex][1] == userName.toLowerCase()) {
			
				window.tableCells[window.originalPosts[postIndex][0]].style.backgroundColor = '#000033';
				window.tableCells[window.originalPosts[postIndex][0]].style.color = '#eeeeee';
				window.tableCells[window.originalPosts[postIndex][0] + 1].style.backgroundColor = '#2B3849';
				window.tableCells[window.originalPosts[postIndex][0] + 1].style.color = '#eeeeee';
				window.tableCells[window.originalPosts[postIndex][0] + 1].innerHTML = window.originalPosts[postIndex][3];
				showOriginalPost(window.originalPosts[postIndex][0]);
				removeHideButton(window.originalPosts[postIndex][0] + 1);
			}
		}
	}
}

// Catches the event passed when clicking the Expand Button. Invokes showOriginalPost(postToShow)
function showOriginalPostFromEvent(event) {
	showOriginalPost(parseInt(event.target.value));
}

// Contains the actual logic for showing the original post
function showOriginalPost(postToShow) {
	var startOfContent = window.originalPosts[postToShow/2][3].indexOf('<br><b>') + 7;
	window.tableCells[postToShow + 1].innerHTML = window.originalPosts[postToShow/2][3].substr(0, startOfContent) + 
												'<button type="button" name="hide" value="'+postToShow+'">Hide</button><br>' +
												window.originalPosts[postToShow/2][3].substr(startOfContent);
													
	updateBindings();
}

// Only called when a user is unblocked
function removeHideButton(postInQuestion) {
	var startCut = window.tableCells[postInQuestion].innerHTML.indexOf('<br><b>') + 7;
	var endCut = window.tableCells[postInQuestion].innerHTML.indexOf('</button><br>') + 12;
	window.tableCells[postInQuestion].innerHTML = window.tableCells[postInQuestion].innerHTML.substr(0, startCut) +
													window.tableCells[postInQuestion].innerHTML.substr(endCut);
}

// Catches the event passed when clicking the Hide Button. Invokes hideOriginalPost(postToHide)
function hideOriginalPostFromEvent(event) {
	hideOriginalPost(parseInt(event.target.value));
}

// Contains the actual logic for hiding the original post
function hideOriginalPost(postToHide) {
	var cutToThisIndex = window.tableCells[postToHide+1].innerHTML.indexOf('<br><b>')+7;
	
	if (window.tableCells[postToHide+1].innerHTML.indexOf('<br><butt') != -1) {
		cutToThisIndex = window.tableCells[postToHide+1].innerHTML.indexOf('<br><butt');
	}
	
	window.tableCells[postToHide].style.backgroundColor = '#eeeeee';
	window.tableCells[postToHide].style.color = '#111111';
	window.tableCells[postToHide+1].style.backgroundColor = '#eeeeee';
	window.tableCells[postToHide+1].style.color = '#111111';
	window.tableCells[postToHide + 1].innerHTML = tableCells[postToHide + 1].innerHTML.substr(0, cutToThisIndex) + 
												'<button type="button" name="expand" value="'+postToHide+'">Expand</button>';
	
	updateBindings();
}

function updateBindings() {
	window.expandBtn.length = 0;
	window.hideBtn.length = 0;
	
	window.expandBtn = document.getElementsByName('expand');
	var expandBtnIndex = 0;
	for (expandBtnIndex = 0; expandBtnIndex < window.expandBtn.length; expandBtnIndex++) {
		window.expandBtn[expandBtnIndex].addEventListener("click", showOriginalPostFromEvent, false);
	}
	
	window.hideBtn = document.getElementsByName('hide');
	var hideBtnIndex = 0;
	for (hideBtnIndex = 0; hideBtnIndex < window.hideBtn.length; hideBtnIndex++) {
		window.hideBtn[hideBtnIndex].addEventListener("click", hideOriginalPostFromEvent, false);
	}
	
	var postersIndex = 0;
	for (postersIndex = 0; postersIndex < window.originalPosts.length; postersIndex++) {
		var postsInThreadBy = document.getElementsByName(window.originalPosts[postersIndex][1]);
				
		var post = 0;
		for (post = 0; post < postsInThreadBy.length; post++) {
			postsInThreadBy[post].addEventListener("click", showSetBlockedPanel, false);
		}
	}
}




// Layout of originalPosts array is (posters_tableCell_num, poster, poster_innerHTML, post_innerHTML)
window.originalPosts = new Array();

// Array containing all td objects in the page. Not all of these are posts/author tds.
window.tableCells = document.getElementsByTagName('td');

// The setBlockedPanel, where users will toggle block settings
window.setBlockedPanel = document.createElement('div');
window.blockingForm = document.createElement('form');
window.setBlockedPanel.appendChild(window.blockingForm);

// The opaque layer displayed while users toggle block settings
window.opaqueBackground = document.createElement('div');

// Blocked user arrays
window.blocked = new Array();
window.blockedThread = new Array();
window.unblockedThread = new Array();

// All expand buttons
window.expandBtn = new Array();

// All hide buttons
window.hideBtn = new Array();

// The thread number
window.threadNum = 0;

onLoadingOfPage();