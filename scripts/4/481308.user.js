// ==UserScript==
// @name        TFS colors
// @namespace   http://pllod-s-1abbtfs.pl.abb.com:8080/tfs/OneABB/Media/_boards
// @include     *
// @version     1
// ==/UserScript==
 

$(window).load(function() {
    
    var checkExist = setInterval(function() {if($('.witState').is(':visible')) {
        $( "div:contains('[M]')" ).children().css( "background-color", "#ffc6c6" );
		$( "div:contains('[C]')" ).children().css( "background-color", "#c8f4d6" );
        $( "div:contains('[S]')" ).children().css( "background-color", "#fffcb7" );
        
        
        $("div:contains('[M]')").each(function() {
                $(this).parent().last().css( "border-left", "6px solid #ee0000" );
            	$(".tbTileContent").css("border-left", "none");
            	$(".hub-pivot-content").css("border-left", "none");
            $(".hub-pivot-content").css("border-left", "none");
            $(".hub-content").css("border-left", "none");
            $(".hub-view board-view").css("border-left", "none");
            $(".content-section").css("border-left", "none");
            $(".main").css("border-left", "none");
            $("#16").css("border-left", "none");
            $(".main-container").css("border-left", "none");
            });

        $("div:contains('[C]')").each(function() {
            $(this).parent().last().css( "border-left", "6px solid #22b14c" );
           	$(".tbTileContent").css("border-left", "none");
           	$(".hub-pivot-content").css("border-left", "none");
            $(".hub-pivot-content").css("border-left", "none");
            $(".hub-content").css("border-left", "none");
            $(".hub-view board-view").css("border-left", "none");
            $(".content-section").css("border-left", "none");
            $(".main").css("border-left", "none");
            $("#16").css("border-left", "none");
            $(".main-container").css("border-left", "none");
            });
               
        $("div:contains('[S]')").each(function() {
            $(this).parent().last().css( "border-left", "6px solid #ffff00" );
           	$(".tbTileContent").css("border-left", "none");
           	$(".hub-pivot-content").css("border-left", "none");
            $(".hub-pivot-content").css("border-left", "none");
            $(".hub-content").css("border-left", "none");
            $(".hub-view board-view").css("border-left", "none");
            $(".content-section").css("border-left", "none");
            $(".main").css("border-left", "none");
            $("#16").css("border-left", "none");
            $(".main-container").css("border-left", "none");
            });
                
        
        
        $( "#taskboard-table").css("background-color", "white");
        $( ".hub-pivot").css("background-color", "white");
        $( ".hub-title").css("background-color", "white");
        $( ".work-item-view").css("background-color", "white");
        $( "#taskboard").css("background-color", "white");
        $( ".taskboard-cell.ui-droppable").css("border-left-color", "#D9D9D9");
        $( ".taskboard-cell.ui-droppable").css("border-left-width", "1px");
        $( "#work-item-view").css("background-color", "white");

        $( "#23").css("background-color", "white");
        $( ".ui-dialog-buttonpane.ui-widget-content.ui-helper-clearfix").css("background-color", "white");
        $( ".info-text-wrapper").css("background-color", "white");
        $( ".info-text").css("background-color", "white");
        $( ".caption").css("background-color", "white");
        $( ".ui-dialog-titlebar.ui-widget-header.ui-corner-all.ui-helper-clearfix").css("background-color", "white");
        $( ".ui-dialog-titlebar-progress-container").css("background-color", "white");
        $( ".ui-resizable-handle.ui-resizable-se.ui-icon.ui-icon-gripsmall-diagonal-se.ui-icon-grip-diagonal-se").css("background-color", "white");
        $( ".ui-dialog-titlebar-close.ui-corner-all").css("background-color", "white");
        $( ".work-item-form").css("background-color", "white");
    	$( ".toolbar.workitem-tool-bar").css("background-color", "white");
        $( ".workitem-info-bar").css("border-left-color", "white");
        $( ".dialog.ajax-panel.ui-dialog-content.ui-widget-content").css("border-left-color", "white");
        $( ".work-item-form").css("border-left-color", "white");
        $( ".dialog.ajax-panel.ui-dialog-content.ui-widget-content").css("border-left-color", "white");
        $( ".ui-dialog.ui-widget.ui-widget-content.ui-corner-all.workitem-dialog.ui-draggable.ui-resizable").css("border-left-color", "white");
        $( ".ui-resizable-handle ui-resizable-w").css("border-left-color", "white");
        $( ".dialog.ajax-panel.ui-dialog-content.ui-widget-content").css("background-color", "white");
        $( ".ui-resizable-handle.ui-resizable-n").css("background-color", "white");
        $( ".ui-resizable-handle.ui-resizable-e").css("background-color", "white");
        $( ".ui-resizable-handle.ui-resizable-s").css("background-color", "white");
        $( ".ui-resizable-handle.ui-resizable-w").css("background-color", "white");
        $( ".hub-view.board-view").css("background-color", "white");
        $( ".workitem-info-bar").css("background-color", "white");
        
        $( "#23").css("border-left-color", "white");
        $( "#22").css("border-left-color", "white");
        $( "#20").css("border-left-color", "white");
       

        
		}
	}, 1000);
}); 