// ==UserScript==
// @name        AxShare Filter Sitemap
// @namespace   axshare
// @description Add functionality in to improve usefulness of online AxShare experience.
// @include     http://share.axure.com/*
// @include     http://axshare.localhost/*
// @version     1.3
// ==/UserScript==

// Create filter input
var filterInput = '';
filterInput += '<div id="sitemapFilter" style="width: 100%; padding: 4px; background: #f3f3f2; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box;">';
filterInput +=    '<input id="filterInput" type="search" placeholder="Begin typing to filter" style="display: block; width: 100%; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box;">';
filterInput += '</div>';

var annotationsExist = $('.annnoteimage').length || $('#mainFrame').contents().find('.annnoteimage').length;
var annotationVisibility = true;

// Delay execution
var modifyLayout = setInterval(function(){

  // Append filter input
  $('#sitemapHost').prepend(filterInput);
  
  // Make room for our quick filter box
  
  // Get height of container, less the filter box we're adding (height of 22px + a little cushion, 28 works)
  var totalHeight = parseInt($('#interfaceControlFrameContainer').height()) - 28 + 'px';
  $('#sitemapHost').css({'height' : totalHeight});
  
  $(window).on('resize.filterAdjusted', function(){
    var totalHeight = parseInt($('#interfaceControlFrameContainer').height()) - 28 + 'px';
    $('#sitemapHost').css({'height' : totalHeight});  
  });
  
  // Bind keyup to filter down listing
  $('#filterInput').on('keyup.filterInput', function(){updateSitemap(); });
  
  // Build notes pane
  createNotePane();
  
  // Bind hotkeys
  // Control + A = Annotation visibility
  // Control + S = Toggle annotation summary view
  
  $(document).on('keydown.annotations', function(e){
    
    // Contral + A toggles annotation icons
    if (e.which === 65 && ( e.ctrlKey || e.metaKey )){
      
      e.preventDefault();
      
      if (annotationVisibility || annotationsExist){
        
        // Hide annotationVisibility if they're visible
        $('#mainFrame').contents().find('.annnoteimage').fadeOut('fast');
        $('.annnoteimage').fadeOut('fast');
        
        // Update state to 'false'
        annotationVisibility = false;
      } else {
        
        // Show annotationVisibility if they're hidden
        $('#mainFrame').contents().find('.annnoteimage').fadeIn('fast');
        $('.annnoteimage').fadeIn('fast');
        
        // Update state to 'false'
        annotationVisibility = true;
        
      }
    }
    
    // Contral + S toggles notes pane
    if (e.which === 83 && ( e.ctrlKey || e.metaKey )){
      
      e.preventDefault();
      
      var noteOverlay = $('#axe-overlay');
      if (noteOverlay.is(':visible')){
        noteOverlay.fadeOut();
      } else {
        noteOverlay.fadeIn();
      } 

    }    
    
  });
  
  // Only run once  
  clearTimeout(modifyLayout);  
},500);


// Function to update sitemap contents
function updateSitemap(){
  
  // Get contents of our input field
  var filterVal = $('#filterInput').val().toLowerCase();
  
  // Iterate through page names & show if they match our filter value
  $('.sitemapPageName').each(function(){
    
    // Our page name's wrapping node
    var node = $(this).closest('.sitemapNode');
    
    // Current text value
    var currentVal = $(this).text().toLowerCase();
    
    // If the inputted value is the same as our page name, show it, otherwise hide!
    if (currentVal.indexOf(filterVal) >= 0){
      
      // If the node is nested, make sure parent container is visible and grey it out, slightly
      if( node.parents('.sitemapExpandableNode').is(':hidden') ) {
        node.parents('.sitemapExpandableNode').show().css({'color' : '#ccc'});
      }
      
      // Show the node if it matches & set it to the defaut color
      node.show().css({'color' : '#333'});
      
      // TODO: Wrap the matching text in a span and bold text
      
    } else {
      
      // Hide the node if it doesn't
      node.hide();
      
    }
  });
}

// Copy in-page annotations into dialogue box when a linear flow is needed.
function createNotePane(){

  // Generate only if annotations exist
  if ($('.annnoteimage').length){
    
    // Arrays to store notes
    var annotationTitle = [];
    var annotationName = [];
    var annotation = [];
    
    // Dialogue boxes generated when clicking the annotation icon
    var dialogueBoxes = '.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.dialogFix.ui-draggable.ui-resizable';
    
    // Simulate click to generate notes
    $('.annnoteimage').click();
    
    // Iterate through windows
    $(dialogueBoxes).each(function(){
      
      // Push the contents of the annotation dialogue box title, description and the annotation itself to arrays
      annotationTitle.push( $('.ui-dialog-title', this).text() );
      annotationName.push( $('.annotationName', this).text() );
      annotation.push( $('.annotation', this).text() );
      
      // Close when finished
      $('.ui-dialog-titlebar-close.ui-corner-all', this).click();
      
    });
     
    // Build overlay div then list of annotations.  Iterate through arrays to build contents of notes.
    var notesPane = '<div id="axe-overlay" style="position: absolute; z-index: 9999; width: 100%; height: 100%; background: rgba(0,0,0,.65);">';
    notesPane += '<ul style="width: 80%; max-height: 80%; overflow-y: auto; margin: 50px auto; padding: 28px; border: 1px solid #ccc; background: #f3f3f2; font-family: Arial; font-size: 12px; list-style: none;">';
    
    notesPane += '<h1 style="width: 100%; border-bottom:1px solid #ccc; margin-bottom: 28px;">Annotations Overview</h1>';
    
    for(i=0; i < annotationTitle.length; i++) {
      notesPane += '<li style="margin-bottom: 24px;">'
      notesPane += '<h2 style="font-size: 14px;">' + '<span style="width: 20px; height: 20px; padding: 2px 4px; margin-right: 14px; background: yellow; border-radius: 3px; line-height: 20px; text-align: center; color: black; border: 1px solid black;">' + (i+1) + '</span>' + annotationTitle[i] + '</h2>'
      notesPane += '<div style="margin-left: 34px;">' + annotation[i] + '</div>'
      notesPane += '</li>';
    }
    
    notesPane += '</ul>';
    notesPane += '</div>';
    
    
    // Generate note pane overlay
    var attachHere;
    
    if($('#rightContainer').length){
      attachHere = '#rightContainer';
    } else {
      attachHere = '#main_container';
    }
    
    $(attachHere).append(notesPane);
    $('#axe-overlay').hide();
    
  }
  
}
