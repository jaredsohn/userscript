//==============================================================================
// This script is provided under the terms of the GNU General Public License, 
// version 2, which can be found at
//   http://www.gnu.org/copyleft/gpl.html
// Specifically, note that this script comes with NO guarantees, not even the 
// implied guarantee of merchantibility or fitness for a specific purpose.
//==============================================================================
//
// ==UserScript==
// @name          todban
// @namespace     http://userscripts.org/users/58766
// @description   Provides a killfile for The Oil Drum (http://theoildrum.com).
// @include       http://*.theoildrum.com/node/*
// ==/UserScript==

// Note: I think the namespace should be something better than example.com, 
// perhaps http://www.theoildrum.com.  This would break existing ban lists,
// though.

// Changelog:
// 	Greenman: initial release
//	stalkylittleboy:
// - moved number of hidden posts from alert() to story_info div.
// - changed some function names to be more descriptive
// - more efficient ban list checking and maintenance
//	Khebab:
// - Add functions for the user list menu
//	stalkylittleboy:
// - removed dead vars from getUserList(), changed to do 1 time caching
// - moved newHTML() into showUserList()
// - prettied up user list HTML a little
// - applies to all hosts in the domain theoildrum.com.
//
// - mbchandler:
// -- Changed the script so that it works with the new TOD DOM.
// -- Changes were made to the filterContent() function.
// -- Changed the showUserList() function to sort the user list alphabetically
// -- and to show banned users in a red font.
//==============================================================================

var	version = '20080710.09';
var	banList = null;
var	myUserList = null;
var	docTitle = null;

function banUser() {
	var	user;
	
	user = prompt('User to ban:', '');
	if (user) {
		getBanList();
		banList[user] = true;
		writeBanList();
	}
}

function getUserList() {
	var	divs, i, div, poster;

	if (myUserList == null) {	
		myUserList = {};

		divs = document.getElementsByTagName('div');
		for (i = 0 ; i < divs.length ; ++i) {
			div = divs[i];

			if (div.getAttribute('class') == 'summary')
				docTitle = div.getElementsByTagName('h2')[0].innerHTML;

			if (div.getAttribute('class') == 'comment') {
				poster = getPoster(div);
				if (poster in myUserList)
					++myUserList[poster];
				else
					myUserList[poster] = 1;
			}
		}
	}

	return myUserList;
}

function filterContent() {
	var	divs, i, div, poster;

	divs = document.getElementsByTagName('div');
	for (i = 0 ; i < divs.length ; ++i) {
		div = divs[i];

		if (div.getAttribute('class') == 'comment') {
			poster = getPoster(div);
			
			if (shouldHidePoster(poster)) {
				div.style.display = 'none';
			}

		}

//		if (div.getAttribute('class') == 'indented') {
//			poster = getPoster(div);
//			
//			if (shouldHidePoster(poster)) {
//				div.style.display = 'none';
//			}
//
//		}

	}

}

function getBanList() {
	var	userArray, u;

	if (banList == null) {
		banList = {};
		
		userArray = GM_getValue('UserList', ';').split(';');
		for (u in userArray) {
			if (userArray[u])
				banList[userArray[u]] = true;
		}
	}

	return banList;
}


function getPoster(div) {
	var	spans, i, span;

	spans = div.getElementsByTagName('span');
	for (i = 0 ; i < spans.length ; ++i)
		if (spans[i].getAttribute('class') == 'username')
			return spans[i].getElementsByTagName('a')[0].innerHTML;

	return '';
}

function writeBanList() {
	var	userList, u;

	userList = ';';

	if (banList)
		for (u in banList)
			userList += u + ';';

	GM_setValue('UserList', userList);
}

function shouldHidePoster(poster) {
	return (poster in getBanList());
}

function posterPresent(poster) {
	return (poster in getUserList());
}

function showBanList() {
	var	list = '', u;

	for (u in getBanList())
		list += u + '\n';

	if (list)
		alert('Banned users:\n' + list);
	else
		alert('No users are banned');
}

function showUserList() {
	var	u = null, HTMLstring, newWindow, newDocument, i=0;
	var	userArray=[]

	// this odd construct leaves u null if getUserList() returns an empty Object
	for (u in getUserList()) {
		break;
	}

	if (u) {
		HTMLstring = '<HTML>\n' +
					'<HEAD><TITLE>TOD: User List</TITLE></HEAD>\n' +
					'<BODY>\n' +
					'<h2>' + docTitle + '</h2>\n' +
					'<table border=1 cellspacing=0 cellpadding=2>\n' +
					'<tr><td align=center>User</td><td align=center>Posts</td><td align=center>Banned?</td></tr>';



		for (u in getUserList()) {
			userArray[i] = u;
			i++;
		}

		userArray.sort(function(x,y){ 
		      var a = String(x).toUpperCase(); 
		      var b = String(y).toUpperCase(); 
		      if (a > b) 
		         return 1 
		      if (a < b) 
		         return -1 
		      return 0; 
		});


		for (i = 0 ; i < userArray.length ; ++i) {
				HTMLstring += '<tr>' +
					'<td><a href="http://www.theoildrum.com/user/' + userArray[i] + '">' +  (shouldHidePoster(userArray[i]) ? '<FONT COLOR=RED><b>' +userArray[i] + '</b></FONT>' :userArray[i] ) + '</a></td>' +
					'<td>' + (shouldHidePoster(userArray[i]) ? '<FONT COLOR=RED><b>' + myUserList[userArray[i]] + '</b></FONT>' : myUserList[userArray[i]] ) + '</td>' +
					'<td align=center>' + (shouldHidePoster(userArray[i]) ? '<FONT COLOR=RED><b>Yes</b></FONT>' : 'No') + '</td>' +
					'</tr>';
		}

		HTMLstring += '</table>\n' +
					'</BODY>\n' +
					'</HTML>';

		newWindow = window.open();
		newDocument = newWindow.document;
		newDocument.write(HTMLstring);
		newDocument.close();
	} else
		alert('No users.');
}

function showNumHidden(numHidden) {
	var	divs, i, as, j;

	divs = document.getElementsByTagName('div');
	for (i = 0 ; i < divs.length ; ++i)
		if (divs[i].getAttribute('class') == 'story_info') {
			as = divs[i].getElementsByTagName('a');
			as[0].innerHTML += ' (' + numHidden + ' hidden)';
		}
}

function unbanUser() {
	var	user;
	
	user = prompt('User to unban:', '');
	if (user) {
		getBanList();
		if (user in banList) {
			delete banList[user];
			writeBanList();
		} else
			alert('Error: user "' + user + '" is not banned.');
	}
}

//==============================================================================

GM_registerMenuCommand("Ban user's posts.", banUser);
GM_registerMenuCommand('Unban user.', unbanUser);
GM_registerMenuCommand('Show banned users.', showBanList);
GM_registerMenuCommand('Show users.', showUserList);

filterContent();
