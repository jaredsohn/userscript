// Flickr SPi-V Link in Description
// version 0.6
// 2010-01-28
// Copyright (c) 2007, Todd Moon (toddmoon.com)
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
// select "Flickr SPi-V Link in Description", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name		Flickr SPi-V Link in Description
// @namespace	http://fieldofview.com/flickrtools/greasemonkey/
// @description	Allows you to add a link to SPi-V when editing your equirectangular photo's description.
// @include		http://*flickr.com/photos/*
// ==/UserScript==

//Feel free to change this. Make sure that {0} is in the href attribute for the link.
var SPV_LINK_FORMAT = "<a target='_blank' href='{0}'>{1}</a>";

var SPV_DEFAULT_TEXT_PREAMBLE = "View this panorama in the ";
var SPV_DEFAULT_LINK_TEXT = "interactive viewer."

var SPV_INFO = "(This will open a new window to SPi-V, an interactive panorama viewer created by <a href='http://www.flickr.com/people/aldo/'>Aldo</a> and hosted at fieldofview.com. Requires <a href='http://www.adobe.com/shockwave/download/download.cgi'>Adobe Shockwave</a>.)";

//If you had text selected when you clicked the button and this is true, the script will turn the highlighted text into the SPi-V link then append the SPi-V info. If false, it will only create the link and not add the SPi-V info.
var ADD_SPV_INFO_WHEN_TEXT_WAS_SELECTED = false;

