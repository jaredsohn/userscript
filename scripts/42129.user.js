// ==UserScript==
// @name           Mark & Advance
// @namespace      http://umamidesign.co.uk
// @description    Marks post as read an advances to next post
// @include        https://www.google.com/reader/*
// @include        http://www.google.com/reader/*
// @include        https://reader.google.com/reader/*
// @include        http://reader.google.com/reader/*
// ==/UserScript==

function simulateKey(kCode, fOT) {
	
	if( window.KeyEvent ) {
		var evObj = document.createEvent('KeyEvents');
		evObj.initKeyEvent( 'keypress', true, true, window, false, false, false, false, kCode, 0 );
	} else {
		var evObj = document.createEvent('UIEvents');
		evObj.initUIEvent( 'keypress', true, true, window, 0 );
		evObj.keyCode = kC;
	}
	fOT.dispatchEvent(evObj);
}

function handleKeypress(e)
{
	// Handle a down arrow key Keypress
	if(e.target.nodeName.toLowerCase()!='input' && e.keyCode==96)
	{
		var fireOnThis = document.getElementById('current-entry');
		if(fireOnThis.className.indexOf("read") == -1)
		{
			// Simulate 'm' keypress
			simulateKey(77,fireOnThis);
		} 
		
		// Simulate 'n' keypress
		simulateKey(78,fireOnThis);
		e.preventDefault();
	}
}

document.addEventListener('keydown', handleKeypress, false);