// Flickr Rich Edit
// version 0.7
// 2010-01-28
// Copyright (c) 2009, Todd Moon (toddmoon.com) & jrhyley ( http://www.flickr.com/people/jrhyley/ )
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Flickr Rich Edit", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Flickr Rich Edit
// @description	  Adds a simple rich edit interface (Italic, Bold, Underline, Strike, Blockquote, Link, Image) to any comment text area on flickr and any in-situ description editor.
// @namespace     http://www.toddmoon.com/GreaseMonkey/
// @include       http://*flickr.com/*
// @exclude       http://*flickr.com/messages_write.gne*
// ==/UserScript==

// == CONSTANTS == //

var COMMAND_FLAGS = {
	ITALICS: 1,
	BOLD: 2,
	UNDERLINE: 4,
	STRIKE: 8,
	QUOTE: 16,
	LINK: 32,
	IMAGE: 64
	SIG: 128
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
		var controlBar = new ControlBar( 
			COMMAND_FLAGS.ITALICS |
			COMMAND_FLAGS.BOLD |
			COMMAND_FLAGS.UNDERLINE |
			COMMAND_FLAGS.STRIKE |
			COMMAND_FLAGS.QUOTE |
			COMMAND_FLAGS.LINK |
			COMMAND_FLAGS.IMAGE |
			COMMAND_FLAGS.SIG
		);
		
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
	
		var controlBarLoader = new DescriptionDivControlBarLoader( descriptionDiv, 
			COMMAND_FLAGS.ITALICS |
			COMMAND_FLAGS.BOLD |
			COMMAND_FLAGS.UNDERLINE |
			COMMAND_FLAGS.STRIKE |
			COMMAND_FLAGS.LINK |
			COMMAND_FLAGS.SIG
		);
		
		controlBarLoader.initialize();
	}
}

//Override each startEditing function on the description_div if this is your set.
if ( unsafeWindow.page_set && isYourSet( pathSegments ) )
{
	var descriptionDiv = unsafeWindow.document.getElementById( "description_div" + unsafeWindow.page_set.id );
	
		var controlBarLoader = new DescriptionDivControlBarLoader( descriptionDiv, 
			COMMAND_FLAGS.ITALICS |
			COMMAND_FLAGS.BOLD |
			COMMAND_FLAGS.UNDERLINE |
			COMMAND_FLAGS.STRIKE |
			COMMAND_FLAGS.LINK |
			COMMAND_FLAGS.SIG
		);
		
		controlBarLoader.initialize();
}

//Override each startEditing function on the description_div if this is your collection.
if ( unsafeWindow.page_collection_id && isYourCollection( pathSegments ) )
{
	var descriptionDiv = unsafeWindow.document.getElementById( "description_div" + unsafeWindow.page_collection_id );
	
		var controlBarLoader = new DescriptionDivControlBarLoader( descriptionDiv, 
			COMMAND_FLAGS.ITALICS |
			COMMAND_FLAGS.BOLD |
			COMMAND_FLAGS.UNDERLINE |
			COMMAND_FLAGS.STRIKE |
			COMMAND_FLAGS.QUOTE |
			COMMAND_FLAGS.LINK |
			COMMAND_FLAGS.IMAGE |
			COMMAND_FLAGS.SIG
		);
		
		controlBarLoader.initialize();
}

// == CLASSES == //