var PHOTO_PAGE_ADD_LINK_BUTTON_IMAGES = new Object();
PHOTO_PAGE_ADD_LINK_BUTTON_IMAGES.COLOR = "data:image/gif;base64,R0lGODlhPwAYANUAAP%2F%2F%2FwAAAJmZmf39%2FOPj5FZnivf29rq9xJmmv25%2BoMvLzNnb3fn5%2Bqm%2F4XB4j6KptDZBYaKkqoabv97f39TSzbO2vICMo%2FDw8DRQipSt1Nzh57vO8LS%2F0aqutfT1%2BOXi25CdtfPy8sXL2NXc6vDz99TV3BgoWbbD2czU4IuLkoeVrOXr8wgOQtbU01xfddrY2HSW1MzHwevo4HCKv%2BLm7Ofp7O3u71BuppGaqPXy7Ozr6O7v8rGspry4r4Si046FeyH5BAAAAAAALAAAAAA%2FABgAAAb%2FQIBwSCwaj8ik8ihYOp9QZzNKrT6n1mzSsLPVaDUGU0sueiaHCC5RKFhKRmxZq3lUNERNApIKEeUBAUKBggCERYeHhkSFi0MlDicGBAR%2BKwsNMCYuF0NYhYKgjo2No0akQwYQHAMKCwsvOyIiKhIwLA4DQp%2BJg6ZDgYPBi8OhqQ4FAAoTABctKwchBg8SMyYKu8C%2BoqKIjr6M3x4mNDkUBjUKBAAjFQYyFhkYCbqf28XDwt3g4UMREB5eMJhQYYIuAAQeADiQ4AaGdXLmRElxgwSFAS0IHAQwAU6rGRjgRJT4JEUCEi0uLBjgYQSJATYUMCAAIkMBFABGHkHFk58SxgEYNnA4gGLEiRMrSDDQQOEAggYFFuR8wpPbtyUxWMDIcIIDCAQIRKAQMQIFgg0SLHTSeUqbsVClljCAgKGBBAUGFqro8KJCg78FDmRz0tPQ2ygUWPjIYIFADhkfIFPbMMMBjcFLehWO%2B9PEBgQR1HSIYEEFB5sxPJGswmDBhx8QEjx4AOIrWDY8KGicujrKgBAEdPRwAaGAgwTIXKSI8YFAXt69fQtReaBDhwoKdOTdCD26d8zfvQsYT768%2BfPo06tfn%2F5AEAA7";
PHOTO_PAGE_ADD_LINK_BUTTON_IMAGES.GREY = "data:image/gif;base64,R0lGODlhPwAYAOYAAP%2F%2F%2F39%2Ff%2F7%2B%2Fvz8%2FMLCwr%2B%2Fv%2FLy8vj4%2BJOTk9DQ0Ozs7ODg4Onp6dzc3OPj4%2FX19cjIyLm5ubq6umlpaeTk5Ofn5%2Ff396SkpLS0tPn5%2Bdra2tLS0sXFxerq6uHh4Z6enqKiotXV1e%2Fv79fX19nZ2fT09Ovr6%2Bbm5tTU1KqqqrKyssDAwLy8vI%2BPj5qamnV1dejo6LCwsMrKyq2traenp9%2Ff387OzoGBgYqKilhYWPDw8Hp6eszMzPr6%2BoWFhZWVlYaGhgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAA%2FABgAAAf%2FgACCg4SFhoeIiYqLjI2Oj5CRkpOUlYYZJQYiCiIDlp%2BJFic8BRgXLggxHgKgrYIwBTIMhB0XLzEPiQEBgru8AL6FwcHAhL%2FFgw4gKBkKDLkGFCEREwgGh7%2B82cjHx9yDGb2DPoMHOwkDJA4UDgYaDRgSEhMXnsLD4tuDu738xf7ayn1AAIDECQAlahiw8cBCARYYJowwtK2iOGHILu7LeGCCAgMNDojQYELACRnNUnC4QcPexn8A%2FfXTp%2FGloAIBDjgYUAFCBU8COhQAkICGCyAKXElK8cFCgwELSg464QHAAA0xcFRVCikFCAs1SlAYkAHGAwEGQgzoIAHCjwWPxrplDJhRkYobNRIk8FBhBAodFgYw0JCAwAYEFOJuBPjPEYocLCCM2CCBAIEGC0gwWFBgQYQZJRTnayyT0YAXLTZEIHEAgA0VHBzISIAiBIINkORmC%2BhNkYAGOThASPGsQwUFsCIsUOEiaVx%2BdBvXTcRqxoQFBCRAzD4DwwYOCEIAYMX1UQ8HFUC8uEBgRYQIBdpfQLCigdTyjgQ8YKADAo4dLXwAwkAt0DACAya0hh8kArASTWEEQKCBCK01uOCFGGaoIVeBAAA7";
PHOTO_PAGE_ADD_LINK_BUTTON_IMAGES.COLOR_PRESSED = "data:image/gif;base64,R0lGODlhPwAYANUAAP%2F%2F%2FwAAAJmZmf39%2FOPj5FZnivf29rq9xJmmv25%2BoMvLzNnb3fn5%2Bqm%2F4XB4j6KptDZBYaKkqoabv97f39TSzbO2vICMo%2FDw8DRQipSt1Nzh57vO8LS%2F0aqutfT1%2BOXi25CdtfPy8sXL2NXc6vDz99TV3BgoWbbD2czU4IuLkoeVrOXr8wgOQtbU01xfddrY2HSW1MzHwevo4HCKv%2BLm7Ofp7O3u71BuppGaqPXy7Ozr6O7v8rGspry4r4Si046FeyH5BAAAAAAALAAAAAA%2FABgAAAb%2FwINgSCwaj8ikcpkEOJ%2FQqHRKrVqngqt2y9Vmu%2BCuYWer0WoM6jfMpnomhwguUShYSti2Pqp5VDRQGgkQKSFRawEBTomKAIxRj4%2BOUI2TTyUOJwYEBIYrCw0wJi4XUF%2BNiqiWlZWrUqxPBhAcAwoLCy87IiIqEjAsDgNPp5GLrk%2BJi8mTy6mxDgUAChMAFy0rByEGDxIzJgrDxszGqpCW4sjnHiY0ORQGNQoEACMVBjIWGRgJwgCn5M2WKSuHLt2TCBA8vGAwocKEfgQeADiQ4AaGef726ElxgwSFAS0I9AMwAU%2BtGRjwZNTIJkUCEi0uLBjgYQSJATYUMCAAIkMBxhRO1lSBRbRgFQEYNnA4gGLEiRMrSDDQQOEAggYFFgTVQlSVsy0xWMDIcIIDCAQIRKAQMQIFgg0SLJRaaaWoM4FaGEDA0ECCAgMTVXR4UaGB4QIHwl0p6uhuFwosfGSwQCCHjA%2BXuW2Y4YCG4rrJvo4758XEBgQR5HSIYEEFB58xTLFkw2DBhx8QEjx4AOIsWjo8KIjcOhvMgBAEdPRwAaGAgwTQXKSI8YEAYOLFjTuReaBDhwoKdAAeiT27eSlCz6unu159EAA7";

var pathSegments = getLowercasePathSegments( document.location.pathname );

//Override each startEditing function on each description_div on the page.
if ( unsafeWindow.global_photos && youOwnThisPage( pathSegments ) )
{
	for( photoID in unsafeWindow.global_photos )
	{
		var descriptionDiv = unsafeWindow.document.getElementById( "description_div" + photoID );
	
		var linker = new SpivLinker( descriptionDiv, photoID );
		linker.initialize();
	}
}

function SpivLinker( descriptionDiv, photoID )
{
	this.initialize = function()
	{
		if ( typeof( descriptionDiv.startEditing ) == 'function' )
		{	
			descriptionDiv.spvLinkInDescriptionFlickrStartEditing = descriptionDiv.startEditing; //If you copy this pattern you MUST use your own name, not spvLinkInDescriptionFlickrStartEditing, otherwise running two scripts with this pattern and that name will cause infinite recursion.
			
			//Unique name applies here too.
			descriptionDiv.addSpivLinkButton = function()
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
			
					//Create the button and assign properties.
					var addLinkButton = document.createElement('img');
					addLinkButton.id = "gm_spvAddLink";
					addLinkButton.width = "63";
					addLinkButton.height = "24";
					addLinkButton.border = "0";
					addLinkButton.style.cursor = "pointer";
					addLinkButton.src = PHOTO_PAGE_ADD_LINK_BUTTON_IMAGES.GREY;
					addLinkButton.editorTextArea = textArea;
					addLinkButton.photoID = photoID;			
					
					assignAddLinkButtonDelegates( addLinkButton );
					
					var div = document.createElement('div');
					div.style.marginBottom = "10px";
					
					div.appendChild( addLinkButton );
					
					textArea.parentNode.insertBefore( div, textArea );
				}
			} 
			
			descriptionDiv.startEditing = function( event ) {
				descriptionDiv.spvLinkInDescriptionFlickrStartEditing( event );
				descriptionDiv.addSpivLinkButton();
			};
			
			descriptionDiv.onclick = descriptionDiv.startEditing;
		}
	}
}

