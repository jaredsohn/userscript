// ==UserScript==
// @name            The Reiconizer for vBulletin
// @namespace       http://userscripts.org/scripts/show/62618
// @description     Changes/adds/removes user icons (avatars) and usernames on vBulletin.
// @copyright       2009-2010 by Ken Brazier
// @license         cc-by-3.0; http://creativecommons.org/licenses/by/3.0/
// @include         http://*/showthread.php?*
// @include         http://*/showpost.php?*
// @include         http://*/private.php?do=showpm*
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_registerMenuCommand
// ==/UserScript==

var iconPos = 1;	// 1 == after username; 0 == before username.
var maxWidth = '130px'; // Force icons to be no more than this wide.
var maxHeight = '100px';// Force icons to be no more than this tall.
// Icon options, which apply to defaultIcon and all the arrays with "icon" in their names:
// - '': Delete any icon present.  No icon at all.
// - 'auto': Replace icon with one of those given in autoIcons.  Does not apply inside autoIcons.
// - [a URL]: Replace icon or icons with the given image.
// - a data URL, of the form:
//	'data:image/<extension>;base64,<base64data>'
//   <extension> is usually "gif", "png", or "jpeg".
//   You can convert a file to the format for <base64data> at http://www.sveinbjorn.org/dataurlmaker
//   Then join all the lines together into a single string.
var defaultIcon = 'auto';	// Lowest priority, and used only in cases where the user did not choose their own icon.
var nameFor = new Object();	// Forces a user with a given ID to have a given name.  Respected by iconFor.
var iconFor = new Object();	// Icons listed here get top priority.
var iconSub = new Object();	// Icons listed here get priority over everything but iconFor.
var iconPathSub = new Object();	// Icons listed here get lowest priority.
var autoIcons = new Array();	// A list of icons used when an 'auto' icon is desired.

// Give a particular user (by ID) a particular username.
// HTML is allowed - but iconFor only sees the text outside any tags.
// Prepend '>' to add the given text after the original username.
// (To start a username with '>' you should use '&gt;').
// Examples:
//nameFor['42'] = 'one-who-is-the-answer';	// iconFor will only respect 'one-who-is-the-answer' (or 'uid=42') for user 42.
//nameFor['666'] = '><br/>(The Evil One)';	// Supposing this user was named 'Spawn', iconFor will only respect 'Spawn(The Evil One)' or 'uid=666'.

// Give a particular user a particular icon.  Top priority.
// Prepend 'uid=' to specify a user id instead of a username.
// Example: Gives me a little greasemonkey as default image.
//iconFor['Ken g6'] = 'http://wiki.greasespot.net/skins/common/images/pak-headbg.png';
// Example: Gives the new 'one-who-is-the-answer' a new icon without referring
//	    to his new name.  Thus anyone who was named 'one-who-is-the-answer'
// 	    before retains their old icon. (Also changes the icon of anyone
// 	    whose username is 'uid=42', but that's pretty unlikely.)
//iconFor['uid=42'] = 'http://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/42C.svg/100px-42C.svg.png';

// Substitute one icon for another, regardless of user.  Second priority after iconFor.
// Example:
// iconSub['http://forums.anandtech.com/images/avatars/dragonsfury/ava199.gif'] = 'http://forums.anandtech.com/images/avatars/dragonsfury/ava38.gif';
//
// Example - replace an icon with nothing (makes it prophetic!)
// iconSub['http://forums.anandtech.com/images/avatars/dragonsfury/ava108.gif'] = '';

// Substitute an entire path of icons for something else (e.g. 'auto').  Lowest priority.
/*
// Example: These two should eliminate all non-FT avatars on AnandTech Forums.
iconPathSub['http://forums.anandtech.com/images/avatars/dragonsfury/'] = defaultIcon;
iconPathSub['http://forums.anandtech.com/customavatars/'] = defaultIcon;
// You may also want:
iconSub['http://forums.anandtech.com/images/avatars/dragonsfury/ava61.gif'] = 'http://forums.anandtech.com/images/avatars/at/eagle.GIF';
// And you may want to substitute several of those images into dragon.gif.
*/

