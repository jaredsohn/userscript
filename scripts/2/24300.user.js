// ==UserScript==
// @name           NewzBin EZ Select
// @namespace      http://www.reinhold.dk/greasemonkey
// @description    Easily select posts and files by right-clicking on them
// @include        http://v3.newzbin.com/search/*
// ==/UserScript==

// Add custom CSS
function fncAddCSS()
{
	// CSS being added
	var cssString = 'div#content table.dataTabular tbody.mousehover tr td {' +
		'background-color: #FDF8C1;' + 
		'border:thin solid #000000;}';

	// Add CSS to the document
	var style = document.createElement('STYLE');
	style.type = 'text/css';
	style.innerHTML = cssString;
	document.getElementsByTagName('HEAD')[0].appendChild(style);
}

function fncInitPage()
{
    var arrPosts = document.getElementsByTagName("tbody");	// Enumerate all TBODY entries, in which posts lie
		var regPosts = new RegExp('^even$|^odd$|^even-new$|^odd-new$');	// Find out if the TBODY contains a post

    for (var iPosts = 0; iPosts < arrPosts.length; iPosts++)
 		{
			if (regPosts.test(arrPosts[iPosts].className))
 			{
 				// This TBODY contains a post, create the necessary eventhandlers

				// onContextMenu
				arrPosts[iPosts].addEventListener('contextmenu', fncPostRightClick, true);

				// onMouseOver
				arrPosts[iPosts].addEventListener('mouseover', fncMouseOverPost, false);
				
				// onMouseOut
				arrPosts[iPosts].addEventListener('mouseout', fncMouseLeavePost, false);
 			}
 		}
}

// When the user right-clicks on the post, mark it
function fncPostRightClick(oEvent)
{
	var oCheckBox = null;	// The posts checkbox

	// Save triggering object
	var oTBody = oEvent.target;
	
	// Loop back up to the TBODY node
	while (oTBody.tagName.toLowerCase() != 'tbody' && oTBody.tagName.toLowerCase() != 'html')
	{
		oTBody = oTBody.parentNode;
	}
	
	// Locate the INPUT elements
	var arrInputs = oTBody.getElementsByTagName('input');
	
	// Locate the checkbox
	for (var iInput = 0; iInput < arrInputs.length; iInput++)
	{
		if (arrInputs[iInput].type.toLowerCase() == 'checkbox')
		{
			oCheckBox = arrInputs[iInput];
		}
	}
		
	// If we have a checkbox, fire the mouseclick
	if (oCheckBox)
	{
		// Prepare clicks
		var evtMouseClick = document.createEvent('MouseEvents');
		var evtMouseUp = document.createEvent('MouseEvents');
		evtMouseClick.initMouseEvent( 'click', true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, null );
		evtMouseUp.initMouseEvent( 'mouseup', true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, null );
	
		// Fire click/mouseup event on the CHECKBOX to mark it, and trigger the highlight function
		oCheckBox.dispatchEvent(evtMouseUp);
		oCheckBox.dispatchEvent(evtMouseClick);
	}

	// If the CHECKBOX is unchecked, remove select from the TBODY classname (RegEx in org. function does not work with the new CSS)
	if (!oCheckBox.checked)
	{
		oTBody.className = fncTrim(oTBody.className.replace('select', ''));
		console.log(oTBody.className);
	}
	
	// Stop default behaviour, do not show right-click menu
  oEvent.stopPropagation();
  oEvent.preventDefault();	
}

function fncMouseOverPost(oEvent)
{
	// Save triggering object
	var oTBody = oEvent.target;
	
	// Loop back up to the TBODY node
	while (oTBody.tagName.toLowerCase() != 'tbody' && oTBody.tagName.toLowerCase() != 'html')
	{
		oTBody = oTBody.parentNode;
	}

	// Set CSS, hvis den ikke er sat
	if (!oTBody.className.match(/ mousehover/))
	{
		oTBody.className = oTBody.className + ' mousehover';
	}
}

function fncMouseLeavePost(oEvent)
{
	// Save triggering object
	var oTBody = oEvent.target;
	
	// Loop back up to the TBODY node
	while (oTBody.tagName.toLowerCase() != 'tbody' && oTBody.tagName.toLowerCase() != 'html')
	{
		oTBody = oTBody.parentNode;
	}

	// Set CSS
	oTBody.className = fncTrim(oTBody.className.replace('mousehover',''));
}

// Trim a string
function fncTrim(strString)
{
	return strString.replace(/^\s+|\s+$/g, '') ;
}

// Add our custom CSS
fncAddCSS();

// Init the page, and change all the posts
fncInitPage();