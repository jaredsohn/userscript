// ==UserScript==
// @name                Landbote.ch PDF Archive Optimization
// @author         		Reader123
// @version        		2011-08-02
// @namespace	        http://www.landbote.ch/hacks
// @description	        Changes the way the PDF-Archive looks. Optimized for large Screens. No more Fullscreen needed to Read the Newspaper
// @include				http*://*landbote.ch/*
// ==/UserScript==

if(unsafeWindow.console){
   //var GM_log = unsafeWindow.console.log;
}

GM_log('Landbote.ch Optimizer Loaded');



(function(){
  //boilerplate greasemonkey to wait until jQuery is defined...
  function GM_wait()
  {
    if(typeof unsafeWindow.jQuery == 'undefined')
      window.setTimeout(GM_wait,100);
    else
      unsafeWindow.jQuery(function() { 
	  letsJQuery(unsafeWindow.jQuery); });
  }
  GM_wait();

  function letsJQuery($)
  {
    if(document.URL.indexOf("landbote.ch/meta/pdf-archiv") != -1) {
		GM_log('PDF Archiv Detected (User needs to be logged in)');
		
		
		//Move the Flashplayer to a better Location
		function moveReader() {
			//Cleanup old Div Elements
			if($('.hackflashmover').length>0) {
				$('.hackflashmover').remove();
			}
			
			if($("#FlexPaperViewer").length>0) {
			
				//Add Div to move the Flashplayer Properly
				$("#FlexPaperViewer").wrap('<div class="hackflashmover" />');
				$(".hackflashmover").css("margin-left", "195px").css("position", "relative").css("z-index", "20");

				//Set New Height and Width for better Reading (Depending on the current Page Size)
				$("#FlexPaperViewer").attr("width", $(document).width()-205);
				$("#FlexPaperViewer").attr("height", 2500);
				
				//Hover the Flash over the White DIV
				$("#FlexPaperViewer").append('<param name="wmode" value="transparent"/>');
				
				
				//Add White Background to Prevent Scrolling while Changing the Page
				if($('.hackBackground').length == 0) {
					$(".hackflashmover").after('<div class="hackBackground" />');
					$(".hackBackground").css("position", "absolute").css("z-index", "10");
					$(".hackBackground").css("top", "180px").css("left", $("#FlexPaperViewer").offset().left+ "px");
					$(".hackBackground").css("width", $("#FlexPaperViewer").attr("width") + "px").css("height", (parseInt($("#FlexPaperViewer").attr("height"))+8)+ "px");
					$(".hackBackground").css("background-color", "#ffffff");
				}
			}
		} //end moveReader
		
		//Wait until the Reader has been Reloaded by the Landbote.ch Jquery Scripts and Move him again.
		function waitForReaderAndMoveIt(i) {
			moveReader();
			if($('.hackflashmover').length == 0) {
				window.setTimeout(waitForReaderAndMoveIt,100);
				
			} 
		}
		
		//Move the Panels to a better location (Sidebar Panel)
		function movePaneltoSide() {
			$(".column_half:first, .column_half:gt(0), .column_half:gt(1), .column_half:gt(2), .column_half:gt(3)").wrapAll('<div class="hacksidepanel" />');
			$(".column_half:first").css("margin-left", "0px");
			$(".hacksidepanel").css("float", "left");
			$(".column_half").css("width", "181px");
			$(".column_half").css("float", "none");
		} //end movePaneltoSide
		
		//Add Keybinding to move back and forth in the Pages with Left and Right Arrow.
		function addKeybinding() {
			$(document).keypress(function(e)
			{
				switch(e.keyCode)
				{
					// RIGHT Arrow (Forwards)
					case 39:	
								//Calculate next Page
								newIndex = $("#tx_vsarticle_pdf_archive_pages option:selected").index() + 1;
								if(newIndex>=$("#tx_vsarticle_pdf_archive_pages option").length) {
									newIndex = 1;
								}
								break;

					// LEFT Arrow (Backwards)
					case 37:	//alert(e.keyCode );
								
								newIndex = $("#tx_vsarticle_pdf_archive_pages option:selected").index() - 1;
								if(newIndex<1) {
									newIndex = $("#tx_vsarticle_pdf_archive_pages option").length-1;
								}	
								break;
				}
				
				//Set it to the Dropdown Menu
				$("#tx_vsarticle_pdf_archive_pages option:eq("+newIndex+")").attr('selected', 'selected');
				//Trigger the Change Event to let the Landbote.ch Jquery Script do the rest
				$("#tx_vsarticle_pdf_archive_pages").trigger("change");
				
				//Wait for the Reader to apear again and move him again
				waitForReaderAndMoveIt();
			});
		}//end addKeybinding
		
		//First Run Everything:
		movePaneltoSide();
		addKeybinding();
		waitForReaderAndMoveIt();
		
	} //Endif
	
  } //End letsJQery
  
})();