function assignAddLinkButtonDelegates( addLinkButton )
{		
	addLinkButton.InsertLink = insertLink;
	addEvent(addLinkButton, "click", "InsertLink");
	
	assignAddLinkButtonMouseOver( addLinkButton );
}

//Assign image changing mouse-over (out, up, down) events for a preview button.
function assignAddLinkButtonMouseOver( addLinkButton )
{
	addLinkButton.ShowColorImage = showColorImage;
	addEvent(addLinkButton, "mouseover", "ShowColorImage");
	addEvent(addLinkButton, "mouseup", "ShowColorImage");
	
	addLinkButton.ShowGreyImage = showGreyImage;
	addEvent(addLinkButton, "mouseout", "ShowGreyImage");
	
	addLinkButton.ShowColorPressedImage = showColorPressedImage;
	addEvent(addLinkButton, "mousedown", "ShowColorPressedImage");
}

//Event Handler to show the colored image.
function showColorImage()
{
	this.src = PHOTO_PAGE_ADD_LINK_BUTTON_IMAGES.COLOR;	
}

//Event Handler to show the grey image.
function showGreyImage()
{
	this.src = PHOTO_PAGE_ADD_LINK_BUTTON_IMAGES.GREY;
}

//Event Handler to show the pressed color image.
function showColorPressedImage()
{
	this.src = PHOTO_PAGE_ADD_LINK_BUTTON_IMAGES.COLOR_PRESSED;
}

//Event handler: Inserts the link html into the description editor.
function insertLink()
{
	if ( this.editorTextArea )
	{
		var text = getText( this.editorTextArea, this.photoID );
		
		insertTextIntoTextArea( this.editorTextArea, text );
	}
}

function youOwnThisPage( pathSegments )
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
	
//Finds path segments in the given path. Removes the protocol and domain name if present. Returns an array of the segments.
function getLowercasePathSegments( path )
{
	//replace preceding protocol and domain and then any preceding or trailing slashes then split on the remaining slashes.
	return path.toLowerCase().replace( /^https?:\/\/[^\/]*/, "" ).replace(/^\/+|\/+$/g,"").split("/");
}

//Builds the link text.
function getText( textArea, photoID )
{
	var url = "http://fieldofview.com/flickr/?page=photos/" + unsafeWindow.global_nsid + "/" + photoID + "&amp;tags=equirectangular";
	
	var text = "";
	
	if ( isTextSelectedInTextArea( textArea ) )
	{
		var linkText = getSelectedTextInTextArea( textArea );
		
		text = generateLink( url, linkText );
		
		if ( ADD_SPV_INFO_WHEN_TEXT_WAS_SELECTED )
			text += "\n\n" + SPV_INFO;
	}
	else
	{
		text = SPV_DEFAULT_TEXT_PREAMBLE + generateLink( url, SPV_DEFAULT_LINK_TEXT );
		text += "\n\n" + SPV_INFO;
	}
	
	return text;
}

function generateLink( url, linkText )
{
	return SPV_LINK_FORMAT.replace( "{0}", url ).replace( "{1}", linkText );
}

//Inserts specified text into the specified text area at the current selection.
function insertTextIntoTextArea( textArea, text )
{
	var startPos = textArea.selectionStart;
	var endPos = textArea.selectionEnd;
	
	textArea.value = textArea.value.substring(0, startPos)+ text + textArea.value.substring(endPos, textArea.value.length); 	
}

function isTextSelectedInTextArea( textArea )
{
	return textArea.selectionStart != textArea.selectionEnd;
}

function getSelectedTextInTextArea( textArea )
{
	return textArea.value.substring( textArea.selectionStart, textArea.selectionEnd );
}

//Delegated event wire-up utitlity. Using this allows you to use the "this" keyword in a delegated function.
function addEvent( target, eventName, handlerName )
{
	target.addEventListener(eventName, function(e){target[handlerName](e);}, false);
}

//Determines if the individual photo is in the "equirectangular" pool
function isPhotoInEquirectangularPool()
{
	var groups = unsafeWindow.in_groupsA;
	
	for( var i = 0; i < groups.length; i++ )
	{		
		if ( groups[i].nsid == "44671723@N00" && groups[i].status == 1 )
			return true;
	}
	
	return false;
}