// ==UserScript==
// @id             BibliaNiceScrollBACKEND
// @name           BibliaNiceScrollBACKEND
// @version        1.0
// @namespace      http://*biblia.com/*
// @author         Nicholas van Oudtshoorn
// @description    DO NOT INSTALL - THIS IS A BACKEND WORKER
// @include        http://*biblia.com/*
// @run-at         document-end
// ==/UserScript==
$(".content-pane-right").ready(

  function() { 
    $(".resource-content").niceScroll({cursorcolor:"#999"})
  }
);

// connect nice scrollbars to newly changed resources
$(document).bind("SELECTED_RESOURCE_CHANGE", function(event) {  
  if (event.target.parentNode.id == 'content-pane-left') {
/*    var ns = $("#content-pane-left .resource-content").getNiceScroll();
    ns.remove();*/
    $("#content-pane-left .resource-content").niceScroll({cursorcolor: "#999"});
  } else if  (event.target.parentNode.id == 'content-pane-right') {
/*    var ns = $("#content-pane-right .resource-content").getNiceScroll();
    ns.remove();*/
    $("#content-pane-right .resource-content").niceScroll({cursorcolor:"#999"});
  }
});

// update the position of the scrollbar when a pane is resized
$(document).bind("PANE_RESIZED", function(event) {
  if (event.target.parentNode.id == 'content-pane-left') {
    $($("#content-pane-left .resource-content").getNiceScroll()).trigger('resize');
  } else if  (event.target.parentNode.id == 'content-pane-right') {
    $($("#content-pane-right .resource-content").getNiceScroll()).trigger('resize');
  }
});

// update the position of the scrollbar when widescreen mode is toggled
$("#widescreentoggle").bind("TOGGLE_RESIZE", function() {
  $($("#content-pane-right .resource-content").getNiceScroll()).trigger('resize');
  $($("#content-pane-left .resource-content").getNiceScroll()).trigger('resize');
});

// update the position of the scrollbar when the sidepanel is hidden
$("#toggler").bind("TOGGLE_RESIZE", function() {
  $($("#content-pane-right .resource-content").getNiceScroll()).trigger('resize');
  $($("#content-pane-left .resource-content").getNiceScroll()).trigger('resize');
});