// Auto-substituted icons, when you request an 'auto' icon.  Icons are assigned by user's first letter.
autoIcons.push('http://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Alien_head.jpg/80px-Alien_head.jpg');
autoIcons.push('http://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Clyde_The_Bulldog.jpg/80px-Clyde_The_Bulldog.jpg');
autoIcons.push('http://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Radiation_symbol_alternate.svg/80px-Radiation_symbol_alternate.svg.png');
autoIcons.push('http://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Mushroom.svg/80px-Mushroom.svg.png');
autoIcons.push('http://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Gorilla_port_lympne1.jpg/120px-Gorilla_port_lympne1.jpg');
autoIcons.push('http://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Oncorhynchus_mykiss_mid_res_150dpi.jpg/120px-Oncorhynchus_mykiss_mid_res_150dpi.jpg');
autoIcons.push('http://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Cheetah.JPG/80px-Cheetah.JPG');
autoIcons.push('http://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/AmazonBlueFrontParrot.JPG/70px-AmazonBlueFrontParrot.JPG');
autoIcons.push('http://upload.wikimedia.org/wikipedia/commons/thumb/8/86/TUX-G2-SVG.svg/80px-TUX-G2-SVG.svg.png');
autoIcons.push('http://upload.wikimedia.org/wikipedia/commons/9/9f/Platypus_head.png');
autoIcons.push('http://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Green%2C_yellow_snake.jpg/120px-Green%2C_yellow_snake.jpg');
autoIcons.push('http://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Xmas_tree.svg/80px-Xmas_tree.svg.png');


// *** End of user-modifiable code ***
//   (Don't change the rest of this!)

// Begin Chrome compatibility code copyright 2009, 2010 James Campos
// Source: http://userscripts.org/topics/41177
if (typeof GM_getValue == 'undefined') {
/*
	GM_addStyle = function(css) {
		var style = document.createElement('style');
		style.textContent = css;
		document.getElementsByTagName('head')[0].appendChild(style);
	}

	GM_deleteValue = function(name) {
		localStorage.removeItem(name);
	}
*/
	GM_getValue = function(name, defaultValue) {
		var value = localStorage.getItem(name);
		if (!value)
			return defaultValue;
		var type = value[0];
		value = value.substring(1);
		switch (type) {
			case 'b':
				return value == 'true';
			case 'n':
				return Number(value);
			default:
				return value;
		}
	}
/*
	GM_log = function(message) {
		console.log(message);
	}
*/
	GM_registerMenuCommand = function(name, funk) {
	//todo
	}

	GM_setValue = function(name, value) {
		value = (typeof value)[0] + value;
		localStorage.setItem(name, value);
	}
}
// End code by James Campos

var reUID = /[;?]u=([0-9]+)[^0-9]/;
var CurrentSite = ',' + document.URL.substr(0,document.URL.lastIndexOf('/'));
// Set up GM_value uid renaming.
function renameByUID(uid) {
	uid += CurrentSite;
	var oldName = GM_getValue('rename:'+uid, '');
	var newName = prompt("Enter the user's new name,\nBegin with > to add to their original name,\nOr Cancel to reset:", oldName);
	if(newName == null) newName = '';
	// Check for things that should be entitites, unless this is HTML.
	if(newName != '' && (newName.indexOf('>') > 0 || newName.indexOf('<') >= 0 || newName.indexOf('&') >= 0)) {
		if(confirm('Convert HTML to display as text?')) {
			// Entitize everything but a prepended '>'.
			var appendName = false;
			if(newName.substr(0,1) == '>') {
				appendName = true;
				newName = newName.substr(1);
			}
			newName = newName.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
			if(appendName) newName = '>'+newName;
		}
	}

	if(newName != oldName) {
		// Set the value, even if it's ''.
		GM_setValue('rename:'+uid, newName);
	}
}

