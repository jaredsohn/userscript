// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Flickr SPi-V preview", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Rich Edit Tool
// @description   Adds a simple rich edit interface (Italic, Bold, Blockquote, Link, Signature) to any comment text area on flickr.
// @namespace      Gloverspud(c)
// @include       http://*flickr.com/*
// @exclude       http://*flickr.com/messages_write.gne*
// ==/UserScript==

// == CONSTANTS == //

var CONTROL_BAR_ITEM_COMMAND = {
	ITALICIZE: 1,
	EMBOLDEN: 2,
	QUOTE: 3,
	LINK: 4,
	SIG: 5
}

// == LIFECYCLE == //

//Find existing text areas to add rich controls to.
textAreas = document.evaluate(
	"//textarea",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null
);

//Add the rich editor to the existing text areas.
for ( var i = 0; i < textAreas.snapshotLength; i++)
{
	var textArea = textAreas.snapshotItem(i);
	
	// if this is not the extra special hidden textarea from the "invite to group" widget
	if ( !textArea.style || !textArea.style.display || textArea.style.display.toLowerCase() != "none" )
	{
		var controlBar = new ControlBar( true, true, true, true, true );
		controlBar.inject( textArea );
	}
}

var pathSegments = getLowercasePathSegments( document.location.pathname );

//Override each startEditing function on each description_div on the page if this is your photo stream.
if ( unsafeWindow.global_photos && thisPageContainsYourPhotos( pathSegments ) )
{
	for( photoID in unsafeWindow.global_photos )
	{
		var descriptionDiv = unsafeWindow.document.getElementById( "description_div" + photoID );
	
		var controlBarLoader = new DescriptionDivControlBarLoader( descriptionDiv, false );
		controlBarLoader.initialize();
	}
}

//Override each startEditing function on the description_div if this is your set.
if ( unsafeWindow.page_set && isYourSet( pathSegments ) )
{
	var descriptionDiv = unsafeWindow.document.getElementById( "description_div" + unsafeWindow.page_set.id );
	
		var controlBarLoader = new DescriptionDivControlBarLoader( descriptionDiv, false );
		controlBarLoader.initialize();
}


//Override each startEditing function on the description_div if this is your collection.
if ( unsafeWindow.page_collection_id && isYourCollection( pathSegments ) )
{
	var descriptionDiv = unsafeWindow.document.getElementById( "description_div" + unsafeWindow.page_collection_id );
	
		var controlBarLoader = new DescriptionDivControlBarLoader( descriptionDiv, true );
		controlBarLoader.initialize();
}


// == CLASSES == //

function ControlBar( showItalic, showBold, showQuote, showLink, showSig )
{
	this.showItalic = showItalic;
	this.showBold = showBold;
	this.showQuote = showQuote;
	this.showLink = showLink;
	this.showSig = showSig;
	
	this.inject = function( targetTextArea )
	{
		var controlBar = document.createElement("div");
		
		controlBar.setAttribute('style','');
		controlBar.style.marginBottom = "2px";
		controlBar.style.fontSize = "12px";	
		
		if ( showItalic )
		{
			var item = new ControlBarItem( "<i>italic</i>", CONTROL_BAR_ITEM_COMMAND.ITALICIZE, targetTextArea );
			
			controlBar.appendChild( item.create() );
		}			
			
		if ( showBold )
		{
			var item = new ControlBarItem( "<b>bold</b>", CONTROL_BAR_ITEM_COMMAND.EMBOLDEN, targetTextArea );
			
			controlBar.appendChild( item.create() );
		}
		
		if ( showQuote )
		{
			var item = new ControlBarItem( "quote", CONTROL_BAR_ITEM_COMMAND.QUOTE, targetTextArea );
			
			controlBar.appendChild( item.create() );
		}
		
		if ( showLink )
		{
			var item = new ControlBarItem( "link", CONTROL_BAR_ITEM_COMMAND.LINK, targetTextArea );
			
			controlBar.appendChild( item.create() );
		}

		if ( showSig )
		{
			var item = new ControlBarItem( "Signature", CONTROL_BAR_ITEM_COMMAND.SIG, targetTextArea );
			
			controlBar.appendChild( item.create() );
		}
	
		targetTextArea.parentNode.insertBefore( controlBar, targetTextArea );
	};
}

