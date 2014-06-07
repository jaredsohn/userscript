// Flickr Rich Edit
// version 0.8.2
// 2011-04-02
// Copyright (c) 2011, Todd Moon (toddmoon.com) & jrhyley ( http://www.flickr.com/people/jrhyley/ )
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          Flickr Rich Edit
// @description	  Adds a simple rich edit interface (Italic, Bold, Underline, Strike, Blockquote, Link, Image) to any comment text area on flickr and any in-situ description editor.
// @namespace     http://www.toddmoon.com/GreaseMonkey/
// @include       http://*flickr.com/*
// @exclude       http://*flickr.com/messages_write.gne*
// ==/UserScript==

(function(){
	
	var DEBUG = false;
	
	function log( m )
	{
		if ( DEBUG && GM_log )
		{
			GM_log( m );
		}
	}
	
	var COMMAND_FLAGS = {
		ITALICS: 1,
		BOLD: 2,
		UNDERLINE: 4,
		STRIKE: 8,
		QUOTE: 16,
		LINK: 32,
		IMAGE: 64
	}
	
	//Do this once for the whole document for the initial, static comment box.
	addControlBarToCommentsWithinElement( document );	
	
	addControlBarToGroupDescription();
	
	//Listen for new elements. Most editors are dynamically added.
	document.body.addEventListener(
		'DOMNodeInserted',
		function( event ) {
			var elem = event.target;
			handleInsertedElement( elem );
		},
		false
	);
	
	function handleInsertedElement( elem )
	{
		log( "Insert detected: " + elem.tagName + ". Class: " + elem.className + ". ID: " + elem.id  );
			
		if ( elem.tagName == "TEXTAREA" && elem.className == "insitu-value" )
		{
			log( "TextArea detected" );
			log( "data-insitu-param attribute: " + elem.getAttribute( "data-insitu-param" ) );
			
			var insituParam = elem.getAttribute( "data-insitu-param" );
			
			if ( insituParam == "comment_text" )
			{
				addControlBarToComment( elem );
			}
			else if ( insituParam == "description" )
			{
				addControlBarToPhotoOrSetDescription( elem );
			}
			else if ( insituParam == "blast" )
			{
				addControlBarToGroupAnnouncement( elem );
			}
		}			
		else if ( elem.tagName == "DIV" && elem.className.indexOf( "comment-block" ) >= 0 )
		{
			log( "Comment DIV detected" );
			addControlBarToCommentsWithinElement( elem );
		}
		else if ( elem.tagName == "FORM" )
		{
			log( "Looking for editor in FORM" );
			//this might be a form on a collection page for the desription editor. Look for a textrea named content.
			var descriptionTextAreas = elem.querySelectorAll( "textarea[name='content']" );
			
			log( "descriptionTextAreas.length: " + descriptionTextAreas.length );
			
			for ( var i = 0; i < descriptionTextAreas.length; ++i )
			{
				var textArea = descriptionTextAreas[i];
		  	
				addControlBarToCollectionDescription( textArea );
			}
		}
	}
	
	function addControlBarToCommentsWithinElement( elem )
	{
		//Look for existing comment textareas. They have an id of message.
		var commentTextAreas = elem.querySelectorAll( "textarea[name='message'],textarea[name='body']" );
		
		for ( var i = 0; i < commentTextAreas.length; ++i )
		{
	  	var textArea = commentTextAreas[i];
	  	
			addControlBarToComment( textArea );
		}
	}	
	
	function addControlBarToComment( textArea )
	{
		var controlBar = new ControlBar(
			COMMAND_FLAGS.ITALICS |
			COMMAND_FLAGS.BOLD |
			COMMAND_FLAGS.UNDERLINE |
			COMMAND_FLAGS.STRIKE |
			COMMAND_FLAGS.LINK |
			COMMAND_FLAGS.QUOTE |
			COMMAND_FLAGS.IMAGE
		);
		
		//edited comments need a break before the control bar, and the textarea margin-top removed.
		var isEditedComment = ( textArea.parentNode.className.indexOf( "insitu-editing" ) >= 0 );
		
		controlBar.inject(
			textArea,
			isEditedComment,
			isEditedComment
		 );	
	}
	
	function addControlBarToCollectionDescription( textArea )
	{
		var controlBar = new ControlBar(
			COMMAND_FLAGS.ITALICS |
			COMMAND_FLAGS.BOLD |
			COMMAND_FLAGS.UNDERLINE |
			COMMAND_FLAGS.STRIKE |
			COMMAND_FLAGS.LINK |
			COMMAND_FLAGS.QUOTE |
			COMMAND_FLAGS.IMAGE
		);
		
		controlBar.inject(
			textArea,
			false,
			true
		);	
	}
	
	function addControlBarToPhotoOrSetDescription( textArea )
	{
		var controlBar = new ControlBar(
			COMMAND_FLAGS.ITALICS |
			COMMAND_FLAGS.BOLD |
			COMMAND_FLAGS.UNDERLINE |
			COMMAND_FLAGS.STRIKE |
			COMMAND_FLAGS.LINK
		);
		
		controlBar.inject( textArea );	
	}
	
	function addControlBarToGroupAnnouncement( textArea )
	{
		var controlBar = new ControlBar(
			COMMAND_FLAGS.ITALICS |
			COMMAND_FLAGS.BOLD |
			COMMAND_FLAGS.UNDERLINE |
			COMMAND_FLAGS.STRIKE |
			COMMAND_FLAGS.LINK
		);
		
		controlBar.inject( textArea );	
	}
	
	function addControlBarToGroupDescription()
	{
		var descriptionTextAreas = document.querySelectorAll( "textarea#form_description" );
			
		log( "Group descriptionTextAreas.length: " + descriptionTextAreas.length );
		
		for ( var i = 0; i < descriptionTextAreas.length; ++i )
		{
			log( "Adding control bar to group description." );
			
			var textArea = descriptionTextAreas[i];
	  	
			var controlBar = new ControlBar(
				COMMAND_FLAGS.ITALICS |
				COMMAND_FLAGS.BOLD |
				COMMAND_FLAGS.UNDERLINE |
				COMMAND_FLAGS.STRIKE |
				COMMAND_FLAGS.LINK |
				COMMAND_FLAGS.QUOTE |
				COMMAND_FLAGS.IMAGE
			);
			
			controlBar.inject( textArea );
		}
	}
	
	function ControlBar( commandFlags )
	{
		this.inject = function( textArea, insertBreak, removeMarginTop )
		{
			var controlBar = document.createElement("div");
			
			controlBar.setAttribute('style', 'margin: 2px 0px; font-size: 12px;');
			
			if ( ( commandFlags & COMMAND_FLAGS.ITALICS ) == COMMAND_FLAGS.ITALICS )
			{
				var item = new ControlBarItem(
					"<i>italic</i>",
					function()
					{
						TagSelection( textArea, "<i>", "</i>" );
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
						TagSelection( textArea, "<b>", "</b>" );
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
						TagSelection( textArea, "<u>", "</u>" );
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
						TagSelection( textArea, "<s>", "</s>" );
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
						TagSelection( textArea, "<blockquote>", "</blockquote>" );
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
						LinkSelection( textArea );
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
						EmbedImage( textArea );
					}
				);
				
				controlBar.appendChild( item.create() );
			}			
			
			log( "Inserting control bar." );
			textArea.parentNode.insertBefore( controlBar, textArea );
			
			if ( insertBreak )
			{
				log( "Inserting break." );
				var br = document.createElement("br");
				
				textArea.parentNode.insertBefore( br, controlBar );			
			}
			
			if ( removeMarginTop )
			{
				log( "Removing margin-top." );
				textArea.style.marginTop = "0px";
			}
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
	
	function TagSelection( textArea, tagOpen, tagClose )
	{	
		if ( textArea.selectionStart || textArea.selectionStart == 0 ) //relies on this property.
		{	
			//record scroll top to restore it later.
			var scrollTop = textArea.scrollTop;
			
			//We will restore the selection later, so record the current selection.
			var selectionStart = textArea.selectionStart;
			var selectionEnd = textArea.selectionEnd;
			
			textArea.value = 
				textArea.value.substring( 0, selectionStart ) + //text leading up to the selection start
				tagOpen + 
				textArea.value.substring( selectionStart, selectionEnd ) + //selected text
				tagClose + 
				textArea.value.substring( selectionEnd ); //text after the selection end
			
			textArea.selectionStart = selectionStart + tagOpen.length;
			textArea.selectionEnd = selectionEnd + tagOpen.length;
			
			textArea.scrollTop = scrollTop;
		}	
	}
	
	function LinkSelection( textArea )
	{
		var url = prompt( "Enter the URL:", "" );
	
		if ( url != null )
		{
			TagSelection( textArea, '<a href="' + url + '">', '</a>' );
		}
	}
	
	function EmbedImage( textArea )
	{
		var url = prompt( "Enter the image URL:", "" );
	
		if ( url != null )
		{
			TagSelection( textArea, '<img src="' + url + '"/>', '' );
		}
	}
	
	function addEvent( target, eventName, handlerName )
	{
		target.addEventListener(eventName, function(e){target[handlerName](e);}, false);
	}
}());