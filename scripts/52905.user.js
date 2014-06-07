// Flickr Larger Description Editor
// version 0.5.1
// 2011-04-02
// Copyright (c) 2011, Todd Moon (toddmoon.com)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name		Flickr Larger Description Editor
// @namespace	http://www.toddmoon.com/GreaseMonkey/
// @description	Makes the photo description editor larger when it opens.
// @include		http://*flickr.com/*
// ==/UserScript==

(function(){
		
	var sizes = 
	{		
		"photo":
		{
			"height": "300px"
		},
		"photostream":
		{
			"height": "300px"
		},
		"set":
		{
			"height": "400px"
		},
		"collection":
		{
			"height": "300px"
		},
		"groupDescription":
		{
			"height": "700px",
			"width": "600px"
		},
		"groupAnnouncement":
		{
			"height": "600px"
		}
	}
	
	var DEBUG = false;
	
	function log( m )
	{
		if ( DEBUG && GM_log )
		{
			GM_log( ">> " + m );
		}
	}
	
	fixHeightOfGroupDescription();
	
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
			
			if ( insituParam == "description" )
			{
				if( window.location.toString().indexOf( "/sets/" ) >= 0 )
				{
					log( "Found set textarea" );
					elem.style.height = sizes.set.height;
				}
				else
				{
					if ( isPhotoPage() )
					{
						log( "Found photo page textarea" );
						elem.style.height = sizes.photo.height;
					}
					else
					{
						log( "Found photostream textarea" );
						elem.style.height = sizes.photostream.height;
					}
				}
			}
			else if ( insituParam == "blast" )
			{
				log( "Found group announcement textarea" );
				elem.style.height = sizes.groupAnnouncement.height;
			}
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
				
				log( "Found collection textarea." );
				textArea.style.height = sizes.collection.height;
			}
		}
	}
	
	function fixHeightOfGroupDescription()
	{
		var descriptionTextAreas = document.querySelectorAll( "textarea#form_description" );
			
		log( "Group descriptionTextAreas.length: " + descriptionTextAreas.length );
		
		for ( var i = 0; i < descriptionTextAreas.length; ++i )
		{
			log( "Found group description textarea." );
			
			descriptionTextAreas[i].style.height = sizes.groupDescription.height;
			descriptionTextAreas[i].style.width = sizes.groupDescription.width;			
		}
	}
	
	function isPhotoPage()
	{
		var isPhoto = false;
					
		//Of there is a meta tag with a content=image then this is a photo page, else we assume it's your photostream.
		var metaTags = document.getElementsByTagName( "META" );
		
		for( var i=0; i < metaTags.length; i++ )
		{
			var content = metaTags[i].getAttribute( "content" );
			
			if ( content == "image" )
			{
				isPhoto = true;
				break;
			}
		}
		
		return isPhoto;
	}
	
}());