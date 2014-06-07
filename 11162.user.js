// ==UserScript==
// @name ShackFocus
// @namespace 
// @description No focus when clicking on posts.
// @include http://*.shacknews.com/laryn.x?*
// @include http://shacknews.com/laryn.x?*
// @include http://*.shacknews.com/frame_laryn.x?*
// @include http://shacknews.com/frame_laryn.x?*
// ==/UserScript==
/*

- kne
 8/5/2007

*/

window.opera.defineMagicFunction('show_item_fullpost', 
      function ( real_func, real_this, root_id, article_id, fullpost_element ) 
      {
          remove_old_fullpost( root_id, article_id, parent.document );
          
          var parentRoot = parent.document.getElementById( "root_" + root_id );
          // Now we make a new preview node
          var newPreviewParent = parent.document.getElementById( "item_" + article_id );
          //var newPreviewParent = find_element( parentRoot, "li", "item_" + article_id );
          
          // Let's grab me...
          push_front_element( newPreviewParent, fullpost_element );
          if ( (window.navigator.userAgent.indexOf( "MSIE " ) < 0 ) && (window.navigator.userAgent.indexOf( "WebKit" ) < 0 ) )  {
          //  fullpost_element.scrollIntoView( true );
          }

          newPreviewParent.className = add_to_className( newPreviewParent.className, "sel" );
          var newOneline = find_element( newPreviewParent, "DIV", "oneline" );
          newOneline.className = add_to_className( newOneline.className, "hidden" );
      }

   );

