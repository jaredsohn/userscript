// Copyright 2007,2009 Ryan Hagan <ryan@ryanhagan.net>.
// All rights Reserved.
//
//
// RELEASE NOTES
// =============
// v2.0 (07/11/2009)
// * Updated to work with new GMail labels
//
// v1.1 (12/14/2007)
// * Added ability to control behavior through settings in script.
// * Added code to make unread count on labels appear in front of label instead of behind.
// 
// v1.0 (11/25/2007)
// * Initial release of script.
//
//
// KNOWN ISSUES
// ============
// * Will not work in conjunction with Folders4Gmail.
// * Rewriting unread count on labels breaks the 'Go To Label' macro in Gmail Macros script which
//		is included with the Better Gmail Firefox Addon.
// 
//
//
// ==UserScript==
// @name           Label To Top
// @namespace      ryanhagan.net
// @include        http://mail.google.com/mail/*
// @include        https://mail.google.com/mail/*
// @include        http://mail.google.com/a/*
// @include        https://mail.google.com/a/*
// ==/UserScript==

// Which version of gMonkey does this script use?
var GMONKEY_VER = "1.0";


// Program configuration
var UPDATE_LABEL_INTERVAL = 10000;
var DOC_ROOT = top.frames[3].document;

// XPath searches used in code
var USER_LABELS_ROOT_ELEMENT_SEARCH = "//div/table[@class = 'cf nX']";
var UNREAD_LABELS_SEARCH = ".//tr//div[@class='n2 n1']";
var READ_LABELS_SEARCH = ".//tr//div[@class='n2']";

// Regular Expressions used in code
var BREAK_LABEL_TEXT_AND_UNREAD_COUNT_APART_REGEXP = /^([\[\]\-\_\\\/\.\d\w\s]+?) \(([\d]+)\)$/;
var UNREAD_COUNT_IN_FRONT_REGEXP = /^\([\d]+?\) /;
var UNREAD_COUNT_IN_BACK_REGEXP = / \([\d]+?\)$/; 

// Program defaults
var MOVE_LABELS_TO_TOP_DEFAULT = "true";
var REWRITE_LABELS_WITH_COUNT_IN_FRONT_DEFAULT = "true";
var HIDE_READ_LABLES_DEFAULT = "true";


var L2T =
{
	init : function (gmail) 
	{
		// clear any interval callbacks to this function
		window.clearInterval(intervalId);
		
		// create the container for the unread labels
		L2T.UI.initUnreadLabelStorage();
		
		// create the control to hide the read label container
		if ( L2T.Config.getHideReadLabels() == 'true' ) { 
			L2T.UI.initHideUnhideReadLabelsControl();
		}
			
		var run = function() 
		{						
			// move labels to the top
			if ( L2T.Config.getMoveLabel2Top() == 'true' ) {
				// move unread items to the unread container
				unreadLabels = _XPathSearch(UNREAD_LABELS_SEARCH, L2T.UI.getReadLabelsContainer());
				L2T.UI.moveLabelsToContainer(unreadLabels, L2T.UI.getUnreadLabelsContainer());

				// move read items to the normal container
				readLabels = _XPathSearch(READ_LABELS_SEARCH, L2T.UI.getUnreadLabelsContainer());
				L2T.UI.moveLabelsToContainer(readLabels, L2T.UI.getReadLabelsContainer());			
			}
			
			// put the unread message count in front of the label
			if ( L2T.Config.getUnreadCountInFront() == 'true' )
			{
				unreadLabels = _XPathSearch(UNREAD_LABELS_SEARCH, L2T.UI.getUnreadLabelsContainer());
				L2T.UI.rewriteLabelsWithCountAtFront(unreadLabels);
			}
		}

		run();
		
		// run this script periodically and when the view changes in gmail
		gmail.registerViewChangeCallback(run);
		intervalId = window.setInterval(run, UPDATE_LABEL_INTERVAL);
	}
};