function ControlBar( commandFlags )
{
	this.inject = function( targetTextArea )
	{
		var controlBar = document.createElement("div");
		
		controlBar.setAttribute('style', 'margin: 2px 0px; font-size: 12px;');
		
		if ( ( commandFlags & COMMAND_FLAGS.ITALICS ) == COMMAND_FLAGS.ITALICS )
		{
			var item = new ControlBarItem(
				"<i>italic</i>",
				function()
				{
					TagSelection( targetTextArea, "<i>", "</i>" );
				}
			);
			
			controlBar.appendChild( item.create() );
		}	
		
		if ( ( commandFlags & COMMAND_FLAGS.BOLD ) == COMMAND_FLAGS.BOLD )
		{
			var item = new ControlBarItem(
				"<b>bold</b>",
				function()
				{
					TagSelection( targetTextArea, "<b>", "</b>" );
				}
			);
			
			controlBar.appendChild( item.create() );
		}	
		
		if ( ( commandFlags & COMMAND_FLAGS.UNDERLINE ) == COMMAND_FLAGS.UNDERLINE )
		{
			var item = new ControlBarItem(
				"<u>underline</u>",
				function()
				{
					TagSelection( targetTextArea, "<u>", "</u>" );
				}
			);
			
			controlBar.appendChild( item.create() );
		}	
		
		if ( ( commandFlags & COMMAND_FLAGS.STRIKE ) == COMMAND_FLAGS.STRIKE )
		{
			var item = new ControlBarItem(
				"<s>strike</s>",
				function()
				{
					TagSelection( targetTextArea, "<s>", "</s>" );
				}
			);
			
			controlBar.appendChild( item.create() );
		}
		
		if ( ( commandFlags & COMMAND_FLAGS.QUOTE ) == COMMAND_FLAGS.QUOTE )
		{
			var item = new ControlBarItem(
				"quote",
				function()
				{
					TagSelection( targetTextArea, "<blockquote>", "</blockquote>" );
				}
			);
			
			controlBar.appendChild( item.create() );
		}
		
		if ( ( commandFlags & COMMAND_FLAGS.LINK ) == COMMAND_FLAGS.LINK )
		{
			var item = new ControlBarItem(
				"link",
				function()
				{
					LinkSelection( targetTextArea );
				}
			);
			
			controlBar.appendChild( item.create() );
		}
		
		if ( ( commandFlags & COMMAND_FLAGS.IMAGE ) == COMMAND_FLAGS.IMAGE )
		{
			var item = new ControlBarItem(
				"image",
				function()
				{
					EmbedImage( targetTextArea );
				}
			);
			
			controlBar.appendChild( item.create() );
		}

		if ( ( commandFlags & COMMAND_FLAGS.QUOTE ) == COMMAND_FLAGS.QUOTE )
		{
			var item = new ControlBarItem(
				"Signature",
				function()
				{
					TagSelection( targetTextArea, "<a href=>Amit Parekh Photography Blog</a>>", "" );
				}
			);
			
			controlBar.appendChild( item.create() );
		}
		
		targetTextArea.parentNode.insertBefore( controlBar, targetTextArea );
	};
}

function ControlBarItem( label, editFunction )
{
	this.create = function() 
	{
		var link = document.createElement("a");
		
		link.innerHTML = label;
		link.href = "javascript:;";
		link.setAttribute('style','Margin-Right: 8px; text-decoration: none;');
		
		link.execute = editFunction;
		
		addEvent( link, "click", "execute" );
		
		return link;	
	}
}

function DescriptionDivControlBarLoader( descriptionDiv, commandFlags )
{
	this.initialize = function()
	{
		if ( typeof( descriptionDiv.startEditing ) == 'function' )
		{	
			//This may seem backwards. Why create a new pointer to the existing function, then create a new function that calls the new pointer?
			//Wouldn't it be simpler to make a new "wrapper" function that simply calls the old one and set the onclick to the new function?
			//Yes, but I want to make sure the onclick is still called "startEditing" so that other scripts can also extend it using this exact same pattern.
			
			//richEdit_OriginalStartEditing needs to be a name unique to your script if you want to follow this pattern.
			descriptionDiv.richEdit_OriginalStartEditing = descriptionDiv.startEditing;
			
			descriptionDiv.addControlBar = function()
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
					
					var controlBar = new ControlBar( commandFlags );
					controlBar.inject( textArea );
				}
			}
			
			descriptionDiv.startEditing = function( event ) {
				descriptionDiv.richEdit_OriginalStartEditing( event );
				descriptionDiv.addControlBar();
			};
			
			descriptionDiv.onclick = descriptionDiv.startEditing;
		}
	}
}

// == FUNCTIONS == //

function TagSelection( targetTextArea, tagOpen, tagClose )
{	
	if ( targetTextArea.selectionStart || targetTextArea.selectionStart == 0 ) //relies on this property.
	{	
		//record scroll top to restore it later.
		var scrollTop = targetTextArea.scrollTop;
			
		// work around Mozilla Bug #190382
		if ( targetTextArea.selectionEnd > targetTextArea.value.length )
		{
			targetTextArea.selectionEnd = targetTextArea.value.length;
		}
		
		//We will restore the selection later, so record the current selection.
		var selectionStart = targetTextArea.selectionStart;
		var selectionEnd = targetTextArea.selectionEnd;
		
		targetTextArea.value = 
			targetTextArea.value.substring( 0, selectionStart ) + //text leading up to the selection start
			tagOpen + 
			targetTextArea.value.substring( selectionStart, selectionEnd ) + //selected text
			tagClose + 
			targetTextArea.value.substring( selectionEnd ); //text after the selection end
		
		targetTextArea.selectionStart = selectionStart + tagOpen.length;
		targetTextArea.selectionEnd = selectionEnd + tagOpen.length;
		
		targetTextArea.scrollTop = scrollTop;
	}	
}

function LinkSelection( targetTextArea )
{
	var url = prompt( "Enter the URL:", "" );

	if ( url != null )
	{
		TagSelection( targetTextArea, '<a href="' + url + '">', '</a>' );
	}
}


function EmbedImage( targetTextArea )
{
	var url = prompt( "Enter the image URL:", "" );

	if ( url != null )
	{
		TagSelection( targetTextArea, '<img src="' + url + '"/>', '' );
	}
}

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