function renameByThis() {
	// Find the table around this.
	var thisTable = this;
	thisTable.parentNode.parentNode.style.display = 'none';
	while(thisTable.tagName != 'TBODY') thisTable = thisTable.parentNode;
	var postID = thisTable.parentNode.parentNode.id;
	postID = postID.substring(9, postID.lastIndexOf('_'));
	var uid = reUID.exec(thisTable.innerHTML)[1];

	renameByUID(uid);
	window.location.hash = '#post'+postID;
	window.location.reload();
	return false;
}

// Set up GM_value reiconizing. 
function reiconizeByUID(uid) {
	var oldIcon = GM_getValue('avatar:'+uid+CurrentSite, '');
	var newIcon = prompt("Enter a URL for the user's new avatar, 'auto' to auto-assign,\n'none' for none, or click Cancel to reset:", (oldIcon=='')?'auto':oldIcon);
	if(newIcon == null) newIcon = '';

	// Fix data urls:
	// PNG
	if(newIcon.substr(0,10) == 'iVBORw0KGg') newIcon = 'data:image/png;base64,'+newIcon;
	// GIF
	if(newIcon.substr(0,4) == 'R0lG') newIcon = 'data:image/gif;base64,'+newIcon;
	// JPEG
	if(newIcon.substr(0,3) == '/9j') newIcon = 'data:image/jpeg;base64,'+newIcon;

	if(newIcon != oldIcon) {
		// Set the value, even if it's null.
		GM_setValue('avatar:'+uid+CurrentSite, newIcon);
		if(newIcon == '') window.location.reload();
		else reiconizeUID(uid, newIcon);
	}
}

function reiconizeByThis() {
	// Find the table around this.
	var thisTable = this;
	while(thisTable.tagName != 'TBODY') thisTable = thisTable.parentNode;
	var postID = thisTable.parentNode.parentNode.id;
	postID = postID.substring(9, postID.lastIndexOf('_'));
	thisTable.parentNode.parentNode.style.display = 'none';
	var uid = reUID.exec(thisTable.innerHTML)[1];

	reiconizeByUID(uid);
	window.location.hash = '#post'+postID;
	return false;
}

function getOldIcon(thisUserCell) {
	var oldIcon = null;
	// Get the old icon's node.
	var objs = thisUserCell.getElementsByTagName('img');
	for(var i=0; i < objs.length; i++) {
		// Don't include AIM/ICQ/ETC. icons.
		if(objs[i].parentNode.nodeName == 'A' && objs[i].parentNode.href.indexOf('member.php?') > 0) {
			oldIcon = objs[i];
			break;
		}
	}
	return oldIcon;
}

