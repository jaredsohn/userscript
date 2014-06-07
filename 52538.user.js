// ==UserScript==
// @name           ATUserInterface
// @namespace      b.gameforge.ikariam.go
// @description    Modifies the user interface to make it look nicer.
// @include        http://*.ikariam.org/admintool/admin/*
// @version        0.1
// ==/UserScript==

var imageReplace = {
	'buttons/b1.gif': 'Exclamation.png',	// Suspicious
	'buttons/b2.gif': 'Security.png',		// Pillory
	'buttons/b3.gif': 'DocumentGraph.png',	// Toplist
	'buttons/b4.gif': 'Document.png',		// User Notes (Off)
	'buttons/b5.gif': 'Users.png',			// Multicheck
	'buttons/b6.gif': 'Search.png',			// User & Alliance Search
	'buttons/b7.gif': 'Pen.png',			// Logs
	
	'buttons/b10.gif': 'Flag.png',			// Fleet Log
	
	'buttons/b13.gif': 'Text2.png',			// Rename User
	'buttons/b14.gif': 'LockOpen.png',		// Unban User
	'buttons/b15.gif': 'Lock.png',			// Ban User
	'buttons/b16.gif': 'MyDocuments.png',	// Private Notes
	
	'buttons/b20.gif': 'Bubble5.png',		// Messages (Off)
	'buttons/b21.gif': 'Bubble6.png',		// Messages (On)
	'buttons/b22.gif': 'Mail.png',			// Change Mail Address

	'buttons/b24.gif': 'DocumentText.png',	// User Notes (On)
	'buttons/b25.gif': 'Gears.png',			// Options
	'buttons/b26.gif': 'Computer.png',		// Login Logs

	'buttons/b31.gif': 'Home.png',			// Home
	'buttons/b32.gif': 'PrintPreview.png',	// Content Check
};

var imagesUrl = 'http://s197.photobucket.com/albums/aa170/brannonch/Gameforge/AT%20Icons'
var userOverviewImage = 'User.png';

var menuDiv = document.getElementsByClassName('content')[0];
var overboxDiv = document.getElementsByClassName('content')[1];
var contboxDiv = document.getElementsByClassName('content')[2];
var toolsDiv = document.getElementsByClassName('tools')[0];

function fixImages(images, size)
{
	for (var i = 0; i < images.length; i++)
	{
		images[i].removeAttribute('width');
		images[i].removeAttribute('height');
		if (size != null)
		{
			images[i].style.width = size.w + 'px';
			images[i].style.height = size.h + 'px';
		}
		
		var origSrc = images[i].getAttribute('src');
		if (imageReplace[origSrc] != null)
			images[i].src = imagesUrl + '/' + imageReplace[origSrc];
	}
}

if (toolsDiv != null)
{
	var old = imageReplace['buttons/b6.gif'];
	imageReplace['buttons/b6.gif'] = userOverviewImage;
	fixImages(toolsDiv.getElementsByTagName('img'));
	imageReplace['buttons/b6.gif'] = old;
}
fixImages(menuDiv.getElementsByTagName('img'));
fixImages(overboxDiv.getElementsByTagName('img'));
fixImages(contboxDiv.getElementsByTagName('img'), { w: 20, h: 20 });