// ==UserScript==
// @id             BibliaBiblicalPopupsBACKEND
// @name           BibliaBiblicalPopupsBACKEND
// @version        1.0
// @namespace      http://*biblia.com/*
// @author         Nicholas van Oudtshoorn
// @description    DO NOT INSTALL - THIS IS A BACKEND WORKER
// @include        http://*biblia.com/*
// @run-at         document-end
// ==/UserScript==

$("#content-pane-left .toolbar-cover-section").live('mousedown', function(e) {
if (e.which != 2) { return true; }
var w = null;
var strWindowFeatures = "menubar=no,location=0,resizable=yes,scrollbars=no,status=no";
w = window.open('http://biblia.com', window.app.curTabView.paneGroups[0].panes[0].resourceInfo.title, strWindowFeatures);
$(w).load( function() {
  while ((w.location.href == 'about:blank') && w.jQuery == undefined ) {
  var i = 1;
  }
  
  w.jQuery(".content-pane-right").ready( function() { 
    w.app.curTabView.resizePane(w.app.contentPanes[biblia.panes.left], biblia.paneStates.fullscreen)
    w.jQuery("#content-pane-left .close-fullscreen").remove();
    w.jQuery(".restore-pane").remove();
    w.jQuery(".expand-pane").remove();
    w.jQuery(".fullscreen-pane").remove();
    w.jQuery("*").unbind("SYNC_POSITION");
    w.jQuery("*").unbind("CHANGE_PAGE_TITLE_REQUEST");
    w.jQuery("*").unbind("APPLICATION_ACTION");

    var styleEl = w.document.getElementById('bibliablack');
    if (styleEl.innerHTML.length > 0) {
      var evt = w.document.createEvent("MouseEvents");
      evt.initMouseEvent("click", true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
      var toggler = w.document.getElementById("togglelink");
      toggler.dispatchEvent(evt); 
}

  });
  
});
});