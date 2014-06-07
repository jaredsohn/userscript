// ==UserScript==
// @name           Shack FF3B3 Scrolly Fixer!
// @namespace      blarrr
// @description    This scripts poops on your face. You should uninstall it immediately. Seems to fix scrolling issue with Firefox 3 Beta 3 on jazzview.js dated Feb 13, 2008
// @include        http://*.shacknews.com/laryn.x?*      
// @include        http://shacknews.com/laryn.x?*        
// @include        http://*.shacknews.com/frame_laryn.x?*
// @include        http://shacknews.com/frame_laryn.x?* 
// ==/UserScript==
/* 
I stole almost everything here with stuff I found on ThomW's lmnopc shack2007 directory. Yay stealing!
This is based on one of ThomW's scripts and on some of the jazzview.js code.

This Fixer script probably sucks because I HAVE NO IDEA WHAT I AM DOING.

** modified by sirkne to fix capped threads 2/14/08
*/


(function() {

	// grab start time of script
	var benchmarkTimer = null;
	var scriptStartTime = getTime();

	// UTILITY FUNCTIONS
	function getTime() { benchmarkTimer = new Date(); return benchmarkTimer.getTime(); }
	
	// ThomW: I took getElementsByClassName and stripped it down to just what's needed by this script
	function getElementByClassName(oElm, strTagName, strClassName)
	{
		var arrElements = oElm.getElementsByTagName(strTagName);
		var oElement;
		for(var i=0; i < arrElements.length; i++)
		{
			oElement = arrElements[i];
			if (oElement.className.indexOf(strClassName) == 0)
			{
				return oElement;
			}
		}
	}

	// handle iframe calls
	if (String(location.href).indexOf('frame_laryn.x') != -1)
	{
		// override standard show_item_fullpost with one that supports this script
		if (!unsafeWindow.shackid_show_item_fullpost)
		{
			unsafeWindow.shackid_show_item_fullpost = unsafeWindow.show_item_fullpost;
			unsafeWindow.show_item_fullpost = function(root_id, article_id, fullpost_element)
			{
				// Don't call original function
				// unsafeWindow.shackid_show_item_fullpost(root_id, article_id, fullpost_element);

				// do dumb shit, break everything
				
				unsafeWindow.remove_old_fullpost( root_id, article_id, parent.document );
			   
				var parentRoot = parent.document.getElementById( "root_" + root_id );
				// Now we make a new preview node
				var newPreviewParent = parent.document.getElementById( "item_" + article_id );
				//	var newPreviewParent = find_element( parentRoot, "li", "item_" + article_id );
				
				// Let's grab me...
				unsafeWindow.push_front_element( newPreviewParent, fullpost_element );
				
				// This piece of code makes FF3B3 die in a fire. So we won't do it >:(
				
				//	if ( (window.navigator.userAgent.indexOf( "MSIE " ) < 0 ) && (window.navigator.userAgent.indexOf( "WebKit" ) < 0 ) ) 
				//	{
				//	fullpost_element.scrollIntoView( false );
				// }
			
				newPreviewParent.className = unsafeWindow.add_to_className( newPreviewParent.className, "sel" );
				var newOneline = unsafeWindow.find_element( newPreviewParent, "DIV", "oneline" );
				newOneline.className = unsafeWindow.add_to_className( newOneline.className, "hidden" );

			}
		}

		if (!unsafeWindow.shackid_clickItem) 
		{
			unsafeWindow.shackid_clickItem = unsafeWindow.clickItem;
			unsafeWindow.clickItem = function(root, id) 
			{
				var iframe = unsafeWindow.frames[ 'dom_iframe' ];
				// First, check and see if we've cached the item in the iframe

				var subItem = iframe.document.getElementById( "item_" + id );

				if ( unsafeWindow.uncap_thread( root ) )
				{ //added by sirkne
					parent.document.getElementById( "item_" + id ).scrollIntoView( false );
				}

				unsafeWindow.sLastClickedItem = id;
				unsafeWindow.sLastClickedRoot = root;
				
				if ( iframe.document.getElementById( 'items_complete' ) &&
					   subItem )
				{
					var fullpost = unsafeWindow.find_element( subItem, "DIV", "fullpost" );
					var cloned = unsafeWindow.import_node( parent.document, fullpost )

					unsafeWindow.show_item_fullpost( root, id, cloned );
				  return false;
				}
				else
				{
				// 	  iframe.src = "frame_laryn.x?root=" + root + "&id=" + id;
				  unsafeWindow.navigate_page_no_history( iframe, "frame_laryn.x?root=" + root + "&id=" + id );
				  return false;
				}

			}
		}
	}

	// all other pages
	else
	{
		if (!unsafeWindow.shackid_show_item_fullpost)
		{
			// override standard show_item_fullpost with one that supports this script
			unsafeWindow.shackid_show_item_fullpost = unsafeWindow.show_item_fullpost;
			unsafeWindow.show_item_fullpost = function(root_id, article_id, fullpost_element)
			{
				// Do call original function
				// unsafeWindow.shackid_show_item_fullpost(root_id, article_id, fullpost_element);

				// do dumb shit, break everything
				
				unsafeWindow.remove_old_fullpost( root_id, article_id, parent.document );
			   
				var parentRoot = parent.document.getElementById( "root_" + root_id );
				// Now we make a new preview node
				var newPreviewParent = parent.document.getElementById( "item_" + article_id );
				//	var newPreviewParent = find_element( parentRoot, "li", "item_" + article_id );
				
				// Let's grab me...
				unsafeWindow.push_front_element( newPreviewParent, fullpost_element );
				
				// This piece of code makes FF3B3 die in a fire. So we won't do it >:(

				//	if ( (window.navigator.userAgent.indexOf( "MSIE " ) < 0 ) && (window.navigator.userAgent.indexOf( "WebKit" ) < 0 ) ) 
				//	{
				//	fullpost_element.scrollIntoView( false );
				// }
			
				newPreviewParent.className = unsafeWindow.add_to_className( newPreviewParent.className, "sel" );
				var newOneline = unsafeWindow.find_element( newPreviewParent, "DIV", "oneline" );
				newOneline.className = unsafeWindow.add_to_className( newOneline.className, "hidden" );

			}
		}
		if (!unsafeWindow.shackid_clickItem) 
		{
			unsafeWindow.shackid_clickItem = unsafeWindow.clickItem;
			unsafeWindow.clickItem = function(root, id) 
			{ 
				var iframe = unsafeWindow.frames[ 'dom_iframe' ];
				// First, check and see if we've cached the item in the iframe

				var subItem = iframe.document.getElementById( "item_" + id );

				if ( unsafeWindow.uncap_thread( root ) )
				{ //added by sirkne
					parent.document.getElementById( "item_" + id ).scrollIntoView( false );
				}

				unsafeWindow.sLastClickedItem = id;
				unsafeWindow.sLastClickedRoot = root;
				
				if ( iframe.document.getElementById( 'items_complete' ) &&
					   subItem )
				{
					var fullpost = unsafeWindow.find_element( subItem, "DIV", "fullpost" );
					var cloned = unsafeWindow.import_node( parent.document, fullpost )

					unsafeWindow.show_item_fullpost( root, id, cloned );
				  return false;
				}
				else
				{
				// 	  iframe.src = "frame_laryn.x?root=" + root + "&id=" + id;
				  unsafeWindow.navigate_page_no_history( iframe, "frame_laryn.x?root=" + root + "&id=" + id );
				  return false;
				}

			}
		}
	}



	// log execution time
	if (GM_log)
	{
		GM_log((getTime() - scriptStartTime) + 'ms');
	}



})();