// Change all instances of user icons, based on a UID.
function reiconizeUID(chosenUid, newIcon) {
	var allPosts = document.evaluate('//table[starts-with(@id,"post")][@class="tborder"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if(newIcon == '') newIcon = null;
	if(newIcon == 'none') newIcon = '';
	for (var i=0;i<allPosts.snapshotLength;i++) {
		var thisUserCell = allPosts.snapshotItem(i).rows[1].cells[0];
		var userName = null;
		var uid = null;		// The user's ID.

		// Get the username/UID.
		var objs = thisUserCell.getElementsByTagName('a');
		for(var j=0; j<objs.length; j++) {
			if(objs[j].className == 'bigusername') {
				// Get the user ID.
				uid = objs[j].href.match(/[&?]u=\d+/);
				if(uid == undefined) uid = '';
				else uid = uid[0];
				uid = uid.substr(3);
				userName = objs[j].textContent;
				break;
			}
		}
		if(userName == null || uid != chosenUid) continue;

		// Get the old icon's node.
		var oldIcon = getOldIcon(thisUserCell);

		//***Implement icon changing***
		// If a new icon is specified, change the icon!
		changeIcon(oldIcon, newIcon, thisUserCell, userName);
	}
}
function changeIcon(oldIcon, newIcon, thisUserCell, userName) {
	if(oldIcon != null) {
		// Remove size restrictions.
		oldIcon.removeAttribute('width');
		oldIcon.removeAttribute('height');
		oldIcon.style.maxWidth = maxWidth;
		oldIcon.style.maxHeight = maxHeight;
	}
	if(newIcon != null) {
		if(newIcon == 'auto') newIcon = autoIcons[userName.charCodeAt(0) % autoIcons.length];
		if(oldIcon != null && oldIcon.className == '') {
			if(newIcon == '') {
				// Remove the old icon's div.
				while(oldIcon.nodeName != 'DIV') oldIcon = oldIcon.parentNode;
				oldIcon.parentNode.removeChild(oldIcon);
			} else {
				// Replace the old icon.
				oldIcon.src = newIcon;
			}
		} else {
			if(newIcon != '') {
				// Create a new div.
				var newDiv = document.createElement('div');
				newDiv.className = 'smallfont';
				var thisUserIcon = '<a href="member.php?u='+uid+'"><img title="'+userName+'\'s Avatar" src="'+newIcon+'" alt="'+userName+'\'s Avatar" border="0" '+myStyle+'/></a>';
				var thisUserTable = thisUserCell.getElementsByTagName('table');
				if(thisUserTable.length > 0) {
					newDiv.innerHTML = thisUserIcon;
					thisUserTable[0].rows[0].insertCell(0).appendChild(newDiv);
				} else {
					// Put the new icon in the location specified by iconPos.
					if(iconPos == 0) {
						// Insert the appropriate html.
						newDiv.innerHTML = thisUserIcon;
						thisUserCell.insertBefore(newDiv, thisUserCell.firstChild);
					} else {
						// Insert the appropriate html.
						newDiv.innerHTML = '<br/>' + thisUserIcon;
						var lastDiv = thisUserCell.lastChild;
						while(lastDiv.nodeType != 1) lastDiv = lastDiv.previousSibling;
						thisUserCell.insertBefore(newDiv, lastDiv);
					}
				}
			} // Else do nothing.  No icon was found and none is desired.
		}
	}
}

var VBQLMenu=document.getElementById('usercptools_menu')
if(VBQLMenu == null) VBQLMenu = document.getElementById('threadtools_menu');
if(VBQLMenu != null) {
	VBQLMenu = VBQLMenu.getElementsByTagName('table')[0].tBodies[0];
	var tmpnode = VBQLMenu.rows[0]
		tmpnode = tmpnode.cloneNode(true);
	tmpnode.getElementsByTagName('td')[0].innerHTML = '<a href="http://userscripts.org/scripts/show/62618">The Reiconizer</a>';
	VBQLMenu.appendChild(tmpnode);
}
//Equivalent of GM_registerMenuCommand, but in the vBulletin Quick Links menu.
function VB_registerMenuCommand(name, funk) {
	if(VBQLMenu != null) {
		// Insert two rows.
		var oldNode = VBQLMenu.rows[1];
		var newNode = oldNode.cloneNode(true);
		var imgs = newNode.getElementsByTagName('img');
		if(imgs != null) {
			for(i=0; i < imgs.length; i++) {
				imgs[i].style.display = "none";
			}
		}
		var link = newNode.getElementsByTagName('a')[0];
		link.innerHTML = name;
		link.href = '#';
		link.addEventListener('click', funk, false);
		VBQLMenu.appendChild(newNode);
	}
}
// Do both VB and GM registerMenuCommands.
function registerMenuCommand(name, funk) {
	GM_registerMenuCommand(name, funk);
	VB_registerMenuCommand(name, funk);
}

iconPos = GM_getValue('iconPos'+CurrentSite, iconPos);
var newmaxWidth = GM_getValue('maxWidth'+CurrentSite, '');
if(newmaxWidth != '') maxWidth = newmaxWidth;
var newmaxHeight = GM_getValue('maxHeight'+CurrentSite, '');
if(newmaxHeight != '') maxHeight = newmaxHeight;
var newdefaultIcon = GM_getValue('defaultIcon'+CurrentSite, defaultIcon);
if(newdefaultIcon != '') defaultIcon = newdefaultIcon;
if(defaultIcon == 'none') defaultIcon = '';
if(defaultIcon.indexOf(';') > 0) {
	autoIcons = defaultIcon.split(';');
	defaultIcon = 'auto';
}

var allPosts = document.evaluate('//table[starts-with(@id,"post")][@class="tborder"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

var myStyle = 'style="';
if(maxWidth != '') myStyle += 'max-width:'+maxWidth+';';
if(maxHeight != '') myStyle += 'max-height:'+maxHeight+';';
myStyle += '"';
for (var i=0;i<allPosts.snapshotLength;i++) {
	var thisUserCell = allPosts.snapshotItem(i).rows[1].cells[0];
	var newIcon = null;	// The new icon's string.
	var uid = null;		// The user's ID.
	var userName = null;	// The user's nickname.

	// Get the username.
	var objs = thisUserCell.getElementsByTagName('a');
	for(var j=0; j<objs.length; j++) {
		if(objs[j].className == 'bigusername') {
			// Get the user ID.
			uid = objs[j].href.match(/[&?]u=\d+/);
			if(uid == undefined) uid = '';
			else uid = uid[0];
			uid = uid.substr(3);
			var newName = GM_getValue('rename:'+uid+CurrentSite, '');
			if(nameFor[uid] != undefined && newName == '') newName = nameFor[uid];
			// Change the userName if necessary.
			if(newName != '') {
				if(newName.substr(0,1) == '>')
					objs[j].innerHTML += newName.substr(1);
				else
					objs[j].innerHTML = newName;
			}
			userName = objs[j].textContent;
			// Fix imported_ people.
			/*
			if(userName.substr(0,9) == 'imported_') {
				userName = userName.substr(9);
				objs[j].textContent = userName;
			}
			*/
			break;
		}
	}
	if(userName == null) continue;

	// Get the old icon's node.
	var oldIcon = getOldIcon(thisUserCell);

	//***Begin icon changing***

	// Give all un-icon-ed users an icon (or auto-assign.)
	if(oldIcon == null && defaultIcon != null) newIcon = defaultIcon;

	// Replace any icon paths with whatever.
	if(oldIcon != null) {
		for(var k in iconPathSub) {
			if(oldIcon.src.indexOf(k) >= 0)
				newIcon = iconPathSub[k];
		}
	}

	// Substitute one particular icon for another.
	if(oldIcon != null && iconSub[oldIcon.src] != undefined) {
		newIcon = iconSub[oldIcon.src];
	}

	// Check for a new icon for the specific user.
	if(iconFor[userName] != undefined) newIcon = iconFor[userName];
	
	// Check for a new icon for the specific user id.
	if(iconFor['uid='+uid] != undefined) newIcon = iconFor['uid='+uid];

	// Check for a new icon for the specific user id, in GM storage.
	var newGMIcon = GM_getValue('avatar:'+uid+CurrentSite, '')
	if(newGMIcon != '') {
		if(newGMIcon == 'none') newIcon = '';
		else newIcon = newGMIcon;
	}

	//***Implement icon changing***
	// If a new icon is specified, change the icon!
	changeIcon(oldIcon, newIcon, thisUserCell, userName);
}

// Set up renaming/reiconizing in menus.
allPosts = document.evaluate('//div[starts-with(@id,"postmenu_")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i=0;i<allPosts.snapshotLength;i++) {
	var thisTable = allPosts.snapshotItem(i).getElementsByTagName('table')[0];
	if(thisTable == undefined) continue;
	var postID = thisTable.parentNode.id;
	postID = postID.substring(9, postID.lastIndexOf('_'));
	thisTable = thisTable.tBodies[0];
	var link = thisTable.getElementsByTagName('a')[0];
	if(link == undefined) continue;
	// Get Username.
	var userName = thisTable.rows[0].cells[0].textContent;
	// Get UID.
	var uid = reUID.exec(thisTable.innerHTML)[1];

	// Insert two rows.
	var oldNode = thisTable.rows[1];
	var reiconizeNode = oldNode.cloneNode(true);
	link = reiconizeNode.getElementsByTagName('a')[0];
	link.innerHTML = 'Reiconize '+userName;
	link.href = '#post'+postID;
	link.addEventListener('click', reiconizeByThis, false);

	var renameNode = oldNode.cloneNode(true);
	link = renameNode.getElementsByTagName('a')[0];
	link.innerHTML = 'Rename '+userName;
	link.href = '#post'+postID;
	link.addEventListener('click', renameByThis, false);
	
	thisTable.appendChild(reiconizeNode);
	thisTable.appendChild(renameNode);
}

// Set up iconPos.
var setIconPos = function(){
	GM_setValue('iconPos'+CurrentSite, (iconPos)?0:1);
	window.location.reload();
}

registerMenuCommand('Display avatars '+((iconPos)?'before':'after')+' usernames', setIconPos);

// Maximum avatar size.
var setMaxSize = function(){
	var oldWidth = GM_getValue('maxWidth'+CurrentSite, '');
	var oldHeight = GM_getValue('maxHeight'+CurrentSite, '');
	var maxWidthNum = maxWidth.substr(0,maxWidth.length-2);
	var maxHeightNum = maxHeight.substr(0,maxHeight.length-2);
	var newSizeStr = prompt("Enter the maximum size to display avatars, in pixels:", maxWidthNum+'x'+maxHeightNum);
	if(newSizeStr == null) return;
	newSize = newSizeStr.split('x',2);
	for(var i=0; i < 2; i++) {
		newSize[i] = parseInt(newSize[i]);
		if(isNaN(newSize[i])) {
			alert('Invalid size "'+newSizeStr+'"');
			return;
		}
	}
	if(newSize[0] != maxWidth || newSize[1] != maxHeight) {
		GM_setValue('maxWidth'+CurrentSite, newSize[0]+'px');
		GM_setValue('maxHeight'+CurrentSite, newSize[1]+'px');
		window.location.reload();
	}
}
registerMenuCommand('Set maximum avatar size...', setMaxSize);

// and Default avatar.
var setDefaultIcon = function(){
	var oldIcon = GM_getValue('defaultIcon'+CurrentSite, '');
	var newIcon = prompt("Enter a URL for the new default avatar, a ';'-separated list for several,\n'auto' to auto-assign, 'none' for none, or click Cancel to reset:", (oldIcon=='')?defaultIcon:oldIcon);
	if(newIcon == null) newIcon = '';

	// Fix data urls:
	// PNG
	if(newIcon.substr(0,10) == 'iVBORw0KGg') newIcon = 'data:image/png;base64,'+newIcon;
	// GIF
	if(newIcon.substr(0,4) == 'R0lG') newIcon = 'data:image/gif;base64,'+newIcon;
	// JPEG
	if(newIcon.substr(0,3) == '/9j') newIcon = 'data:image/jpeg;base64,'+newIcon;

	if(newIcon != oldIcon) {
		// Set the value, even if it's null.
		GM_setValue('defaultIcon'+CurrentSite, newIcon);
		window.location.reload();
	}
}
registerMenuCommand('Set default avatar(s)...', setDefaultIcon);