L2T.UI = 
{
	initUnreadLabelStorage : function()
	{
		// create the unread labels container
		this.createUnreadLabelStorage();
	},
	
	createUnreadLabelStorage : function() 
	{
		// get a reference to the main user labels container
		var userLabelsContainer = this.getUserLabelsContainer();
		// create the table element that will store the unread labels
		var newTableElement = document.createElement('table');
		newTableElement.setAttribute('class','cf nX');
		newTableElement.setAttribute('cellpadding','0');
		var newTBodyElement = document.createElement('tbody');
		newTBodyElement.id = 'unreadLabels';
		newTableElement.appendChild(newTBodyElement);
		// insert the unread labels table into the top of the main labels container
		userLabelsContainer.insertBefore(newTableElement, userLabelsContainer.firstChild);
	},
	
	getUserLabelsContainer : function()
	{
		// try to get the element using the ID first
		var userLabelsContainer = DOC_ROOT.getElementById('userLabels');
		if ( userLabelsContainer ) return userLabelsContainer;
	 	// if that's not successful, get reference to the user labels in the DOM
		var userLabelsContainer = _XPathSearch(USER_LABELS_ROOT_ELEMENT_SEARCH, DOC_ROOT).snapshotItem(1);
		while ( userLabelsContainer.nodeName.toLowerCase() != 'div')
			userLabelsContainer = userLabelsContainer.parentNode;
		userLabelsContainer.id = 'userLabels';
		return userLabelsContainer;
	},
	
	initHideUnhideReadLabelsControl : function()
	{
		// create the hide/unhide control for the read labels
		this.createHideUnhideReadLabelsControl();
		// hide the read labels
		L2T.UI.Handler.hideReadLabels();
		// add event handler for control
		this.getHideUnhideReadLabelsControl().addEventListener('click', L2T.UI.Handler.showHideReadLabelsContainer, false);
	},
	
	createHideUnhideReadLabelsControl : function() 
	{
		// create control
		var newTableElement = document.createElement('table');
		newTableElement.setAttribute('class','cf nX');
		newTableElement.setAttribute('cellpadding','0');
		newTableElement.innerHTML = "<tbody><tr class='Alfa2e'><td class='nL'></td><td align='right'><a id='hideReadLabelsControl' href='javascript:null;'>Show Labels</a></td></tr></tbody>";
		
		// insert control directly above the read labels container
		var userLabelsRootElem = this.getUserLabelsContainer();
		userLabelsRootElem.insertBefore(newTableElement, userLabelsRootElem.childNodes[1]);
	},
	
	getReadLabelsContainer : function()
	{
		// try to get the element using the ID first
		readLabelsContainer = DOC_ROOT.getElementById('readLabels');
		if ( readLabelsContainer ) return readLabelsContainer;
		// if that's not successful, get the last child of the main labels container
		parentElem = this.getUserLabelsContainer();
		readLabelsContainer = parentElem.childNodes[ parentElem.childNodes.length - 1 ];
		readLabelsContainer.firstChild.id = 'readLabels';
		return readLabelsContainer.firstChild;
	},
	
	getHideUnhideReadLabelsControl : function()
	{
		// try to get the element using the ID first
		hideReadLabelsControl = DOC_ROOT.getElementById('hideReadLabelsControl');
		if ( hideReadLabelsControl ) return hideReadLabelsControl; else return false;
	},
	
	getUnreadLabelsContainer : function()
	{
		// try to get the element using the ID first
		unreadLabelsContainer = DOC_ROOT.getElementById('unreadLabels');
		if ( unreadLabelsContainer ) return unreadLabelsContainer; else return false;
	},
	
	moveLabelsToContainer : function(labels, toContainerElem) 
	{
		// loop over results, pull the <tr> out of the DOM
		labelsCount = labels.snapshotLength;
		for ( labelIndex = 0; labelIndex < labelsCount; labelIndex++ )
		{
			// first, back up the DOM tree until we get to a <tr>
			currElem = labels.snapshotItem(labelIndex);
			while ( currElem.tagName.toLowerCase() != 'tr')
			{
				currElem = currElem.parentNode;
			}

			// walk the toContainer and insert element at first space available
			toContainerCount = toContainerElem.childNodes.length;
			if ( toContainerCount == 0 )
			{
				toContainerElem.appendChild( currElem );
			}
			else
			{
				// Insert the label in alphabetical order.  This assumes that the list is already sorted in 
				// alphabetical order.  If it is not, then this won't work at all.  Unless another script
				// is messing with the order of your labels, this shouldn't be a problem.
				for ( containerLabelIndex = 0; containerLabelIndex < toContainerCount; containerLabelIndex++ )
				{
					if ( this.getLabelText(currElem).toLowerCase() < this.getLabelText(toContainerElem.childNodes[containerLabelIndex]).toLowerCase() )
					{
						toContainerElem.insertBefore(currElem, toContainerElem.childNodes[containerLabelIndex]);
						break;
					}
				}

				// if we got all the way through the list and haven't put the label anywhere, throw it down
				// at the end of the label list.
				if ( containerLabelIndex == toContainerCount && toContainerElem.lastChild != currElem )
					toContainerElem.appendChild( currElem );
			}
		}
	},
	
	getLabelText : function(elem) 
	{
		// since we're mostly working with <tr> tags here, I needed a helper function to grab the actual 
		// label text from the container.  First, we should check to make sure we've really been passed
		// a <tr>, because if we haven't been, who knows what this would return?
		var labelText = '';
		if ( elem.tagName.toLowerCase() == 'tr' )
		{
			labelText = elem.childNodes[1].firstChild.firstChild.firstChild.innerHTML;
			if ( labelText.match(UNREAD_COUNT_IN_FRONT_REGEXP) )
			{
				labelText = labelText.replace(UNREAD_COUNT_IN_FRONT_REGEXP, '');
			}
		}
		else
		{
			labelText = '[invalid reference]';
		}

		return labelText;
	},
	
	rewriteLabelsWithCountAtFront : function(labels)
	{
		// loop over results, pull the <tr> out of the DOM
		labelsCount = labels.snapshotLength;
		for ( labelIndex = 0; labelIndex < labelsCount; labelIndex++ )
		{
			// first, back up the DOM tree until we get to a <tr>
			currElem = labels.snapshotItem(labelIndex);
			while ( currElem.tagName.toLowerCase() != 'tr')
			{
				currElem = currElem.parentNode;
			}

			// rewrite the label
			if ( this.getLabelText(currElem).match(UNREAD_COUNT_IN_BACK_REGEXP) )
				this.setLabelText(currElem, this.rewriteLabelWithCountAtFront(this.getLabelText(currElem)));
		}		
	},
	
	rewriteLabelWithCountAtFront : function(labelText)
	{
		// find the unread count on the label
		var newLabelText = '';
		var unreadConvMatch = labelText.match(BREAK_LABEL_TEXT_AND_UNREAD_COUNT_APART_REGEXP);

		// if we get something that looks like a good match, then prepend the label with the unread count
		if ( unreadConvMatch && unreadConvMatch.length == 3 && parseInt(unreadConvMatch[2]) > 0 )
			newLabelText = '(' + unreadConvMatch[2] + ') ' + unreadConvMatch[1];
		else
			newLabelText = labelText;

		return newLabelText;
	},	
	
	setLabelText : function(elem, text)
	{
		// since we're mostly working with <tr> tags here, I needed a helper function to set the 
		// label text in the container.  First, we should check to make sure we've really been passed
		// a <tr>, because if we haven't been, who knows what this would do?
		if ( elem.tagName.toLowerCase() == 'tr' )
			elem.childNodes[1].firstChild.firstChild.firstChild.innerHTML = text;
	}
};