function ControlBarItem( label, editCommand, targetTextArea )
{
	this.label = label;
	this.editCommand = editCommand;
	this.targetTextArea = targetTextArea;
	
	this.create = function() 
	{
		var link = document.createElement("a");
		
		link.innerHTML = label;
		link.href = "javascript:;";
		link.style.marginRight = "8px;";
		
		link.editCommand = this.editCommand;
		link.targetTextArea = this.targetTextArea;
		link.execute = this.execute;
		link.linkSelection = this.linkSelection;
		link.tagSelection = this.tagSelection;
		
		addEvent( link, "click", "execute" );
		
		return link;	
	}


	this.execute = function()
	{
		switch( this.editCommand )
		{
			case CONTROL_BAR_ITEM_COMMAND.ITALICIZE:
				this.tagSelection( "<i>", "</i>" );
				break;
			case CONTROL_BAR_ITEM_COMMAND.EMBOLDEN:
				this.tagSelection( "<b>", "</b>" );
				break;
			case CONTROL_BAR_ITEM_COMMAND.QUOTE:
				this.tagSelection( "<blockquote>", "</blockquote>" );
				break;
			case CONTROL_BAR_ITEM_COMMAND.LINK:
				this.linkSelection();
				break;
			case CONTROL_BAR_ITEM_COMMAND.SIG:
        //Get the user name
        userName = document.evaluate(
          "//div[@id='TopBar']/table[@class='Header']//td[@class='Status']/a[@class='Pale']/text()",
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;
 
                                this.targetTextArea.value += "\n\n--<b>" + userName.nodeValue + " </b> ";
                                break;

			default:
				throw "Unknown command encountered";
		}
	}
	
	this.linkSelection = function()
	{
		var url = prompt( "Enter the URL:", "" );
	
		if ( url != null )
		{
			this.tagSelection( '<a href="' + url + '">', '</a>' );
		}
	}
	
	this.tagSelection = function( tagOpen, tagClose )
	{	
		if ( this.targetTextArea.selectionStart || this.targetTextArea.selectionStart == 0 ) //relies on this property.
		{	
			//record scroll top to restore it later.
			var scrollTop = this.targetTextArea.scrollTop;
				
			// work around Mozilla Bug #190382
			if ( this.targetTextArea.selectionEnd > this.targetTextArea.value.length )
			{
				this.targetTextArea.selectionEnd = this.targetTextArea.value.length;
			}
			
			//We will restore the selection later, so record the current selection.
			var selectionStart = this.targetTextArea.selectionStart;
			var selectionEnd = this.targetTextArea.selectionEnd;
			
			this.targetTextArea.value = 
				this.targetTextArea.value.substring( 0, selectionStart ) + //text leading up to the selection start
				tagOpen + 
				this.targetTextArea.value.substring( selectionStart, selectionEnd ) + //selected text
				tagClose + 
				this.targetTextArea.value.substring( selectionEnd ); //text after the selection end
			
			this.targetTextArea.selectionStart = selectionStart + tagOpen.length;
			this.targetTextArea.selectionEnd = selectionEnd + tagOpen.length;
			
			this.targetTextArea.scrollTop = scrollTop;
		}	
	}
}

function DescriptionDivControlBarLoader( descriptionDiv, showBlockQuote )
{
	this.descriptionDiv = descriptionDiv;
	
	this.initialize = function()
	{
		if ( typeof( this.descriptionDiv.startEditing ) == 'function' )
		{	
			this.descriptionDiv.richEditStartEditing = this.descriptionDiv.startEditing; // richEditStartEditing needs to be a name unique to your script if you want to follow this pattern.
			this.descriptionDiv.addControlBar = this.addControlBar;
			
			this.descriptionDiv.startEditing = function() {
				this.richEditStartEditing();
				this.addControlBar();
			};
			
			this.descriptionDiv.onclick = this.descriptionDiv.startEditing;
		}
	}
	
	this.addControlBar = function()
	{
		var nodes = document.evaluate(
			"./div/form/textarea[@name='content']",
			this.parentNode,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null
		);
		
		if ( nodes && nodes.snapshotLength > 0 )
		{
			var textArea = nodes.snapshotItem(0);
			
			var controlBar = new ControlBar( true, true, showBlockQuote, true, true );
			controlBar.inject( textArea );
		}
	}
}

// == FUNCTIONS == //

function thisPageContainsYourPhotos( pathSegments )
{
	if ( isYourPhoto() )
		return true;
		
	if ( isYourPhotoStream( pathSegments ) )
		return true;
		
	return false;
}

//Determines if you are the owner of the current photo.
function isYourPhoto()
{
	if ( unsafeWindow.page_photo_id && unsafeWindow.global_photos[unsafeWindow.page_photo_id] )
	{
		return unsafeWindow.global_photos[unsafeWindow.page_photo_id].isOwner;
	}
	
	return false;
}

//Determines if the url looks like a photo stream and global_photos has photos in it.
function isYourPhotoStream( pathSegments )
{
	if ( pathSegments.length == 2 && pathSegments[0] == "photos" )
	{
		//global_photos is an associative array where the index is the photoID. If it's empty, this isn't your photo stream.
		//There might be a better way to detect if it has photos, or a better way entirely to determine if this is your photo stream without hard-coding your id in the script.
		for ( photoID in unsafeWindow.global_photos )
		{
			return true;
		}
	}
	
	return false;
}

function isYourSet( pathSegments )
{
	if ( pathSegments.length == 4 && pathSegments[0] == "photos" && pathSegments[2] == "sets" )
	{
		//global_sets is an associative array where the index is the setID. If it's empty, this isn't your set.
		//There might be a better way to detect if it has photos, or a better way entirely to determine if this is your set without hard-coding your id in the script.
		for ( setID in unsafeWindow.global_sets )
		{
			return true;
		}
	}
	
	return false;
}

function isYourCollection( pathSegments )
{
	if ( pathSegments.length == 4 && pathSegments[0] == "photos" && pathSegments[2] == "collections" )
	{
		//global_collections is an associative array where the index is the collectionID. If it's empty, this isn't your set.
		//There might be a better way to detect if it has photos, or a better way entirely to determine if this is your collection without hard-coding your id in the script.
		for ( collectionID in unsafeWindow.global_collections )
		{
			return true;
		}
	}
	
	return false;
}

//Finds path segments in the given path. Removes the protocol and domain name if present. Returns an array of the segments.
function getLowercasePathSegments( path )
{
	//replace preceding protocol and domain and then any preceding or trailing slashes then split on the remaining slashes.
	return path.toLowerCase().replace( /^https?:\/\/[^\/]*/, "" ).replace(/^\/+|\/+$/g,"").split("/");
}

//Delegated event wire-up utitlity. Using this allows you to use the "this" keyword in a delegated function.
function addEvent( target, eventName, handlerName )
{
	target.addEventListener(eventName, function(e){target[handlerName](e);}, false);
}