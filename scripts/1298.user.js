// ==UserScript==
// @name		WPPreviewDraft
// @version		0.2
// @namespace	http://mrspeaker.webeisteddfod.com/greasemonkey
// @author		Mr Speaker
// @description	Preview draft pages in WP
// @include		http://yoursite.com/wp-admin/edit.php
// @include		http://yoursite.com/wp-admin/post.php
// ==/UserScript==

(
function() 
{
	/* Global variables and constants */
	var g_timer = null;
	var g_overlay = null;
	
	var g_posx = 0;
	var g_posy = 0;
	
	var DIV_WIDTH = 333;
	var DIV_HEIGHT = 161;
	
	var CLOSE_BUTTON_HTML = "<input type='button' value='close' onclick='this.parentNode.parentNode.removeChild(this.parentNode);'><br/>";
	
	/* Check all the links on the page, and add the popup div to any with title "Edit this draft" */
	links = document.getElementsByTagName( "a" );
	for( var i = 0; i < links.length; i++ )
	{
		if( links[ i ].title == "Edit this draft" )
		{
			links[ i ].addEventListener( "mouseover", setTimer, false );
			links[ i ].addEventListener( "mouseout", clearTimer, false );
		}
	}
	
	//===================---------------------------------------------
	function addOverlay()
	//===================
	{
		/* This function adds the "overlay" div to the document DOM */
		
		if( !document.getElementById("PreviewDraftWP" ) )
		{
			var overlay = document.createElement( "div" );
			overlay.setAttribute( "id", "PreviewDraftWP" ) 
			overlay.style.position 		= "absolute";
			overlay.style.width 		= DIV_WIDTH + "px";
			overlay.style.height 		= DIV_HEIGHT + "px";
			overlay.style.left 			= g_posx + "px";
			overlay.style.top 			= g_posy + "px";

			overlay.style.fontSize		= "8pt";
			overlay.style.padding 		= "4px";
			overlay.style.border 		= "1px solid #ddd";
			overlay.style.backgroundColor = "#eee";
			overlay.style.overflow 		= "auto";
		
			// Add it to the dom
			document.body.appendChild( overlay );
			
			// Grab a global reference to it.
			g_overlay = document.getElementById( "PreviewDraftWP" );
		}
		
		g_overlay.innerHTML = CLOSE_BUTTON_HTML + "<strong>Loading...</strong>";

	}
	
	//====================----------------------------------------------
	function setTimer( e )
	//====================
	{
		// Set current mouse position
		g_posx = e.clientX;
		g_posx = g_posx + DIV_WIDTH < window.document.width - 20 ? g_posx : window.document.width - DIV_WIDTH - 20;
		g_posy = e.clientY + 10;
		
		// set the timer to popup the div
		g_timer = window.setTimeout( function(){ addOverlay(); getPostHtml( e.target, e.clientX, e.clientY ); }, 1000 );
	}
	
	//======================--------------------------------------------
	function clearTimer( e )
	//======================
	{
		clearTimeout( g_timer );
	}
	
	//==============================------------------------------------
	function getPostHtml( p_address )
	//===============================
	{
		GM_xmlhttpRequest(
		{
			method:"GET",
			url:p_address,
			headers:
			{
				"User-Agent":"monkeyagent",
				"Accept":"text/monkey,text/xml",
			},
			onload:function( details )
			{
				ParseResponse( details.responseText );
			}
		});
	}
	
	//==================================------------------------------
	function ParseResponse( p_response )
	//==================================
	{
		/* Dodgy "parsing" that grabs the contents from the textarea */
		var START_OF_AREA = "id=\"content\">";
		var END_OF_AREA = "</textarea>";
		var startIndex = p_response.indexOf( START_OF_AREA ) + START_OF_AREA.length;
		var endIndex = p_response.indexOf( END_OF_AREA, startIndex );
		
		// Did we find it?
		if ( startIndex > 0 && endIndex > 0 )
		{
			g_overlay.style.left = g_posx + "px";
			g_overlay.style.top = g_posy + "px";
			g_overlay.innerHTML = CLOSE_BUTTON_HTML + p_response.substring( startIndex, endIndex ).replace( /\n/g, "<br/>" );
		}
	}
}
)();
