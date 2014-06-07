	// ==UserScript==
	// @name        TSL Chat Board Enhancements
	// @namespace   TSLChatEnhancement
	// @description TSL Chat Board Enhancements
	// @metadata    TechSideline,TSL
	// @include     http://chat.virginiatech.sportswar.com/message_board/*
	// @require		http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
	// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js
	// @version     2.2.1
	// ==/UserScript==

		$(document).ready(function()
		{
			  var oldSrc = 'http://virginiatech.sportswar.com/wp-content/uploads/sites/15/2014/01/lvl0.gif';
			  var inThreadSrc = 'http://virginiatech.sportswar.com/wp-content/uploads/sites/15/2014/01/lvl1.gif';
			  var Expand = "http://findicons.com/files/icons/1156/fugue/16/toggle_expand.png";
			  var Collapse = 'http://findicons.com/files/icons/1156/fugue/16/toggle.png';
			  var Search = "<img src='http://png-5.findicons.com/files/icons/117/radium/16/search.png'/>";
			  $('body').append("<div id='NWTempHolder' style='display:none;'></div><div style='position:relative;' id='NWbottomWrapper'><div id='NWbottomRight' style='position:absolute;background-color:#fff;border:8px solid #E87511;padding:10px;'></div></div>");
			  $('img[src="' + oldSrc + '"]').parent().addClass('parent');
			  $('img[src="' + oldSrc + '"]').parent().parent().addClass('NoChildren');
			  $('img[src="' + oldSrc + '"]').attr('src', Collapse);
			  $('img[src="' + inThreadSrc + '"]').parent().addClass('children');
			  $('img[src="' + inThreadSrc + '"]').parent().parent().removeClass('NoChildren').addClass('HasChildren');
			  $('img[src="' + inThreadSrc + '"]').parent().parent().parent().removeClass('NoChildren').addClass('HasChildren');
			  
			  $('.NoChildren').children('.parent').children('.expand').attr('src',oldSrc);
			  $('.entry-header').append("<br/><a href='#' id='ExpandAll'>Expand All</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href='#' id='CollapseAll'>Collapse All</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<a href='#' id='NWClosePreview'>Close Preview</a>");
			  
			  $( "#ExpandAll" ).click(function(e) {
				  e.preventDefault();
				  $('.children').show();
				  
				  $('img[src="' + Expand + '"]').attr('src', Collapse);
			});
			  
			$( "#CollapseAll" ).click(function(e) {
				  e.preventDefault();
				  $('.children').hide();
				  $('img[src="' + Collapse + '"]').attr('src', Expand);
			});
				
            /* Remove the following 2 lines to default to Expanded view */
			$('.children').hide();
			$('img[src="' + Collapse + '"]').attr('src', Expand);  

			$('.subject').each(function( index ) {				  
			  var getLink = $(this).attr('href');
			  var SearchLink = "<a href='"+getLink+"' class='NWPreview'>"+Search+"</a>";
			  $(this).prepend(SearchLink);
			});		
			
			$('.post').on('click', '.expand', function (){
				  var CurrentIMG = $(this).attr('src');
				  var SubjectContent = $(this).parent().html();

				  if (CurrentIMG == Expand)
				  {
					  $(this).attr('src',Collapse);
					  $(this).parent().parent().find('.children').show();
					  
					  // var MainSubject = $(this).parent().parent().html();
					  // MainSubject = MainSubject.replace(SubjectContent,"");
					  // MainSubject = MainSubject.replace("display:none","");
					  
					  // $(this).parent().parent().html(MainSubject);

				  } else {
					  $(this).attr('src',Expand);
					  var MainSubject = $(this).parent().html();
					  MainSubject = "<div class='MainSubject'>" + MainSubject + "</div>";
					  var ThreadContent = $(this).parent().parent().html();
					  ThreadContent = MainSubject + "<div style='display:none' class='collapsedContent'>" + ThreadContent + "</div>";
					  $(this).parent().parent().html(ThreadContent);
				  }
			});
				
			$(document).on('click','.NWPreview',function(e) {
					   e.preventDefault();
					   var pageURL = $(this).attr('href');
						$('#NWbottomRight').load(pageURL + ' .message-body').show().offset({top:e.pageY,left:e.pageX+20});
			});

			$(document).on('click','#NWClosePreview',function(e) {
				   e.preventDefault();    
				   $('#NWbottomRight').hide();
			});
			
			$(document).on('mouseout','.NWPreview',function(e) {
				   e.preventDefault();    
				   //$('#NWbottomRight').hide();
			});
            
            $(document).on('click','#NWbottomRight',function(e) {
      				e.preventDefault();    
				 	$(this).hide();      
            });
						   
		});