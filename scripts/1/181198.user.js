// ==UserScript==
// @name           TFS 100% width Modal
// @description    Open TFS modals at 100% width
// @version        1.0
// @include        http*://tfs.*
// @grant          none

// ==/UserScript==
    var newStyle = document.createElement('style');
    newStyle.type = 'text/css';
    newStyle.innerHTML = '\
.ui-dialog.ui-widget.ui-widget-content.ui-corner-all.workitem-dialog.ui-draggable.ui-resizable{height:auto !important;width:100% !important;top:0 !important;left:0 !important;}\
    ';
    document.getElementsByTagName('head')[0].appendChild(newStyle);  