L2T.UI.Handler = 
{
	showHideReadLabelsContainer : function(e)
	{
		var currElem = e.target;
		if (L2T.UI.Handler.getReadLabelsVisible()) { L2T.UI.Handler.hideReadLabels(); } else { L2T.UI.Handler.showReadLabels(); }
		currElem.innerHTML = (L2T.UI.Handler.getReadLabelsVisible()) ? 'Hide Labels' : 'Show Labels';
	},
	
	hideReadLabels : function()
	{
		L2T.UI.getReadLabelsContainer().style.display = 'none';
	},
	
	showReadLabels : function()
	{
		L2T.UI.getReadLabelsContainer().style.display = '';
	},
	
	getReadLabelsVisible : function()
	{
		if ( L2T.UI.getReadLabelsContainer().style.display == 'none' )
			return false;
		else 
			return true;
	}	
};

L2T.Config = 
{
	getMoveLabel2Top : function() {
		moveLabel2Top = this.getValue("moveLabel2TopSetting", MOVE_LABELS_TO_TOP_DEFAULT);
		return moveLabel2Top;		
	},
	
	setMoveLabel2Top : function(value) {
		this.setValue("moveLabel2TopSetting", value);
	},
	
	getUnreadCountInFront : function() {
		unreadCountInFront = this.getValue("unreadCountInFrontSetting", REWRITE_LABELS_WITH_COUNT_IN_FRONT_DEFAULT);
		return unreadCountInFront;		
	},
	
	setUnreadCountInFront : function(value) {
		this.setValue("unreadCountInFrontSetting", value);
	},
	
	getHideReadLabels : function() {
		hideUnreadLabels = this.getValue("hideReadLabelsSetting", HIDE_READ_LABLES_DEFAULT);
		return hideUnreadLabels;		
	},
	
	setHideReadLabels : function(value) {
		this.setValue("hideReadLabelsSetting", value);
	},
	
	getValue : function(setting, defaultValue) {
		var value = (GM_getValue(setting) != undefined) ? GM_getValue(setting) : defaultValue;
		return value;
	},
	
	setValue : function(setting, newValue) {
		GM_setValue(setting, newValue);
	}
};


function _XPathSearch( xpathExpression, contextNode ) {
	if (!xpathExpression) xpathExpression = DOC_ROOT;
	return DOC_ROOT.evaluate(xpathExpression, contextNode, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}


// create intervalId variable
var intervalId = null;

window.addEventListener('load', function() {
	unsafeWindow.gmonkey.load(GMONKEY_VER, function( gmail ) {
		// kick off the program
		L2T.init(gmail);
	});
}, true);
