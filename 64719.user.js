// Highrise Rich Edit
// Based on a script that is Copyright (c) 2009, Todd Moon (toddmoon.com) & jrhyley ( http://www.flickr.com/people/jrhyley/ )
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          Highrise Rich Edit
// @description   Adds a simple rich edit interface (Italic, Bold, Underline, Strike, Blockquote, Link, Image, Small) to most text areas in Highrise.
// @namespace     http://www.toddmoon.com/GreaseMonkey/
// @include       http://*highrisehq.com/*
// @include       https://*highrisehq.com/*
// ==/UserScript==

(function () {
  if (window.fluid) {
    // == CONSTANTS == //
    
    // KSA: remove server from url
    var MYHIGHRISE = window.location.hostname;
    
    var COMMAND_FLAGS = {
      ITALICS: 1,
      BOLD: 2,
      UNDERLINE: 4,
      STRIKE: 8,
      QUOTE: 16,
      LINK: 32,
      IMAGE: 64,
      SMALL: 128
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
//          COMMAND_FLAGS.UNDERLINE |
//          COMMAND_FLAGS.STRIKE |
//          COMMAND_FLAGS.QUOTE |
          COMMAND_FLAGS.LINK
//          COMMAND_FLAGS.IMAGE |
//          COMMAND_FLAGS.SMALL
        );
        
        controlBar.inject( textArea );
      }
    }
    
    var pathSegments = getLowercasePathSegments( document.location.pathname );
            
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
            "<span class='u'>underline</span>",
            function()
            {
              TagSelection( targetTextArea, "<span class='u'>", "</span>" );
            }
          );
          
          controlBar.appendChild( item.create() );
        }  
        
        if ( ( commandFlags & COMMAND_FLAGS.STRIKE ) == COMMAND_FLAGS.STRIKE )
        {
          var item = new ControlBarItem(
            "<span class='s'>strike</span>",
            function()
            {
              TagSelection( targetTextArea, "<span class='s'>", "</span>" );
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
        
        if ( ( commandFlags & COMMAND_FLAGS.SMALL ) == COMMAND_FLAGS.SMALL )
        {
          var item = new ControlBarItem(
            "small",
            function()
            {
              TagSelection( targetTextArea, "<small>", "</small>" );
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
          
          descriptionDiv.startEditing = function() {
            descriptionDiv.richEdit_OriginalStartEditing();
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
        // KSA: remove server from url
        var h1 = "https://" + MYHIGHRISE;
        var h2 = "http://" + MYHIGHRISE;
        if (url.indexOf(h1) == 0)
          url = url.substring(h1.length,url.length);
        else if (url.indexOf(h2) == 0)
          url = url.substring(h2.length,url.length);
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
  }
})();